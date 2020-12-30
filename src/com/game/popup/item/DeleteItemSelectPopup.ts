module rf {

    export class DeleteItemSelectPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Delete_item_select_popup;

        _data: IItemRuntimeData;

        icon: ItemIcon;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "delete_item_select_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { txt_title, txt_tips, _icon, btn_quxiao, btn_queding } = skin;

            setText(txt_title, "销毁道具");
            setText(txt_tips, "注意:物品销毁后将永久消失");

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

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

            let { skin, _data, icon } = this;
            let { txt_name, txt_count } = skin;

            let { count, model } = _data;
            let { name, rare } = model;

            icon.data = model;

            setText(txt_name, name, Rare[rare]);
            setText(txt_count, `${count}`);
        }

        onQuedingClickHandler() {
            playEffectKeyByAudio();

            let { owner, slot } = this._data;
            foward(CM_CODE.CM_RemoveItem, [owner, slot]);
            this.close();
        }
    }
}