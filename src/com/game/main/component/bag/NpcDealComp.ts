module rf {

    export class NpcDealComp extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Npc_deal_comp;

        _data: { npc: any, player: IItemBagData };

        playerView: BagView;

        toolView: BagView;

        dealList: List;
        repairList: List;

        currentIndex: number = 1;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "npc_deal_comp");
        }

        bindComponents() {
            this.skin = this as any;
            let { source, skin } = this;

            let ow = stageWidth;
            let oh = stageHeight - Main_Title_H;

            this.setSize(ow, oh);

            let { bottom } = skin;

            let { btn_deal, btn_repair } = bottom;

            bottom.setPos(0, stageHeight - bottom.h - 100);

            btn_deal.btnName.multiline = true;
            btn_repair.btnName.multiline = true;

            setButtonName(btn_deal, `贩卖`, 0, -10);
            setButtonName(btn_repair, `修理35`, 0, -10);

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/zhuangbeiBg.png", { x: 0, y: 700, w: 640, h: 10 });
            bg.setSize(ow, oh);
            skin.addChildAt(bg, 0);

            bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/jiaoyi_bg.png");
            bg.setPos(65, 0);
            bottom.addChildAt(bg, 0);

            let role = new RoleInfoComp();
            skin.addChild(role);
            role.setPos(0, 35);

            let view = new BagView(DealDrag);
            skin.addChild(view);
            this.playerView = view;
            view.setPos(302, 65);

            view = new BagView(DealDrag);
            skin.addChild(view);
            this.toolView = view;
            view.setPos(302, 485);

            let list = new List(source, NpcDealItem, 248, 150, 15, 5, true, 2);
            bottom.addChild(list);
            this.dealList = list;
            list.setPos(85, 20);
            list.setScrollRect(640, 330, 0, 1);

            list = new List(source, RepairItem, 248, 150, 15, 5, true, 2);
            bottom.addChild(list);
            this.repairList = list;
            list.setPos(85, 20);
            list.setScrollRect(640, 330, 0, 1);

            let assets = new RoleAssetsComp();
            bottom.addChild(assets);
            assets.setPos(65, bottom.h - 25);

            btn_deal.on(MouseEventX.CLICK, this.dealClickHandle, this);
            btn_repair.on(MouseEventX.CLICK, this.repairClickHandle, this);
        }

        doData() {
            let { _data, playerView, toolView } = this;

            toolView.data = modelData.item.bag[301] as IItemBagData;//乾坤袋

            let { player } = _data;

            this.init();

            if (player) {
                playerView.data = player;
            }
        }

        init() {

            let { _data, currentIndex, dealList, repairList, skin } = this;
            let { btn_deal, btn_repair } = skin.bottom;
            let { npc, player } = _data;

            let a: boolean = (currentIndex == 1);
            let b: boolean = (currentIndex == 2);

            dealList.visible = a;
            btn_deal.select.visible = !a;
            setButtonEnabled(btn_deal, !a, 1);

            repairList.visible = b;
            btn_repair.select.visible = !b;
            setButtonEnabled(btn_repair, !b, 1);

            if (a) {

                if (npc) {
                    dealList.displayList(npc);
                }

            } else if (b) {

                let list: IRepairData[] = [];

                let config = getTypeDefines(TYPE_CONFIG.ZHUANGBEI);

                let reward = gameConfig.reward[9].indexs[0];

                let singlePrice = getLimitValues(reward.reward)[0].maxCount;

                let allPrice = 0;

                //装备上的装备
                foreach(config, (v, k) => {

                    // let bag = modelData.item.bag[v.type] as IItemBagData;

                    let zhuangbei = itemModel.runtimes.slots[v.type];

                    if (zhuangbei) {
                        let { guid, model, extraData } = zhuangbei;
                        let { name, icon, maxdurability } = model;

                        let need = maxdurability - extraData.durability;

                        if (need > 0) {
                            let price = singlePrice * need;
                            allPrice += price;

                            let repair = { guid, name, icon, price, status: "装备中", durable: `耐久度${extraData.durability}/${maxdurability}` } as IRepairData;
                            list.push(repair);
                        }
                    }

                    return true;
                });


                let items = itemModel.getLocationItems(player.location);
                //背包中的装备
                forarr(items, (v, k) => {

                    let { guid, type, model, extraData } = v;

                    if (type == ITEM_TYPE.Zhuangbei) {
                        let { name, icon, maxdurability } = model;
                        let need = maxdurability - extraData.durability;

                        if (need > 0) {
                            let price = singlePrice * need;
                            allPrice += price;

                            let repair = { guid, name, icon, price, durable: `耐久度${extraData.durability}/${maxdurability}` } as IRepairData;
                            list.push(repair);
                        }
                    }

                    return true;
                });

                //所有的装备
                let repair = { guid: 0, name: "一键修理", icon: cfgData.repairIcon, price: allPrice } as IRepairData;
                list.unshift(repair);

                repairList.displayList(list);
            }
        }

        dealClickHandle() {
            playEffectKeyByAudio("qie_huan_xuan_xiang");
            this.currentIndex = 1;
            this.init();
        }

        repairClickHandle() {
            playEffectKeyByAudio("qie_huan_xuan_xiang");
            this.currentIndex = 2;
            this.init();
        }

    }

    export class NpcDealItem extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Npc_deal_item;

        _data: IShopItemRuntime;

        icon: ItemIcon;

        model: IItem;

        price: number;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "npc_deal_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { _icon } = this.skin;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            this.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        doData() {

            let { _data, icon, skin } = this;

            if (_data) {
                let { txt_name, txt_num, txt_price } = skin;

                let { id, count, dis } = _data;
                this.model = gameConfig.item[id];

                let { model } = this;
                let { name, buy } = model;

                icon.data = model;

                setText(txt_name, name);
                setText(txt_num, `${count}`);

                this.price = Math.floor(getLimitValues(buy)[0].maxCount * dis);

                setText(txt_price, `${this.price}`);
            }
        }

        clickHandle(event: EventX) {
            let { _data, model, price } = this;

            let popup = undefined;

            switch (model.type) {
                case ITEM_TYPE.Zhuangbei:
                    popup = singleton(DealSelectPopup1);
                    break;
                case ITEM_TYPE.Shuji || ITEM_TYPE.Cai || ITEM_TYPE.Yaopin || ITEM_TYPE.Fuzhou:
                    popup = singleton(DealSelectPopup2);
                    break;

                default:
                    popup = singleton(DealSelectPopup3);
                    break;
            }

            let { index, count, hadCount } = _data;

            let num = Math.floor(itemModel.bag_Silver / (price));
            let max = (hadCount > 0) ? Math.min(num, hadCount) : num;

            let data = {
                type: DealType.buy,
                item: model,
                count,
                max,
                price,
                shopId: index,
            } as IDealData;

            popup.open(data, this);
        }
    }


    export interface IRepairData {
        guid: number;
        name: string;
        icon: string[];
        price: number;
        status: string;
        durable: string;
    }

    export class RepairItem extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Npc_deal_item;

        _data: IRepairData;

        icon: TSpriteUI;

        model: IItem;

        price: number;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "npc_deal_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { _icon } = this.skin;

            let img = new TSpriteUI();
            _icon.addChild(img);
            this.icon = img;

            this.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        doData() {

            let { _data, icon, skin } = this;

            if (_data) {
                let { txt_name, txt_num, txt_status, txt_price } = skin;

                let { name, icon: res, status, durable, price } = _data;

                let [url, key] = res;
                icon.changeSprite(key, url);

                setText(txt_name, name);
                setText(txt_num, durable ? durable : "");
                setText(txt_status, status ? status : "");

                setText(txt_price, `${price}`);
            }
        }

        clickHandle() {
            let { guid, price } = this._data;

            let runtime = {
                title: "修理",
                value: "是否确认修理？",
                callback1: () => {
                    foward(CM_CODE.CM_Repair, guid);
                    if (price <= itemModel.bag_Silver) {
                        foward(CM_CODE.CM_Repair, guid);
                    } else {
                        addPrompt("修理所需银两不足!");
                    }
                }
            } as IPopRuntime;

            singleton(WenziTitlePopup).open(runtime, this);
        }
    }
}