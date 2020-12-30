module rf {

    export class GongfaItem extends TSourceCompment {
        skin: TSourceCompment & IPopup_Gongfa_item;

        _data: IResskill_id;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "gongfa_item");
        }

        bindComponents() {
            this.skin = this as any;
            this.on(MouseEventX.CLICK, this.onClickHandle, this);
        }

        doData() {

            let { skin, _data } = this;
            let { txt_name, txt_shulian, txt_dengji } = skin;
            let skill = gameConfig.skill[_data.id];

            setText(txt_name, skill.name, Rare[skill.rare]);
            setText(txt_shulian, skillModel.getJingJie(_data.level));
            setText(txt_dengji, `${_data.level}级`);

        }

        onClickHandle() {
            singleton(KillerJinnegPopup).open(this._data, this);
        }

    }

    export class KillerJinnegPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Gongfa_jineng_popup;

        _data: IResskill_id;

        zhudongList: List;
        beidongList: List;
        zuheList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "gongfa_jineng_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_desc, txt_xiangqing, txt_zhudong, txt_beidong, txt_zuhe } = skin;

            txt_desc.multiline = true;

            setText(txt_xiangqing, "技能详情");
            setText(txt_zhudong, "主动技能");
            setText(txt_beidong, "被动技能");
            setText(txt_zuhe, "组合技能");

            let list = new List(source, JinengBtnItem3, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.zhudongList = list;
            list.setPos(60, 310);

            list = new List(source, JinengBtnItem3, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.beidongList = list;
            list.setPos(60, 452);

            list = new List(source, JinengBtnItem3, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.zuheList = list;
            list.setPos(60, 542);
        }

        doData() {
            super.doData();

            let { skin, _data, zhudongList, beidongList, zuheList } = this;
            let { txt_title, txt_desc } = skin;
            let { id, effect, level } = _data;

            let { name, skilldes, rare } = gameConfig.skill[id];

            setText(txt_title, `${name}(${level}级)`, Rare[rare]);
            setText(txt_desc, `${skilldes}`);

            let skillEffect = gameConfig.skilleffect[effect];
            if (skillEffect) {
                let { jinengId1, jinengId2, jinengId3 } = skillEffect;

                zhudongList.displayList(jinengId1);
                beidongList.displayList(jinengId2);
                zuheList.displayList(jinengId3);
            }
        }
    }
}