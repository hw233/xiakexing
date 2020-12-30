module rf {

    export interface ICreatepro {
        title: string;
        desc: string;
    }

    export class PlayerProItem extends TSourceCompment {

        skin: TSourceCompment & ICreatePlayer_Face_pro_item;

        _data: ICreatepro;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "face_pro_item");
        }

        bindComponents() {
            this.skin = this as any;
        }

        doData() {
            let { _data, skin } = this;
            let { title, desc } = _data;
            let { txt_title, txt_pro } = skin;

            setText(txt_title, title);
            setText(txt_pro, desc);
        }
    }

    export class CreatePlayer3Comp extends TSourceCompment {
        skin: TSourceCompment & ICreatePlayer_Create3;

        _data: string[];

        textName: AdvTextFiled;

        touxiang: TTouXiangIcon;

        list: List;

        constructor() {
            super(RES_PERFIX, "ui/createPlayer/", "create3");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin } = this;
            skin.setPos(stageWidth - skin.w >> 1, stageHeight - skin.h >> 1);

            let { source, txt_tips, shurukuang, _icon, btn_chuangjian, btn_shangyibu, btn_random } = skin;

            setText(txt_tips, "请输入中文名字");

            let text = new TextField();
            text.format = input_format.clone();
            text.source = inputSource;
            shurukuang.addChild(text);
            text.color = Style.WHITE;
            text.maxChars = 6;
            text.html = true;
            text.type = TextFieldType.INPUT;
            text.mouseEnabled = true;
            text.setSize(238, 59);
            text.setPos(10, 16);
            let adv = new AdvTextFiled(text, "请输入姓名...", Style.INPUT_TEXT);
            this.textName = adv;

            let touxiang = new TTouXiangIcon();
            this.touxiang = touxiang;
            touxiang.scale = 1.5;
            _icon.addChildAt(touxiang, 0);

            let list = new List(source, PlayerProItem, 480, 50, 0, 10);
            skin.addChild(list);
            this.list = list;
            list.setPos(80, 460);

            setButtonName(btn_shangyibu, "上一步");
            setButtonName(btn_chuangjian, "创建角色");

            btn_shangyibu.on(MouseEventX.CLICK, this.onShangyibuClickHandler, this);
            btn_chuangjian.on(MouseEventX.CLICK, this.onChuangjianClickHandler, this);

            btn_random.on(MouseEventX.CLICK, this.onRandomClickHandler, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin } = this;
            if (!skin) {
                return;
            }

            this.changeIcon();
            this.createName();
        }

        doData() {
            let { _data, list } = this;
            if (_data) {
                list.displayList(_data);
            }
        }

        onRandomClickHandler() {
            playEffectKeyByAudio("yao_tou_zi");
            this.createName();
        }

        createName() {
            let firstName = gameConfig.name[1].values;
            let lastName = gameConfig.name[2].values;
            let num = Math.floor(Math.random2(1, 4));
            let rfName = firstName[Math.floor(Math.random2(0, firstName.length))];
            let rlName = "";
            for (let i = 0; i < num; i++) {
                rlName += lastName[Math.floor(Math.random2(0, firstName.length))].value;
            }
            this.textName.text = `${rfName.value}${rlName}`;
        }

        onXuanzeClickHandler() {
            let name = this.textName.text;
            if (name == "") {
                playEffectKeyByAudio("warning");
                addPrompt("你还没有修改名字!");
                return;
            }
            if (!charDetect2(name)) {
                playEffectKeyByAudio("warning");
                addPrompt("名字存在非法字符!");
                return;
            }

            playEffectKeyByAudio();

            playerTempData.name = name;
        }

        changeIcon() {
            let { touxiang } = this;
            touxiang.data = playerTempData.faces;
        }

        onShangyibuClickHandler() {
            playEffectKeyByAudio("fan_hui_jian");
            facade.simpleDispatch(GameEvent.CHANGE_CREATE2_MODEL, 3);
            this.remove();
        }

        onChuangjianClickHandler() {

            let name = this.textName.text;
            if (name == "") {
                playEffectKeyByAudio("warning");
                addPrompt("你还没有修改名字!");
                return;
            }
            if (!charDetect2(name)) {
                playEffectKeyByAudio("warning");
                addPrompt("名字存在非法字符!");
                return;
            }

            playerTempData.name = name;

            let runtime = {
                title: "创建角色",
                value: "完成角色的创建并开始游戏吗？",
                rightEvt: () => {
                    playEffectKeyByAudio("chuang_jian_jue_se");
                    let { name, faces, sex, pro } = playerTempData;
                    foward(CM_CODE.CM_Create, [name, sex, faces, pro]);
                }
            } as IPopRuntime;

            singleton(WenziTitleSelectPopup).open(runtime);
        }
    }
}