module rf {


    export class InputComp extends TSourceCompment {

        skin: TSourceCompment & IMainScene_Inputcomp;

        adv: AdvTextFiled;
        messageRuntime: IMessageRuntime;

        constructor() {
            super(RES_PERFIX, "ui/MainScene/", "inputcomp");
        }

        bindComponents() {
            this.skin = this as any;
            this.messageRuntime = {} as IMessageRuntime;

            let { skin } = this;
            let { btn_fasong, btn_status, zhuangtai } = skin;
            let { btn_current, btn_world } = zhuangtai;

            let text = new TextField();
            text.format = input_format.clone();
            text.source = inputSource;
            skin.addChild(text);
            text.color = Style.WHITE;
            text.html = true;
            text.type = TextFieldType.INPUT;
            text.mouseEnabled = true;
            text.setSize(395, 30);
            text.setPos(111, 45);

            let adv = new AdvTextFiled(text, "点击输入", Style.INPUT_TEXT);
            this.adv = adv;

            setButtonName(btn_fasong, "发送");
            setButtonName(btn_status, "【世界】");
            setButtonName(btn_current, "【当前】");
            setButtonName(btn_world, "【世界】");

            btn_fasong.on(MouseEventX.CLICK, this.onFasongClickHandle, this);
            btn_status.on(MouseEventX.CLICK, this.onStatusClickHandle, this);
            btn_current.on(MouseEventX.CLICK, this.onRoomClickHandler, this);
            btn_world.on(MouseEventX.CLICK, this.onWorldClickHandler, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin } = this;
            if (!skin) {
                return;
            }

            this.checkChangeRoom();
        }

        @EVT("hero.map")
        checkChangeRoom() {
            let { zhuangtai } = this.skin;
            zhuangtai.visible = false;

            let { guid, map } = modelData.hero;

            if (guid == map) {
                this.initWorldBtn();
                return false;
            }

            return true;
        }

        onRoomClickHandler() {

            this.visibleZhuangtai();

            let ruslut = this.checkChangeRoom();

            if (ruslut) {
                this.messageRuntime.channel = CHAT_TYPE.ROOM;
                this.messageRuntime.tGuid = undefined;
                this.messageRuntime.tName = undefined;
                this.changeFixedStatus();
                playEffectKeyByAudio();
            } else {
                playEffectKeyByAudio("warning");
                addMessage(`<font color = "${Style.HONG_AN}">当前处于自宅，无法使用【当前】频道!</font>`);
            }
        }

        initWorldBtn() {
            this.messageRuntime.channel = CHAT_TYPE.WORLD;
            this.messageRuntime.tGuid = undefined;
            this.messageRuntime.tName = undefined;
            this.changeFixedStatus();
        }

        onWorldClickHandler() {
            this.initWorldBtn();
            this.visibleZhuangtai();
            playEffectKeyByAudio();
        }

        @EVT(TEXT_LINK_TYPE.CHAT_LINK)
        chatLinkHandler(event: EventX) {
            let data = event.data as { channel: number, guid: number, name: string };
            this.messageRuntime.channel = data.channel;
            this.messageRuntime.tGuid = data.guid;
            this.messageRuntime.tName = data.name;
            this.changeFixedStatus();
        }

        onStatusClickHandle() {
            playEffectKeyByAudio();
            this.visibleZhuangtai();
        }

        changeFixedStatus() {
            let { messageRuntime } = this;
            let { channel, tName } = messageRuntime;
            let { btn_status } = this.skin;
            let typeConfig = getTypeDefines(TYPE_CONFIG.CHAT);
            let name = typeConfig[channel].name;
            if (tName) {
                name = tName;
                if (name.length > 2) {
                    name = name.length > 2 ? `${name.substring(0, 2)}...` : name;
                }
            }
            setButtonName(btn_status, `【${name}】`);
        }

        visibleZhuangtai() {
            let { zhuangtai } = this.skin;
            zhuangtai.visible = !zhuangtai.visible;
        }

        onFasongClickHandle() {
            let { adv, messageRuntime } = this;
            let { channel, tGuid } = messageRuntime;

            let message = adv.text;

            if (message != "") {
                foward(CM_CODE.CM_Chat, [channel, message, tGuid]);
                this.adv.text = "";
            } else {
                addPrompt("没有可发送的信息！");
            }
        }
    }
}