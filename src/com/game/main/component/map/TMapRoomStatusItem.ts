module rf {

    export enum RoomStatus {
        escape,
        fight,
        nearperson,
        neardeadperson
    }

    export class TMapRoomStatusItem extends TSourceCompment {
        skin: TSourceCompment & IMapScene_Map_status_item;

        _data: RoomStatus;

        icon: TSpriteUI;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_status_item");
        }

        bindComponents() {

            this.skin = this as any;

            let img = new TSpriteUI();
            this.addChild(img);
            this.icon = img;
        }

        doData() {
            let { _data, icon } = this;

            if (_data != undefined) {
                let config = getTypeDefines(TYPE_CONFIG.MAPSTATUS)[_data];

                if (config) {
                    icon.changeSprite(config.name);
                }

            } else {
                icon.cleanAll();
            }
        }
    }
}