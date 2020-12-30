

module rf {

    export var cookieConfig: ICookieConfig = undefined;

    export interface IModels {
        [key: string]: BaseModel<IConditionRuntime>
    }


    export var models = {} as IModels;

    // export var modelData = {} as IClientData & { temp: any };

    export var tempObject = {};

    export function getModels() {
        let modelList = [] as BaseModel<IConditionRuntime>[];

        for (const key in models) {
            let model = models[key];
            modelList.push(model);
        }

        modelList.doSort("priority", true);

        return modelList;
    }

    export function RegisterModel(type: string) {
        return (target: { new(): BaseModel<IConditionRuntime> }) => {
            let model = singleton(target);
            model.key = type;
            models[type] = model;
        }
    }

    export function showApp() {
        // console.log(debug, "showApp");
        soundsSet(false);
    }

    export function hideApp() {
        // console.log(debug, "hideApp");
        soundsSet(true);
    }

    export function initCookie() {

        let c = localStorage.getItem(`wuxialuan_config`);

        cookieConfig = {
            ip: "47.114.187.8",
            account: "",
            token: `{"site":"iphone"}`
        }

        if (c) {
            cookieConfig = JSON.parse(c);

            if (!serversBool) {
                cookieConfig.ip = "47.114.187.8";
            }

        } else {
            localStorage.setItem(`wuxialuan_config`, JSON.stringify(cookieConfig));
        }
    }

    export function initSaveData(data: IClientData) {

        // let data = {}

        // if (weixin == false) {

        //     if (localStorage) {
        //         data = localStorage.getItem("savedata");
        //         // wx.cookie_init();
        //         // data = wx.cookie["savedata"];
        //         if (!data) {
        //             data = {}
        //         } else {
        //             data = JSON.parse(data as string);
        //         }
        //     }


        // }

        let modelList = getModels();
        for (let i = 0; i < modelList.length; i++) {
            let model = modelList[i];
            model.initData();
            modelData[model.key] = model.runtimes;
            model.loadSaveData(data[model.key] || {});
            modelData[model.key] = model.runtimes;
        }

        for (let i = 0; i < modelList.length; i++) {
            let model = modelList[i];
            model.initSaveData();
        }
    }

    export function toSaveData() {

        if (weixin == false) {
            let saveData = {};

            foreach(models, (v, k, o) => {

                let data = v.toSaveData();
                if (data) {
                    saveData[k] = data;
                }

                return true;
            })

            if (localStorage) {
                localStorage.setItem("savedata", JSON.stringify(saveData))
            }


            // wx.cookie["savedata"] = JSON.stringify(saveData);
            // wx.cookie_flush();
        }

    }

    export function cleanSaveData() {
        if (weixin == false) {
            // wx.cookie["savedata"] = undefined;
            // wx.cookie_flush();
            localStorage.removeItem("savedata");
        }
    }


    export interface IActiveRuntime {
        id?: any;
        model?: any;
        active?: number;
    }


    export interface IModelRuntime {
        actives?: { [key: number]: IActiveRuntime };
        runtimes?: { [key: number]: IConditionRuntime };
        [key: string]: any;
    }

    export function copyProperty(from: any, to?: any) {
        if (from instanceof Array) {
            to = to || [];
            for (let i = 0; i < from.length; i++) {
                to[i] = copyProperty(from[i], to[i]);
            }
        } else {
            switch (typeof from) {
                case "number":
                case "string":
                    to = from;
                    break;
                case "object":
                    to = to || {};
                    foreach(from, (v, k) => {
                        to[k] = copyProperty(v, to[k]);
                        return true;
                    }, this)
            }
        }
        return to;
    }


    export class BaseModel<T extends IConditionRuntime> extends MiniDispatcher implements ISocketEventInterests {

        eventInterests: EventInterestType;

        socketEventInterests: EventInterestType;

        key: string;

        priority = 0;

