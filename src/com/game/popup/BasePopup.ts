module rf {

    export interface IPopRuntime {
        value?: string;
        title?: string;
        btnName?: string;
        rightEvt?: Function;//右按钮，优先
        leftEvt?: Function;//左按钮
    }

    export var initPopup = {};

    export var popList: BasePopup[] = [];

    export function checkPop(comp: any) {
        let temp = false;
        forarr(popList, (v: any) => {
            if (v == comp) {
                temp = true;
                return false;
            }
            return true;
        });
        return temp;
    }

    export class PopCloseBtn extends TSourceCompment {

        skin: TComponent & IPopup_Btn_close;

        traget: BasePopup;

        constructor(traget: BasePopup) {
            super(RES_PERFIX, "ui/popup/", "btn_close");
            this.traget = traget;
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            buttonModels(this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { traget, skin } = this;

            if (!skin) {
                return;
            }

            let { w, h } = traget;

            let ox = (stageWidth - w) >> 1;
            let oy = (stageHeight - h) >> 1;

            this.setPos(ox + w - (skin.w >> 1) - 5, oy - (skin.w >> 1) + 5);
        }
    }

    export class BasePopup extends TSourceCompment {

        skin: TComponent;
        traget: any;

        _data: any;

        _tween: ScriptTween;
        showEffect: boolean = true;//是否开启弹窗动画

        backGround: Sprite;
        bgClick: boolean = true;//能否点击背景关闭
        bgAlpha: number = 0.3;//背景颜色透明度

        closeBtn: PopCloseBtn;
        bgClose: boolean = true;//是否有关闭按钮

        name: string;

        constructor(prefix?: string, url?: string, cls?: string) {
            super(prefix, url, cls);
        }

        bindComponents() {

            this.skin = this as any;
            this.skin.renderer = new SuperBatchRenderer(this.skin);

            let { skin, bgClick, bgAlpha, bgClose } = this;
            let { w, h } = skin;

            skin.setPos(stageWidth - w >> 1, stageHeight - h >> 1);
            skin.setPivotPonumber(w >> 1, h >> 1, 0);

            let backGround = new Sprite();
            backGround.mouseChildren = true;
            backGround.mouseEnabled = true;
            this.backGround = backGround;

            let { graphics } = backGround;
            graphics.clear();
            graphics.drawRect(0, 0, stageWidth, stageHeight, 0, bgAlpha);
            graphics.end();

            if (bgClose) {
                this.closeBtn = new PopCloseBtn(this);
                this.closeBtn.on(MouseEventX.CLICK, () => {
                    playEffectKeyByAudio("fan_hui_jian");
                    this.close();
                }, this);
            }

            backGround.on(MouseEventX.CLICK, () => {

                if (bgClick) {
                    this.close();
                }

            }, this);
        }

        // refreshSize(width: number, height: number) {
        //     let { skin, w, h, childrens } = this;

        //     if ((w == width && h == height) || height >= skin.h) {
        //         return;
        //     }

        //     this.w = width;
        //     this.h = height;

        //     // super.setSize(width, height);

        //     let { $graphics: graphics } = this;
        //     if (graphics) {
        //         graphics.hitArea.clean();
        //         graphics.setSize(width, height);
        //     }

        //     let bg = this["img_bg"];
        //     if (bg) {
        //         bg.setSize(width, height);
        //     }

        //     skin.setPos(stageWidth - width >> 1, stageHeight - height >> 1);
        //     // skin.setPivotPonumber(w >> 1, h >> 1, 0);
        // }

        doData() {
            tipContainer.addChild(this.backGround);
            tipContainer.addChild(this);
            if (!this.showEffect) {
                this.show();
            }
        }

        /**
         * 开启弹窗方法
         * @param data 
         */
        open(data?: any, traget?: any, audio: string = "tan_kuang_yin") {

            playEffectKeyByAudio(audio);

            if (this.showEffect) {
                this._tween = scriptTween_play(this, popup_effect_show, defaultTimeMixer);
                this._tween.on(EventT.COMPLETE, this._tweenShowCompleteHandle, this);
            }

            popList.push(this);

            if (data) {
                this.data = data;
                this.traget = traget;
            } else {
                this.data = initPopup;
            }
        }

        // @EVT(GameEvent.CLOSE_ALL_POPUP)
        close() {

            if (this.closeBtn) {
                this.closeBtn.remove();
            }

            if (this.showEffect) {
                this._tween = scriptTween_play(this, popup_effect_hide, defaultTimeMixer);
                this._tween.on(EventT.COMPLETE, this._tweenHideCompleteHandle, this);
            } else {
                this.hide();
            }

            popList.pop();
        }

        show() {
            if (this.closeBtn) {
                tipContainer.addChild(this.closeBtn);
            }
        }

        hide() {
            this.remove();
        }

        private _tweenShowCompleteHandle(event: EventX) {
            event.currentTarget.off(EventT.COMPLETE, this._tweenShowCompleteHandle, this);
            this._tween = undefined;

            this.show();
        }

        private _tweenHideCompleteHandle(event: EventX) {
            event.currentTarget.off(EventT.COMPLETE, this._tweenHideCompleteHandle, this);
            this._tween = undefined;

            this.hide();
        }

        sleep() {

            if (this.closeBtn) {
                this.closeBtn.remove();
            }

            if (this.backGround) {
                this.backGround.remove();
            }
        }
    }
}