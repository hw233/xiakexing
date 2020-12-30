module rf {
    export class TButton extends TComponent {

        button: Sprite;
        btnName: TextField;

        constructor() {
            super();
            this.bindComponents();
        }

        bindComponents() {
            let btn = new Sprite();
            this.addChild(btn);
            this.button = btn;
            btn.setPos(this.w >> 1, this.h >> 1);

            let text = new TextField();
            btn.addChild(text);
            this.btnName = text;
            text.format = defalue_format.clone();
            text.html = true;

        }


        setButton(name, func, w, h) {

            let { button, btnName } = this;
            let { graphics } = button;
            graphics.clear();
            graphics.drawRect(0, 0, w, h, Style.YELLOW, 0.5);
            graphics.end();

            setText(btnName, name, Style.BLACK, 24);

            btnName.setPos(w - btnName.w * btnName.scale >> 1, h - btnName.h * btnName.scale >> 1);
            button.buttonModel(w >> 1, h >> 1, 0);

            button.on(MouseEventX.CLICK, func, this);

        }
    }
}