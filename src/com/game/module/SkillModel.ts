module rf {
    export interface ISkillRuntime extends IResskill, IModelRuntime {
        id?: { [key: string]: ISkillIDRuntime }
    }

    export interface ISkillIDRuntime extends IResskill_id, IConditionRuntime {
        id: any
        model: ISkill;
    }

    interface ISkillLevel {

        id: string;

        level: number;

        exp: number;

        totalExp: number;
    }

    export interface ISkillLevelGroup {

        skillId: string;

        maxlevel: number

        levels: { [level: number]: ISkillLevel };

    }

    @RegisterModel("skill")
    export class SkillModel extends BaseModel<ISkillIDRuntime> {

        runtimes: ISkillRuntime;
        skilllevelConf: { [skillId: string]: ISkillLevelGroup } = {}

        loadSaveData(runtimes: { [key: string]: any }) {
            super.loadSaveData(runtimes)
            let ids = this.runtimes.id;
            foreach(gameConfig.skill, v => {
                if (!ids[v.id]) {
                    ids[v.id] = { id: v.id, level: 0, exp: 0, maxExp: 0 } as any as ISkillIDRuntime;
                }

                ids[v.id].model = v;

                return true;
            }, this)

            this.iniSkillLevelConf();
        }

        @SOCKET_EVT(SM_CODE.SM_ReadBook)
        SM_ReadBook(event: StreamX) {
            let [ret] = event.data;
            if (ret) {
                addPrompt("未学习基础技能!");
            }
        }

        @SOCKET_EVT(SM_CODE.SM_SkillUpgrade)
        SM_SkillUpgrade(event: StreamX) {
            let [ret, id, level] = event.data;
            if (ret) {
                addPrompt("基础技能等级不足，无法提升!");
            }
        }

        iniSkillLevelConf() {
            let skillConf = gameConfig.skill;
            foreach(skillConf, (v, k) => {
                let skillLevelGroup = { skillId: v.id, maxlevel: v.maxLevel, levels: {} as { [level: number]: ISkillLevel } } as ISkillLevelGroup
                for (let i = 0; i <= skillLevelGroup.maxlevel; i++) {
                    let skillLevel = { id: v.id, level: i, exp: 0, totalExp: 0 } as ISkillLevel
                    skillLevel.exp = Math.pow(i, 2.5) * v.expParameter[0] + v.expParameter[1];
                    if (i == 0) {
                        skillLevel.totalExp = skillLevel.exp;
                    }
                    else {
                        skillLevel.totalExp = skillLevelGroup.levels[i - 1].totalExp + skillLevel.exp;
                    }
                    skillLevelGroup.levels[i] = skillLevel;
                }
                this.skilllevelConf[v.id] = skillLevelGroup;
                return true
            })
        }

        getSkillMaxExp(runtime: ISkillIDRuntime) {
            if (runtime.model.maxLevel <= runtime.level) {
                return 0;
            }
            return this.skilllevelConf[runtime.id].levels[runtime.level].exp;
        }

        liangongExtimate(id: string) {
            let hour = 0;
            let min = 0;

            let skillConfig = gameConfig.skill[id];
            let skill = modelData.skill.id[id];
            let parentSkillId = skillConfig.type[1];
            let hungerConsume = cfgData.bsdXiaohao;


            // 预计获得技能等级
            let extimateLevel = skill.level;

            if (parentSkillId == undefined) {
                return { hour, min, extimateLevel };
            }

            let parentSkillModel = modelData.skill.id[parentSkillId];

            let runtime = checkLimit(skillConfig.levelupLimit);

            if (runtime != undefined) {
                return { hour, min, extimateLevel };
            }

            let heroModel = modelData.hero;
            let muzhuang = modelData.room.id[2001];
            let chuang = modelData.room.id[2003];
            let mzExpSp = Math.abs(muzhuang.addExp);
            let mzHungerSp = Math.abs(muzhuang.addHunger);
            let mzVigorSp = Math.abs(muzhuang.addVigor);
            let cVigorSp = Math.abs(chuang.addVigor);

            let curHunger = heroModel.hunger;
            let curVigor = heroModel.vigor;
            let maxVigor = heroModel.maxvigor;

            if (curHunger < mzHungerSp + hungerConsume) {
                return { hour, min, extimateLevel };
            }

            let hungerConsumeTime = curHunger / (mzHungerSp + hungerConsume);
            let vigorConsumeTime = curVigor / mzVigorSp;
            let vigorRecoveryTime = 0;

            if (hungerConsumeTime > vigorConsumeTime) {
                vigorRecoveryTime = maxVigor / cVigorSp;
            }

            let hungerTime = hungerConsumeTime + vigorRecoveryTime;

            hour = hungerTime / 60;
            min = hungerTime % 60;

            // 预计获得技能等级经验
            let estimateExp = Math.floor(hungerTime * mzExpSp);
            let tempExpTotal = 0;
            let whileStop = true;
            let expArr = skillConfig.expParameter;
            while (whileStop) {
                let tempExp = Math.pow((extimateLevel), 3) * expArr[0] + expArr[1];
                tempExpTotal += tempExp;
                if (tempExpTotal > estimateExp || extimateLevel >= parentSkillModel.level) {
                    whileStop = false;
                    tempExpTotal -= tempExp;
                } else {
                    extimateLevel++;
                }
            }

            // if (extimateLevel > parentSkillModel.level) {
            //     extimateLevel = parentSkillModel.level;
            // }

            let estimateNewTime = tempExpTotal / mzExpSp;

            if (estimateNewTime < hungerTime) {
                hour = estimateNewTime / 60;
                min = estimateNewTime % 60;
            }

            return { hour, min, extimateLevel };
        }

        mijingDazuoExtimate() {
            let hour = 0;
            let min = 0;
            let estimateMp = 0;
            let heroMode = modelData.hero;
            let skillModel = modelData.skill;
            let hungerConsume = cfgData.bsdXiaohao;
            let mpRecovery = skillModel.id['1'].level / 2 * cfgData.dzXishu + 1;
            let hungerConsumeTime = heroMode.hunger / hungerConsume;
            let lmp = modelData.hero.lmp * 2;

            let hungerMpRecovery = hungerConsumeTime * mpRecovery;
            if (hungerMpRecovery > lmp) {
                hungerConsumeTime = lmp / mpRecovery;
            }

            estimateMp = hungerConsumeTime * mpRecovery;

            if (estimateMp > lmp) {
                estimateMp = lmp;
            }

            hour = hungerConsumeTime / 60 / 60;
            min = hungerConsumeTime / 60;

            return { hour, min, estimateMp };
        }

        dazuoExtimate() {
            let hour = 0;
            let min = 0;
            let heroMode = modelData.hero;
            let skillModel = modelData.skill;
            let hungerConsume = cfgData.bsdXiaohao;
            let mpRecovery = getGongshiValueById(15);
            let hungerConsumeTime = heroMode.hunger / hungerConsume;
            let lmp = modelData.hero.lmp;
            let mmp = modelData.hero.mmp;
            let mp = modelData.hero.mp;
            let estimateMp = mp;
            if (mp >= 2 * lmp && lmp >= mmp) {
                return { hour, min, estimateMp: lmp };
            }

            let mpRecoveryTime = 0;
            let mpRecoverySwitch = true;
            let tempLmp = lmp;

            while (mpRecoverySwitch) {
                mpRecoveryTime += 2 * tempLmp / mpRecovery;
                if (tempLmp <= mmp && mpRecoveryTime / 60 < hungerConsumeTime) {
                    tempLmp++;
                } else {
                    mpRecoveryTime -= 2 * tempLmp / mpRecovery;
                    tempLmp--;
                    mpRecoverySwitch = false;
                }
            }

            estimateMp = tempLmp;

            hour = hungerConsumeTime / 60;
            min = hungerConsumeTime % 60;

            if (mpRecoveryTime / 60 < hungerConsumeTime) {
                hour = (mpRecoveryTime / 60) / 60;
                min = (mpRecoveryTime / 60) % 60;
            }

            return { hour, min, estimateMp };
        }

        skillExp(runtime: IResskill_id) {
            let { id, level } = runtime;
            let cfg = gameConfig.skill[id];
            let [t, p] = cfg.expParameter;
            return Math.pow(level, 3) * t + p;

        }

        @EVT("skill.id.level")
        sliillLevel(event: EventX) {
            let skill = event.data as IResskill_id;
            facade.simpleDispatch(GameEvent.REFRESH_SKILL_LEVEL, skill.id);
        }

        @CodeFunc()
        getSkillLevel(propertys: any) {
            let [skillid] = propertys;
            let runtime = modelData.skill.id[skillid];
            return runtime ? runtime.level : 0
        }


        @CodeFunc()
        getSkillExp(propertys: any, params: any) {
            let [id] = propertys;
            let skill = modelData.skill;
            let runtime = skill.id[id];
            let value = 0;
            if (runtime) {
                value = value = skillModel.skillExp(runtime) - runtime.exp;
            }
            return value;
        }


        @CodeFunc()
        getSkillPotential(propertys: any) {
            let [id] = propertys;
            let skill = modelData.skill;
            let runtime = skill.id[id];
            let value = 0;
            if (runtime) {
                let gongshi = gameConfig.gongshi[2];
                modelData.temp = propertys;
                value = codeDoProperty(modelData, gongshi.gongshi, modelData);
            }
            return value >> 0;
        }

        @CodeFunc()
        getConfig(propertys: any) {

            let [id] = propertys;
            let runtime = cfgData[id];
            if (runtime) {
                return runtime;
            }

            return 0;
        }

        @CodeFunc()
        getLeftSkillExp(propertys: any, params: any) {
            let [id] = propertys;
            let skill = singleton(SkillModel);
            let runtimes = skill.runtimes;
            let runtime = runtimes.id[id];
            let value = 0;
            if (runtime) {
                value = skill.getSkillMaxExp(runtime) - runtime.exp;
            }
            return value;
        }

        //获取技能境界
        getJingJie(level: number) {

            let config = getTypeDefines(TYPE_CONFIG.SKILLJINGJIE);

            level = Math.min(level, 900);

            let id = Math.floor(level / 25);

            return config[id].name;
        }

        //获取普通攻击
        getAttack() {
            let { id, nowWuQiSkillId } = modelData.skill;

            if (!id[nowWuQiSkillId]) {
                return undefined;
            }

            // let skill = gameConfig.skilleffect[id[nowWuQiSkillId].effect];

            // if (skill) {

            //     if (skill.natk) {
            //         let jineng = gameConfig.jineng[skill.natk];
            //         return jineng.id;
            //     }
            // }

            return "1001";
        }

        @EVT("skill.nowWuQiSkillId")
        refreshCurrentJineng() {

            let runtime = {};

            let list = skillModel.getCurrentJineng();

            forarr(list, (v, k) => {
                runtime[`jineng${k + 1}`] = v.jineng.id;
                return true;
            })

            if (list.length < 6) {

                let times = list.length;

                for (let i = 6; i > times; i--) {
                    runtime[`jineng${i}`] = 0;
                }
            }

            foward(CM_CODE.CM_ChangeAutoSkill, [1, runtime]);
        }

        getCurrentJineng() {
            let list: IFightSkill[] = [];

            let { nowWuQiSkillId, nowNeiGongSkillId, nowQingGongSkillId } = this.runtimes;

            this.initSkillList(nowWuQiSkillId, list);
            this.initSkillList(nowNeiGongSkillId, list);
            this.initSkillList(nowQingGongSkillId, list);

            return list;
        }

        initSkillList(skillid: string, list: IFightSkill[]) {

            let { id } = modelData.skill;

            if (!id[skillid]) {
                // console.error("不存在skillid", skillid);
                return;
            }

            let skill = gameConfig.skilleffect[id[skillid].effect];

            if (skill) {

                // if (skill.natk) {
                //     let jineng = gameConfig.jineng[skill.natk];
                //     list.push({ skillid, jineng });
                // }

                forarr(skill.effect, v => {

                    let jineng = gameConfig.jineng[v];

                    if (jineng && !checkLimit(jineng.condition)) {
                        list.push({ skillid, jineng });
                    }
                    return true;
                });
            }
        }
    }

    export let skillModel = singleton(SkillModel);

    export function getGongshiValueById(id: number) {
        let gongshi = gameConfig.gongshi[id];
        let v = 0;
        if (gongshi) {
            v = codeDoProperty(modelData, gongshi.gongshi, modelData);
        }
        return v;
    }


    export function skillGetPotential(id: string, level: number) {
        let skill = modelData.skill;
        let runtime = skill.id[id];

        // if (level <= 0) {
        //     let gongshi = gameConfig.gongshi[2];
        //     let study = codeDoProperty(modelData, gongshi.gongshi, modelData);
        //     return study;
        // }
        let value = 0;
        let runtimeflag = false;
        let runtimeLevel = 0;
        let exp = 0
        if (!runtime) {
            runtimeflag = true;
            skill.id[id] = { id, level, exp } as IResskill_id
        } else {
            runtimeLevel = runtime.level;
            if (runtimeLevel > level) {
                return 0;
            }

            if (runtimeLevel < level) {
                exp = runtime.exp;
                runtime.exp = 0;
                runtime.level = level;
            }
        }

        let gongshi = gameConfig.gongshi[2];
        modelData.temp = [id];
        value = codeDoProperty(modelData, gongshi.gongshi, modelData);

        if (runtime) {
            runtime.level = runtimeLevel;
            runtime.exp = exp;
        }

        if (runtimeflag) {
            delete skill.id[id];
        }

        return value;


    }

}