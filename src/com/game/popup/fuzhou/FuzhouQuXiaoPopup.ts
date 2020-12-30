module rf {

    export class FuzhouQuXiaoPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Fuzhou_quxiao_popup;

        _data: IResfuzhou_runtimes;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "fuzhou_quxiao_popup");
        }

        bindComponents() {
            super.bindComponents();;

            let { skin } = this;
            let { btn_quxiao, txt_title, txt_tips, txt_pro_1, txt_pro_2, txt_pro_3 } = skin;

            setText(txt_title, "当前正在制作中");
            setText(txt_tips, "中断操作不会影响当前已获得的收益");

            setText(txt_pro_1, "符咒:");
            setText(txt_pro_2, "预计时长:");
            setText(txt_pro_3, "持有数:");

            setButtonName(btn_quxiao, "取消制作");

            btn_quxiao.on(MouseEventX.CLICK, this.quxiaoClickHandler, this);

        }

        doData() {
            super.doData();

            let { skin, _data } = this;

            if (_data) {
                let { txt_name, txt_num, txt_time } = skin;
                let { fuzhouid, harvestTime } = _data;

                let fuzhou = gameConfig.conbine[fuzhouid];

                if (!fuzhou) {
                    return;
                }

                let { name, itemId } = fuzhou;

                setText(txt_name, name);

                let time = (harvestTime - getServerDate());

                let { hour, minute } = getTimeToS(time / 1000);
                setText(txt_time, `${hour}小时${minute}分钟`);

                setText(txt_num, `${itemModel.getItemCount(itemId)}`);
            }
        }

        quxiaoClickHandler() {
            let { _data } = this;
            foward(CM_CODE.CM_StopFuZhou, _data.guid);
            this.close();
        }
    }
}