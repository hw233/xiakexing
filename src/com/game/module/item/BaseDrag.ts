module rf {
    export class BaseDrag extends DragComponent implements IDragCaster, IDragTarget {

        dragkey = "item";

        _data: IItemRuntimeData;

        icon: ItemIcon;

        numText: TextField;

        lc: number;

        constructor() {
            super();
            this.dragDisplay = this;
            this.bindComponents();
        }

        bindComponents() {

            this.renderer = new SuperBatchRenderer(this);
            
            super.bindComponents();

            this.setSize(64, 64);

            let icon = new ItemIcon();
            this.addChildAt(icon, 0);
            this.icon = icon;

            let numText = new TextField();
            this.addChild(numText);
            this.numText = numText;
            numText.format = defalue_format.clone();
            numText.format.stroke = { size: 3, color: 0 };
            numText.format.init();

            this.on(MouseEventX.CLICK, this.onClickHandle, this);

        }

        @EVT(GameEvent.REFRESH_ITEM_DATA)
        refresh(event: EventX) {

            let { _data } = this;
            if (_data && event.data == _data) {
                this.doData();
            }
        }

        doData() {

            let { lc, graphics, _data, icon, numText, x, y } = this;

            if (_data) {
                let { width, height, model, count } = _data;
                // let w = width * ceil;
                // let h = height * ceil;

                // graphics.clear();
                // graphics.drawRect(0, 0, 64, 64, 0x000000, 0.5);

                // graphics.drawLine(0, 0, w, 0, 0xCCCCCC, 2);
                // graphics.drawLine(w, 0, w, h, 0xCCCCCC, 2);
                // graphics.drawLine(0, h, w, h, 0xCCCCCC, 2);
                // graphics.drawLine(0, 0, 0, h, 0xCCCCCC, 2);

                // graphics.end();

                // this.setPos(x + 2, y + 2);

                icon.data = model;

                if (lc != count) {
                    setText(numText, `${(count > 1) ? count : ""} `, Style.WHITE, 20);
                    numText.setPos(ceil_oX - numText.w, 45);
                    this.lc = count;
                }
            }
        }

        onClickHandle() {}
    }
}