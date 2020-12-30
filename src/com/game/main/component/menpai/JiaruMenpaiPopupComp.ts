module rf {
    export class JiaruMenpaiPopupComp extends BasePopup {

        skin: TSourceCompment & IMenpaiScene_Jiarumenpai;

        list: List;

        showEffect = false;

        constructor() {
            super(RES_PERFIX, "ui/menpaiScene", "jiarumenpai");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, btn_jiaru } = skin;

            let data = [];
            let config = gameConfig.menpai;

            foreach(config, (v, k) => {
                data.push(v);
                return true;
            });

            let list = new List(source, JiaruMenpaiItem, 301, 55, 0, 30, true, 1);
            skin.addChild(list);
            this.list = list;
            list.setPos(91, 53);
            list.setScrollRect(301, 140, 1, 1);
            list.displayList(data);

            list.on(EventT.SELECT, this.onListItemClickHandler, this);

            setButtonName(btn_jiaru, "加入门派");

            btn_jiaru.on(MouseEventX.CLICK, this.onJiaruMenpaiClickHandler, this);

        }

        doData() {
            super.doData();

            let { list, skin } = this;

            let guild = modelData.menpai.guild;
            let flag = true;

            forarr(list.datas, (v: IMenpai, k) => {
                if (v.id == guild) {
                    list.selectIndex = k;
                    flag = false;
                }
                return flag;
            });

            if (flag) {
                list.selectIndex = 0;
            }
        }

        onListItemClickHandler() {

        }

        onJiaruMenpaiClickHandler() {

            let item = this.list.selectItem;
            let data = item.data as IMenpai;
            playEffectKeyByAudio("jia_ru_men_pai");
            foward(CM_CODE.CM_JoinSect, data.id);
            this.close();
        }
    }

    export class JiaruMenpaiItem extends TSourceCompment {

        skin: TSourceCompment & IMenpaiScene_Menpai_item;

        _data: IMenpai;

        constructor() {
            super(RES_PERFIX, "ui/menpaiScene", "menpai_item");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {
            let { skin, _data } = this;
            let { txt_name } = skin;

            setText(txt_name, _data.name);

            this.doSelected();
        }

        doSelected() {
            let { skin, _data } = this;
            if (!skin) {
                return;
            }
            let { xuanze } = skin;
            if (this.selected) {
                xuanze.visible = true;
            } else {
                xuanze.visible = false;
            }
        }
    }
}