module rf {
    // 主场景top部分
    export class MainTopDele extends TEventInteresterDele {

        skin: TComponent & IMainScene_Top;

        bindComponents() {
            this.skin.hitArea.allWays = true;
        }
        
    }
}