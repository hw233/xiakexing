module rf {
    export class InfoTopComp extends TSourceCompment {
        skin: TSourceCompment & IMainScene_Info_top;

        touxiang: TTouXiangIcon;

        effect: TAnimation;
        shouShang: TAnimation;

        bar_hp: TProgressBar;
        bar_mp: TProgressBar;
        bar_vigor: TProgressBar;
        bar_hunger: TProgressBar;
        bar_exp: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "info_top");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;

            let { system, _icon, bar_hp, bar_mp, bar_vigor, bar_hunger, bar_exp, btn_beibao, btn_store, btn_shuxing, btn_gongfa, btn_renwu, btn_dazuo, btn_liaoshang, txt_pro1, txt_pro2, txt_pro3, txt_pro4, txt_pro5, txt_pro6 } = skin;

            setText(txt_pro1, "气血");
            setText(txt_pro2, "内力");
            setText(txt_pro3, "精神");
            setText(txt_pro4, "饱食度");
            setText(txt_pro5, "潜能点");
            setText(txt_pro6, "银两");

            this.bar_hp = bar_hp as TProgressBar;
            this.bar_mp = bar_mp as TProgressBar;
            this.bar_vigor = bar_vigor as TProgressBar;
            this.bar_hunger = bar_hunger as TProgressBar;
            this.bar_exp = bar_exp as TProgressBar;

            let touxiang = new TTouXiangIcon();
            _icon.addChildAt(touxiang, 0);
            this.touxiang = touxiang;
            touxiang.setPos(10, 0);

            // let effect = new TAnimation();
            // _icon.addChild(effect);
            // effect.setPos(_icon.w >> 1, _icon.h >> 1);
            // this.effect = effect;

            // effect = new TAnimation();
            // _icon.addChild(effect);
            // effect.setPos(_icon.w >> 1, _icon.h >> 1);
            // this.shouShang = effect;

            new TopSystemComp(system);

            btn_beibao.phaseName = "beibao";
            setButtonName(btn_beibao, "背包", 0, 40);

            setButtonName(btn_renwu, "任务");
            setButtonName(btn_shuxing, "属性");
            setButtonName(btn_gongfa, "功法");

            setButtonName(btn_liaoshang, "疗伤");
            btn_dazuo.phaseName = "dazuo";
            setButtonName(btn_dazuo, "打坐");

            btn_beibao.on(MouseEventX.CLICK, this.onBeibaoClickHandler, this);
            btn_store.on(MouseEventX.CLICK, this.onStoreClickHandler, this);

            btn_renwu.on(MouseEventX.CLICK, this.renwuClickHandle, this);
            btn_shuxing.on(MouseEventX.CLICK, this.shuxingClickHandle, this);
            btn_gongfa.on(MouseEventX.CLICK, this.onGongfaClickHandle, this);

            btn_liaoshang.on(MouseEventX.CLICK, this.onLiaoshangClickHandle, this);
            btn_dazuo.on(MouseEventX.CLICK, this.dazuoClickHandle, this);

            txt_pro1.on(MouseEventX.CLICK, () => {
                let mhp = modelData.hero.mhp;
                foward(1, { "hero.hp": mhp, "hero.lhp": mhp })
            }, this);


            txt_pro2.on(MouseEventX.CLICK, () => {
                let mmp = modelData.hero.mmp;
                foward(1, { "hero.mp": mmp * 2, "hero.lmp": mmp })
            }, this);

            txt_pro3.on(MouseEventX.CLICK, () => {
                let vigor = modelData.hero.maxvigor;
                foward(1, { "hero.vigor": vigor })
            }, this);

            txt_pro4.on(MouseEventX.CLICK, () => {
                let maxhunger = modelData.hero.maxhunger;
                foward(1, { "hero.hunger": maxhunger });
            }, this);

            if (skin.stage) {
                this.awaken();
            }

        }

        awaken() {
            let { skin } = this;

            if (!skin) {
                return;
            }

            facade.simpleDispatch(GameEvent.CHECK_SET_BTN, true);

            modelData.hero.panelId = 0;

            this.changIcon();
            // this.changEffect();
            this.changeName();
            this.changeDengji();
            this.changeExp();
            this.changeSex();
            this.changeMenpai();
            this.changeShifu();
            this.changeNianji();

            this.changeXueqi();
            this.changeNeili();
            this.changeJingli();
            this.changeBaoshidu();
            this.changeQianli();
            this.changeSilver();

            this.taskTrack();
        }

        sleep() {
            facade.simpleDispatch(GameEvent.CHECK_SET_BTN, false);
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.TRACKGUID}`)
        taskTrack() {
            if (this.skin) {
                setTaskTrack(this.skin);
            }
        }

        setPro(module: string, property: string | number, value: string | number) {

            let { skin } = this;

            let config = getProDefine(module, property);

            let text = skin[`txt_${property}`];

            if (text) {

                setText(text, `${config.name}${proGap}${value}`);
            }
        }

        onBeibaoClickHandler() {

            playEffectKeyByAudio();
            let beibao = singleton(BeibaoComp);
            changeMainDele(beibao, undefined, false);
            beibao.data = { type: OPEN_TYEP.normal } as IBeibaoData;
        }

        onStoreClickHandler() {
            playEffectKeyByAudio();

            changeMainDele(singleton(StoreComp), undefined, false);
        }

        shuxingClickHandle() {
            playEffectKeyByAudio();

            changeMainDele(singleton(ProComp));
            // changeMainDele(singleton(XuanshangTopComp));
        }

        onGongfaClickHandle() {
            playEffectKeyByAudio();

            let skill = modelData.skill.id;

            let flag = true;

            foreach(skill, v => {

                if (v) {
                    flag = false;
                }
                return flag;
            });

            if (flag) {
                addPrompt("还没有学习技能!");

            } else {
                changeMainDele(singleton(GongfaTopComp), singleton(GongfaCoreComp));
            }
        }

        renwuClickHandle() {
            playEffectKeyByAudio();
            singleton(TaskPopup).open();
        }

        dazuoClickHandle() {

            let { hero, skill } = modelData;

            if (hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            if (!skill.nowNeiGongSkillId) {
                playEffectKeyByAudio("warning");
                addPrompt("未学习内功，无法打坐！");
                return;
            }

            singleton(DazuoPopupComp).open();
        }

        onLiaoshangClickHandle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            foward(CM_CODE.CM_Treat);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.FACE_BG}`)
        changIcon() {
            let { touxiang } = this;
            let { face_bg, face_tou, face_fa, face_mei, face_yan, face_hu } = modelData.hero;
            touxiang.data = { face_bg, face_tou, face_fa, face_mei, face_yan, face_hu } as IFaceData;
        }

        // @EVT(`${ResConst.SKILL}.${IResskillConst.NOWNEIGONGSKILLID}`)
        // changCurSkill() {
        // let { skin } = this;
        // let { txt_skill } = skin;

        // let { nowNeiGongSkillId } = modelData.skill;

        // if (nowNeiGongSkillId) {
        //     let skill = gameConfig.skill[nowNeiGongSkillId];
        //     setText(txt_skill, skill.name);
        // } else {
        // setText(txt_skill, "策划需求冲突", Styte.RED);
        // }
        // }

        // @EVT(`${ResConst.HERO}.${IResheroConst.STATUSHURT}`, `${ResConst.HERO}.${IResheroConst.STATUSHUNGER}`, `${ResConst.HERO}.${IResproConst.STATUSSTUPOR}`, `${ResConst.HERO}.${IResheroConst.STATUSDIE}`)
        // changEffect() {
        // let { effect, shouShang } = this;
        // let { statusHurt, statusHunger, statusStupor, statusDie } = modelData.hero;

        // let animaTion = gameConfig.animation;

        // if (statusHurt) {
        //     if (animaTion["statusHurt"]) {
        //         let [url, key] = animaTion["statusHurt"].res;
        //         shouShang.create(RES_PERFIX, url, key);
        //     }
        // } else {
        //     shouShang.clean();
        // }

        // let str = undefined;

        // if (statusHunger) {
        //     str = "statusHunger";
        // }
        // if (statusStupor) {
        //     str = "statusStupor";
        // }
        // if (statusDie) {
        //     str = "statusDie";
        // }

        // if (str) {
        //     if (animaTion[str]) {
        //         let [url, key] = animaTion[str].res;
        //         effect.create(RES_PERFIX, url, key);
        //     }
        // } else {
        //     effect.clean();
        // }
        // }

        @EVT(`${ResConst.HERO}.${IResheroConst.NAME}`)
        changeName() {
            let { skin } = this;

            setText(skin.txt_name, `${modelData.hero.name}`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.LEVEL}`)
        changeDengji() {
            let { level } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.LEVEL, level);
        }

        @EVT(`${ResConst.HERO}.exp`)
        changeExp() {

            let { bar_exp } = this;
            let { level, exp } = modelData.hero;
            let have = gameConfig.rank[level].exp;

            bar_exp.setProgress(exp, have);
            bar_exp.setProgressText(`${numberToM(exp)}/${numberToM(have)}`);

            // this.setPro(ResConst.PRO, IResproConst.LEVEL, `${level}(${numberToM(exp)}/${numberToM(have)})`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.AGE}`)
        changeNianji() {
            this.setPro(ResConst.HERO, IResproConst.AGE, `${modelData.hero.age}岁`);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.SEX}`)
        changeSex() {

            let { sex } = modelData.hero;

            let config = getTypeDefines(TYPE_CONFIG.SEX);

            let str = "无";

            if (config[sex]) {
                str = config[sex].name;
            }

            this.setPro(ResConst.HERO, IResheroConst.SEX, str);
        }

        @EVT(`${ResConst.MENPAI}.${IResmenpaiConst.GUILD}`)
        changeMenpai() {

            let { guild } = modelData.menpai;

            let str = "暂无门派";

            if (guild != 0) {
                str = gameConfig.menpai[guild].name;
            }

            this.setPro(ResConst.MENPAI, IResmenpaiConst.GUILD, str);
        }

        @EVT(`${ResConst.MENPAI}.${IResmenpaiConst.MASTER}`)
        changeShifu() {

            let { master } = modelData.menpai;

            let str = "暂无师傅";

            if (master) {
                let element = master as any;

                str = gameConfig.element[element].name;
            }

            this.setPro(ResConst.MENPAI, IResmenpaiConst.MASTER, str);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HP}`, `${ResConst.HERO}.${IResproConst.LHP}`, `${ResConst.HERO}.${IResproConst.MHP}`)
        changeXueqi() {
            let { bar_hp } = this;
            let { hp, lhp, mhp } = modelData.hero;

            let str = ((lhp / mhp) * 100).toFixed(0);

            bar_hp.setProgress(hp, mhp);
            bar_hp.setProgressParam(lhp, mhp);
            bar_hp.setProgressText(`${Math.floor(hp)}/${Math.floor(lhp)}(${str}%)`);

            // this.setPro(ResConst.PRO, IResproConst.HP, `${Math.floor(hp)}/${Math.floor(lhp)}(${str}%)`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.MP}`, `${ResConst.HERO}.${IResproConst.LMP}`, `${ResConst.HERO}.${IResproConst.MMP}`)
        changeNeili() {
            let { bar_mp } = this;
            let { mp, lmp, mmp } = modelData.hero;

            let str = mmp ? ((Math.floor(lmp) / Math.floor(mmp)) * 100).toFixed(0) : 0;

            bar_mp.setProgress(mp, lmp * 2);
            bar_mp.setProgressParam(lmp, mmp);
            bar_mp.setProgressText(`${Math.floor(mp)}/${Math.floor(lmp * 2)}(${str}%)`);

            // this.setPro(ResConst.PRO, IResproConst.MP, `${Math.floor(mp)}/${Math.floor(lmp)}(${str}%)`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.VIGOR}`, `${ResConst.HERO}.${IResproConst.MAXVIGOR}`)
        changeJingli() {
            let { bar_vigor } = this;
            let { vigor, maxvigor } = modelData.hero;

            bar_vigor.setProgress(vigor, maxvigor);
            bar_vigor.setProgressText(`${Math.floor(vigor)}/${Math.floor(maxvigor)}`);

            // this.setPro(ResConst.PRO, IResproConst.VIGOR, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.HUNGER}`, `${ResConst.HERO}.${IResheroConst.MAXHUNGER}`)
        changeBaoshidu() {
            let { bar_hunger } = this;
            let { hunger, maxhunger } = modelData.hero;

            bar_hunger.setProgress(hunger, maxhunger);
            bar_hunger.setProgressText(`${Math.floor(hunger)}/${Math.floor(maxhunger)}`);

            // this.setPro(ResConst.HERO, IResheroConst.HUNGER, `${Math.floor(hunger)}/${Math.floor(maxhunger)}`);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.POTENTIAL}`)
        changeQianli() {
            let { skin } = this;

            setText(skin.txt_potential, `${Math.floor(modelData.hero.potential)}`);

            // this.setPro(ResConst.HERO, IResheroConst.POTENTIAL, Math.floor(modelData.hero.potential));
        }

        @EVT(`item.model.silver`)
        changeSilver() {
            let { skin } = this;

            setText(skin.txt_silver, `${Math.floor(itemModel.all_Silver)}`);

            // this.setPro(ResConst.RES, IResresConst.SILVER, Math.floor(all_Silver));
        }
    }
}