module rf {

    export class PhaseTalkComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Talkcomp;

        bg: SingleImage;

        _data: IDialogueRuntime;

        ed: MiniDispatcher = new MiniDispatcher();

        constructor() {
            super(RES_PERFIX, "ui/package/", "talkcomp");
        }

        bindComponents() {
            this.skin = this as any;
            this.skin.renderer = new SuperBatchRenderer(this.skin);

            let { skin } = this;
            let { talk, w, h } = skin;
            let { txt_value } = talk;

            txt_value.source = textSource2;

            txt_value.multiline = true;
            txt_value.html = true;

            skin.setPos(stageWidth - w >> 1, (stageHeight - h >> 1) + 100);

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/talk_bg.png", { x: 0, y: 700, w: 640, h: 10 });
            bg.setSize(stageWidth, stageHeight);
            this.bg = bg;

            bg.mouseChildren = true;
            bg.mouseEnabled = true;
            skin.mouseChildren = true;
            skin.mouseEnabled = true;

            // btn_next.on(MouseEventX.CLICK, this.onNextClickHandler, this);
            skin.on(MouseEventX.CLICK, this.onNextClickHandler, this);
            bg.on(MouseEventX.CLICK, this.onNextClickHandler, this);
        }

        open(data: IDialogueRuntime) {
            this.data = data;
            return this.ed;
        }

        doData() {

            let { skin, bg, _data } = this;

            tipContainer.addChildAt(bg, 0);
            tipContainer.addChild(this);

            let { type, name, click, duration, context } = _data;
            let { talk } = skin;
            let { left, right, txt_value } = talk;
            let { txt_left } = left;
            let { txt_right } = right;

            left.visible = false;
            right.visible = false;

            if (type == DIALOGUR_TYPE.SELF) {
                left.visible = true;
                txt_left.text = name;
            }

            if (type == DIALOGUR_TYPE.NPC) {
                right.visible = true;
                txt_right.text = name;
            }

            txt_value.text = context;

            if (_data.y) {
                skin.y = _data.y * stageHeight;
            }

            if (click) {
                callLater.later(this.onNextClickHandler, this, duration);
            }
        }

        onNextClickHandler() {
            callLater.remove(this.onNextClickHandler, this);
            this.remove();
            this.ed.simpleDispatch(EventT.COMPLETE);
        }

        sleep() {
            if (this.bg) {
                this.bg.remove();
            }
        }
    }

    // export var phaseTaskComp = singleton(PhaseTalkComp);
}