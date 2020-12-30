module rf {

    export class SkillTypeBtnItem extends TSourceCompment {
        skin: TSourceCompment & IJineng_Btn_jineng;
        _data: ITypeType
        constructor() {
            super(RES_PERFIX, "ui/jineng/", "btn_jineng");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);
        }

        doData() {
            let { skin, _data } = this;

            setButtonName(skin, _data.name, -6);

            this.doSelected();
        }

        doSelected() {
            let { skin, selected } = this;

            if (!skin) {
                return;
            }

            let { xuanze } = skin;
            if (selected) {
                playEffectKeyByAudio("qie_huan_xuan_xiang");
                xuanze.visible = true;
            } else {
                xuanze.visible = false;
            }
        }
    }

    export class JinengStatusDele extends TEventInteresterDele {

        skin: TSourceCompment & IJineng__status;

        bar_baoshidu: TProgressBar;
        bar_jingshen: TProgressBar;

        bindComponents() {
            let { skin } = this;
            let { baoshiduTxt, jingshenTxt, bar_baoshidu, bar_jingshen } = skin;

            setText(baoshiduTxt, "饱食度");
            setText(jingshenTxt, "精神");

            this.bar_baoshidu = bar_baoshidu as TProgressBar;
            this.bar_jingshen = bar_jingshen as TProgressBar;

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            this.changeJingli();
            this.changeBaoshidu();
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.HUNGER}`, `${ResConst.HERO}.${IResheroConst.MAXHUNGER}`)
        changeBaoshidu() {

            let { skin, bar_baoshidu } = this;
            let { hunger, maxhunger } = modelData.hero;

            setText(skin.baoshidu_jindu, `${Math.floor(hunger)}/${Math.floor(maxhunger)}`, undefined, undefined, 5);
            bar_baoshidu.setProgressPercent(hunger / maxhunger);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.VIGOR}`)
        changeJingli() {

            let { skin, bar_jingshen } = this;
            let { vigor, maxvigor } = modelData.hero;

            setText(skin.jingshen_jindu, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`, undefined, undefined, 5);
            bar_jingshen.setProgressPercent(vigor / maxvigor);
        }
    }
}