module rf {
    export class LiangongTopComp extends TSourceCompment {

        skin: TSourceCompment & IJineng_Liangong_top;

        skillData: IResskill_id[];

        btnList: List;
        skillList: List;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "liangong_top");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            new JinengStatusDele(skin._status);

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

            typeData.pop();

            let btnList = new List(skin.source, SkillTypeBtnItem, 94, 47, 20, 0, false);
            skin.addChild(btnList);
            this.btnList = btnList;
            btnList.setPos(20, 14 + 61);
            btnList.displayList(typeData);

            let skillList = new List(skin.source, LiangongItem, 640, 60, 0, 0);
            skin.addChild(skillList);
            this.skillList = skillList;
            skillList.setPos(0, 70 + 61);
            let oh = (Main_Top_H + Main_Core_H) - (66 + 61);
            skillList.setScrollRect(640, oh - 20, 0, 1);

            btnList.on(EventT.SELECT, this.onBtnListItemClickHandler, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin, btnList } = this;

            if (!skin) {
                return;
            }

            let data = [];

            foreach(modelData.skill.id, (v, k) => {
                let config = gameConfig.skill[v.id];

                if (v.level && config.type[1]) {
                    data.push(v);
                }

                return true;
            });

            this.skillData = data;

            btnList.selectIndex = 0;
        }

        onBtnListItemClickHandler(event: EventX) {
            let { skillData, skillList, btnList } = this;

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
    }

    export class LiangongItem extends TSourceCompment {
        skin: TSourceCompment & IJineng_Liangong_item;

        _data: IResskill_id;

        icon: TSpriteUI;
        bar_dengji: TProgressBar;

        constructor() {
            super(RES_PERFIX, "ui/jineng/", "liangong_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { xuanze, _btn, _icon, bar_dengji } = this.skin;
            xuanze.visible = false;

            let icon = new TSpriteUI();
            _icon.addChild(icon);
            this.icon = icon;

            this.bar_dengji = bar_dengji as TProgressBar;

            _btn.on(MouseEventX.CLICK, this.onBtnClickHandle, this);
        }

        @EVT(GameEvent.REFRESH_SKILL_LEVEL)
        refreshLevel(event: EventX) {

            let { _data } = this;

            if (_data.id == event.data) {
                this.doData();
            }
        }

        doData() {

            let { skin, _data, icon, bar_dengji } = this;
            let { txt_name, txt_dengji, txt_jindu } = skin;
            let { liangongIcon, name, type, rare } = gameConfig.skill[_data.id];

            let [url, key] = liangongIcon;
            icon.changeSprite(key, url);

            setText(txt_name, name, Rare[rare]);

            let model = modelData.skill.id[type[1]];

            setText(txt_dengji, `等级:${_data.level}(${model.level})`, undefined, undefined, 5);
            bar_dengji.setProgressPercent(_data.level / model.level);

            // setText(txt_jindu, `${(_data.level / model.level * 100).toFixed(1)}%`);

            this.changeUI();
        }

        onBtnClickHandle() {
            singleton(SkillPopupComp).open(this._data, this);
        }

        @EVT(`${ResConst.SKILL}.${IResskillConst.TRAINSKILLID}`)
        changeSign() {
            playEffectKeyByAudio("lian_gong_fang_lian_gong");
            this.changeUI();
        }

        changeUI() {
            let { skin, _data } = this;
            let { _btn, xuanze } = skin;
            let { trainSkillId } = skillModel.runtimes;

            let result = (trainSkillId == _data.id);

            xuanze.visible = result;
            _btn.select.visible = result;

            setButtonName(_btn, result ? "停止" : "练功");
        }
    }
}