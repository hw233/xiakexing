module rf {

    export class DazuoPopupComp extends BasePopup {

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

            _btn.phaseName = "popup_dazuo";

            _btn.on(MouseEventX.CLICK, this.onClickHandle, this);
        }

        doData() {
            super.doData();

            let { skin } = this;
            let { txt_title, txt_t1_2, txt_t2_2, txt_t3_2, txt_t4_2, _btn, txt_tips } = skin;

            let { min, hour, estimateMp } = skillModel.dazuoExtimate();
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

            let { statusDoing, lmp, hunger, maxhunger, vigor, maxvigor } = modelData.hero;

            if (Math.floor(lmp) == Math.floor(estimateMp)) {
                tips = "内力已满，无法打坐";
                _btn.visible = false;
            }

            _btn.select.visible = false;

            let btnName = "确定";
            let title = "打坐";

            let reslut = (statusDoing == STATUS_DOING.DAZE);

            if (!reslut) {
                if (statusDoing == STATUS_DOING.STUDY) {
                    title = `是否打断读书前去打坐`;
                } else if (statusDoing == STATUS_DOING.PRACTICE) {
                    title = `是否打断练功前去打坐`;
                } else {
                    title = `当前正在打坐中`;
                    _btn.select.visible = true;
                    btnName = "取消";
                }
            } else {
                btnName = "打坐";
            }

            setText(txt_title, title);
            setText(txt_tips, tips);
            setButtonName(_btn, btnName);

            let yujiMp = Math.floor(2 * estimateMp) < 0 ? 0 : Math.floor(estimateMp);

            setText(txt_t1_2, `${Math.floor(hunger)}/${Math.floor(maxhunger)}`);
            setText(txt_t2_2, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
            setText(txt_t3_2, `${Math.floor(lmp)}→${yujiMp}`);
            setText(txt_t4_2, `${timeStr}`);

        }

        onClickHandle() {

            let { statusDoing } = modelData.hero;

            if (statusDoing == STATUS_DOING.DAZE) {
                foward(CM_CODE.CM_Sit);
            } else {
                if (statusDoing == STATUS_DOING.STUDY) {
                    foward(CM_CODE.CM_StopReadBook);
                    foward(CM_CODE.CM_Sit);
                } else if (statusDoing == STATUS_DOING.PRACTICE) {
                    foward(CM_CODE.CM_StopSkillTrain);
                    foward(CM_CODE.CM_Sit);
                } else {
                    foward(CM_CODE.CM_StopSit);
                }
            }

            this.close();
        }
    }
}