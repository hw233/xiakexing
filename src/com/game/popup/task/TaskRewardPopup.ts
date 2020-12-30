module rf {

    export class TaskRewardPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Task_lingjiang_popup;
        _data: ITaskRuntimeData;
        list: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "task_lingjiang_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { txt_title, txt_reward } = skin;

            setText(txt_title, "完成任务");
            setText(txt_reward, "任务奖励");

            let list = new List(skin.source, RewardDaojuItem, 68, 69, 10, 0, false);
            this.list = list;
            skin.addChild(list);
            list.setPos(47, 196);
        }

        doData() {
            super.doData();

            let { skin, _data, list } = this;
            let { txt_name } = skin;
            let { config } = _data;
            let { name, reward_client } = config.model;

            setText(txt_name, name);

            let rewards = getLimitValues(reward_client);
            list.displayList(rewards);
        }

        sleep() {
            super.sleep();

            let { _data } = this;
            let runtimes = taskModel.getNextTaskByCurTask(_data);

            let model = _data.config.model;

            if (model.npcId == undefined && model.endPhase != undefined) {
                playPhase(_data.config.model.endPhase);
            }

            if (runtimes) {
                foward(CM_CODE.CM_AcceptTask, runtimes.guid);
                taskModel.automaticTrack(runtimes);
                playPhase(runtimes.config.model.acceptPhase);
            }
        }
    }
}