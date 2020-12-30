/// <reference path="../../../popup/BasePopup.ts" />
module rf {

    export var currentQuickIndex: number = 0;
    export class MijingToolItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_tool_item;

        _data: IItemCombine;

        icon: ItemIcon;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_tool_item");
        }

        bindComponents() {
            this.skin = this as any;

            let icon = new ItemIcon();
            this.addChild(icon);
            this.icon = icon;

            this.addChild(this.skin.txt_num);

            this.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        doData() {
            let { _data, icon, skin } = this;

            if (_data) {
                let { model, count } = _data;

                icon.data = model;

                setText(skin.txt_num, `${count}`);
            }
        }

        clickHandle() {
            let { id } = this._data;

            foward(CM_CODE.CM_ChangeQuickSlot, [id, currentQuickIndex]);
            facade.simpleDispatch(GameEvent.ADD_MIJING_BEIBAO, false);
        }
    }

    export class MijingBeiBaoComp extends BasePopup {

        skin: TSourceCompment & IMapScene_Mijing_beibao;

        _data: IItemCombine[];

        bgClose = false;

        quickItemList: List;

        jianTouXs: number[] = [2, 106, 210, 314, 418, 522];

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_beibao");
        }

        bindComponents() {

            super.bindComponents();

            let { source, skin } = this;

            let list = new List(source, MijingToolItem, 64, 64, 5, 10, false, 2);
            skin.addChild(list);
            this.quickItemList = list;
            list.setPos(7, 2);
            list.setScrollRect(550, 148, 1, 1);
        }

        doData() {
            super.doData();

            let { _data, quickItemList, skin, jianTouXs } = this;

            if (_data) {

                skin.btn_jiantou.x = jianTouXs[currentQuickIndex];

                quickItemList.displayList(_data);
            }
        }
    }
}