        runtimes: IModelRuntime;

        constructor() {
            super()
            this.runtimes = { runtimes: {}, actives: {} };
            facade.registerEvent(this.eventInterests, this);
            socketDispatcher.registerEvent(this.socketEventInterests, this);
        }

        initData(runtime?: any) {
            let res = gameConfig.res[this.key];
            if (res) {
                if (!runtime) {
                    runtime = this.runtimes;
                }
                forarr(res.ids, v => {
                    runtime[v.id] = v.value;
                    return true;
                })
            }

        }

        activeRuntime(limit: IConfigLimit) {
            return undefined;
        }

        getRuntime(id: any) {
            return this.runtimes[id];
        }

        removeRuntime(id: any) {
            this.runtimes[id] = undefined;
            delete this.runtimes[id];
        }


        toSaveData() {
            return undefined;
        }


        loadSaveData(runtimes: { [key: string]: any }) {
            copyProperty(runtimes, this.runtimes);
        }

        initSaveData() {

        }


        filterRuntime(limit: IConfigLimit, params?: T) {
            let result = this.runtimes;
            let v = limit.target[0];
            let o = result[v.id];
            if (o && typeof o == "object") {
                result = o[v.value];
                if (!result) {
                    let key = `${v.id}2runtime`;
                    let f = this[key] as Function;
                    if (f != undefined) {
                        result = f.call(this, limit);
                    }

                }
            }
            return result;
        }

        checkName(element: IElementRuntime) {

        }

        checkStatus(guid: number | string): boolean {

            return
        }

        // addLimit(limit: IConfigLimit, times = 1, params: T) {


        //     let runtime = this.filterRuntime(limit, params);
        //     let { value } = limit;

        //     if (runtime) {

        //         // if(this.activeCheck){
        //         //     for (let i = 0, len = value.length; i < len; i++) {
        //         //         let { id } = value[i];
        //         //         if(id == "active"){
        //         //            this.activeRuntime(limit);
        //         //            break;
        //         //         }
        //         //     }
        //         // }

        //         // }else{
        //         for (let i = 0, len = value.length; i < len; i++) {
        //             let { opera, id, value: v } = value[i];
        //             v = codeDoProperty(this, v, runtime);
        //             v *= times;
        //             switch (opera) {
        //                 case ":":
        //                     let d = runtime[id];
        //                     if (d == undefined) {
        //                         d = 0;
        //                     }

        //                     v = d + v
        //                     // runtime[id] = d + v;

        //                     break
        //                 case "=":
        //                     break;
        //                 default:
        //                     v = undefined;
        //                     break;

        //             }

        //             if (v != undefined) {
        //                 runtime[id] = this.checkValueClamp(id, v);
        //                 facade.simpleDispatch(`${this.key}_${id}`, runtime);
        //             }

        //             //console.log(`${this.key}_${id}  ${v}`);

        //         }
        //     }
        // }

        checkValueClamp(id: string | number, v: number) {
            return v;
        }


        checkConditions(runtime: any, conditions: IConditionRuntime[], times = 1) {
            let error = undefined;
            forarr(conditions, v => {
                let { opera, id, value } = v;
                value = codeDoProperty(runtime, value, modelData);
                value *= times;
                let d = runtime[id] || 0;
                if (codeIntParser(d, opera, value) == false) {
                    error = v
                    return false
                }
                return true
            })
            return error;
        }

        checkLimit(limit: IConfigLimit, times = 1, params: T) {
            let runtime = this.runtimes;
            let flag = false;
            if (limit.target) {
                runtime = this.filterRuntime(limit, params);
                flag = runtime == this.runtimes;
            }


            let error = tempObject;

            if (runtime) {
                error = this.checkConditions(runtime, limit.value, times);
                if (!error && flag) {
                    error = this.checkConditions(runtime, limit.target, times);
                }
            }

            return error;
        }


