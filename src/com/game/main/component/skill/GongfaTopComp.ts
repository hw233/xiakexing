module rf {

    export class GongfaTopComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Gongfa_top;

        skillData: IResskill_id[];

        btnList: List;
        skillList: List;

        isMijing: boolean;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "gongfa_top");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/default_bg.png", { x: 0, y: 500, w: 640, h: 10 });
            bg.setSize(skin.w, Main_Top_H + Main_Core_H);

            let typeData = [];
            let config = getTypeDefines(TYPE_CONFIG.SKILL);

            foreach(config, v => {
                typeData.push(v);
                return true;
            });

            let btnList = new List(skin.source, SkillTypeBtnItem, 94, 47, 0, 0, false);
            skin.addChild(btnList);
            this.btnList = btnList;
            btnList.setPos(17, 14);
            btnList.displayList(typeData);

            let skillList = new List(skin.source, GongfaItemComp, 640, 60, 0, 5);
            skin.addChild(skillList);
            this.skillList = skillList;
            skillList.setPos(0, 70);
            skillList.setScrollRect(640, 510, 0, 1);

            btnList.on(EventT.SELECT, this.onBtnListItemClickHandler, this);
            skillList.on(EventT.SELECT, this.onSkillListItemClickHandler, this)

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin, btnList, skillList, isMijing } = this;

            if (!skin) {
                return;
            }

            skillList.scroll.rect = { w: 640, h: isMijing ? 260 : 510, x: 0, y: 0 };
            skillList.simpleDispatch(EventT.RESIZE);

            let data = [];

            foreach(modelData.skill.id, (v, k) => {
                if (v.level) {
                    data.push(v);
                }
                return true;
            });

            this.skillData = data;

            btnList.selectIndex = 0;

        }

        onBtnListItemClickHandler(event: EventX) {
            let { skillData, skillList, btnList, isMijing } = this;

            let index = btnList.selectIndex;

            let data = [];

            if (index) {

                let config = gameConfig.skill;

                forarr(skillData, v => {

                    let [type] = config[v.id].type;

                    if (type == index) {
                        data.push(v);
                    }
                    return true;
                });

            } else {
                data = skillData;
            }

            skillList.displayList(data);
        }

        onSkillListItemClickHandler(event: EventX) {
            let { skillList } = this;
            let item = skillList.selectItem;
            singleton(SkillXiangQingPopup).open(item._data, this);
        }

        sleep() {
            this.isMijing = false;
        }
    }

    export class GongfaItemComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Gongfa_item;

        _data: ISkillIDRuntime;

        icon: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "gongfa_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { select, _icon } = this.skin;
            select.visible = false;

            let icon = new TSpriteUI();
            _icon.addChild(icon);
            this.icon = icon;
        }

        doData() {
            let { skin, _data, icon } = this;
            let { txt_name, txt_shulian, txt_dengji } = skin;
            let { model, level } = _data;
            let { liangongIcon, name, rare } = model;

            let [url, key] = liangongIcon;
            icon.changeSprite(key, url);

            setText(txt_name, name, Rare[rare]);
            setText(txt_shulian, skillModel.getJingJie(level));
            setText(txt_dengji, `${level}级`);

            this.refresh();
        }

        @EVT(`${ResConst.SKILL}.${IResskill_idConst.ID}.${IResskill_idConst.EQUIP}`)
        refresh() {
            let { equip } = this._data;
            this.skin.select.visible = (equip == 1);
        }
    }
}