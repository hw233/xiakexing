module rf {

    export class SceneGame implements ISceneBase {
        name = GameSceneEnum.GAME;

        start(params?: any): void {

            facade.toggle(MainMediator, 1);

            facade.simpleDispatch(GameEvent.CHECK_FANGCHENMI);

            ROOT.on(EventT.TEXT_LINK, this.onTextLinkClickHandler, this);
        }

        sleep(): void {

        }

        onTextLinkClickHandler(event: EventX) {
            let data = JSON.parse(event.data) as { type: string };
            facade.simpleDispatch(data.type, data);
        }


        @STRING_FORMAT("chat")
        targetforamt(value: string) {
            let values = o1split.split(value, ",");
            return HtmlUtil.renderLink(values[0], values[1], values[2]);
        }

        @STRING_FORMAT("item")
        itemforamt(value: string) {
            let values = o1split.split(value, ",");
            let id = JSON.parse(values[0]);
            let itemConfig = gameConfig.item[id.id];
            return `<font color="${Style.HONG_AN}">${itemConfig.name}</font>`;
        }

        @STRING_FORMAT("element")
        elementforamt(value: string) {
            let values = o1split.split(value, ",");
            let id = JSON.parse(values[0]);
            let config = gameConfig.element[id];
            return config.name;
        }

        @STRING_FORMAT("color")
        colorforamt(value: string) {
            let values = o1split.split(value, ",");
            let name = JSON.parse(values[0]);
            return `${name.id}`;
        }

        @STRING_FORMAT("map")
        mapforamt(value: string) {
            let [name, mapId, roomIndex] = o1split.split(value, ",");
            return HtmlUtil.renderLink(name, JSON.stringify({ type: "map", mapId, roomIndex }), "#3399FF");
        }
    }
}