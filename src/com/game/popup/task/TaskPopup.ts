module rf {

    export class TaskPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Task_popup;

        showEffect = false;

        btnList: List;
        taskList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "task_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source } = skin;

            let typeConfig = getTypeDefines(TYPE_CONFIG.TASK);
            let typeData = [];
            foreach(typeConfig, (v) => {
                typeData.push(v);
                return true;
            });

            let btnList = new List(source, TaskBtnItemComp, 177, 46, 6, 0, true, 2);
            skin.addChild(btnList);
            this.btnList = btnList;
            btnList.setPos(60, 40);
            // btnList.setScrollRect(360, 46, 1, 1);
            btnList.displayList(typeData);

            let taskList = new List(source, TaskItemComp, 490, 233, 0, 10, true, 1);
            skin.addChild(taskList);
            this.taskList = taskList;
            taskList.setPos(30, 100);
            taskList.setScrollRect(640, 550, 0, 1);

            btnList.on(EventT.SELECT, this.taskBtnListItemClickHandler, this)
        }

        doData() {
            super.doData();

            let { btnList } = this;
            if (btnList) {
                btnList.selectIndex = 0;
            }
        }

        taskBtnListItemClickHandler() {
            let item = this.btnList.selectItem;
            let data = item.data as ITypeType;
            let taskData = undefined;
            if (data.type == 0) {
                taskData = taskModel.getTaskByKinds(TASK_KIND_TYPE.CHENG_SHI, TASK_KIND_TYPE.XIAN_SHI);
            } else {
                taskData = taskModel.getTaskByKinds(TASK_KIND_TYPE.MEN_PAI);
            }
            
            this.taskList.displayList(taskData);
        }
    }

    export class TaskBtnItemComp extends TSourceCompment {

        skin: TSourceCompment & IPopup_Btn_task;

        _data: ITypeType;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "btn_task");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {
            setButtonName(this, this._data.name);
            this.doSelected();
        }

        doSelected() {
            let { skin, selected } = this;
            if (!skin) {
                return;
            }

            let { xuanze } = skin;
            if (selected) {
                playEffectKeyByAudio("qie_huan_xuan_xiang");
                xuanze.visible = true;
            } else {
                xuanze.visible = false;
            }
        }
    }

    export class TaskItemComp extends TSourceCompment {

        skin: TSourceCompment & IPopup_Task_item;

        _data: ITaskRuntimeData;

        list: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "task_item");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;
            let { source, txt_renwujiangli, txt_zhuizong, txt_desc, btn_track } = skin;

            setText(txt_zhuizong, "追踪");
            setText(txt_renwujiangli, "任务奖励");

            txt_desc.multiline = true;
            txt_renwujiangli.multiline = true;

            btn_track.on(MouseEventX.CLICK, this.onClickHandel, this);

            let list = new List(source, RewardDaojuItem, 68, 69, 10, 0, false);
            this.list = list;
            skin.addChild(list);
            list.setPos(15, 130);
        }

        // @EVT(GameEvent.REFRESH_TASK_JINDU)
        // refresh(event: EventX) {
        //     this.doData();
        // }

        doData() {
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

            this.changeTrackTask();

            let rewards = [];
            if (reward_client && reward_client.length) {
                rewards = getLimitValues(reward_client);
            }

            list.displayList(rewards);
        }

        onClickHandel() {
            let { _data } = this;
            if (_data.guid == modelData.task.trackGuid) {
                playEffectKeyByAudio("qu_xiao_zhui_zhong");
                foward(CM_CODE.CM_TrackTask, 0);
            } else {
                playEffectKeyByAudio("zhui_zhong_ren_wu");
                foward(CM_CODE.CM_TrackTask, _data.guid);
            }
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.TRACKGUID}`)
        changeTrackTask() {
            let { skin, _data } = this;

            if (!skin) {
                return;
            }

            let { xuanze } = skin;

            let taskGuid = modelData.task.trackGuid;

            let ruslut = (taskGuid == _data.guid);
            xuanze.visible = ruslut;
        }
    }
}