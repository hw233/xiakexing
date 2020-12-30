module rf {

    @RegisterModel("waKuang")
    export class WakuangModel extends BaseModel<IConditionRuntime> {


        @SOCKET_EVT(SM_CODE.SM_ShowGetItems)
        SM_ShowGetItems(event: StreamX) {

            let limits = event.data as IConfigLimit[];

            forarr(getLimitValues(limits), v => {

                let { moduleName, name, maxCount, id, runtime } = v;

                if (moduleName == "item") {
                    return;
                }

                if (moduleName == "skill") {

                    if (!runtime) {
                        console.error(debug, "what?runtime");
                    }

                    let { exp, maxExp } = runtime;

                    if (exp >= maxExp) {
                        addPrompt(`你的武学基础不够牢固!`);
                        return true;
                    }

                    addPrompt(`${name}的经验值增加了!`);
                    addMessage(`<font color ="${Style.HONG_AN}">${name}的经验值增加了!</font>`);
                } else {
                    addPrompt(`获得了${name} x${maxCount}`);
                    addMessage(`<font color ="${Style.HONG_AN}">获得了${name} x${maxCount}</font>`);
                }

                return true;
            })
        }

        @SOCKET_EVT(SM_CODE.SM_WaKuang)
        SM_WaKuang(event: StreamX) {

            let [ret, begin, end] = event.data;

            if (ret || !currentWakuang) {
                addPrompt("不知道发生了什么？");
                return;
            }

            currentWakuang.beginTime = begin;
            currentWakuang.endTime = end;

            facade.simpleDispatch(GameEvent.REFRESH_WAKUANG_DATA);
        }

        @SOCKET_EVT(SM_CODE.SM_WaKuangStop)
        SM_WaKuangStop(event: StreamX) {

            let [ret, progress] = event.data;

            if (ret || !currentWakuang) {
                addPrompt("不知道发生了什么？");
                return;
            }

            currentWakuang.progress = progress;
            currentWakuang.beginTime = 0;
            currentWakuang.endTime = 0;

            facade.simpleDispatch(GameEvent.REFRESH_WAKUANG_DATA);
        }

        @SOCKET_EVT(SM_CODE.SM_WaKuangReward)
        SM_WaKuangReward(event: StreamX) {

            let [ret, collection] = event.data;

            if (ret || !currentWakuang) {

                if (ret == 4) {
                    addPrompt("背包空位不足！");
                } else if (ret == 5) {
                    addPrompt(`你的武学基础不够牢固!`);
                }
                else {
                    addPrompt("不知道发生了什么？");
                }

                return;
            }

            let { maxcollection, type } = currentWakuang;

            if (collection == maxcollection) {
                facade.simpleDispatch(GameEvent.CLOSE_ALL_POPUP);

                let cfg = getTypeDefines(TYPE_CONFIG.DIG);
                addMessage(cfg[type].desc);
            }

            currentWakuang.collection = collection;
            currentWakuang.beginTime = 0;
            currentWakuang.endTime = 0;
            currentWakuang.progress = 0;

            facade.simpleDispatch(GameEvent.REFRESH_WAKUANG_DATA);
        }
    }
}