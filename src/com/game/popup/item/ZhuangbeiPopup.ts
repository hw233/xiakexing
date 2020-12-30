module rf {

    export class ZhuangbeiPopup extends BasePopup {

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

            txt_effect.multiline = true;
            txt_desc.multiline = true;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            setButtonName(btn_left, "卸下");
            setButtonName(btn_right, "装备");

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
        }

        doData() {
            super.doData();

            let { skin, _data, icon } = this;
            let { btn_left, btn_right, txt_name, txt_flag, txt_level, txt_count, txt_base, txt_desc, txt_shuxing, txt_effect, txt_price, txt_naijiu } = skin;

            if (_data) {
                let { owner, model, extraData, slot: location, count } = _data;
                let { name, flag, level, score, slot, pro, sell, describe, effect, maxdurability, rare } = model;

                icon.data = model;

                setText(txt_name, name, Rare[rare]);
                setText(txt_flag, flag);
                setText(txt_level, `等级:${level}`);
                // setText(txt_count, `${count}`);

                let buwei = false;

                forarr(slot, v => {

                    if (location == v) {
                        buwei = true;
                    }

                    return true;
                });

                if (owner == modelData.hero.guid) {
                    btn_left.visible = buwei;
                    btn_right.visible = !buwei;
                } else {
                    btn_left.visible = false;
                    btn_right.visible = false;
                }

                let naijiu = undefined;

                if (maxdurability) {
                    naijiu = `耐久度:${extraData.durability}/${maxdurability}`;
                }

                let str1 = "";

                forarr(getStrFromPro(pro), v => {
                    let { name, value } = v;
                    str1 += `${name}:${Math.floor(Number(value))}\\n`;
                    return true;
                });

                setText(txt_shuxing, str1);

                let str2 = "";

                forarr(getStrFromPro(pro, true), v => {
                    let { name, value } = v;
                    str2 += `${name}:${Math.floor(Number(value))}\\n`;
                    return true;
                });

                setText(txt_base, str2);
                setText(txt_effect, effect || "");
                setText(txt_desc, describe || "");

                setText(txt_price, `${getLimitValues(sell)[0].maxCount}`);
                setText(txt_naijiu, naijiu || "");
            }
        }

        onLeftClickHandler() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            let { _data } = this;
            let itemConfig = _data.model;
            if (_data.slot == itemConfig.slot[0] || _data.slot == itemConfig.slot[1]) {
                // 已装备 可以卸下
                foward(CM_CODE.CM_TakeOffEquip, this._data.guid);

                switch (itemConfig.slot[0]) {
                    case 100: {
                        playEffectKeyByAudio("xie_xia_wu_qi");
                        break;
                    }
                    case 101:
                    case 102:
                    case 103:
                    case 104:
                    case 105:
                    case 106: {
                        playEffectKeyByAudio("xie_xia_hu_jia");
                        break;
                    }
                    case 107:
                    case 108: {
                        playEffectKeyByAudio("xie_xia_shi_pin");
                        break;
                    }
                }

                addPrompt("已卸下!");
                this.close();
            } else {
                // 未装备 无法卸下
                playEffectKeyByAudio("warning");
                addPrompt("未穿戴装备!");
            }
        }

        onRightClickHandler() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            let { _data } = this;
            let itemConfig = _data.model;
            if (_data.slot == itemConfig.slot[0] || _data.slot == itemConfig.slot[1]) {
                // 已装备 无法在装备
                playEffectKeyByAudio("warning");
                addPrompt("已穿戴装备!");
            } else {
                // 未装备 可以装备

                let { guid, owner } = this._data;

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
                addPrompt("穿戴装备成功!");
                this.close();
            }
        }
    }
}