module rf {
    export class DragEventInteresterDele extends TEventInteresterDele implements IDragCaster, IDragTarget {
        dragkey: string;
        dragDisplay: Sprite;


        bindComponents() {
            let { skin } = this;
            skin.on(MouseEventX.MouseDown, this.mouseDownHandler, this);
            skin.mouseEnabled = true;
            // Object.defineProperty(skin, "mouseEnabled", {
            //     get() {
            //         return skin["__mouseEnabled"]
            //     },

            //     set(value: any) {
            //         console.log(value);
            //         skin["__mouseEnabled"] = value;
            //     },
            //     configurable: true,
            //     enumerable: true
            // })
            // skin["__mouseEnabled"] = true;
            // skin.mouseEnabled = true;


        }

        mouseDownHandler(event: EventX) {
            if (this.checkCanCaster()) {
                event.stopPropagation = true;
                singleton(DragManager).startDrag(this);
            }
        }

        startDrag(event: EventX) {
            let target = event.data as any;
            if (target.dragkey == this.dragkey && this.checkCanDrag(target)) {
                if (target != this) {
                    this.skin.on(MouseEventX.MouseUp, this.mouseUpHandler, this);
                }
            }
        }

        stopDrag(event: EventX) {
            this.skin.off(MouseEventX.MouseUp, this.mouseUpHandler, this);
        }

        mouseUpHandler(event: EventX) {
            // event.stopPropagation = true;
            singleton(DragManager).stopDrag(this);
        }

        checkCanDrag(target: any) {
            return true;
        }

        checkCanCaster() {
            return this._data != undefined;
        }

        reset() {

        }

        swtich(caster: IDragCaster) {
            return false;
        }
    }
}