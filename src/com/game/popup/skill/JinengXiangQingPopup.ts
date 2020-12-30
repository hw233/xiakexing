module rf {

    export class JinengXiangQingDefaultPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Jineng_xiangqing_default;

        _data: IJineng;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_xiangqing_default");
        }

        bindComponents() {
            super.bindComponents();

            let { txt_desc, txt_xiangqing, txt_tiaojian } = this.skin;

            txt_desc.multiline = true;

            setText(txt_xiangqing, "技能详情");
            setText(txt_tiaojian, "解锁条件");
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_desc, txt_title, txt_term, txt_mubiao } = skin;
            let { name, desc, rare, mubiao, condition } = _data;

            setText(txt_title, name, Rare[rare]);
            setText(txt_mubiao, getTypeDefines(TYPE_CONFIG.ZHUDONGSKILL)[mubiao].name);
            setText(txt_desc, desc);

            let term = "";

            forarr(getLimitValues(condition), v => {
                let { name, maxCount } = v;
                term += `需要${name}最低等级${maxCount}\\n`;
                return true;
            })

            setText(txt_term, term);

        }
    }

    export class JinengXiangQingZuhePopup extends BasePopup {

        skin: TSourceCompment & IPopup_Jineng_xiangqing_zuhe;

        _data: IJineng;

        termList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_xiangqing_zuhe");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_desc, txt_xiangqing, txt_tiaojian } = skin;

            txt_desc.multiline = true;

            setText(txt_xiangqing, "技能详情");
            setText(txt_tiaojian, "解锁条件");

            let list = new List(source, SkillEquipItem, 160, 44, 48, 2, true, 2);
            skin.addChild(list);
            this.termList = list;
            list.setPos(60, 430);
        }

        doData() {
            super.doData();

            let { skin, _data, termList } = this;
            let { txt_desc, txt_title, txt_mubiao } = skin;
            let { name, desc, rare, mubiao, condition } = _data;

            setText(txt_title, name, Rare[rare]);
            setText(txt_mubiao, getTypeDefines(TYPE_CONFIG.ZHUDONGSKILL)[mubiao].name);
            setText(txt_desc, desc);

            let list = [];

            forarr(getLimitValues(condition), v => {
                list.push(v.runtime.id);
                return true;
            })

            termList.displayList(list);
        }
    }

    export class JinengXiangQingBtnPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Jineng_xiangqing_btn;

        _data: IJineng;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_xiangqing_btn");
        }

        bindComponents() {
            super.bindComponents();

            let { txt_desc, txt_xiangqing, _btn } = this.skin;

            txt_desc.multiline = true;

            setText(txt_xiangqing, "技能详情");

            setButtonName(_btn, "确定");

            _btn.on(MouseEventX.CLICK, this.close, this);
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_desc, txt_title, txt_mubiao } = skin;
            let { name, desc, rare, mubiao } = _data;

            setText(txt_title, name, Rare[rare]);
            setText(txt_mubiao, getTypeDefines(TYPE_CONFIG.ZHUDONGSKILL)[mubiao].name);
            setText(txt_desc, desc);
        }
    }

    export class JinengXiangQingAutoPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Jineng_xiangqing_btn;

        _data: IJineng;

        callBack: Function;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "jineng_xiangqing_btn");
        }

        bindComponents() {
            super.bindComponents();

            let { txt_desc, txt_xiangqing, _btn } = this.skin;

            txt_desc.multiline = true;

            setText(txt_xiangqing, "技能详情");

            setButtonName(_btn, "放置");

            _btn.on(MouseEventX.CLICK, () => {
                if (this.callBack) {
                    this.callBack.call(this.traget);
                }

                this.close();
            }, this);
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_desc, txt_title, txt_mubiao } = skin;
            let { name, desc, rare, mubiao } = _data;

            setText(txt_title, name, Rare[rare]);
            setText(txt_mubiao, getTypeDefines(TYPE_CONFIG.ZHUDONGSKILL)[mubiao].name);
            setText(txt_desc, desc);
        }
    }
}