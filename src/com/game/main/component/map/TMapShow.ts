module rf {

    export class TMapShow extends TSourceCompment {

        gapX: number;
        gapY: number;
        roadX: number;
        roadY: number;
        itemW: number;
        itemH: number;
        mapScale: number;

        isInit: boolean;

        posData: { [key: string]: IRoomRuntime };
        mijing: IMijing;

        btns: { [key: string]: TMapShowItem } = {};
        roads: { [key: string]: TSourceCompment } = {};

        espaceItem: TMapShowItem;

        center: IRoomRuntime;
        exit: IRoomRuntime;

        minX: number;
        maxX: number;
        minY: number;
        maxY: number;

        isMijing: boolean;

        lastMap: number;

        buildMap() {

            if (!this.isInit) {

                let { mapItemInfo, mapRoadHInfo, mapRoadVInfo, mapScale } = cfgData;
                let [itemW, itemH] = mapItemInfo;
                let [rhw, rhh] = mapRoadHInfo;
                let [rvw, rvh] = mapRoadVInfo;

                this.gapX = (itemW + rhw) * mapScale >> 0;
                this.gapY = (itemH + rvh) * mapScale >> 0;
                this.roadX = rvw * mapScale >> 0;
                this.roadY = rhh * mapScale >> 0;
                this.itemW = itemW * mapScale >> 0;;
                this.itemH = itemH * mapScale >> 0;;
                this.mapScale = mapScale;

                this.isInit = true;
            }

            let { w, h } = this.parent;
            this.setPos(w >> 1, h >> 1);

            let { guid, rooms, enter, exit, mijing } = mapModel.currentMap;

            if (guid != this.lastMap) {

                this.posData = rooms;

                foreach(this.btns, (v, k) => {
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

                this.drawMap();

                this.lastMap = guid;

            } else {
                this.refreshCenter();
            }
        }

        drawMap() {

            let { gapX, gapY, itemW, itemH, mapScale, btns, isMijing, posData, center, exit } = this;

            this.espaceItem = undefined;

            let middleX = itemW >> 1;
            let middleY = itemH >> 1;

            let configX = 0 - itemW >> 1;
            let configY = 0 - itemH >> 1;

            let { x: fx, y: fy } = center;

            let min_X = undefined;
            let max_X = undefined;
            let min_Y = undefined;
            let max_Y = undefined;

            foreach(posData, (v, id) => {
                let item: TMapShowItem = btns[id];

                if (!item) {
                    item = recyclable(TMapShowItem);
                    item.scale = mapScale;
                    this.addChild(item);
                    btns[id] = item;
                }

                let isExit = (v == exit);

                if (isExit) {
                    this.espaceItem = item;
                }

                item.visible = isMijing ? (isExit && mapModel.guide) : false;

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

                item.isCurrent = false;
                item.isExit = isExit;
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
        }

        drawRoad(ox: number, oy: number, key: string, v: boolean = false) {

            let { roads, isMijing, roadX, roadY, mapScale } = this;

            let road: TSourceCompment = roads[key];

            if (!road) {
                road = recyclable(TSourceCompment);
                this.addChildAt(road, 0);
                road.create(RES_PERFIX, "ui/mapScene/", v ? "map_road_v" : "map_road_h");
                road.scale = mapScale;

                let middleX = roadX >> 1;
                let middleY = roadY >> 1;

                ox = v ? ox - middleY : ox;
                oy = v ? oy : oy - middleX;
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

            espaceItem.visible = mapModel.guide || isMijing;
        }

        refreshCenter() {

            let { posData, btns, roads, isMijing } = this;

            forarr(unlockRoads, v => {
                let { id, x, y, paths } = posData[v];

                if (!btns[id]) {
                    return true;
                }

                if (!btns[id].visible) {
                    btns[id].visible = true;
                }

                btns[id].isCurrent = (id == modelData.hero.room);
                btns[id].data = posData[v];

                if (!isMijing) {

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

                return true;
            });

            this.setHighLightPoint();
            this.refreshQingbao();
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