module rf {

    export class LoadingPanel extends Mediator {

        panel: Panel & IPackage_LoadingPanel;

        bar_load: TProgressBar;

        _tweener: ITweener;

        cfgTips: string[] = [];

        loadTime: number;

        constructor() {
            super("loading");
            this.setPanel(new Panel("ui/package/", "loadingPanel", RES_PERFIX));
        }

        bindComponents() {

            let { loadpanel } = this.panel;

            foreach(gameConfig.helptext, v => {
                this.cfgTips.push(v.desc);
                return true;
            });

            this.panel.setSize(stageWidth, stageHeight);

            loadpanel.setPos(0, stageHeight - loadpanel.h - 10);

            let { tips, bar_load } = loadpanel;

            setText(tips, "提示:");

            this.bar_load = bar_load as TProgressBar;
        }

        resize(width: number, height: number) {

            let { w, h } = this.panel;

            let y = height - h >> 1;
            let x = width - w >> 1;
            this.panel.setPos(x, y);
        }

        awaken() {

            playBgmKeyByAudio("chuangjue");

            singleton(TBackground).change("bg/loginbg.png");

            this.updateTips();
            time3000.add(this.updateTips, this);

            modelData.hero.panelId = 666;
            this.bar_load.setProgressPercent(0);

            singleton(ResModel).initPreRes();

            this.loadTime = 1500;

            Engine.addTick(() => {
                this.loadTime--;
            }, this);

            // this._tweener = tweenTo({ progress: 1 }, 1500, defaultTimeMixer, this.bar_load);
            // this._tweener.update = () => {
            //     let { progress } = this.bar_load;
            //     this.bar_load.setProgressPercent(progress);
            // }

            // this._tweener.complete = () => {
            //     this._tweener = undefined;
            //     this.resReadly();
            // }
        }

        sleep() {
            time3000.remove(this.updateTips, this);
        }

        updateTips() {
            let { cfgTips, panel } = this;
            let { loadpanel } = panel;
            let rage = Math.random() * cfgTips.length >> 0;
            setText(loadpanel.txt_tips, `${cfgTips[rage]}`);
        }

        @EVT(GameEvent.RES_PRELOAD)
        refresh(event: EventX) {
            let { total, progress } = event.data as LoadTask;
            let jindu = progress / total;
            jindu = Math.min(jindu, 0.9);

            this.bar_load.setProgressPercent(jindu);
        }

        @EVT(GameEvent.RES_READLY)
        checkCompelte() {

            Engine.removeTick(() => {
                this.loadTime--;
            }, this);

            if (this.loadTime) {

                this._tweener = tweenTo({ progress: 1 }, this.loadTime, defaultTimeMixer, this.bar_load);
                this._tweener.update = () => {
                    let { progress } = this.bar_load;
                    this.bar_load.setProgressPercent(progress);
                }

                this._tweener.complete = () => {
                    this._tweener = undefined;
                    this.resReadly();
                }

            } else {
                this.resReadly();
            }
        }

        resReadly() {

            modelData.hero.panelId = 996;

            zhuanchangAction();

            callLater.later(() => {
                facade.toggle(LoadingPanel, 0);
                // switchGameScene(GameSceneEnum.GAME);

                if (!socketData.client_data.hero.name) {
                    switchGameScene(GameSceneEnum.CREATE);
                } else {
                    switchGameScene(GameSceneEnum.GAME);
                }

            }, this, 1000);
        }
    }
}