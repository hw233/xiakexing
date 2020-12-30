module rf {
    export class CityElementItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_element_item;

        _data: IElementRuntime;

        element_bg: TSpriteUI;
        element_flag: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_element_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { btn_element, hunmi } = this.skin;

            btn_element.btnName.source = textSource2;

            hunmi.mouseChildren = false;
            hunmi.mouseEnabled = false;
            hunmi.visible = false;

            let sprite = new TSpriteUI();
            btn_element.addChildAt(sprite, 0);
            this.element_bg = sprite;

            sprite = new TSpriteUI();
            btn_element.element_flag.addChildAt(sprite, 0);
            this.element_flag = sprite;

            btn_element.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        doData() {
            let { _data, element_bg, element_flag } = this;

            if (!_data) {
                return;
            }

            let cfg = gameConfig.element[_data.elementId];

            if (cfg.flag) {
                let [url, key] = cfg.flag;
                element_flag.changeSprite(key, url);
            } else {
                element_flag.clear();
            }

            element_bg.changeSprite(`element_bg_${cfg.bg}`);

            this.refreshElementName();
            this.refreshElementStatus();
            this.changeTrackGuid();
        }

        @EVT(GameEvent.REFRESH_ELEMENT)
        refreshElementName() {
            let { _data, skin } = this;

            if (!_data) {
                return;
            }

            let { element } = _data;

            if (element.action) {
                let model = models[element.action];
                if (model) {
                    model.checkName(_data);
                }
            }

            setText(skin.btn_element.btnName, _data.name);
        }

        @EVT(GameEvent.UPDATE_ROLEZHUANGTAI)
        refreshElementStatus() {
            let { _data, skin } = this;

            if (!_data) {
                return;
            }

            skin.hunmi.visible = ((_data.zhuangtai & ZHUANGTAI.STUPOR) > 0);
        }

        @EVT(GameEvent.REFRESH_TASK_ACTIVE)
        changeTrackGuid() {
            let { _data, skin } = this;

            if (!skin) {
                return;
            }

            let runtime = taskModel.showAcceptableTask(`${_data.elementId}`);
            addZhuizongTips(skin, runtime, 40, 0);
        }

        clickHandle() {
            playEffectKeyByAudio();

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            facade.simpleDispatch(GameEvent.STOP_AUTO_FINDROOM);

            let { _data } = this;
            let { guid, element } = _data;
            let room = mapModel.currentRoom;

            if (!element) {
                return;
            }

            let { upgrade, action } = element;

            if (!upgrade && room.roomStatus) {
                playEffectKeyByAudio("warning");
                addPrompt(`当前正在升级中...`);
                return;
            }

            if (action) {
                foward(CM_CODE.CM_ElementAct, { guid, act: action });
            } else {
                elementModel.checkEventPopup(_data);
            }
        }
    }

    //城市//门派//自宅
    export class CityCoreComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_core;

        list: List;
        _data: IElementRuntime[];

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_core");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            let list = new List(undefined, CityElementItem, 200, 70, 2, 0, true, 3);
            skin.addChild(list);
            this.list = list;
            list.setPos(10, 12);
            list.setScrollRect(640, 140, 0, 1);
        }

        awaken() {
            mapModel.refreshRoomRoles();
        }

        doData() {
            let { list, _data } = this;

            if (list && _data) {
                list.displayList(_data);
            }
        }

        @EVT(GameEvent.REFRESH_ROOM_ELEMENT)
        refreshRoomInfo(event: EventX) {
            let list = event.data as IElementRuntime[];
            this.data = list;
        }
    }
}