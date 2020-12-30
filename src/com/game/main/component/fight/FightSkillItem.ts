module rf {

    export class FightSkillItem extends TSourceCompment {

        skin: TSourceCompment & IFightScene_Fight_skill_item;

        _data: IFightSkill;

        lr: boolean;

        constructor() {
            super(RES_PERFIX, "ui/fightScene/", "fight_skill_item");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin } = this;
            let { btnName, btn_skill } = skin;

            btnName.source = textSource2;

            btnName.mouseEnabled = false;
            btnName.mouseChildren = false;

            skin["shadow"].visible = false;

            btn_skill.on(MouseEventX.CLICK, this.clickHandle, this);

        }

        doData() {
            let { _data, skin } = this;

            if (_data) {

                let { jineng } = _data;
                let { name, id } = jineng;

                setText(skin.btnName, name);

                this.check();
            }
        }

        check() {

            let { _data, skin, lr } = this;

            if (!skin) {
                return;
            }

            let { jineng } = _data;
            let { xiaohao } = jineng;

            let result = !checkLimit(xiaohao);

            if (lr != result || lr == undefined) {

                let { term } = skin;

                term.visible = !result;
                term.mouseEnabled = !result;
                term.mouseChildren = !result;

                if (!result) {
                    skin.mouseEnabled = false;
                }

                this.lr = result;
            }
        }

        clickHandle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            playEffectKeyByAudio();

            let { _data } = this;
            let { skillid, jineng } = _data;

            foward(CM_CODE.CM_BattleAttack, [skillid, jineng.id]);
        }

        setCooling(time: number) {

            let { jineng } = this._data;

            let runtime = modelData.cd.id[`jn${jineng.id}`];

            if (runtime && runtime.nextTime > 0) {
                let jncd = runtime.nextTime - getServerDate();
                time = Math.max(time, jncd);
            }

            setButtonCooling(this.skin, time);
        }
    }
}