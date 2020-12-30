module rf {

    export class StoreComp extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Storecomp;

        daojuList: List;
        yuanbaoList: List;

        currentIndex: number;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "storecomp");
        }

        bindComponents() {
            this.skin = this as any;
            let { source, skin } = this;

            let ow = stageWidth;
            let oh = stageHeight - Main_Title_H;

            this.setSize(ow, oh);

            let { goldcomp, btn_daoju, btn_chongzhi } = skin;

            goldcomp.setPos(0, oh - goldcomp.h);

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/storebg.png", { x: 0, y: 500, w: 640, h: 10 });
            bg.setSize(ow, oh);
            skin.addChildAt(bg, 0);

            let oy = stageHeight / 1.8 + ((stageHeight - 1080) >> 1);

            let list = new List(source, StoreDaojuItem, 205, 395, 0, 5, true, 3);
            skin.addChild(list);
            this.daojuList = list;
            list.setPos(11, 220);
            list.setScrollRect(640, oy, 0, 1);

            list = new List(source, StoreYuanbaoItem, 205, 320, 0, 5, true, 3);
            skin.addChild(list);
            this.yuanbaoList = list;
            list.setPos(11, 220);
            list.setScrollRect(640, oy, 0, 1);

            setButtonName(btn_daoju, "道具");
            setButtonName(btn_chongzhi, "充值");

            btn_daoju.on(MouseEventX.CLICK, this.daojuClickHandle, this);
            btn_chongzhi.on(MouseEventX.CLICK, this.chongzhiClickHandle, this);

            goldcomp.txt_gold.on(MouseEventX.CLICK, () => {
                foward(1, { "res.gold": 10000 })
            }, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            this.changeGold();

            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);

            this.daojuClickHandle();
        }

        init() {

            let { currentIndex, daojuList, yuanbaoList, skin } = this;
            let { btn_daoju, btn_chongzhi, title_1, title_2 } = skin;

            let a: boolean = (currentIndex == 1);
            let b: boolean = (currentIndex == 2);

            title_1.visible = a;
            daojuList.visible = a;
            btn_daoju.xuanze.visible = a;
            setButtonEnabled(btn_daoju, !a, 1);

            title_2.visible = b;
            yuanbaoList.visible = b;
            btn_chongzhi.xuanze.visible = b;
            setButtonEnabled(btn_chongzhi, !b, 1);

            let list = [];

            if (a) {

                foreach(modelData.shangcheng.actives, (v: IShangchengData) => {
                    let { model } = v;
                    if (model && !model.tag) {
                        list.push(v);
                    }
                    return true;
                });

                daojuList.displayList(list);

            } else if (b) {
                foreach(modelData.shangcheng.actives, (v: IShangchengData) => {
                    let { model } = v;
                    if (model && model.tag) {
                        list.push(v);
                    }
                    return true;
                });

                yuanbaoList.displayList(list);
            }
        }

        daojuClickHandle() {
            playEffectKeyByAudio("qie_huan_xuan_xiang");
            this.currentIndex = 1;
            this.init();
        }

        chongzhiClickHandle() {
            playEffectKeyByAudio("qie_huan_xuan_xiang");
            this.currentIndex = 2;
            this.init();
        }

        @EVT(`${ResConst.RES}.${IResresConst.GOLD}`)
        changeGold() {
            let { skin } = this;
            let { gold } = modelData.res;
            setText(skin.goldcomp.txt_gold, `${Math.floor(gold)}`);
        }

    }

    export class StoreDaojuItem extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Store_item_1;

        _data: IResshangcheng_actives;

        icon: TSpriteUI;

        price: number;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "store_item_1");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            let icon = new TSpriteUI();
            skin.addChild(icon);
            this.icon = icon;
            icon.setPos(skin.w - 100 >> 1, 25);

            skin.txt_desc.multiline = true;

            skin.btn_buy.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        @EVT(GameEvent.REFRESH_SHANGCHENG_DATA)
        refresh(event: EventX) {

            if (this._data.id == event.data) {
                this.doData();
            }
        }

        doData() {
            let { _data, icon, skin } = this;

            if (_data) {
                let { txt_name, txt_desc, txt_num, btn_buy } = skin;

                let { id, count } = _data;

                let { name, rare, icon: res, cost, describe } = gameConfig.shangcheng[id];

                let [url, key] = res;

                icon.changeSprite(key, url);

                setText(txt_name, name, Rare[rare]);

                setText(txt_desc, describe);

                setText(txt_num, (count >= 0) ? `今日剩余购买:${count}` : "");

                this.price = Math.floor(getLimitValues(cost)[0].maxCount);

                setText(btn_buy.btnName, `${this.price}`);
            }
        }

        clickHandle(event: EventX) {
            playEffectKeyByAudio("jiao_yi_an_niu");

            if (!this._data.count) {
                addPrompt("物品数量不足!");
                return;
            }

            let runtime = {
                title: "系统提示",
                value: "是否确认购买此道具？",
                rightEvt: () => {
                    let { id, count } = this._data;
                    let { cost } = gameConfig.shangcheng[id];

                    if (checkLimit(cost, count)) {
                        addPrompt("元宝不足!");
                        return;
                    }
                    foward(CM_CODE.CM_ShangchengBuy, [id, 1]);
                }
            } as IPopRuntime;

            singleton(WenziTitleSelectPopup).open(runtime, this);
        }
    }

    export class StoreYuanbaoItem extends TSourceCompment {

        skin: TSourceCompment & IBeibaoScene_Store_item_2;

        _data: IResshangcheng_actives;

        icon: TSpriteUI;

        price: number;

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "store_item_2");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            let icon = new TSpriteUI();
            skin.addChild(icon);
            this.icon = icon;
            icon.setPos(skin.w - 114 >> 1, 75);

            skin.txt_desc.multiline = true;

            skin.btn_buy.on(MouseEventX.CLICK, this.clickHandle, this);
        }

        doData() {
            let { _data, icon, skin } = this;

            if (_data) {
                let { txt_name, txt_desc, btn_buy } = skin;

                let { id, count } = _data;

                let { name, rare, icon: res, tag, describe, count: maxCount } = gameConfig.shangcheng[id];

                let [url, key] = res;

                icon.changeSprite(key, url);

                setText(txt_name, name, Rare[rare]);

                setText(txt_desc, describe);

                setText(btn_buy.btnName, `${tag}`);
            }
        }

        clickHandle(event: EventX) {
            playEffectKeyByAudio("jiao_yi_an_niu");
            addPrompt("该功能暂未开放，敬请期待!");
        }
    }
}