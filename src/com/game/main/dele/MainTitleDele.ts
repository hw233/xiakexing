module rf {
    // 主场景title部分
    export class MainTitleDele extends TEventInteresterDele {

        skin: TComponent & IMainScene_Title;

        isShow: boolean;

        bindComponents() {
            let { skin } = this;

            let { btn_return, btn_set } = skin;

            btn_return.phaseName = "goBack";
            __phaseTarget["goBack"] = btn_return;

            btn_return.on(MouseEventX.CLICK, this.onReturnClickHandler, this);
            btn_set.on(MouseEventX.CLICK, this.onSetClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            skin.time.visible = false;
        }

        @EVT(GameEvent.CHECK_SET_BTN)
        checkSetBtn(event: EventX) {

            this.skin.btn_set.visible = event.data;

        }

        onSetClickHandle() {
            singleton(SettingPopup).open();
        }

        //返回按钮
        @EVT(GameEvent.BTN_RETURN)
        onReturnClickHandler() {
            playEffectKeyByAudio("fan_hui_jian");

            pageList.pop();

            let option = pageList[pageList.length - 1];

            if (option) {

                this.isShow = true;
                this.checkBtnStatus();

                let { top, core, bottom } = option;
                changeMainDele(top, core, bottom, true);
            }
        }

        @EVT(GameEvent.CHANGE_TITLE_BUTTON)
        changeReturn(event: EventX) {

            this.isShow = !!event.data;
            this.checkBtnStatus();
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.MAPSTATUS}`)
        checkBtnStatus() {
            let { skin, isShow } = this;
            let { btn_return } = skin;

            if (!btn_return._visible) {
                btn_return.visible = true;
            }

            let result = isShow && (pageList.length > 1);

            let map = modelData.hero.mapstatus != 3;

            if (!map && !result) {
                btn_return.visible = false;
            } else {
                setButtonEnabled(btn_return, result, 1);
                btn_return.return.visible = result;
                btn_return.main.visible = !result;
            }
        }

        //改变标题
        @EVT(GameEvent.CHANGE_TITLE_TITLE)
        changeTitle(event: EventX) {
            let { txt_statice } = this.skin;

            setText(txt_statice, event.data);
        }

        //改变关卡倒计时
        @EVT(GameEvent.CHANGE_TITLE_TIME)
        changeTime(event: EventX) {

            let { time } = this.skin;

            if (event.data) {
                time.visible = true;

                let [countdown, id] = event.data;
                let mijing = gameConfig.mijing[id];
                setText(time.txt_title, mijing.daojishi);

                let { minute, second } = getTimeToS(countdown);
                setText(time.txt_time, `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`);
            } else {
                time.visible = false;
            }
        }
    }
}