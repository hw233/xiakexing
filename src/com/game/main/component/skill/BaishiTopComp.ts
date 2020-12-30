module rf {
    export class BaishiTopComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Shifu_top;
        skillList: List;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "shifu_top");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            // skin.setSize(skin.w, Main_Top_H + Main_Core_H);

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/default_bg.png", { x: 0, y: 500, w: 640, h: 10 });
            bg.setSize(skin.w, Main_Top_H + Main_Core_H);

            let skillList = new List(skin.source, BaishiItemComp, 640, 60, 0, 5);
            skin.addChild(skillList);
            this.skillList = skillList;
            skillList.setPos(0, 155);
            skillList.setScrollRect(640, 530, 0, 1);
            skillList.on(EventT.SELECT, this.onListItemClickHandler, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        @CodeFunc()
        static getMasterSkill(propertys: [number]) {

            let [index] = propertys;

            let list = singleton(BaishiTopComp).skillList;

            return list.childrens.datas[index];
        }

        awaken() {
            let { skin } = this;

            if (!skin) {
                return;
            }
            this.refreshPotential();
            this.refreshListData();

            modelData.hero.panelId = 2;
        }

        refreshListData() {
            let { skin } = this;
            let { txt_shifu } = skin;
            let config = gameConfig.element[actTarget.elementId];
            let skill = config.skill;
            setText(txt_shifu, `师傅：${actTarget.name}`);
            let data = [];
            foreach(skill, (v, k) => {
                data.push(v);
                return true;
            });
            this.skillList.displayList(data);

            modelData.hero.panelId = 2;
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.POTENTIAL}`)
        refreshPotential() {
            setText(this.skin.txt_qianneng, `剩余潜能:${Math.floor(modelData.hero.potential)}`);
        }

        onListItemClickHandler(event: EventX) {
            let { skillList } = this;
            let item = skillList.selectItem;
            let data = item._data as { id: string, level: number };
            singleton(XuexiJinengPopup).open(data.id, this);
        }
    }

    export class BaishiItemComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Gongfa_item;

        _data: { id: string, level: number };

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

            let { liangongIcon, name, id, rare } = gameConfig.skill[_data.id];
            let model = modelData.skill.id[id];

            let [url, key] = liangongIcon;
            icon.changeSprite(key, url);

            setText(txt_name, name, Rare[rare]);
            setText(txt_shulian, skillModel.getJingJie(model.level));
            setText(txt_dengji, `${model.level}/${_data.level}级`);
        }

        @EVT(`${ResConst.SKILL}.${IResskill_idConst.ID}`, `${ResConst.SKILL}.${IResskill_idConst.ID}.${IResskill_idConst.LEVEL}`)
        refresh(event: EventX) {
            let data = event.data;
            if (data.id == this._data.id) {
                this.doData();
            }
        }
    }
}