        onLimit(limit: IConfigLimit, handler: EventHandler, thisobj: object) {

            forarr(limit.value, v => {
                let key = this.getListenerKey(limit, v);
                facade.on(key, handler, thisobj);
                return true;
            })

            if (limit.count) {
                let key = this.getListenerCountKey(limit, limit.count);
                facade.on(key, handler, thisobj);
            }

            forarr(limit.counts, v => {
                let key = this.getListenerCountKey(limit, v);
                facade.on(key, handler, thisobj);
                return true;
            }, this)

            if (!limit.value && !limit.count && !limit.counts) {
                forarr(limit.target, v => {
                    let key = `${this.key}.${v.id}`
                    facade.on(key, handler, thisobj);
                    return true;
                }, this)
            }
        }

        offLimit(limit: IConfigLimit, handler: EventHandler, thisobj: object) {

            forarr(limit.value, v => {
                let key = this.getListenerKey(limit, v);
                facade.off(key, handler, thisobj);
                return true;
            })

            if (limit.count) {
                let key = this.getListenerCountKey(limit, limit.count);
                facade.off(key, handler, thisobj);
            }

            forarr(limit.counts, v => {
                let key = this.getListenerCountKey(limit, v);
                facade.off(key, handler, thisobj);
                return true;
            }, this)

            if (!limit.value && !limit.count && !limit.counts) {
                forarr(limit.target, v => {
                    let key = `${this.key}.${v.id}`
                    facade.off(key, handler, thisobj);
                    return true;
                }, this)
            }
        }

        getListenerKey(limit: IConfigLimit, value: IConditionRuntime) {
            let { key } = this;
            let pro = ""
            if (limit.target) {
                let { id, value } = limit.target[0]
                pro = `${id}.${value}.`
            }
            return `${key}.${pro}${value.id}`
        }

        getListenerCountKey(limit: IConfigLimit, value: IConditionRuntime) {
            let { key } = this;
            let pro = ""
            if (limit.target) {
                let { id, value } = limit.target[0]
                pro = `${id}.${value}.`
            }
            return `${key}.${pro}${value.id}`
        }

        // getResItem(pro: string | number) {
        //     let res = gameConfig.res[this.key];
        //     if (res) {
        //         // return res.idobj[pro];
        //     }

        //     return undefined;
        // }

        createRuntimeData(v: IConditionRuntime, key: string, pro: string | number, data: any, limit: IConfigLimit) {
            let runtime = clone(v, {}) as T;
            runtime.moduleName = key;
            runtime.runtime = data;
            let item = getProDefine(key, pro);
            if (item) {
                runtime.icon = item.icon;
                runtime.bigicon = item.bigicon;
                runtime.name = item.name;
                runtime.show = item.show;
            } else {
                runtime.name = this.getRuntimeDataName(data);
            }
            runtime.maxCount = Math.abs(v.value);
            runtime.count = Math.abs(data[pro]);

            return runtime;
        }

        getRuntimeDataName(data: { model: { name: string } }) {
            return data ? data.model ? data.model.name : "" : ""
        }

        getLimitValue(limit: IConfigLimit) {

            if (limit.limitValues) {
                forarr(limit.limitValues, v => {
                    let { id, runtime } = v;
                    v.count = runtime[id];
                    return true;
                });
                return limit.limitValues;
            }

            let data = this.runtimes;
            if (limit.target) {
                data = this.filterRuntime(limit);
            }

            let limitValues = [] as T[];

            let { key } = this;

            forarr(limit.value, v => {
                if (v.opera == ":" || v.opera.indexOf("=") != -1) {
                    let runtime = this.createRuntimeData(v, key, v.id, data, limit);
                    limitValues.push(runtime)
                }
                return true;
            })

            limit.limitValues = limitValues

            return limitValues;
        }

