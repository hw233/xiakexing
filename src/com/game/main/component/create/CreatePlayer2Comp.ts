module rf {

    export class PlayerCreateItem extends TSourceCompment {

        skin: TSourceCompment & ICreatePlayer_Btn_select_item;

        _data: IShuxingId;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "btn_select_item");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {
            let { skin, _data } = this;
            setButtonName(skin, _data.name);
            this.doSelected();
        }

        doSelected() {
            let { skin, selected, _data } = this;

            if (!skin) {
                return;
            }

            let { select } = skin;
            if (selected) {
                playEffectKeyByAudio("qie_huan_xuan_xiang");
                select.visible = true;
            } else {
                select.visible = false;
            }
        }
    }

    export class CreatePlayer2Comp extends TSourceCompment {
        skin: TSourceCompment & ICreatePlayer_Create2;

        _data: number;

        shenshiList: List;

        currentIndex: number = 0;

        proDesc: ICreatepro[] = [];

        lastPro: IShuxingId;
        lastTempPro: IShuxingId;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "create2");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            skin.setPos(stageWidth - skin.w >> 1, stageHeight - skin.h >> 1);

            let { source, btn_chuangjian, btn_shangyibu, txt_jianjie, txt_desc } = skin;

            txt_jianjie.multiline = true;
            txt_desc.multiline = true;

            let list = new List(source, PlayerCreateItem, 160, 62, 35, 30, true, 2);
            skin.addChild(list);
            this.shenshiList = list;
            list.setPos(130, 210);
            list.on(EventT.SELECT, this.onListItemClickHandler, this);

            setButtonName(btn_shangyibu, "上一步");
            setButtonName(btn_chuangjian, "确认选择");

            btn_shangyibu.on(MouseEventX.CLICK, this.onShangyibuClickHandler, this);
            btn_chuangjian.on(MouseEventX.CLICK, this.onChuangjianClickHandler, this);
        }

        doData() {
            let { _data } = this;
            if (_data) {
                this.refreshShenshi(-1);
            } else {
                this.refreshShenshi();
            }
        }

        refreshShenshi(opear: number = 1) {

            this.currentIndex += opear;

            let { currentIndex, shenshiList, lastPro, proDesc } = this;

            let config = gameConfig.shuxing[currentIndex];

            if (lastPro) {
                for (const key in playerTempData.pro) {
                    playerTempData.pro[key] += (lastPro[key]) * opear;
                }

                if (opear > 0) {
                    let runtime = { title: lastPro.name, desc: lastPro.desc } as ICreatepro;
                    proDesc.push(runtime);
                } else {
                    proDesc.pop();
                }
            }

            if (config) {
                facade.simpleDispatch(GameEvent.CHANGE_TITLE, `chuangjianbiaoti2${currentIndex}`);
                shenshiList.displayList(config.ids);
                shenshiList.selectIndex = 0;
                return true;
            }

            return false;
        }

        onListItemClickHandler() {
            let { skin, shenshiList } = this;
            let item = shenshiList.selectItem;
            let data = item._data as IShuxingId;
            let { str, con, dex, ler, per, luck, age, describe1, describe2 } = data;

            setText(skin.txt_jianjie, describe1);
            setText(skin.txt_desc, describe2);

            this.setPro(ResConst.PRO, IResproConst.STR, str, Style.STR);
            this.setPro(ResConst.PRO, IResproConst.LER, ler, Style.LER);
            this.setPro(ResConst.PRO, IResproConst.DEX, dex, Style.DEX);
            this.setPro(ResConst.PRO, IResproConst.CON, con, Style.CON);
            this.setPro(ResConst.PRO, IResproConst.LUCK, luck, Style.LUCK);
            this.setPro(ResConst.PRO, IResproConst.PER, per, Style.PER);
            // this.setPro(ResConst.HERO, IResproConst.AGE, age);

            this.lastTempPro = data;
        }

        setPro(module: string, property: string | number, value: number, color: number = Style.WHITE) {

            let { skin } = this;

            let config = getProDefine(module, property);

            let text = skin[`txt_${property}`] as TextField;

            if (text) {

                value += playerTempData.pro[property];

                // let jiantou = this[`jiantou_${property}`] as TSpriteUI;

                // if (!jiantou) {
                //     jiantou = this[`jiantou_${property}`] = new TSpriteUI();
                //     this.addChild(jiantou);
                //     jiantou.setPos(text.x + text.w + 60, text.y);
                // }

                let temp = cfgData.defaultPro[property];

                let str = "";

                if (temp) {
                    let sign = value - temp;
                    if (sign > 0) {
                        str = `<font color="${Style.GREEN}" >+${sign}</font>`
                        // jiantou.changeSprite("jiantoushang");
                    } else if (sign < 0) {
                        str = `<font color="${Style.RED}" >${sign}</font>`
                        // jiantou.changeSprite("jiantouxia");
                    } else {
                        // jiantou.clear();
                    }
                }

                let name = `<font color="${color}" >${config.name}</font>`;
                setText(text, `${name}: ${value} `, Style.WHITE);

                let sign = skin[`txt_${property}_s`] as TextField;
                if (!sign.html) {
                    sign.html = true;
                }
                sign.text = str;

            } else {
                console.error(`txt_${property}`, "命名错误");
            }
        }

        onShangyibuClickHandler() {
            playEffectKeyByAudio("fan_hui_jian");

            let ruslut = this.refreshShenshi(-1);

            if (!ruslut) {
                this.currentIndex = 0;
                this.lastPro = undefined;

                facade.simpleDispatch(GameEvent.CHANGE_CREATE1_MODEL);
                this.remove();
            }
        }

        onChuangjianClickHandler() {

            playEffectKeyByAudio();

            this.lastPro = this.lastTempPro;

            let ruslut = this.refreshShenshi();

            if (!ruslut) {
                facade.simpleDispatch(GameEvent.CHANGE_CREATE3_MODEL, this.proDesc);
                this.remove();
            }
        }
    }
}