module rf {

    export const enum GameEvent {
        CHANGE_CREATE1_MODEL = GameEvent.CREATE,
        CHANGE_CREATE2_MODEL,
        CHANGE_CREATE3_MODEL,
        CHANGE_TITLE,
        CHANGE_ICON,
    }

    interface IPalyerTemp {
        name: string,
        sex: number,
        faces: IFaceData,
        pro: IPalyerPro;
    }

    interface IPalyerPro {
        str: number,
        con: number,
        dex: number,
        ler: number,
        per: number,
        luck: number,
        age: number,
    }

    export var playerTempData: IPalyerTemp = undefined;

    @MVC("CreatePlayerMediator")
    export class CreatePlayerMediator extends Mediator {

        panel: Panel & ICreatePlayer_CreateScene;

        sp: SingleImage;

        constructor() {
            super("create");
            this.setPanel(new Panel("ui/createPlayer/", "createScene", RES_PERFIX));
        }

        bindComponents() {

            this.panel.setSize(stageWidth, stageHeight);

            let sp = new SingleImage();
            this.panel.addChild(sp);
            this.sp = sp;
            sp.setPos(0, 30);

            playerTempData = { sex: 1, faces: clone(cfgData.defaultFaceNan) } as IPalyerTemp;

            this.changeCreate1Model();
        }

        awaken() {

            singleton(TBackground).change("bg/createBg.png");

            modelData.hero.panelId = -1;
        }

        @EVT(GameEvent.CHANGE_CREATE1_MODEL)
        changeCreate1Model() {
            let { panel, sp } = this;

            sp.load(RES_PERFIX, "bg/chuangjianbiaoti1.png");

            let createPlayer = singleton(CreatePlayer1Comp);
            panel.addChild(createPlayer);
        }

        @EVT(GameEvent.CHANGE_CREATE2_MODEL)
        changeCreate2Model(event: EventX) {
            let { panel } = this;

            let createPlayer = singleton(CreatePlayer2Comp);
            panel.addChild(createPlayer);

            let data = event.data ? 1 : 0;
            createPlayer.data = data;
        }

        @EVT(GameEvent.CHANGE_CREATE3_MODEL)
        changeCreate3Model(event: EventX) {
            let { panel, sp } = this;

            sp.load(RES_PERFIX, "bg/chuangjianbiaoti3.png");

            let createPlayer = singleton(CreatePlayer3Comp);
            panel.addChild(createPlayer);
            createPlayer.data = event.data;
        }

        @EVT(GameEvent.CHANGE_TITLE)
        CHANGE_TITLE(event: EventX) {
            let { sp } = this;
            sp.load(RES_PERFIX, `bg/${event.data}.png`);
        }

    }
}