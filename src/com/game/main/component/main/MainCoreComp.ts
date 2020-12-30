module rf {
    export class MainCoreComp extends TSourceCompment {

        skin: TSourceCompment & IMainScene_Main_core;

        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "main_core");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            let { bg, btn_mijing } = skin;

            btn_mijing.phaseName = "lilian";
            setButtonName(btn_mijing, "江湖历练");

            let anima = new TAnimation();
            bg.addChild(anima);
            anima.setPos(skin.w >> 1, skin.h >> 1);
            anima.create(RES_PERFIX, "animation/jiemian", "zhulin");

            btn_mijing.on(MouseEventX.CLICK, this.onMijingClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            this.refreshBuff();
        }

        @EVT(`${ResConst.RES}.${IResresConst.DOUBLEEXP}`, `${ResConst.RES}.${IResresConst.DOUBLEPOTENTIAL}`)
        refreshBuff() {
            let { skin } = this;

            if (!skin) {
                return;
            }

            let { buff_exp, buff_qianneng } = skin;
            let { doubleExp, doublePotential } = modelData.res;

            let result_1 = (doubleExp == 2);
            let result_2 = (doublePotential == 2);

            buff_exp.visible = result_1;
            buff_qianneng.visible = result_2;

            if (result_2) {
                buff_qianneng.y = !result_1 ? 25 : 60;
            }
        }

        onMijingClickHandle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            playEffectKeyByAudio();
            changeMainDele(singleton(MijingBtnComp), singleton(MijingCoreSystemComp));
        }
    }
}