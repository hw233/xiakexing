module rf {

    export var ceil_oX: number = 64 + 10;
    export var ceil_oY: number = 64 + 10;
    
    export var splitItemBool: boolean;
    export var deleteItemBool: boolean;

    export class BagView extends DragComponent {

        dragkey = "item";

        renderer = new SuperBatchRenderer(this);

        _data: IItemBagData;

        clazz: { new(): BaseDrag };

        bg: SingleImage;

        constructor(Clazz: { new(): BaseDrag }) {
            super();
            this.clazz = Clazz;
        }

        slots: { [key: string]: Recyclable<BaseDrag> } = {};

        doData() {
            let { _data, slots, clazz } = this;

            foreach(slots, item => {
                item.remove();
                return true;
            }, this)

            if (_data) {
                let { width, height, beginSlot, location, item } = _data;

                let count = width * height;

                for (let k = 0; k < count; k++) {
                    let ox = 0;
                    let oy = 0;

                    let i = k % width;
                    ox = ceil_oX * i;
                    let j = k / width >> 0;
                    oy = ceil_oY * j;

                    let item = slots[beginSlot + k];
                    if (!item) {
                        slots[beginSlot + k] = item = recyclable(clazz);
                    }
                    item.setPos(ox, oy);
                }

                if (!this.bg) {

                    this.bg = new SingleImage();
                    this.addChildAt(this.bg, 0);
                    this.bg.loadComplete = (source: BitmapSource) => {

                        this.bg.source = source;

                        let { graphics, w, h } = this.bg;

                        graphics.clear();

                        for (let k = 0; k < count; k++) {
                            let ox = 0;
                            let oy = 0;

                            let i = k % width;
                            ox += ceil_oX * i;
                            let j = k / width >> 0;
                            oy += ceil_oY * j;

                            graphics.drawBitmap(ox, oy, source.getSourceVO(0));
                        }

                        graphics.end();

                        if (w != 0) {
                            this.bg.w = 0;
                            this.bg.setSize(w, h);
                            this.bg.simpleDispatch(EventT.RESIZE, true)
                        }

                        this.bg.simpleDispatch(EventT.COMPLETE);
                    };
                }

                this.bg.load(RES_PERFIX, "bg/item_bg.png");

                // let ceil = 64;

                // let w = width * ceil;
                // let h = height * ceil;

                // graphics.drawRect(0, 0, width * ceil, height * ceil, 0xFFCC00, 0.8);

                // for (let i = 0; i <= height; i++) {
                //     graphics.drawLine(0, i * ceil, w, i * ceil, 0xFDFDFD, 2, 0.7);
                //     for (let j = 0; j <= width; j++) {
                //         graphics.drawLine(j * ceil, 0, j * ceil, h, 0xFDFDFD, 2, 0.1);
                //     }
                // }

                let locationItems = itemModel.getAreaItems(item, _data);

                forarr(locationItems, item => {

                    let slot = slots[item.slot];
                    if (slot) {
                        slot.data = item;
                        this.addChild(slot);
                    }

                    return true;
                }, this)
            }
        }

        @EVT("addItem")
        add(event: EventX) {
            let runtime = event.data as IItemRuntimeData;
            let { _data, slots } = this;
            let { guid } = _data;

            let { owner, slot } = runtime;

            if (owner == guid) {

                let item = slots[slot];
                if (item) {
                    item.data = runtime;
                    this.addChild(item);
                }

            }
        }

        @EVT("changeItem")
        changeItem(event: EventX) {
            let runtime = event.data as IItemRuntimeData;
            let { _data, slots } = this;
            let { guid } = _data;
            let { owner, slot } = runtime;
            if (owner == guid) {
                let item = slots[slot];
                if (item) {
                    item.doData();
                }

            }
        }

        @EVT("removeItem")
        removeItem(event: EventX) {
            let runtime = event.data as IItemRuntimeData;
            let { _data, slots } = this;
            let { guid } = _data;

            let { owner, slot } = runtime;

            if (owner == guid) {
                let item = slots[slot];
                if (item) {
                    item.remove();
                    item.data = undefined;
                }

            }
        }

        @EVT(GameEvent.DRAG_START)
        startDrag(event: EventX) {
            super.startDrag(event);
        }

        @EVT(GameEvent.DRAG_STOP)
        stopDrag(event: EventX) {
            super.stopDrag(event);
        }


        // @EVT("switchItem")
        // switchItem(event: EventX) {
        // let runtime = event.data as IItemRuntimeData;
        // if (runtime.location == this._data.location) {
        //     let item = this.items[runtime.guid];
        //     if (item) {
        //         item.resetPostion();
        //     }
        // }
        // }

        swtich(caster: BaseDrag) {

            let { stageX: tsx, stageY: tsy, _data } = this;
            let { stageX: csx, stageY: csy, data: runtime } = caster;

            if (!runtime) {
                addPrompt("手速太慢!");
                return;
            }

            let { owner: fguid, slot: fslot, count, location } = runtime as IItemRuntimeData;

            let halfceilX = ceil_oX >> 1;
            let halfceilY = ceil_oY >> 1;

            let tx = (csx + halfceilX - tsx) / ceil_oX >> 0;
            let ty = (csy + halfceilY - tsy) / ceil_oY >> 0;

            let { width, height, beginSlot, guid, location: baglocation } = _data;

            let slot = beginSlot + ty * width + tx;

            // console.log(tsx, csx, tx, ty, slot);

            if (fguid != guid || fslot != slot) {
                playEffectKeyByAudio("yi_dong_wu_pin");

                // if (location != baglocation && baglocation >= 200 && baglocation <= 300) {
                //     let { mapstatus } = modelData.hero;
                //     if (mapstatus != MAP_STATUS.FU_BEN && count > 1) {
                //         let popup = singleton(SplitItemPopup);
                //         popup.tx = tx;
                //         popup.ty = ty;
                //         popup.open(caster._data);
                //         return true;
                //     }
                // }

                foward(CM_CODE.CM_MoveItem, [fguid, fslot, guid, slot] as TCM_MoveItem);

                return true;
            }

            return false;

            // return;

            // let tx = (this.mouseX - caster.mouseX) / 64 >> 0;
            // let ty = (this.mouseY - caster.mouseY) / 64 >> 0;

            // let { width, height, guid,  chet, model, count } = caster._data;

            // let {  location: baglocation, guid: bagGuid } = _data;

            // let isSame = (location == baglocation);

            // if (isSame) {

            //     if (tx == x && ty == y && byte.items[guid]) {
            //         return false;
            //     }

            //     byte.setFlag(x, y, width, height, BAG_FLAG.EMPTY);
            // }

            // if (byte.checkEmpty(tx, ty, width, height)) {
            //     //todo send to server

            //     // console.log(`send to server ${guid} ${location} ${x} ${y}`);

            //     if (__class__ == "ZhuangbeiDrag") {
            //         foward(CM_CODE.CM_TakeOffEquip, guid);
            //         foward(CM_CODE.CM_MoveItem, [guid, baglocation, tx, ty] as TCM_MoveItem);
            //     } else {
            //         if (bagGuid || chet) {
            //             //在宝箱或者尸体中操作

            //             if (bagGuid) {
            //                 foward(CM_CODE.CM_BagToCheat, [guid, bagGuid, tx, ty] as TCM_BagToCheat);
            //             } else {
            //                 foward(CM_CODE.CM_CheatToBag, [chet, guid, baglocation, tx, ty] as TCM_CheatToBag);
            //             }

            //         } else {

            //             let { mapstatus } = modelData.hero;

            //             if (mapstatus != MAP_STATUS.FU_BEN && count > 1 && !isSame) {

            //                 let popup = singleton(SplitPopupComp);
            //                 popup.tx = tx;
            //                 popup.ty = ty;
            //                 popup.open(caster._data);

            //             } else {
            //                 foward(CM_CODE.CM_MoveItem, [guid, baglocation, tx, ty] as TCM_MoveItem);
            //             }
            //         }
            //     }

            //     return true;


            // } else {

            //     if (location == baglocation) {
            //         byte.setFlag(x, y, width, height, guid);
            //     }

            //     let item = byte.getItem(tx, ty);
            //     if (item) {

            //         if (item.model.id == model.id) {

            //             let { mapstatus } = modelData.hero;

            //             if (mapstatus != MAP_STATUS.FU_BEN && count > 1 && !isSame) {

            //                 let popup = singleton(SplitPopupComp);
            //                 popup.tx = tx;
            //                 popup.ty = ty;
            //                 popup.open(caster._data);
            //             } else {
            //                 foward(CM_CODE.CM_ItemMerge, [item.guid, guid]);
            //             }

            //         } else {
            //             foward(CM_CODE.CM_SwapItem, [guid, item.guid]);
            //         }
            //     }

            // }
        }
    }
}
