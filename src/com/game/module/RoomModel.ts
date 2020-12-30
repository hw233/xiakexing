module rf {

    export interface IRoomModelRuntime extends IResroom, IModelRuntime {
        id?: { [key: string]: IRoomIDRuntime }
    }

    export interface IRoomIDRuntime extends IResroom_id, IConditionRuntime {
        id: any;
        name: string;
        model: IRoom;
        levelMod: IRoomLevel;
    }

    @RegisterModel("room")
    export class RoomModel extends BaseModel<IRoomIDRuntime> {

        runtimes: IRoomModelRuntime;

        roomSound: InnerAudioContext = undefined;

        loadSaveData(runtimes: IMapRuntime) {
            pro_copy(this.runtimes, runtimes);
        }

        getRoomInfo(id: number) {
            let runtime = this.runtimes.id[id] as IRoomIDRuntime;

            if (runtime) {
                let cfg = gameConfig.room[id];

                if (!runtime.model) {
                    runtime.model = cfg;
                }

                runtime.levelMod = cfg.levels[runtime.level - 1];

                return runtime;
            }

            return undefined;
        }

        getMapRoomName(id: number) {

            let runtime = this.runtimes.id[id] as IRoomIDRuntime;

            if (!runtime) {
                let cfg = gameConfig.room[id];
                return cfg.levels[0].name;
            }

            return runtime.name;
        }

        @SOCKET_EVT(SM_CODE.SM_RoomUpgrade)
        roomRefresh(event: StreamX) {

            let ret = event.data as number;

            if (ret) {
                addPrompt("条件未满足,不可升级!");
            } else {
                facade.simpleDispatch(GameEvent.REFRESH_UPGRADE_BTN);
                facade.simpleDispatch(GameEvent.REFRESH_ROOM_PROGRESS);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_RoomUpgradeEnd)
        upgradeEnd(event: StreamX) {
            facade.simpleDispatch(GameEvent.REFRESH_UPGRADE_ROOM, event.data);
            facade.simpleDispatch(GameEvent.REFRESH_ROOM_PROGRESS);
        }

        @SOCKET_EVT(SM_CODE.SM_ElementsRoom)
        SM_ElementsRoom(event: StreamX) {

            let { elementId } = actTarget;

            let model = elementQingbao[elementId].model;

            let runtime = { model, active: 1, roomKeys: event.data, read: 0 } as IQingbaoRuntime;
            personQingBao.unshift(runtime);

            addMessage(StringFormat.decode(model.detail));

            elementQingbao[elementId].timer++;
            elementQingbao[elementId].model = undefined;

            hongdain_mijingMapComp_btn_map = true;
            hongdain_showMapComp_btn_qingbao = true;

            facade.simpleDispatch(GameEvent.REFRESH_HONGDIAN);
            facade.simpleDispatch(GameEvent.REFRESH_QINGBAO_ROOM);
        }

        getRoomElementInfo(roomId: number, hoom: boolean = false) {

            let config = gameConfig.room[roomId];

            if (hoom) {
                let runtime = this.getRoomInfo(roomId);
                if (runtime) {
                    return runtime.levelMod.element;
                }
            }

            if (config) {
                return config.levels[0].element;
            }

            return undefined;
        }

        getRoomProgress() {

            foreach(this.runtimes.id, v => {
                let { status, id, time: t, level } = v;
                if (status) {

                    let model = gameConfig.room[id];

                    if (!model) {
                        return true;
                    }

                    let time = t - getServerDate();
                    if (time > 0) {
                        let progress = 1 - (time * 0.001 / model.levels[level].time);

                        let info = { progress, roomType: model.type, icon: cfgData.upgradeIcon } as IRoomProgressInfo;
                        RoomProgress.push(info);
                    } else {
                        foward(CM_CODE.CM_RoomUpgradeEnd, id);
                    }

                }
                return true;
            });
        }

        playRoomSound(id: number) {

            if (this.roomSound) {
                stopAudio(this.roomSound);
            }

            let room = gameConfig.room[id];

            if (room && room.sound) {
                this.roomSound = playBgmUrlByAudio(room.sound, false);
            }
        }
    }

    export var roomModel = singleton(RoomModel);
}
