module rf {
    export class TMapBuilderItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_btn_element;

        _data: IRoomRuntime;

        room_bg: TSpriteUI;
        master: TSpriteUI;

        qingbao: TSpriteUI;

        statusList: List;

        statusData: RoomStatus[] = [];

        isCurrent: boolean;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_btn_element");
        }

        bindComponents() {
            this.skin = this as any;

            let { source, room_bg, btnName, w, h } = this.skin;
            btnName.source = textSource2;

            let sprite = new TSpriteUI();
            room_bg.addChildAt(sprite, 0);
            this.master = sprite;

            sprite = new TSpriteUI();
            room_bg.addChildAt(sprite, 0);
            this.room_bg = sprite;

            sprite = new TSpriteUI();
            this.skin.addChild(sprite);
            sprite.setPos(w - 30, h - 30);
            this.qingbao = sprite;

            let list = new List(source, TMapRoomStatusItem, 40, 40, 6.5, 0, false);
            this.skin.addChild(list);
            this.statusList = list;

            this.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        @EVT(GameEvent.REFRESH_UPGRADE_ROOM)
        refresh(event: EventX) {

            if (this._data.roomId == event.data) {
                this.doData();
            }
        }

        doData() {
            let { _data, room_bg, skin, isCurrent, statusData } = this;

            if (!_data || !skin) {
                return;
            }

            skin.jiantou.visible = false;

            let { roomId } = _data;

            let cfg = gameConfig.room[roomId];
            let { flag, specialflag } = cfg;

            if (flag) {
                let [url, key] = flag;
                room_bg.changeSprite(key, url);
            } else {
                room_bg.clear();
            }

            if (specialflag && statusData.indexOf(specialflag) == -1) {
                statusData.push(specialflag);
            }

            setText(skin.btnName, roomModel.getMapRoomName(roomId));
            skin.current.visible = isCurrent;

            this.refreshStatus();
            this.changeMaster();
        }

        refreshStatus() {
            let { statusList, statusData, skin } = this;

            if (!skin) {
                return;
            }

            let { w, h } = skin;

            statusList.displayList(statusData);
            statusList.setPos(w - statusList.w >> 1, (-h >> 1));
        }

        @EVT(GameEvent.REFRESH_TASK_ACTIVE)
        changeTrackGuid() {
            let { _data, skin } = this;

            if (!skin) {
                return;
            }

            let element = roomModel.getRoomElementInfo(_data.roomId);

            if (element && element.length) {
                forarr(element, v => {
                    let runtime = taskModel.showAcceptableTask(`${v}`);
                    addZhuizongTips(skin, runtime);
                    return !runtime;
                });
            }else{
                addZhuizongTips(skin, undefined);
            }
        }

        @EVT(`${ResConst.MENPAI}.${IResmenpaiConst.MASTER}`)
        changeMaster() {
            let { _data, skin, master } = this;

            if (!skin) {
                return;
            }

            let cfg = gameConfig.room[_data.roomId];
            if (!cfg.flag) {
                return;
            }

            let element = roomModel.getRoomElementInfo(_data.roomId);
            if (element) {
                let ruslut = (element.indexOf(modelData.menpai.master) != -1);

                if (ruslut) {
                    master.changeSprite("shifuhuang", "jiaobiao");
                } else {
                    master.clear();
                }
            }
        }

        lastQingbao: IQingbaoType;

        changeQingbao(model: IQingbaoType) {
            let { qingbao, lastQingbao } = this;
            if (model) {

                let res: string[] = undefined;

                if (lastQingbao && lastQingbao.priority > model.priority) {
                    res = lastQingbao.res;
                } else {
                    res = model.res;
                }

                let [url, key] = res;
                qingbao.changeSprite(key, url);

                this.lastQingbao = model;

            } else {
                if (qingbao) {
                    qingbao.clear();
                }
            }
        }

        clickHandle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            let { _data } = this;
            // mapModel.toRoom(_data);

            if (!checkLimit(AutoMoveConditon)) {
                mapModel.findRoom(_data);
            } else {
                mapModel.toRoom(_data);
            }

        }

        remove() {
            super.remove();

            if (this["recycle"]) {
                this["recycle"]();
            }
        }
    }
}