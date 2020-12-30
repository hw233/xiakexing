module rf {

    export class AddForcePopup extends BasePopup {

        skin: TSourceCompment & IPopup_Xuanzeshuliang_max_popup;

        seleceNum: number;
        maxNum: number;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "xuanzeshuliang_max_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { btn_tongyong, select_comp, txt_title } = this.skin;
            let { btn_left, btn_right, btn_max } = select_comp;

            setText(txt_title, "选择多少内力伤敌");

            setButtonName(btn_tongyong, "确定");

            btn_tongyong.on(MouseEventX.CLICK, this.onTongyongClickHandler, this);

            btn_max.on(MouseEventX.CLICK, this.maxClickHandle, this);
            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
        }

        doData() {
            super.doData();

            // let skillRuntime = modelData.skill.id[1];
            let { add, addcur } = modelData.hero;
            this.maxNum = Math.floor(add);

            this.seleceNum = addcur;

            // if (skillRuntime.level == 0) {
            //     this.seleceNum = 0;
            // }

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

            if (seleceNum > 0) {
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
            let skillRuntime = modelData.skill.id[1];
            if (skillRuntime.level) {
                foward(CM_CODE.CM_SetCurrAdd, this.seleceNum);
            } else {
                addPrompt("未学习基础内功");
            }

            this.close();
        }
    }
}