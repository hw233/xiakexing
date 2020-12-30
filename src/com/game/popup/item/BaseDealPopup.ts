module rf {

    export enum DealType {
        buy = "购买",      //购买
        sell = "出售"     //出售
    }

    export interface IDealData {
        type: DealType;
        count: number;
        max: number;
        price: number;//单价
        item: IItemRuntimeData | IItem;
        shopId?: number;
    }

    export class BaseDealPopup extends BasePopup {

        skin: any;

        _data: IDealData;

        icon: ItemIcon;

        seleceNum: number;

        bindComponents() {
            super.bindComponents();

            let { _icon, select_comp, btn_queding } = this.skin;

            let icon = new ItemIcon();
            _icon.addChild(icon);
            this.icon = icon;

            if (select_comp) {
                let { btn_left, btn_right, btn_max } = select_comp;
                btn_left.on(MouseEventX.CLICK, this.onLeftClickHandler, this);
                btn_right.on(MouseEventX.CLICK, this.onRightClickHandler, this);
                btn_max.on(MouseEventX.CLICK, this.maxClickHandle, this);
            }

            btn_queding.on(MouseEventX.CLICK, this.quedingClickHandle, this);
        }

        changeSeleceNum() {
            let { skin, seleceNum, _data } = this;
            let { select_comp, txt_price } = skin;
            let { price } = _data;

            setText(select_comp.txt_num, `${seleceNum}`);
            setText(txt_price, `${seleceNum * price}`);
        }

        onLeftClickHandler() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { seleceNum } = this;

            if (seleceNum > 1) {
                this.seleceNum--;
                this.changeSeleceNum();
            }
        }

        onRightClickHandler() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { seleceNum, _data } = this;

            if (seleceNum < _data.max) {
                this.seleceNum++;
                this.changeSeleceNum();
            }
        }

        maxClickHandle() {
            playEffectKeyByAudio("shu_zi_tiao_zheng");

            let { _data } = this;
            this.seleceNum = _data.max;
            this.changeSeleceNum();
        }

        quedingClickHandle() {
            playEffectKeyByAudio("jiao_yi_an_niu");

            let { _data, seleceNum } = this;

            let { type, item, shopId, price } = _data;

            if (type == DealType.buy) {

                let rusult = ((seleceNum * price) > itemModel.bag_Silver);

                if (rusult) {
                    addPrompt("背包银两不足!");
                } else {
                    foward(CM_CODE.CM_ShopBuy, [actTarget.guid, shopId, seleceNum]);
                }

            } else {
                let data = item as IItemRuntimeData;
                foward(CM_CODE.CM_SellItem, [data.guid, seleceNum]);
            }

            this.close();
        }
    }
}