        getLimitReward(limit: IConfigLimit) {

            if (limit.rewards) {
                return limit.rewards;
            }


            let data = this.runtimes;
            if (limit.target) {
                data = this.filterRuntime(limit);
            }


            let rewards = [] as T[];

            let { key } = this;

            forarr(limit.value, v => {
                if (v.opera == ":") {

                    let runtime = this.createRuntimeData(v, key, v.id, data, limit)
                    rewards.push(runtime)
                }
                return true;
            })


            limit.rewards = rewards


            return rewards;
        }

        createConditionRuntime(pro: string, value: number) {
            let item = getProDefine(this.key, pro);
            let icon = item ? item.icon : undefined;
            return { moduleName: this.key, id: pro, value, icon } as IConditionRuntime
        }

    }




    export function onLimit(limits: IConfigLimit[], handler: EventHandler, thisobj: object) {
        forarr(limits, limit => {
            let model = models[limit.module];
            if (model) {
                model.onLimit(limit, handler, thisobj)
            }
            return true;
        });
    }

    export function offLimit(limits: IConfigLimit[], handler: EventHandler, thisobj: object) {
        forarr(limits, limit => {
            let model = models[limit.module];
            if (model) {
                model.offLimit(limit, handler, thisobj)
            }
            return true;
        });
    }

    export function checkLimit(limits: IConfigLimit[], times = 1, params?: IConditionRuntime) {
        if (limits) {
            for (let i = 0, len = limits.length; i < len; i++) {
                const limit = limits[i];
                let model = models[limit.module];
                if (model) {
                    let cr = model.checkLimit(limit, times, params)
                    if (cr != undefined) {
                        return cr;
                    }
                }
            }
        }
        return undefined;
    }

    // export function addLimit(limits: IConfigLimit[], times = 1, params?: IConditionRuntime) {
    //     for (let i = 0, len = limits.length; i < len; i++) {
    //         const limit = limits[i];

    //         let model = models[limit.module];
    //         if (model) {
    //             model.addLimit(limit, times, params);
    //         }
    //     }
    // }


    export function getConditionValue(model: BaseModel<IConditionRuntime>, condition: IConditionRuntime[], property = undefined, runtime = undefined) {
        for (let j = 0; j < condition.length; j++) {
            const v = condition[j];
            if (v.opera == ":" || v.opera.indexOf("=") != -1) {
                if (!property || v.id == property) {
                    return Math.abs(codeDoProperty(model, v.value, runtime));
                }
            }
        }
        return 0;
    }


    export function getLimitValue(limits: IConfigLimit[], property: string, module = "res", params?: IConditionRuntime) {
        for (let i = 0, len = limits.length; i < len; i++) {
            const limit = limits[i];
            if (!module || limit.module == module) {
                let model = models[limit.module];
                if (!model) return 0;
                return getConditionValue(model, limit.value, property, model.filterRuntime(limit, params));
            }
        }

        return 0;
    }


    export function getLimitReward(limits: IConfigLimit[]) {
        let result = [] as IConditionRuntime[];
        if (limits) {
            for (let i = 0, len = limits.length; i < len; i++) {
                const limit = limits[i];
                if (limit) {
                    let model = models[limit.module];
                    if (model) {
                        let temp = model.getLimitReward(limit);
                        if (temp && temp.length) {
                            result = result.concat(temp);
                        }
                    }
                }
            }
        }
        return result;
    }


    export function createConditionRuntime(module: string, pro: string, value: number) {
        let model = models[module];
        if (model) {
            return model.createConditionRuntime(pro, value);
        }
    }

    // export function getLimitValues2(limits: IConfigLimit[]) {
    //     let result = [] as IConditionRuntime[];
    //     for (let i = 0, len = limits.length; i < len; i++) {
    //         const limit = limits[i];
    //         let model = models[limit.module];
    //         let temp = model.getLimitValue2(limit);
    //         if (temp && temp.length) {
    //             result = result.concat(temp);
    //         }
    //     }
    //     return result;
    // }


