module rf {
    export class XinshouJiaruMenpaiPopup extends BasePopup {

        skin: TSourceCompment & IPopup_Wenzi_title_select_popup;

        _data: { elementId: number, menpaiId: number }

        showEffect = false;

        ed: MiniDispatcher = new MiniDispatcher();

        constructor() {
            super(RES_PERFIX, "ui/popup/", "wenzi_title_select_popup");
        }

        bindComponents() {
            super.bindComponents();

            let { skin } = this;
            let { btn_queding, btn_quxiao } = skin;

            setButtonName(btn_queding, "加入");
            setButtonName(btn_quxiao, "取消");

            btn_queding.on(MouseEventX.CLICK, this.onQuedingClickHandle, this);
            btn_quxiao.on(MouseEventX.CLICK, this.close, this);
        }

        open(data?: any, traget?: any) {
            super.open(data, traget);
            return this.ed;
        }

        doData() {
            super.doData();

            let { skin, _data } = this;
            let { txt_title, txt_value } = skin;

            let menpai = gameConfig.menpai[_data.menpaiId]

            setText(txt_title, menpai.name);
            setText(txt_value, `是否加入${menpai.name}`);
        }

        close() {
            this.requestMaster = false;
            super.close();
        }

        sleep() {
            super.sleep();
            if (this.requestMaster == false) {
                this.ed.simpleDispatch(EventT.COMPLETE);
            }
        }

        requestMaster = false;

        onQuedingClickHandle() {
            let menpai = gameConfig.menpai[this._data.menpaiId];
            let roles = mapModel.currentRoles;
            let role = undefined;
            foreach(roles, (v, k) => {
                if (v.elementId == this._data.elementId) {
                    role = v;
                    return false;
                }
                return true;
            });
            
            foward(CM_CODE.CM_ElementAct, { guid: role.guid, act: "master" });
            foward(CM_CODE.CM_JoinSect, menpai.id);

            if (menpai.id == MEN_PAI_TYPE.DIAN_CANG) {

                playEffectKeyByAudio("jiarumenpai_diancang");
            } else {

                playEffectKeyByAudio("jiarumenpai_chaoting");
            }


            this.requestMaster = true;

            facade.on("menpai.master", this.heroMaster, this)

            super.close();

        }

        heroMaster(event: EventX) {
            facade.off("menpai.master", this.heroMaster, this)
            this.ed.simpleDispatch(EventT.COMPLETE);
        }
    }
}
