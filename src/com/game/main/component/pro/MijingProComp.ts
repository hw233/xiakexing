module rf {

    export class MijingProComp extends TSourceCompment {

        skin: TSourceCompment & IProScene_Mijing_pro_comp;

        hero: IReshero;

        constructor() {
            super(RES_PERFIX, "ui/proScene/", "mijing_pro_comp");
        }

        bindComponents() {

            this.skin = this as any;
            this.hero = modelData.hero;

            let { skin } = this;

            let { bg } = singleton(MijingTouxiangComp).skin;
            this.setScrollRect(bg.w, bg.h, 1, 1);

            let buff = new ProBuffStatus();
            this.addChild(buff);
            buff.setPos(0, 175);

            if (skin.stage) {
                this.awaken();
            }

        }

        awaken() {

            let { skin } = this;

            if (!skin) {
                return;
            }

            this.changeQianli();
            this.changeBaoshidu();
            this.changeJingli();
            this.changeNeili();
            this.changeXueqi();
            this.changeDengji();

            this.changeGongjili();
            this.changeFangyuli();
            this.changeMingzhongli();
            this.changeShanbili();
            this.changeGongjisudu();
            this.changeHurt();
            this.changeProt();

        }

        setPro(module: string, property: string | number, value: string | number, left: string = "『", right: string = "』", color: number = Style.WHITE) {

            let { skin } = this;

            let config = getProDefine(module, property);

            let text = skin[`txt_${property}`];

            if (text) {

                let name = `<font color="${color}" >${left}${config.name}${right}</font>`;
                setText(text, `${name}${proGap}${value}`, Style.WHITE);
            } else {
                console.error(`txt_${property}`, "命名错误");
            }
        }

        @EVT(`${ResConst.HERO}.${IResproConst.LEVEL}`)
        changeDengji() {

            let { level, exp } = this.hero;
            let have = gameConfig.rank[level].exp;

            this.setPro(ResConst.PRO, IResproConst.LEVEL, `${level}(${numberToM(exp)}/${numberToM(have)})`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HP}`, `${ResConst.HERO}.${IResproConst.LHP}`, `${ResConst.HERO}.${IResproConst.MHP}`)
        changeXueqi() {

            let { hp, lhp, mhp } = this.hero;

            let str = ((lhp / mhp) * 100).toFixed(0);

            this.setPro(ResConst.PRO, IResproConst.HP, `${Math.floor(hp)}/${Math.floor(lhp)}(${str}%)`, "『", "』", Style.HP);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.MP}`, `${ResConst.HERO}.${IResproConst.LMP}`, `${ResConst.HERO}.${IResproConst.MMP}`)
        changeNeili() {

            let { mp, lmp, mmp } = this.hero;

            let str = mmp ? ((Math.floor(lmp) / Math.floor(mmp)) * 100).toFixed(0) : 0;

            this.setPro(ResConst.PRO, IResproConst.MP, `${Math.floor(mp)}/${Math.floor(lmp)}(${str}%)`, "『", "』", Style.MP);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.VIGOR}`)
        changeJingli() {

            let { hero } = this;

            this.setPro(ResConst.PRO, IResproConst.VIGOR, `${Math.floor(hero.vigor)}/${Math.floor(hero.maxvigor)}`, "『", "』", Style.VIGOR);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.HUNGER}`, `${ResConst.HERO}.${IResheroConst.MAXHUNGER}`)
        changeBaoshidu() {

            let { hunger, maxhunger } = this.hero;

            this.setPro(ResConst.HERO, IResheroConst.HUNGER, `${Math.floor(hunger)}/${Math.floor(maxhunger)}`, "『", "』", Style.HUNGER);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.POTENTIAL}`)
        changeQianli() {

            let { hero } = this;

            this.setPro(ResConst.HERO, IResheroConst.POTENTIAL, Math.floor(hero.potential), "『", "』", Style.POTENTIAL);
        }

        //-------------------------------------------------

        @EVT(`${ResConst.HERO}.${IResproConst.ATT}`)
        changeGongjili() {

            this.setPro(ResConst.PRO, IResproConst.ATT, Math.floor(this.hero.att), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.DEF}`)
        changeFangyuli() {

            this.setPro(ResConst.PRO, IResproConst.DEF, Math.floor(this.hero.def), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HIT}`)
        changeMingzhongli() {

            this.setPro(ResConst.PRO, IResproConst.HIT, Math.floor(this.hero.hit), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.AGL}`)
        changeShanbili() {

            this.setPro(ResConst.PRO, IResproConst.AGL, Math.floor(this.hero.agl), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.SPD}`)
        changeGongjisudu() {

            let spd = this.hero.spd.toFixed(1);

            this.setPro(ResConst.PRO, IResproConst.SPD, spd, "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HURT}`)
        changeHurt() {

            this.setPro(ResConst.PRO, IResproConst.HURT, Math.floor(this.hero.hurt), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.PROT}`)
        changeProt() {

            this.setPro(ResConst.PRO, IResproConst.PROT, Math.floor(this.hero.prot), "【", "】");
        }

    }

}