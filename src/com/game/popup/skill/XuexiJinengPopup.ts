module rf {

    export class XuexiJinengPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Xuexi_jineng_popup;

        _data: string;

        zhudongList: List;
        beidongList: List;
        zuheList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "xuexi_jineng_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_desc, txt_xiangqing, txt_zhudong, txt_beidong, txt_zuhe, btn_left, btn_right } = skin;

            txt_desc.multiline = true;

            btn_right.phaseName = "study";

            setButtonName(btn_left, "请教十次");

            setText(txt_xiangqing, "技能详情");
            setText(txt_zhudong, "主动技能");
            setText(txt_beidong, "被动技能");
            setText(txt_zuhe, "组合技能");

            let list = new List(source, JinengBtnItem1, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.zhudongList = list;
            list.setPos(60, 310);

            list = new List(source, JinengBtnItem1, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.beidongList = list;
            list.setPos(60, 452);

            list = new List(source, JinengBtnItem2, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.zuheList = list;
            list.setPos(60, 542);

            btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
            btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);

            this.name = "XuexiJinengPopup";
        }

        doData() {
            super.doData();
            this.changeQianli();
            this.refresh();
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.POTENTIAL}`)
        changeQianli() {
            setText(this.skin.txt_qianneng, `剩余潜能:${Math.floor(modelData.hero.potential)}`);
        }

        @EVT(GameEvent.REFRESH_SKILL_LEVEL)
        refresh() {
            let { skin, _data, zhudongList, beidongList, zuheList } = this;

            if (!skin) {
                return;
            }

            let { txt_title, txt_desc, txt_left, txt_right, btn_left, btn_right } = skin;

            let skill = gameConfig.skill[_data];
            let runtime = modelData.skill.id[skill.id];

            let reslut = (runtime.level > 0);
            let curLevel = reslut ? runtime.level : 0;

            btn_left.visible = reslut;
            txt_left.visible = reslut;

            btn_right.x = reslut ? 254 : 146;
            txt_right.x = reslut ? 254 : 146;

            setText(txt_title, `${skill.name}(${reslut ? `${curLevel}级` : `未学习`})`);
            setButtonName(btn_right, reslut ? "请教一次" : "学习");
            setText(txt_desc, `${skill.skilldes}`);

            let study = 0;

            study = skillGetPotential(skill.id, curLevel);
            setText(txt_right, `消耗潜能${study >> 0}`);

            for (let i = curLevel + 1; i < curLevel + 10; i++) {
                study += skillGetPotential(skill.id, i);
            }

            setText(txt_left, `消耗潜能${study >> 0}`);

            let skillEffect = gameConfig.skilleffect[skill.effect];
            if (skillEffect) {
                let { jinengId1, jinengId2, jinengId3 } = skillEffect;

                zhudongList.displayList(jinengId1);
                beidongList.displayList(jinengId2);
                zuheList.displayList(jinengId3);
            }
        }

        onLeftClickHandler() {
            playEffectKeyByAudio("xuexi");
            let { _data } = this;
            let model = modelData.skill.id[_data];
            if (model.level == 0) {
                addPrompt("技能还未学习!");
                return;
            }
            let skill = gameConfig.skill[_data];
            let runtime = modelData.skill.id[skill.id];
            let heroModel = modelData.hero.potential;
            let curLevel = runtime.level;

            let study = 0;
            for (let i = curLevel + 1; i < curLevel + 10; i++) {
                study += skillGetPotential(skill.id, i);
            }
            if (study > heroModel) {
                addPrompt("潜能点不足");
                return;
            }
            let cm_code = CM_CODE.CM_SkillLearn;
            if (curLevel) {
                cm_code = CM_CODE.CM_SkillUpgrade;
            }
            foward(cm_code, [skill.id, 10, actTarget.guid]);
        }

        onRightClickHandler() {
            playEffectKeyByAudio("xuexi");

            let { _data } = this;
            let skill = gameConfig.skill[_data];
            let runtime = modelData.skill.id[skill.id];
            let heroModel = modelData.hero.potential;
            let curLevel = runtime.level;
            let parentSkillId = skill.type[1];
            if (parentSkillId) {
                let parentRuntime = modelData.skill.id[parentSkillId];
                if (parentRuntime.level == 0) {
                    addPrompt("基础技能未学习!");
                    return;
                }
            }

            let study = skillGetPotential(skill.id, curLevel);
            if (study > heroModel) {
                addPrompt("潜能点不足");
                return;
            }
            let cm_code = CM_CODE.CM_SkillLearn;
            if (curLevel) {
                cm_code = CM_CODE.CM_SkillUpgrade;
            }

            foward(cm_code, [skill.id, 1, actTarget.guid]);
        }
    }

    //主动被动
    export class JinengBtnItem1 extends TSourceCompment {
        skin: TSourceCompment & IPopup_Jineng_btn_item;

        _data: number;

        jineng: IJineng;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);

            this.on(MouseEventX.CLICK, this.clickHandele, this);
        }

        doData() {
            let { skin, _data, jineng } = this;

            this.jineng = jineng = gameConfig.jineng[_data];
            let { name, condition, rare } = jineng;

            let color = Style.GRAY;
            if (!checkLimit(condition)) {
                color = Rare[rare];
            }

            setText(skin.btnName, `${name}`, color);
        }

        clickHandele() {
            playEffectKeyByAudio();

            let { jineng } = this;
            singleton(JinengXiangQingDefaultPopup).open(jineng);
        }
    }

    //组合
    export class JinengBtnItem2 extends TSourceCompment {
        skin: TSourceCompment & IPopup_Jineng_btn_item;

        _data: number;

        jineng: IJineng;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);

            this.on(MouseEventX.CLICK, this.clickHandele, this);
        }

        doData() {
            let { skin, _data, jineng } = this;

            this.jineng = jineng = gameConfig.jineng[_data];
            let { name, condition, rare } = jineng;

            let color = Style.GRAY;
            if (!checkLimit(condition)) {
                color = Rare[rare];
            }

            setText(skin.btnName, `${name}`, color);
        }

        clickHandele() {
            playEffectKeyByAudio();

            let { jineng } = this;
            singleton(JinengXiangQingZuhePopup).open(jineng);
        }
    }

    //敌人专用
    export class JinengBtnItem3 extends TSourceCompment {
        skin: TSourceCompment & IPopup_Jineng_btn_item;

        _data: number;

        jineng: IJineng;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);

            this.on(MouseEventX.CLICK, this.clickHandele, this);
        }

        doData() {
            let { skin, _data, jineng } = this;

            this.jineng = jineng = gameConfig.jineng[_data];
            let { name, rare } = jineng;
            setText(skin.btnName, `${name}`, Rare[rare]);
        }

        clickHandele() {
            playEffectKeyByAudio();

            let { jineng } = this;
            singleton(JinengXiangQingBtnPopup).open(jineng);
        }
    }

    //组合条件专用
    export class SkillEquipItem extends TSourceCompment {
        skin: TSourceCompment & IPopup_Jineng_btn_item;

        _data: number;

        skill: ISkill;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {
            let { skin, _data } = this;


            let skill = modelData.skill.id[_data] as ISkillIDRuntime;

            if (skill) {

                let { model, equip } = skill;

                let color = Style.GRAY;
                if (equip) {
                    color = Rare[model.rare];
                }

                setText(skin.btnName, `${model.name}`, color);
            }
        }
    }
}