module rf {

    export interface IElementRuntime {
        guid?: number,
        name?: string,
        level?: number,
        zhuangtai?: number,
        elementId?: number,
        element?: IElement,
    }

    export var actTarget: IElementRuntime;

    @RegisterModel("element")
    export class ElementModel extends BaseModel<IConditionRuntime> {

        // @SOCKET_EVT(SM_CODE.SM_ElementInfo)
        // elementInfo(event: StreamX) {
        // }

        checkEventPopup(runtime: IElementRuntime) {

            let { element } = runtime;

            if (!element) {
                return;
            }

            let { interactive, popupaudio } = element;

            let eventBtns = [];

            foreach(interactive, (v: any, k) => {
                let jiaohu = gameConfig.jiaohu[k];

                if (!jiaohu) {
                    return true;
                }

                foreach(v, (name, key) => {

                    let ruslut = !checkLimit(jiaohu[key]);

                    if (ruslut) {
                        let runtime = { name, type: key } as IEventBtnData;
                        eventBtns.push(runtime);
                    }

                    return true;
                })

                return true;
            })

            let tasks = taskModel.getTaskConfigByNpcId((element.id).toString());

            forarr(tasks, v => {
                let { guid, config, id } = v;

                let name = config.model.name;
                name = name.length > 5 ? `${name.substring(0, 3)}...` : name;

                let task = taskModel.runtimes.runtimes[guid] as ITaskRuntimeData;
                let runtime = { name, type: `task_${id}`, task } as IEventBtnData;

                eventBtns.push(runtime);

                return true;
            });

            let audio = "tan_kuang_yin";
            if (popupaudio.length) {
                let index = popupaudio.length * Math.random() >> 0;
                audio = popupaudio[index];
            }

            if (eventBtns.length) {
                let evt = singleton(EventSelectPopup);
                evt.eventBtns = eventBtns;
                evt.open(runtime, this, audio);
            } else {
                singleton(EventDescPopup).open(runtime, this, audio);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_ElementAct)
        elementAct(event: StreamX) {

            let action = event.data as IElementActionResponse;

            if (!action) {
                // console.error("服务器没有该按钮功能, 请确定按钮是否需要与服务器交互!");
                return;
            }

            let { act, data, success, guid } = action;

            if (actions[act]) {
                if (success == 0) {
                    let element = mapModel.currentRoles[guid];
                    if (element) {
                        actTarget = element;

                        let { currentRoom } = mapModel;
                        if (currentRoom) {
                            let room = roomModel.getRoomInfo(currentRoom.roomId);
                            if (room && room.status) {
                                addPrompt("房屋升级中,暂不可使用!");
                                return;
                            }
                        }
                        actions[act].response(data, element);
                    }
                }
            }
        }

        elementPhase(guid: number, elementId: number, act: string | number) {

            let element = gameConfig.element[elementId];

            let ruslut = true;

            if (element.xiangwei) {
                let phase = playPhase(element.xiangwei);

                if (phase) {
                    ruslut = false;
                    phase.on(EventT.COMPLETE, (event: EventX) => {
                        this.phaseComplete(event);
                        foward(CM_CODE.CM_ElementAct, { guid: guid ? guid : elementId, act });
                    }, this)
                }
            }

            if (ruslut) {
                foward(CM_CODE.CM_ElementAct, { guid: guid ? guid : elementId, act });
            }
        }

        phaseComplete(event: EventX) {
            let phase = event.currentTarget as Recyclable<Phase>;
            phase.off(EventT.COMPLETE, this.phaseComplete, this);
            phase.recycle();
        }

        taskGuid: number;

        taskPhase(task: ITaskRuntimeData) {
            let { guid, config, active } = task;
            let { activePhase, endPhase, reward_client } = config.model;
            this.taskGuid = task.guid;

            if (active == TASK_FLAG.Active) {
                if (activePhase) {
                    let phase = playPhase(activePhase);
                    // phase.on(EventT.COMPLETE, this.taskPhaseComplete, this);
                } else {
                    foward(CM_CODE.CM_AcceptTask, guid);
                    taskModel.automaticTrack(task);

                    if (reward_client && reward_client.length) {
                        singleton(TaskAcceptPopup).open(task);
                    }

                }
            }

            if (active == TASK_FLAG.PRE_COMPLETE) {
                // 领取奖励
                if (endPhase) {
                    let phase = playPhase(endPhase);
                    // phase.on(EventT.COMPLETE, this.taskPhaseComplete, this);
                } else {
                    currentRewardTask = task;
                    foward(CM_CODE.CM_RewardTask, guid);
                }
            }
        }

        @EVT("phase_complete")
        taskPhaseComplete(event: EventX) {
            // let phase = event.currentTarget as Recyclable<Phase>;
            // phase.off(EventT.COMPLETE, this.taskPhaseComplete, this);
            // phase.recycle();

            let runtime = modelData.task.runtimes[this.taskGuid] as ITaskRuntimeData;

            if (runtime) {
                if (runtime.active == TASK_FLAG.Active) {
                    foward(CM_CODE.CM_AcceptTask, runtime.guid);
                    taskModel.automaticTrack(runtime);

                    let {reward_client} = runtime.config.model;
                    if (reward_client && reward_client.length) {
                        singleton(TaskAcceptPopup).open(runtime);
                    }
                }

                if (runtime.active == TASK_FLAG.PRE_COMPLETE) {
                    currentRewardTask = runtime;
                    foward(CM_CODE.CM_RewardTask, runtime.guid);
                }
            }

            this.taskGuid = undefined;
        }

        @CodeFunc()
        static getMapElement(propertys: [number, number, number]) {

            let [elementId, scence, bool] = propertys;
            let comp = undefined;

            if (scence) {
                comp = singleton(MijingCoreComp);
            } else {
                comp = singleton(CityCoreComp);
            }

            let { list } = comp;

            if (!list) {
                return;
            }

            let item = undefined;

            forarr(list.childrens.datas, (v: (MijingElementItem | CityElementItem)) => {

                let { _data } = v;

                if (_data.elementId == elementId) {
                    item = v;
                    return false;
                }

                return true;
            });

            if (bool) {
                return (item != undefined);
            }

            return item;
        }
    }

    export var elementModel = singleton(ElementModel);

}