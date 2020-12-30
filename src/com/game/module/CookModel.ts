module rf {

    export interface ICookRuntime extends IResitem, IModelRuntime {
        runtimes: { [key: string]: ICookRuntimeData }
    }

    export interface ICookRuntimeData extends IRescook_runtimes, IConditionRuntime {
        id: number
        guid: number
        count: number
    }

    @RegisterModel("cook")
    export class CookModel extends BaseModel<IFieldRuntimeData> {

        runtimes: ICookRuntime;

        loadSaveData(value: ICookRuntime) {
            super.loadSaveData(value);
        }

        @SOCKET_EVT(SM_CODE.SM_StopCook, SM_CODE.SM_CookHarvest)
        addReward(event: StreamX) {
            let [success, number, foodid] = event.data;

            if (!number) {
                this.refreshMapCity();
                return;
            }

            let food = gameConfig.conbine[foodid];

            if (!food) {
                return;
            }

            let { reward } = food;

            let list = getLimitValues(reward);

            forarr(list, v => {
                let { name } = v;
                addPrompt(`${name} x${number}`);
                return true;
            });

            this.refreshMapCity();
        }

        @SOCKET_EVT(SM_CODE.SM_Cook)
        refreshMapCity(event?: StreamX) {

            facade.simpleDispatch(GameEvent.REFRESH_ELEMENT);
            facade.simpleDispatch(GameEvent.REFRESH_ROOM_PROGRESS);
        }

        checkName(element: IElementRuntime) {
            let { elementId } = element;

            let food = this.runtimes.runtimes[elementId];

            if (food) {

                let { foodid, harvestTime } = food;
                if (foodid) {
                    let item = gameConfig.conbine[foodid];
                    if (item) {

                        let rulsut = (getServerDate() >= harvestTime);
                        if (rulsut) {
                            element.name = "待收获";
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

            let food = this.runtimes.runtimes[guid];

            if (food) {

                let { foodid } = food;
                if (foodid) {
                    flag = false;
                }

            }

            return flag;
        }

        getRoomProgress() {

            let runtime: ICookRuntimeData = undefined;

            foreach(this.runtimes.runtimes, v => {
                let { foodid, harvestTime } = v;
                if (foodid) {

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
                let { foodid, harvestTime, times } = runtime;
                let item = gameConfig.conbine[foodid];
                if (item) {
                    let info = { progress: 1, roomType: ROOM_TYPE.ChuFang, icon: cfgData.cookIcon } as IRoomProgressInfo;

                    let time = (harvestTime - getServerDate());

                    if (time > 0) {
                        let alltime = item.cookTimeSeconds * times;
                        info.progress = 1 - (time * 0.001 / alltime);
                    }

                    RoomProgress.push(info);
                }
            }
        }
    }
}