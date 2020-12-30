module rf {
    export class MapOutPopup extends BasePopup {

        skin: any;

        _data: { mijingId: number, close: number, dead: number };

        bg: SingleImage;

        jiesuan: JieSuanComp;

        bgClick = false;
        bgAlpha = 0;
        bgClose = false;

        bindComponents() {
            super.bindComponents();

            let { skin } = this;

            this.jiesuan = new JieSuanComp(skin["jiesuan"]);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            tipContainer.addChildAt(this.bg, 0);
        }

        sleep() {
            super.sleep();
            if (this.bg) {
                this.bg.remove();
            }
        }

        doData() {
            super.doData();

            let { _data, skin, jiesuan } = this;

            let { mijingId, close } = _data;

            let { reward, time } = gameConfig.mijing[mijingId];

            let str = "";

            if (time > 0) {

                let temp = time - Math.floor((close - getServerDate()) / 1000);

                let { minute, second } = getTimeToS(temp);

                str = `关卡用时:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
            }

            setText(skin.txt_time, str);

            jiesuan.data = reward;
        }

    }

    export class JieSuanComp extends TEventInteresterDele {

        skin: TComponent & IPopup_Jiesuancomp;

        _data: IConfigLimit[];

        bindComponents() {

            let { skin } = this;
            let { txt_title, btn_queding } = skin;

            setText(txt_title, "本局奖励");

            setButtonName(btn_queding, "确定");

            btn_queding.on(MouseEventX.CLICK, this.onClickHandle, this);
        }

        doData() {
            let { _data, skin } = this;

            if (_data) {
                forarr(getLimitValues(_data), v => {

                    let { id, name, maxCount } = v;

                    let text = skin[`txt_${id}`];
                    if (text) {
                        setText(text, `${name}:${maxCount}`);
                    }

                    return true;
                });
            }
        }

        onClickHandle() {

            if (modelData.res.xsYindao) {
                playBgmKeyByAudio("zizhai");
            }

            mapModel.outCompelte();
        }
    }
}