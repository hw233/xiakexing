module rf {

    //装备
    export class DealSelectPopup1 extends BaseDealPopup {

        skin: TSourceCompment & IPopup_Deal_select_1_popup;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "deal_select_1_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { txt_effect, txt_desc } = this.skin;

            txt_effect.multiline = true;
            txt_desc.multiline = true;
        }

        doData() {
            super.doData();

            let { _data, skin, icon } = this;

            if (_data) {

                let { btn_queding, txt_name, txt_flag, txt_level, txt_count, txt_base, txt_desc, txt_shuxing, txt_effect, txt_naijiu, txt_price } = skin;

                let { type, item, price, max } = _data;

                let model: IItem = undefined;

                let dur = 0;
                let pro = undefined;

                if (type == DealType.sell) {
                    let { model: m, extraData, count } = item as IItemRuntimeData;
                    model = m;
                    dur = extraData.durability;
                    pro = extraData.pro;
                    this.seleceNum = count;
                } else {
                    model = item as IItem;
                    dur = model.maxdurability;
                    pro = model.pro;
                    this.seleceNum = 1;
                }

                setButtonName(btn_queding, type);

                let { name, flag, level, score, describe, effect, maxdurability, rare } = model;

                icon.data = model;

                setText(txt_name, name, Rare[rare]);
                setText(txt_flag, flag);
                setText(txt_level, `等级:${level}`);
                // setText(txt_count, `${max}`);

                let str1 = "";

                forarr(getStrFromPro(pro), v => {
                    let { name, value } = v;
                    str1 += `${name}:${value}\\n`;
                    return true;
                });

                setText(txt_shuxing, str1);

                let str2 = "";

                forarr(getStrFromPro(pro, true), v => {
                    let { name, value } = v;
                    str2 += `${name}:${value}\\n`;
                    return true;
                });

                setText(txt_base, str2);
                setText(txt_effect, effect || "");
                setText(txt_desc, describe || "");

                setText(txt_price, `${price}`);
                setText(txt_naijiu, `耐久度:${dur}/${maxdurability}`);
            }
        }
    }

    //食物或书籍或药品
    export class DealSelectPopup2 extends BaseDealPopup {

        skin: TSourceCompment & IPopup_Deal_select_2_popup;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "deal_select_2_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { txt_desc, txt_effect } = this.skin;

            txt_effect.multiline = true;
            txt_desc.multiline = true;
        }

        doData() {
            super.doData();

            let { _data, skin, icon } = this;

            if (_data) {

                let { btn_queding, txt_name, txt_flag, txt_count, txt_effect, txt_desc, txt_naijiu } = skin;

                let { type, item, max, count: num } = _data;

                let model: IItem = undefined;

                let dur = 0;
                let pro = undefined;

                if (type == DealType.sell) {
                    let { model: m, extraData, count } = item as IItemRuntimeData;
                    model = m;
                    dur = extraData.durability;
                    pro = extraData.pro;
                    this.seleceNum = count;
                    num = count;
                } else {
                    model = item as IItem;
                    dur = model.maxdurability;
                    pro = model.pro;
                    this.seleceNum = 1;
                }

                setButtonName(btn_queding, type);

                let { name, flag, type: itemType, describe, effect, maxdurability, rare } = model;

                icon.data = model;

                setText(txt_name, name, Rare[rare]);
                setText(txt_flag, flag);
                setText(txt_count, `${num}`);

                if (itemType == ITEM_TYPE.Shuji) {

                    setText(txt_naijiu, `耐久度:${dur}/${maxdurability}`);
                    setText(txt_effect, effect || "");
                } else {

                    let str = "";

                    forarr(getStrFromPro(pro, true), v => {
                        let { name, value } = v;
                        str += `${name}:${value}\\n`;
                        return true;
                    });

                    setText(txt_naijiu, "");
                    setText(txt_effect, `${effect}\\n${str}`);
                }

                setText(txt_desc, describe);
            }

            this.changeSeleceNum();
        }
    }

    //其他道具
    export class DealSelectPopup3 extends BaseDealPopup {

        skin: TSourceCompment & IPopup_Deal_select_3_popup;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "deal_select_3_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { txt_desc } = this.skin;

            txt_desc.multiline = true;
        }

        doData() {
            super.doData();

            let { _data, skin, icon } = this;

            if (_data) {

                let { btn_queding, txt_name, txt_flag, txt_count, txt_desc } = skin;

                let { type, item, max, count: num } = _data;

                let model: IItem = undefined;

                if (type == DealType.sell) {
                    let { model: m, id, count } = item as IItemRuntimeData;
                    model = m || gameConfig.item[id];
                    this.seleceNum = count;
                    num = count;
                } else {
                    model = item as IItem;
                    this.seleceNum = 1;
                }

                setButtonName(btn_queding, type);

                let { name, flag, describe, rare } = model;

                setText(txt_name, name, Rare[rare]);
                setText(txt_flag, flag);
                setText(txt_count, `${num}`);

                icon.data = model;

                setText(txt_desc, describe);
            }

            this.changeSeleceNum();
        }
    }
}