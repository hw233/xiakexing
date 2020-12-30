module rf {

    export class XuanshangTopComp extends BasePopup {

        skin: TSourceCompment & IPopup_Xuanshang_top;
        taskList: List;
        rewardList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "xuanshang_top");
        }

        bindComponents() {
            super.bindComponents();
            this.skin = this as any;

            let { skin } = this;
            let { btn_fangqi, btn_shuaxin, btn_wancheng, btn_jiequ, txt_name, txt_desc, txt_jiangli } = skin;

            txt_jiangli.multiline = true;

            setText(txt_name, "悬赏令");
            setText(txt_jiangli, "奖励");

            setButtonName(btn_jiequ, "接取");
            setButtonName(btn_wancheng, "完成");
            setButtonName(btn_fangqi, "放弃");
            setButtonName(btn_shuaxin, "刷新");

            btn_jiequ.on(MouseEventX.CLICK, this.onJiequClickHandler, this);
            btn_fangqi.on(MouseEventX.CLICK, this.onFangqiClickHandler, this);
            btn_shuaxin.on(MouseEventX.CLICK, this.onShuaxinClickHandler, this);

            let list = new List(skin.source, XuanshangItemComp, 150, 150, 15, 15, true, 3);
            this.taskList = list;
            skin.addChild(list);
            list.setPos(35, 117);
            list.setScrollRect(480, 320);

            list.on(EventT.SELECT, this.onListItemClickHandler, this);
            // this.onListItemClickHandler();
        }

        show() {
            this.refreshUI();
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.RUNTIMES}`)
        refreshUI() {
            let { taskList } = this;
            let taskRuntimes = taskModel.getXuanshangTask();
            taskList.displayList(taskRuntimes);
            taskList.selectIndex = 0;
        }

        onJiequClickHandler() {
            let { taskList } = this;
            let item = taskList.selectItem;
            let data = item._data as ITaskRuntimeData;

            if (data) {
                foward(CM_CODE.CM_AcceptTask, data.guid);
                taskModel.automaticTrack(data);
            } else {
                console.error("当前悬赏任务不存在", data);
            }
        }

        onFangqiClickHandler() {
            let { taskList } = this;
            let item = taskList.selectItem;
            let data = item._data as ITaskRuntimeData;

            if (data) {
                foward(CM_CODE.CM_GiveUpTask, data.guid);
            } else {
                console.error("当前悬赏任务不存在", data);
            }
        }

        onShuaxinClickHandler() {
            let rewardConfig = gameConfig.reward[11].indexs[0];
            let check = checkLimit(rewardConfig.condition);
            if (check == undefined) {
                foward(CM_CODE.CM_FreshXuanShangTask);
            } else {
                addPrompt("道具不足");
            }
        }

        @EVT(GameEvent.REFRESH_TASK_ACTIVE)
        onListItemClickHandler() {
            let { taskList, skin } = this;
            let { btn_fangqi, btn_wancheng, btn_jiequ, txt_desc } = skin;
            let item = taskList.selectItem;
            let data = item._data as ITaskRuntimeData;
            setText(txt_desc, data.config.model.describe);

            btn_jiequ.visible = data.active == TASK_FLAG.Active;
            btn_wancheng.visible = data.active == TASK_FLAG.PRE_COMPLETE;
            btn_fangqi.visible = data.active == TASK_FLAG.ACCEPT;
        }
    }

    export class XuanshangItemComp extends TSourceCompment {

        skin: TSourceCompment & IPopup_Xuanshang_item;
        _data: ITaskRuntimeData;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "xuanshang_item");
        }

        bindComponents() {
            super.bindComponents();

            this.skin = this as any;
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_name, txt_jiequ, txt_nandu, jiequ, wancheng } = skin;
            let { config, active } = _data;
            let { name, xuanshangnandu } = config.model;
            let type = getTypeDefines(TYPE_CONFIG.XUAN_SHANG_NAN_DU);

            jiequ.visible = false;
            wancheng.visible = false;
            setText(txt_jiequ, "未领取");

            if (active == TASK_FLAG.ACCEPT) {
                jiequ.visible = true;
                setText(txt_jiequ, "已领取");
            }

            if (active == TASK_FLAG.PRE_COMPLETE) {
                jiequ.visible = true;
                setText(txt_jiequ, "已领取");
            }

            if (active == TASK_FLAG.COMPLETE) {
                jiequ.visible = false;
                wancheng.visible = true;
                setText(txt_jiequ, "已领取");
            }

            setText(txt_name, name);
            setText(txt_nandu, type[xuanshangnandu].name);

            this.doSelected();
        }

        @EVT(GameEvent.REFRESH_TASK_ACTIVE)
        changeUI() {
            this.doData();
        }

        doSelected() {

            let { skin, _data } = this;
            if (skin == undefined) {
                return;
            }
            let { txt_name, txt_jiequ, txt_nandu, jiequ, wancheng } = skin;

            if (this.selected) {
                jiequ.visible = true;
            } else {
                jiequ.visible = false;
            }
        }
    }
}