    export function getLimitValues(limits: IConfigLimit[]) {

        if (!limits) {
            return;
        }

        let result = [] as IConditionRuntime[];
        for (let i = 0, len = limits.length; i < len; i++) {
            const limit = limits[i];
            let model = models[limit.module];
            if (model) {
                let temp = model.getLimitValue(limit);
                if (temp && temp.length) {
                    result = result.concat(temp);
                }
            }
        }
        return result;
    }

    export function getRuntimes(module: string, id = undefined) {
        let model = models[module];
        if (undefined == model) {
            return undefined;
        }

        let runtimes = model.runtimes;
        if (id != undefined) {
            runtimes = runtimes[id];
        }

        return runtimes;
    }


    export function addProperty(key: string, value: any, module = "res", id = undefined) {
        let runtimes = getRuntimes(module, id);
        if (runtimes) {
            let v = runtimes[key];
            if (undefined === v) {
                v = 0;
            }
            runtimes[key] = v + value;
            // console.log(`${module}_${key}  ${v}`);
            facade.simpleDispatch(`${module}_${key}`, runtimes);
        }
        return runtimes;
    }


    export function setProperty(key: string, value: any, module = "res", id = undefined) {
        let runtimes = getRuntimes(module, id);
        if (runtimes) {
            runtimes[key] = value;
            // console.log(`${module}_${key}  ${value}`);
            facade.simpleDispatch(`${module}_${key}`, runtimes);
        }
        return runtimes;
    }



    export function getProperty(key: string, module = "res", id = undefined) {
        let runtimes = getRuntimes(module, id);
        let value = undefined;
        if (runtimes) {
            value = runtimes[key];
        }
        return value;
    }


    export function checkAndBuy(limits: IConfigLimit[], handler: Function, times = 1, params = undefined) {
        let resule = checkLimit(limits, times, params);

        if (undefined == resule) {

            // addLimit(limits, times, params);

            handler();

        }



        return resule;
    }

    export function checkAndBuy2(pro: string, value: number, handler: Function, module?: string, params = undefined) {
        value = Math.abs(value);
        let r = getProperty(pro, module);
        if (r >= value) {
            addProperty(pro, -value, module);
            handler();
            return false;
        }
        return true;
    }

    var defineCache = {} as { [key: string]: { [key: string]: IResId } };

    var TypeCache = {} as { [key: string]: { [key: string]: ITypeType } };

    // export var proCache: { [key: string]: any } = [];

    export function getInitPro(module: string) {
        let pro = {};
        let res = gameConfig.res[module];
        if (res) {
            forarr(res.ids, (v, k) => {
                if (typeof v.value == "object") {
                    pro[v.id] = {};
                } else {
                    pro[v.id] = v.value;
                }

                return true;
            });
        }
        return pro;
    }


    export function getProDefines(module: string) {
        let defines = defineCache[module];
        if (!defines) {
            defineCache[module] = defines = {};
            let res = gameConfig.res[module];
            if (res) {
                forarr(res.ids, (v, k) => {
                    defines[v.id] = v;
                    return true;
                });
            }
        }
        return defines;
    }



    export function getProDefine(module: string, property: string | number) {
        let defines = getProDefines(module);
        return defines[property];
    }


    export function registerProDefine(module: string, registerModule: string) {
        let fm = getProDefines(module);
        let tm = getProDefines(registerModule);
        foreach(tm, v => {
            fm[v.id] = v;
            return true;
        }, this)
    }


    export function getTypeDefines(type: TYPE_CONFIG) {

        let module = `${type}`;

        let defines = TypeCache[module];
        if (!defines) {
            TypeCache[module] = defines = {};
            let type = gameConfig.type[module];
            if (type) {
                forarr(type.types, (v, k) => {
                    defines[v.type] = v;
                    return true;
                });
            }
        }
        return defines;
    }

}