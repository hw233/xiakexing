module rf {

    export interface ISceneBase {
        name: GameSceneEnum;
        start(params?: any): void;
        sleep(): void;
    }

    export const enum GameSceneEnum {
        CONN,
        INIT,
        PRE_LOAD,
        LOGIN,
        CREATE,
        MAP,
        GAME_INIT,
        GAME
    }

    //注册gameScene
    export var gameScenes: { [key: string]: ISceneBase } = {};
    export var currentGameScene: ISceneBase;

    export function regGameScene(scene: ISceneBase) {
        gameScenes[scene.name] = scene;
    }
    //切换gameScene
    export function switchGameScene(sceneName: GameSceneEnum | string, param?: any) {
        let scene = gameScenes[sceneName]
        if (scene) {
            if (currentGameScene) {
                currentGameScene.sleep();
            }
            currentGameScene = scene;
            scene.start(param);
        }
        else {
            console.log("没有这个场景" + sceneName);
        }
    }
}