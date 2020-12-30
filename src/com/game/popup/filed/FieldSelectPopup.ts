module rf {

    //种植
    export class FieldSelectItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Crop_select_item;

        _data: IItemCombine;

        icon: ItemIcon;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "crop_select_item");
        }

        bindComponents() {

            this.skin = this as any;

            let { _icon, txt_pro_1, txt_pro_2, txt_pro_3, btn_zhongzhi } = this.skin;

            setText(txt_pro_1, "作物:");
            setText(txt_pro_2, "基础产量:");
            setText(txt_pro_3, "预计时长:");

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            setButtonName(btn_zhongzhi, "种植");

            btn_zhongzhi.on(MouseEventX.CLICK, this.zhongzhiClickHandle, this);
        }

        doData() {

            let { _data, skin, icon } = this;
            if (_data) {
                let { txt_title, txt_count, txt_name, txt_num, txt_time } = skin;
                let { model, count, id } = _data;

                let field = gameConfig.field[id];

                if (!field) {
                    return;
                }

                icon.data = model;

                setText(txt_title, model.name, Rare[model.rare]);
                setText(txt_count, `${count}`);

                let { name, maturity, maturePerSecond, reward } = field;

                setText(txt_name, name);
                setText(txt_num, `${getLimitValues(reward)[0].maxCount}`);

                let { hour, minute } = getTimeToS(maturity / maturePerSecond);
                setText(txt_time, `${hour}小时${minute}分钟`);

            }

        }

        zhongzhiClickHandle() {

            facade.simpleDispatch(GameEvent.REFRESH_FIELD, this._data.guid);
        }

    }

    export class FieldSelectPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Crop_cook_fuzhou_select_popup;

        _data: IItemCombine[];

        showEffect = false;

        guid: number;

        list: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "crop_cook_fuzhou_select_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin, source } = this;

            let list = new List(source, FieldSelectItem, 424, 260, 0, 15);
            skin.addChild(list);
            this.list = list;
            list.setPos(28, 41);
            list.setScrollRect(480, 750, 0, 1);

        }

        doData() {
            super.doData();

            let { _data, list } = this;
            list.displayList(_data);
        }

        @EVT(GameEvent.REFRESH_FIELD)
        refreshPlant(event: EventX) {
            let guid = event.data as number;

            foward(CM_CODE.CM_Plant, [guid, this.guid]);

            this.close();
        }
    }
}