module rf {

    export interface IFightSkill {

        skillid: number | string,
        jineng: IJineng
    }

    @MVC("FightMediator")
    export class FightMediator extends Mediator {

        panel: Panel & IFightScene_FightScene;

        role_1: RoleSelfComp;
        role_2: RoleEnemyComp;
        role_3: RoleEnemyComp;
        role_4: RoleEnemyComp;

        itemList: List;//快捷道具
        skillList: List;//技能

        autoBool: boolean;
        attackJineng: string;
        jinengIndex: number = 0;

        constructor() {
            super("fight");
            this.setPanel(new Panel("ui/fightScene/", "fightScene", RES_PERFIX));
            // this.mediatorParams.resizeable = true;
            this.panel.parentParms.index = undefined;
        }

        // resize(width: number, height: number) {

        //     let { title, top, bottom, core } = this.panel;

        //     let oh = top.h + bottom.h + core.h;
        //     title.setSize(title.w, height - oh);

        //     top.y = title.h;
        //     core.y = top.y + top.h;
        //     bottom.y = core.y + core.h;

        //     // this.resizeRolePos();
        // }

        //重置人物位置
        // resizeRolePos() {
        //     let { panel } = this;

        //     let { bottom, top, left, right, w: ow, h: oh } = panel.top;

        //     bottom.setPos(ow - bottom.w >> 1, oh - bottom.h);
        //     top.setPos(ow - top.w >> 1, 0);
        //     left.setPos(0, (oh - left.h) >> 1);
        //     right.setPos(ow - right.w, (oh - right.h) >> 1);
        // }

        bindComponents() {
            let { panel } = this;
            let { source, message, top, bottom } = panel;

            panel.hitArea.allWays = true;

            // let fightBg = new SingleImage();
            // fightBg.load(RES_PERFIX, "bg/fightBg.png");
            // fightBg.setSize(stageWidth, stageHeight);
            // this.panel.addChildAt(fightBg, 0);

            // let oh = top.h + bottom.h;
            // title.setSize(title.w, stageHeight - oh);

            // top.y = title.h;
            // bottom.y = top.y + top.h;

            // let bg = new SingleImage();
            // title.addChildAt(bg, 0);
            // bg.load(RES_PERFIX, "bg/chatBg2.png", { x: 0, y: 50, w: 640, h: 10 });
            // bg.setSize(title.w, title.h - 30);

            let oh = top.h + bottom.h;
            message.setSize(message.w, stageHeight - oh);

            let bg = new SingleImage();
            message.addChildAt(bg, 0);
            bg.load(RES_PERFIX, "bg/msgBg2.png", { x: 0, y: 30, w: 640, h: 10 });
            bg.setSize(message.w, message.h);

            let info = singleton(FightMessageListComp);
            message.addChild(info);
            info.data = { x: 30, y: 30, w: 590, h: message.h - 50 };

            // let message = singleton(FightMessageListComp);
            // title.rizhi.addChild(message);
            // // message.setPos(30, 50);
            // // message.setSize(590, title.h - 130);
            // message.offSetY = title.h - 130;
            // title.rizhi.setScrollRect(590, title.h - 130);

            let self = new RoleSelfComp(top.bottom, 1);
            this.role_1 = self;

            let enemy = new RoleEnemyComp(top.top, 2);
            this.role_2 = enemy;

            enemy = new RoleEnemyComp(top.left, 3);
            this.role_3 = enemy;

            enemy = new RoleEnemyComp(top.right, 4);
            this.role_4 = enemy;

            let list = new List(source, QuickItem, 99, 99, 5, 0, false);
            top.quickcomp.addChild(list);
            this.itemList = list;
            list.setPos(10, 10);

            list = new List(source, FightSkillItem, 163, 56, 10, 5, true, 3);
            bottom.addChild(list);
            this.skillList = list;
            list.setPos(65, 40);

            let { btn_auto, btn_regain, btn_back, btn_exit } = top;

            btn_regain["shadow"].visible = false;
            btn_back["shadow"].visible = false;

            setButtonName(btn_auto, "自动");
            setButtonName(btn_regain, "恢复");
            setButtonName(btn_back, "逃跑");
            setButtonName(btn_exit, "退出战斗");

            btn_auto.on(MouseEventX.CLICK, this.onAutoClickHandle, this)

            btn_regain.on(MouseEventX.CLICK, this.regainClickHadle, this);
            btn_back.on(MouseEventX.CLICK, this.backClickHadle, this);
            btn_exit.on(MouseEventX.CLICK, this.exitClickHadle, this);

        }

        awaken() {

            singleton(TBackground).change("bg/fightBg.png");

            facade.simpleDispatch(GameEvent.CHECK_ROOM_EXIT, true);
            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);
            facade.simpleDispatch(GameEvent.CHECK_BUTTON, checkData);

            this.checkExitBtn();
            this.regainCD();
            this.backCD();

