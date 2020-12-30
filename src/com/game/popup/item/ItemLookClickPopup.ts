module rf {

    //不能使用道具详情
    export class ItemLookClickPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Item_look_popup;

        _data: IItemRuntimeData;

        icon: ItemIcon;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "item_look_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { _icon, txt_desc } = this.skin;

            txt_desc.multiline = true;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;
        }

        doData() {
            super.doData();

            let { skin, _data, icon } = this;
            let { txt_name, txt_count, txt_flag, txt_price, txt_desc ,silver} = skin;

            let { count, model } = _data;
            let { name, rare, sell, flag, describe } = model;

            icon.data = model;

            setText(txt_name, name, Rare[rare]);
            setText(txt_flag, flag);
            setText(txt_count, `${count}`);
            setText(txt_desc, describe);

            silver.visible = !!sell;
            setText(txt_price, sell ? `${getLimitValues(sell)[0].maxCount}` : "");
        }
    }
}