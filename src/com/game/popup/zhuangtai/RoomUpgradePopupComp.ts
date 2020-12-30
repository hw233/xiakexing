module rf {

    export class TermItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Term_item;
        _data: IConditionRuntime;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "term_item");
        }

        bindComponents() {

            this.skin = this as any;

            // let { txt_value } = this.skin;
            // txt_value.html = true;

        }

        doData() {
            let { _data, skin } = this;
            let { txt_value } = skin;

            let { name, maxCount } = _data;

            setText(txt_value, `${name} x${maxCount}`);
        }

    }

    export class RoomUpgradePopupComp extends BasePopup {

        skin: TSourceCompment & IPopup_Room_upgrade_popup;

        _data: IRoomRuntime;

        termList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "room_upgrade_popup");
        }

        bindComponents() {
            super.bindComponents();;

            let { skin } = this;
            let { source, btn_upgrade, txt_pro_1, txt_pro_2, txt_time } = skin;

            setText(txt_pro_1, "预计时长：");
            setText(txt_pro_2, "消耗：");

            let list = new List(source, TermItem, 210, 34, 0, 0);
            skin.addChild(list);
            this.termList = list;
            list.setPos(233, 229);

            btn_upgrade.phaseName = "funcUpgrade";

            btn_upgrade.on(MouseEventX.CLICK, this.upgradeClickHandler, this);
            this.name = "RoomUpgradePopupComp";
        }

        doData() {
            super.doData();

            let { skin, termList, _data } = this;

            if (!_data) {
                return;
            }

            let { btn_upgrade, txt_title, txt_value_1, txt_value_2, txt_time } = skin;
            let { roomId } = _data;
            let { level, levelMod, model } = roomModel.getRoomInfo(roomId);

            // if (!model) {
            //     return;
            // }

            let reslut = (level == 1);

            setText(txt_title, reslut ? "修理" : "升级");
            setButtonName(btn_upgrade, reslut ? "修理" : "升级");

            let { requirement, time, desc } = levelMod;

            let [value1, value2] = desc;

            setText(txt_value_1, value1 || "");
            setText(txt_value_2, value2 || "");

            let { hour, minute } = getTimeToS(time);
            setText(txt_time, `${hour}时${minute}分`);

            let list = getLimitValues(requirement);

            if (list && list.length) {
                termList.displayList(list);
            }
        }

        upgradeClickHandler() {
            playEffectKeyByAudio("fang_jian_sheng_ji");

            let { _data } = this;
            let { roomId } = _data;
            let { levelMod } = roomModel.getRoomInfo(roomId);
            let { requirement } = levelMod;

            if (!checkLimit(requirement)) {
                foward(CM_CODE.CM_RoomUpgrade, roomId);
                this.close();
            } else {

                let queshao = "缺少材料 ";

                forarr(getLimitValues(requirement), v => {
                    let { name, count, maxCount } = v;
                    let tempValue = (maxCount - count);

                    if (tempValue > 0) {
                        queshao += `${name} x${tempValue} `;
                    }

                    return true;
                });

                addPrompt(queshao);
                addMessage(queshao);
            }
        }
    }
}