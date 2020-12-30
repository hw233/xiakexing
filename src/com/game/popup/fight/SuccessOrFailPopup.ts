module rf {

    export class SuccessPopup extends MapOutPopup {

        skin: TSourceCompment & IPopup_Success_comp_popup;


        constructor() {
            super(RES_PERFIX, "ui/popup/", "success_comp_popup");
        }

        bindComponents() {

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/fail_bg.png", { x: 0, y: 700, w: 640, h: 10 });
            bg.setSize(stageWidth, stageHeight);
            this.bg = bg;

            super.bindComponents();
        }

        doData() {
            super.doData();
            playEffectKeyByAudio("tao_li_cheng_gong_hou");
        }
    }

    export class FailPopup extends MapOutPopup {

        skin: TSourceCompment & IPopup_Fail_comp_popup;

        touxiang: TTouXiangIcon;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "fail_comp_popup");
        }

        bindComponents() {

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/fail_bg.png", { x: 0, y: 700, w: 640, h: 10 });
            bg.setSize(stageWidth, stageHeight);
            this.bg = bg;

            super.bindComponents();

            let { skin } = this;

            let touxiang = new TTouXiangIcon();
            skin._icon.addChildAt(touxiang, 0);
            this.touxiang = touxiang;

            setText(skin.txt_title, "击败者");

            setButtonName(skin.btn_info, "详细信息");

            skin.btn_info.on(MouseEventX.CLICK, this.onInfoClickHandle, this);
        }

        doData() {
            super.doData();
            playEffectKeyByAudio("yi_chang_si_wang");

            let { Killer } = battleModel;

            if (Killer) {
                let { skin, touxiang } = this;
                let { txt_name, btn_info } = skin;
                let { name, elementId, face_bg, face_tou, face_fa, face_mei, face_yan, face_hu } = Killer.hero;

                touxiang.data = { face_bg, face_tou, face_fa, face_mei, face_yan, face_hu } as IFaceData;
                
                setText(txt_name, name);

                setButtonEnabled(btn_info, elementId == 1001, 0.5);

            }
        }

        onInfoClickHandle() {
            singleton(KillerInfoPopup).open();
        }
    }

    export class UnknownOutPopup extends MapOutPopup {

        skin: TSourceCompment & IPopup_Timeout_comp_popup;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "timeout_comp_popup");
        }

        bindComponents() {

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/fail_bg.png", { x: 0, y: 700, w: 640, h: 10 });
            bg.setSize(stageWidth, stageHeight);
            this.bg = bg;

            super.bindComponents();

            let { skin } = this;
            setText(skin.txt_title, "死亡原因");
        }

        doData() {
            super.doData();

            let { _data, skin } = this;
            let { dead } = _data;

            let cfg = getTypeDefines(TYPE_CONFIG.DEAD);
            setText(skin.txt_tips, `${cfg[dead].name}`);

            playEffectKeyByAudio("yi_chang_si_wang");
        }
    }
}