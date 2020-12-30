module rf {

    export class BuffItemPro extends TSourceCompment {

        skin: TSourceCompment & IPackage_Buff_item;

        _data: ITypeType;

        icon: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/package/", "buff_item");
        }

        bindComponents() {

            this.skin = this as any;

            let icon = new TSpriteUI();
            this.addChild(icon);
            icon.setPos(2, 2);
            this.icon = icon;
        }

        doData() {

            let { _data, icon } = this;

            if (_data) {
                let { res} = _data;

                let [url, key] = res;
                icon.changeSprite(key, url);

            } else {
                icon.clear();
            }
        }
    }

    //属性栏
    export class ProBuffStatus extends TSourceCompment {

        skin: TSourceCompment & IProScene_Pro_buff;

        buffList: List;

        constructor() {
            super(RES_PERFIX, "ui/proScene/", "pro_buff");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin } = this;

            let { txt_title } = skin;

            txt_title.multiline = true;
            // txt_title.format.leading = -5;

            txt_title.setPos(45, 0);

            setText(txt_title, `状\\n态`);

            let list = new List(undefined, BuffItemPro, 29, 29, 5, 0, false);
            this.addChild(list);
            this.buffList = list;
            list.setPos(100, 20);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;

            if (!skin) {
                return;
            }

            this.refreshBuff();
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.ZHUANGTAI}`)
        refreshBuff() {
            let { buffList } = this;
            let { zhuangtai } = modelData.hero;

            let list: ITypeType[] = [];

            let cfg = getTypeDefines(TYPE_CONFIG.BUFF);

            for (let i = 0; i < statusConfig.length; i++) {

                let reslut = (zhuangtai & statusConfig[i]) != 0;

                if (reslut) {

                    let buff = cfg[i];
                    if (buff && buff.res && buff.res.length) {
                        list.push(buff);
                    }
                }
            }

            buffList.displayList(list);
        }
    }

    //战斗中
    export class FightBuffStatus extends TEventInteresterDele {

        skin: TSourceCompment & IFightScene_Buffcomp;

        buffList: List;

        bindComponents() {

            let { skin } = this;

            let list = new List(undefined, BuffItemPro, 29, 29, 3, 0, false);
            skin.addChild(list);
            this.buffList = list;
        }

        refreshBuff(zhuangtai: number) {
            let { buffList } = this;

            let list: ITypeType[] = [];

            let cfg = getTypeDefines(TYPE_CONFIG.BUFF);

            for (let i = 0; i < statusConfig.length; i++) {

                let reslut = (zhuangtai & statusConfig[i]) != 0;

                if (reslut) {

                    let buff = cfg[i];
                    if (buff && buff.res && buff.res.length) {
                        list.push(buff);
                    }
                }
            }

            buffList.displayList(list);
        }
    }

}