module rf {

    export var roomLink = new Link<IRoomRuntime>();

    export class FindPath {

        find(map: IMapRuntime, from: IRoomRuntime, to: IRoomRuntime) {


            let ways: IRoomRuntime[] = [];

            let { x, y, id } = from;

            if (from != to) {
                from.parent = undefined;

                let open: { [key: string]: boolean } = {};
                open[id] = true;

                let list = roomLink;
                list.addByWeight(from, 0);

                let flag = true;
                let count = 500;

                do {

                    let croom = list.pop()
                    // croom.parent = undefined;

                    forarr(croom.paths, path => {
                        if (path !== undefined) {
                            let room = map.rooms[path];
                            if (room == to) {
                                //找到了
                                to.parent = croom;
                                flag = false;
                            } else if (!open[path]) {
                                open[path] = true;
                                let { x: tx, y: ty } = room;
                                let dx = tx - x;
                                let dy = ty - y;
                                list.addByWeight(room, dx * dx + dy * dy);
                                // list.push(room);
                                room.parent = croom;

                                // console.log(room.name, "=>", croom.name)

                            }

                        }
                        return flag;
                    }, this)



                } while (list.__length && flag && count--);


                if (!flag) {
                    while (to && to != from) {
                        if (ways.indexOf(to) == -1) {
                            ways.push(to);
                            let parent = to.parent;
                            // to.parent = undefined;
                            to = parent;
                        } else {
                            console.log("?????");
                            to = from;
                        }
                    }
                    ways.push(from);
                }

                list.onRecycle();
            }



            ways.forEach(way => way.parent = undefined)

            return ways;

        }
    }

    export var findpath = singleton(FindPath);
}

