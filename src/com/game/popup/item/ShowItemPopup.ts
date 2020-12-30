module rf {

    export class ShowItemPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Showitem_popup;
        
        list: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "showitem_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;

            let list = new List(skin.source, RewardDaojuItem, 68, 69, 10, 0, false);
            this.list = list;
            skin.addChild(list);
            list.setPos(47, 118);
        }

        doData() {
            super.doData();

            let { skin, _data, list } = this;
            let { txt_title } = skin;
            let [title, reward] = _data;

            setText(txt_title, title);

            let rewards = getLimitValues(reward);
            list.displayList(rewards);
        }
    }
}