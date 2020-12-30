module rf {

    export class RoleEnemyComp extends TEventInteresterDele {

        skin: TComponent & IFightScene_Role_top_comp;

        _data: IBattleHeroRuntime;

        flag: number;

        buff: FightBuffStatus;

        touxiang: TTouXiangIcon;
        // face: TAnimation;
        // shouShang: TAnimation;
        xuanYun: TAnimation;

        bar_hp: TProgressBar;
        bar_mp: TProgressBar;
        bar_vigor: TProgressBar;

        ln: string;

        constructor(skin: TComponent, flag: number) {
            super(skin);
            this.flag = flag;
        }

        bindComponents() {

            let { _icon, _buff, bar_hp, bar_mp } = this.skin;

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

            let anima = new TAnimation();
            _icon.addChild(anima);
            anima.setPos(ox, oy); 
            this.xuanYun = anima;

            _icon.on(MouseEventX.CLICK, this.touxingClickHandle, this);

        }

        awaken() {
            this.refreshCall();
            this.refreshTraget();
        }

        doData() {
            let { _data, skin, touxiang, ln } = this;
            let { name, faces } = _data.info;

            touxiang.data = faces;

            if (ln != name) {
                setText(skin._name, name);
                this.ln = name;
            }

            this.refreshTraget();
            this.updateRoleInfo();
            this.changFace();
        }

        @EVT(GameEvent.REFRESH_FIGHT_TRAGET)
        refreshTraget() {

            let { _data, skin, flag } = this;

            if (!_data) {
                return;
            }

            let { roleId } = _data;

            let { target: enemy } = battleModel.current;

            let select = (enemy == roleId) || (flag == 2 && enemy == -1);

            skin._icon.select.visible = select;
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

            let { skin, _data, flag: sf } = this;
            let { stageX, stageY, w, h } = skin._icon;

            let ox = (stageX + (w >> 1));
            let oy = (stageY + (h >> 1));
            let os = 1;
            let or = 180;

            switch (flag) {
                case 1:

                    if (sf == 3) {
                        os = 0.5;
                        or -= offsetAngle;

                    } else if (sf == 4) {
                        os = 0.5;
                        or += offsetAngle;
                    }

                    break;
                case 2:

                    if (sf == 3) {
                        os = 0.5;
                        or = offsetAngle;

                    } else if (sf == 4) {
                        os = 0.5;
                        or = -offsetAngle;
                    }

                    break;
                case 3:

                    if (sf == 2) {
                        os = 0.5;
                        or += offsetAngle;

                    } else if (sf == 4) {
                        os = 0.5;
                        or = -90;
                    }

                    break;
                case 4:
                    if (sf == 2) {
                        os = 0.5;
                        or -= offsetAngle;

                    } else if (sf == 3) {
                        os = 0.5;
                        or = 90;
                    }

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
            let { _data, skin, buff, shouji, ln, xuanYun } = this;

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

            // let ruslut = false;
            // let str = undefined;

            let statusDie = (zhuangtai & ZHUANGTAI.DIE) != 0;
            let statusStupor = (zhuangtai & ZHUANGTAI.STUPOR) != 0;

            let log = "";

            if (statusDie) {
                log += `${info.name}气绝身亡`;
                let die = `${info.name}(死亡)`
                if (ln != die) {
                    setText(skin._name, die);
                    this.ln = die;
                }

                // str = "statusDie";

                playEffectKeyByAudio("ji_sha_di_ren");

                facade.simpleDispatch(GameEvent.CHANGE_TRAGET);

            } else if (statusStupor) {
                log += `${info.name}身受重伤，躺在地上一动不动`;
                let stu = `${info.name}(昏迷)`
                if (ln != stu) {
                    setText(skin._name, stu);
                    this.ln = stu;
                }

                // str = "statusStupor";
            } else {

                normal = true;

                // if (shouji) {
                //     str = "shouJi";
                //     ruslut = true;
                // }

                if (ln != info.name) {
                    setText(skin._name, info.name);
                    this.ln = info.name;
                }
            }

            if (log.length) {
                callLater.add(() => {
                    facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, log);
                }, this);
            }

            let statusVertigo = (zhuangtai & ZHUANGTAI.VERTIGO) != 0;
            if (statusVertigo && normal) {
                // playEffectKeyByAudio("yi_chang_xuan_yun");
                if (animaTion["xuanYun"]) {
                    let [url, key] = animaTion["xuanYun"].res;
                    xuanYun.create(RES_PERFIX, url, key);
                    // skin._icon.addChild(xuanYun);
                }
            } else {
                xuanYun.clear();
                // xuanYun.remove();
            }

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

        touxingClickHandle() {

            let { _data } = this;

            let { roleId } = _data;

            let { target: enemy } = battleModel.current;

            let select = (enemy == roleId);

            if (!select) {
                playEffectKeyByAudio("qie_huan_mu_biao");
                foward(CM_CODE.CM_BattleTarget, roleId);
            }
        }
    }
}