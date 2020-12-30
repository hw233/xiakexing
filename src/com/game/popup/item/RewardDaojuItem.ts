module rf {

    export class RewardDaojuItem extends TSourceCompment {

        skin: TSourceCompment & IPopup_Reward_daoju_item;

        _data: IConditionRuntime;

        bg: TSpriteUI;
        icon: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "reward_daoju_item");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            let sprite = new TSpriteUI();
            skin._icon.addChildAt(sprite, 0);
            this.bg = sprite;

            sprite = new TSpriteUI({ x: 34, y: 34 });
            skin._icon.addChild(sprite);
            this.icon = sprite;

            // this.on(MouseEventX.CLICK, this.onXiangqingClickHandler, this);
        }

        doData() {
            let { skin, _data, bg, icon } = this;
            let { txt_count, txt_name } = skin;
            let { id, name, maxCount, icon: res } = _data;
            let config = gameConfig.item[id];

            bg.changeSprite(`item_icon_${config ? config.rare : 1}`);

            let [url, key] = res;
            icon.changeSprite(key, url);

            setText(txt_count, `${maxCount}`);

            if (name.length >= 5) {
                name = name.substring(0, 3) + "...";
            }

            let color = Style.BLACK;
            if (config && config.rare != 1) {
                color = Rare[config.rare];
            }

            setText(txt_name, name, color);
        }

        onXiangqingClickHandler() {

        }
    }
}