module rf {

    export class MijingDazuoPopupComp extends BasePopup {

        skin: TSourceCompment & IPopup_Tongyong_yuji_popup;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "tongyong_yuji_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { txt_t1_1, txt_t2_1, txt_t3_1, txt_t4_1, _btn } = skin;

            setText(txt_t1_1, `饱食度:`);
            setText(txt_t2_1, `精神:`);
            setText(txt_t3_1, `内力上限:`);
            setText(txt_t4_1, `预计时长:`);

            setButtonName(_btn, "打坐");

            _btn.on(MouseEventX.CLICK, this.onClickHandle, this);
        }

        doData() {
            super.doData();

            let { skin } = this;
            let { txt_title, txt_t1_2, txt_t2_2, txt_t3_2, txt_t4_2, _btn, txt_tips } = skin;

            let { min, hour, estimateMp } = skillModel.mijingDazuoExtimate();
            let timeStr = "";
            if (hour >= 1) {
                timeStr += Math.floor(hour) + "小时";
            }
            if (min >= 1) {
                timeStr += Math.floor(min) + "分钟";
            } else if (hour < 1) {
                timeStr = "<1分钟";
            }

            let tips = "";

            if (hour + min == 0) {
                tips = "暂时无法打坐";
                _btn.visible = false;
            } else {
                _btn.visible = true;
            }

            let { mp, hunger, maxhunger, vigor, maxvigor } = modelData.hero

            if (Math.floor(mp) == Math.floor(estimateMp)) {
                tips = "内力已满，无法打坐!";
                _btn.visible = false;
            }

            setText(txt_title, `打坐`);
            setText(txt_tips, tips);

            setText(txt_t1_2, `${Math.floor(hunger)}/${Math.floor(maxhunger)}`);
            setText(txt_t2_2, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
            setText(txt_t3_2, `${Math.floor(mp)}→${Math.floor(estimateMp)}`);
            setText(txt_t4_2, `${timeStr}`);

        }

        onClickHandle() {
            foward(CM_CODE.CM_Sit);
            this.close();
        }
    }
}