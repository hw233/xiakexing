module rf {

    export var currentWakuang: WaKuangData = undefined;

    export class WakuangPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Wakuang_popup;

        _data: WaKuangData;

        element: IElement;

        guid: number;

        bar: TProgressBar;

        zhuangtai: number;//1:挖矿，2终止，3收获

        wakuangSound: InnerAudioContext = undefined;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "wakuang_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { bar, txt_value, btn_do } = this.skin;

            this.bar = bar as TProgressBar;

            txt_value.multiline = true;

            btn_do.on(MouseEventX.CLICK, this.doClickHandle, this);
        }

        doData() {
            super.doData();

            let { skin, _data, element } = this;

            currentWakuang = _data;

            let { txt_title, txt_value } = skin;

            this.element = element = gameConfig.element[currentWakuang.elementId];

            setText(txt_title, `${element.name}`);
            setText(txt_value, `${element.desc}`);

            this.refreshWakuang();
        }

        @EVT(GameEvent.REFRESH_WAKUANG_DATA)
        refreshWakuang() {
            let { bar, skin } = this;
            let { endTime, progress, maxprogress, collection, maxcollection } = currentWakuang;

            setText(skin.txt_times, `剩余可收获次数:${maxcollection - collection}`);

            let jindu = Math.min(progress / maxprogress, 1);
            bar.setProgressPercent(jindu);

            if (jindu == 1) {
                this.zhuangtai = 3;
            } else {
                if (endTime) {

                    let time = endTime - getServerDate();

                    if (time > 0) {
                        this.zhuangtai = 2;
                    } else {
                        this.zhuangtai = 3;
                    }

                } else {
                    this.zhuangtai = 1;
                }
            }

            this.setName();
        }

        setName() {
            let { zhuangtai, skin, element } = this;

            this.init();

            let cfg = getTypeDefines(TYPE_CONFIG.DIG);
            let str = "";

            switch (zhuangtai) {
                case 1:
                    str = cfg[`${currentWakuang.type}`].name;
                    break;
                case 2:
                    str = "停止";
                    if (element.sound && element.sound.length) {
                        this.wakuangSound = playBgmKeyByAudio(element.sound[0], false);
                    }
                    this.update();
                    break;
                case 3:
                    str = "收获";
                    break;
            }

            setButtonName(skin.btn_do, str);
        }

        update() {

            let { beginTime, endTime } = currentWakuang;

            let duration = endTime - beginTime;

            this._tweener = tweenTo({ progress: currentWakuang.maxprogress }, duration, defaultTimeMixer, currentWakuang);
            this._tweener.update = () => {
                let { progress, maxprogress } = currentWakuang;
                let jindu = Math.min(progress / maxprogress, 1);
                this.bar.setProgressPercent(jindu);
            }
            this._tweener.complete = () => {
                this._tweener = undefined;
                this.zhuangtai = 3;
                this.setName();
            }
        }

        sleep() {
            super.sleep();
            let { zhuangtai, guid } = this;
            if (zhuangtai == 2 || zhuangtai == 3) {
                foward(CM_CODE.CM_WaKuangStop, guid);
            }

            this.init();
        }

        init() {
            let { _tweener, wakuangSound } = this;

            if (_tweener) {
                tweenStop(_tweener);
            }

            if (wakuangSound) {
                stopAudio(wakuangSound);
            }
        }

        doClickHandle() {

            let { zhuangtai, guid, element } = this;

            playEffectKeyByAudio();

            switch (zhuangtai) {
                case 1:

                    let { diglimit } = element;
                    if (diglimit) {
                        let ruslut = checkLimit(diglimit);
                        if (ruslut) {
                            forarr(getLimitValues(diglimit), v => {
                                let { name, maxCount } = v;
                                addPrompt(`需要${name}x${maxCount}`);
                                return true;
                            })
                            return;
                        }
                    }

                    foward(CM_CODE.CM_WaKuang, guid);
                    break;
                case 2:
                    foward(CM_CODE.CM_WaKuangStop, guid);
                    break;
                case 3:
                    foward(CM_CODE.CM_WaKuangReward, guid);
                    break;
            }
        }
    }
}