module rf {
    @RegisterModel("battle")
    export class BattleModel extends BaseModel<IConditionRuntime> {
        battle: IBattleRuntime;
        current: IBattleHeroRuntime;
        skilled: boolean;
        itemed: boolean;

        needRecover: boolean = false;

        Killer: TSM_BattleStuporFromInfo;

        priority = -1;

        loadSaveData() {
            if (modelData.hero.battleId) {
                this.needRecover = true;
            }
        }

        getbattle() {
            if (this.needRecover) {
                this.needRecover = false;
                foward(CM_CODE.CM_BattleRecover);
            }
        }

        @SOCKET_EVT(SM_CODE.SM_BattleIn)
        battleIn(event: StreamX) {

            let battle = event.data as IBattleRuntime;

            foreach(battle.roles, (v, k) => {
                v.zhuangtai = mapModel.currentRoles[k].zhuangtai;
                return true;
            });

            this.battle = battle;
            this.current = battle.roles[modelData.hero.guid];
            this.skilled = false;
            this.itemed = false;

            facade.simpleDispatch(GameEvent.STOP_AUTO_FINDROOM);
            facade.simpleDispatch(GameEvent.CLOSE_ALL_POPUP);
            facade.simpleDispatch(GameEvent.BATTLE_START);
        }

        @SOCKET_EVT(SM_CODE.SM_BattleOut)
        battleOut(event?: StreamX) {

            facade.toggle(MainMediator, 1);
            facade.toggle(FightMediator, 0);

            this.battle = undefined;
            this.current = undefined;
            // getGTimer(500).remove(this.timeUp, this);
        }

        @SOCKET_EVT(SM_CODE.SM_BattleStuporFromInfo)
        SM_BattleStuporFromInfo(event: StreamX) {
            this.Killer = event.data;
        }

