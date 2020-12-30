module rf {


    export function playAnimation(res: string[], ox: number = 0, oy: number = 0, os: number = 1, or: number = 0, callBack?: Function) {

        let anima = recyclable(TOnceAnima);
        tipContainer.addChild(anima);
        anima.name = "playAnimation";
        anima.scale = os;
        anima.rotation = or;
        anima.setPos(ox, oy);

        if (callBack) {
            anima.callBack = callBack;
        }

        let [url, key] = res;
        anima.create(RES_PERFIX, url, key);
    }

    export function clearAnimations() {

        forarr(tipContainer.childrens.datas, v => {
            if (v.name && v.name == "playAnimation") {
                v.remove();
            }
            return true;
        })
    }

    export interface IAnimationClipData {
        i: number;
        frame: string;//？？？？？
        d: number; //切换时间
        n: number;
        frames: { [key: string]: string };
    }

    export interface ITransformData {
        x: number;
        y: number;
        sx: number;
        sy: number;
        r: number;
        matrix?: IMatrix;
    }

    export interface IAnimationBitmapSourceData extends ITSourceData {
        width: number;
        height: number;
        ox: number; //偏移
        oy: number; //偏移
        sx: number;
        sy: number;

        fps: number;
        animations: { [key: string]: IAnimationData };
    }

    export interface IAnimationData {
        name: string;
        transform: ITransformData;
        clips: IAnimationClipData[];
        w: number;
        h: number;
        e: number;
        mx: number;
        my: number;
        trick: string;
    }

    export class TAnimation extends TSourceCompment {
        ox = 0;
        oy = 0;
        source: TSource;
        nextTime = 0;
        currentClip: number;
        nextClip: number;

        speed: number = 1;

        lockClip = -1;
        lastClip: number;

        animaData: IAnimationData;

        mouseEnabled = false;
        mouseChildren = false;

        constructor() {
            super();
            // let renderer = new SuperBatchRenderer(this);
            // renderer.srcFactor = WebGLConst.ONE;
            // renderer.dstFactor = WebGLConst.ONE_MINUS_SRC_ALPHA;
            // this.renderer = renderer;
        }

        transformToMatrix(transform: ITransformData) {
            let { x, y, sx, sy, r, matrix } = transform;
            matrix.m2_identity();
            matrix.m2_translation(x, y);
            matrix.m2_scale(sx, sy);
            matrix.m2_rotate(r * DEGREES_TO_RADIANS);
        }

        start() {
            Engine.addTick(this.update, this);
        }

        exit() {
            Engine.removeTick(this.update, this);
        }

        addToStage() {
            super.addToStage();
            this.start();
        }

        removeFromStage() {
            super.removeFromStage();
            this.exit();
        }

        update(now: number, interval: number) {
            let { currentClip, nextClip, nextTime } = this;

            if (nextTime > 0 && now > nextTime) {
                this.gotoAndStop(nextClip /* || currentClip + 1 */);
            }
        }

        sourceLoadComplete(source: TSource): void {
            if (source == this.source) {
                let data = source.data as IAnimationBitmapSourceData;
                let { animations } = data;

                if (this.symbol) {
                    this.animaData = animations[this.symbol];
                }

                this.currentClip = 0;
                this.gotoAndStop(this.currentClip, true);
                this.sourceLoadCompleteCallBack();
            }
        }

        sourceLoadCompleteCallBack() {

        }

        // playAnimation(name: string, source?: TSource,) {
        //     this.symbol = name;
        //     if (source) {
        //         this.source = source;
        //     }
        //     else if (this.source.status == LoadStates.COMPLETE) {
        //         let data = this.source.data as IAnimationBitmapSourceData;
        //         let animaData = data.animations[name];
        //         this.nextTime = engineNow;
        //         this.animaData = animaData;

        //         this.nextClip = 0;
        //         this.gotoAndStop(0, true);
        //     }
        // }

        clear() {
            this.exit();
            this.animaData = undefined;

            let { graphics } = this;
            graphics.clear();
            graphics.end();
        }

        remove() {
            super.remove();

            if (this["recycle"]) {
                this["recycle"]();
            }
        }

        drawFrames(clipData, z1: number = 0, z2: number = 0, lockRender: number = -1) {
            let { graphics, animaData, source, ox, oy } = this;
            let { transform } = animaData;

            graphics.clear();

            if (clipData.frames) {

                for (const key in clipData.frames) {
                    let frame = clipData.frames[key];
                    let z = parseInt(key);
                    if (z == lockRender) {
                        continue;
                    }
                    let vo: IBitmapSourceVO = source.getSourceVO(frame, 0);

                    if (vo) {

                        graphics.drawBitmap(ox, oy, vo, transform.matrix, z + z1, z + z2);
                    }
                }
            }
            else if (clipData.frame) {
                let vo: IBitmapSourceVO = source.getSourceVO(clipData.frame, 0);

                if (vo) {
                    graphics.drawBitmap(ox, oy, vo, transform.matrix, 0, 0);
                }
            }

            graphics.end();
        }

        gotoAndStop(clip: number, refresh?: boolean) {
            var { source, currentClip, animaData, lockClip, speed } = this;

            if (source.status != LoadStates.COMPLETE) {
                return;
            }
            if (!animaData) {
                return;
            }

            if (currentClip == clip && !refresh) {
                return;
            }

            let { clips, transform } = animaData;
            if (clip >= clips.length) {
                clip = 0;
            }

            this.currentClip = clip;

            if (lockClip != -1) {
                clip = lockClip;
            }

            let clipData = clips[clip];

            let { d, n } = clipData;

            if (d < 0) {
                this.nextTime = -1;
            } else {
                this.nextTime = (engineNow + clipData.d) / speed;
            }

            this.nextClip = n ? n - 1 : clip;

            this.drawFrames(clipData);
        }

    }

    export class TOnceAnima extends TAnimation {

        callBack: Function;

        gotoAndStop(clip: number, refresh?: boolean) {

            var { source, currentClip, animaData, lockClip, speed, callBack } = this;

            if (source.status != LoadStates.COMPLETE) {
                return;
            }
            if (!animaData) {
                return;
            }

            if (currentClip == clip && !refresh) {
                return;
            }

            let { clips, transform } = animaData;
            if (clip >= clips.length) {
                clip = 0;
            }

            this.currentClip = clip;

            if (lockClip != -1) {
                clip = lockClip;
            }

            let clipData = clips[clip];

            let { d, n } = clipData;

            if (d < 0) {

                this.nextTime = -1;

                this.remove();

                if (callBack) {
                    this.callBack();
                }

            } else {
                this.nextTime = (engineNow + clipData.d) / speed;
            }

            this.nextClip = n ? n - 1 : clip;

            this.drawFrames(clipData);
        }
    }
}