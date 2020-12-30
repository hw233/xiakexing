module rf {

    export class TaskTalkComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Talkcomp;

        bg: SingleImage;
        _data: IDialogueBuanchRuntime;
        list: List;

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

            let list = new List(skin.source, TaskTalkBuanchItemComp, 457, 80, 5, 0, true);
            this.list = list;
            tipContainer.addChild(list);
            list.setPos(w - 457 >> 1, (stageHeight - h >> 1) + 400);

            list.on(EventT.SELECT, this.onListItemClickHandle, this);
        }

        open(data: IDialogueBuanchRuntime) {
            this.data = data;
        }

        doData() {
            let { skin, bg, _data, list } = this;
            let { buanch } = _data;
            tipContainer.addChildAt(bg, 0);
            tipContainer.addChild(list);
            tipContainer.addChild(this);

            let { type, name, context } = _data;
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

            this.list.displayList(buanch);
        }

        onListItemClickHandle() {
            let { list } = this;
            let item = list.selectItem;
            let _data = item._data;
            if (_data) {
                for (const key in _data) {
                    this.remove();
                    this.list.remove();
                    playPhase(_data[key]);
                }
            }
        }

        sleep() {
            if (this.bg) {
                this.bg.remove();
            }
        }
    }

    export class TaskTalkBuanchItemComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Buanch_item;
        _data: { [key: string]: string };

        constructor() {
            super(RES_PERFIX, "ui/package/", "buanch_item");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;
            let { txt_value } = skin;
            txt_value.html = true;
        }

        doData() {
            let { _data, skin } = this;
            let { txt_value } = skin;

            for (const key in _data) {
                setText(txt_value, key);
            }
        }
    }
}