        @SOCKET_EVT(SM_CODE.SM_BattleReward)
        SM_BattleReward(event: StreamX) {
            let { battle } = this;
            let [name, { exp, potential }] = event.data as [string, { exp: number, potential: number }];

            let tips = `获得了经验x${exp}、潜能点x${potential}`;

            // forarr(getLimitValues(reward), (v, k) => {

            //     let { name, maxCount } = v;

            //     tips += `${k ? "、" : ""}${name}x${maxCount}`;

            //     return true;
            // })

            // addPrompt(tips);

            // if (battle) {
            //     let traget = battle.roles[guid];
            //     if (traget) {
            //         addMessage(`你击败了${traget.info.name},${tips}`);
            //     }
            // }

            if (battle) {
                if (name) {
                    addMessage(`<font color = "${Style.LAN_PLAYER}">你</font><font color="${Style.HONG_AN}">击败了${name},${tips}</font>`);
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_BattleOtherIn)
        battleRoles(event: StreamX) {

            let roleinfo = event.data as IBattleHeroRuntime;
            this.battle.roles[roleinfo.roleId] = roleinfo;
            // playEffectKeyByAudio("zhan_dou_zhong_wan_jia_jia_ru");// 其他玩家加入战斗
            facade.simpleDispatch(GameEvent.REFRESH_FIGHT_ROLES);
        }

        @EVT(GameEvent.UPDATE_ROLEZHUANGTAI)
        updateZhuangtai(event: EventX) {
            let [guid, zhuantai] = event.data;
            if (this.battle) {
                let role = this.battle.roles[guid];
                if (role && role.zhuangtai != zhuantai) {
                    role.zhuangtai = zhuantai;
                    facade.simpleDispatch(GameEvent.UPDATE_BATTLE_FACE, guid);
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_BattleOtherOut)
        SM_BattleOtherOut(event: StreamX) {

            let roleid = event.data as number;

            delete this.battle.roles[roleid];

            facade.simpleDispatch(GameEvent.REFRESH_FIGHT_ROLES);
        }

        @SOCKET_EVT(SM_CODE.SM_BattleTarget)
        battleTarget(event: StreamX) {
            let attack = event.data as number;
            this.current.target = attack;
            facade.simpleDispatch(GameEvent.REFRESH_FIGHT_TRAGET);
        }

        @SOCKET_EVT(SM_CODE.SM_BattleUpdate)
        battleUpdate(event: StreamX) {

            let { battle } = this;

            if (!battle) {
                return;
            }

            let battleInfo = event.data as IBattleInfo;

            this.updateInfo(battleInfo);

        }

        //同步属性信息
        updateInfo(battleInfo: IBattleInfo) {

            let { battle } = this;
            let { bloods } = battleInfo;

            forarr(bloods, v => {
                let { guid, hp, lhp, mhp, mp, lmp, mmp, vigor, maxvigor } = v;
                let role = battle.roles[guid];

                if (role) {
                    let info = role.info;

                    // lhp = Math.clamp(Math.ceil(lhp), 0, mhp);
                    // hp = Math.clamp(Math.ceil(hp), 0, lhp);
                    // lmp = Math.clamp(Math.ceil(lmp), 0, mmp);
                    // mp = Math.clamp(Math.ceil(mp), 0, lmp);
                    // vigor = Math.clamp(Math.ceil(vigor), 0, maxvigor);

                    battle.shows = [];
                    let tempHp = (hp - info.hp) >> 0;
                    if (tempHp != 0) {
                        let relust = tempHp > 0;
                        battle.shows.push({ guid, opera: `${relust ? "+" : "-"}`, value: Math.abs(tempHp), color: relust ? Style.GREEN : Style.RED });
                    }

                    // let tempVigor = (vigor - info.vigor) >> 0;
                    // if (tempVigor != 0) {
                    //     let relust = tempVigor > 0;
                    //     battle.shows.push({ guid, value: `${relust ? "+" : ""}${tempVigor}`, color: relust ? Style.ORANGE : Style.YELLOW });
                    // }

                    info.hp = hp;
                    info.lhp = lhp;
                    info.mp = mp;
                    info.lmp = lmp;
                    // info.vigor = vigor;

                    battle.info = battleInfo;

                    facade.simpleDispatch(GameEvent.REFRESH_FIGHT_DATA, battle);
                }

                return true;
            })

        }

        checkExitBatle() {
            let { battle, current } = this;

            if (!battle) {
                return false;
            }

            let flag = true;

            foreach(battle.roles, v => {

                if (v != current) {

                    if (v.info.hp > 0) {
                        flag = false;
                    }

                }
                return flag;
            });

            return flag;
        }

        @SOCKET_EVT(SM_CODE.SM_BattleRegain)
        battleRegain(event: StreamX) {

            let ret = event.data;

            switch (ret) {
                case 0: {
                    addPrompt("恢复一定血量!");
                    break;
                }

                case 1: {
                    addPrompt("气血已满!");
                    break;
                }

                case 2: {
                    addPrompt("内力不足!");
                    break;
                }

                case 3: {
                    // addPrompt("冷却中!")
                    break;
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_BattleEscape)
        battleEscape(event: StreamX) {

            let ret = event.data;

            let log = "";
            let fightlog = gameConfig.fightlog;

            if (ret) {
                // addPrompt("触发轻功失败，无法逃脱!");
                playEffectKeyByAudio("tao_pao_shi_bai");// 失败

                log += fightlog[`escapeFail`].desc;
            } else {
                // addPrompt("逃脱成功!");
                playEffectKeyByAudio("tao_pao_cheng_gong");// 成功

                log += fightlog[`escapeSuccess`].desc;
            }

            callLater.add(() => {
                facade.simpleDispatch(GameEvent.ADD_FIGHT_MESSAGE, log);
            }, this);
        }

        @SOCKET_EVT(SM_CODE.SM_MapJoinChange)
        mapJoin(event: StreamX) {
            facade.simpleDispatch(GameEvent.REFRESH_MATCH_ROLE, event.data);
        }

        // @SOCKET_EVT(SM_CODE.SM_BattleAttack)
        // SM_BattleAttack(event: StreamX) {
        //     // let time = event.data as number;
        //     // if (this.current) {
        //     //     this.current.atktime = time;
        //     // }
        //     // facade.simpleDispatch(GameEvent.REFRESH_FIGHT_SKILL);
        // }

        doAttack() {
            foward(CM_CODE.CM_BattleAttack);
        }

        doItem(id: number, type: number) {
            let { current } = this;
            let now = getServerDate();
            if (now >= current.itemtime[type]) {
                this.itemed = false;
                // foward(CM_CODE.CM_BattleSkill)
            }
        }

        @EVT(/* "cd.gonggongCD", */"cd.id.nextTime")
        cd_gonggongCD(event: EventX) {
            // console.log(rf.modelData.cd.gonggongCD - getServerDate());
            // console.log(getServerDate());

            // console.log(new Date(getServerDate()).format("HH:mm:ss"));
            // console.log(new Date(rf.modelData.cd.gonggongCD).format("HH:mm:ss"))

            facade.simpleDispatch(GameEvent.REFRESH_FIGHT_SKILL);
        }
    }

    export var battleModel = singleton(BattleModel);
}