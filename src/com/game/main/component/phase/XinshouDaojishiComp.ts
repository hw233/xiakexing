module rf {

    export class XinshouDaojishiComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Xinshou_daojishi;

        _data: number[];

        sp: Sprite;

        constructor() {
            super(RES_PERFIX, "ui/package/", "xinshou_daojishi");
        }

        bindComponents() {

            this.skin = this as any;
            this.skin.renderer = new SuperBatchRenderer(this.skin);

            let { skin } = this;
            let { txt_title, txt_time } = skin;

            let sp = new Sprite();
            skin.addChildAt(sp, 0);
            this.sp = sp;
            let { graphics } = sp;
            graphics.clear();
            graphics.drawRect(0, 0, stageWidth, stageHeight, 0, 0.7);
            graphics.end();
            sp.mouseEnabled = false;
            sp.mouseChildren = false;

        }

        doData() {
            let { skin, _data } = this;
            let { txt_title, txt_time } = skin;
            let [show, action] = _data;
            setText(txt_title, "距离敌人追上你还有:");
            setText(txt_time, "3:00")

            callLater.later(() => {
                this.sp.remove();
                tweenTo({ x: stageWidth, y: 0, scale: 0 }, 800, defaultTimeMixer, skin);
            }, this, show);

            callLater.later(() => {
                this.remove();
            }, this, action);
        }

        _tweenComplete(event: EventX) {

        }
    }
}