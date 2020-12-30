module rf {

    export class WenziTitlePopup extends BasePopup {

        skin: TSourceCompment & IPopup_Wenzi_title_select_popup;

        _data: IPopRuntime;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "wenzi_title_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { txt_value } = skin;

            txt_value.multiline = true;
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_title, txt_value } = skin;

            setText(txt_title, `${_data.title}`);
            setText(txt_value, `${_data.value}`);
        }
    }
}