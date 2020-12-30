module rf {
    export class DragComponent extends TSourceCompment implements IDragCaster, IDragTarget {
        dragkey: string;
        dragDisplay: Sprite;


        bindComponents() {
            this.on(MouseEventX.MouseDown, this.mouseDownHandler, this);
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
                    this.on(MouseEventX.MouseUp, this.mouseUpHandler, this);
                }
            }
        }

        stopDrag(event: EventX) {
            this.off(MouseEventX.MouseUp, this.mouseUpHandler, this);
            // let data = event.data as { caster: any, target: any };
            // if (data) {
            //     let { target, caster } = data;
            //     if (target == this) {
            //         this.swtich(caster, target);
            //     }
            // }
        }

        mouseUpHandler(event: EventX) {
            // event.stopPropagation = true;
            // console.log(this._data);
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

        swtich(caster: any) {
            return false;
        }
    }
}