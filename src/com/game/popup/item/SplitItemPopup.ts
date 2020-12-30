module rf {

    export class SplitItemPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Xuanzeshuliang_max_popup;

        _data: IItemRuntimeData;

        seleceNum: number;
        maxNum: number = 5;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "xuanzeshuliang_max_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { btn_tongyong, select_comp, txt_title } = this.skin;
            let { btn_left, btn_right, btn_max } = select_comp;

            setText(txt_title, "拆分");

            setButtonName(btn_tongyong, "确定");

            btn_tongyong.on(MouseEventX.CLICK, this.onTongyongClickHandler, this);
            btn_max.on(MouseEventX.CLICK, this.maxClickHandle, this);
            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
        }

        doData() {
            super.doData();

            let { _data } = this;

            let { count } = _data;

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

            this.seleceNum = this.maxNum;
            this.changeSeleceNum();
        }

        onTongyongClickHandler() {
            let { _data, seleceNum } = this;

            let location = undefined;

            foreach(modelData.item.bag, (v: IItemBagData, k) => {
                let { beginSlot, endSlot, ceil } = v;
                let end = Math.min(beginSlot + ceil, endSlot);

                if ((_data.slot >= beginSlot && _data.slot < end)) {
                    location = k;
                }

                return !location;
            });

            foward(CM_CODE.CM_ItemSplit, [_data.guid, seleceNum, location || 1]);

            this.close();
        }
    }
}