module rf {

    export class ResText extends TEventInteresterDele {
        module: string;
        pro: string;
        skin : TComponent & {txt:TextField}
        constructor(skin: TComponent, module?: string, pro?: string) {
            super(skin);

            if(!module){
                let temp = skin.name.split("_");
                pro = temp[temp.length - 1];
                module = temp[temp.length - 2];
            }

            this.module = module;
            this.pro = pro;
            this.eventInterests = [{ k: module + "_" + pro, v: this.awaken }];
        }




        awaken(event?: EventX) {
            let { module, pro, skin } = this;
            skin.txt.text = (getProperty(pro, module) as number).toFixed(0);
        }

    }
}