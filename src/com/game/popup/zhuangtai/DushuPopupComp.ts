module rf {

    export class BookSelectItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Book_select_item;

        _data: IItemRuntimeData;

        icon: ItemIcon;

        bar_bg: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "book_select_item");
        }

        bindComponents() {

            this.skin = this as any;

            let { _icon, bar_bg } = this.skin;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            this.bar_bg = bar_bg as TProgressBar;

        }

        doData() {

            let { _data, skin, icon, bar_bg } = this;
            let { model, extraData } = _data;
            let { txt_name, txt_desc, txt_naijiu } = skin;

            icon.data = model;

            setText(txt_name, model.name, Rare[model.rare]);
            setText(txt_desc, `${model.bookAddExp}经验/分钟`);

            let { durability, maxdurability } = extraData;
            setText(txt_naijiu, `剩余耐久:${Math.floor(durability)}`);

            bar_bg.setProgress(durability, maxdurability);

            this.doSelected();
        }

        doSelected() {
            let { skin, selected } = this;

            if (!skin) {
                return;
            }

            skin.xuanze.visible = selected;
        }
    }

    export class DushuPopupComp extends BasePopup {

        skin: TSourceCompment & IPopup_Dushu_yuji_popup;

        _data: IDuShuData;

        showEffect = false;

        bookList: List;

        bar_vigor: TProgressBar;
        bar_level: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "dushu_yuji_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { bar_vigor, bar_level, btn_right, btn_left } = skin;

            this.bar_vigor = bar_vigor as TProgressBar;
            this.bar_level = bar_level as TProgressBar;

            setButtonName(btn_left, "查看详情");

            let bookList = new List(skin.source, BookSelectItem, 424, 80, 0, 0);
            skin.addChild(bookList);
            this.bookList = bookList;
            bookList.setPos(28, 340);
            bookList.setScrollRect(424, 220, 0, 1);

            bookList.on(EventT.SELECT, this.onBookListItemClickHandle, this);

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
        }

        doData() {
            super.doData();

            let { _data, bookList } = this;
            bookList.displayList(_data.books);
            bookList.selectIndex = 0;
        }

        @EVT(GameEvent.REFRESH_SKILL_LEVEL)
        onBookListItemClickHandle() {
            let { skin, bookList, _data, bar_vigor, bar_level } = this;
            let { btn_right, txt_title, txt_t1, txt_t2, txt_t3, txt_t21, txt_t31 } = skin;
            let selectData = bookList.selectItem._data as IItemRuntimeData;
            let { level, id } = _data.skill;
            let config = gameConfig.skill[id];
            let { hour, min, estimateLevel } = itemModel.dushuExtimate(selectData);

            let timeStr = "";
            if (hour >= 1) {
                timeStr += Math.floor(hour) + "小时";
            }
            if (min >= 1) {
                timeStr += Math.floor(min) + "分钟";
            } else if (hour < 1) {
                timeStr = "<1分钟";
            }

            let result = (modelData.skill.trainBookGuid == 0);

            btn_right.select.visible = !result;
            setButtonName(btn_right, result ? "读书" : "停止");

            setText(txt_title, `${config.name}(${level}级)`, Rare[config.rare]);
            setText(txt_t1, `预计时长：${timeStr}`);
            setText(txt_t2, `精神:`);
            setText(txt_t3, `技能等级`);

            let { vigor, maxvigor } = modelData.hero;

            setText(txt_t21, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
            bar_vigor.setProgress(vigor, maxvigor);

            let model = modelData.skill.id[config.type[1]];
            let maxLevel = model ? model.level : config.maxLevel;

            let estimate = estimateLevel > maxLevel ? maxLevel : estimateLevel;
            setText(txt_t31, `${level}→${estimate}`);
            bar_level.setProgress(level, maxLevel);
            bar_level.setProgressParam(estimate, maxLevel);
        }

        onLeftClickHandler() {
            let { _data } = this;
            singleton(KillerJinnegPopup).open(_data.skill, this);
            // singleton(SkillXiangQingPopup).open(_data.skill, this);
        }

        onRightClickHandler() {
            let { bookList } = this;
            let item = bookList.selectItem;
            let { guid, model } = item._data as IItemRuntimeData;

            let skill = modelData.skill.id[model.bookAddSkillId];
            let config = gameConfig.skill[skill.id];
            let parentSkill = modelData.skill.id[config.type[1]];

            // if (book == undefined) {
            //     let result = (modelData.skill.trainBookGuid != guid);
            //     if (result) {

            //         if (modelData.hero.statusDoing == STATUS_DOING.PRACTICE) {
            //             foward(CM_CODE.CM_StopSkillTrain);
            //         } else if (modelData.hero.statusDoing == STATUS_DOING.SIT) {
            //             foward(CM_CODE.CM_StopSit);
            //         }

            //         foward(CM_CODE.CM_ReadBook, guid);
            //     } else {
            //         foward(CM_CODE.CM_StopReadBook);
            //     }
            // }

            let maxLevel = parentSkill ? parentSkill.level : config.maxLevel;

            if (skill.level < maxLevel) {
                let result = (modelData.skill.trainBookGuid != guid);
                if (result) {

                    if (modelData.hero.statusDoing == STATUS_DOING.PRACTICE) {
                        foward(CM_CODE.CM_StopSkillTrain);
                    } else if (modelData.hero.statusDoing == STATUS_DOING.SIT) {
                        foward(CM_CODE.CM_StopSit);
                    }

                    foward(CM_CODE.CM_ReadBook, guid);
                } else {
                    foward(CM_CODE.CM_StopReadBook);
                }
            } else {
                addPrompt("读书等级上限");
            }

            this.close();
        }
    }
}