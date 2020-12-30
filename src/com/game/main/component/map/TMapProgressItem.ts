module rf {
    export class TMapProgressItem extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Map_progress_item;

        _data: IRoomProgressInfo;

        icon: TSpriteUI;
        bar_room: TProgressBar;

        mouseEnabled = false;
        mouseChildren = false;

        ls: string[];
        lp: number;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "map_progress_item");
        }

        bindComponents() {

            this.skin = this as any;
            let { _icon, bar_room } = this.skin;

            let sprite = new TSpriteUI();
            _icon.addChild(sprite);
            this.icon = sprite;

            this.bar_room = bar_room as TProgressBar;
        }

        doData() {

            let { ls, lp, _data, icon, bar_room } = this;

            let { icon: res, progress } = _data;

            if (res != ls) {
                let [url, key] = res;
                icon.changeSprite(key, url);

                this.ls = res;
            }

            if (progress != lp) {

                // console.log(debug, "bar_room", progress);
                bar_room.setProgressPercent(progress);
                bar_room.param.visible = (bar_room.progress >= 1);
                this.lp = progress;
            }
        }

        removeMe() {
            this.remove();

            if (this["recycle"]) {
                this["recycle"]();
            }
        }
    }
}