module rf {

    export class JinengAutoPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Jineng_auto_popup;

        btnList: List;
        currentList: List;
        autoList: List;

        tempAutos: number[];

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_auto_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { txt_title, txt_current, txt_auto, txt_desc } = skin;

            txt_desc.multiline = true;

            setText(txt_title, "技能释放优先级");
            setText(txt_current, "当前装备技能");
            setText(txt_auto, "自动释放优先级");
            setText(txt_desc, "点击左侧当前装备技能可以放置到右侧自动释放序列里面，释放技能的顺序是由上至下依次释放，全部释放完成后再重新循环序列");

            // let typeData = [];
            // let config = getTypeDefines(TYPE_CONFIG.ATUOSKILL);

            // foreach(config, v => {
            //     typeData.push(v);
            //     return true;
            // });

            // let btnList = new List(skin.source, JinengAutoBtnItem, 121, 38, 5, 0, false);
            // skin.addChild(btnList);
            // this.btnList = btnList;
            // btnList.setPos(55, 100);
            // btnList.on(EventT.SELECT, this.onBtnListItemClickHandle, this);

            // btnList.displayList(typeData);

            let currentList = new List(skin.source, JinengSelectCurrentItem, 160, 44, 0, 10, true, 1);
            skin.addChild(currentList);
            this.currentList = currentList;
            currentList.setPos(50, 160);
            currentList.on(EventT.SELECT, this.onCurrentListItemClickHandle, this);

            let autoList = new List(skin.source, JinengSelectAutoItem, 160, 44, 0, 10, true, 1);
            skin.addChild(autoList);
            this.autoList = autoList;
            autoList.setPos(270, 160);
            autoList.on(EventT.SELECT, this.onAotoListItemClickHandle, this);

        }

        doData() {
            super.doData();

            let { autoList, currentList } = this;

            let list = [];

            forarr(skillModel.getCurrentJineng(), v => {
                list.push(v.jineng.id);
                return true;
            })

            if (list.length < 6) {

                let times = list.length;

                for (let i = 6; i > times; i--) {
                    list.push(0);
                }
            }

            currentList.displayList(list);
            // btnList.selectIndex = 0;

            this.tempAutos = [];

            let { runtimes, nowId } = modelData.automaticSkill;
            let runtime = runtimes[nowId];

            for (let i = 1; i <= 6; i++) {
                let element = runtime[`jineng${i}`];
                this.tempAutos.push(element);
            }

            autoList.displayList(this.tempAutos);
        }

        // onBtnListItemClickHandle(event: EventX) {

        //     let { btnList, autoList } = this;
        //     let item = btnList.selectItem;
        //     let _data = item._data as ITypeType;

        //     if (_data) {
        //         let list = [];

        //         let { runtimes, nowId } = modelData.automaticSkill;
        //         let runtime = runtimes[nowId];

        //         for (let i = 1; i <= 6; i++) {
        //             let element = runtime[`jineng${i}`];
        //             list.push(element);
        //         }

        //         if (nowId != _data.type) {
        //             foward(CM_CODE.CM_SwitchAutoSkill, _data.type);
        //         }

        //         this.tempAutos = list;

        //         autoList.displayList(list);
        //     }
        // }

        onCurrentListItemClickHandle(event: EventX) {
            let list = event.currentTarget as List;
            let item = list.selectItem;
            let _data = item._data as number;

            if (_data && _data != 0) {

                let auto = singleton(JinengXiangQingAutoPopup);
                auto.callBack = () => {
                    let { autoList } = this;

                    if (this.tempAutos.indexOf(_data) != -1) {
                        addPrompt("该技能已装备!");
                        return;
                    }

                    forarr(this.tempAutos, (v, k) => {

                        if (!v) {
                            let item = autoList.childrens.datas[k] as JinengSelectAutoItem;

                            if (item) {
                                item.data = this.tempAutos[k] = _data;
                            }
                            return false;
                        }

                        return true;
                    });
                }

                auto.open(gameConfig.jineng[_data], this);
            }
        }

        onAotoListItemClickHandle(event: EventX) {
            let list = event.currentTarget as List;
            let item = list.selectItem;
            let _data = item._data as number;

            if (_data && _data != 0) {
                item.data = this.tempAutos[list.selectIndex] = 0;
            }
        }

        sleep() {
            super.sleep()

            let { tempAutos } = this;

            let runtime = {};

            forarr(tempAutos, (v, k) => {
                runtime[`jineng${k + 1}`] = v;
                return true;
            });

            foward(CM_CODE.CM_ChangeAutoSkill, [1, runtime]);
        }
    }

    // export class JinengAutoBtnItem extends TSourceCompment {

    //     skin: TSourceCompment & IPopup_Auto_jieng_item;
    //     _data: ITypeType;

    //     constructor() {
    //         super(RES_PERFIX, "ui/popup/", "auto_jieng_item");
    //     }

    //     bindComponents() {
    //         this.skin = this as any;
    //         buttonModels(this);
    //     }

    //     doData() {
    //         let { skin, _data } = this;

    //         setText(skin.btnName, _data.name);

    //         this.doSelected();
    //     }

    //     doSelected() {
    //         let { skin, selected } = this;

    //         if (!skin) {
    //             return;
    //         }

    //         let { select } = skin;
    //         if (selected) {
    //             playEffectKeyByAudio("qie_huan_xuan_xiang");
    //             select.visible = !selected;
    //         } else {
    //             select.visible = !selected;
    //         }
    //     }
    // }

    export class JinengSelectCurrentItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Jineng_btn_item;

        _data: string;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);
        }

        doData() {
            let { skin, _data } = this;

            let config = gameConfig.jineng[_data];
            if (config) {
                setText(skin.btnName, config.name, Rare[config.rare]);
            } else {
                setText(skin.btnName, "无");
            }
        }

    }

    export class JinengSelectAutoItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Jineng_btn_item;

        _data: string;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);
        }

        doData() {
            let { skin, _data } = this;

            let config = gameConfig.jineng[_data];
            if (config) {
                setText(skin.btnName, config.name, Rare[config.rare]);
            } else {
                setText(skin.btnName, "无");
            }

        }
    }

}