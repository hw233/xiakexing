module rf {

    export var offsetAngle: number = 30;

    export class RoleSelfComp extends TEventInteresterDele {

        skin: TComponent & IFightScene_Role_top_comp;

        _data: IBattleHeroRuntime;

        flag: number;

        buff: FightBuffStatus;

        touxiang: TTouXiangIcon;
        // face: TAnimation;
        // shouShang: TAnimation;
        // xuanYun: TAnimation;

        bar_hp: TProgressBar;
        bar_mp: TProgressBar;
        bar_vigor: TProgressBar;

        constructor(skin: TComponent, flag: number) {
            super(skin);
            this.flag = flag;
        }

        bindComponents() {

            let { _icon, _buff, bar_hp, bar_mp } = this.skin;

            _icon.select.visible = false;

            this.bar_hp = bar_hp as TProgressBar;
            this.bar_mp = bar_mp as TProgressBar;
            // this.bar_vigor = bar_vigor as TProgressBar;

            this.buff = new FightBuffStatus(_buff);

            let { w, h } = _icon;

            let ox = w >> 1;
            let oy = h >> 1;

            let touxiang = new TTouXiangIcon();
            _icon.addChild(touxiang);
            this.touxiang = touxiang;

            // let anima = new TAnimation();
            // _icon.addChild(anima);
            // anima.setPos(ox, oy);
            // this.face = anima;

            // anima = new TAnimation();
            // _icon.addChild(anima);
            // anima.setPos(ox, oy);
            // this.shouShang = anima;

            // anima = new TAnimation();
            // anima.setPos(ox, oy);
            // this.xuanYun = anima;
        }

        awaken() {
            this.refreshCall();
        }

        doData() {
            let { _data, touxiang } = this;

            touxiang.data = _data.info.faces;

            this.updateRoleInfo();
            this.changFace();
        }

        refreshCall() {
            let { skin } = this;
            let { call_1, call_2 } = skin;
            call_1.visible = false;
            call_2.visible = false;
        }

        shouji: boolean;

        updateRoleInfo() {

            let { _data, bar_hp, bar_mp, bar_vigor } = this;
            let { hp, lhp, mhp, mp, lmp, vigor, maxvigor } = _data.info;

            lhp = Math.clamp(Math.ceil(lhp), 0, mhp);
            hp = Math.clamp(Math.ceil(hp), 0, lhp);

            bar_hp.setProgress(hp, mhp);
            bar_hp.setProgressParam(lhp, mhp);
            bar_hp.setProgressText(`${Math.floor(hp)}/${Math.floor(lhp)}`);

            lmp *= 2;
            bar_mp.setProgress(mp, lmp);
            bar_mp.setProgressText(`${Math.floor(mp)}/${Math.floor(lmp)}`);

            // bar_vigor.setProgress(vigor, maxvigor);
            // bar_vigor.setProgressText(`${Math.floor(vigor)}/${Math.floor(maxvigor)}`);
        }

        showText(hp: number, lhp: number, jineng: IJineng, burst: number) {

            let { skin, _data } = this;
            let { stageX, stageY, w, h } = skin._icon;

            let oy = jineng ? 40 : 0;

            let x = (stageX);
            let y = (stageY + (h >> 1) + oy);

            this.shouji = !!hp;

            if (burst > 0) {
                if (jineng) {
                    if (jineng.shoujiSound) {
                        playEffectUrlByAudio(jineng.shoujiSound);
                    }
                } else {
                    playEffectKeyByAudio("bei_ji_zhong_shi");
                }
                // addPrompt(`-${hp}`, jineng ? Style.TEXT_TREM : Style.RED, { x, y } as Point2D);
            } else {
                playEffectKeyByAudio("duo_shan_cheng_gong");
                // addPrompt(`Miss`, Style.TEXT_TREM, { x, y } as Point2D);
            }
        }

        checkChangeText(value: string, color: number | string) {

            let { skin } = this;
            let { stageX, stageY, w, h } = skin._icon;

            let x = (stageX);
            let y = (stageY + (h >> 1));

            addPrompt(value, color, { x, y } as Point2D);
        }

        playSkillAnima(jineng: IJineng, flag: number) {

            if (!jineng) {
                return;
            }

            let { skin, _data } = this;

            let { stageX, stageY, w, h } = skin._icon;

            let ox = (stageX + (w >> 1));
            let oy = (stageY + (h >> 1));
            let os = 1;
            let or = 0;

            switch (flag) {
                case 3:
                    os = 0.5;
                    or = -offsetAngle;
                    break;
                case 4:
                    os = 0.5;
                    or = offsetAngle;
                    break;
            }

            if (jineng.id == "1001") {
                let config = getTypeDefines(TYPE_CONFIG.WUQI_ATTACK_EFFECT);

                let effect = config[`${_data.wuqi}`];
                playAnimation(effect.res, ox, oy, os, or);

            } else if (jineng.anima) {
                playAnimation(jineng.anima, ox, oy, os, or);
            }

        }

        changFace() {
            let { _data, skin, buff, shouji } = this;

            if (!_data) {
                return;
            }

            let { info, zhuangtai } = _data;

            buff.refreshBuff(zhuangtai);

            let { hp, lhp, mhp } = info;
            let animaTion = gameConfig.animation;

            // let statusHurt = lhp < mhp;

            // if (statusHurt) {
            //     if (animaTion["statusHurt"]) {
            //         let [url, key] = animaTion["statusHurt"].res;
            //         shouShang.create(RES_PERFIX, url, key);
            //     }
            // } else {
            //     shouShang.clean();
            // }

            let normal = false;

            let ruslut = false;
            let str = undefined;

            let statusDie = (zhuangtai & ZHUANGTAI.DIE) != 0;
            let statusStupor = (zhuangtai & ZHUANGTAI.STUPOR) != 0;

            let log = "";

            if (statusDie) {
                str = "statusDie";
                // facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, `<font color = "${Style.RED}">你死亡了</font>`);
                log += `你气绝身亡`;
            } else if (statusStupor) {
                // playEffectKeyByAudio("yi_chang_hun_mi");
                str = "statusStupor";
                // facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, `<font color = "${Style.RED}">你昏迷了</font>`);
                log += `你身受重伤，躺在地上一动不动`;
            } else {
                normal = true;

                if (modelData.hero.statusHunger) {
                    str = "statusHunger";
                }

                // if (shouji) {
                //     str = "shouJi";
                //     ruslut = true;
                // }
            }

            if (log.length) {
                callLater.add(() => {
                    facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, log);
                }, this);
            }

            // let statusVertigo = (zhuangtai & ZHUANGTAI.VERTIGO) != 0;
            // if (statusVertigo && normal) {
            //     // playEffectKeyByAudio("yi_chang_xuan_yun");
            //     if (animaTion["xuanYun"]) {
            //         let [url, key] = animaTion["xuanYun"].res;
            //         xuanYun.create(RES_PERFIX, url, key);
            //         skin._icon.addChild(xuanYun);
            //     }
            // } else {
            //     xuanYun.remove();
            // }

            // if (str) {
            //     if (animaTion[str]) {
            //         let [url, key] = animaTion[str].res;

            //         if (ruslut) {
            //             let { stageX, stageY, w, h } = skin._icon;
            //             let ox = (stageX + (w >> 1));
            //             let oy = (stageY + (h >> 1));

            //             face.visible = false;

            //             playAnimation(animaTion[str].res, ox, oy, 1, 0, () => {
            //                 face.visible = true;
            //             });

            //         } else {
            //             face.create(RES_PERFIX, url, key);
            //         }
            //     }
            // } else {
            //     face.clean();
            // }
        }
    }
}