module rf {

    export class DengluDele extends TEventInteresterDele {

        skin: TComponent & IPackage_DengluPanel;

        account: AdvTextFiled;
        password: AdvTextFiled;

        bindComponents() {
            let { skin } = this;
            let { input_1, input_2, zhuce, denglu, txt_version } = skin;

            setText(txt_version, `版本号:${cfgData.version}`);

            let text = new TextField();
            text.format = input_format.clone();
            text.source = inputSource;
            input_1.addChild(text);
            text.color = 0;
            text.html = true;
            text.type = TextFieldType.INPUT;
            text.mouseEnabled = true;
            text.setSize(395, 30);
            text.setPos(30, 15);

            let adv = new AdvTextFiled(text, "请输入用户名", Style.DELU_INPUT_TEXT);
            this.account = adv;

            text = new TextField();
            text.format = input_format.clone();
            text.source = inputSource;
            input_2.addChild(text);
            text.color = 0;
            text.html = true;
            text.type = TextFieldType.INPUT;
            text.mouseEnabled = true;
            text.setSize(395, 30);
            text.setPos(30, 15);
            // text.text = "无法输入密码!";

            adv = new AdvTextFiled(text, "请输入密码", Style.DELU_INPUT_TEXT);
            this.password = adv;

            setButtonEnabled(zhuce, false);

            denglu.on(MouseEventX.CLICK, this.dengluClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
            playBgmKeyByAudio("chuangjue");
        }

        awaken() {

            let { skin, account } = this;

            if (!skin) {
                return;
            }

            account.text = cookieConfig.account;
        }

        dengluClickHandle() {

            let { account, password } = this;

            if (account.text == "") {
                playEffectKeyByAudio("warning");
                addPrompt("请输入账号!");
                return;
            }

            playEffectKeyByAudio();

            launchData.account = cookieConfig.account = account.text;

            let socket = singleton(TSocket);
            socket.connect(launchData.wsurl.substitute(launchData.ip, launchData.port))
            facade.on("socket_connect", this.socketConnectHandler, this);

            localStorage.setItem(`wuxialuan_config`, JSON.stringify(cookieConfig));
        }

        socketConnectHandler(event: EventX) {
            event.currentTarget.off(event.type, this.socketConnectHandler, this);

            facade.toggle(LoginPanel, 0);

            initSaveData(socketData.client_data);

            facade.toggle(LoadingPanel, 1);

            // if (!socketData.client_data.hero.name) {
            //     switchGameScene(GameSceneEnum.CREATE);
            // } else {
            //     facade.toggle(LoadingPanel, 1);
            // }
        }
    }
}