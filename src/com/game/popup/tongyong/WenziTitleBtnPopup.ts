module rf {

    export class WenziTitleBtnPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Wenzi_title_btn_popup;

        _data: IPopRuntime;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "wenzi_title_btn_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { btn_tongyong, txt_value } = skin;

            txt_value.multiline = true;

            btn_tongyong.on(MouseEventX.CLICK, ()=>{
                playEffectKeyByAudio();
                this.close();
            }, this);

            this.name = "WenziTitleBtnPopup";
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { btn_tongyong, txt_title, txt_value } = skin;

            let { title, value, btnName } = _data;

            setText(txt_title, `${title}`);
            setText(txt_value, `${value}`);

            setButtonName(btn_tongyong, btnName || "确定");
        }

        sleep() {
            super.sleep();
            let { traget, _data } = this;
            if (_data) {
                let { rightEvt } = _data;
                if (rightEvt) {
                    rightEvt.call(traget);
                }
            }
        }
    }
}