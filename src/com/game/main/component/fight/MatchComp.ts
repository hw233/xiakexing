module rf {

    export class MatchComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_match_comp;

        _data: IMijing;

        cfgTips: string[] = [];

        time: number;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_match_comp");
        }

        bindComponents() {

            this.skin = this as any;

            foreach(gameConfig.helptext, v => {
                this.cfgTips.push(v.desc);
                return true;
            });

            let { skin } = this;
            let { btn_return, txt_desc, txt_title, bottom } = skin;

            this.setSize(stageWidth, stageHeight);

            bottom.setPos(0, stageHeight - bottom.h - 10);

            let { tips } = bottom;

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/fightBg.png", { x: 0, y: 980, w: 640, h: 10 });
            bg.setSize(stageWidth, stageHeight);
            this.addChildAt(bg, 0);

            setText(txt_title, "正在搜索玩家");
            setText(tips, "提示:");

            txt_desc.multiline = true;
            txt_desc.format.leading = 10;

            setText(btn_return.btnName, "退出");

            btn_return.on(MouseEventX.CLICK, this.closeClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {
            let { skin } = this;

            if (!skin) {
                return
            }

            this.updateTips();
            time3000.add(this.updateTips, this);
        }

        updateTips() {
            let { cfgTips, skin } = this;
            let rage = Math.random() * cfgTips.length >> 0;
            setText(skin.bottom.txt_tips, `${cfgTips[rage]}`);
        }

        doData() {

            let { _data, skin } = this;
            let { txt_name, txt_desc } = skin;

            if (_data) {
                let { name, desc, pipei } = _data;

                setText(txt_name, `${name}`);
                setText(txt_desc, `${desc}`);

                this.time = 0;
                this.addTimer();
                time1000.add(this.addTimer, this);

                this.refresh();
            }
        }

        addTimer() {

            this.time++;

            let { minute, second } = getTimeToS(this.time);
            setText(this.skin.txt_time, `已等待时长  ${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`);
        }

        @EVT(GameEvent.REFRESH_MATCH_ROLE)
        refresh(event?: EventX) {

            let times = event ? event.data : 1;

            let { skin, _data } = this;

            if (!skin) {
                return;
            }

            setText(skin.txt_role, `已找到玩家 (${times}/${_data.player})`);
        }

        closeClickHandle() {

            foward(CM_CODE.CM_MapJoinCancel);
            this.close();
        }

        @EVT(GameEvent.MAP)
        close() {
            this.remove();
        }

        sleep() {
            time1000.remove(this.addTimer, this);
            time3000.remove(this.updateTips, this);
        }
    }
}