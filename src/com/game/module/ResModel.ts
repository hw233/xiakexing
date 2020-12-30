module rf {

    export var basePros: string[] = ["basestr", "basecon", "basedex", "baseler",
        "baseper", "str", "con", "dex", "ler", "per"];

    export var atkPros: string[];

    export var statusConfig: number[] = [];

    @RegisterModel("res")
    export class ResModel extends BaseModel<IConditionRuntime> {

        task: LoadTask = new LoadTask();

        initData() {

            atkPros = [];

            forarr(gameConfig.res["pro"].ids, v => {
                if (basePros.indexOf(v.id) == -1) {
                    atkPros.push(v.id);
                }
                return true;
            }, this);

            registerProDefine(ResConst.HERO, ResConst.PRO);
            // cfgData = getInitPro(ResConst.CFG);

            for (let i = 0; i < 20; i++) {
                let temp = 1 << i;
                statusConfig.push(temp);
            }

            useItemCondition = getRewardCondition(1, 0)
            castSkillCondition = getRewardCondition(1, 1)
            moveConditon = getRewardCondition(1, 2)
            AutoMoveConditon = getRewardCondition(1, 3)

        }

        //预加载资源
        initPreRes() {

            let { task } = this;
            let preSource = {} as { [key: string]: string };
            let imgSource = {} as { [key: string]: string };

            let xinshou = modelData.res.xsYindao;
            if (!xinshou) {
                preSource["ui/createPlayer"] = "ui/createPlayer";
                imgSource["bg/createBg.png"] = "bg/createBg.png";
                imgSource["bg/xinshouBg.png"] = "bg/xinshouBg.png";
                imgSource["bg/talk_bg.png"] = "bg/talk_bg.png";
            }

            preSource["ui/jineng"] = "ui/jineng";
            preSource["ui/popup"] = "ui/popup";
            preSource["ui/mapScene"] = "ui/mapScene";

            imgSource["bg/mainBg.png"] = "bg/mainBg.png";
            imgSource["bg/zhuangbeiBg.png"] = "bg/zhuangbeiBg.png";

            foreach(preSource, url => {

                url += "/";

                let source = bitmapSources[url] as TSource;
                if (!source || source.status != LoadStates.COMPLETE) {
                    let source = createUrlSource(RES_PERFIX, url, ExtensionDefine.NONE, undefined, TSource);
                    // console.log(debug, "预加载", url);
                    task.addTask(source);
                }

                return true;
            });

            foreach(imgSource, url => {

                let source = bitmapSources[url];
                if (!source || source.status != LoadStates.COMPLETE) {
                    let source = createUrlSource(RES_PERFIX, url, undefined);
                    // console.log(debug, "预加载", url);
                    task.addTask(source);
                }

                return true;
            });

            task.on(EventT.PROGRESS, (e: EventX) => {
                facade.simpleDispatch(GameEvent.RES_PRELOAD, e.data);
            }, this);

            task.on(EventT.COMPLETE, this.resCompleteHandler, this);
        }

        resCompleteHandler(event: EventX) {
            this.task.off(EventT.COMPLETE, this.resCompleteHandler, this);

            facade.simpleDispatch(GameEvent.RES_READLY);
        }

        @SOCKET_EVT(SM_CODE.SM_JoinSect)
        SM_JoinSect() {

            if (!(modelData.res.xsYindao)) {
                return;
            }

            let status = modelData.hero.statusDoing;
            if (status == STATUS_DOING.DAZE) {
                let { guild } = modelData.menpai;
                let menpai = gameConfig.menpai[guild];

                foward(CM_CODE.CM_MapIn, menpai.map);
            } else {
                interruptedCurrentStateTriggerEvent();
            }
        }

    }


    export function getRewardCondition(group: number, index: number) {
        return gameConfig.reward[group].indexs[index].condition;
    }

    export var moveConditon: IConfigLimit[];

    export var AutoMoveConditon: IConfigLimit[];

    export var useItemCondition: IConfigLimit[];

    export var castSkillCondition: IConfigLimit[];

}