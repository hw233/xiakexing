module rf {

    export var _passXinshou = false;

    export var currentRewardTask: ITaskRuntimeData = undefined;

    export interface Phase {
        _task: ITaskRuntimeData;
    }

    export interface ITaskRuntime extends IRestask, IConditionRuntime {
        runtimes: { [key: number]: ITaskRuntimeData }
    }

    export interface ITaskRuntimeData extends IRestask_runtimes, IConditionRuntime {
        id: any;
        guid: any;
        config: ITaskConfig;
    }

    export interface ITaskConfig {
        group: number;
        kind: number;
        model: ITaskIndex;
    }

    export const enum GameEvent {
        CHANGE_TRACK_TASK = GameEvent.TASK,
        REFRESH_TASK_ACTIVE,
        REFRESH_TASK_JINDU,
    }

    export var taskobj = {} as { [key: string]: ITaskIndex };

    @RegisterModel("task")
    export class TaskModel extends BaseModel<IConditionRuntime> {

        runtimes: ITaskRuntime;

        taskConfig: { [key: string]: ITaskConfig } = {};

        initData() {

            foreach(gameConfig.task, v => {
                let { group, kind, indexs } = v;
                forarr(indexs, (o) => {
                    this.taskConfig[o.id] = { group, kind, model: o } as ITaskConfig;
                    return true;
                })

                return true;
            });
        }

        loadSaveData(runtimes: ITaskRuntime) {
            pro_copy(this.runtimes, runtimes);

            let phase: ITaskRuntimeData = undefined;

            foreach(this.runtimes.runtimes, v => {

                if (!this.checkConfig(v)) {
                    return true;
                }

                let { active, config } = v;

                let { completionCondition, xiangwei } = config.model;

                if (active != TASK_FLAG.COMPLETE) {

                    if (active != TASK_FLAG.NotActive) {
                        if (xiangwei) {
                            phase = v;
                        }
                    }

                    if (completionCondition && active == TASK_FLAG.ACCEPT) {
                        onLimit(completionCondition, this.check, this);
                    }
                }
                return true;

            }, this);


            if (phase) {
                callLater.later(this.continueXiangwei, this, 300, [phase]);
            }
        }

        checkConfig(runtime: ITaskRuntimeData) {

            if (!runtime.config) {
                let config = this.taskConfig[runtime.id];
                runtime.config = config;

                if (!config) {
                    console.warn(`${runtime.id}  没有config`);
                    delete this.runtimes.runtimes[runtime.guid];
                    return false;
                }
            }

            return true;
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.RUNTIMES}`)
        addTaskListener(event: EventX) {

            let v = event.data as ITaskRuntimeData;
            if (v) {
                if (modelData.task.runtimes[v.guid]) {
                    if (!this.checkConfig(v)) {
                        return true;
                    }

                    let { active, config } = v;
                    let { completionCondition } = config.model;

                    if (completionCondition && active != TASK_FLAG.COMPLETE) {
                        onLimit(completionCondition, this.check, this);
                    }
                }
            }
        }

        check(event?: EventX) {

            callLater.add(() => {
                facade.simpleDispatch(GameEvent.REFRESH_TASK_JINDU);
            }, this);
        }

        currentphase: Phase;
        continueXiangwei(propertys: [ITaskRuntimeData]) {
            let [task] = propertys;

            let { model } = task.config;

            let phase = playPhase(model.xiangwei, modelData);
            if (phase) {
                phase._task = task;
                phase.on(EventT.COMPLETE, this.phaseComplete, this);
            } else {
                this.taskRequstReward(task);
            }

            foward(CM_CODE.CM_TrackTask, task.guid);
        }

        showAcceptableTask(npcId: string) {
            let { runtimes } = this;
            let runtime: ITaskRuntimeData = undefined;

            foreach(runtimes.runtimes, v => {
                let { active, config } = v;
                let { beginNpcId, npcId: endNpcId } = config.model;

                if (beginNpcId == "master") {
                    beginNpcId = `${modelData.menpai.master}`;
                }
                if (beginNpcId == npcId && active == TASK_FLAG.Active) {
                    runtime = v;
                    return false;
                }

                if (endNpcId == "master") {
                    endNpcId = `${modelData.menpai.master}`;
                }

                if (endNpcId == npcId && (active == TASK_FLAG.ACCEPT || active == TASK_FLAG.PRE_COMPLETE)) {
                    runtime = v;
                    return false;
                }

                return true;
            });

            return runtime;
        }

        key2runtime(limit: IConfigLimit) {
            let condition = limit.target[0];
            let kv = this.runtimes.key[condition.value];
            if (!kv) {
                this.runtimes.key[condition.value] = kv = { key: condition.value, value: 0 };
            }
            return kv;
        }

        id2runtime(limit: IConfigLimit) {
            let data = this.runtimes;
            let { target } = limit;
            let taskid = target.length ? target[0].value : undefined;
            let conf = this.taskConfig[taskid];
            let runtime: IRestask_runtimes;
            if (taskid) {
                foreach(data.runtimes, (v, k) => {
                    if (v.id == taskid) {
                        runtime = v;
                        return false
                    } else {
                        //如果同一组
                        if (conf.group == this.taskConfig[v.id].group) {
                            //已做到该任务的后续任务
                            if (v.id > taskid) {
                                runtime = { id: taskid, active: TASK_FLAG.COMPLETE }
                                return false;
                            }
                        }
                    }
                    return true
                })
            }
            return runtime;
        }

        @SOCKET_EVT(SM_CODE.SM_RewardTask)
        SM_RewardTask(event: StreamX) {

            switch (event.data) {
                case 2:
                    addPrompt("背包空位不足!");
                    break;
                default:
                    if (currentRewardTask) {
                        this.messageTalk(currentRewardTask);
                        currentRewardTask = undefined;
                    }
                    break;
            }

        }

        phaseComplete(event: EventX) {
            let phase = event.currentTarget as Recyclable<Phase>
            phase.off(EventT.COMPLETE, this.phaseComplete, this);
            phase.recycle();
            this.taskRequstReward(phase._task);
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.RUNTIMES}.${IRestask_runtimesConst.ACTIVE}`)
        changeTaskActive(event: EventX) {
            let runtime = event.data as ITaskRuntimeData;

            let { active, config, guid } = runtime;
            let { xiangwei, completionCondition, kind, activetips, beginNpcId, acceptPhase } = config.model;

            facade.simpleDispatch(GameEvent.REFRESH_TASK_ACTIVE, runtime);

            switch (active) {

                case TASK_FLAG.Active:

                    if (kind == TASK_KIND_TYPE.XIAN_SHI && activetips) {
                        addPrompt(activetips);
                        addMessage(activetips);
                    }

                    if (!beginNpcId) {
                        if (!acceptPhase) {
                            foward(CM_CODE.CM_AcceptTask, guid);
                            taskModel.automaticTrack(runtime);
                        }
                        // if(acceptPhase) {
                        //     playPhase(acceptPhase);
                        // }
                    }
                    break;
                case TASK_FLAG.PRE_COMPLETE:
                    if (xiangwei && !_passXinshou) {
                        this.continueXiangwei([runtime]);
                    } else {
                        this.taskRequstReward(runtime);
                    }
                    break;
                case TASK_FLAG.COMPLETE:
                    if (completionCondition) {
                        offLimit(completionCondition, this.check, this);
                    }
                    break;
            }
        }

        taskRequstReward(runtime: ITaskRuntimeData) {
            let { guid, config, active } = runtime;
            if (!config.model.npcId) {
                if (active == TASK_FLAG.PRE_COMPLETE) {
                    currentRewardTask = runtime;
                    foward(CM_CODE.CM_RewardTask, guid);
                }
            }
        }

        messageTalk(runtime: ITaskRuntimeData) {

            if (!runtime) {
                console.error("messageTalk  runtime为空");
                return;
            }

            let { config } = runtime;
            let { name, reward_client, type } = config.model;

            let rewardTxt = "";
            forarr(getLimitValues(reward_client), (v) => {
                if (v.show == undefined || v.show == 0) {
                    rewardTxt += `${v.name}: ${v.maxCount}  `;
                }
                return true;
            });

            if (rewardTxt.length) {
                addMessage(`<font color="${Style.BROWN}">完成任务</font> [<font color="#EA2E05">${name}</font>]\\n-----------------------------------`);
            }

            if (type != TASK_FLAG.PRE_COMPLETE && reward_client && reward_client.length) {
                singleton(TaskRewardPopup).open(runtime, this, "wan_cheng_ren_wu");
            }
        }

        getXuanshangTask() {
            let data: ITaskRuntimeData[] = [];

            foreach(this.runtimes.runtimes, (v: ITaskRuntimeData) => {
                let { config } = v;
                let { kind } = config.model;

                if (kind == TASK_KIND_TYPE.XUAN_SHANG) {
                    data.push(v);
                }

                return true;
            });

            return data;
        }

        getTaskByKinds(...kinds: number[]) {
            let data: ITaskRuntimeData[] = [];

            foreach(this.runtimes.runtimes, (v: ITaskRuntimeData) => {
                let { config, active } = v;

                if (config.model.type != 3) {
                    if (kinds.indexOf(config.kind) != -1) {
                        if (active == TASK_FLAG.ACCEPT || active == TASK_FLAG.PRE_COMPLETE) {
                            data.push(v);
                        }
                    }
                }

                return true;
            });

            return data;
        }

        getTaskConfigByNpcId(npcId: string) {
            let data: ITaskRuntimeData[] = [];

            foreach(this.runtimes.runtimes, (v) => {
                let { active, config } = v;
                let { model } = config;
                let beginNpcId = model.beginNpcId;
                if (beginNpcId == "master") {
                    beginNpcId = `${modelData.menpai.master}`;
                }
                if (beginNpcId == npcId && active == TASK_FLAG.Active) {
                    data.push(v);
                }
                let endNpcId = model.npcId;
                if (endNpcId == "master") {
                    endNpcId = `${modelData.menpai.master}`;
                }
                if (endNpcId == npcId && active == TASK_FLAG.PRE_COMPLETE) {
                    data.push(v);
                }

                if (active == TASK_FLAG.ACCEPT) {
                    data.push();
                }
                return true;
            });

            return data;
        }

        // checkActiveTaskByNpcId(npcId: number) {
        //     let data: ITaskRuntimeData[] = [];
        //     foreach(this.runtimes.runtimes, (v) => {
        //         let { active, config } = v;
        //         let { model } = config;
        //         if (model.npcId == npcId && active == TASK_FLAG.Active) {
        //             data.push(v);
        //         }
        //         return true;
        //     });
        //     return data;
        // }

        @CodeFunc()
        checkTaskStatus(propertys: [number, number]) {
            let [id, status] = propertys;
            let { runtimes } = modelData.task;

            let result = undefined;

            foreach(runtimes, v => {

                if (v.id == id) {
                    result = (v.active == status);
                }

                return !result;
            });

            return result;
        }

        @GM_CMD()
        passXinshou() {
            _passXinshou = true;
            if (taskModel.currentphase) {
                taskModel.currentphase.stop();
                taskModel.currentphase.complete();
            }

            foward(126, [modelData.hero.guid, "6_17"],)
        }

        getTaskGuidById(id: number) {
            let data: ITaskRuntimeData;
            foreach(this.runtimes.runtimes, (v) => {
                if (v.id == id) {
                    data = v;
                    return false;
                }
                return true;
            });
            return data;
        }

        @SOCKET_EVT(SM_CODE.SM_FreshXuanShangTask)
        freshXuanShangTask(event: EventX) {
            // let xuansahng = singleton(XuanshangTopComp);
            // if (!checkPop(xuansahng)) {
            //     xuansahng.open();
            // }
        }

        getNextTaskByCurTask(cur: ITaskRuntimeData) {
            let runtimes = this.runtimes.runtimes;
            let curConfig = cur.config;
            let next: ITaskRuntimeData;
            foreach(runtimes, (v) => {
                let nextConfig = v.config;
                if (curConfig.group == nextConfig.group) {
                    if (nextConfig.model.index - curConfig.model.index == 1) {
                        next = v;
                        return false;
                    }
                }
                return true;
            });

            return next;
        }

        automaticTrack(task: ITaskRuntimeData) {
            let runtime = modelData.task;
            if (runtime.trackGuid == 0) {
                foward(CM_CODE.CM_TrackTask, task.guid);
            }
        }
    }

    export let taskModel = singleton(TaskModel);
}