            this.refreshRoleData();

            let { itemList, skillList } = this;

            singleton(FightMessageListComp).clearMessage();

            itemList.displayList(modelData.item.quickSlot);

            let list = skillModel.getCurrentJineng();
            skillList.displayList(list);

            this.checkSkill();
            time1000.add(this.checkSkill, this);

            this.refreshSkill();

            playBgmKeyByAudio("zhandou");

            modelData.hero.panelId = 3;

            let { autoSkill } = modelData.setting;
            this.autoBool = (autoSkill > 0);
            this.panel.top.btn_auto.select.visible = this.autoBool;

            this.attackJineng = skillModel.getAttack();

            getGTimer(100).add(this.attack, this);
        }

        sleep() {

            clearAnimations();

            facade.simpleDispatch(GameEvent.CHECK_ROOM_EXIT);

            time1000.remove(this.checkSkill, this);
            getGTimer(100).remove(this.attack, this);
        }

        getComp(guid: number) {
            for (let i = 1; i <= 4; i++) {
                let role: RoleSelfComp | RoleEnemyComp = this[`role_${i}`];
                let _data = role._data;
                if (_data && _data.roleId == guid) {
                    return role;
                }
            }
            return undefined;
        }

        @EVT(GameEvent.CHANGE_TRAGET)
        changeTraget(event: EventX) {

            let traget = undefined;

            for (let i = 2; i <= 4; i++) {
                let role: RoleSelfComp | RoleEnemyComp = this[`role_${i}`];
                let _data = role._data;
                if (_data && (_data.zhuangtai & ZHUANGTAI.DIE) == 0) {
                    traget = _data.roleId;
                    break;
                }
            }

            if (traget) {
                let { target: enemy } = battleModel.current;

                if (enemy != traget) {
                    foward(CM_CODE.CM_BattleTarget, traget);
                }
            }
        }

        @EVT(GameEvent.UPDATE_BATTLE_FACE)
        retfreshFace(event: EventX) {
            let role = this.getComp(event.data);
            if (role) {
                role.changFace();
            }
        }

        @EVT(GameEvent.REFRESH_FIGHT_DATA)
        refreshRoles(event: EventX) {

            let { info, shows } = event.data as IBattleRuntime;

            if (!info) {
                return;
            }

            let { roleId, target, hits, jineng: id, item, type, bloods } = info;

            let fightlog = gameConfig.fightlog;

            let attack = this.getComp(roleId);
            let role = this.getComp(target);
            let jineng = gameConfig.jineng[id];

            attack.playSkillAnima(jineng, role.flag);

            let { _data: ad, flag: af } = attack;
            let sName = "你";
            if (af != 1) {
                sName = ad.info.name;
            }

            let { _data: rd, flag: rf } = role;
            let tName = "你";
            if (rf != 1) {
                tName = rd.info.name;
            }

            if (hits && hits.length) {
                let { hp, lhp, burst } = hits[0];
                role.showText(hp, lhp, jineng, burst);
                role.updateRoleInfo();

                if (burst <= 0) {
                    let log = "";
                    let i = Math.random2(1, 3) >> 0;
                    log += fightlog[`dodge${i}`].desc;
                    log = log.replace(/player1/g, sName).replace(/player2/g, tName);

                    callLater.add(() => {
                        facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, log);
                    }, this);
                }
            }

            if (bloods && bloods.length) {

                forarr(bloods, v => {
                    let blood = this.getComp(v.guid);

                    if (blood) {

                        if (type) {
                            let { skin, _data } = blood;
                            let { stageX, stageY, w, h } = skin._icon;
                            let ox = (stageX + (w >> 1));
                            let oy = (stageY + (h >> 1));

                            let log = "";

                            if (type == 1) {
                                playAnimation(["animation/item", "hp"], ox, oy);

                                log += fightlog[`recovery`].desc;
                                log = log.replace(/player1/g, _data.info.name);

                            } else if (type == 2) {
                                let config = gameConfig.item[item];
                                if (config && config.anima) {
                                    playAnimation(config.anima, ox, oy);
                                }

                                log += config.log;
                                log = log.replace(/player1/g, _data.info.name);
                            }

                            if (log.length) {
                                callLater.add(() => {
                                    facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, log);
                                }, this);
                            }
                        }

                        blood.updateRoleInfo();
                    }

                    return true;
                });

                if (target == roleId) {
                    return;
                }

