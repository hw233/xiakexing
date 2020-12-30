module rf {

    export class ChatComp extends TSourceCompment {

        skin: TSourceCompment & IMainScene_Msgcomp;

        messageList: TSourceCompment;
        btnList: List;

        offsetH: number;

        showTerm: number;

        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "msgcomp");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin } = this;
            let { btn_close, source } = skin;

            this.setPos(0, Main_Title_H);

            let oh = stageHeight - Main_Title_H;
            skin.setSize(skin.w, oh);

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/msgBg1.png", { x: 0, y: 60, w: 640, h: 10 });
            bg.setSize(skin.w, oh);

            let btnData = [];
            btnData.push({ type: CHAT_BTN_TYPE.ALL, name: "全部" });
            btnData.push({ type: CHAT_BTN_TYPE.CHAT, name: "聊天" });
            btnData.push({ type: CHAT_BTN_TYPE.SYSTEM, name: "系统" });
            btnData.push({ type: CHAT_BTN_TYPE.INTERACTIVE, name: "互动" });

            let size = { x: 30, y: 70, w: 590, h: skin.h - 150 } as Size;
            let list = new ChatMessageListComp();
            list.data = size;
            skin.addChild(list);

            let btnList = new List(source, ChatChannelBtnItemComp, 109, 45, 24, 0, true, 4);
            skin.addChild(btnList);
            this.btnList = btnList;
            btnList.setPos(16, 9);
            btnList.setScrollRect(508, 45, 1, 1);
            btnList.displayList(btnData);

            btnList.on(EventT.SELECT, this.onBtnItemClickHandler, this);
            btn_close.on(MouseEventX.CLICK, this.onCloseClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin, btnList, h } = this;

            if (!skin) {
                return;
            }

            facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, false);

            let input = singleton(InputComp);
            skin.addChild(input);
            input.setPos(10, skin.h - 80);

            btnList.selectIndex = 0;
        }

        sleep() {
            facade.simpleDispatch(GameEvent.ADD_INPUT_BOTTOM);

            let result = modelData.hero.mapstatus != 3;
            if (result) {
                facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, true);
            }
        }

        onCloseClickHandle() {

            playEffectKeyByAudio("fan_hui_jian");
            this.remove();
        }

        onBtnItemClickHandler() {
            let item = this.btnList.selectItem;
            let data = item.data as { type: number, name: string };
            let messageChannelData = [];
            if (data.type == CHAT_BTN_TYPE.ALL) {
                messageChannelData.push(CHAT_TYPE.SYSTEM);
                messageChannelData.push(CHAT_TYPE.WORLD);
                messageChannelData.push(CHAT_TYPE.PRIVATE);
                messageChannelData.push(CHAT_TYPE.ROOM);
                messageChannelData.push(CHAT_TYPE.INTERACTIVE);
            }
            if (data.type == CHAT_BTN_TYPE.CHAT) {
                messageChannelData.push(CHAT_TYPE.WORLD);
                messageChannelData.push(CHAT_TYPE.PRIVATE);
                messageChannelData.push(CHAT_TYPE.ROOM);
            }
            if (data.type == CHAT_BTN_TYPE.SYSTEM) {
                messageChannelData.push(CHAT_TYPE.SYSTEM);
            }
            if (data.type == CHAT_BTN_TYPE.INTERACTIVE) {
                messageChannelData.push(CHAT_TYPE.INTERACTIVE);
            }
            facade.simpleDispatch(GameEvent.CHECK_BUTTON, messageChannelData);
        }
    }

    export class ChatChannelBtnItemComp extends TSourceCompment {
        skin: TSourceCompment & IMainScene_Btn_select;
        _data: { type: number, name: string };

        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "btn_select");
        }

        bindComponents() {
            this.skin = this as any;
            buttonModels(this);
        }

        doData() {
            let { skin, _data } = this;
            setButtonName(this, _data.name);
            this.doSelected();
        }

        doSelected() {
            let { skin, selected } = this;
            if (!skin) {
                return;
            }

            let { xuanze } = skin;
            if (selected) {
                playEffectKeyByAudio("qie_huan_xuan_xiang");
                xuanze.visible = true;
            } else {
                xuanze.visible = false;
            }
        }
    }
}