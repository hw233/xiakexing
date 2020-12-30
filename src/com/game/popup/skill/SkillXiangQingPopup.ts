module rf {

    //功法详情
    export class SkillXiangQingPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Skill_xiangqing_popup;

        _data: IResskill_id;

        zhudongList: List;
        beidongList: List;
        zuheList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "skill_xiangqing_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_desc, txt_xiangqing, txt_zhudong, txt_beidong, txt_zuhe, _btn } = skin;

            txt_desc.multiline = true;

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

            _btn.on(MouseEventX.CLICK, this.onBtnClickHandle, this);
        }

        doData() {
            super.doData();

            let { skin, _data, zhudongList, beidongList, zuheList } = this;
            let { txt_desc, txt_title, txt_status, _btn } = skin;

            let { id, effect, level, equip } = _data;
            let skill = gameConfig.skill[id];

            let btnName = "确定";
            // let status = `<font color="${Style.RED}">不可装备</font>`;

            if (skill.type[1]) {
                if (equip) {
                    btnName = "卸下";
                    // status = `<font color="${Style.GREEN}">已装备</font>`;
                } else {
                    btnName = "装备";
                    // status = `<font color="${Style.RED}">未装备</font>`;
                }
            }

            _btn.select.visible = (equip == 1);
            setButtonName(_btn, btnName);

            setText(txt_title, `${skill.name}(${level}级)`, Rare[skill.rare]);
            // setText(txt_status, status);
            setText(txt_desc, `${skill.skilldes}`);

            let skillEffect = gameConfig.skilleffect[effect];
            if (skillEffect) {
                let { jinengId1, jinengId2, jinengId3 } = skillEffect;

                zhudongList.displayList(jinengId1);
                beidongList.displayList(jinengId2);
                zuheList.displayList(jinengId3);
            }
        }

        onBtnClickHandle() {
            let { _data } = this;
            let skill = gameConfig.skill[_data.id];

            if (skill.type[1]) {

                if (_data.equip) {
                    playEffectKeyByAudio("xie_xia_ji_neng");
                    foward(CM_CODE.CM_TakeOfSkill, skill.id);
                } else {
                    playEffectKeyByAudio("zhuang_bei_ji_neng");
                    foward(CM_CODE.CM_EquipSkill, skill.id);
                }
            }

            this.close();
        }
    }
}