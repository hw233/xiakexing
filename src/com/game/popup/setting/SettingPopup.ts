module rf {

    export class SettingPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Setting_popup;

        // bar_yinxiao: TProgressBar;
        // bar_bgm: TProgressBar;

        // _offsetX = 195;

        effectBool: boolean;
        bgmBool: boolean;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "setting_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            // let { txt_title, yinxiao, bgm, bar_yinxiao, bar_bgm, btn_bgm_laba, btn_yinxiao_laba, w } = skin;
            let { txt_title, btn_effect, btn_bgm, btn_exit } = skin;

            // this._offsetX = ((stageWidth - w) >> 1) + 85;

            setText(txt_title, "设置");

            // bar_yinxiao.mouseChildren = true;
            // bar_yinxiao.mouseEnabled = true;
            // bar_bgm.mouseChildren = true;
            // bar_bgm.mouseEnabled = true;

            // this.bar_yinxiao = bar_yinxiao as TProgressBar;
            // this.bar_bgm = bar_bgm as TProgressBar;

            // bar_yinxiao.on(MouseEventX.MouseMove, this.onYinxiaoMoveHander, this);
            // bar_yinxiao.on(MouseEventX.MouseUp, this.onYinxiaoUpHander, this);

            // bar_bgm.on(MouseEventX.MouseMove, this.onBgmMoveHander, this);
            // bar_bgm.on(MouseEventX.MouseUp, this.onBgmUpHander, this);

            // btn_yinxiao_laba.on(MouseEventX.CLICK, this.onYinxiaoLabaClickHander, this);
            // btn_bgm_laba.on(MouseEventX.CLICK, this.onBgmLabaClickHander, this);

            btn_effect.on(MouseEventX.CLICK, this.onEffectClickHande, this);
            btn_bgm.on(MouseEventX.CLICK, this.onBgmClickHande, this);

            setButtonName(btn_exit, "返回登录");

            btn_exit.on(MouseEventX.CLICK, this.onExitClickHande, this);
        }

        doData() {
            super.doData();
            let { yinxiao, bgm } = modelData.setting;

            // bar_yinxiao.setProgressPercent(yinxiao);
            // bar_bgm.setProgressPercent(bgm);

            changeEffectVol(yinxiao);
            changeBgmVol(bgm);

            this.effectBool = (yinxiao > 0);
            this.bgmBool = (bgm > 0);

            this.refreshEffect();
            this.refreshBgm();

        }

        onEffectClickHande() {
            playEffectKeyByAudio();

            this.effectBool = !this.effectBool;

            let vol = this.effectBool ? 1 : 0;
            changeEffectVol(vol);
            foward(CM_CODE.CM_Sound, [SOUND_TYPE.Effect, vol]);

            this.refreshEffect();
        }

        onBgmClickHande() {

            playEffectKeyByAudio();

            this.bgmBool = !this.bgmBool;

            let vol = this.bgmBool ? 1 : 0;
            changeBgmVol(vol);
            foward(CM_CODE.CM_Sound, [SOUND_TYPE.Bgm, vol]);

            this.refreshBgm();
        }

        refreshEffect() {
            let { skin, effectBool } = this;
            skin.btn_effect.select.visible = !effectBool;
            setButtonName(skin.btn_effect, effectBool ? "音效开" : "音效关");
        }

        refreshBgm() {
            let { skin, bgmBool } = this;
            skin.btn_bgm.select.visible = !bgmBool;
            setButtonName(skin.btn_bgm, bgmBool ? "音乐开" : "音乐关");
        }

        onExitClickHande(){
            playEffectKeyByAudio();

            this.close();

            let runtime = {
                title: "系统提示",
                value: "确定返回登陆界面吗？",
                rightEvt: () => {
                    window.location.reload();
                }
            } as IPopRuntime;

            singleton(WenziTitleSelectPopup).open(runtime);
        }

        // onYinxiaoUpHander() {
        //     let { bar_yinxiao } = this;
        //     let { progress } = bar_yinxiao;
        //     foward(CM_CODE.CM_Sound, [SOUND_TYPE.Effect, progress]);
        // }

        // onBgmUpHander() {
        //     let { bar_bgm } = this;
        //     let { progress } = bar_bgm;
        //     foward(CM_CODE.CM_Sound, [SOUND_TYPE.Bgm, progress]);
        // }

        // onYinxiaoMoveHander(event: EventX) {
        //     let data = event.data as IMouseEventData;

        //     let { bar_yinxiao, _offsetX } = this;
        //     let { btn_yinxiao_laba } = this.skin;
        //     let { progress, barWidth, w } = bar_yinxiao;

        //     progress = Math.round(((data.x - _offsetX) / barWidth) * 10) * 0.1;
        //     // progress = ((data.x - _offsetX) / barWidth);
        //     progress = Math.clamp(progress, 0, 1);

        //     bar_yinxiao.setProgressPercent(progress);

        //     changeEffectVol(progress);

        //     let ruslut = progress > 0;
        //     btn_yinxiao_laba.jinzhi.visible = !ruslut;

        // }

        // onBgmMoveHander(event: EventX) {

        //     let data = event.data as IMouseEventData;

        //     let { bar_bgm, _offsetX } = this;
        //     let { btn_bgm_laba } = this.skin;
        //     let { progress, barWidth } = bar_bgm;

        //     progress = Math.round(((data.x - _offsetX) / barWidth) * 10) * 0.1;
        //     // progress = ((data.x - _offsetX) / barWidth);
        //     progress = Math.clamp(progress, 0, 1);

        //     bar_bgm.setProgressPercent(progress);

        //     changeBgmVol(progress);

        //     let ruslut = progress > 0;
        //     btn_bgm_laba.jinzhi.visible = !ruslut;
        // }

        // onYinxiaoLabaClickHander() {
        //     let { skin, bar_yinxiao } = this;
        //     let { btn_yinxiao_laba } = skin;

        //     let progress = !btn_yinxiao_laba.jinzhi._visible ? 0 : 1;

        //     bar_yinxiao.setProgressPercent(progress);

        //     btn_yinxiao_laba.jinzhi.visible = !progress;

        //     changeEffectVol(progress);

        //     foward(CM_CODE.CM_Sound, [SOUND_TYPE.Effect, progress]);

        // }

        // onBgmLabaClickHander() {
        //     let { skin, bar_bgm } = this;
        //     let { btn_bgm_laba } = skin;

        //     let progress = !btn_bgm_laba.jinzhi._visible ? 0 : 1;

        //     bar_bgm.setProgressPercent(progress);

        //     btn_bgm_laba.jinzhi.visible = !progress;

        //     changeBgmVol(progress);

        //     foward(CM_CODE.CM_Sound, [SOUND_TYPE.Bgm, progress]);
        // }
    }
}