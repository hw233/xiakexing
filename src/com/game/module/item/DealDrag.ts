module rf {
    export class DealDrag extends BaseDrag {

        onClickHandle() {
            let { _data } = this;
            let { model, count } = _data;
            let { type } = model;

            if (type == ITEM_TYPE.Silver) {
                singleton(ItemLookClickPopup).open(_data, this);
                return;
            }

            let popup = undefined;

            if (type == ITEM_TYPE.Zhuangbei) {
                popup = singleton(DealSelectPopup1);
            } else if (type == ITEM_TYPE.Shuji || type == ITEM_TYPE.Cai || type == ITEM_TYPE.Yaopin) {
                popup = singleton(DealSelectPopup2);
            } else {
                popup = singleton(DealSelectPopup3);
            }

            let { sell } = model;

            let price = getLimitValues(sell)[0].maxCount;

            // let num = Math.floor(itemModel.silver / (count * price));
            // let max = Math.min(num, count);

            let data = {
                type: DealType.sell,
                item: _data,
                max: count,
                price
            } as IDealData;

            popup.open(data, this);

        }

    }
}