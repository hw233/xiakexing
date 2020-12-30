module rf {

    export class MijingSelfComp extends TEventInteresterDele {

        skin: TSourceCompment & IMapScene_Mijing_self_comp;

        hero: IReshero;

        itemList: List;

        touxiang: TTouXiangIcon;
        effect: TAnimation;
        shouShang: TAnimation;

        bar_hp: TProgressBar;
        bar_mp: TProgressBar;
        bar_vigor: TProgressBar;

        bindComponents() {

            this.hero = modelData.hero;

            let { skin } = this;
            let { _icon, bar_hp, bar_mp, bar_vigor, btn_beibao, btn_dazuo, btn_liaoshang } = skin;

            let list = new List(undefined, QuickItem, 99, 99, 5, 0, false);
            skin.addChild(list);
            this.itemList = list;
            list.setPos(10, 0);

            this.bar_hp = bar_hp as TProgressBar;
            this.bar_mp = bar_mp as TProgressBar;
            this.bar_vigor = bar_vigor as TProgressBar;

            buttonModels(_icon);

            let touxiang = new TTouXiangIcon();
            _icon.addChild(touxiang);
            this.touxiang = touxiang;

            let effect = new TAnimation();
            _icon.addChild(effect);
            effect.setPos(_icon.w >> 1, _icon.h >> 1);
            this.effect = effect;

            effect = new TAnimation();
            _icon.addChild(effect);
            effect.setPos(_icon.w >> 1, _icon.h >> 1);
            this.shouShang = effect;

            setButtonName(btn_beibao, "背包30");
            setButtonName(btn_dazuo, "打坐30");
            setButtonName(btn_liaoshang, "疗伤30");

            _icon.on(MouseEventX.CLICK, this.touxingClickHandle, this);

            btn_beibao.on(MouseEventX.CLICK, this.beibaoClickHandle, this);
            btn_dazuo.on(MouseEventX.CLICK, this.dazuoClickHandle, this);
            btn_liaoshang.on(MouseEventX.CLICK, this.liaoshangClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            if (!this.skin) {
                return;
            }

            this.initQuickItem();

            this.changIcon();
            this.changEffect();
            this.changeXueqi();
            this.changeNeili();
            this.changeJingli();
        }

        initQuickItem() {
            let { quickSlot } = modelData.item;
            this.itemList.displayList(quickSlot);
        }

        touxingClickHandle() {
            playEffectKeyByAudio();

            let { skin } = this;

            let touxiang = singleton(MijingTouxiangComp);
            if (!Mijing_Touxiang_Switch) {
                skin.parent.addChild(touxiang);
                skin.parent.addChild(skin);
            } else {
                touxiang.remove();
            }
        }

        beibaoClickHandle() {

            playEffectKeyByAudio();
            let beibao = singleton(BeibaoComp);
            changeMainDele(beibao, undefined, false);
            beibao.data = { type: OPEN_TYEP.mijing } as IBeibaoData;
        }

        dazuoClickHandle() {
            playEffectKeyByAudio();

            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            let neigong = modelData.skill.nowNeiGongSkillId;
            if (!neigong) {
                playEffectKeyByAudio("warning");
                addPrompt("未学习内功，无法打坐！");
                return;
            }

            singleton(MijingDazuoPopupComp).open();

        }

        liaoshangClickHandle() {
            playEffectKeyByAudio();

            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);

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

        @EVT(`${ResConst.HERO}.${IResheroConst.STATUSHURT}`, `${ResConst.HERO}.${IResheroConst.STATUSHUNGER}`, `${ResConst.HERO}.${IResproConst.STATUSSTUPOR}`, `${ResConst.HERO}.${IResheroConst.STATUSDIE}`)
        changEffect() {
            // let { hero, effect, shouShang } = this;
            // let { statusHurt, statusHunger, statusStupor, statusDie } = hero;

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
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HP}`, `${ResConst.HERO}.${IResproConst.LHP}`, `${ResConst.HERO}.${IResproConst.MHP}`)
        changeXueqi() {

            let { hero, bar_hp } = this;
            let { hp, lhp, mhp } = hero;

            bar_hp.setProgress(hp, mhp);
            bar_hp.setProgressParam(lhp, mhp);
            bar_hp.setProgressText(`${Math.floor(hp)}/${Math.floor(lhp)}`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.MP}`, `${ResConst.HERO}.${IResproConst.LMP}`, `${ResConst.HERO}.${IResproConst.MMP}`)
        changeNeili() {

            let { hero, bar_mp } = this;
            let { mp, lmp, mmp } = hero;

            lmp *= 2;

            bar_mp.setProgress(mp, lmp);
            bar_mp.setProgressText(`${Math.floor(mp)}/${Math.floor(lmp)}`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.VIGOR}`)
        changeJingli() {

            let { hero, bar_vigor } = this;
            let { vigor, maxvigor } = hero;

            bar_vigor.setProgress(vigor, maxvigor);
            bar_vigor.setProgressText(`${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
        }
    }
}