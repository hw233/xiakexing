module rf {

    export class ItemIcon extends TSourceCompment {

        _data: IItem;

        bg: TSpriteUI;
        icon: TSpriteUI;

        constructor() {
            super();
            this.bindComponents();
        }

        bindComponents() {

            let sprite = new TSpriteUI();
            this.addChildAt(sprite, 0);
            this.bg = sprite;

            sprite = new TSpriteUI({ x: 34, y: 34 });
            this.addChild(sprite);
            this.icon = sprite;

        }

        doData() {

            let { _data, bg, icon } = this;

            if (_data) {
                let { rare, icon: res } = _data;

                bg.changeSprite(`item_icon_${rare}`);

                let [url, key] = res;
                icon.changeSprite(key, url);

            } else {
                bg.clear();
                icon.clear();
            }
        }
    }
}