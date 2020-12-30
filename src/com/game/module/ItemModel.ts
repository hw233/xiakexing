module rf {
    export interface IItemRuntime extends IResitem, IModelRuntime {
        guid: number
        id: { [key: number]: IItemRuntimeData[] }
        runtimes: { [key: number]: IItemRuntimeData }
        bag?: { [key: string]: IItemBagData }
        slots: { [key: number]: IItemRuntimeData }
    }

    export interface IItemRuntimeData extends IResitem_runtimes, IConditionRuntime {
        id: number
        guid: number
        count: number

        width: number;
        height: number;

        model: IItem;

        owner: number;
    }

    export interface IItemBagData extends IResitem_bag {
        guid: number;

        item: IItemRuntime;

        // byte: Bag2DArray
        width: number;
        height: number;
        beginSlot: number;
        endSlot: number;
    }

    export interface IItemCombine {
        id: number
        guid: number
        count: number
        model: IItem
    }

    @RegisterModel("item")
    export class ItemModel extends BaseModel<IItemRuntimeData> {
        runtimes: IItemRuntime;
        // bags: Bag2DArray[]

        bag_Silver: number;//背包中银两，用于判断能否购买
        all_Silver: number;//总银两，统计显示作用

        itemRuntimes: { [key: string]: IItemRuntime } = {};


        id2runtime(limit: IConfigLimit) {
            return [];
        }



        /**
     * 
     * @param data 
     * @param id 
     * @param location 
     */
        getStackItem(id: number, location: number, count = 0) {
            let data = this.runtimes;
            let items = data.id[id];
            let stack = gameConfig.item[id].stack;
            let result: IResitem_runtimes;
            let { beginSlot, endSlot } = data.bag[location];
            forarr(items, item => {
                if (item.slot >= beginSlot && item.slot < endSlot && stack - item.count > count) {
                    result = item;
                    return false;
                }
                return true;
            }, this)
            return result;
        }


        /**
     * 
     * @param data 
     * @param location 
     */
        getEmptySlot(location: number) {
            let data = this.runtimes;
            let { beginSlot, endSlot } = data.bag[location];
            let slots = data.slots;
            for (let i = beginSlot; i < endSlot; i++) {
                let item = slots[i];
                if (!item) {
                    return i;
                }
            }
            return -1;
        }


        /**
         * 
         * @param data 
         * @param location 
         * @param id 
         */
        getLocationItems(location: number, id?: number, data?: IItemRuntime) {
            if (!data) data = this.runtimes;
            let { beginSlot, endSlot } = data.bag[location];
            let results: IItemRuntimeData[] = [];

            if (id) {

                forarr(data.id[id], item => {
                    if (item.slot >= beginSlot && item.slot < endSlot) {
                        results.push(item as IItemRuntimeData);
                    }
                    return true;
                }, this)


            } else {

                foreach(data.runtimes, item => {
                    if (item.slot >= beginSlot && item.slot < endSlot) {
                        results.push(item as IItemRuntimeData);
                    }
                    return true;
                }, this)

            }

            return results;
        }


        getAreaItems(data: IItemRuntime, bag: IItemBagData) {

            let { beginSlot, endSlot } = bag;

            let results: IItemRuntimeData[] = [];

            foreach(data.runtimes, item => {
                if (item.slot >= beginSlot && item.slot < endSlot) {
                    results.push(item as IItemRuntimeData);
                }
                return true;
            }, this);

            return results;
        }


        checkCanStack(itemA: IResitem_runtimes, itemB: IResitem_runtimes) {
            let result: number[];
            if (itemA != itemB && itemA.id == itemB.id) {
                let { stack } = gameConfig.item[itemA.id];
                if (stack > 1) {
                    let countA = itemA.count;
                    let countB = itemB.count;
                    if (countA < stack) {
                        let count = countA + countB - stack;
                        if (count >= 0) {
                            result = [0, countA + countB]
                        } else {
                            result = [stack - countA, stack]
                        }
                    }
                }
            }
            return result;
        }


        getItemCount(id: number, location = 1, data?: IItemRuntime) {
            let count = 0;
            if (location != -1) {
                let items = this.getLocationItems(location, id, data);

                forarr(items, v => {
                    count += v.count;
                    return true;
                }, this);

            } else {
                foreach(this.runtimes.runtimes, v => {
                    if (id == v.id) {
                        count += v.count;
                    }
                    return true;
                }, this);

            }

            return count;
        }

        checkItemInBag(runtime: IItemRuntimeData, location: number): boolean {
            let { beginSlot, endSlot } = this.runtimes.bag[location];
            return runtime.slot >= beginSlot && runtime.slot < endSlot
        }

        updateSilver() {
            let bag_Silver = this.getItemCount(1, 1);
            this.bag_Silver = bag_Silver;

            let all_Silver = this.getItemCount(1, -1);
            if (all_Silver != this.all_Silver) {
                this.all_Silver = all_Silver;
                facade.simpleDispatch(`item.model.silver`);
            }
        }

        loadSaveData(runtime: IItemRuntime) {
            super.loadSaveData(runtime);

            let guid = modelData.hero.guid;

            runtime = this.runtimes;
            runtime.guid = guid;

            this.itemRuntimes[guid] = runtime;

            foreach(runtime.bag, (v: IItemBagData) => {
                let beibao = gameConfig.beibao[v.location]
                let { width, height } = beibao.levels[0];
                v.width = width;
                v.height = height;
                v.beginSlot = beibao.slot;
                v.endSlot = beibao.slot + width * height;
                v.item = runtime;
                v.guid = guid;
                return true;
            }, true)

            let id = runtime.id = {};
            let slots = runtime.slots = {}

            foreach(runtime.runtimes, v => {
                // bags[v.location].addItem(v);
                let arr = id[v.id] as IItemRuntimeData[];
                if (!arr) {
                    id[v.id] = arr = [];
                }
                slots[v.slot] = v;
                v.model = gameConfig.item[v.id];
                arr.pushOnce(v);
                v.owner = guid

                return true;
            }, this);

            foreach(runtime.id, (v, k: number) => {
                this.tempNumberDic[k] = this.getItemCount(k);
                return true;
            });

            this.updateSilver();
        }

        getLimitValue(limit: IConfigLimit) {

            if (limit.limitValues) {
                forarr(limit.limitValues, v => {
                    let { id } = v;
                    v.count = this.getItemCount(id as number, 1);
                    return true;
                });

                return limit.limitValues;
            }

            let { key } = this;
            let limitValues = [] as IConditionRuntime[];
            let data: IItemRuntimeData[];
            if (limit.target) {
                data = this.filterRuntime(limit) as IItemRuntimeData[];
            }
            let id = limit.target[0].value
            let cfg = gameConfig.item[id];
            let countlimit = limit.counts ? limit.counts[0] : limit.count;
            let count = (data && data.length) ? this.getItemCount(cfg.id, 1) : 0;
            let maxCount = 0;
            if (countlimit) {
                maxCount = Math.abs(codeDoProperty(modelData, countlimit.value, modelData))
                // maxCount = codeDoProperty(modelData, countlimit.value, modelData)
            }

            limitValues.push({ id, moduleName: key, icon: cfg.icon, count, maxCount, name: cfg.name } as IConditionRuntime)

            return limitValues;
        }

        // getLimitReward(limit: IConfigLimit) {
        //     if (limit.rewards) {

        //         return limit.rewards;
        //     }
        //     let data = this.runtimes;
        //     if (limit.target) {
        //         data = this.filterRuntime(limit) as IItemRuntime;
        //     }
        //     let rewards = [];
        //     let { key } = this;
        //     forarr(limit.value, v => {
        //         if (v.opera == ":") {

        //             let runtime = this.createRuntimeData(v, key, v.id, data,limit)
        //             rewards.push(runtime)
        //         }
        //         return true;
        //     })
        //     limit.rewards = rewards
        //     return rewards;
        // }

        checkLimit(limit: IConfigLimit, times = 1, params: any) {
            let runtimes = this.filterRuntime(limit) as any as IItemRuntimeData[];

            if (!runtimes || !runtimes.length) {
                return true;
            }

            let total = this.getItemCount(runtimes[0].id, 1);

            let countCondition = limit.count;
            let count = codeDoProperty(modelData, countCondition.value, this) || 1;
            if (codeIntParser(total, countCondition.opera, count) == false) {
                countCondition.count = total;
                return countCondition;
            }
            return undefined;
        }

        createRuntimeData(v: IConditionRuntime, key: string, pro: string | number, data: any, limit: IConfigLimit) {
            let runtime = clone(v, {}) as IItemRuntimeData;
            runtime.moduleName = key;
            runtime.runtime = data;

            let itemid = limit.target[0].value

            let item = gameConfig.item[itemid];
            if (item) {
                runtime.icon = item.icon;
                runtime.name = item.name;
            } else {
                runtime.name = this.getRuntimeDataName(data);
            }

            runtime.maxCount = Math.abs(v.value);
            runtime.count = this.getItemCount(itemid);

            return runtime;
        }

        addItem(v: IItemRuntimeData) {
            let itemData = this.itemRuntimes[v.owner];
            if (itemData) {

                if (!v.model) {
                    v.model = gameConfig.item[v.id]
                }

                itemData.slots[v.slot] = v;
                if (itemData == this.runtimes) {
                    let ids = itemData.id[v.id];
                    if (!ids) {
                        itemData.id[v.id] = ids = [];
                    }
                    ids.pushOnce(v);
                }

                facade.simpleDispatch("addItem", v);
            }

        }

        removeItem(v: IItemRuntimeData) {

            let itemData = this.itemRuntimes[v.owner];

            if (itemData) {
                delete itemData.slots[v.slot];

                if (itemData == this.runtimes) {
                    let ids = itemData.id[v.id];
                    if (ids) {
                        ids.remove(v);
                    }
                }

                facade.simpleDispatch("removeItem", v);
            }
        }

        //记录count是增加或者减少
        tempNumberDic = {};

        @EVT("item.runtimes")
        itemRuntimeChange(event: StreamX) {
            let v = event.data as IItemRuntimeData;
            let itemData = modelData.item as IItemRuntime;
            if (v) {
                if (itemData.runtimes[v.guid]) {
                    v.owner = modelData.hero.guid;
                    this.addItem(v);

                    if (!this.tempNumberDic[v.id]) {
                        this.tempNumberDic[v.id] = 0;
                    }

                } else {
                    this.removeItem(v);
                    delete this.tempNumberDic[v.id];
                }

                this.refreshItemCountTask(v);
            }
        }

        @EVT("item.runtimes.count")
        itemRuntimeCount(event: StreamX) {
            let v = event.data as IItemRuntimeData;
            if (v) {
                facade.simpleDispatch(GameEvent.REFRESH_ITEM_DATA, v);

                this.refreshItemCountTask(v);
            }
        }

        refreshItemCountTask(runtime: IItemRuntimeData) {
            let { id, model } = runtime;

            if (id == 1) {
                this.updateSilver();
            }

            if (!splitItemBool) {
                let num = this.getItemCount(id);
                let temp = num - this.tempNumberDic[id];

                if (temp > 0) {
                    addPrompt(`获得了${model.name} x${temp}`);
                    addMessage(`<font color ="${Style.HONG_AN}">获得了${model.name} x${temp}</font>`);
                }

                this.tempNumberDic[id] = num;
            }

            facade.simpleDispatch(`item.id.${id}.count`, this.getItemCount(id))
        }

        itemTempFlag: boolean = undefined;

        @SOCKET_EVT(SM_CODE.SM_MoveItemOver)
        SM_MoveItemOver(event: StreamX) {
            let [ret, guid] = event.data;
            if (ret) {
                let runtime = this.runtimes.runtimes[guid];
                if (runtime && runtime.type == ITEM_TYPE.Task) {
                    let ruslut = (this.checkItemInBag(runtime, 1) || this.checkItemInBag(runtime, 301));
                    if (ruslut != this.itemTempFlag) {
                        if (ruslut) {
                            foward(CM_CODE.CM_RoomsGundong, `${runtime.model.name}已经易主,位置已在地图上标记`);
                        }
                        this.itemTempFlag = ruslut;
                    }
                } else {
                    this.itemTempFlag = undefined;
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_RoomsGundong)
        SM_RoomsGundong(event: StreamX) {

            // console.log(debug, event.data);

            let map = singleton(MijingMapComp);

            let item = singleton(GunDongComp);

            if (!item.stage) {
                map.addChild(item);
                item.setPos(70, 80);
            }

            item.data = event.data;
        }

        @SOCKET_EVT(SM_CODE.SM_UpdateExtraData)
        SM_UpdateExtraData(event: StreamX) {
            let { runtimes } = this;

            let [guid, { durability, maxdurability }] = event.data;

            let runtime = runtimes.runtimes[guid];
            if (runtime) {
                runtime.extraData.durability = durability;
                runtime.extraData.maxdurability = maxdurability;
            }
        }

        @SOCKET_EVT(SM_CODE.SM_ItemSplit)
        SM_ItemSplit(event: StreamX) {
            switch (event.data) {
                case 1:
                    addPrompt("不能拆分不属于你的物品!");
                    break;
                case 2:
                    addPrompt("背包空位不足!");
                    break;
            }
        }

        @SOCKET_EVT(SM_CODE.SM_GetAllItemFromChet)
        SM_GetAllItemFromChet(event: StreamX) {
            addPrompt("背包空位不足!");
        }

        // @EVT("item.runtimes.location")
        // itemRuntimeLocationChange(event: EventX) {
        //     let v = event.data as IItemRuntimeData;
        //     let itemData = modelData.item as IItemRuntime;
        //     if (v) {
        //         let bag = itemData.bag[v.location] as IItemBagData;
        //         if (!bag.byte.rows) {
        //             bag.byte.item = v;
        //         }
        //     }
        // }

        // @SOCKET_EVT(SM_CODE.SM_TakeOnEquip)
        // takeOnEquip(event: EventX) {
        //     let [guid, location, guid2, loc2, x, y] = event.data as number[];
        //     let item = this.runtimes.runtimes[guid];
        // let bag = modelData.item.bag[location] as IItemBagData;
        // bag.byte.item = item;
        //todo Event
        // facade.simpleDispatch(GameEvent.REFRESH_ZHUANG_BEI, location);
        // facade.simpleDispatch("removeItem", item);
        // this.bags[item.location].removeItem(item);
        // if (guid2) {
        // let item2 = this.runtimes.runtimes[guid2];
        // item2.location = loc2;
        // item2.x = x;
        // item2.y = y;
        // this.bags[loc2].addItem(item2);
        // facade.simpleDispatch("addItem", item2);
        // }
        // }

        // @SOCKET_EVT(SM_CODE.SM_TakeOffEquip)
        // takeOffEquip(event: EventX) {
        // let guid = event.data as TCM_TakeOffEquip;
        // let item = this.runtimes.runtimes[guid];
        // let { slot } = item.model;

        // forarr(slot, v => {
        //     let bag = modelData.item.bag[v] as IItemBagData;
        //     let zhuangbei = bag.byte.item;

        //     if (zhuangbei && zhuangbei.location == item.location) {
        //         bag.byte.item = undefined;
        //         let itemBag = modelData.item.bag[item.location] as IItemBagData;
        //         itemBag.byte.items[item.guid] = item;
        //         facade.simpleDispatch(GameEvent.REFRESH_ZHUANG_BEI, v);
        //         facade.simpleDispatch("addItem", item);
        //     }

        //     return true;
        // });

        // }


        @SOCKET_EVT(SM_CODE.SM_MoveItem)
        SM_MoveItem(event: StreamX) {
            let [f, fs, t, ts] = event.data as TCM_MoveItem;
            // let guid = this.runtimes.guid;

            let fr = this.itemRuntimes[f];
            let tr = this.itemRuntimes[t];

            if (fr && tr) {

                let fi = fr.slots[fs];
                let ti = tr.slots[ts];

                if (fi) {
                    if (ti) {
                        ti.owner = f;
                        ti.slot = fs;

                        this.addItem(ti);

                    } else {

                        if (f != t) {
                            delete fr.runtimes[fi.guid]
                            this.removeItem(fi);
                        } else {
                            fr.slots[fs] = undefined;
                            facade.simpleDispatch("removeItem", fi);
                        }

                    }

                    fi.owner = t;
                    fi.slot = ts;
                    tr.runtimes[fi.guid] = fi;
                    this.addItem(fi);
                    // facade.simpleDispatch("addItem", fi);

                    if (fi.id == 1) {
                        this.updateSilver();
                    }

                }

                if (f != t) {

                }
            }

            // let itemData = modelData.item;

            // let runtime = itemData.runtimes[guid] as IItemRuntimeData;
            // if (runtime) {

            //     let bag = itemData.bag[runtime.location] as IItemBagData;

            //     bag.byte.removeItem(runtime);


            //     facade.simpleDispatch("removeItem", runtime);

            //     runtime.location = location;
            //     runtime.x = x;
            //     runtime.y = y;

            //     bag = itemData.bag[location] as IItemBagData;
            //     bag.byte.addItem(runtime);
            //     facade.simpleDispatch("addItem", runtime);
            // }
        }

        @SOCKET_EVT(SM_CODE.SM_UpdateItems)
        SM_UpdateItems(event: StreamX) {

            if (!actTarget) {
                return;
            }

            let { guid, elementId } = actTarget;
            foward(CM_CODE.CM_ElementAct, { guid: guid ? guid : elementId, act: "refreshOpen" });
        }

        @SOCKET_EVT(SM_CODE.SM_RemoveItem)
        SM_RemoveItem(event: StreamX) {
            let [from, guid] = event.data;
            let runtimes = this.itemRuntimes[from]
            if (runtimes) {
                let item = runtimes.runtimes[guid];
                if (item) {
                    delete runtimes.runtimes[item.guid]
                    this.removeItem(item);
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_ChangeItem)
        SM_ChangeItem(event: StreamX) {
            let [from, guid, count] = event.data;
            let runtimes = this.itemRuntimes[from];
            if (runtimes) {
                let item = runtimes.runtimes[guid];
                if (item) {
                    item.count = count;
                    facade.simpleDispatch("changeItem", item);
                }
            }
        }

        @SOCKET_EVT(CM_CODE.CM_ChangeQuickSlot)
        changeQuickSlot(event: StreamX) {
            let [itemId, index] = event.data;
            modelData.item.quickSlot[index] = itemId;
            facade.simpleDispatch(GameEvent.REFRESH_QUICK_ITEM, [index, itemId]);
        }

        @SOCKET_EVT(SM_CODE.SM_UseItem)
        SM_UseItem(event: StreamX) {
            let { ret, reason, itemId } = event.data as TSM_UseItem;

            if (!ret) {
                if (modelData.hero.mapstatus != MAP_STATUS.FU_BEN) {
                    return;
                }

                forarr(modelData.item.quickSlot, (v, k) => {
                    if (v) {
                        let num = this.getItemCount(v, 1);
                        if (!num) {
                            foward(CM_CODE.CM_ChangeQuickSlot, [0, k]);
                        }
                    }
                    return true;
                });
            } else {
                addPrompt("当前不能使用!");
                playEffectKeyByAudio("warning");
            }
        }

        @SOCKET_EVT(SM_CODE.SM_ShowGetItemsTips)
        SM_ShowGetItemsTips(event: StreamX) {
            singleton(ShowItemPopup).open(event.data);
        }

        dushuExtimate(runtime: IItemRuntimeData) {
            let hour = 0;
            let min = 0;
            let estimateLevel = 0;
            let estimateTime = 0;
            let estimateDurability = 0;
            // let parentLevel = 0;

            let itemConfig = gameConfig.item[runtime.id];
            let skillConfig = gameConfig.skill[itemConfig.bookAddSkillId];
            let skillRuntime = modelData.skill.id[itemConfig.bookAddSkillId];
            let parentSkillId = skillConfig.type[1];
            // let parentSkillModel = modelData.skill.id[parentSkillId];

            if (skillRuntime) {
                estimateLevel = skillRuntime.level;
            }

            // if (itemConfig.bookAddSkillId == "8") {
            //     parentLevel = skillRuntime.level;
            // } else {
            //     parentLevel = parentSkillModel.level;
            // }

            let heroRuntime = modelData.hero;
            let shujia = modelData.room.id[2002];
            let chuang = modelData.room.id[2003];
            let sjExpSp = Math.abs(shujia.addExp);
            let sjHungerSp = Math.abs(shujia.addHunger);
            let sjVigorSp = Math.abs(shujia.addVigor);
            let hungerConsume = cfgData.bsdXiaohao;
            let durabilityConsume = cfgData.bookCostDurabilityPerMin;
            let cVigorSp = Math.abs(chuang.addVigor);

            let { hunger, vigor, maxvigor } = heroRuntime;

            let hungerTime = hunger / sjHungerSp;
            let vigorTime = vigor / sjVigorSp;
            let vigorRecoveryTime = 0;

            if (hungerTime > vigorTime) {
                vigorRecoveryTime = maxvigor / cVigorSp;
            }

            let hungerEstimateTime = vigorRecoveryTime + hungerTime;// 饱食度消耗预计时间

            let durabilityTime = runtime.extraData.durability / durabilityConsume;// 耐久度消耗时间

            if (hungerEstimateTime < durabilityTime) {
                estimateTime = hungerEstimateTime;
            } else {
                estimateTime = durabilityTime;
            }

            let estimateExp = estimateTime * (itemConfig.bookAddExp * shujia.addExp / 100);
            let tempExpTotal = 0;
            let stopSwith = true;
            while (stopSwith) {
                // let tempExp = Math.pow((extimateLevel), 3) * expArr[0] + expArr[1];
                let tempExp = Math.pow(estimateLevel, 3) * 0.015 + 1;
                tempExpTotal += tempExp;
                if (tempExpTotal > estimateExp) {
                    stopSwith = false;
                    tempExpTotal -= tempExp;
                } else {
                    estimateLevel++;
                }
            }

            let estimateNewTime = tempExpTotal / sjExpSp;

            if (estimateNewTime < estimateExp) {
                hour = estimateNewTime / 60;
                min = estimateNewTime % 60;
                estimateDurability = estimateNewTime * durabilityConsume;
            } else {
                hour = estimateExp / 60;
                min = estimateExp % 60;
                estimateDurability = estimateExp * durabilityConsume;
            }

            return { hour, min, estimateLevel, estimateDurability };
        }
    }

    export let itemModel = singleton(ItemModel);
}