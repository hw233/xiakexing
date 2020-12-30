module rf {

    export class TaskAcceptPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Task_jieshou_popup;
        _data: ITaskRuntimeData;
        list: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "task_jieshou_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_title, txt_desc, txt_reward } = skin;

            setText(txt_title, "接受任务");
            setText(txt_reward, "任务奖励");

            txt_desc.multiline = true;

            let list = new List(source, RewardDaojuItem, 68, 69, 10, 0, false);
            this.list = list;
            skin.addChild(list);
            list.setPos(47, 254);
        }

        doData() {
            super.doData();

            let { skin, _data, list } = this;
            let { txt_name, txt_desc } = skin;
            let { config, active } = _data;
            let { name, reward_client, acceptdesc, completedesc } = config.model;

            setText(txt_name, name);

            let desc = "";

            if (active == TASK_FLAG.PRE_COMPLETE && completedesc) {
                desc = StringFormat.decode(completedesc);
            } else {
                desc = StringFormat.decode(acceptdesc);
            }

            setText(txt_desc, desc);

            let rewards = getLimitValues(reward_client);
            list.displayList(rewards);
        }
    }
}