module rf {

    export interface IEventBtnData {
        name: string,
        type: string | number,
        task: ITaskRuntimeData
    }

    export class EventBtnItem extends TSourceCompment {
        skin: TSourceCompment & IPopup_Btn_event_item;

        _data: IEventBtnData;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "btn_event_item");
        }

        bindComponents() {

            this.skin = this as any;
            this.skin.btnName.source = textSource2;

            buttonModels(this);
        }

        doData() {
            let { _data, skin } = this;
            let { name, task } = _data;

            skin.phaseName = `${_data.type}`;
            __phaseTarget[skin.phaseName] = skin;

            setText(skin.btnName, name);

            addZhuizongTips(skin, task);
        }
    }

    export class EventSelectPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Event_selece_popup;

        _data: IElementRuntime;

        eventBtns: any[];

        showEffect = false;

        btnlist: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "event_selece_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_value } = skin;

            txt_value.multiline = true;

            let list = new List(source, EventBtnItem, 188, 62, 0, 20);
            skin.addChild(list);
            list.setPos(146, 300);
            list.setScrollRect(640, 460, 0, 1);
            this.btnlist = list;

            list.on(EventT.SELECT, this.onSkillListItemClickHandler, this);
            this.name = "EventSelectPopup";
        }

        doData() {
            super.doData();

            let { skin, _data, btnlist, eventBtns } = this;
            let { txt_title, txt_value, txt_level } = skin;

            let { elementId, element, name, level } = _data;

            modelData.hero.target = elementId;

            if (element.type == 1 || element.type == 2) {
                let levelstr = `<font size="20"}>等级${level}</font>`
                setText(txt_level, `${levelstr}`);
            } else {
                txt_level.text = "";
            }

            setText(txt_title, `${name}`);
            setText(txt_value, `${element.desc}`);

            btnlist.displayList(eventBtns);
        }

        onSkillListItemClickHandler(event: EventX) {
            let { _data } = this;
            let { type, task } = this.btnlist.selectItem.data as IEventBtnData;

            let elementId = this.checkTerm();
            if (!elementId) {
                this.close();
                return;
            }

            modelData.hero[`target_${type}`] = modelData.hero.target;

            facade.simpleDispatch(`ele_${type}`);

            if (!task) {
                let action = actions[type];

                let ruslut = true;

                if (action) {
                    let check = action.check(_data);
                    if (!check) {
                        ruslut = false;
                    }
                }

                if (ruslut) {
                    elementModel.elementPhase(_data ? _data.guid : undefined, elementId, type);
                }

            } else {
                // todo 任务对话
                elementModel.taskPhase(task);
            }
            
            this.close();
        }

        checkTerm() {
            let { _data } = this;
            let { id, unlocking } = _data.element;

            if (unlocking) {
                let conbine = gameConfig.conbine[unlocking];

                let ruslut = checkLimit(conbine.conbineCondition);

                if (ruslut) {
                    forarr(getLimitValues(conbine.conbineCondition), v => {
                        addPrompt(`${v.name}不足!`);
                        return true;
                    })

                    return undefined;
                }
            }

            return id;
        }

        cleanTarget() {
            modelData.hero.target = undefined;
            foreach(modelData.hero as any, (v, k: string) => {
                if (k.indexOf("target_") == 0) {
                    modelData.hero[k] = undefined;
                }
                return true;
            }, this)
        }

        sleep() {
            super.sleep();
            callLater.add(this.cleanTarget, this);
        }
    }

    export class EventDescPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Event_selece_popup;

        _data: IElementRuntime;

        showEffect = false;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "event_desc_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { txt_value } = skin;
            txt_value.multiline = true;
        }

        sleep() {
            super.sleep();
            modelData.hero.target = undefined;
            foreach(modelData.hero as any, (v, k: string) => {
                if (k.indexOf("target_") == 0) {
                    modelData.hero[k] = undefined;
                }
                return true;
            }, this)
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_title, txt_value, txt_level } = skin;

            let { elementId, element, name, level } = _data;

            modelData.hero.target = elementId;

            if (element.type == 1 || element.type == 2) {
                let levelstr = `<font size="20"}>等级${level}</font>`
                setText(txt_level, `${levelstr}`);
            } else {
                txt_level.text = "";
            }

            setText(txt_title, `${name}`);
            setText(txt_value, `${element.desc}`);
        }

    }
}