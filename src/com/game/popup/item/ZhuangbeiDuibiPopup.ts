module rf {

    export class ZhuangbeiDuibiPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Zhuangbei_xiangqing_popup;
        _data: IItemRuntimeData;

        icon: ItemIcon;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "zhuangbei_xiangqing_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { _icon, btn_left, btn_right, txt_effect, txt_desc } = skin;

            btn_right.visible = false;

            txt_effect.multiline = true;
            txt_desc.multiline = true;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            setButtonName(btn_left, "替换");

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
        }

        doData() {
            super.doData();

            let { skin, _data, icon } = this;
            let { txt_name, txt_flag, txt_level, txt_count, txt_desc, txt_base, txt_shuxing, txt_effect, txt_naijiu, txt_price } = skin;

            if (_data) {
                let { model, extraData, count } = _data;
                let { name, flag, level, score, slot, pro, sell, describe, effect, maxdurability, rare } = model;

                icon.data = model;

                setText(txt_name, name, Rare[rare]);
                setText(txt_flag, flag);
                setText(txt_level, `等级:${level}`);
                // setText(txt_count, `${count}`);

                let naijiu = "";
                // let ruslut = true;

                // forarr(slot, v => {

                //     let zhuangbei = (modelData.item as IItemRuntime).slots[v];

                //     if (zhuangbei) {
                //         ruslut = false;
                //     }

                //     return ruslut;
                // });

                if (maxdurability) {
                    naijiu = `耐久度:${extraData.durability}/${maxdurability}`;
                }

                let str1 = "";

                forarr(getStrFromPro(pro), v => {
                    let temp = this.formatStr(v, maxdurability ? extraData.durability : 0);
                    str1 += `${temp}\\n`;
                    return true;
                });

                setText(txt_shuxing, str1);

                let str2 = "";

                forarr(getStrFromPro(pro, true), v => {
                    let temp = this.formatStr(v, maxdurability ? extraData.durability : 0);
                    str2 += `${temp}\\n`;
                    return true;
                });

                setText(txt_base, str2);
                setText(txt_effect, effect || "");
                setText(txt_desc, describe || "");

                setText(txt_price, `${getLimitValues(sell)[0].maxCount}`);
                setText(txt_naijiu, naijiu || "");
            }
        }

        formatStr(pro: IProStr, naiiju: number) {

            let { extraData, model } = this._data;
            let curItem = undefined;
            let itemData = (modelData.item as IItemRuntime);
            curItem = itemData.slots[model.slot[0]];

            let { id, name, value } = pro;
            value = value as number;

            let proportion = 1;
            let color = Style.GREEN;
            let sign = "↑";

            if (naiiju) {
                proportion = (value - curItem.extraData.pro[id]) / value;
                if (proportion < 0) {
                    color = Style.RED;
                    sign = "↓";
                }
            }

            let temp = `<font color="${color}">${sign} ${Math.abs(proportion * 100).toFixed(0)}%</font>`;

            return `${name}:${value.toFixed(0)}${naiiju ? `(${naiiju})` : ""} ${temp}`;
        }

        onLeftClickHandler() {

            let { guid, owner } = this._data;
            let itemConfig = this._data.model;
            switch (itemConfig.slot[0]) {
                case 100: {
                    playEffectKeyByAudio("zhuang_bei_wu_qi");
                    break;
                }
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106: {
                    playEffectKeyByAudio("zhuang_bei_hu_jia");
                    break;
                }
                case 107:
                case 108: {
                    playEffectKeyByAudio("zhuang_bei_shi_pin");
                    break;
                }
            }
            foward(CM_CODE.CM_UseItem, [guid, 1, owner]);
            addPrompt("更换成功!");
            this.close();
        }
    }
}