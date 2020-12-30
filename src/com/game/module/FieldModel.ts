module rf {
    export interface IFieldRuntime extends IResitem, IModelRuntime {
        runtimes: { [key: string]: IFieldRuntimeData }
    }

    export interface IFieldRuntimeData extends IResfield_runtimes, IConditionRuntime {
        id: number
        guid: number
        count: number
    }

    @RegisterModel("field")
    export class FieldModel extends BaseModel<IFieldRuntimeData> {

        runtimes: IFieldRuntime;

        @SOCKET_EVT(SM_CODE.SM_Plant, SM_CODE.SM_Care, SM_CODE.SM_Harvest, SM_CODE.SM_StopPlant)
        refreshMapCity(event: StreamX) {

            if (event.data) {
                addPrompt("条件不满足！");
            } else {
                facade.simpleDispatch(GameEvent.REFRESH_ELEMENT);
                facade.simpleDispatch(GameEvent.REFRESH_ROOM_PROGRESS);
            }
        }

        checkName(element: IElementRuntime) {

            let { elementId } = element;

            let field = this.runtimes.runtimes[elementId];

            if (field) {

                let { seedid, harvestTime } = field;
                if (seedid) {
                    let item = gameConfig.field[seedid];
                    if (item) {

                        let rulsut = (getServerDate() >= harvestTime);
                        if (rulsut) {
                            element.name = "待收获"
                        } else {
                            element.name = item.name;
                        }
                    }
                } else {
                    let e = gameConfig.element[elementId];

                    if (e) {
                        element.name = e.name;
                    }
                }
            }
        }

        checkStatus(guid: number | string) {

            let flag = true;

            let field = this.runtimes.runtimes[guid];

            if (field) {

                let { seedid } = field;
                if (seedid) {
                    flag = false;
                }

            }

            return flag;
        }

        getRoomProgress() {

            let runtime: IFieldRuntimeData = undefined;

            foreach(this.runtimes.runtimes, v => {
                let { seedid, harvestTime } = v;
                if (seedid) {

                    if (!runtime) {
                        runtime = v;
                    } else {
                        if (runtime.harvestTime < harvestTime) {
                            runtime = v;
                        }
                    }
                }
                return true;
            });

            if (runtime) {
                let { seedid, harvestTime } = runtime;
                let item = gameConfig.field[seedid];
                if (item) {

                    let info = { progress: 1, roomType: ROOM_TYPE.TianYuan, icon: cfgData.fieldIcon } as IRoomProgressInfo;

                    let time = (harvestTime - getServerDate());
                    if (time > 0) {
                        let allTime = Math.floor(item.maturity / item.maturePerSecond);
                        info.progress =  1 - (time * 0.001 / allTime);
                    }

                    RoomProgress.push(info);
                }
            }
        }
    }
}