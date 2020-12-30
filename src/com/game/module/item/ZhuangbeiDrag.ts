module rf {
    export class ZhuangbeiDrag extends DragComponent implements IDragCaster, IDragTarget {

        dragkey = "item";

        _data: IItemRuntimeData;

        bg: TSpriteUI;
        icon: TSpriteUI;

        constructor() {
            super();
            this.dragDisplay = this;
            this.bindComponents();
        }

        bindComponents() {
            super.bindComponents();

            let bg = new TSpriteUI();
            this.addChildAt(bg, 0);
            bg.setPos(-8, -14);
            this.bg = bg;

            let icon = new TSpriteUI();
            this.addChild(icon);
            this.icon = icon;

            this.on(MouseEventX.CLICK, this.onClickHandle, this);

            this.setSize(64, 64);
        }

        doData() {
            let { _data, bg, icon } = this;

            if (_data) {
                let { rare, icon: res } = _data.model;

                bg.changeSprite(`item_zhuangbei_${rare}`);

                let [url, key] = res;
                icon.changeSprite(key, url);
            } else {
                bg.clear();
                icon.clear();
            }

        }

        onClickHandle() {
            let { _data } = this;

            if (_data) {
                let runtime = (modelData.item as IItemRuntime).slots[_data.slot];
                if (runtime) {
                    singleton(ZhuangbeiPopup).open(runtime, this);
                } else {
                    addPrompt("还未穿戴装备!");
                }
            }
        }
    }
}