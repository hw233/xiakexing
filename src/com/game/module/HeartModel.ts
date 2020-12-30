module rf {

    @RegisterModel("heart")
    export class HeartModel extends BaseModel<IConditionRuntime> {

        initData() {

        }

        @SOCKET_EVT(1)
        propertyChangeHandler(event: StreamX) {
            foreach(event.data, (v, k: string) => {
                let [module, pro, key, hashpro] = k.split(".")
                let runtimes = modelData[module];
                if (runtimes != undefined) {
                    if (hashpro != undefined) {
                        let hashs = runtimes[pro];
                        if (hashs != undefined) {
                            let hash = hashs[key];
                            if (hash != undefined) {
                                hash[hashpro] = v;
                                // console.log(`socket_evt_1: ${module}.${pro}.${hashpro} change ${v}`);
                                // let t = Date.now();
                                facade.simpleDispatch(k, hash);
                                facade.simpleDispatch(`${module}.${pro}.${hashpro}`, hash);
                                // console.log(`${module}.${pro}.${hashpro}`, Date.now() - t);

                            }
                        }
                    } else {
                        runtimes[pro] = v;
                        // if (pro.indexOf("money") == -1) {
                        //     console.log(`socket_evt_1: ${module}.${pro} change ${v}`)
                        // }
                        // let t = Date.now();

                        // console.log(`socket_evt_11: ${module}.${pro} change ${v}`, k)
                        facade.simpleDispatch(k, runtimes);
                    }
                }

                return true;
            })
        }

        @SOCKET_EVT(2)
        runtimeChangeHandler(event: StreamX) {
            foreach(event.data, (v: { [key: string]: any }, k: string) => {
                let [module, pro, key] = k.split(".");
                let runtimes = modelData[module];
                if (runtimes) {
                    let hashs = runtimes[pro];
                    if (hashs) {
                        if (v) {
                            let hash = hashs[key];
                            if (hash) {
                                pro_copy(hash, v);
                            } else {
                                hashs[key] = v;
                            }
                        } else {
                            v = hashs[key];
                            delete hashs[key];
                        }
                        if (v) {
                            // console.log(`socket_evt_2: ${module}.${pro} change`, v)
                            facade.simpleDispatch(`${module}.${pro}`, v);
                        }

                    }
                }
                return true;
            })
        }


        @CodeFunc()
        getGongshi(propertys: any, params: any) {
            let [id, pros] = propertys;
            let temp = modelData.temp;
            modelData.temp = pros;
            let gongshi = gameConfig.gongshi[id];
            let v = 0;
            if (gongshi) {
                v = codeDoProperty(modelData, pros, modelData);
            }
            modelData.temp = temp;
            return v;
        }


        @CodeFunc()
        getpro(propertys: any) {
            let hero = modelData.hero as IHeroRuntime;
            let [pro] = propertys;
            let b = hero[`base${pro}`] || 0
            let p = hero[pro] || 0
            return (b + p * 0.5) >> 0;
        }

        @CodeFunc()
        operaValue(propertys: [any, any, string]) {
            let [left, right, opera] = propertys;
            left = codeDoProperty(modelData, left, modelData);
            return toOpera(left, opera || "==", right);
        }

        @CodeFunc("get")
        get(propertys: any) {
            return propertys[0];
        }


        @CodeFunc()
        getNowTime(propertys: any) {
            return getServerDate();
        }

        @SOCKET_EVT(SM_CODE.SM_Log)
        serverLog(event: StreamX) {
            console.log("serverlog:", event.data);
        }

        @PhaseFunc("socket")
        sendSokcet(action: IPhaseAction) {
            let { p, v } = action;
            foward(p, v);
        }

    }
}