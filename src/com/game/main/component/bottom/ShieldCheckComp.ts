module rf {

    export var checkData: { [key: string]: { id: number, visible: boolean } } = {};

    export class ShieldCheckComp extends TSourceCompment {
        skin: TSourceCompment & IMainScene_ShieldCheck;

        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "shieldCheck");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            let { txt_pro_1, txt_pro_2, txt_pro_3, txt_pro_4, btn_check1, btn_check2, btn_check3, btn_check4 } = skin;

            setText(txt_pro_1, "世界");
            setText(txt_pro_2, "当前");
            setText(txt_pro_3, "私聊");
            setText(txt_pro_4, "他人行为");

            checkData["system"] = { id: 1, visible: true };

            this.setCheckButton(btn_check1, btn_check2, btn_check3, btn_check4);
        }

        setCheckButton(...checks: (TComponent & IMainScene_Btn_check)[]) {
            forarr(checks, (check: TComponent & IMainScene_Btn_check, key: number) => {
                let { xuanze } = check;
                let visible = xuanze.visible;
                checkData[check.name] = { id: key + 2, visible };
                check.on(MouseEventX.CLICK, this.onCheckClickHandler, this);
                return true;
            });
        }

        onCheckClickHandler(event: EventX) {
            playEffectKeyByAudio();
            let target = event.currentTarget as TComponent & IMainScene_Btn_check;
            let { xuanze } = target;
            let visible = xuanze.visible;
            xuanze.visible = !visible;
            checkData[target.name].visible = !visible;
            facade.simpleDispatch(GameEvent.CHECK_BUTTON, checkData);
        }
    }
}