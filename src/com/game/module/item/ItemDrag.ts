module rf {
    export class ItemDrag extends BaseDrag {

        onClickHandle() {
            let { _data } = this;

            if (splitItemBool) {
                if (_data.count > 1) {
                    singleton(SplitItemPopup).open(_data);
                } else {
                    addPrompt("数量不支持拆分");
                }
                return;
            }

            if (deleteItemBool) {
                singleton(DeleteItemSelectPopup).open(_data);
                return;
            }

            let cfg = gameConfig.item[_data.id];
            if (cfg.type == ITEM_TYPE.Zhuangbei) {
                // 物品类型为装备
                this.zhuangbeiPopup();
            } else {
                this.qitaItemPopup();
            }
        }

        zhuangbeiPopup() {
            let { _data } = this;
            let { model } = _data;

            let flag = true;

            forarr(model.slot, v => {
                let tempItem = (modelData.item as IItemRuntime).slots[v];
                if (!tempItem) {
                    flag = false;
                }
                return flag;
            });

            if (flag) {
                singleton(ZhuangbeiDuibiPopup).open(_data, this);
            } else {
                singleton(ZhuangbeiPopup).open(_data, this);
            }
        }

        qitaItemPopup() {
            let { _data } = this;

            let { model } = _data;

            let popup = undefined;

            if (model.type == ITEM_TYPE.Shuji || model.type == ITEM_TYPE.Cai || model.type == ITEM_TYPE.Yaopin) {
                popup = singleton(BigItemClickPopup);
            } else {

                if (model.bag) {
                    popup = singleton(SmallItemClickPopup);
                } else {
                    popup = singleton(ItemLookClickPopup);
                }
            }

            popup.open(_data, this);
        }
    }
}