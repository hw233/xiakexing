module rf {

    export function addPrompt(value: string, color?: number | string, offset?: Point2D, html = false) {

        let prompt = recyclable(PromptItem);
        tipContainer.addChild(prompt);
        prompt.alpha = 2;
        prompt.data = { value, html, color, offset } as IPrompt;
    }

    export function addMessage(message: string) {

        let interactive = gameConfig.interactive[message];

        if (interactive) {
            let { myColor, desc } = interactive;
            message = `<font ${`color="${myColor}"`} >${desc}</font>`;
        }

        createMessageRuntime({ channel: CHAT_TYPE.SYSTEM, message, time: getServerDate() } as IMessageRuntime);
    }

    export interface IPrompt {
        value: string,
        html: boolean,
        color: number,
        offset: Point2D
    }

    export class PromptItem extends TSourceCompment {

        skin: TSourceCompment & IPackage_Prompt_item;

        _data: IPrompt;

        mouseChildren = false;
        mouseEnabled = false;

        constructor() {
            super(RES_PERFIX, "ui/package/", "prompt_item");
            this.waitsource = true;
        }

        bindComponents() {
            this.skin = this as any;

            let { txt_value } = this.skin;
            txt_value.gap = 1;
        }

        doData() {
            let { _data, skin } = this;
            let { stage, txt_value } = skin;

            if (!stage) {
                return;
            }

            if (_data) {

                let { value, html, color, offset } = _data;

                if (!color) {
                    color = Style.TEXT_TREM;
                }

                if (html) {
                    txt_value.text = value;
                } else {
                    setText(txt_value, value, color, 28);
                }

                let { textWidth: w, textHeight: h, scale } = txt_value;

                w = w * scale;
                h = h * scale;

                this.setSize(w, h);

                let ox = 0;
                let oy = 0;

                if (offset) {
                    ox = offset.x + (this.w >> 1);
                    oy = offset.y;
                } else {
                    ox = (stageWidth - this.w) >> 1;
                    oy = stageHeight * 0.3;
                }

                this.setPos(ox, oy);

                let point = { y: (this._y - 150), alpha: 0.5 };

                this._tweener = tweenTo(point, 900, defaultTimeMixer, this);
                this._tweener.thisObj = this;
                this._tweener.complete = this._tweenerTweenComplete;
            }
        }

        _tweenerTweenComplete() {
            this._tweener = undefined;
            this.remove();
        }

        remove() {
            super.remove();

            if (this["recycle"]) {
                this["recycle"]();
            }
        }
    }
}