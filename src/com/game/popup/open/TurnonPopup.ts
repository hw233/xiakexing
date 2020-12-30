module rf {

    export class TurnonPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Open_popup;

        _data: IElementRuntime;

        bar: TProgressBar;

        timer: number;

        fiduciary: number[];

        openSound: InnerAudioContext = undefined;

        canClick: boolean = true;

        flag: boolean = true;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "open_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { bar, txt_value, btn_do } = this.skin;

            this.bar = bar as TProgressBar;

            txt_value.multiline = true;

            btn_do.phaseName = "open";
            setButtonName(btn_do, "翻找");

            btn_do.on(MouseEventX.CLICK, this.doClickHandle, this);

            this.name = "TurnonPopup";
        }

        doData() {
            super.doData();

            let { skin, _data, bar } = this;
            let { txt_title, txt_value, txt_tips } = skin;

            let { elementId, element, name } = _data;
            modelData.hero.target = elementId;

            setText(txt_title, `${name}`);
            setText(txt_value, `${element.desc}`);

            let str = "";

            if (element.fiduciary && element.fiduciary.length) {
                str = "这是私人物品，擅动的话会受到攻击!";
                this.fiduciary = element.fiduciary;
            } else {
                this.fiduciary = undefined;
            }

            setText(txt_tips, str);

            this.init();
        }

        playProgress() {
            let { guid, elementId, element } = this._data;

            if (!element.turnon) {
                this.close();
                foward(CM_CODE.CM_ElementAct, { guid: guid ? guid : elementId, act: "open" });
                return;
            }

            this.bar.visible = true;
            this.timer = 0;
            this.canClick = false;

            this.flag = true;

            if (element.sound && element.sound.length) {
                this.openSound = playBgmKeyByAudio(element.sound[0], false);
            }

            this._tweener = tweenTo({ timer: 1 }, element.turnon, defaultTimeMixer, this);
            this._tweener.update = () => {
                this.bar.setProgressPercent(this.timer);
                if (this.timer >= 0.5 && this.flag && this.fiduciary) {
                    foward(CM_CODE.CM_ElementCheckAtt, this.fiduciary);
                    this.flag = false;
                }
            }
            this._tweener.complete = () => {
                this._tweener = undefined;
                this.close();
                foward(CM_CODE.CM_ElementAct, { guid: guid ? guid : elementId, act: "open" });
            }
        }

        sleep() {
            super.sleep();
            this.init();
        }

        init() {
            let { canClick, _tweener, bar, openSound } = this;

            if (!canClick) {
                this.canClick = true;
            }

            if (_tweener) {
                tweenStop(_tweener);
                this._tweener = undefined;
            }

            bar.visible = false;

            if (openSound) {
                stopAudio(openSound);
            }
        }

        doClickHandle() {
            playEffectKeyByAudio();

            if (!this.canClick) {
                addPrompt("不能重复点击!");
                return;
            }

            this.playProgress();
        }
    }
}