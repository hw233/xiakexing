module rf {

    export class ZhandouGuochangComp extends TSourceCompment {

        skin: TSourceCompment & IFightScene_Zhandouguochang;

        _data: IBattleRuntime;

        time: number;

        player1: TSourceCompment;
        player2: TSourceCompment;

        constructor() {
            super(RES_PERFIX, "ui/fightScene/", "zhandouguochang");
        }

        bindComponents() {

            this.skin = this as any;
            this.skin.renderer = new SuperBatchRenderer(this.skin);

            let { skin } = this;

            let sp = new Sprite();
            skin.addChildAt(sp, 0);
            let { graphics } = sp;
            graphics.clear();
            graphics.drawRect(0, 0, stageWidth, stageHeight, 0, 0.7);
            graphics.end();
            sp.mouseEnabled = false;
            sp.mouseChildren = false;

            let player1 = new TouxiangKuangItemComp();
            this.player1 = player1;
            skin.addChild(player1);
            player1.setPos(180, 448);


            let player2 = new TouxiangKuangItemComp();
            this.player2 = player2;
            skin.addChild(player2);
            player2.setPos(460, 448);
        }

        doData() {

            playEffectKeyByAudio("jin_ru_zhan_dou");

            let { player1, player2, _data } = this;
            foreach(_data.roles, (v, k) => {
                if (k == _data.creater) {
                    player1.data = v.info;
                } else {
                    player2.data = v.info;
                }
                return true;
            });

            let time = 800;

            player1.x = player1.x - 500;
            tweenTo({ x: 180 }, time, defaultTimeMixer, player1);
            player2.x = player2.x + 500;
            tweenTo({ x: 460 }, time, defaultTimeMixer, player2);

            callLater.later(() => {
                this.remove();
                facade.toggle(MainMediator, 0);
                facade.toggle(FightMediator, 1);
            }, this, time + 1000);
        }

        _tweenComplete(event: EventX) {

        }
    }

    export class TouxiangKuangItemComp extends TSourceCompment {
        skin: TSourceCompment & IFightScene_Touxaingkuang;

        _data: IBattleHeroInfo;

        touxiang: TTouXiangIcon;

        constructor() {
            super(RES_PERFIX, "ui/fightScene/", "touxaingkuang");
        }

        bindComponents() {

            this.skin = this as any;
            this.skin.renderer = new SuperBatchRenderer(this.skin);

            let { skin } = this;

            let touxiang = new TTouXiangIcon();
            skin.addChild(touxiang);
            this.touxiang = touxiang;
            touxiang.setPos(-60, -58);
        }

        doData() {
            let { _data, touxiang, skin } = this;
            let { name, faces } = _data;

            touxiang.data = faces;

            setText(skin.txt_name, name);
        }
    }
}