                if (shows && shows.length) {

                    forarr(shows, v => {
                        let { guid, opera, value, color } = v;
                        let show = this.getComp(guid);
                        show.checkChangeText(`${opera}${value}`, color);

                        if (opera == "-") {

                            let log = "";

                            log += jineng.log;

                            let i = Math.random2(1, 3) >> 0;
                            log += fightlog[`hit${i}`].desc;

                            let r = (rd.info.hp / rd.info.mhp) * 100 >> 0;

                            if (r > 0) {
                                foreach(cfgData.playerStatus as any, (o, m) => {
                                    m = m as number;
                                    if (m >= r) {
                                        log += ` ${o}`;
                                        return false;
                                    }
                                    return true;
                                });
                            }

                            // `<font color = "${Style.BLACK}">${sName}对${tName}造成了${value}伤害</font>`

                            log = log.replace(/player1/g, sName).replace(/player2/g, tName).replace(/att/g, `${value}`);

                            callLater.add(() => {
                                facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, log);
                            }, this);

                        }

                        return true;
                    });
                }
            }

            this.checkExitBtn();
        }

        checkExitBtn() {
            let rusult = battleModel.checkExitBatle();
            let { top } = this.panel;
            let { btn_exit, btn_back } = top;

            btn_exit.visible = rusult;
            btn_back.visible = !rusult;
        }

        @CodeFunc()
        static getFightSkill(propertys: [number]) {

            let [index] = propertys;

            let list = singleton(FightMediator).skillList;

            return list.childrens.datas[index];
        }

        attack() {
            if (modelData.hero.statusStupor) {
                return;
            }

            if (this.attackJineng) {
                let { attackCD } = modelData.cd;

                let time = attackCD - getServerDate();

                if (time <= 0) {
                    foward(CM_CODE.CM_BattleAttack, [modelData.skill.nowWuQiSkillId, this.attackJineng]);
                }
            }

            if (!this.autoBool) {
                return;
            }

            let { skillList } = this;

            let { runtimes, nowId } = modelData.automaticSkill;
            let runtime = runtimes[nowId];

            if (this.jinengIndex >= 6) {
                this.jinengIndex = 1;
            }

            while (!runtime[`jineng${this.jinengIndex}`] && this.jinengIndex < 6) {
                this.jinengIndex++;
            }

            let id = runtime[`jineng${this.jinengIndex}`];

            if (id) {
                this.jinengIndex++;
                forarr(skillList.childrens.datas, (v: FightSkillItem) => {

                    let { _data, skin } = v;

                    if (!_data || !skin) {
                        return true;
                    }

                    if (_data.jineng.id == id && skin.mouseEnabled) {
                        v.clickHandle();
                        return false;
                    }

                    return true;
                });
            }
        }

        checkSkill() {
            let { skillList } = this;

            forarr(skillList.childrens.datas, (v: FightSkillItem) => {

                if (v._data) {
                    v.check();
                }

                return true;
            });
        }

        @EVT(GameEvent.REFRESH_FIGHT_SKILL)
        refreshSkill() {
            let { skillList } = this;

            let { gonggongCD } = modelData.cd;

            let time = gonggongCD - getServerDate();

            if (time > 0) {

                forarr(skillList.childrens.datas, (v: FightSkillItem) => {
                    if (v._data) {
                        v.setCooling(time);
                    }
                    return true;
                });
            }
        }

        @EVT(GameEvent.REFRESH_FIGHT_ROLES)
        refreshRoleData() {
            let { current, battle } = battleModel;

            if (!battle) {
                return;
            }

            for (let i = 2; i <= 4; i++) {

                let role: RoleEnemyComp = this[`role_${i}`];
                role.skin.visible = false;
            }

            let index = 2;

            foreach(battle.roles, v => {

                if (v != current) {
                    let role: RoleEnemyComp = this[`role_${index}`];
                    role.skin.visible = true;
                    role.data = v;
                    index++;
                } else {
                    this.role_1.data = current;
                    this.role_1.awaken();
                }

                return true;
            });
        }

        onAutoClickHandle() {
            playEffectKeyByAudio();

            this.autoBool = !this.autoBool;

            let { autoBool, panel } = this;
            panel.top.btn_auto.select.visible = autoBool;
            foward(CM_CODE.CM_AutoSkill, (autoBool ? 1 : 0));
        }

        regainClickHadle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            foward(CM_CODE.CM_BattleRegain);
        }

        @EVT(`${ResConst.CD}.${IRescdConst.LIAOSHANGCD}`)
        regainCD() {
            let { panel } = this;
            let { top } = panel;
            let { liaoShangCD } = modelData.cd;

            let time = liaoShangCD - getServerDate();

            if (time > 0) {
                setButtonCooling(top.btn_regain, time);
            }
        }

        backClickHadle() {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return;
            }

            foward(CM_CODE.CM_BattleEscape);
        }

        @EVT(`${ResConst.CD}.${IRescdConst.TAOPAOCD}`)
        backCD() {
            let { panel } = this;
            let { top } = panel;

            let { taoPaoCD } = modelData.cd;
            let time = taoPaoCD - getServerDate();

            if (time) {
                setButtonCooling(top.btn_back, time);
            }

        }

        exitClickHadle() {
            foward(CM_CODE.CM_BattleOut);
        }
    }
}