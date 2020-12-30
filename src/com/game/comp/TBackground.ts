module rf {
    export class TBackground extends TComponent {

        sp: SingleImage;

        last: string;

        constructor() {
            super();
            this.bindComponents();
        }

        bindComponents() {
            let sp = new SingleImage();
            // sp.load(RES_PERFIX, "bg/loginbg.png");
            this.addChild(sp);
            this.sp = sp;
            let left = (stageWidth >> 1) - 320;
            let top = (stageHeight >> 1) - 680;
            sp.setPos(left, top);
        }

        change(res: string) {

            if (this.last != res) {
                this.sp.load(RES_PERFIX, res);
                this.last = res;
            }
        }
    }
}