module rf {

    export var CanSeePerson: number[];
    export var mapLoadCompeteleCall: Function = undefined;

    export interface IMapRuntime extends IResmap, IModelRuntime {
        mijing: IMijing;
    }

    @RegisterModel("map")
    export class MapModel extends BaseModel<IConditionRuntime> {

        runtimes: IMapRuntime;

        currentMap: IMapRuntime;
        currentRoom = {} as IRoomRuntime;
        currentRoles: { [key: string]: IElementRuntime };

        escapeTime: number;
        mapTime: number;

        guide: boolean;

        clickTimes: number;

        lastRoom: string;

        compelte: boolean = true;

        jiaShiJian: boolean;

        updateTimer: GTimer;

        init: boolean = false;

        loadSaveData(runtimes: IMapRuntime) {
            pro_copy(this.runtimes, runtimes);

            foward(CM_CODE.CM_MapIn, modelData.hero.guid);

            time1000.add(this.check, this);

            this.updateTimer = getGTimer(cfgData.updateSelfMapRoom);
        }

        check() {
            let { currentMap } = this;

            let flag = true;

            if (currentMap) {
                let { guide } = currentMap;

                if (guide) {

                    flag = !!itemModel.getItemCount(guide);
                }
            }

            if (flag != this.guide) {
                this.guide = flag;

                facade.simpleDispatch("map_guide_change");
            }
        }

        @CodeFunc()
        changeMapTime(propertys: [number]) {
            let [time] = propertys;

            mapModel.checkMapTime(time);
        }

        @SOCKET_EVT(SM_CODE.SM_ChangeMapTime)
        SM_ChangeMapTime(event: StreamX) {
            let close = event.data as number;

            if (this.currentMap) {
                this.currentMap.close = close;
                this.checkMapTime();
            }
        }

        // @SOCKET_EVT(SM_CODE.SM_MapInfo)//出地图
        // mapInfo(event: StreamX) {
        //     let data = event.data as IMapRuntime;
        //     if (data) {
        //         this.currentMap = data;
        //         let { mijingId, rooms } = this.currentMap;

        //         this.currentMap.guide = mijing.iconcondition;
        //         this.currentRoom = rooms[modelData.hero.room];
        //         this.checkMapTime();
        //     }
        // }

