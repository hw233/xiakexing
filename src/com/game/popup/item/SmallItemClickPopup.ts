module rf {

    //其他道具
    export class SmallItemClickPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Deal_select_3_popup;

        _data: IItemRuntimeData;

        icon: ItemIcon;

        seleceNum: number;
        maxNum: number;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "deal_select_3_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { _icon, select_comp, btn_queding, txt_desc } = this.skin;
            let { btn_left, btn_right, btn_max } = select_comp;

            txt_desc.multiline = true;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            setButtonName(btn_queding, "使用");

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
            btn_max.on(MouseEventX.CLICK, this.maxClickHandle, this);
            btn_queding.on(MouseEventX.CLICK, this.onQuedingClickHandler, this);

        }

        doData() {
            super.doData();

            let { skin, _data, icon } = this;
            let { txt_name, txt_count, txt_flag, txt_price, txt_desc, btn_queding, select_comp } = skin;

            let { type, count, model, extraData } = _data;
            let { name, rare, flag, sell, describe, reward, bag } = model;

            icon.data = model;

            setText(txt_name, name, Rare[rare]);
            setText(txt_flag, flag);
            setText(txt_count, `${count}`);

            setText(txt_desc, describe);
            setText(txt_price, `${getLimitValues(sell)[0].maxCount}`);

            let ruslut = count > 1 && (type != ITEM_TYPE.Fuzhou) && !!bag;

            select_comp.visible = ruslut;

            btn_queding.y = ruslut ? 398 : 373;

            this.maxNum = count;

            this.seleceNum = 1;
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
            } else {
                addPrompt("未选择数量");
            }

            this.close();
        }
    }
}