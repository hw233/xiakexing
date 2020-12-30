module rf {

    export var unlockRoads: string[];

    export var nextPoint: string;
    export var highLightPoint: any[] = [];

    export class TMapBuilder extends TSourceCompment {

        resize: Point2D;

        gapX: number;
        gapY: number;
        roadX: number;
        roadY: number;
        itemW: number;
        itemH: number;

        isInit: boolean;

        _data: IMapRuntime;
        mijing: IMijing;
        posData: { [key: string]: IRoomRuntime };

        btns: { [key: string]: TMapBuilderItem } = {};
        roads: { [key: string]: TSourceCompment } = {};

        espaceItem: TMapBuilderItem;

        center: IRoomRuntime;
        exit: IRoomRuntime;

        minX: number;
        maxX: number;
        minY: number;
        maxY: number;

        isMijing: boolean;

        lastMap: number;

        @CodeFunc()
        static getMapRoom(propertys: [string]) {
            let [name] = propertys;
            return singleton(TMapBuilder).btns[name];
        }

        awaken() {
            modelData.hero.mapload = 0;
        }

        doData() {

            if (!this.stage) return;

            if (!this.isInit) {

                let { mapItemInfo, mapRoadHInfo, mapRoadVInfo } = cfgData;
                let [itemW, itemH] = mapItemInfo;
                let [rhw, rhh] = mapRoadHInfo;
                let [rvw, rvh] = mapRoadVInfo;

                this.gapX = itemW + rhw;
                this.gapY = itemH + rvh;
                this.roadX = rvw;
                this.roadY = rhh;
                this.itemW = itemW;
                this.itemH = itemH;

                this.isInit = true;
            }

            let { guid, mijing, rooms, enter, exit } = this._data;

            if (guid != this.lastMap) {

                let { w, h } = this.parent;
                this.setPos(w >> 1, h >> 1);

                this.posData = rooms;

                foreach(this.btns, (v, k) => {
                    // v.visible = false;
                    v.remove();
                    delete this.btns[k];
                    return true;
                });

                foreach(this.roads, (v, k) => {
                    v.remove();
                    delete this.roads[k];
                    return true;
                });

                this.isMijing = /* !mijing.guanqia */true;
                this.center = this.posData[enter];
                this.exit = this.posData[exit];

                unlockRoads = [];

                this.drawMap();

                this.lastMap = guid;
            } else {

            }

            callLater.add(() => {
                foreach(this.btns, v => {
                    v.changeTrackGuid();
                    v.changeQingbao(undefined);
                    return true;
                });
            }, this);

            modelData.hero.mapload = 1;

            callLater.later(() => {
                this.refreshMove();

                if (mapLoadCompeteleCall) {
                    mapLoadCompeteleCall();
                }

            }, this, 500);
        }

        drawMap() {

            let { gapX, gapY, itemW, itemH, btns, posData, isMijing, center, exit } = this;

            this.espaceItem = undefined;

            let middleX = itemW >> 1;
            let middleY = itemH >> 1;

            let configX = 0 - middleX;
            let configY = 0 - middleY;

            let { x: fx, y: fy } = center;

            let min_X = undefined;
            let max_X = undefined;
            let min_Y = undefined;
            let max_Y = undefined;

            foreach(posData, (v, id: string) => {
                let item: TMapBuilderItem = btns[id];

                if (!item) {
                    item = recyclable(TMapBuilderItem);
                    this.addChild(item);
                    btns[id] = item;
                }

                item.visible = isMijing;

                let { x, y } = v;

                if (!min_X) {
                    min_X = x;
                    max_X = x;
                } else {
                    if (x < min_X) {
                        min_X = x;
                    } else if (x > max_X) {
                        max_X = x;
                    }
                }

                if (!min_Y) {
                    min_Y = y;
                    max_Y = y;
                } else {
                    if (y < min_Y) {
                        min_Y = y;
                    } else if (y > max_Y) {
                        max_Y = y;
                    }
                }

                let multipleX = (fx - x) * 0.5;
                let multipleY = (fy - y) * 0.5;

                let ox = configX + Math.abs(multipleX * gapX) * (multipleX < 0 ? 1 : -1);
                let oy = configY + Math.abs(multipleY * gapY) * (multipleY < 0 ? 1 : -1);

                let { statusData } = item;
                statusData.length = 0;

                if (isMijing) {
                    unlockRoads.push(id);

                    if (exit && v == exit) {
                        this.espaceItem = item;
                        statusData.push(RoomStatus.escape);
                    }
                } else {

                    if (v == exit) {
                        this.espaceItem = item;
                        statusData.push(RoomStatus.escape);
                    }
                }

                item.isCurrent = false;
                item.setPos(ox, oy);
                item.data = v;

                forarr(v.paths, (p, k) => {

                    if (!p) {
                        return true;
                    }

                    let v = false;

                    let key = "";

                    let rx = 0;
                    let ry = 0;

                    switch (k) {
                        case 0://top
                            key = `${x}_${y - 1}`;
                            rx = middleX;
                            ry = - gapY;
                            v = true;
                            break;
                        case 1://right
                            key = `${x + 1}_${y}`;
                            rx = itemW;
                            ry = middleY;
                            break;
                        case 2://buttom
                            key = `${x}_${y + 1}`;
                            rx = middleX;
                            ry = itemH;
                            v = true;
                            break;
                        case 3://left
                            key = `${x - 1}_${y}`;
                            rx = - gapX;
                            ry = middleY;
                            break;
                    }

                    this.drawRoad(rx + ox, ry + oy, key, v);

                    return true;

                })

                return true;
            });

            let lw = (fx - min_X) * 0.5 * gapX + this._x;
            let rw = (fx - max_X) * 0.5 * gapX + this._x;
            let lh = (fy - min_Y) * 0.5 * gapY + this._y;
            let rh = (fy - max_Y) * 0.5 * gapY + this._y;

            if (lw < rw) {
                this.minX = lw;
                this.maxX = rw;
            } else {
                this.minX = rw;
                this.maxX = lw;
            }

            if (lh < rh) {
                this.minY = lh;
                this.maxY = rh;
            } else {
                this.minY = rh;
                this.maxY = lh;
            }

            callLater.add(this.refreshCenter, this);
            // this.refreshCenter();
        }

        drawRoad(ox: number, oy: number, key: string, v: boolean = false) {

            let { roads, roadX, roadY, isMijing } = this;

            let road: TSourceCompment = roads[key];

            if (!road) {
                road = new TSourceCompment();
                this.addChildAt(road, 0);
                road.create(RES_PERFIX, "ui/mapScene/", v ? "map_road_v" : "map_road_h");

                let middleX = roadX >> 1;
                let middleY = roadY >> 1;

                ox = v ? ox - middleX : ox;
                oy = v ? oy : oy - middleY;
                road.setPos(ox, oy);

                this.roads[key] = road;
            }

            road.visible = isMijing;
        }


        @EVT("map_guide_change")
        check() {

            let { espaceItem, isMijing } = this;

            if (!espaceItem) {
                return;
            }

            let { statusData } = espaceItem;
            let ruslut = mapModel.guide || isMijing;

            if (statusData.indexOf(RoomStatus.escape) != -1) {

                if (!ruslut) {
                    statusData.shift();
                }

            } else {
                if (ruslut) {
                    statusData.unshift(RoomStatus.escape);
                }
            }

            espaceItem.refreshStatus();
        }

        @EVT(GameEvent.REFRESH_MAP_POS)
        refreshMove() {

            let { posData, gapX, gapY, btns, center, lastMap, x, y } = this;
            let { room, map } = modelData.hero;

            let { x: fx, y: fy, id } = center;

            if (lastMap != map || room == id) {
                return;
            }

            let point = posData[room];

            if (btns[id]) {
                btns[id].isCurrent = false;
                btns[id].data = center;
            }

            this.resizePos();

            // if (!(mijing.bianjie.indexOf(room) != -1 || mijing.bianjie.indexOf(id) != -1)) {

            //     let { x: tx, y: ty } = point;

            //     let multipleX = (fx - tx) * 0.5;
            //     let multipleY = (fy - ty) * 0.5;

            //     let ox = x + multipleX * gapX;
            //     let oy = y + multipleY * gapY;

            //     tweenTo({ x: ox, y: oy }, 200, defaultTimeMixer, this, ease_back_inout);
            // }

            let { x: tx, y: ty } = point;

            let multipleX = (fx - tx) * 0.5;
            let multipleY = (fy - ty) * 0.5;

            let ox = this.x + multipleX * gapX;
            let oy = this.y + multipleY * gapY;

            this._tweener = tweenTo({ x: ox, y: oy }, 200, defaultTimeMixer, this, ease_back_inout);

            this._tweener.complete = () => {
                this._tweener = undefined;
                this.center = point;
                this.refreshCenter();
            }
        }

        refreshCenter() {

            let { isMijing, center, exit, btns, roads, x: sx, y: sy } = this;

            let { id, x, y, paths } = center;

            if (!btns[id]) {
                return;
            }

            this.resize = { x: sx, y: sy };

            btns[id].isCurrent = true;
            btns[id].data = center;

            this.setNextPoint();

            if (!isMijing) {

                btns[id].visible = true;

                if (unlockRoads.indexOf(center.id) == -1) {
                    unlockRoads.push(center.id);
                }

                forarr(paths, (p, k) => {

                    if (!p) {
                        return true;
                    }

                    let key = "";

                    switch (k) {
                        case 0://top
                            key = `${x}_${y - 1}`;
                            break;
                        case 1://right
                            key = `${x + 1}_${y}`;
                            break;
                        case 2://buttom
                            key = `${x}_${y + 1}`;
                            break;
                        case 3://left
                            key = `${x - 1}_${y}`;
                            break;
                    }

                    if (btns[p] && !btns[p].visible) {
                        btns[p].visible = true;
                    }

                    if (roads[key] && !roads[key].visible) {
                        roads[key].visible = true;
                    }

                    return true;
                })
            }


            if (exit && mapModel.guide) {

                let { x: ex, y: ey, id } = exit;
                let ruslut = (id == modelData.hero.room);

                if (ruslut) {
                    return;
                }

                let radius = Math.atan2(-(ey - y), ex - x) * (180 / Math.PI);

                let direction = 0;

                if (radius == 0) {
                    //正东
                    direction = 1;
                } else if (radius == 90) {
                    //正北
                    direction = 3;
                } else if (radius == -180) {
                    //正西
                    direction = 5;
                }
                else if (radius == -90) {
                    //正南
                    direction = 7;
                } else {

                    if (radius < -90) {
                        //西南
                        direction = 6;
                    } else if (radius < 0) {
                        //东南
                        direction = 8;
                    } else if (radius < 90) {
                        //东北
                        direction = 2;
                    } else {
                        //西北
                        direction = 4;
                    }
                }

                facade.simpleDispatch(GameEvent.REFRESH_MAP_DIRECTION, direction);
            }

            this.setHighLightPoint();
        }

        resizePos() {
            let { resize, btns, center, x, y, parent } = this;

            let map = parent.parent;
            if (map && map["setDingweiShow"]) {
                map["setDingweiShow"](false);
            }

            if (btns[center.id]) {
                let { x: rx, y: ry } = resize;
                if (x != rx || y != ry) {
                    this.setPos(rx, ry);
                }
            }
        }

        @EVT(GameEvent.REFRESH_NEXT_POINT)
        setNextPoint() {
            let { center, btns } = this;

            if (nextPoint) {
                let { id } = center;

                if (!btns[id]) {
                    return;
                }

                mapModel.checkNextPoint(btns[id]);
            }
        }

        selfHighLights: TAnimation[] = [];

        @EVT(GameEvent.REFRESH_HIGHTLIGHT_POINT)
        setHighLightPoint() {

            let { btns, selfHighLights } = this;

            forarr(selfHighLights, v => {
                v.visible = false;
                return true;
            });

            if (!highLightPoint.length) {
                return;
            }

            forarr(highLightPoint, (v, k) => {

                let item = btns[v];
                if (item) {

                    let kuang: TAnimation = item["kuang"];

                    if (!kuang) {
                        item["kuang"] = kuang = recyclable(TAnimation);
                        item.skin.light.addChildAt(kuang, 0);
                        kuang.setPos(item.w >> 1, item.h >> 1);
                        selfHighLights.push(kuang);
                    }

                    kuang.create(RES_PERFIX, "animation/jiemian", "light");
                    // kuang.setSize(item.w, item.h);
                    kuang.visible = true;
                }

                return true;
            });
        }

        getRoomByType(type: number) {

            let ruslut = undefined;

            let { posData, btns } = this;

            foreach(posData, v => {

                if (v.type == type) {

                    ruslut = btns[v.id];
                    return false
                }

                return true;
            });

            return ruslut;
        }

        RoomProgressComps: { [key: string]: TMapProgressItem } = {};//临时存储房间进度条

        refreshRoomProgress() {

            let { RoomProgressComps } = this;

            foreach(RoomProgressComps, (v, k) => {
                v.visible = false;
                return true;
            });

            forarr(RoomProgress, v => {

                let room = this.getRoomByType(v.roomType);
                if (room) {

                    let comp: TMapProgressItem = RoomProgressComps[v.roomType];

                    if (!comp) {
                        comp = recyclable(TMapProgressItem);
                        room.addChild(comp);
                        comp.setPos(0, -40);
                        RoomProgressComps[v.roomType] = comp;
                    }

                    comp.visible = true;
                    comp.data = v;
                }

                return true;
            });
        }

        tempRoomComp: TMapBuilderItem[] = [];//临时存储房间

        @EVT(GameEvent.REFRESH_STATUS_ROOM)
        refreshRoom(event: EventX) {
            let [type, data] = event.data;

            let { tempRoomComp, btns } = this;

            if (tempRoomComp.length) {

                forarr(tempRoomComp, v => {
                    let { statusData } = v;
                    statusData.length = 0;
                    v.refreshStatus();
                    return true;
                });

                tempRoomComp.length = 0;
            }

            foreach(data, (v, k) => {
                let item = btns[k];

                if (item && v) {
                    let { statusData } = item;
                    if (statusData.indexOf(type) == -1) {
                        statusData.push(type);
                        item.refreshStatus();
                        tempRoomComp.push(item);
                    }
                }
                return true;
            });
        }

        @EVT(GameEvent.REFRESH_QINGBAO_ROOM)
        refreshQingbao() {

            foreach(this.btns, v => {
                v.changeQingbao(undefined);
                return true;
            });

            let list: IQingbaoRuntime[] = [];

            forarr(personQingBao, v => {
                if (v.active) {
                    list.push(v);
                }
                return true;
            })

            if (list.length) {
                // list.sort((a: IQingbaoRuntime, b: IQingbaoRuntime) => {
                //     if (a.priority < b.priority) {
                //         return -1;
                //     }
                //     return 1;
                // });

                // let qingbao = list[0];

                // forarr(qingbao.roomKeys, v => {
                //     let room = this.btns[v];
                //     if (room) {
                //         room.changeQingbao(qingbao.model.res);
                //     }
                //     return true;
                // })

                forarr(list, v => {
                    forarr(v.roomKeys, key => {
                        let room = this.btns[key];
                        if (room) {
                            room.changeQingbao(v.model);
                        }
                        return true;
                    })
                    return true;
                })
            }
        }
    }
}