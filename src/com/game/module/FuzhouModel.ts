module rf {
    export interface IFuzhouRuntime extends IResfuzhou, IModelRuntime {
        runtimes: { [key: string]: IFuzhouRuntimeData }
    }

    export interface IFuzhouRuntimeData extends IResfuzhou_runtimes, IConditionRuntime {
        id: number
        guid: number
        count: number
    }

    @RegisterModel("fuzhou")
    export class FuzhouModel extends BaseModel<IFuzhouRuntimeData> {

        runtimes: IFuzhouRuntime;

        @SOCKET_EVT(SM_CODE.SM_StopFuZhou, SM_CODE.SM_FuzhouHarvest)
        addReward(event: StreamX) {
            let [success, number, fuzhouid] = event.data;

            if (!number) {
                this.refreshMapCity();
                return;
            }

            let fuzhou = gameConfig.conbine[fuzhouid];

            if (!fuzhou) {
                return;
            }

            let { reward } = fuzhou;

            let list = getLimitValues(reward);

            forarr(list, v => {
                let { name, count } = v;
                addPrompt(`${name} x${count * number}`);
                return true;
            });

            this.refreshMapCity();
        }

        @SOCKET_EVT(SM_CODE.SM_MakeFuzhou)
        refreshMapCity(event?: StreamX) {

            facade.simpleDispatch(GameEvent.REFRESH_ELEMENT);
            facade.simpleDispatch(GameEvent.REFRESH_ROOM_PROGRESS);
        }

        checkName(element: IElementRuntime) {
            let { elementId } = element;

            let fuzhou = this.runtimes.runtimes[elementId];

            if (fuzhou) {

                let { fuzhouid, harvestTime } = fuzhou;
                if (fuzhouid) {
                    let item = gameConfig.conbine[fuzhouid];
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

            let fuzhou = this.runtimes.runtimes[guid];

            if (fuzhou) {

                let { fuzhouid } = fuzhou;
                if (fuzhouid) {
                    flag = false;
                }

            }

            return flag;
        }

        getRoomProgress() {

            let runtime: IFuzhouRuntimeData = undefined;

            foreach(this.runtimes.runtimes, v => {
                let { fuzhouid, harvestTime } = v;
                if (fuzhouid) {

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
                let { fuzhouid, harvestTime, times } = runtime;
                let item = gameConfig.conbine[fuzhouid];
                if (item) {

                    let info = { progress: 1, roomType: ROOM_TYPE.Fuzhou, icon: cfgData.fuzhouIcon } as IRoomProgressInfo;

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