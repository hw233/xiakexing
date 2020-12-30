module rf {

    export var RoomProgress: IRoomProgressInfo[] = [];

    export interface IRoomProgressInfo {
        progress: number;
        roomType: number;
        icon: string[];
    }

    export class CityMapComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_top_city;

        backGround: SingleImage;

        current: IRoomRuntime;

        builder: TMapBuilder;

        compelte: boolean;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_top_city");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin } = this;

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            this.backGround = bg;

            let { btn_upgrade, btn_renwu, btn_map, map } = skin;
            this.setSize(skin.w, Main_Top_H);

            map.setSize(skin.w, Main_Top_H - map.y - 50);
            map.setScrollRect(skin.w, Main_Top_H - map.y - 50, 0, 0);

            // map.on(MouseEventX.MouseMove, this.mouseMoveHandler, this);
            map.on(MouseEventX.MouseDown, this.startContorl, this);

            let builder = singleton(TMapBuilder);
            this.builder = builder;

            btn_upgrade.phaseName = "roomUpgrade";
            __phaseTarget["roomUpgrade"] = btn_upgrade;

            setButtonName(btn_renwu, "任务");
            setButtonName(btn_map, "地图");

            btn_renwu.on(MouseEventX.CLICK, this.renwuClickHandle, this);
            btn_upgrade.on(MouseEventX.CLICK, this.upgradeClickHandle, this);
            btn_map.on(MouseEventX.CLICK, this.mapClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin, backGround } = this;

            if (!skin) {
                return;
            }

            let { mijingId, mijing } = mapModel.currentMap;
            backGround.load(RES_PERFIX, mijing.res);

            modelData.hero.panelId = mijingId;

            this.taskTrack();
            this.checkUpgradeBtnShow();
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.TRACKGUID}`)
        taskTrack() {
            if (this.skin) {
                setTaskTrack(this.skin);
            }
        }

        checkUpgradeBtnShow() {
            let { skin, builder } = this;
            if (!skin) {
                return;
            }

            // if (!mapModel.compelte) {
            //     builder.lastMap = modelData.hero.map;
            //     return;
            // }

            skin.map.addChild(builder);
            builder.data = mapModel.currentMap;

            let { btn_upgrade, btn_renwu } = skin;

            let { guid, map } = modelData.hero;
            let rusult = (guid == map);
            this.compelte = rusult;
            this.refreshUpgradeBtn();

            btn_upgrade.visible = rusult;
            btn_renwu.visible = !rusult;

            if (rusult) {
                this.updateRoomInfo();
                time1000.add(this.updateRoomInfo, this);
            } else {
                time1000.remove(this.updateRoomInfo, this);
            }
        }

        sleep() {
            time1000.remove(this.updateRoomInfo, this);
            facade.simpleDispatch(GameEvent.STOP_AUTO_FINDROOM);
        }

        @EVT(GameEvent.REFRESH_ROOM_PROGRESS)
        updateRoomInfo() {

            RoomProgress.length = 0;

            singleton(FieldModel).getRoomProgress();
            singleton(CookModel).getRoomProgress();
            singleton(FuzhouModel).getRoomProgress();
            roomModel.getRoomProgress();

            singleton(TMapBuilder).refreshRoomProgress();
        }

        upgradeClickHandle() {
            playEffectKeyByAudio();

            let { currentRoom, currentRoles } = mapModel;

            if (currentRoom) {
                let flag = true;

                foreach(currentRoles, v => {

                    let { elementId, element } = v;
                    if (!element) {
                        return true;
                    }

                    if (element.action) {
                        let model = models[element.action];
                        if (model) {
                            flag = model.checkStatus(elementId);
                        }
                    }
                    return flag;
                });

                if (flag) {
                    singleton(RoomUpgradePopupComp).open(currentRoom, this);
                } else {
                    addPrompt("有元素工作，无法升级！");
                }
            }
        }

        @EVT(GameEvent.REFRESH_UPGRADE_BTN, GameEvent.REFRESH_UPGRADE_ROOM)
        refreshUpgradeBtn(event?: EventX) {

            let { skin, compelte } = this;
            let { currentRoom } = mapModel;

            if (!skin || !compelte || !currentRoom) {
                return;
            }

            let { btn_upgrade } = skin;
            let { status, time, level, model } = roomModel.getRoomInfo(currentRoom.roomId);
            let nextLevel = model.levels[level];

            let rusult = !status && !!nextLevel;

            btn_upgrade.mouseEnabled = rusult;
            btn_upgrade.mouseChildren = rusult;

            let str = (level == 1) ? "修理" : "升级";
            setText(btn_upgrade.btnName, str);

            let t = time - getServerDate();

            if (t <= 0 && status) {
                foward(CM_CODE.CM_RoomUpgradeEnd, currentRoom.roomId);
            } else {

                if (!nextLevel) {
                    setText(btn_upgrade.btnName, `已满级`);
                } else {
                    let { hour, minute } = getTimeToS(t / 1000);
                    setText(btn_upgrade.btnName, !status ? `${str}` : `${hour}小时${minute}分钟`);
                }
            }
        }

        renwuClickHandle() {
            playEffectKeyByAudio();
            singleton(TaskPopup).open();
        }

        mapClickHandle() {
            playEffectKeyByAudio();
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

        mouseMoveHandler(event: EventX) {
            let data = event.data as IMouseEventData;
            let { ox, oy } = data;

            if (ox == 0 && oy == 0) {
                return;
            }

            let { _x, _y, minX, maxX, minY, maxY } = this.builder;

            let y = _y + oy;
            let x = _x + ox;

            this.builder.setPos(Math.clamp(x, minX, maxX), Math.clamp(y, minY, maxY));
        }
    }
}