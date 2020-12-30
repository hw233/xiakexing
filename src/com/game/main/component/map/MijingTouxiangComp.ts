module rf {

    export var Mijing_Touxiang_Switch: boolean;

    export class MijingTouxiangComp extends TSourceCompment {

        skin: TSourceCompment & IMapScene_Mijing_touxiang;

        constructor() {
            super(RES_PERFIX, "ui/mapScene/", "mijing_touxiang");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin, parent } = this;

            let { btn_shuxiang, btn_gongfa, bg } = skin;

            let { role } = (parent as MijingMapComp).skin;

            let oh = Main_Top_H - role.h + 55;
            this.setSize(skin.w, oh);
            this.setScrollRect(this.w, this.h);

            bg.setSize(skin.w, this.h - bg._y);
            // bg.setScrollRect(bg.w, bg.h, 1, 1);

            let sp = new SingleImage();
            sp.load(RES_PERFIX, "bg/rolepro_bg.png");
            this.addChildAt(sp, 0);

            setButtonName(btn_shuxiang, "属性30");
            setButtonName(btn_gongfa, "功法30");

            btn_shuxiang.on(MouseEventX.CLICK, this.shuxiangClickHandle, this);
            btn_gongfa.on(MouseEventX.CLICK, this.gongfaClickHandle, this);

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin } = this;
            if (!skin) {
                return;
            }

            Mijing_Touxiang_Switch = true;
            this.shuxiangClickHandle();
        }

        shuxiangClickHandle() {
            playEffectKeyByAudio("qie_huan_xuan_xiang");
            this.selectFunc(1);
        }

        gongfaClickHandle() {
            playEffectKeyByAudio("qie_huan_xuan_xiang");
            this.selectFunc(2);
        }

        selectFunc(type: number) {
            let { skin } = this;
            let { bg, btn_shuxiang, btn_gongfa } = skin;
            let gongfa = singleton(GongfaTopComp);
            let shuxing = singleton(MijingProComp);
            shuxing.remove();
            gongfa.remove();

            btn_shuxiang.select.visible = false;
            btn_gongfa.select.visible = false;

            if (type == 1) {
                bg.addChild(shuxing);
                btn_shuxiang.select.visible = true;
            } else if (type == 2) {
                gongfa.isMijing = true;
                bg.addChild(gongfa);
                btn_gongfa.select.visible = true;
            }
        }

        @EVT(GameEvent.CLOSE_MIJING_TONGXIANG_COMP)
        close() {
            this.remove();
        }

        sleep() {
            Mijing_Touxiang_Switch = false;
        }

    }
}