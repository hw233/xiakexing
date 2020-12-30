module rf {

    export var lastBgm: string = undefined;

    export function createMessageRuntime(runtime: IMessageRuntime) {
        let messageRuntime: IMessageRuntime = runtime;
        let { hero } = modelData;
        let { channel: id, message, sGuid, sName, tGuid, tName } = runtime;
        let typeConfig = getTypeDefines(TYPE_CONFIG.CHAT)[id];
        let channel = gameConfig.channel[id];

        let itemMessage = "";
        let targetName = "";

        if (channel) {
            // 频道
            itemMessage = `<font color="${channel.myColor}" >[${typeConfig.name}] ${channel.desc}</font>`;
        }

        if (sGuid) {
            // 私聊、行为、世界、房间
            if (tGuid == undefined) {
                // 行为、世界、房间
                if (!channel) {
                    // 互动
                    let interactiveArr = message.split(",");
                    let [interactiveId, targetStr] = interactiveArr;
                    targetName = StringFormat.decode(targetStr);

                    let { myColor, desc, color } = gameConfig.interactive[interactiveId];
                    let [left, right] = color;

                    itemMessage = `<font color="#A52A2A" >[行为] </font><font color="${myColor}" >${desc}</font>`;

                    if (sGuid == hero.guid) {
                        sName = `【你】`;
                    } else {
                        sName = `【${sName}】`;
                    }

                    itemMessage = itemMessage.substitute(`<font color="${left}">${sName}</font>`, `<font color="${right}">${targetName}</font>`);

                } else {
                    if (sGuid == hero.guid) {
                        itemMessage = itemMessage.substitute("【我】", `<font color="${channel.color[1]}">${message}</font>`);
                    } else {
                        targetName = StringFormat.decode(`{chat|${sName},${JSON.stringify({ type: TEXT_LINK_TYPE.CHAT_LINK, channel: CHAT_TYPE.PRIVATE, guid: sGuid, name: sName })},${channel.color[0]}}`);
                        itemMessage = itemMessage.substitute(`<font color="${channel.color[0]}">【${targetName}】</font>`, `<font color="${channel.color[1]}">${message}</font>`);
                    }
                }
            } else {
                // 私聊
                if (sGuid == hero.guid) {
                    targetName = StringFormat.decode(`{chat|${tName},${JSON.stringify({ type: TEXT_LINK_TYPE.CHAT_LINK, channel: CHAT_TYPE.PRIVATE, guid: tGuid, name: tName })},${channel.color[0]}}`);
                    itemMessage = itemMessage.substitute("【你】", `<font color="${channel.color[1]}">【${targetName}】</font>`, `<font color="${channel.color[2]}">${message}</font>`);
                }
                if (tGuid == hero.guid) {
                    targetName = StringFormat.decode(`{chat|${sName},${JSON.stringify({ type: TEXT_LINK_TYPE.CHAT_LINK, channel: CHAT_TYPE.PRIVATE, guid: sGuid, name: sName })},${channel.color[0]}}`);
                    itemMessage = itemMessage.substitute(`<font color="${channel.color[0]}">【${targetName}】</font>`, "【我】", `<font color="${channel.color[2]}">${message}</font>`);
                }
            }
        } else {

            if (channel) {
                if (channel.id == CHAT_TYPE.SYSTEM) {
                    itemMessage = itemMessage.substitute(message);
                } else {
                    itemMessage = itemMessage.substitute(`<font color="${Style.LAN_PLAYER}">【${sName}】</font>`, message);
                }
            } else {
                itemMessage = `<font color="#74bbd5">${message}</font>`;
            }
        }

        messageRuntime.message = itemMessage;
        setMessageCache(messageRuntime);
        facade.simpleDispatch(GameEvent.ADD_MESSAGE, messageRuntime);
    }

    export function setMessageCache(runtime: IMessageRuntime) {
        let len = messageCache.length;
        messageCache.push(runtime);
        if (len >= cfgData.magterm) {
            messageCache = messageCache.slice(len - cfgData.magterm, len - 1);
        }
    }

    export function screenMessageCache(channels: number[]) {
        let cacheRuntimes = [] as IMessageRuntime[];
        let { hero } = modelData;
        forarr(messageCache, (runtime: IMessageRuntime) => {
            if (runtime.channel == undefined) {
                cacheRuntimes.push(runtime);
                return true;
            }
            if (runtime.channel == CHAT_TYPE.INTERACTIVE && runtime.sGuid == hero.guid) {
                cacheRuntimes.push(runtime);
                return true;
            }
            forarr(channels, (channel: number) => {
                if (runtime.channel == channel) {
                    cacheRuntimes.push(runtime);
                }
                return true;
            });
            return true;
        });
        return cacheRuntimes;
    }

    export interface IMessageRuntime {
        channel: CHAT_TYPE;
        message: string;
        time: number;
        sGuid?: number;
        sName?: string;
        tGuid?: number;
        tName?: string;
    }

    export interface IDialogueRuntime {
        type: DIALOGUR_TYPE;
        name: string;
        context: string;
        duration: number;
        click: number;
        y: number;
    }

    export interface IDialogueBuanchRuntime extends IDialogueRuntime {
        buanch: any[];
    }

    export var messageCache: IMessageRuntime[] = [];

    export interface ISettingRuntime extends __IRessetting, IModelRuntime {
        runtimes: { [key: string]: ISettingRuntimeData }
    }

    export interface ISettingRuntimeData extends __IRessetting, IConditionRuntime {

    }

    export var kickOut: boolean;

    @RegisterModel("setting")
    export class SettingModel extends BaseModel<ISettingRuntimeData> {

        runtimes: ISettingRuntime;

        loadSaveData(runtimes: { [key: string]: any }) {
            super.loadSaveData(runtimes);
        }

        /**
         * 关闭所有弹窗
         */
        @EVT(GameEvent.CLOSE_ALL_POPUP)
        closeAllPopup() {
            if (popList.length) {

                for (let i = popList.length; i >= 0; i--) {
                    let popup = popList[i];
                    if (popup) {
                        popup.close();
                        // console.log(debug, popup.__class__);
                    }
                }
            }
        }

        // @EVT(`${ResConst.RES}.${IResresConst.XSYINDAO}`, GameEvent.CHECK_FANGCHENMI)
        // checkPopup() {
        //     let { setting, res } = modelData;
        //     if (res.xsYindao && setting.fangchenmi) {
        //         let runtime = { title: "系统提示", value: "由于您是未成年人，已被纳入防沉迷系统" } as IPopRuntime;
        //         singleton(WenziTitleBtnPopup).open(runtime);
        //     }
        // }

        // @SOCKET_EVT(SM_CODE.SM_KickOut)
        // SM_KickOut(event: EventX) {

        //     kickOut = true;

        //     let [code] = event.data;

        //     let value = "";

        //     if (code == 1000) {
        //         value = "您的账号被他人登录，您将被强制下线"
        //     } else if (code == 1001) {
        //         value = "由于您是未成年人，每日22:00至次日8:00无法游玩此游戏";
        //     } else if (code == 1002) {
        //         value = "由于您是未成年人，本日游戏时间已被耗尽，您将被强制下线"
        //     }

        //     let runtime = {
        //         title: "系统提示",
        //         value,
        //         rightEvt: () => {
        //             window.location.reload();
        //         }
        //     } as IPopRuntime;

        //     singleton(WenziTitleBtnPopup).open(runtime);
        // }

        // @EVT(`${ResConst.RES}.${IResresConst.ONLINETIMEDAY}`)
        // checkFanghenmi() {
        //     let { fangchenmi } = this.runtimes;
        //     if (!fangchenmi) {
        //         return;
        //     }

        //     let { onlineTimeDay } = modelData.res;

        //     let fenzhong = (onlineTimeDay * 0.001 / 60) >> 0;

        //     if ((cfgData.fangchenmiKickTime - fenzhong) == 15) {
        //         let runtime = { title: "系统提示", value: "由于您是未成年人，本日您还剩15分钟游戏时间" } as IPopRuntime;
        //         singleton(WenziTitleBtnPopup).open(runtime);
        //     }
        // }

        @SOCKET_EVT(SM_CODE.SM_PlayPhase)
        SM_PlayPhase(event: StreamX) {
            if (event.data) {
                playPhase(event.data);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_PlaySound)
        SM_playSound(event: StreamX) {
            if (event.data) {
                playEffectKeyByAudio(event.data);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_Message)
        SM_Message(event: StreamX) {
            if (event.data) {
                addMessage(event.data);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_Prompt)
        showTips(event: StreamX) {

            if (event.data) {
                addPrompt(event.data, undefined, undefined, true);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_Alert)
        showAlerts(event: StreamX) {

            if (event.data) {
                let runtime = event.data as IPopRuntime;
                singleton(WenziTitleBtnPopup).open(runtime, this);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_InfoMessage)
        SM_WorldMessage(event: StreamX) {
            let [channel, message, sGuid, sName, tGuid, tName] = event.data;
            let time = getServerDate();
            let runtime = { channel, message, time, sGuid, sName, tGuid, tName } as IMessageRuntime;
            // parsingMessage(runtime);
            createMessageRuntime(runtime);
            if (sGuid == modelData.hero.guid && tGuid) {
                playEffectKeyByAudio("fa_song_si_liao");
            }
            if (tGuid == modelData.hero.guid) {
                playEffectKeyByAudio("jie_shou_si_liao");
            }
        }

        @SOCKET_EVT(SM_CODE.SM_Chat)
        SM_Chat(event: StreamX) {
            let [ret, error] = event.data;

            if (error !== CHAT_ERROR_CODE.UNKNOWN) {

            }

            if (error == CHAT_ERROR_CODE.CD) {
                addPrompt("你发送信息的频率过快!");
            }
        }

        @PhaseFunc("dialogue1")
        dialogue1Handler(event: IPhaseAction) {
            // 自己
            let [name, context, duration, click] = event.v as [string, string, number, number];
            return singleton(PhaseTalkComp).open({ type: DIALOGUR_TYPE.SELF, name, context, duration, click } as IDialogueRuntime);
        }

        @PhaseFunc("dialogue2")
        dialogue2Handler(event: IPhaseAction) {
            // npc
            let [name, context, duration, click] = event.v as [string, string, number, number];
            return singleton(PhaseTalkComp).open({ type: DIALOGUR_TYPE.NPC, name, context, duration, click } as IDialogueRuntime);
        }

        @PhaseFunc("dialogue3")
        dialogue3Handler(event: IPhaseAction) {
            // 旁白
            let [name, context, duration, click] = event.v as [string, string, number, number];
            return singleton(PhaseTalkComp).open({ type: DIALOGUR_TYPE.NARRATOR, name, context, duration, click } as IDialogueRuntime);
        }

        @PhaseFunc("dialogueBuanch1")
        dialogueBuanch1(event: IPhaseAction) {
            let [name, context, buanch] = event.v as [string, string, any[]];
            let runtime = { type: DIALOGUR_TYPE.SELF, name, context, buanch } as IDialogueBuanchRuntime;

            let comp = singleton(TaskTalkComp);
            comp.open(runtime);

            return comp;
        }

        @PhaseFunc("dialogueBuanch2")
        dialogueBuanch2(event: IPhaseAction) {
            let [name, context, buanch] = event.v as [string, string, any[]];
            let runtime = { type: DIALOGUR_TYPE.NPC, name, context, buanch } as IDialogueBuanchRuntime;

            let comp = singleton(TaskTalkComp);
            comp.open(runtime);

            return comp;
        }

        @PhaseFunc("acceptTask")
        accpetTask(event: IPhaseAction) {
            let id = event.q;
            let runtime = taskModel.getTaskGuidById(id);
            foward(CM_CODE.CM_AcceptTask, runtime.guid);
            // taskModel.automaticTrack(runtime);
        }

        @PhaseFunc("endTask")
        endTask(event: IPhaseAction) {
            let id = event.q;
            let runtime = taskModel.getTaskGuidById(id);
            currentRewardTask = runtime;
            foward(CM_CODE.CM_RewardTask, runtime.guid);
        }

        @PhaseFunc("tips")
        tipsHandler(event: IPhaseAction) {
            let guide = singleton(PhaseGuideComp);
            if (!event.v) {
                guide.remove();
                return;
            }
            let [context, y] = event.v as [string, number];
            guide.open({ context, y } as IDialogueRuntime);
        }

        @PhaseFunc("daojishi")
        xinshouDaojishiHandler(event: IPhaseAction) {
            let { p: show, f: action } = event;
            let comp = singleton(XinshouDaojishiComp);
            comp.data = [show, action];
            tipContainer.addChild(comp);
            return comp;
        }

        @PhaseFunc("baishi")
        baishiHandler(event: IPhaseAction) {
            let [elementId, menpaiId] = event.v;

            return singleton(XinshouJiaruMenpaiPopup).open({ elementId, menpaiId });
        }

        @PhaseFunc("zhuanchang")
        zhuanchangHandler(event: IPhaseAction) {
            if (event.v) {
                let [time1, duration1, time2, duration2] = event.v;
                zhuanchangAction([time1, time2], [duration1, duration2]);
            } else {
                zhuanchangAction();
            }
        }


        @PhaseFunc("return")
        returnHandler() {
            facade.simpleDispatch(GameEvent.BTN_RETURN);
        }

        @PhaseFunc("bgm")
        changeBgm(event: IPhaseAction) {
            let bgm = event.p;

            if (lastBgm != bgm) {

                if (lastBgm) {
                    let config = gameConfig.audio[lastBgm];
                    stopAudio(bgmSounds[config.url]);
                }

                playBgmKeyByAudio(bgm);
                lastBgm = bgm;
            }
        }

        @CodeFunc()
        setKaiChang(propertys: [number]) {
            let [show] = propertys;

            let xinshou = singleton(XinShouComp);
            if (show) {
                tipContainer.addChildAt(xinshou, 0);
            } else {
                xinshou.remove();
            }
        }

        @CodeFunc()
        getPopup(propertys: [string]) {
            let [name] = propertys;
            if (popList.length <= 0) {
                return false;
            }

            return popList[popList.length - 1].name == name;
        }

        @CodeFunc()
        setShowBar(propertys: [any]) {
            let bar = singleton(XinShouBarComp);
            tipContainer.addChild(bar);
            bar.data = propertys;
            return bar;
        }

        @PhaseFunc("track")
        track(event: IPhaseAction) {

            let [taskid] = event.v;

            let runtime: ITaskRuntimeData = undefined;
            foreach(modelData.task.runtimes, (v: ITaskRuntimeData) => {
                if (v.config.model.id == taskid) {
                    runtime = v;
                }
                return !runtime;
            })

            if (runtime) {
                foward(CM_CODE.CM_TrackTask, runtime.guid);
            }
        }

        @PhaseFunc("excelReward")
        excelReward(event: IPhaseAction) {
            let [id] = event.v;
            foward(CM_CODE.CM_ExcelReward, id);
        }

        mouseCallback() {
            mouseEnabled = true;
        }

        @PhaseFunc("mouse")
        mouse(event: IPhaseAction) {
            callLater.remove(this.mouseCallback, this);
            let p = event.p;
            if (p <= 0) {
                mouseEnabled = true;
            } else {
                mouseEnabled = false;
                callLater.later(this.mouseCallback, this, p);
            }
            // console.log(`mouseEnabled:${mouseEnabled}`);
        }

        @PhaseFunc("returnBtn")
        returnBtnHandler(event: IPhaseAction) {
            let p = event.p;
            let data = false;
            if (p == undefined) {
                data = true;
            }

            facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, data);
        }
    }

    export let settingModel = singleton(SettingModel);
}
