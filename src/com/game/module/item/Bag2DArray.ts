// module rf {


//     export class Bag2DArrayA {

//         my2DArray = [] as number[][]

//         items: { [key: number]: IItemRuntimeData } = {};

//         item: IItemRuntimeData;

//         width: number;
//         height: number;

//         clear(bag: IItemBagData) {
//             bag.byte = this;
//             let { location, level, ceil, width, height, guid } = bag;

//             if (!guid) {
//                 let cfg = gameConfig.beibao[location].levels[level - 1];
//                 width = cfg.width;
//                 height = cfg.height;
//             }



//             bag.width = width;
//             bag.height = height;

//             this.width = width;
//             this.height = height;

//             let { my2DArray } = this;
//             let k = 0;
//             for (let j = 0; j < height; j++) {
//                 let arr = my2DArray[j] = [];
//                 for (let i = 0; i < width; i++) {
//                     arr[i] = (k++ < ceil) ? BAG_FLAG.EMPTY : BAG_FLAG.LOCK;
//                 }
//             }

//             return this;
//         }

//         checkEmpty(x: number, y: number, w: number, h: number) {
//             w += x;
//             h += y;
//             let { my2DArray } = this;
//             for (let l = y; l < h; l++) {
//                 let arr = my2DArray[l]
//                 if (arr == undefined) {
//                     return false;
//                 }

//                 for (let k = x; k < w; k++) {
//                     if (arr[k] !== BAG_FLAG.EMPTY) {
//                         return false;
//                     }
//                 }
//             }

//             return true;
//         }


//         checkItem(item: IItemRuntimeData, x: number, y: number) {
//             let cfg = gameConfig.item[item.id];
//             if (cfg) {
//                 let [w, h] = cfg.shape;
//                 return this.checkEmpty(x, y, w, h);
//             }
//         }

//         getItem(x: number, y: number) {
//             let item: IItemRuntimeData = undefined;

//             let { items } = this;
//             foreach(items, v => {

//                 if (v.x == x && v.y == y) {
//                     item = v;
//                     return false;
//                 }
//                 return true;
//             });

//             return item;
//         }

//         /**
//          * 加入物品(无校验)
//          */
//         addItem(item: IItemRuntimeData) {
//             let cfg = gameConfig.item[item.id];
//             if (cfg) {
//                 let [w, h] = cfg.shape;
//                 item.model = cfg;
//                 item.width = w;
//                 item.height = h;
//                 if (this.width != 0) {
//                     this.setFlag(item.x, item.y, w, h, item.guid);
//                     this.items[item.guid] = item;
//                 } else {
//                     this.item = item;
//                 }
//             }
//         }

//         removeItem(item: IItemRuntimeData) {
//             let cfg = gameConfig.item[item.id];
//             if (cfg) {

//                 if (this.width != 0) {
//                     let [w, h] = cfg.shape;
//                     this.setFlag(item.x, item.y, w, h, BAG_FLAG.EMPTY);
//                     delete this.items[item.guid];
//                 } else {
//                     this.item = undefined;
//                 }


//             }
//         }


//         /**
//      * 找空位
//      */
//         findEmpty(w: number, h: number): [number, number] {
//             // let itemCfg = gameConfig.item[id];
//             // if (itemCfg) {

//             let r = this.width - w - 1;
//             let c = this.height - h - 1;
//             let { my2DArray } = this;
//             for (let j = 0; j < c; j++) {
//                 let arr = my2DArray[j]
//                 for (let i = 0; i < r; i++) {
//                     if (arr[i] == BAG_FLAG.EMPTY) {
//                         if (this.checkEmpty(i, j, w, h)) {
//                             return [i, j]
//                         }
//                     }
//                 }
//             }

//             return undefined;

//             // }

//             // return undefined;
//         }

//         setFlag(x: number, y: number, w: number, h: number, flag: number) {
//             w += x;
//             h += y;
//             let { my2DArray } = this;
//             for (let l = y; l < h; l++) {
//                 let temp = my2DArray[l];
//                 if (temp) {
//                     for (let k = x; k < w; k++) {
//                         temp[k] = flag;
//                     }
//                 }

//             }
//         }
//     }

// }