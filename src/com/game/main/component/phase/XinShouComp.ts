module rf {

    export var kaichang = undefined;

    export class XinShouComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Xinshoucomp;

        descData: string;

        desc: string;
        times: number;

        constructor() {
            super(RES_PERFIX, "ui/package/", "xinshoucomp");
        }

        bindComponents() {
            this.skin = this as any;
            this.skin.renderer = new SuperBatchRenderer(this.skin);

            let { skin } = this;
            let { btn_tiaoguo, txt_value } = skin;

            this.setSize(stageWidth, stageHeight);

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/xinshouBg.png", { x: 0, y: 540, w: 640, h: 10 });
            bg.setSize(stageWidth, stageHeight);
            this.addChildAt(bg, 0);

            txt_value.format.leading = 10;

            setButtonName(btn_tiaoguo, "跳过");

            btn_tiaoguo.on(MouseEventX.CLICK, this.tiaoguoClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        @CodeFunc()
        static getKaichang(propertys: any) {
            return kaichang;
        }

        awaken() {

            let { skin } = this;

            if (!skin) {
                return;
            }

            this.descData = cfgData.xinshoudesc/* .split("|"); */

            this.times = 0;
            this.desc = "";

            callLater.later(() => {
                this.showText();
                getGTimer(150).add(this.showText, this);
            }, this, 400);
        }

        sleep() {
            getGTimer(150).remove(this.showText, this);
        }

        showText() {

            let { skin, descData, times } = this;

            let str = descData[times];

            if (!str) {
                this.next();
                getGTimer(150).remove(this.showText, this);
                return;
            }

            if (str == "|") {
                str = "\\n"
            }

            this.desc += `${str}`;

            setText(skin.txt_value, this.desc);

            this.times++;
        }

        next() {
            kaichang = true;
        }

        tiaoguoClickHandle() {
            playEffectKeyByAudio();
            this.next();
        }

    }

    export class XinShouBarComp extends TSourceCompment {

        skin: TSourceCompment & IPopup_Xinshou_yanyi_popup;

        _data: any;

        bar_hunger: TProgressBar;

        times: number;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "xinshou_yanyi_popup");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;
            let { w, h } = skin;

            skin.setPos(stageWidth - w >> 1, stageHeight - h >> 1);
            skin.setPivotPonumber(w >> 1, h >> 1, 0);

            let { txt_title, bar_hunger } = skin;

            setText(txt_title, "饱食度");

            this.bar_hunger = bar_hunger as TProgressBar;
        }

        doData() {

            let { _data, bar_hunger } = this;
            let [begin, end, time, close] = _data;

            this.times = begin;

            this._tweener = tweenTo({ times: end }, time, defaultTimeMixer, this);
            this._tweener.thisObj = this;

            this._tweener.update = () => {
                bar_hunger.setProgressPercent(this.times);
            }

            this._tweener.complete = () => {

                if (this._tweener) {
                    this._tweener = undefined;
                }

                if (close) {

                    callLater.later(() => {
                        this.remove();
                    }, this, close);
                } else {
                    this.remove();
                }
            }
        }
    }
}