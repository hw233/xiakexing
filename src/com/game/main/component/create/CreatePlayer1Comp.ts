module rf {


    export class FaceBtnItem extends TSourceCompment {

        skin: TSourceCompment & ICreatePlayer_Face_btn_item;

        _data: ITypeType;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "face_btn_item");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {

            let { _data, skin } = this;

            let config = gameConfig.touxiang[_data.name];
            setButtonName(skin, config.name);

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
                select.visible = selected;
            } else {
                select.visible = selected;
            }
        }
    }

    export class FaceSelectItem extends TSourceCompment {

        skin: TSourceCompment & ICreatePlayer_Face_select_item;

        _data: ITouxiangIndex;

        head: TSpriteUI;
        Location: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "face_select_item");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;

            let sp = new TSpriteUI({ x: 50, y: 50 });
            skin.addChild(sp);
            sp.scale = 1.1;
            this.head = sp;

            sp = new TSpriteUI({ x: 50, y: 50 });
            skin.addChild(sp);
            sp.scale = 1.1;
            this.Location = sp;

            buttonModels(skin);

            this.on(MouseEventX.CLICK, this.onClickHandle, this);
        }

        doData() {
            let { _data, head, Location } = this;

            if (_data.id == "tou") {
                head.clear();
            } else {
                let index = playerTempData.faces["face_tou"];

                let res = undefined;

                forarr(gameConfig.touxiang["tou"].indexs, v => {

                    if (v.index == index) {
                        res = v.res;
                    }
                    return !res;
                });

                if (res) {
                    head.changeSprite(res, "touxiang");
                } else {
                    head.clear();
                }
            }

            Location.changeSprite(_data.res, "touxiang");

            this.doSelected();
        }

        @EVT(GameEvent.REFRESH_TONGXIANG_SELECT)
        doSelected() {

            let { skin, _data } = this;

            if (!skin) {
                return;
            }

            let key = `face_${_data.id}`;
            let selected = playerTempData.faces[key] == _data.index;

            let { select } = skin;
            select.visible = selected;
        }

        onClickHandle() {
            playEffectKeyByAudio();

            let { _data } = this;

            let key = `face_${_data.id}`;

            if (playerTempData.faces[key] != _data.index) {
                playerTempData.faces[key] = _data.index;

                facade.simpleDispatch(GameEvent.CHANGE_ICON);
            }

            facade.simpleDispatch(GameEvent.REFRESH_TONGXIANG_SELECT);
        }
    }

    export class CreatePlayer1Comp extends TSourceCompment {
        skin: TSourceCompment & ICreatePlayer_Create1;

        touxiang: TTouXiangIcon;

        btnList: List;
        selectList: List;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "create1");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            skin.setPos(stageWidth - skin.w >> 1, stageHeight - skin.h >> 1);

            let { source,select, _icon, btn_nan, btn_nv, btn_xuanze } = skin;

            let touxiang = new TTouXiangIcon();
            this.touxiang = touxiang;
            touxiang.scale = 1.5;
            _icon.addChildAt(touxiang, 0);

            let list = new List(source, FaceBtnItem, 150, 62, 15, 10, true, 3);
            select.addChild(list);
            this.btnList = list;
            list.setPos(40, 35);
            list.on(EventT.SELECT, this.onListItemClickHandle, this);

            let config = getTypeDefines(TYPE_CONFIG.FACE);
            let data = [];

            foreach(config, (v, k) => {
                data.push(v);
                return true;
            });

            data.shift();

            list.displayList(data);

            list = new List(source, FaceSelectItem, 120, 120, 30, 15, true, 3);
            select.addChild(list);
            this.selectList = list;
            list.setPos(70, 205);
            list.setScrollRect(640, 300, 0, 1);

            setButtonName(btn_nan, "男");
            setButtonName(btn_nv, "女");

            btn_nan.on(MouseEventX.CLICK, this.onNanClickHandle, this);
            btn_nv.on(MouseEventX.CLICK, this.onNvClickHandle, this);

            setButtonName(btn_xuanze, "确认选择");

            btn_xuanze.on(MouseEventX.CLICK, this.onXuanzeClickHandler, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin } = this;
            if (!skin) {
                return;
            }

            playerTempData.pro = clone(cfgData.defaultPro);

            this.init();
        }

        onListItemClickHandle() {
            let { btnList, selectList } = this;
            let item = btnList.selectItem;
            let _data = item._data as ITypeType;

            if (_data) {

                let config = gameConfig.touxiang[_data.name];

                let list = [];

                forarr(config.indexs, v => {
                    if (v.sex == playerTempData.sex) {
                        list.push(v);
                    }
                    return true;
                });

                selectList.displayList(list);
            }
        }

        init() {

            let { btnList, skin } = this;
            let { btn_nan, btn_nv } = skin;

            let a: boolean = (playerTempData.sex == 1);
            let b: boolean = (playerTempData.sex == 2);

            btn_nan.select.visible = a;
            setButtonEnabled(btn_nan, !a, 1);

            btn_nv.select.visible = b;
            setButtonEnabled(btn_nv, !b, 1);

            btnList.selectIndex = 0;

            this.changeIcon();
        }

        onNanClickHandle() {
            playEffectKeyByAudio();
            playerTempData.sex = 1;
            playerTempData.faces = cfgData.defaultFaceNan;
            this.init();
        }

        onNvClickHandle() {
            playEffectKeyByAudio();
            playerTempData.sex = 2;
            playerTempData.faces = cfgData.defaultFaceNv;
            this.init();
        }

        @EVT(GameEvent.CHANGE_ICON)
        changeIcon() {
            let { touxiang } = this;
            touxiang.data = playerTempData.faces;
        }

        onXuanzeClickHandler() {

            playEffectKeyByAudio();

            facade.simpleDispatch(GameEvent.CHANGE_CREATE2_MODEL);

            this.remove();
        }
    }
}