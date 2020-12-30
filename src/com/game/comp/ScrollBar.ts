module rf {
    export class SrollBar extends TSourceCompment {
        skin: TSourceCompment;
        target: TSourceCompment;
        bar: SingleImage;
        maxH: number;
        pointY: number;
        constructor() {
            super();
            this.renderer = new SingleRenderer(this);
            this.bindComponents();
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            let bar = new SingleImage();
            skin.addChild(bar);
            this.bar = bar;

            this.bar.on(MouseEventX.MouseDown, this.onBarDownHandler, this);
            this.bar.on(MouseEventX.MouseUp, this.onBarUpHandler, this);
        }

        generate(perfix: string, bgUrl: string, barUrl, target: TSourceCompment, bgW: number = 30, bgH: number = 150, bgScale9?: Size, barScale9?: Size) {
            this.target = target;
            let bg = new SingleImage();
            this.skin.addChildAt(bg, 0);
            bg.load(perfix, bgUrl, bgScale9);
            bg.setSize(bgW, bgH);

            let rect = target.scroll.rect;
            let sh = rect.h;
            let h = target.h;
            let prop = h / sh;
            let barH = bgH * prop;
            this.bar.load(perfix, barUrl, barScale9);
            this.bar.setSize(bgW, barH);

            this.maxH = bgH;
        }

        onBarDownHandler(event: EventX) {
            let mouseY = (event.data as IMouseEventData).y;
            this.pointY = mouseY;
            this.skin.on(MouseEventX.MouseMove, this.onBarMoveHander, this);
        }

        onBarUpHandler() {
            this.skin.off(MouseEventX.MouseMove, this.onBarMoveHander, this);
        }

        onBarMoveHander(event: EventX) {
            let { bar, maxH, target } = this;
            let { y } = bar;
            let mouseY = (event.data as IMouseEventData).y;
            let speed = 2;

            if(mouseY - this.pointY < 0) {
                speed *= -1;
            }
            if(mouseY - this.pointY > 0) {
                speed = Math.abs(speed);
            }
            if (mouseY < 0) {
                mouseY = 0
            }
            if (mouseY > maxH) {
                mouseY = maxH;
            }
            this.bar.y = mouseY;
            let prop = this.bar.y / maxH;
            this.target.scroll.scrollxy(0,  target.y * prop);
        }
    }
}