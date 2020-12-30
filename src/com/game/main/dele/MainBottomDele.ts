module rf {

    // 主场景bottom部分
    export class MainBottomDele extends TEventInteresterDele {

        skin: TComponent & IMainScene_Bottom;

        bindComponents() {
            let { skin } = this;
            let { btn_open } = skin;

            let oh = Main_Title_H + Main_Top_H + Main_Core_H;
            skin.setSize(skin.w, stageHeight - oh);

            let bg = new SingleImage();
            skin.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/msgBg1.png", { x: 0, y: 60, w: 640, h: 10 });
            bg.setSize(skin.w, skin.h);

            let shieldCheck = new ShieldCheckComp();
            skin.addChild(shieldCheck);
            shieldCheck.setPos(0, 3);

            this.addInput();

            let list = new ChatMessageListComp();
            skin.addChild(list);
            list.data = { x: 30, y: 70, w: 590, h: skin.h - 150 };

            btn_open.on(MouseEventX.CLICK, this.openClickHandle, this);
        }

        @EVT(GameEvent.ADD_INPUT_BOTTOM)
        addInput() {
            let { skin } = this;
            let input = singleton(InputComp);
            skin.addChild(input);
            input.setPos(10, skin.h - 80);
        }

        openClickHandle() {
            playEffectKeyByAudio();
            let chat = singleton(ChatComp);
            tipContainer.addChild(chat);
        }
    }
}