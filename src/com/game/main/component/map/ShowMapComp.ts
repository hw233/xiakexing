module rf {

    export var hongdain_showMapComp_btn_qingbao: boolean = false;

    export class ShowMapComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_show_comp;

        backGround: SingleImage;

        builder: TMapShow;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_show_comp");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;

            let { btn_close, map, btn_qingbao } = skin;

            let oh = Main_Top_H + Main_Core_H;

            this.setPos(0, Main_Title_H);
            this.setSize(skin.w, oh);
            this.setScrollRect(this.w, this.h);

            map.setSize(skin.w, oh - 100);
            map.setScrollRect(map.w, map.h, 1, 1);

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            this.backGround = bg;

            let builder = singleton(TMapShow);
            this.builder = builder;
            map.addChild(this.builder);

            setButtonName(btn_close, "关闭地图");

            map.on(MouseEventX.MouseMove, this.mouseMoveHandler, this);

            btn_close.on(MouseEventX.CLICK, this.close, this);

            btn_qingbao.on(MouseEventX.CLICK, this.qingbaoClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin, builder, backGround } = this;

            if (!skin) {
                return;
            }

            let { mijing } = mapModel.currentMap;
            backGround.load(RES_PERFIX, mijing.res);

            builder.buildMap();

            this.taskTrack();
            this.checkQingbaoBtn();

            this.checkHongDian();

            facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, false);
        }

        @EVT(GameEvent.REFRESH_HONGDIAN)
        checkHongDian() {
            let { skin } = this;
            setHongDian(skin.btn_qingbao, hongdain_showMapComp_btn_qingbao, 25, -40);
        }

        checkQingbaoBtn() {
            let { skin } = this;

            if (modelData.hero.mapstatus == MAP_STATUS.FU_BEN) {
                skin.btn_qingbao.visible = true;
            } else {
                skin.btn_qingbao.visible = false;
            }
        }

        qingbaoClickHandle() {
            hongdain_showMapComp_btn_qingbao = false;
            this.checkHongDian();

            singleton(QingBaoPopup).open();
        }

        sleep() {
            let result = modelData.hero.mapstatus != 3;

            if (result) {
                facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, true);
            }

            facade.simpleDispatch(`${ResConst.TASK}.${IRestaskConst.TRACKGUID}`);
        }

        @EVT(`${ResConst.TASK}.${IRestaskConst.TRACKGUID}`)
        taskTrack() {
            if (this.skin) {
                setTaskTrack(this.skin);
            }
        }

        close() {
            this.remove();
        }

        mouseMoveHandler(event: EventX) {
            let data = event.data as IMouseEventData;
            let { ox, oy } = data;

            if (ox == 0 && oy == 0) {
                return;
            }

            let { _x, _y, minX, maxX, minY, maxY } = this.builder;

            let y = _y + oy;
            let x = _x + ox;

            this.builder.setPos(Math.clamp(x, minX, maxX), Math.clamp(y, minY, maxY));

        }
    }
}