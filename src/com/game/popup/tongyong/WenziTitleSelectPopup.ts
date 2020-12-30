module rf {

    export class WenziTitleSelectPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Wenzi_title_select_popup;

        _data: IPopRuntime;

        compelte: boolean;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "wenzi_title_select_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { btn_quxiao, btn_queding, txt_value } = skin;

            txt_value.multiline = true;

            setButtonName(btn_quxiao, "取消");
            setButtonName(btn_queding, "确定");

            btn_queding.on(MouseEventX.CLICK, this.onQuedingClickHandler, this);
            btn_quxiao.on(MouseEventX.CLICK, ()=>{
                playEffectKeyByAudio();
                this.close();
            }, this);
        }

        doData() {
            super.doData();

            this.compelte = false;

            let { skin, _data } = this;
            let { txt_title, txt_value } = skin;

            setText(txt_title, `${_data.title}`);
            setText(txt_value, `${_data.value}`);
        }

        onQuedingClickHandler() {
            playEffectKeyByAudio();

            let { traget, _data } = this;
            if (_data) {
                let { rightEvt } = _data;
                if (rightEvt) {
                    rightEvt.call(traget);
                }
            }
            this.compelte = true;
            this.close();
        }

        sleep() {
            super.sleep();
            if (!this.compelte) {
                let { traget, _data } = this;
                if (_data) {
                    let { leftEvt } = _data;
                    if (leftEvt) {
                        leftEvt.call(traget);
                    }
                }
            }
        }
    }
}