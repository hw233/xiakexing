module rf {
    export class SceneCreate implements ISceneBase, ISocketEventInterests {
        socketEventInterests: EventInterestType;
        name = GameSceneEnum.CREATE;


        constructor() {
            socketDispatcher.registerEvent(this.socketEventInterests, this);
        }

        start(params?: any): void {

            //todo 创建用户
            facade.toggle(CreatePlayerMediator, 1);
        }


        sleep(): void {

        }

        @SOCKET_EVT(SM_CODE.SM_Create)
        createHandler(event: EventX) {
            foward(CM_CODE.CM_Propertys);
            facade.toggle(CreatePlayerMediator, 0);
            // facade.toggle(LoadingPanel, 1);
            zhuanchangAction();
            
            callLater.later(() => {
                switchGameScene(GameSceneEnum.GAME);
            }, this, 1000);
        }
    }
}