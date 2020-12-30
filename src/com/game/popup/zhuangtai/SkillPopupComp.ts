module rf {

    export class SkillPopupComp extends BasePopup {

        skin: TSourceCompment & IPopup_Liangong_yuji_popup;

        _data: IResskill_id;

        bar_vigor: TProgressBar;
        bar_level: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "liangong_yuji_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { bar_vigor, bar_level, btn_right, btn_left } = skin;

            this.bar_vigor = bar_vigor as TProgressBar;
            this.bar_level = bar_level as TProgressBar;

            setButtonName(btn_left, "查看详情");

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
        }

        doData() {
            super.doData();

            let { skin, _data, bar_vigor, bar_level } = this;
            let { id, level } = _data;
            let { btn_right, txt_title, txt_t1, txt_t2, txt_t3, txt_t21, txt_t31 } = skin;

            let skill = gameConfig.skill[id];
            let { hour, min, extimateLevel } = skillModel.liangongExtimate(skill.id);

            let timeStr = "";
            if (hour >= 1) {
                timeStr += Math.floor(hour) + "小时";
            }
            if (min >= 1) {
                timeStr += Math.floor(min) + "分钟";
            } else if (hour < 1) {
                timeStr = "<1分钟";
            }

            let result = (modelData.skill.trainSkillId != id);

            btn_right.select.visible = !result;
            setButtonName(btn_right, result ? "练功" : "停止");

            setText(txt_title, `${skill.name}(${level}级)`, Rare[skill.rare]);
            setText(txt_t1, `预计时长：${timeStr}`);
            setText(txt_t2, `精神`);
            setText(txt_t3, `技能等级`);

            let { vigor, maxvigor } = modelData.hero;

            setText(txt_t21, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
            bar_vigor.setProgress(vigor, maxvigor);

            setText(txt_t31, `${level}→${extimateLevel}`);
            bar_level.setProgress(level, skill.maxLevel);
            bar_level.setProgressParam(extimateLevel, skill.maxLevel);
        }

        onLeftClickHandler() {
            singleton(KillerJinnegPopup).open(this._data, this);
            // singleton(JinengXiangqingPopup).open(this._data, this);
        }

        onRightClickHandler() {
            let { _data } = this;
            let { id } = _data;
            let config = gameConfig.skill[id];
            let parentSkill = modelData.skill.id[config.type[1]];

            if (_data.level < parentSkill.level) {
                let result = (modelData.skill.trainSkillId != id);
                if (result) {
                    foward(CM_CODE.CM_SkillTrain, id);
                } else {
                    foward(CM_CODE.CM_StopSkillTrain, id);
                }
            } else {
                addPrompt("技能等级上限");
            }

            this.close();
        }
    }
}