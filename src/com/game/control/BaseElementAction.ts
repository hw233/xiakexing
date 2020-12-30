module rf {
    export interface IElementActionResponse {
        act: string,
        data: any,
        guid: number,
        success: number, //0是成功
    }

    export interface IActions {
        [key: string]: BaseElementAction;
    }

    export var actions = {} as IActions;

    export function RegisterAction(type: string) {
        return (target: { new(): BaseElementAction }) => {
            let action = singleton(target);
            action.key = type;
            actions[type] = action;
        }
    }

    export class BaseElementAction {
        key: string;
        response(data: any, target: IElementRuntime) { }
        end(v: any) { }
        check(_data: IElementRuntime): boolean { return true; }
    }

    //返回值是对话数组
    @RegisterAction("talk")
    export class TalkAction extends BaseElementAction {

        check(_data: IReshero) {
            let element = gameConfig.element[_data.elementId];
            let talkIndex = Math.random() * element.talk.length >> 0;
            let talk = gameConfig.talk[element.talk[talkIndex]];
            if (talk == undefined) {
                createMessageRuntime({ channel: CHAT_TYPE.ROOM, sName: element.name, message: "去去去,懒得搭理你(白了你一眼)!", time: getServerDate() } as IMessageRuntime);
            } else {
                createMessageRuntime({ channel: CHAT_TYPE.ROOM, sName: element.name, message: `<font color="#404040">"${talk.value}"</font>`, time: getServerDate() } as IMessageRuntime);
            }

            if (element.sound && element.sound.length) {
                let soundIndex = Math.random() * element.sound.length >> 0;
                playEffectKeyByAudio(element.sound[soundIndex]);
            }

            return false;
        }
    }

    @RegisterAction("master")
    export class MasterAction extends BaseElementAction {
        response() {
            if (modelData.res.xsYindao) {
                addPrompt("已经有了师傅，快去请教练功!");
                changeMainDele(singleton(BaishiTopComp));
            }
        }

        check(_data: IElementRuntime): boolean {
            let elementConfig = gameConfig.element[_data.elementId];
            if (checkLimit(elementConfig.condition)) {
                // 拜师条件不满足
                addPrompt(`你的门派地位不足，不能拜其为师！`);
                addMessage(`你的门派地位不足，不能拜其为师！`);
                return false;
            }
            return true;
        }
    }

    //门派福利
    @RegisterAction("welfare")
    export class WelfareAction extends BaseElementAction {

        response() {

        }

        check(_data: IElementRuntime) {
            let config = gameConfig.element[_data.elementId];
            if (checkLimit(config.condition)) {
                addPrompt(`你今天已经领取过福利了！`);
                addMessage(`你今天已经领取过福利了！`);
                return false;
            }
            return true;
        }
    }

    //请教
    @RegisterAction("teach")
    export class TeachAction extends BaseElementAction {
        response(data: any, target: IElementRuntime) {
            changeMainDele(singleton(BaishiTopComp));
        }
    }

    @RegisterAction("fight")
    export class FightAction extends BaseElementAction {
        check(_data: IElementRuntime) {
            let flag = false;

            foreach(mapModel.currentRoles, v => {

                if (v.guid == _data.guid) {
                    flag = true;
                }
                return !flag;
            });

            if (!flag) {
                addPrompt("该玩家已离开,无法战斗!");
            }

            return flag;
        }
    }

    @RegisterAction("kill")
    export class KillAction extends BaseElementAction {

        check(_data: IElementRuntime) {

            let flag = false;

            foreach(mapModel.currentRoles, v => {

                if (v.guid == _data.guid) {
                    flag = true;
                }
                return !flag;
            });

            if (!flag) {
                addPrompt("该玩家已离开,无法战斗!");
            }

            return flag;
        }
    }

    @RegisterAction("turnon")
    export class TurnonAction extends BaseElementAction {
        response(data, target: IElementRuntime) {
            singleton(TurnonPopup).open(target);
        }
    }

    @RegisterAction("open")
    export class ChetAction extends BaseElementAction {
        response(data: IChetRuntime, target: IElementRuntime) {

            let { elementId, element } = target;
            data = chetModel.setCurrent(data);

            let beibao = singleton(BeibaoComp);

            changeMainDele(beibao, undefined, false);

            let type = OPEN_TYEP.baoxiang;
            if (elementId == 10010) {
                type = OPEN_TYEP.shiti;
            }

            // if (element.sound) {
            //     playEffectKeyByAudio(element.sound[0]);
            // }

            let close = () => {

            }

            beibao.data = { type, data: data.cbag, close, thisobj: this } as IBeibaoData;
        }
    }

    @RegisterAction("refreshOpen")
    export class RefreshOpenAction extends BaseElementAction {
        response(data: IChetRuntime, target: IElementRuntime) {

            data = chetModel.setCurrent(data);

            let beibao = singleton(BeibaoComp);

            if (beibao.stage) {
                if (beibao.chetView) {
                    beibao.chetView.data = data.cbag;
                }
            }
        }
    }

    //种植
    @RegisterAction("field")
    export class FieldAction extends BaseElementAction {
        response(data) {

            let { elementId } = actTarget;

            let field = modelData.field.runtimes[elementId];

            if (field) {

                let { guid, seedid, harvestTime } = field;

                if (seedid) {

                    let rulsut = (getServerDate() >= harvestTime);

                    if (rulsut) {
                        //收获
                        foward(CM_CODE.CM_Harvest, guid);

                        let field = gameConfig.field[seedid];

                        if (!field) {
                            return;
                        }

                        let { reward } = field;
                        forarr(getLimitValues(reward), v => {
                            let { name, maxCount } = v;
                            addPrompt(`${name} x${maxCount}`);
                            return true;
                        });

                    } else {
                        singleton(FieldZhaoLiaoPopup).open(field);
                    }

                } else {

                    let combine: { [key: string]: IItemCombine } = {};

                    foreach(modelData.item.runtimes, v => {
                        let { id, guid, count, type } = v;

                        if (type == 3) {
                            if (!combine[id]) {
                                let model = gameConfig.item[id];
                                combine[id] = { id, guid, model, count: 0 } as IItemCombine;
                            }

                            combine[id].count += count;

                        }

                        return true;
                    });

                    let list: IItemCombine[] = [];

                    foreach(combine, v => {

                        list.push(v);
                        return true;
                    });

                    if (!list.length) {
                        addPrompt("当前没有种子!");
                        return;
                    }

                    let popup = singleton(FieldSelectPopup);
                    popup.guid = guid;
                    popup.open(list, this);

                }
            }
        }
    }

    //烹饪
    @RegisterAction("cook")
    export class CookAction extends BaseElementAction {
        response(data) {

            let { elementId } = actTarget;

            let cook = modelData.cook.runtimes[elementId];

            if (cook) {

                let { guid, foodid, harvestTime } = cook;

                if (foodid) {

                    let rulsut = (getServerDate() >= harvestTime);

                    if (rulsut) {
                        //收获
                        foward(CM_CODE.CM_CookHarvest, guid);
                    } else {
                        singleton(CookQuXiaoPopup).open(cook);
                    }
                } else {

                    let element = gameConfig.element[guid];

                    if (!element) {
                        return;
                    }

                    let list: IConbine[] = [];
                    let conbine = gameConfig.conbine;

                    forarr(element.menuids, v => {
                        let runtime = conbine[v];
                        if (runtime) {
                            list.push(runtime);
                            return;
                        }
                        return true;
                    });

                    let popup = singleton(CookSelectPopup);
                    popup.guid = guid;
                    popup.open(list, this);

                }

            }
        }
    }

    //符咒
    @RegisterAction("fuzhou")
    export class FuzhouAction extends BaseElementAction {
        response(data) {

            let { elementId } = actTarget;

            let fuzhou = modelData.fuzhou.runtimes[elementId];

            if (fuzhou) {

                let { guid, fuzhouid, harvestTime } = fuzhou;

                if (fuzhouid) {

                    let rulsut = (getServerDate() >= harvestTime);

                    if (rulsut) {
                        //收获
                        foward(CM_CODE.CM_FuzhouHarvest, guid);
                    } else {
                        singleton(FuzhouQuXiaoPopup).open(fuzhou);
                    }
                } else {

                    let element = gameConfig.element[guid];

                    if (!element) {
                        return;
                    }

                    let list: IConbine[] = [];
                    let conbine = gameConfig.conbine;

                    forarr(element.menuids, v => {
                        let runtime = conbine[v];
                        if (runtime) {
                            list.push(runtime);
                            return;
                        }
                        return true;
                    });

                    let popup = singleton(FuzhouSelectPopup);
                    popup.guid = guid;
                    popup.open(list, this);

                }
            }
        }
    }

    //练功
    @RegisterAction("practice")
    export class PracticeAction extends BaseElementAction {
        response(data) {
            changeMainDele(singleton(LiangongTopComp));
        }
    }

    //书房
    @RegisterAction("book")
    export class BookAction extends BaseElementAction {
        response(data) {
            changeMainDele(singleton(ShufangTopComp));
        }
    }

    //睡觉
    @RegisterAction("sleep")
    export class SleepAction extends BaseElementAction {
        response(data) {
            singleton(ShuijiaoPopupComp).open();
        }
    }

    //交易
    @RegisterAction("deal")
    export class DealAction extends BaseElementAction {
        response(data, guid) {

            playEffectKeyByAudio("jiao_yi");

            let deal = singleton(NpcDealComp);
            changeMainDele(deal, undefined, false);

            deal.data = { npc: data, player: modelData.item.bag[1] }
        }
    }

    @RegisterAction("transfer")
    export class TransferAction extends BaseElementAction {

        check(_data: IReshero) {
            let element = gameConfig.element[_data.elementId];
            let check = checkLimit(element.condition) as any;

            if (!check) {
                return true;
            }
            // let pro = getProDefine("skill", check.id);
            addPrompt(`基础轻功等级需要 ${check.opera} ${check.value}`);
            return false;
        }

        response(data, guid: IElementRuntime) {
            playEffectKeyByAudio("chuan_song");
        }
    }

    @RegisterAction("exchange")
    export class ExchangeAction extends BaseElementAction {
        response(data, guid: IElementRuntime) {
            playEffectKeyByAudio("dui_huan");
        }
    }

    //开锁
    @RegisterAction("unlocking")
    export class UnlockingAction extends BaseElementAction {

        check(_data: IElementRuntime) {

            let conbinecfg = gameConfig.conbine[_data.element.unlocking];
            if (conbinecfg) {
                let { conbineCost } = conbinecfg;
                if (!checkLimit(conbineCost)) {
                    return true;
                } else {
                    addPrompt("所需物品不足!");
                }

                return false;
            }
        }
    }

    //挖矿
    @RegisterAction("wakuang")
    export class WaKuangAction extends BaseElementAction {
        response(data: WaKuangData, element: IElementRuntime) {

            if (data) {
                if (data.user) {
                    addPrompt("该矿山已被他人占用,请稍后再来!");
                    return;
                }

                let popup = singleton(WakuangPopup);
                popup.guid = element.guid;
                popup.open(data);
            }
        }
    }


    //悬赏任务
    @RegisterAction("xuanshang")
    export class XuanShangAction extends BaseElementAction {

        response(data, guid: IElementRuntime) {
            singleton(XuanshangTopComp).open();
        }
    }

    export var inquirePool: { [key: string]: IQingbaoType[] } = {};

    export interface IElementQingbaoRuntime {
        id: number;
        model: IQingbaoType;
        timer: number;
    }

    export var elementQingbao: { [key: string]: IElementQingbaoRuntime } = {};

    //打探
    @RegisterAction("inquire")
    export class InquireAction extends BaseElementAction {

        response(data, traget: IElementRuntime) {
            let { qingbao, id } = traget.element;

            if (elementQingbao[id] && elementQingbao[id].model) {
                singleton(InquirePopup).open(elementQingbao[id]);
                return;
            }

            let pool = inquirePool[qingbao];
            if (pool.length) {
                let result: IQingbaoType = undefined;

                let w = 0;
                forarr(pool, v => {
                    w += v.weight;
                    return true;
                });

                w = Math.random2(0, w);
                let dw = 0;
                forarr(pool, v => {
                    dw += v.weight;
                    if (w < dw) {
                        result = v;
                    }
                    return !result;
                });

                if (elementQingbao[id]) {
                    elementQingbao[id].model = result;
                } else {
                    elementQingbao[id] = { id, model: result, timer: 1 } as IElementQingbaoRuntime;
                }

                pool.remove(result);

                singleton(InquirePopup).open(elementQingbao[id]);
            } else {
                addPrompt("没有值得打探的情报了，还请另寻高明!");
            }
        }
    }

    //勒索
    @RegisterAction("extort")
    export class ExtortAction extends BaseElementAction {

        response(data: number, traget: IElementRuntime) {

            let ruslut = true;

            let [success, fail] = traget.element.lesuo;

            if (ruslut) {
                console.log(debug, ruslut, success);
                playPhase(success);
            } else {
                playPhase(fail);
            }
        }
    }
}