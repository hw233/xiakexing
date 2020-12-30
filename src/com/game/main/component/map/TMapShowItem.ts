module rf {

    export class TMapShowItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_show_element;

        _data: IRoomRuntime;

        room_bg: TSpriteUI;
        master: TSpriteUI;

        qingbao: TSpriteUI;

        mouseEnabled = false;
        mouseChildren = false;

        isCurrent: boolean;
        isExit: boolean;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_show_element");
        }

        bindComponents() {
            this.skin = this as any;

            let { room_bg, btnName,w,h } = this.skin;

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
        }

        doData() {
            let { _data, room_bg, skin, isCurrent, isExit } = this;
            let { roomId } = _data;

            let cfg = gameConfig.room[roomId];
            let { flag } = cfg;

            if (flag) {
                let [url, key] = flag;
                room_bg.changeSprite(key, url);
            } else {
                room_bg.clear();
            }

            setText(skin.btnName, roomModel.getMapRoomName(roomId));
            skin.current.visible = isCurrent;

            skin.exit.visible = isExit;

            this.changeTrackGuid();
            this.changeMaster();
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

            let ruslut = (element.indexOf(modelData.menpai.master) != -1);
            if (ruslut) {
                master.changeSprite("shifuhuang", "jiaobiao");
            } else {
                master.clear();
            }
        }

        lastQingbao: IQingbaoType;

        changeQingbao(model: IQingbaoType) {
            let { qingbao, lastQingbao } = this;
            if (model) {

                let res: string[] = undefined;

                if (lastQingbao && lastQingbao.priority > model.priority) {
                    res = lastQingbao.res;
                }else{
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

        remove() {
            super.remove();

            if (this["recycle"]) {
                this["recycle"]();
            }
        }
    }
}