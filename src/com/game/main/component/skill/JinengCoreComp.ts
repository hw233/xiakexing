module rf {
    export class GongfaCoreComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Gongfa_core;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "gongfa_core");
        }

        bindComponents() {

            this.skin = this as any;

            let { btn_jiali, btn_auto } = this.skin;

            btn_jiali.on(MouseEventX.CLICK, this.onJialiClickHandle, this);
            btn_auto.on(MouseEventX.CLICK, this.onAutoClickHandle, this);
        }

        onJialiClickHandle() {
            playEffectKeyByAudio();
            singleton(AddForcePopup).open();
        }

        onAutoClickHandle() {
            playEffectKeyByAudio();
            singleton(JinengAutoPopup).open(modelData.skill);
        }
    }
}