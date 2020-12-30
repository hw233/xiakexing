module rf {
    export class TopSystemComp extends TEventInteresterDele {

        skin: TSourceCompment & IMainScene_System_top_bottom;

        bindComponents() {

            let { btn_chengshi, btn_menpai, btn_zizhai } = this.skin;

            btn_chengshi.phaseName = "chengshi";
            btn_menpai.phaseName = "menpai";
            btn_zizhai.phaseName = "zizhai";

            setButtonName(btn_chengshi, "城市", 0, 40);
            setButtonName(btn_menpai, "门派", 0, 40);
            setButtonName(btn_zizhai, "住宅", 0, 40);

            btn_chengshi.on(MouseEventX.CLICK, this.onChengshiClickHandle, this);
            btn_menpai.on(MouseEventX.CLICK, this.onMenpaiClickHandle, this);
            btn_zizhai.on(MouseEventX.CLICK, this.onZizhaiClickHandle, this);
        }

        onChengshiClickHandle() {
            playEffectKeyByAudio();
            let status = modelData.hero.statusDoing;
            if (status == STATUS_DOING.DAZE) {
                gotoMap(1007);
            } else {
                interruptedCurrentStateTriggerEvent();
            }
        }

        onMenpaiClickHandle() {
            playEffectKeyByAudio();

            if (!modelData.menpai.guild) {
                singleton(JiaruMenpaiPopupComp).open();
            } else {

                if (modelData.hero.statusDoing == STATUS_DOING.DAZE) {
                    let menpai = gameConfig.menpai[modelData.menpai.guild];
                    gotoMap(menpai.map);
                } else {
                    interruptedCurrentStateTriggerEvent();
                }
            }
        }

        onZizhaiClickHandle() {
            playEffectKeyByAudio();

            let { hero, map } = modelData;

            if (hero.statusDoing == STATUS_DOING.DAZE) {
                gotoMap(map.guid);
            } else {

                if (hero.map != hero.guid) {
                    interruptedCurrentStateTriggerEvent();
                } else {
                    gotoMap(map.guid);
                }
            }
        }
    }

    export function gotoMap(guid: number) {
        let { map } = modelData.hero;

        if (guid != map) {
            foward(CM_CODE.CM_MapIn, guid);
        } else {
            
            let city = singleton(CityMapComp);

            if (city.stage) {
                city.awaken();
                return;
            }

            changeMainDele(city, singleton(CityCoreComp));
        }
    }
}