module rf {

    export class InquirePopup extends BasePopup {

        skin: TSourceCompment & IPopup_Inquire_popup;

        _data: IElementQingbaoRuntime;

        constructor() {
            super(RES_PERFIX, "ui/popup/", "inquire_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { btn_quxiao, btn_queding, btn_gantanhao, txt_value } = skin;

            txt_value.multiline = true;

            setButtonName(btn_quxiao, "取消");
            setButtonName(btn_queding, "愿闻其详");

            btn_gantanhao.on(MouseEventX.CLICK, this.onGantanhaoClickHandle, this);

            btn_queding.on(MouseEventX.CLICK, this.onQuedingClickHandler, this);
            btn_quxiao.on(MouseEventX.CLICK, () => {
                playEffectKeyByAudio();
                this.close();
            }, this);
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_title, txt_value, txt_term } = skin;
            let { name, desc, term, cost } = _data.model;

            setText(txt_title, `${name}`);
            setText(txt_value, `${desc}`);

            let silver = (getLimitValues(cost)[0].maxCount) * Math.round(Math.pow(1.5, _data.timer) - 0.5);

            setText(txt_term, `${term}\\n需要消耗银两${silver}`);
        }

        onQuedingClickHandler() {
            playEffectKeyByAudio();
            let { model, timer } = this._data;

            let { condition, cost, term, eles } = model;

            if (checkLimit(condition)) {
                addPrompt(term);
                return;
            }

            if (checkLimit(cost)) {
                addPrompt("背包银两不足!");
                return;
            }

            foward(CM_CODE.CM_ElementsRoom, { eles, cost, timer });

            this.close();
        }

        onGantanhaoClickHandle() {
            let runtime = {
                title: "打探",
                value: `<font color="#FFCC33">系统角色的地位</font>会影响到情报的级别，旷世珍宝就隐藏在茫茫信息之中，阁下即便拥有丰富的情报关系，但也要注意人情价值的负荷。`,
            } as IPopRuntime;

            singleton(WenziTitlePopup).open(runtime);
        }
    }
}