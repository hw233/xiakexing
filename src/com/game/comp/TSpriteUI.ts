module rf {

    export class TSpriteUI extends TSourceCompment {

        offset: Point2D;

        oname: string;
        circle: number;

        constructor(offset?: Point2D) {
            super();
            if (offset) {
                this.offset = offset;
            }
        }

        clear() {
            let { graphics } = this;
            graphics.clear();
            graphics.end();
            
            if (this.oname) {
                this.oname = undefined;
            }
        }

        sourceLoadComplete(source: TSource): void {
            if (source == this.source) {
                this.gotoAndStop();
            }
        }

        changeSprite(key: string, url: string = "sprite", circle: number = 0) {
            let name = `${key}.png`;

            let { oname } = this;

            if (oname && name == oname) {
                // console.log("name: ", name);
                return;
            }

            this.oname = name;
            this.circle = circle;
            this.create(RES_PERFIX, url, name);
        }

        gotoAndStop() {
            let { source, offset, oname, circle, graphics } = this;

            if (source.status != LoadStates.COMPLETE) {
                return;
            }

            if (!oname) {
                return;
            }

            let { frames } = source.data;

            graphics.clear();

            if (frames) {

                let vo: IBitmapSourceVO = source.getSourceVO(oname, 0);
                if (vo) {

                    if (circle) {
                        graphics.drawCircle(circle, circle, circle, vo);
                    } else {

                        if (offset) {
                            let { x, y } = offset;
                            graphics.drawBitmap(x, y, vo);
                        } else {
                            let { w, h } = vo;
                            graphics.drawBitmap(w >> 1, h >> 1, vo);
                            this.setSize(w, h);
                        }
                    }
                }
            }

            graphics.end();
        }

    }
}