module rf {

    export class FightModeItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Btn_select_zhuangtai;

        _data: IFightmode;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "btn_select_zhuangtai");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {
            let { _data, skin } = this;
            setButtonName(skin, _data ? `状态: ${_data.name}` : "");
        }
    }




    export var hongdain_mijingMapComp_btn_map: boolean = false;

    export class MijingMapComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_top_mijing;

        backGround: SingleImage;

        builder: TMapBuilder;

        btnlist: List;
        beibao: MijingBeiBaoComp;

        isSwitch: boolean;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_top_mijing");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin } = this;
            let { btn_zhuangtai, btn_renwu, btn_map, map, role } = skin;

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            this.backGround = bg;

            map.guide.mouseEnabled = false;
            map.guide.mouseChildren = false;

            // let btnlist = new List(undefined, FightModeItem, 136, 38, 0, 10, true, 1);
            // skin.addChild(btnlist);
            // this.btnlist = btnlist;
            // btnlist.setPos(20, 89);

            // btnlist.on(EventT.SELECT, this.onListItemClickHandle, this);

            // let data: IFightmode[] = [];

            // foreach(gameConfig.fightmode, v => {
            //     data.push(v);
            //     return true;
            // });

            // btnlist.displayList(data);

            this.setSize(skin.w, Main_Top_H);

            new MijingSelfComp(role);

            let oh = role.y;

            map.setSize(skin.w, oh - map.y);
            map.setScrollRect(skin.w, oh - map.y + 50, 0, 0, 0, -50);

            // map.on(MouseEventX.MouseMove, this.mouseMoveHandler, this);
            map.on(MouseEventX.MouseDown, this.startContorl, this);
            map.btn_dingwei.on(MouseEventX.CLICK, () => {
                this.builder.resizePos();
                this.setDingweiShow(false);
            }, this);

            this.mMap_w = map.w >> 1;
            this.mMap_h = map.h >> 1;

            let builder = singleton(TMapBuilder);
            this.builder = builder;

            let beibao = singleton(MijingBeiBaoComp);
            this.beibao = beibao;

            btn_zhuangtai["shadow"].visible = false;

            setButtonName(btn_renwu, "任务");
            setButtonName(btn_map, "地图");

            btn_zhuangtai.visible = false;

            // btn_zhuangtai.on(MouseEventX.CLICK, this.zhuangtaiClickHandle, this);
            btn_renwu.on(MouseEventX.CLICK, this.renwuClickHandle, this);
            btn_map.on(MouseEventX.CLICK, this.mapClickHandle, this);

            if (this.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin, builder, backGround } = this;
            if (!skin) {
                return;
            }

            let { mijingId, mijing } = mapModel.currentMap;
            backGround.load(RES_PERFIX, mijing.res);

            modelData.hero.panelId = mijingId;

            facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, false);

            skin.map.addChildAt(builder, 0);
            builder.data = mapModel.currentMap;

            this.refreshMode();
            // this.fightModeCD();

            this.check();
            battleModel.getbattle();

            this.taskTrack();
            this.setDingweiShow(false);

            this.checkHongDian();
        }

        @EVT(GameEvent.REFRESH_HONGDIAN)
        checkHongDian() {
            let { skin } = this;
            setHongDian(skin.btn_map, hongdain_mijingMapComp_btn_map, 55, -25);
        }

        setDingweiShow(show: boolean, pos?: Point2D) {
            let { map } = this.skin;
            let { btn_dingwei } = map;

            if (btn_dingwei._visible != show) {
                btn_dingwei.visible = show;
            }

            if (pos) {
                btn_dingwei.setPos(pos.x, pos.y);
            }
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.TRACKGUID}`)
        taskTrack() {
            if (this.skin) {
                setTaskTrack(this.skin);
            }
        }

        sleep() {
            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);
        }

        @EVT("map_guide_change")
        check() {
            let { guide, currentMap } = mapModel;
            this.skin.map.guide.visible = (guide && !!(currentMap.exit));
        }

        @EVT(GameEvent.ADD_MIJING_BEIBAO)
        addBeibao(event: EventX) {
            let { beibao, skin } = this;

            if (event.data) {

                let combine: { [key: string]: IItemCombine } = {};

                let items = itemModel.getLocationItems(1);

                items = items.concat(itemModel.getLocationItems(301));

                forarr(items, (v: IItemRuntimeData) => {
                    let { id, guid, count, model } = v;

                    if (model.quick) {
                        if (!combine[id]) {
                            let model = gameConfig.item[id];
                            combine[id] = { id, guid, model, count: 0 } as IItemCombine;
                        }

                        combine[id].count += count;
                    }

                    return true;
                });

                let list: IItemCombine[] = [];

                foreach(combine, v => {
                    list.push(v);
                    return true;
                });

                if (list.length) {
                    beibao.setPos(skin.w - beibao.w >> 1, skin.role.y - beibao.h + 71);
                    beibao.open(list);
                } else {
                    addPrompt("没有可以快捷使用的道具!");
                }

            } else {
                beibao.close();
            }
        }

        onListItemClickHandle() {
            let item = this.btnlist.selectItem;
            let data = item.data as IFightmode;

            let { fightMode } = modelData.hero;

            if (data.id == fightMode) {
                this.setFightModeShow(false);
                return;
            }

            foward(CM_CODE.CM_FightMode, data.id);
        }

        setFightModeShow(show: boolean) {
            let { btnlist, skin } = this;
            // btnlist.visible = show;
            skin.zhuangtai.visible = show;
        }

        @EVT(GameEvent.REFRESH_FIGHT_MODE)
        refreshMode() {
            let { skin } = this;

            this.setFightModeShow(false);

            // let { fightMode } = modelData.hero;
            // let mode = gameConfig.fightmode[fightMode];

            // setButtonName(skin.btn_zhuangtai, `状态: ${mode.name}`);
        }

        @EVT(`${ResConst.CD}.${IRescdConst.FIGHTMODECD}`)
        fightModeCD() {
            let { skin } = this;

            let { fightModeCD } = modelData.cd;
            let time = fightModeCD - getServerDate();

            if (time > 0) {
                setButtonCooling(skin.btn_zhuangtai, time);
            }
        }

        zhuangtaiClickHandle() {
            playEffectKeyByAudio();

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            this.setFightModeShow(true);
        }

        renwuClickHandle() {
            playEffectKeyByAudio();
            singleton(TaskPopup).open();
        }

        mapClickHandle() {
            playEffectKeyByAudio();

            hongdain_mijingMapComp_btn_map = false;
            this.checkHongDian();

            let showMap = singleton(ShowMapComp);
            tipContainer.addChild(showMap);

        }

        startContorl() {

            this.skin.map.on(MouseEventX.MouseUp, this.stopContorl, this);
            this.skin.map.on(MouseEventX.MouseMove, this.mouseMoveHandler, this);
        }

        stopContorl() {
            this.skin.map.off(MouseEventX.MouseUp, this.stopContorl, this);
            this.skin.map.off(MouseEventX.MouseMove, this.mouseMoveHandler, this);
        }

        mMap_w: number;
        mMap_h: number;

        or: number = 30;

        mouseMoveHandler(event: EventX) {
            let data = event.data as IMouseEventData;
            let { ox, oy } = data;

            if (ox == 0 && oy == 0) {
                return;
            }

            let { _x, _y, minX, maxX, minY, maxY, resize } = this.builder;

            let y = _y + oy;
            let x = _x + ox;

            this.builder.setPos(Math.clamp(x, minX, maxX), Math.clamp(y, minY, maxY));

            if (resize) {

                let { builder, mMap_w, mMap_h, or, skin } = this;

                let ow = builder.x - resize.x;
                let oh = builder.y - resize.y;

                if (Math.abs(ow) >= mMap_w || Math.abs(oh) >= mMap_h) {
                    let radius = Math.atan2(-(oh), ow) * (180 / Math.PI);

                    let ox = 0;
                    let oy = 0;

                    let { btn_dingwei, w, h } = skin.map;
                    let { w: gw, h: gh } = btn_dingwei;

                    if (-or <= radius && radius <= or) {
                        //正东
                        ox = w - gw;
                        oy = h - gh >> 1;
                    } else if (90 - or <= radius && radius <= 90 + or) {
                        //正北
                        ox = w - gw >> 1;
                        oy = 0;
                    } else if (-180 - or <= radius && radius <= -180 + or) {
                        //正西
                        ox = 0;
                        oy = h - gh >> 1;
                    }
                    else if (-90 - or <= radius && radius <= -90 + or) {
                        //正南
                        ox = w - gw >> 1;
                        oy = h - gh - 10;
                    } else {

                        if (radius < -90) {
                            //西南
                            ox = 0;
                            oy = h - gh - 10;
                        } else if (radius < 0) {
                            //东南
                            ox = w - gw;
                            oy = h - gh - 10;
                        } else if (radius < 90) {
                            //东北
                            ox = w - gw;
                            oy = 0;
                        } else {
                            //西北
                            ox = 0;
                            oy = 0;
                        }
                    }

                    // if (radius == 0) {
                    //     //正东
                    //     ox = w - gw;
                    //     oy = h - gh >> 1;
                    // } else if (radius == 90) {
                    //     //正北
                    //     ox = w - gw >> 1;
                    //     oy = 0;
                    // } else if (radius == -180) {
                    //     //正西
                    //     ox = 0;
                    //     oy = h - gh >> 1;
                    // }
                    // else if (radius == -90) {
                    //     //正南
                    //     ox = w - gw >> 1;
                    //     oy = h - gh - 10;
                    // } else {

                    //     if (radius < -90) {
                    //         //西南
                    //         ox = 0;
                    //         oy = h - gh - 10;
                    //     } else if (radius < 0) {
                    //         //东南
                    //         ox = w - gw;
                    //         oy = h - gh - 10;
                    //     } else if (radius < 90) {
                    //         //东北
                    //         ox = w - gw;
                    //         oy = 0;
                    //     } else {
                    //         //西北
                    //         ox = 0;
                    //         oy = 0;
                    //     }
                    // }

                    this.setDingweiShow(true, { x: ox, y: oy });
                } else {
                    this.setDingweiShow(false);
                }
            }

        }

        @EVT(GameEvent.REFRESH_MAP_DIRECTION)
        refreshDirection(event: EventX) {

            let { map } = this.skin;
            let { guide, w, h } = map;
            let { w: gw, h: gh } = guide;

            let ox = 0;
            let oy = 0;

            switch (event.data) {
                case 1://正东
                    ox = w - gw;
                    oy = h - gh >> 1;
                    break;
                case 2://东北
                    ox = w - gw;
                    oy = 0;
                    break;
                case 3://正北
                    ox = w - gw >> 1;
                    oy = 0;
                    break;
                case 4://西北
                    ox = 0;
                    oy = 0;
                    break;
                case 5://正西
                    ox = 0;
                    oy = h - gh >> 1;
                    break;
                case 6://西南
                    ox = 0;
                    oy = h - gh - 10;
                    break;
                case 7://正南
                    ox = w - gw >> 1;
                    oy = h - gh - 10;
                    break;
                case 8://东南
                    ox = w - gw;
                    oy = h - gh - 10;
                    break;
            }

            if (!guide.visible) {
                guide.visible = true;
            }

            guide.setPos(ox, oy);
        }

        @EVT(GameEvent.CLOSE_MAP_DIRECTION)
        closeDirection() {
            let { map } = this.skin;
            map.guide.visible = false;
        }

    }
}