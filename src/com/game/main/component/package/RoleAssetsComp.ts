module rf {
    export class RoleAssetsComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Role_assets;

        constructor() {
            super(RES_PERFIX, "ui/package/", "role_assets");
        }

        bindComponents() {
            this.skin = this as any;

            let { skin } = this;
            
            if (skin.stage) {
                this.awaken();
            }

        }

        awaken() {

            let { skin } = this;

            if (!skin) {
                return;
            }

            this.changeGold();
            this.changeDevote();
        }

        @EVT(`${ResConst.RES}.${IResresConst.GOLD}`)
        changeGold() {
            let { skin } = this;
            let { gold } = modelData.res;
            setText(skin.txt_gold, `${gold}`);
        }

        @EVT(`${ResConst.MENPAI}.${IResmenpaiConst.DEVOTE}`)
        changeDevote() {
            let { skin } = this;
            let { devote } = modelData.menpai;
            setText(skin.txt_devote, `${devote}`);
        }
    }
}