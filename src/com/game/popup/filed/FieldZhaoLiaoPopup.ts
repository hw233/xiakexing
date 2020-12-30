module rf {

    export class FieldZhaoLiaoPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Crop_zhaoliao_popup;

        _data: IResfield_runtimes;

        termList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "crop_zhaoliao_popup");
        }

        bindComponents() {
            super.bindComponents();;

            let { skin } = this;
            let { source, btn_quxiao, btn_zhaoliao, txt_title, txt_tips_1, txt_tips_2, txt_pro_1, txt_pro_2, txt_pro_3, txt_pro_4 } = skin;

            setText(txt_title, "照料");
            setText(txt_tips_1, "消耗精神和道具加快种植进度");
            setText(txt_tips_2, "取消种植会消耗种子");

            setText(txt_pro_1, "预计时长:");
            setText(txt_pro_2, "基础产量:");
            setText(txt_pro_3, "减免时间:");
            setText(txt_pro_4, "照料消耗:");

            setButtonName(btn_quxiao, "取消种植");
            setButtonName(btn_zhaoliao, "照料");

            let list = new List(source, TermItem, 210, 34, 0, 0);
            skin.addChild(list);
            this.termList = list;
            list.setPos(216, 331);

            btn_quxiao.on(MouseEventX.CLICK, this.quxiaoClickHandler, this);
            btn_zhaoliao.on(MouseEventX.CLICK, this.zhaoliaoClickHandler, this);
        }

        doData() {
            super.doData();

            let { skin, termList, _data } = this;

            if (!_data) {
                return;
            }

            let { txt_name, txt_num, txt_time_1, txt_time_2, txt_tips_3 } = skin;
            let { seedid, harvestTime } = _data;

            let field = gameConfig.field[seedid];

            if (!field) {
                return;
            }

            let { name, careAddMaturity, maturePerSecond, careCostVigor, careCostItem, reward } = field;

            setText(txt_name, name);
            setText(txt_num, `${getLimitValues(reward)[0].maxCount}`);

            let time = (harvestTime - getServerDate()) / 1000;

            let { hour: h1, minute: m1 } = getTimeToS(time);
            setText(txt_time_1, `${h1}小时${m1}分钟`);

            let { hour: h2, minute: m2 } = getTimeToS(time - (careAddMaturity / maturePerSecond));
            setText(txt_time_2, `${h2}小时${m2}分钟`);

            let list = getLimitValues(careCostItem);
            termList.displayList(list);

            if (careCostVigor) {
                setText(txt_tips_3, `-${getLimitValues(careCostVigor)[0].maxCount} 精神`);
            }
        }

        quxiaoClickHandler() {
            let { _data } = this;
            foward(CM_CODE.CM_StopPlant, _data.guid);
            this.close();
        }

        zhaoliaoClickHandler() {
            let { _data } = this;
            let { nextCareTime } = _data;
            let rulsut = (getServerDate() >= nextCareTime);

            if (rulsut) {
                foward(CM_CODE.CM_Care, _data.guid);
            } else {
                addPrompt("当前cd中");
            }
            this.close();
        }
    }
}