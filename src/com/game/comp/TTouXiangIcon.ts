module rf {

    export class TTouXiangIcon extends TSourceCompment {

        _data: IFaceData;

        faceItems: { [key: string]: TSpriteUI | TAnimation };

        constructor() {
            // super(RES_PERFIX, "touxiang/");
            super();
            this.bindComponents();
        }

        bindComponents() {
            this.setSize(100, 100);
            this.faceItems = {};

            foreach(getTypeDefines(TYPE_CONFIG.FACE), v => {

                let item = undefined;

                if (v.name == "yan") {
                    this.faceItems[v.name] = item = new TAnimation();
                    let renderer = new SuperBatchRenderer(item);
                    renderer.srcFactor = WebGLConst.ONE;
                    // renderer.dstFactor = WebGLConst.ONE_MINUS_SRC_ALPHA;
                    item.renderer = renderer;
                    item.setPos(50, 50);
                } else {
                    this.faceItems[v.name] = item = new TSpriteUI({ x: 50, y: 50 });
                }

                this.addChild(item);
                return true;
            })
        }

        doData() {
            // this.gotoAndStop();

            let { _data, faceItems } = this;

            foreach(faceItems, (v, k) => {

                let key = `face_${k}`;

                if (_data[key] == undefined) {
                    v.clear();
                    return true;
                }

                let sp = this.getRes(k, _data[key]);

                if (sp) {
                    if (k == "yan") {
                        v.create(RES_PERFIX, "animation/yanjing", sp);
                    } else {
                        (v as TSpriteUI).changeSprite(sp, "touxiang");
                    }
                } else {
                    v.clear();
                }

                return true;
            });
        }

        // clear() {
        //     let { graphics } = this;
        //     graphics.clear();
        //     graphics.end();
        // }

        getRes(key: string | number, index: number) {

            let res = undefined;

            forarr(gameConfig.touxiang[key].indexs, v => {

                if (v.index == index) {
                    res = v.res;
                }
                return !res;
            });

            return res;
        }

        // gotoAndStop() {
        //     let { _data, source, graphics } = this;

        //     if (source.status != LoadStates.COMPLETE) {
        //         return;
        //     }

        //     if (!_data) {
        //         return;
        //     }

        //     let { frames } = source.data;

        //     graphics.clear();

        //     if (frames) {

        //         foreach(getTypeDefines(TYPE_CONFIG.FACE), v => {

        //             let key = `face_${v.name}`;

        //             if (_data[key] == undefined) {
        //                 return true;
        //             }

        //             let sp = `${this.getRes(v.name, _data[key])}.png`;

        //             let vo: IBitmapSourceVO = source.getSourceVO(sp, 0);
        //             if (vo) {
        //                 graphics.drawBitmap(50, 50, vo);
        //             }

        //             return true;
        //         });
        //     }

        //     graphics.end();
        // }
    }
}