        @SOCKET_EVT(SM_CODE.SM_MapIn)
        mapin(event: StreamX) {
            let data = event.data as IMapRuntime;
            if (data) {

                if (this.currentMap && this.currentMap.guid == data.guid) {
                    console.error("??????????");
                }

                this.currentMap = data;
                let { guid, enter, rooms, mijingId } = this.currentMap;

                modelData.hero.map = guid;
                modelData.hero.room = enter;

                let mijing = this.currentMap.mijing = gameConfig.mijing[mijingId];
                this.currentMap.guide = mijing.iconcondition;
                this.currentRoom = rooms[modelData.hero.room];
                this.checkMapTime();

                if (this.compelte && this.init) {
                    this.intoMap(mijing);
                }

                if (!this.init) {
                    this.init = true;
                }
            }
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.MAPNAME}`)
        playBgm() {
            if (modelData.res.xsYindao) {
                let { currentMap } = this;
                if (!currentMap) {
                    return;
                }

                playBgmUrlByAudio(currentMap.mijing.sound);
            }
        }

        intoMap(mijingcfg: IMijing) {

            facade.simpleDispatch(GameEvent.MAP);

            let { guanqia, id } = mijingcfg;

            if (guanqia) {

                let mijing = singleton(MijingMapComp);

                if (mijing.stage) {
                    mijing.awaken();
                    return;
                }
                
                hongdain_mijingMapComp_btn_map = false;
                hongdain_showMapComp_btn_qingbao = false;

                //初始化情报池子
                inquirePool = {};
                elementQingbao = {};

                personQingBao = [];

                let qingbao = gameConfig.qingbao[id];
                if (qingbao) {
                    forarr(qingbao.types, v => {

                        if (!inquirePool[v.type]) {
                            inquirePool[v.type] = [];
                        }

                        inquirePool[v.type].push(v);

                        return true;
                    })
                }

                changeMainDele(mijing, singleton(MijingCoreComp));

                this.updateTimer.add(this.updateSelfRoom, this);
            } else {

                let city = singleton(CityMapComp);

                if (city.stage) {
                    city.awaken();
                    return;
                }

                changeMainDele(city, singleton(CityCoreComp));
            }
        }

        updateSelfRoom() {

            let ruslut = itemModel.itemTempFlag;

            if (ruslut) {
                foward(CM_CODE.CM_RoomsMapRoom);
            }
        }

        checkMapTime(time: number = 0) {

            let { currentMap } = this;

            let jiaShiJian = !!time;
            this.jiaShiJian = jiaShiJian;

            if (currentMap.close > 0 || jiaShiJian) {

                this.mapTime = jiaShiJian ? time : Math.floor((currentMap.close - getServerDate()) / 1000);

                this.refreshMapTime();
                time1000.add(this.refreshMapTime, this);
            } else {
                facade.simpleDispatch(GameEvent.CHANGE_TITLE_TIME);
                time1000.remove(this.refreshMapTime, this);
            }
        }

        refreshMapTime() {
            let { mapTime, jiaShiJian, currentMap } = this;

            if (!mapTime) {

                time1000.remove(this.refreshMapTime, this);

                if (jiaShiJian) {
                    return;
                }

                foward(CM_CODE.CM_MapOut, MAP_OUT_TYPE.KickOut);
            }

            facade.simpleDispatch(GameEvent.CHANGE_TITLE_TIME, [mapTime, currentMap.mijingId]);

            this.mapTime--;
        }

        @EVT(`${ResConst.HERO}.${IResproConst.STATUSFIGHT}`, GameEvent.STOP_AUTO_FINDROOM)
        stopFindRoom() {
            this.findRoom(undefined);
        }

        private timeToRoom(paths: IRoomRuntime[]) {
            let to = paths[paths.length - 1];
            let flag = false;
            if (to == this.currentRoom) {
                paths.pop();
                flag = mapModel.toRoom(paths[paths.length - 1]);
            }
            if (flag && paths.length - 1 > 0) {
                callLater.later(this.timeToRoom, this, cfgData.findPathTime, paths);
            }
        }

        findRoom(room?: IRoomRuntime) {
            //地图寻路
            callLater.remove(this.timeToRoom, this);

            if (room && checkLimit(moveConditon) == undefined) {
                let paths = findpath.find(this.currentMap, this.currentRoom, room);
                if (paths.length) {
                    this.timeToRoom(paths);
                }
            }
        }

        checkNextPoint(center: TMapBuilderItem) {

            let { currentMap, currentRoom } = this;

            let room = currentMap.rooms[nextPoint];

            if (!room) {
                // console.error("不存在", nextPoint);
                return;
            }

            let paths = findpath.find(currentMap, currentRoom, room);
            if (paths.length) {

                let next: IRoomRuntime = undefined;

                forarr(paths, (v, k) => {

                    if (v.id == currentRoom.id) {
                        next = paths[k - 1];
                        return false;
                    }

                    return true;
                });

                if (next) {

                    let { x, y } = currentRoom;
                    let { x: tx, y: ty } = next;
                    let ox = x - tx;
                    let oy = y - ty;

                    let jx = 0;
                    let jy = 0;
                    let jr = 0;

                    let { w, h, skin } = center;
                    let { jiantou } = skin;

                    let anima: TAnimation = jiantou["guide"];

                    if (!anima) {
                        anima = jiantou["guide"] = recyclable(TAnimation);
                        jiantou.addChild(anima);
                    }

                    let middleX = w >> 1;
                    let middleY = h >> 1;

                    if (ox) {

                        if (ox > 0) {
                            jx = -17;
                            jy = middleY;
                            jr = -180;
                        } else {
                            jx = w + 17;
                            jy = middleY;
                        }

                        anima.create(RES_PERFIX, "animation/jiantou", "jiantouyou");
                    } else {

                        if (oy > 0) {
                            jx = middleX;
                            jy = -37;
                        } else {
                            jx = middleX;
                            jy = h + 37;
                            jr = 180;
                        }

                        anima.create(RES_PERFIX, "animation/jiantou", "jiantoushang");
                    }

                    anima.rotation = jr;
                    anima.setPos(jx, jy);

                    // if (ox) {

                    //     if (ox > 0) {
                    //         jx = -17;
                    //         jy = middleY;
                    //         jr = 90;
                    //     } else {
                    //         jx = w + 17;
                    //         jy = middleY;
                    //         jr = -90;
                    //     }

                    //     // console.log(debug, ox > 0 ? "left" : "right");
                    // } else if (oy) {

                    //     if (oy > 0) {
                    //         jx = middleX;
                    //         jy = -17;
                    //         jr = 180;
                    //     } else {
                    //         jx = middleX;
                    //         jy = h + 17;
                    //     }

                    //     // console.log(debug, oy > 0 ? "top" : "bottom");
                    // }

                    jiantou.visible = true;
                    // jiantou.rotation = jr;
                    // jiantou.setPos(jx, jy);
                }

            } else {
                nextPoint = undefined;
            }

        }

        toRoom(room: IRoomRuntime) {

            let { statusDoing, statusDifficultWalk } = modelData.hero;

            let { currentRoom, lastRoom } = this;

            if (statusDoing != STATUS_DOING.DAZE) {
                playEffectKeyByAudio("warning");
                interruptedCurrentStateTriggerEvent();
            } else {

                if (currentRoom.paths.indexOf(room.id) != -1) {
                    playEffectKeyByAudio("di_tu_fang_jian_yi_dong");

                    let flag = true;

                    if (lastRoom != room.id) {
                        this.lastRoom = room.id;
                        this.clickTimes = 0;
                    }

                    if (statusDifficultWalk) {

                        if (this.clickTimes < statusDifficultWalk) {
                            flag = false;
                            addPrompt(`还需点击${statusDifficultWalk - this.clickTimes}次！`, Style.GREEN);
                        }

                        this.clickTimes++;
                    }

                    if (flag) {
                        foward(CM_CODE.CM_RoomIn, room.id);
                        return true;
                    }

                } else {

                    if (currentRoom.id != room.id) {
                        playEffectKeyByAudio("warning");
                        addPrompt("暂时无法自动寻路！", Style.RED);
                    }
                }
            }

            return false;
        }

        @EVT(`hero.room`)
        heroRoomChange(event: EventX) {

            let { currentMap, compelte } = this;
            if (!currentMap || !compelte) {
                return;
            }

            let { map, room } = modelData.hero;
            this.currentRoom = currentMap.rooms[room];

            roomModel.playRoomSound(this.currentRoom.roomId);

            facade.simpleDispatch(GameEvent.REFRESH_MAP_POS);
            facade.simpleDispatch(GameEvent.REFRESH_UPGRADE_BTN);

            this.checkRoomExit();
        }

        @EVT(GameEvent.CHECK_ROOM_EXIT)
        checkRoomExit(event?: EventX) {

            if (event && event.data) {
                time1000.remove(this.addEscapeTime, this);
                return;
            }

            let { currentMap } = this;

            let { hero, res } = modelData;

            if (currentMap.exit == hero.room && res.xsYindao) {
                facade.simpleDispatch(GameEvent.CLOSE_MAP_DIRECTION);
                this.escapeTime = currentMap.escape;
                this.addEscapeTime();
                time1000.add(this.addEscapeTime, this);
            } else {
                time1000.remove(this.addEscapeTime, this);
            }
        }

        addEscapeTime() {

            let { escapeTime } = this;

            if (!escapeTime) {

                time1000.remove(this.addEscapeTime, this);

                foward(CM_CODE.CM_MapOut);
            }

            addPrompt(`${escapeTime}`, Style.GREEN);

            this.escapeTime--;
        }

        outCompelte(forthwith: boolean = false) {

            if (forthwith) {
                this.outEvt();
            } else {
                zhuanchangAction();
                callLater.later(this.outEvt, this, 1000);
            }
        }

        outEvt() {

            facade.simpleDispatch(GameEvent.CLOSE_MIJING_TONGXIANG_COMP);
            singleton(ShowMapComp).remove();
            facade.simpleDispatch(GameEvent.CLOSE_ALL_POPUP);

            pageList.length = 0;
            changeMainDele(singleton(InfoTopComp), singleton(MainCoreComp));

            this.compelte = true;
        }

        @SOCKET_EVT(SM_CODE.SM_MapOut)
        mapOut(event: StreamX) {

            let [type, mijingId, close, dead] = event.data;

            battleModel.battleOut();

            facade.simpleDispatch(GameEvent.CLOSE_ALL_POPUP);

            this.updateTimer.remove(this.updateSelfRoom, this);

            this.compelte = false;

            let runtime = { mijingId, close, dead };

            switch (type) {
                case MAP_OUT_TYPE.Success:
                    singleton(SuccessPopup).open(runtime);
                    break;
                case MAP_OUT_TYPE.KickOut:
                    singleton(UnknownOutPopup).open(runtime);
                    break;
                case MAP_OUT_TYPE.TELEPORT:
                    this.outCompelte(true);
                    break;
                case MAP_OUT_TYPE.SINGLEFUBEN:
                    this.outCompelte();
                    break;
                default:
                    singleton(FailPopup).open(runtime);
                    break;
            }
        }

        @SOCKET_EVT(SM_CODE.SM_RoomIn)
        roomIn(event: StreamX) {
            let key = event.data as string;
            let { currentMap } = this;
            let toRoom = currentMap.rooms[key];
            let roomcfg = gameConfig.room;

            let { error } = roomcfg[toRoom.roomId];
            // let str = "需要 ";
            // forarr(getLimitValues(intocondition), v => {
            //     let { name, maxCount } = v;
            //     str += `${name} x${maxCount}    `;
            //     return true;
            // });

            addPrompt(error ? error : "该房间不可进入", Style.RED);
        }

        @SOCKET_EVT(SM_CODE.SM_RoomInfo)
        roomInfo(event: StreamX) {
            this.currentRoles = event.data;
            this.refreshRoomRoles();
        }

        refreshRoomRoles() {

            if (!modelData.hero) {
                return;
            }

            let list: IElementRuntime[] = [];

            let self = modelData.hero.guid;
            let element = gameConfig.element;

            //解析服务器房间人物数据并显示
            foreach(this.currentRoles, v => {
                let { guid, zhuangtai } = v;

                let flag = false;

                if (!(zhuangtai & ZHUANGTAI.DIE || zhuangtai & ZHUANGTAI.HIDE) && (guid != self)) {
                    if ((zhuangtai & ZHUANGTAI.YINSHEN) != 0) {
                        if (CanSeePerson && CanSeePerson.indexOf(guid as number) != -1) {
                            flag = true;
                        }
                    } else {
                        flag = true;
                    }
                }

                if (!flag) {
                    return true;
                }

                let { elementId } = v;
                v.element = element[elementId];
                list.push(v);

                return true;
            })

            facade.simpleDispatch(GameEvent.REFRESH_ROOM_ELEMENT, list);
        }


        @SOCKET_EVT(SM_CODE.SM_ElementIn)
        elementIn(event: StreamX) {
            let data = event.data as IElementRuntime;
            let { hero } = modelData;
            if (data.guid != hero.guid) {

                this.currentRoles[data.guid] = data;
                this.refreshRoomRoles();

                // console.log(debug, "SM_ElementIn", data.name);

                let element = gameConfig.element[data.elementId];

                if (element && element.show) {
                    createMessageRuntime({
                        channel: CHAT_TYPE.INTERACTIVE,
                        message: `${INTERACTIVE_TYPE.COME},{color|${JSON.stringify({ id: this.currentRoom.name })}}`,
                        sGuid: data.guid,
                        sName: data.name
                    } as IMessageRuntime);
                }
            }
        }

        @SOCKET_EVT(SM_CODE.SM_ElementOut)
        elementOut(event: StreamX) {
            let id = event.data as number;

            let out = this.currentRoles[id];

            // console.log(debug, "SM_ElementOut", out.name);

            if (out.element && (out.element.type == 0 || out.element.type == 1)) {

            } else {
                createMessageRuntime({
                    channel: CHAT_TYPE.INTERACTIVE,
                    message: `${INTERACTIVE_TYPE.GO_AWAY},{color|${JSON.stringify({ id: this.currentRoom.name })}}`,
                    sGuid: id,
                    sName: out.name
                } as IMessageRuntime);
            }

            delete this.currentRoles[id];
            this.refreshRoomRoles();
        }

        @SOCKET_EVT(SM_CODE.SM_RoomsMapRoom)
        SM_RoomsMapRoom(event: StreamX) {

            this.setHighlightPoint([event.data]);
        }

        @SOCKET_EVT(SM_CODE.SM_ChangeCanSeePerson)
        sm_ChangeCanSeePerson(event: StreamX) {

            CanSeePerson = event.data;

            if (!CanSeePerson) {
                CanSeePerson = [];
            }

            this.refreshRoomRoles();
        }

        @SOCKET_EVT(SM_CODE.SM_NearPerson)
        nearPerson(event: StreamX) {

            facade.simpleDispatch(GameEvent.REFRESH_STATUS_ROOM, [RoomStatus.nearperson, event.data]);
        }

        @SOCKET_EVT(SM_CODE.SM_NearDeadPerson)
        nearDeadPerson(event: StreamX) {

            facade.simpleDispatch(GameEvent.REFRESH_STATUS_ROOM, [RoomStatus.neardeadperson, event.data]);
        }

        @EVT(`${ResConst.HERO}.${IResheroConst.MAPNAME}`, `${ResConst.HERO}.${IResheroConst.STATUSDOING}`, `${ResConst.HERO}.${IResheroConst.MAPSTATUS}`)
        changeTitle(event?: EventX) {

            let { mapName, statusDoing, mapstatus } = modelData.hero;

            let tmepDoing = statusDoing;
            if (statusDoing == STATUS_DOING.DAZE && mapstatus == MAP_STATUS.FU_BEN) {
                tmepDoing = 100;
            }

            let type = getTypeDefines(TYPE_CONFIG.ZHAUNGTAI)[tmepDoing];

            if (type) {
                let str = `${mapName} ${type.name}...`;
                facade.simpleDispatch(GameEvent.CHANGE_TITLE_TITLE, str);
            }
        }

        //其他人
        @SOCKET_EVT(SM_CODE.SM_UpdateRoleZhuangTai)
        updateZhuangTai1(event: StreamX) {
            this.changeRoleZhuangTai(event.data);
        }

        //自己
        @EVT(`${ResConst.HERO}.${IResheroConst.ZHUANGTAI}`)
        updateZhuangTai2() {
            let { guid, zhuangtai } = modelData.hero;
            this.changeRoleZhuangTai([guid, zhuangtai], true);
        }

        changeRoleZhuangTai(propertys: [number, number], self: boolean = false) {

            if (!self) {
                let [guid, zhuantai] = propertys;

                let role = this.currentRoles[guid];

                if (role && role.zhuangtai != zhuantai) {
                    role.zhuangtai = zhuantai;
                    this.refreshRoomRoles();
                }
            }

            facade.simpleDispatch(GameEvent.UPDATE_ROLEZHUANGTAI, propertys);
        }

        getMapRoomByIndex(index: number) {
            let runtime: IRoomRuntime = undefined;

            foreach(mapModel.currentMap.rooms, v => {

                if (v.index == index) {
                    runtime = v;
                }

                return !runtime;
            })

            return runtime;
        }

        @EVT(TEXT_LINK_TYPE.MAP_LINK)
        mapLinkHandler(event: EventX) {

            let { mijingId, mijing } = mapModel.currentMap;
            let { mapId, roomIndex } = event.data as any;

            let { guanqia: fg, error } = mijing;
            let { guanqia: tg } = gameConfig.mijing[mapId];

            let flag = true;

            let { mapstatus } = modelData.hero;

            if (mapstatus == MAP_STATUS.FU_BEN) {
                flag = (mijingId == mapId);
            } else {
                flag = (fg == tg);
            }

            if (!flag) {
                addPrompt(error);
                return;
            }

            facade.simpleDispatch(GameEvent.CLOSE_ALL_POPUP);

            mapLoadCompeteleCall = function () {

                mapLoadCompeteleCall = undefined;

                // let runtime = mapModel.currentMap.rooms[roomId];
                let runtime = mapModel.getMapRoomByIndex(roomIndex);
                if (!runtime) {
                    addPrompt(`${roomIndex} 不存在`);
                    return;
                }
                mapModel.findRoom(runtime);
            };

            if (mapstatus == MAP_STATUS.FU_BEN) {
                mapLoadCompeteleCall();
            } else {
                gotoMap(mapId);
            }
        }

        @CodeFunc()
        setNextPoint(propertys: [string]) {

            let [point] = propertys;
            nextPoint = point;
            facade.simpleDispatch(GameEvent.REFRESH_NEXT_POINT);
        }

        @CodeFunc()
        setHighlightPoint(propertys: [any]) {

            highLightPoint = propertys;
            facade.simpleDispatch(GameEvent.REFRESH_HIGHTLIGHT_POINT);
        }
    }

    export var mapModel = singleton(MapModel);

}