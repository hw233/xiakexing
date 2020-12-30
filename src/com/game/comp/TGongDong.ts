module rf {

    export class GunDongComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Gundong;

        _data: any;

        descText: TextField;
        _tweener: ITweener;

        mouseEnabled = false;
        mouseChildren = false;

        constructor() {
            super(RES_PERFIX, "ui/package/", "gundong");
        }

        bindComponents() {
            this.skin = this as any;
            let { w, h } = this.skin;

            this.setScrollRect(w, h);

            let text = new TextField();
            this.skin.addChild(text);
            text.y = 5;
            this.descText = text;
            text.format = defalue_format.clone();
        }

        doData() {
            let { stage, descText, _data, w } = this;

            setText(descText, _data, Style.YELLOW, 24);

            descText.x = w;

            if (this._tweener) {
                tweenStop(this._tweener);
            }

            this._tweener = tweenTo({ x: -descText.w }, 5000, defaultTimeMixer, descText);
            this._tweener.thisObj = this;
            // this._tweener.update = this._tweenerTweenUpdate;
            this._tweener.complete = this._tweenerTweenComplete;
        }

        _tweenerTweenComplete() {
            this._tweener = undefined;
            this.remove();
        }

        _tweenerTweenUpdate(tweener: ITweener) {
            //this.x = this._x >> 0;
            // this.y = this._y >> 0;
        }
    }

    export class DanMuItem extends TSourceCompment {

        _data: any;

        line: Sprite;
        descText: TextField;
        _tweener: ITweener;

        mouseChildren = false;
        mouseEnabled = false;

        traget: any;

        constructor() {
            super();
            this.bindComponents();
        }

        bindComponents() {

            // let line = new Sprite();
            // this.addChild(line);
            // this.line = line;

            let text = new TextField();
            this.addChild(text);
            this.descText = text;
            text.format = defalue_format.clone();
            text.html = true;
        }

        removeMe() {
            this.remove();

            if (this["recycle"]) {
                this["recycle"]();
            }
        }

        doData() {
            let { _data } = this;
            if (_data) {
                this.play();
            }
        }

        play() {

            let { _data, _x, _y, _z, stage, line, descText } = this;

            if (!stage) {
                return;
            }

            if (_data) {

                setText(descText, _data, 24, Style.YELLOW);

                let { w, h } = descText;

                // let { graphics } = line;

                // let baseY = h - 5;
                // graphics.clear();
                // graphics.drawRect(0, baseY, w, 4, Style.BLACK, focus);
                // graphics.drawRect(2, baseY + 1, w - 4, 2, color[colorRange], focus);
                // graphics.end();

                let point = { x: -w, y: _y };
                // let distance = Math.sqrt((Math.pow(_x - point.x, 2) + Math.pow(_y - point.y, 2)));

                this._tweener = tweenTo(point, 2000, defaultTimeMixer, this);
                this._tweener.thisObj = this;
                // this._tweener.update = this._tweenerTweenUpdate;
                this._tweener.complete = this._tweenerTweenComplete;
            }
        }

        _tweenerTweenComplete() {
            this._tweener = undefined;
            this.removeMe();

            if (this.traget) {
                this.traget.remove();
            }
        }

        _tweenerTweenUpdate(tweener: ITweener) {
            //this.x = this._x >> 0;
            // this.y = this._y >> 0;
        }
    }
}