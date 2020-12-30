module rf {

    export class QuickItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Quick_item;

        _data: number;

        index: number;

        icon: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "quick_item");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin, w, h } = this;

            let icon = new TSpriteUI();
            skin.addChild(icon);
            icon.setPos(w - 64 >> 1, h - 64 >> 1);
            this.icon = icon;

            this.on(MouseEventX.CLICK, this.clickHandle, this);
            this.on(MouseEventX.MouseDown, this.startContorl, this);
        }

        @EVT(GameEvent.REFRESH_QUICK_ITEM)
        refresh(event: EventX) {

            let [index, itemId] = event.data;
            if (index == this.index) {
                this.data = itemId;
            }
        }

        @EVT(GameEvent.REFRESH_ITEM_DATA)
        refreshNum(event: EventX) {
            let { _data } = this;
            let item = event.data as IItemRuntimeData;
            if (_data && item.id == _data) {
                this.doData();
            }
        }

        doData() {

            let { _data, index, icon, skin } = this;

            let num = "";

            if (_data) {

                let count = itemModel.getItemCount(_data);

                if (!count) {
                    foward(CM_CODE.CM_ChangeQuickSlot, [0, index]);
                }

                let item = gameConfig.item[_data];
                let [url, key] = item.icon;
                icon.changeSprite(key, url);

                num = `${count}`;
            } else {
                icon.clear();
            }

            setText(skin.txt_num, num);
        }

        clickHandle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            let fighting = (modelData.hero.statusFight);

            let { _data } = this;

            if (_data) {

                let config = gameConfig.item[_data];

                switch (config.type) {
                    case ITEM_TYPE.Yaopin:
                        playEffectKeyByAudio("shi_yong_yao_wu");
                        break;
                    case ITEM_TYPE.Fuzhou:
                        playEffectKeyByAudio("shi_yong_fu_zhou");
                        break;
                    default:
                        playEffectKeyByAudio();
                        break;
                }

                if (fighting) {
                    foward(CM_CODE.CM_BattleUseItem, _data);
                } else {
                    foward(CM_CODE.CM_UseItemById, _data);
                }

            } else {

                if (!fighting) {
                    currentQuickIndex = this.index;
                    facade.simpleDispatch(GameEvent.ADD_MIJING_BEIBAO, true);
                } else {
                    addPrompt("无道具可使用!");
                }
            }
        }

        openBeibao() {
            this.stopContorl();

            let fighting = (modelData.hero.statusFight);
            if (!fighting) {
                currentQuickIndex = this.index;
                facade.simpleDispatch(GameEvent.ADD_MIJING_BEIBAO, true);
            }

        }

        startContorl() {
            this.on(MouseEventX.MouseUp, this.stopContorl, this);

            callLater.later(this.openBeibao, this, 1000);
        }

        stopContorl() {
            this.off(MouseEventX.MouseUp, this.stopContorl, this);

            callLater.remove(this.openBeibao, this);
        }

    }

}