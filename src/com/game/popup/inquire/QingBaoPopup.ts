module rf {

    export interface IQingbaoRuntime {
        model: IQingbaoType;
        active: number;
        read:number;
        roomKeys: string[];
    }

    export var personQingBao: IQingbaoRuntime[] = [];

    export class QingBaoPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Qingbao_popup;

        showEffect = false;

        qingbaoList: List;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "qingbao_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { source, txt_title } = skin;

            setText(txt_title, "特殊消息");

            let list = new List(source, QingbaoItemComp, 490, 233, 0, 10, true, 1);
            skin.addChild(list);
            this.qingbaoList = list;
            list.setPos(30, 100);
            list.setScrollRect(640, 550, 0, 1);
        }

        doData() {
            super.doData();

            this.qingbaoList.displayList(personQingBao);
        }
    }

    export class QingbaoItemComp extends TSourceCompment {

        skin: TSourceCompment & IPopup_Qingbao_item;

        _data: IQingbaoRuntime;

        qingbao: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "qingbao_item");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;
            let { txt_desc, btn_track } = skin;

            txt_desc.multiline = true;

            let sprite = new TSpriteUI();
            this.skin.addChild(sprite);
            this.qingbao = sprite;

            btn_track.on(MouseEventX.CLICK, this.onClickHandel, this);
        }

        doData() {
            let { skin, _data, qingbao } = this;
            let { txt_name, txt_desc } = skin;
            let { model } = _data;

            let { name, detail, res } = model;

            let [url, key] = res;

            qingbao.changeSprite(key, url);

            setText(txt_name, name);
            setText(txt_desc, StringFormat.decode(detail));

            this.changeXuanze();
        }

        onClickHandel() {
            let { active } = this._data;
            if (active) {
                playEffectKeyByAudio("qu_xiao_zhui_zhong");
                this._data.active = 0;
            } else {
                playEffectKeyByAudio("zhui_zhong_ren_wu");
                this._data.active = 1;
            }

            this.changeXuanze();

            facade.simpleDispatch(GameEvent.REFRESH_QINGBAO_ROOM);
        }

        changeXuanze() {
            let { skin, _data } = this;

            if (!skin) {
                return;
            }

            let { xuanze } = skin;

            xuanze.visible = !!_data.active;
        }
    }
}