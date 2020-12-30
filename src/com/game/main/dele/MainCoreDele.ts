module rf {

    // 主场景core部分
    export class MainCoreDele extends TEventInteresterDele {

        skin: TSourceCompment & IMainScene_Core;

        bindComponents() {

            let { skin } = this;
        }

        @EVT(GameEvent.CHANGE_CORE_MODEL)
        changeCoreModel(event: EventX) {
            let model = event.data;
            let { skin } = this;

            let child = skin.childrens.datas[0];
            if (child) {
                skin.removeChild(child);
            }
            if (model) {
                skin.visible = true;
                skin.addChild(model);
                facade.simpleDispatch(GameEvent.CHANGE_TOP_SIZE, false);
            } else {
                skin.visible = false;
                facade.simpleDispatch(GameEvent.CHANGE_TOP_SIZE, true);
            }
        }
    }
}