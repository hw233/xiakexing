module rf {

    export interface IGameConfig {
        guanqia: { [key: string]: IExcelGuanQiaBox }
    }

    export class ScenePreLoad implements ISceneBase {
        name = GameSceneEnum.PRE_LOAD;
        task = new LoadTask();

        status = 0;

        start(params?: any): void {
            let { task } = this;
            let configRoot = CONFIG_PERFIX;
            // task.add(configRoot , "chn.dat",ResType.amf,this.chnComplete,this
            task.add(configRoot, "config.bin", ResType.amf, this.configComplete, this);
            task.add(configRoot, "xiangwei.bin", ResType.amf, this.xiangweiHandler, this);
            // task.add(configRoot, "map/zizhai.bin", ResType.amf, this.mapConfigComplete, this);
            // task.add(configRoot, "map/xiangyangcheng.bin", ResType.amf, this.mapConfigComplete, this);
            // task.add(configRoot, "map/diancang.bin", ResType.amf, this.mapConfigComplete, this);
            // task.add(configRoot, "map/chaoting.bin", ResType.amf, this.mapConfigComplete, this);

            // task.add(configRoot, "skill.dat", ResType.amf, this.configComplete, this);
            // task.add(configRoot, "panel.dat", ResType.amf, this.dataComplete, this);
            // task.add(configRoot, "xiangwei.dat", ResType.amf, this.xiangweiComplete, this);
            // task.add(configRoot , "xiangwei.dat",ResType.amf,this.phaseComplete,this);
            // task.add(configRoot , "goods.dat",ResType.amf,this.goodsComplete,this);
            // task.add(configRoot , "equip.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "zhaomu.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "jjc.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "fuli.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "ronglu.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "shenqi.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "skillcode.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "taofa.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "mubiao.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "xunlong.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "cszl.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "zypz.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "tiansuo.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "yewai.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "juntuan.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "kuafu.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "sjzb.dat",ResType.amf,this.dataComplete,this);
            // task.add(configRoot , "huodong.dat",ResType.amf,this.dataComplete,this);
            // task.add(RES_PERFIX,"demo/data.dat",ResType.amf,this.editorComplete,this);
            // task.add(RES_PERFIX,"room/room1/data.dat",ResType.amf,this.editorComplete,this);
            //task.add(RES_PERFIX,"ui/test/data.dat",ResType.amf,this.editorComplete,this);
            //task.addTask(anim_getSource(FIGHT_FONT_URL));

            // task.addTask(createUrlSource(RES_PERFIX, "ui/jineng/", ExtensionDefine.NONE, undefined, TSource));
            // task.addTask(createUrlSource(RES_PERFIX, "ui/popup/", ExtensionDefine.NONE, undefined, TSource));
            // task.addTask(createUrlSource(RES_PERFIX, "ui/mapScene/", ExtensionDefine.NONE, undefined, TSource));

            task.on(EventT.COMPLETE, this.allComplate, this);

            //task.on(EventT.PROGRESS,this.progressListener,this);

            // switchGameScene(GameSceneEnum.GAME);

            // let socket = singleton(TSocket);
            // socket.connect(launchData.wsurl.substitute(launchData.ip, launchData.port))
            // facade.on("socket_connect", this.socketConnectHandler, this);
        }

        sleep(): void {

        }

        xiangweiHandler(e: EventX) {
            if (e.type == EventT.COMPLETE) {
                let { data } = e;
                gameConfig.phase = data;
            }
        }

        configComplete(e: EventX) {
            if (e.type == EventT.COMPLETE) {
                let { data } = e;
                for (let k in data) {
                    gameConfig[k] = data[k];
                }
            }
        }

        // mapConfigComplete(e: EventX) {
        //     if (e.type == EventT.COMPLETE) {
        //         let { data } = e;
        //         if (!gameConfig.guanqia) {
        //             gameConfig.guanqia = {};
        //         }
        //         forarr(data, (v: IExcelGuanQiaBox) => {
        //             gameConfig.guanqia[v.tag] = v;
        //             return true;
        //         });
        //     }
        // }

        dataComplete(e: EventX) {
            if (e.type == EventT.COMPLETE) {
                let { data } = e;
                for (let k in data) {
                    gameConfig[k] = data[k];
                }
            }
        }

        allComplate(e: EventX) {
            let { task } = this;
            task.off(e.type, this.allComplate, this);
            //task.off(EventT.PROGRESS,this.progressListener,this);

            // switchGameScene(GameSceneEnum.MAP,{mapId:"10",effect:false});

            // let modelList = getModels();
            // for (let i = 0; i < modelList.length; i++) {
            //     modelList[i].initData()
            // }

            // initSaveData();

            // this.status |= 0b1;

            // this.swtichToNext();

            cfgData = gameConfig.system.system;

        initCookie();

            facade.toggle(LoginPanel, 1);
        }

        socketConnectHandler(event: EventX) {
            event.currentTarget.off(event.type, this.socketConnectHandler, this);
            this.status |= 0b10;
            this.swtichToNext();
        }

        swtichToNext() {

            if (this.status == 0b11) {

                initSaveData(socketData.client_data);
                if (socketData.client_data.hero.name) {
                    switchGameScene(GameSceneEnum.GAME);
                } else {
                    switchGameScene(GameSceneEnum.CREATE);
                }
            }
        }

        progressListener(e: EventX) {
            let { task } = this;
            let { data } = e;
        }
    }
}