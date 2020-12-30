module rf {

    export class MijingBtnItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_btn_item;

        _data: IMijing;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_btn_item");
        }

        bindComponents() {

            this.skin = this as any;

            let { btn_mijing } = this.skin;

            btn_mijing.on(MouseEventX.CLICK, this.mijingclickHandle, this);
        }

        doData() {
            let { _data, skin } = this;
            if (_data) {
                let { txt_name, txt_term } = skin.btn_mijing;
                let { name, player, condition } = _data;

                let level = getLimitValues(condition)[0].maxCount;

                setText(txt_name, `${name}${player ? `(${player}人)` : ""}`);
                setText(txt_term, `进入条件：角色等级${level}`);
            }
        }

        mijingclickHandle() {
            let { _data } = this;
            let { id, condition, player } = _data;
            let status = modelData.hero.statusDoing;
            if (status == STATUS_DOING.DAZE) {
                if (!checkLimit(condition)) {
                    playEffectKeyByAudio("jin_ru_mi_jing_di_tu");

                    foward(CM_CODE.CM_MapJoin, id);

                    if (player) {
                        let match = singleton(MatchComp);
                        match.data = _data;
                        tipContainer.addChild(match);
                    }

                } else {
                    playEffectKeyByAudio("warning");
                    addPrompt("不满足条件!");
                }
            } else {
                playEffectKeyByAudio("warning");
                interruptedCurrentStateTriggerEvent();
            }

        }

    }

    export class MijingBtnComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_btn_top;
        list: List;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_btn_top");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin, source } = this;

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/default_bg.png", { x: 0, y: 500, w: 640, h: 10 });
            bg.setSize(skin.w, Main_Top_H + Main_Core_H);

            let list = new List(source, MijingBtnItem, 640, 184, 0, 10);
            skin.addChild(list);
            this.list = list;
            list.setPos(10, 50);
            list.setScrollRect(640, 550, 0, 1);

            if (skin.stage) {
                this.awaken();
            }
        }

        @CodeFunc()
        static getFuBen(propertys: [number]) {
            let fuben = undefined;

            let [mijingId] = propertys;
            let list = singleton(MijingBtnComp).list;

            forarr(list.childrens.datas, (v: MijingBtnItem) => {
                if (v._data.id == mijingId) {
                    fuben = v;
                    return false;
                }
                return true;
            });

            return fuben;
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            this.refresh();
        }

        refresh() {

            let list: IMijing[] = [];

            foreach(gameConfig.mijing, v => {
                let { display, guanqia } = v;

                if (guanqia && !checkLimit(display)) {
                    list.push(v);
                }
                return true
            });

            this.list.displayList(list);
        }
    }
}