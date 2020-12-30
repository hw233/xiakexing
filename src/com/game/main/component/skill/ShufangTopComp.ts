module rf {

    export interface IDuShuData {
        books: IItemRuntimeData[],
        skill: IResskill_id,
    }

    export class ShufangTopComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Dushu_top;

        dushuData: { [key: string]: IDuShuData };

        skillList: List;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "dushu_top");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            new JinengStatusDele(skin._status);

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/default_bg.png", { x: 0, y: 500, w: 640, h: 10 });
            bg.setSize(skin.w, Main_Top_H + Main_Core_H);

            let skillList = new List(skin.source, ShufangItemComp, 640, 70, 0, 5);
            skin.addChild(skillList);
            this.skillList = skillList;
            skillList.setPos(0, 80);
            let oh = (Main_Top_H + Main_Core_H) - 80;
            skillList.setScrollRect(640, oh - 20, 0, 1);

            skillList.on(EventT.SELECT, this.onSkillListItemClickHandler, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;

            if (!skin) {
                return;
            }

            this.dushuData = {};
            this.refreshDisplayList();
        }

        refreshDisplayList() {
            let { dushuData, skillList } = this;
            let items = itemModel.getLocationItems(401);

            forarr(items, v => {
                let { model } = v;
                let { bookAddSkillId } = model;

                if (!dushuData[bookAddSkillId]) {
                    let skill = modelData.skill.id[bookAddSkillId];
                    dushuData[bookAddSkillId] = { books: [], skill };
                }

                dushuData[bookAddSkillId].books.push(v);

                return true;
            });

            let list: IDuShuData[] = [];

            foreach(this.dushuData, v => {
                list.push(v);
                return true;
            });

            skillList.displayList(list);
        }

        onSkillListItemClickHandler() {
            let { skillList } = this;
            let item = skillList.selectItem;
            let { skill } = item._data as IDuShuData;

            if (!skill) {
                addPrompt(`基础技能尚未学习!`);
                return;
            }

            singleton(DushuPopupComp).open(item._data, this);
        }

    }

    export class ShufangItemComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Dushu_item;

        _data: IDuShuData;

        icon: TSpriteUI;

        bar_dengji: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "dushu_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { xuanze, _icon, bar_dengji } = this.skin;
            xuanze.visible = false;

            let icon = new TSpriteUI();
            _icon.addChild(icon);
            this.icon = icon;

            this.bar_dengji = bar_dengji as TProgressBar;
        }

        @EVT(GameEvent.REFRESH_SKILL_LEVEL)
        refreshLevel(event: EventX) {

            let { _data } = this;

            if (_data.skill.id == event.data) {
                this.doData();
            }
        }

        doData() {
            let { _data, skin, icon, bar_dengji } = this;
            let { skill } = _data;
            let { readIcon, name, maxLevel, type, rare } = gameConfig.skill[skill.id];

            let [url, key] = readIcon;
            icon.changeSprite(key, url);

            setText(skin.txt_name, name);

            let model = modelData.skill.id[type[1]];

            let level = model ? model.level : maxLevel;
            setText(skin.txt_dengji, `等级:${Math.floor(skill.level)}(${level})`, Rare[rare]);
            bar_dengji.setProgress(skill.level, level);

            // setText(bar_dengji.txt_value, (level > 0) ? `${(skill.level / level * 100).toFixed(1)}%` : "");

            this.changeUI();
        }

        @EVT(`${ResConst.SKILL}.${IResskillConst.TRAINBOOKGUID}`)
        changeSign(event?: EventX) {
            playEffectKeyByAudio("mao_lu_kan_shu");
            this.changeUI();
        }

        changeUI() {
            let { skin, _data } = this;
            let { _btn, xuanze } = skin;
            let { trainBookGuid } = skillModel.runtimes;

            let result = true;

            forarr(_data.books, v => {

                if (trainBookGuid == v.guid) {
                    result = false;
                }

                return result;
            });

            xuanze.visible = !result;
            _btn.select.visible = !result;

            setButtonName(_btn, !result ? "停止" : "读书");
        }
    }
}