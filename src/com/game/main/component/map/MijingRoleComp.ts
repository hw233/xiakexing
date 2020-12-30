module rf {

    export class MijingRoleItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_role_item;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_role_item");
        }

        bindComponents() {

            this.skin = this as any;

            buttonModels(this);

            this.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        clickHandle() {
            
        }

    }

    export class MijingRoleComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_role_comp;
        list: List;

        compelte: boolean;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_role_comp");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin, source } = this;
            skin.setPos(stageWidth - skin.w >> 1, 50);

            let list = new List(source, MijingRoleItem, 480, 200, 0, 20);
            skin.addChild(list);
            this.list = list;
            list.setPos(skin.w - 480 >> 1, 40);
            list.setScrollRect(480, 420, 1, 1);

            this.refresh();
            this.compelte = true;
        }

        awaken() {
            if (this.compelte) {
                this.refresh();
            }
        }

        refresh() {
            let data = [];
            data.length = 5;
            this.list.displayList(data);
        }
    }
}