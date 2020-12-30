module rf {

    export enum OPEN_TYEP {
        normal,
        mijing,
        baoxiang,
        shiti
    }

    export interface IBeibaoData {
        type: OPEN_TYEP;
        data?: IItemBagData;
        close?: Function;
        thisobj?: any;
    }

    export class BeibaoComp extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Beibaocomp;

        _data: IBeibaoData;

        cangKuList: List;

        playerView: BagView;
        toolView: BagView;
        otherView: BagView;

        chetView: ChetView;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "beibaocomp");
        }

        bindComponents() {
            this.skin = this as any;
            let { source, skin } = this;

            // this.skin.hitArea.allWays = true;

            let ow = stageWidth;
            let oh = stageHeight - Main_Title_H;

            this.setSize(ow, oh);

            let { beibao_bottom, btn_split, btn_delete } = skin;

            beibao_bottom.setPos(0, stageHeight - beibao_bottom.h - 100);

            let { housecomp, chetcomp } = beibao_bottom;

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/zhuangbeiBg.png", { x: 0, y: 700, w: 640, h: 10 });
            bg.setSize(ow, oh);
            skin.addChildAt(bg, 0);

            bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/baoxiang_bg.png");
            bg.setPos(13, 85);
            beibao_bottom.addChildAt(bg, 0);

            let role = new RoleInfoComp();
            skin.addChild(role);
            role.setPos(0, 35);

            let view = new BagView(ItemDrag);
            skin.addChild(view);
            this.playerView = view;
            view.setPos(302, 65);

            view = new BagView(ItemDrag);
            skin.addChild(view);
            this.toolView = view;
            view.setPos(302, 485);

            let list = new List(source, CangKuItem, 121, 38, 5, 0, false);
            housecomp.addChild(list);
            this.cangKuList = list;
            list.setPos(10, 15);
            // list.setScrollRect(511, 300, 1, 1);
            list.on(EventT.SELECT, this.onListItemClickHandle, this);

            let config = getTypeDefines(TYPE_CONFIG.CANGKU);
            let data = [];

            foreach(config, (v, k) => {
                data.push(v);
                return true;
            });

            list.displayList(data);

            view = new BagView(ItemDrag);
            this.otherView = view;
            view.setPos(25, 100);

            let chetView = new ChetView(ItemDrag);
            this.chetView = chetView;
            chetView.setPos(25, 100);

            let { btn_shiqu } = chetcomp;

            // btn_shiqu.btnName.format.leading = -10;

            setButtonName(btn_shiqu, "一键拾取");

            setButtonName(btn_split, "拆分");
            setButtonName(btn_delete, "销毁");

            btn_split.on(MouseEventX.CLICK, this.onSplitClickHandle, this)
            btn_delete.on(MouseEventX.CLICK, this.onDeleteClickHandle, this)

            btn_shiqu.on(MouseEventX.CLICK, this.onShiQuClickHandle, this)

            skin.addChild(beibao_bottom);

            if (skin.stage) {
                this.awaken();
            }
        }

        @CodeFunc()
        static getBeibaoGrid(propertys: [number, number]) {

            let [type, slot] = propertys;

            let { playerView, otherView, chetView } = singleton(BeibaoComp);

            let item = undefined;

            switch (type) {
                case 1:
                    item = playerView.slots[slot];
                    break;
                case 2:
                    item = otherView.slots[slot];
                    break;
                case 3:
                    item = chetView.slots[slot];
                    break;
            }

            return item;
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            splitItemBool = false;
            this.skin.btn_split.select.visible = splitItemBool;
            deleteItemBool = false;
            this.skin.btn_delete.select.visible = deleteItemBool;

            modelData.hero.panelId = 1;

            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);
        }

        onSplitClickHandle() {
            playEffectKeyByAudio();
            splitItemBool = !splitItemBool;
            if (splitItemBool) {
                addPrompt("道具拆分系统已开启!");
            }
            this.skin.btn_split.select.visible = splitItemBool;

            if (deleteItemBool) {
                deleteItemBool = false;
                this.skin.btn_delete.select.visible = deleteItemBool;
            }
        }

        onDeleteClickHandle() {
            playEffectKeyByAudio();
            deleteItemBool = !deleteItemBool;
            if (deleteItemBool) {
                addPrompt("道具销毁系统已开启!");
            }
            this.skin.btn_delete.select.visible = deleteItemBool;

            if (splitItemBool) {
                splitItemBool = false;
                this.skin.btn_split.select.visible = splitItemBool;
            }
        }

        doData() {

            let { skin, _data, cangKuList, playerView, toolView, otherView, chetView } = this;

            if (_data) {

                let { housecomp, chetcomp } = skin.beibao_bottom;

                housecomp.visible = false;
                chetcomp.visible = false;

                let { type, data } = _data;

                let bag = modelData.item.bag;

                playerView.data = bag[1] as IItemBagData;//背包
                toolView.data = bag[301] as IItemBagData;//乾坤袋

                if (type == OPEN_TYEP.normal) {

                    playEffectKeyByAudio("open_bag");

                    housecomp.visible = true;
                    skin.beibao_bottom.addChild(otherView);

                    cangKuList.selectIndex = 0;

                    // otherView.data = bag[201] as IItemBagData;

                } else if (type == OPEN_TYEP.baoxiang || type == OPEN_TYEP.shiti) {

                    chetcomp.visible = true;
                    skin.beibao_bottom.addChild(chetView);

                    let { title } = chetcomp;
                    setText(title.txt_desc, actTarget.name);

                    chetView.data = data;
                }
            }
        }

        onListItemClickHandle() {
            let { cangKuList, otherView } = this;
            let item = cangKuList.selectItem;
            let _data = item._data as ITypeType;

            if (_data) {
                otherView.data = modelData.item.bag[_data.type] as IItemBagData;
            }
        }

        onShiQuClickHandle() {
            foward(CM_CODE.CM_GetAllItemFromChet, this._data.data.guid);
        }

        sleep() {
            let { otherView, chetView } = this;

            if (otherView) {
                otherView.remove();
            }

            if (chetView) {
                chetView.remove();
            }
        }
    }

    export class CangKuItem extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Cangku_item;

        _data: ITypeType;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "cangku_item");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {

            let { _data, skin } = this;
            setButtonName(skin, _data ? _data.name : "");

            this.doSelected();
        }

        doSelected() {

            let { skin, selected } = this;

            if (!skin) {
                return;
            }

            let { select } = skin;
            if (selected) {
                playEffectKeyByAudio("qie_huan_xuan_xiang");
                select.visible = !selected;
            } else {
                select.visible = !selected;
            }
        }
    }
}