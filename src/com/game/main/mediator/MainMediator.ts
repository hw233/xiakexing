module rf {

    export const enum GameEvent {
        CHANGE_CORE_MODEL = GameEvent.MAIN,
        CHANGE_TOP_SIZE,

        CHANGE_TITLE_BUTTON,
        CHANGE_TITLE_TITLE,
        CHANGE_TITLE_TIME,
        CHECK_BUTTON,

        ADD_MESSAGE,
        BATTLE_START,
        BTN_RETURN,
    }

    export interface IPageListOption {
        top: any;
        core: any;
        bottom: boolean;
    }

    export var pageList: IPageListOption[] = [];// 页面list 存储当前开启未关闭界面

    export var Main_Title_H: number = undefined;
    export var Main_Top_H: number = undefined;
    export var Main_Core_H: number = undefined;

    @MVC("MainMediator")
    export class MainMediator extends Mediator {

        panel: Panel & IMainScene_MainScene;

        frist: boolean;

        constructor() {
            super("mainUI");
            this.setPanel(new Panel("ui/MainScene/", "mainScene", RES_PERFIX));
            // this.mediatorParams.resizeable = true;
        }

        bindComponents() {
            let { panel } = this;
            let { title, top, core, bottom } = panel;

            panel.hitArea.allWays = true;

            this.resize(stageWidth, stageHeight);

            new MainTitleDele(title);
            new MainTopDele(top);
            new MainCoreDele(core);
            new MainBottomDele(bottom);
        }

        resize(width: number, height: number) {
            let { panel } = this;
            let { title, top, bottom, core } = panel;
            // bottom.y = height - bottom.h;
            // core.y = bottom.y - core.h;
            // top.setSize(top.w, core.y - title.h);
            let oh = core.y + core.h
            bottom.setSize(top.w, height - oh);

            Main_Title_H = title.h;
            Main_Top_H = top.h;
            Main_Core_H = core.h;
        }

        awaken() {
            if (!this.frist) {
                // 初始化主场景一级界面
                changeMainDele(singleton(InfoTopComp), singleton(MainCoreComp));
                
                mapModel.changeTitle();
                mapModel.playBgm();

                this.frist = true;
            }

            singleton(TBackground).change("bg/mainBg.png");
            facade.simpleDispatch(GameEvent.CHECK_BUTTON, checkData);
        }

        @EVT(GameEvent.CHANGE_TOP_SIZE)
        changeTopSize(event: EventX) {
            let data = event.data;
            let { panel } = this;
            let { title, top, core } = panel;
            if (data) {
                top.setSize(top.w, top.h + core.h);
            } else {
                top.setSize(top.w, core.y - title.h);
            }
        }

        @EVT(GameEvent.BATTLE_START)
        battleWrining(event: EventX) {
            let data = singleton(BattleModel).battle;
            let zhandou = singleton(ZhandouGuochangComp);
            zhandou.data = data;
            tipContainer.addChild(zhandou);
        }
    }
}