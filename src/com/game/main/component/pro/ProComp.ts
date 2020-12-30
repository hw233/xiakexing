module rf {

    export var proGap = " ";

    export class ProComp extends TSourceCompment {

        skin: TSourceCompment & IProScene_Pro_comp;

        touxiang: TTouXiangIcon;
        effect: TAnimation;
        shouShang: TAnimation;

        constructor() {
            super(RES_PERFIX, "ui/proScene/", "pro_comp");
        }

        bindComponents() {

            this.skin = this as any;

            let { skin } = this;
            let oh = Main_Top_H + Main_Core_H;

            this.setScrollRect(skin.w, oh, 0, 1);

            let { _icon, txt_triple } = skin;

            txt_triple.multiline = true;

            let bg = new SingleImage();
            bg.load(RES_PERFIX, "bg/rolepro_bg.png", { x: 0, y: 500, w: 640, h: 10 });
            bg.setSize(this.w, this.h + 100);
            skin.addChildAt(bg, 0);

            let touxiang = new TTouXiangIcon();
            _icon.addChild(touxiang);
            this.touxiang = touxiang;
            touxiang.setPos(10, 0);

            let effect = new TAnimation();
            _icon.addChild(effect);
            effect.setPos(_icon.w >> 1, _icon.h >> 1);
            this.effect = effect;

            effect = new TAnimation();
            _icon.addChild(effect);
            effect.setPos(_icon.w >> 1, _icon.h >> 1);
            this.shouShang = effect;

            let buff = new ProBuffStatus();
            this.addChild(buff);
            buff.setPos(0, 375);

            forarr(skin.childrens.datas, v => {

                let { name } = v;
                if (name && name.match("btn_")) {

                    let pro = name.substr(4, name.length);

                    v.on(MouseEventX.CLICK, (e: EventX) => {
                        this.clickPro(ResConst.PRO, pro);
                    }, this);
                }

                return true;
            });

            if (skin.stage) {
                this.awaken();
            }

        }

        awaken() {

            let { skin } = this;

            if (!skin) {
                return;
            }

            this.changIcon();
            this.changEffect();
            this.changeTriple();
            this.changeSex();
            this.changeMenpai();
            this.changeShifu();
            this.changeQianli();
            this.changeBaoshidu();
            this.changeJingli();
            this.changeNeili();
            this.changeXueqi();
            this.changeDengji();
            this.changeNianji();

            this.changeBili();
            this.changeWuxing();
            this.changeShenfa();
            this.changeGengu();
            this.changeFuyuan();
            this.changeLingxing();

            this.changeGongjili();
            this.changeFangyuli();
            this.changeMingzhongli();
            this.changeShanbili();
            this.changeGongjisudu();
            this.changeHurt();
            this.changeProt();

            this.changeTime();
            this.changeEscape();
            this.changeDazzle();
            this.changeKill();
            this.changeMove();
            this.changeItem();
        }

        clickPro(module: string, property: string | number) {

            let config = getProDefine(module, property);

            if (config) {
                let { name, desc } = config
                singleton(WenziTitlePopup).open({ title: name, value: desc }, this);
            }
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

        //-------------------------------------------------

        @EVT(`${ResConst.HERO}.${IResheroConst.FACE_BG}`)
        changIcon() {
            let { touxiang } = this;
            let { face_bg, face_tou, face_fa, face_mei, face_yan, face_hu } = modelData.hero;
            touxiang.data = { face_bg, face_tou, face_fa, face_mei, face_yan, face_hu } as IFaceData;
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.STATUSHURT}`, `${ResConst.HERO}.${IResheroConst.STATUSHUNGER}`, `${ResConst.HERO}.${IResproConst.STATUSSTUPOR}`, `${ResConst.HERO}.${IResheroConst.STATUSDIE}`)
        changEffect() {
            // let { hero, effect, shouShang } = this;
            // let { statusHurt, statusHunger, statusStupor, statusDie } = hero;

            // let animaTion = gameConfig.animation;

            // if (statusHurt) {
            //     if (animaTion["statusHurt"]) {
            //         let [url, key] = animaTion["statusHurt"].res;
            //         shouShang.create(RES_PERFIX, url, key);
            //     }
            // } else {
            //     shouShang.clean();
            // }

            // let str = undefined;

            // if (statusHunger) {
            //     str = "statusHunger";
            // }
            // if (statusStupor) {
            //     str = "statusStupor";
            // }
            // if (statusDie) {
            //     str = "statusDie";
            // }

            // if (str) {
            //     if (animaTion[str]) {
            //         let [url, key] = animaTion[str].res;
            //         effect.create(RES_PERFIX, url, key);
            //     }
            // } else {
            //     effect.clean();
            // }
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.NAME}`)
        changeTriple() {
            let { skin } = this;
            let { title, name } = modelData.hero;
            let { guild, branch, diwei } = modelData.menpai;

            let str = "";

            if (title || guild) {

                let menpai = menpaiModel.menpaiconfig[guild][branch][diwei];

                str += title ? `<font color="${Style.PROTITLE}" >【${title}】 </font>` : "";
                str += menpai ? `<font color="${Style.WHITE}" >【${menpai.title}】</font>` : "";
                str += "\\n";
            }

            str += `<font color="${Style.PRONAME}" >${name}</font>`;

            setText(skin.txt_triple, `${str}`);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.SEX}`)
        changeSex() {

            let { sex } = modelData.hero;

            let config = getTypeDefines(TYPE_CONFIG.SEX);

            let str = "无";

            if (config[sex]) {
                str = config[sex].name;
            }

            this.setPro(ResConst.HERO, IResheroConst.SEX, str);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.AGE}`)
        changeNianji() {

            this.setPro(ResConst.HERO, IResproConst.AGE, `${modelData.hero.age}岁`);
        }

        @EVT(`${ResConst.MENPAI}.${IResmenpaiConst.GUILD}`)
        changeMenpai() {

            let { guild } = modelData.menpai;

            let str = "暂无门派";

            if (guild != 0) {
                str = gameConfig.menpai[guild].name;
            }

            this.setPro(ResConst.MENPAI, IResmenpaiConst.GUILD, str);
        }

        @EVT(`${ResConst.MENPAI}.${IResmenpaiConst.MASTER}`)
        changeShifu() {

            let { master } = modelData.menpai;

            let str = "暂无师傅";

            if (master) {
                let element = master as any;

                str = gameConfig.element[element].name;
            }

            this.setPro(ResConst.MENPAI, IResmenpaiConst.MASTER, str);
        }

        //-------------------------------------------------

        @EVT(`${ResConst.HERO}.${IResproConst.LEVEL}`)
        changeDengji() {

            let { level, exp } = modelData.hero;
            let have = gameConfig.rank[level].exp;

            this.setPro(ResConst.PRO, IResproConst.LEVEL, `${level}(${numberToM(exp)}/${numberToM(have)})`);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HP}`, `${ResConst.HERO}.${IResproConst.LHP}`, `${ResConst.HERO}.${IResproConst.MHP}`)
        changeXueqi() {

            let { hp, lhp, mhp } = modelData.hero;

            let str = ((lhp / mhp) * 100).toFixed(0);

            this.setPro(ResConst.PRO, IResproConst.HP, `${Math.floor(hp)}/${Math.floor(lhp)}(${str}%)`, "『", "』", Style.HP);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.MP}`, `${ResConst.HERO}.${IResproConst.LMP}`, `${ResConst.HERO}.${IResproConst.MMP}`)
        changeNeili() {

            let { mp, lmp, mmp } = modelData.hero;

            let str = mmp ? ((Math.floor(lmp) / Math.floor(mmp)) * 100).toFixed(0) : 0;

            this.setPro(ResConst.PRO, IResproConst.MP, `${Math.floor(mp)}/${Math.floor(lmp)}(${str}%)`, "『", "』", Style.MP);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.VIGOR}`)
        changeJingli() {

            let { vigor, maxvigor } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.VIGOR, `${Math.floor(vigor)}/${Math.floor(maxvigor)}`, "『", "』", Style.VIGOR);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.HUNGER}`, `${ResConst.HERO}.${IResheroConst.MAXHUNGER}`)
        changeBaoshidu() {

            let { hunger, maxhunger } = modelData.hero;

            this.setPro(ResConst.HERO, IResheroConst.HUNGER, `${Math.floor(hunger)}/${Math.floor(maxhunger)}`, "『", "』", Style.HUNGER);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.POTENTIAL}`)
        changeQianli() {

            this.setPro(ResConst.HERO, IResheroConst.POTENTIAL, Math.floor(modelData.hero.potential), "『", "』", Style.POTENTIAL);
        }

        //-------------------------------------------------

        @EVT(`${ResConst.HERO}.${IResproConst.STR}`)
        changeBili() {

            let { str, basestr } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.STR, Math.floor(str + basestr), "【", "】", Style.STR);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.LER}`)
        changeWuxing() {

            let { ler, baseler } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.LER, Math.floor(ler + baseler), "【", "】", Style.LER);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.DEX}`)
        changeShenfa() {

            let { dex, basedex } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.DEX, Math.floor(dex + basedex), "【", "】", Style.DEX);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.CON}`)
        changeGengu() {

            let { con, basecon } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.CON, Math.floor(con + basecon), "【", "】", Style.CON);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.LUCK}`)
        changeFuyuan() {

            this.setPro(ResConst.PRO, IResproConst.LUCK, Math.floor(modelData.hero.luck), "【", "】", Style.LUCK);
        }

        @EVT(`${ResConst.HERO}.${IResproConst.PER}`)
        changeLingxing() {

            let { per, baseper } = modelData.hero;

            this.setPro(ResConst.PRO, IResproConst.PER, Math.floor(per + baseper), "【", "】", Style.PER);
        }

        //-------------------------------------------------

        @EVT(`${ResConst.HERO}.${IResproConst.ATT}`)
        changeGongjili() {

            this.setPro(ResConst.PRO, IResproConst.ATT, Math.floor(modelData.hero.att), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.DEF}`)
        changeFangyuli() {

            this.setPro(ResConst.PRO, IResproConst.DEF, Math.floor(modelData.hero.def), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HIT}`)
        changeMingzhongli() {

            this.setPro(ResConst.PRO, IResproConst.HIT, Math.floor(modelData.hero.hit), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.AGL}`)
        changeShanbili() {

            this.setPro(ResConst.PRO, IResproConst.AGL, Math.floor(modelData.hero.agl), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.SPD}`)
        changeGongjisudu() {

            let spd = modelData.hero.spd.toFixed(1);

            this.setPro(ResConst.PRO, IResproConst.SPD, spd, "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.HURT}`)
        changeHurt() {

            this.setPro(ResConst.PRO, IResproConst.HURT, Math.floor(modelData.hero.hurt), "【", "】");
        }

        @EVT(`${ResConst.HERO}.${IResproConst.PROT}`)
        changeProt() {

            this.setPro(ResConst.PRO, IResproConst.PROT, Math.floor(modelData.hero.prot), "【", "】");
        }

        //-------------------------------------------------

        @EVT(`${ResConst.RES}.${IResresConst.TIME}`)
        changeTime() {

            let { onlineTime } = modelData.res;
            let { hour, minute } = getTimeLength(onlineTime);
            this.setPro(ResConst.RES, IResresConst.TIME, `${hour}h${minute}m`);
        }

        @EVT(`${ResConst.RES}.${IResresConst.ESCAPE}`)
        changeEscape() {

            let { escape } = modelData.res;

            this.setPro(ResConst.RES, IResresConst.ESCAPE, Math.floor(escape));
        }

        @EVT(`${ResConst.RES}.${IResresConst.DAZZLE}`)
        changeDazzle() {

            let { dazzle } = modelData.res;

            this.setPro(ResConst.RES, IResresConst.DAZZLE, Math.floor(dazzle));
        }


        @EVT(`${ResConst.RES}.${IResresConst.KILLNUMBER}`)
        changeKill() {

            let { killnumber } = modelData.res;

            this.setPro(ResConst.RES, IResresConst.KILLNUMBER, Math.floor(killnumber));
        }

        @EVT(`${ResConst.RES}.${IResresConst.MOVE}`)
        changeMove() {

            let { move } = modelData.res;

            this.setPro(ResConst.RES, IResresConst.MOVE, Math.floor(move));
        }

        @EVT(`${ResConst.RES}.${IResresConst.ARTNUMBER}`)
        changeItem() {

            let { artnumber } = modelData.res;

            this.setPro(ResConst.RES, IResresConst.ARTNUMBER, Math.floor(artnumber));
        }

    }

}