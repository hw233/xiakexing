module rf {

    export class PhaseGuideComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Guidecomp;

        _data: IDialogueRuntime;

        ed: MiniDispatcher = new MiniDispatcher();

        constructor() {
            super(RES_PERFIX, "ui/package/", "guidecomp");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            let { txt_value } = skin;
            txt_value.multiline = true;
            txt_value.html = true;
        }

        open(data: IDialogueRuntime) {
            this.data = data;
            return this.ed;
        }

        doData() {
            tipContainer.addChild(this);
            let { _data, skin } = this;
            let { txt_value } = skin;

            if (_data.y) {
                skin.y = _data.y * stageHeight;
            }

            txt_value.text = _data.context;
        }
    }
}