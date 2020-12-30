module rf {

    export class ShuijiaoPopupComp extends BasePopup {

        skin: TSourceCompment & IPopup_Shuijiao_popup;

        bar_vigor: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "shuijiao_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { _btn, bar_vigor } = skin;

            this.bar_vigor = bar_vigor as TProgressBar;

            _btn.on(MouseEventX.CLICK, this.onClickHandle, this);

            this.name = "ShuijiaoPopupComp";
        }

        doData() {
            super.doData();

            let { skin, bar_vigor } = this;
            let { _btn, txt_title, txt_tips, txt_vigor, txt_vigor_desc } = skin;

            let elementId = roomModel.getRoomElementInfo(2003, true)[0];
            let config = gameConfig.element[elementId]; 

            setText(txt_tips, `睡觉时恢复精神`, Style.GREEN);
            setText(txt_title, `${config.name}`);

            let { statusDoing, vigor, maxvigor } = modelData.hero;

            if (statusDoing == STATUS_DOING.REST) {
                _btn.phaseName = "qichuang";
                _btn.select.visible = true;
                setButtonName(_btn, "起床");
            } else {
                _btn.phaseName = "shuijiao";
                _btn.select.visible = false;
                setButtonName(_btn, "睡觉");
            }

            setText(txt_vigor, `精神`);
            setText(txt_vigor_desc, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
            bar_vigor.setProgress(vigor, maxvigor);
        }

        onClickHandle() {

            if (modelData.hero.statusDoing == STATUS_DOING.REST) {
                foward(CM_CODE.CM_StopRest);
            } else {
                playEffectKeyByAudio("wo_shi_xiu_xi");
                foward(CM_CODE.CM_Rest);
            }

            this.close();
        }
    }
}