module rf {

    //食物或书籍或药品
    export class BigItemClickPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Deal_select_2_popup;

        _data: IItemRuntimeData;

        icon: ItemIcon;

        seleceNum: number;
        maxNum: number;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "deal_select_2_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { _icon, select_comp, btn_queding, txt_desc } = this.skin;
            let { btn_left, btn_right, btn_max } = select_comp;

            txt_desc.multiline = true;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            btn_queding.phaseName = "useItem";

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
            btn_max.on(MouseEventX.CLICK, this.maxClickHandle, this);
            btn_queding.on(MouseEventX.CLICK, this.onQuedingClickHandler, this);

            this.name = "BigItemClickPopup";
        }

        doData() {
            super.doData();

            let { skin, _data, icon } = this;
            let { txt_name, txt_flag, txt_count, txt_effect, txt_desc, txt_naijiu, txt_price, btn_queding, select_comp } = skin;

            let { type, count, model, extraData } = _data;
            let { name, rare, flag, sell, pro, effect, describe, reward } = model;

            icon.data = model;

            setText(txt_name, name, Rare[rare]);
            setText(txt_flag, flag);
            setText(txt_count, `${count}`);
            setText(txt_desc, describe);
            setText(txt_price, `${getLimitValues(sell)[0].maxCount}`);

            let ruslut = count > 1;
            select_comp.visible = ruslut;

            this.maxNum = count;

            if (type == ITEM_TYPE.Shuji) {

                setButtonName(btn_queding, "放入书架");

                setText(txt_naijiu, `耐久度:${extraData.durability}/${extraData.maxdurability}`);
                setText(txt_effect, effect || "");

            } else {

                setButtonName(btn_queding, "使用");

                let str = "";

                forarr(getStrFromPro(pro, true), v => {
                    let { name, value } = v;
                    str += `${name}:${value}\\n`;
                    return true;
                });

                setText(txt_naijiu, "");
                setText(txt_effect, `${effect}\\n${str}`);

                if (type == ITEM_TYPE.Cai || type == ITEM_TYPE.Yaopin) {
                    let list: number[] = [];

                    let flag = false;

                    forarr(getLimitValues(reward), v => {
                        let { moduleName, id, count, maxCount, runtime } = v;

                        if (moduleName == "cd") {
                            flag = true;
                        }

                        if (moduleName != "hero") {
                            return true;
                        }

                        let hero = runtime as IHeroRuntime;

                        let have = 0;

                        if (id == "hp") {
                            have = Math.ceil((hero.lhp - count) / maxCount);
                        } else if (id == "lhp") {
                            have = Math.ceil((hero.mhp - count) / maxCount);
                        } else if (id == "vigor") {
                            have = Math.ceil((hero.maxvigor - count) / maxCount);
                        } else if (id == "hunger") {
                            have = Math.ceil((hero.maxhunger - count) / maxCount);
                        }

                        list.push(have);

                        return true;
                    })

                    list.sort((a, b) => {
                        if (a < b) {
                            return -1;
                        }
                    });

                    let tempnum = Math.min(list.shift(), count)
                    this.maxNum = flag ? Math.min(tempnum, 1) : tempnum;
                }
            }

            btn_queding.y = ruslut ? 476 : 451;

            this.seleceNum = this.maxNum ? 1 : 0;
            this.changeSeleceNum();
        }

        changeSeleceNum() {
            let { skin, seleceNum } = this;
            let { select_comp } = skin;

            setText(select_comp.txt_num, `${seleceNum}`);

        }

        onLeftClickHandler() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { seleceNum } = this;

            if (seleceNum > 1) {
                this.seleceNum--;
                this.changeSeleceNum();
            }
        }

        onRightClickHandler() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { seleceNum, maxNum } = this;

            if (seleceNum < maxNum) {
                this.seleceNum++;
                this.changeSeleceNum();
            }
        }

        maxClickHandle() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { maxNum } = this;

            this.seleceNum = maxNum;
            this.changeSeleceNum();
        }

        onQuedingClickHandler() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            let { _data, seleceNum } = this;
            let { model } = _data;

            switch (model.type) {
                case ITEM_TYPE.Yaopin:
                    playEffectKeyByAudio("shi_yong_yao_wu");
                    break;
                default:
                    playEffectKeyByAudio();
                    break;
            }

            if (seleceNum) {
                let { guid, owner } = _data;
                foward(CM_CODE.CM_UseItem, [guid, seleceNum, owner]);
    
            }else{
                addPrompt("未选择数量");
            }

            this.close();
        }
    }
}