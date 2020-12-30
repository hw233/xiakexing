module rf {

    export interface IHeroRuntime extends IReshero, IModelRuntime {
        probase: IRespro;
        proplus: IRespro;
        tempShuxing: IShuxing[];
    }

    @RegisterModel("hero")
    export class HeroModel extends BaseModel<IConditionRuntime> {

        runtimes: IHeroRuntime;

        loadSaveData(value: IHeroRuntime) {
            super.loadSaveData(value);
            foward(CM_CODE.CM_Propertys);
        }

        @SOCKET_EVT(SM_CODE.SM_Propertys)
        propertysChange(stream: StreamX) {
            let { probase, proplus } = stream.data as { [key: string]: IRespro }
            let runtime = this.runtimes;
            runtime.probase = probase;
            runtime.proplus = proplus;
        }

        @SOCKET_EVT(SM_CODE.SM_Property)
        propertyChange(stream: StreamX) {
            let [pro, bv, pv] = stream.data as [string, number, number];
            let { probase, proplus } = this.runtimes;
            probase[pro] = bv;
            proplus[pro] = pv;
        }

        @SOCKET_EVT(SM_CODE.SM_FightMode)
        fightModeChange() {
            facade.simpleDispatch(GameEvent.REFRESH_FIGHT_MODE);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.STATUSDOING}`)
        statusDoingAudio() {
            switch (modelData.hero.statusDoing) {
                case STATUS_DOING.PRACTICE: {
                    playEffectKeyByAudio("lian_gong_fang_lian_gong");
                    break;
                }
                case STATUS_DOING.STUDY: {
                    playEffectKeyByAudio("mao_lu_kan_shu");
                    break;
                }
                case STATUS_DOING.REST: {
                    playEffectKeyByAudio("wo_shi_xiu_xi");
                    break;
                }
                case STATUS_DOING.SIT:
                case STATUS_DOING.GUANKASIT: {
                    playEffectKeyByAudio("zai_da_zuo_zhuang_tai_zhong");
                    break;
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_Treat)
        sm_TreatHandler(event: StreamX) {

            switch (event.data) {
                case 0: {
                    playEffectKeyByAudio("lia_shang_hui_fu_xue_liang");
                    addPrompt("恢复一定血量!");
                    break;
                }

                case 1: {
                    playEffectKeyByAudio("warning");
                    addPrompt("气血已满!");
                    break;
                }

                case 2: {
                    playEffectKeyByAudio("warning");
                    addPrompt("内力不足!");
                    break;
                }

                case 3: {
                    playEffectKeyByAudio("warning");
                    addPrompt("冷却中!");
                    break;
                }
            }
        }

        @EVT(`${ResConst.HERO}.${IResproConst.LEVEL}`)
        changeDengji() {
            let { level } = modelData.hero;
            if (level != 1) {
                addMessage(`<font color="#FF8C00">你当前等级提升至${level}</font>`);
                playEffectKeyByAudio("shengji");
            }
        }
    }
}