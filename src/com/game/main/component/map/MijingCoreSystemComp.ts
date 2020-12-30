module rf {
    export class MijingCoreSystemComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_btn_core;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_btn_core");
        }

        bindComponents() {
            this.skin = this as any;

            let { btn_beibao, btn_shuxing, btn_gongfa } = this.skin;

            setButtonName(btn_beibao, "背包30");
            setButtonName(btn_shuxing, "属性30");
            setButtonName(btn_gongfa, "功法30");

            btn_beibao.on(MouseEventX.CLICK, this.beibaoClickHandle, this);
            btn_shuxing.on(MouseEventX.CLICK, this.shuxingClickHandle, this);
            btn_gongfa.on(MouseEventX.CLICK, this.gongfaClickHandle, this);
        }

        beibaoClickHandle() {
            
            playEffectKeyByAudio();
            let beibao = singleton(BeibaoComp);
            changeMainDele(beibao, undefined, false);
            beibao.data = { type: OPEN_TYEP.normal } as IBeibaoData;
        }

        shuxingClickHandle() {
            playEffectKeyByAudio();
            changeMainDele(singleton(ProComp));
        }

        gongfaClickHandle() {
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
                changeMainDele(singleton(GongfaTopComp),singleton(GongfaCoreComp));
            }
        }

    }
}