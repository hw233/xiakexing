module rf {


    export class FrameMaskForce extends TSourceCompment {
        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "gaoliangkuang");
        }

        n0: Sprite;


        // pw: number;
        // ph: number;

        bindComponents() {
            super.bindComponents();
            this.n0.setSize(this.w, this.h);
            this.mouseChildren = false;
            this.mouseEnabled = false;
        }

        setSize(width: number, height: number) {
            super.setSize(width, height);
            if (this.n0) {
                this.n0.setSize(this.w, this.h);
            }

        }

    }

    export class FrameMask extends Mask {

        img: FrameMaskForce;
        tweener: ITweener;
        px = 0;
        py = 0;
        action: boolean = true;

        constructor() {
            super();

            let img = new FrameMaskForce();
            this.img = img;
            this.addChild(img);
        }

        callback?: TweenUpdateFunction

        movetoSize(size: Size, duration: number, callback?: TweenUpdateFunction) {
            let { x, y, w, h } = size;
            let tweener = tweenTo({ x, y, w, h }, duration, defaultTimeMixer, this.size);
            tweener.thisObj = this;
            tweener.update = this.tweenUpdate;
            this.callback = callback;
            tweener.complete = this.tweenComplete.bind(this);
        }

        tweenComplete(tweener: ITweener) {
            let callback = this.callback;
            this.callback = undefined;
            if (callback) {
                callback(tweener);
            }

            let { x, y, w, h } = this.img;

            this.px = x + w * 0.5;
            this.py = y + h * 0.5;

            this.playEffect();
        }

        playEffect() {
            if (this.action) {
                let income = recyclable(FrameMaskForce);
                income.alpha = 0.5
                let { x, y, w, h } = this.img;
                income.setPos(x, y);
                income.setPivotPonumber(w * 0.5, h * 0.5, 0)
                income.setSize(w, h);
                // income.pw = w;
                // income.ph = h;
                // console.log("frame mask", income.w, income.h);
                // globalThis.income = income;
                // income.scale = 2

                scriptTween_play(income, framemask_force_effect, defaultTimeMixer).on(EventT.COMPLETE, this.framemaskForceTweenComplete, this);
                if (this.stage) {
                    callLater.later(this.playEffect, this, 1000);
                }
                tipContainer.addChild(income);
            }
        }

        framemaskForceTweenComplete(event: EventX): void {
            event.currentTarget.off(EventT.COMPLETE, this.tweenComplete, this);
            let tween = event.currentTarget as ScriptTween;
            let income = tween.target as Recyclable<FrameMaskForce>;
            income.remove();
            income.recycle();
        }



        drawBox(size: Size, color = 0, alpha = 0.7) {
            super.drawBox(size, color, alpha);
            this.createFrame(size);
        }

        createFrame(size: Size) {
            let { x, y, w, h } = size;
            let { img } = this;
            // img.renderer = new SuperBatchRenderer(img);
            img.setPivotPonumber(w >> 1, h >> 1, 0);
            img.setSize(w + 20, h + 20);
            img.setPos(x - 10, y - 10);
        }

        // addToStage() {
        //     super.addToStage();
        //     // this._tweenComplete();
        // }

        // removeFromStage() {
        //     let { img, tweener } = this;
        //     if (tweener) {
        //         tweenStop(tweener);
        //         img.scale = 1;
        //     }
        //     super.removeFromStage();
        // }

        // _tweenComplete() {

        //     let { img } = this;
        //     this.tweener = undefined;
        //     let tweener = undefined;
        //     if (img.scale == 1.2) {
        //         tweener = tweenTo({ scale: 1 }, 300, defaultTimeMixer, img);
        //     } else if (img.scale == 1) {
        //         tweener = tweenTo({ scale: 1.2 }, 300, defaultTimeMixer, img);
        //     }
        //     if (tweener) {
        //         tweener.complete = this._tweenComplete;
        //         tweener.thisObj = this;
        //     }
        //     this.tweener = tweener;
        // }


        @PhaseFunc("frameMask")
        static frameMask(action: IPhaseAction) {
            let { p, d: duration, f, q } = action;

            // duration = 10000;

            let mask = singleton(FrameMask);

            if (!p) {
                mask.remove();
                return;
            }

            if (q == undefined) {
                mask.action = false;
            } else {
                mask.action = true;
            }


            let { stageX: x, stageY: y, w, h } = p as Sprite;

            if (f) {
                let [ox, oy, ow, oh] = f
                x += ox;
                y += oy;
                w += ow;
                h += oh;
            }

            if (duration) {
                mask.movetoSize({ x, y, w, h }, duration)
            } else {
                mask.drawBox({ x, y, w, h })
            }

            if (!mask.stage) {
                tipContainer.addChild(mask)
            }
            return duration;
        }
    }

    export class Frame extends Mask {

        img: FrameMaskForce;
        tweener: ITweener;
        px = 0;
        py = 0;
        action: boolean = true;

        constructor() {
            super();

            let img = new FrameMaskForce();
            this.img = img;
            this.addChild(img);
        }

        callback?: TweenUpdateFunction

        movetoSize(size: Size, duration: number, callback?: TweenUpdateFunction) {
            let { x, y, w, h } = size;
            let tweener = tweenTo({ x, y, w, h }, duration, defaultTimeMixer, this.size);
            tweener.thisObj = this;
            // tweener.update = this.tweenUpdate;
            this.callback = callback;
            tweener.complete = this.tweenComplete.bind(this);
        }

        tweenComplete(tweener: ITweener) {
            let callback = this.callback;
            this.callback = undefined;
            if (callback) {
                callback(tweener);
            }

            this.px = this.img.x + this.img.w * 0.5;
            this.py = this.img.y + this.img.h * 0.5;

            this.playEffect();
        }

        playEffect() {
            if (this.action) {
                let income = recyclable(FrameMaskForce);
                income.alpha = 0.5
                let { x, y, w, h } = this.img;
                income.setPos(x, y);
                income.setPivotPonumber(w * 0.5, h * 0.5, 0)
                income.setSize(w, h);
                // income.pw = w;
                // income.ph = h;

                // console.log("img", w, h);
                // console.log("frame", income.pw, income.ph, w, h);
                // globalThis.income = income;
                // income.scale = 2

                scriptTween_play(income, framemask_force_effect, defaultTimeMixer).on(EventT.COMPLETE, this.framemaskForceTweenComplete, this);
                if (this.stage) {
                    callLater.later(this.playEffect, this, 1000);
                }
                tipContainer.addChild(income);
            }
        }

        framemaskForceTweenComplete(event: EventX): void {
            event.currentTarget.off(EventT.COMPLETE, this.tweenComplete, this);
            let tween = event.currentTarget as ScriptTween;
            let income = tween.target as Recyclable<FrameMaskForce>;
            income.remove();
            income.recycle();
        }



        // drawBox(size: Size, color = 0, alpha = 0.7) {
        //     super.drawBox(size, color, alpha);
        //     this.createFrame(size);
        // }

        iw: number;
        ih: number;

        createFrame(size: Size) {
            let { x, y, w, h } = size;
            let { img } = this;
            img.setPivotPonumber(w >> 1, h >> 1, 0);
            this.iw = w + 20;
            this.ih = h + 20;
            this.img.setSize(w + 20, h + 20);
            img.setPos(x - 10, y - 10);
        }

        @PhaseFunc("frame")
        static frame(action: IPhaseAction) {
            let { p, d: duration, f, q } = action;

            // duration = 10000;

            let mask = singleton(Frame);

            if (!p) {
                mask.remove();
                return;
            }

            if (q == undefined) {
                mask.action = false;
            } else {
                mask.action = true;
            }

            let { stageX: x, stageY: y, w, h } = p as Sprite;

            if (f) {
                let [ox, oy, ow, oh] = f
                x += ox;
                y += oy;
                w += ow;
                h += oh;
            }

            // if (duration) {
            mask.createFrame({ x, y, w, h })
            mask.movetoSize({ x, y, w, h }, duration)
            // } else {
            // }

            if (!mask.stage) {
                tipContainer.addChild(mask)
            }
            return duration;
        }
    }
}