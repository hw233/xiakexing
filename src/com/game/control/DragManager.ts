module rf {

    export interface IDragTarget extends IEventDispatcherX {
        dragkey: string
        data: {};
        swtich(caster: IDragCaster): boolean;
    }

    export interface IDragCaster extends IDragTarget {
        dragDisplay: Sprite;
        reset(): void;
    }

    export const enum GameEvent {
        DRAG_START = GameEvent.DRAG,
        DRAG_ENTER,
        DRAG_STOP,
    }


    export class DragManager extends BaseModel<IConditionRuntime> {


        casterX = 0;
        casterY = 0;
        drager: Sprite;
        caster: IDragCaster;
        parent: DisplayObjectContainer;
        mouseEnabled = false;
        mouseChildren = false;
        mouseDownTime = 0;

        startDrag(caster: IDragCaster) {

            if (this.caster) return;


            let drag = caster.dragDisplay;
            let { stageX, stageY, _x, _y, mouseEnabled, mouseChildren, parent } = drag;
            this.caster = caster;

            this.casterX = _x;
            this.casterY = _y;
            this.drager = drag;
            this.parent = parent;

            drag.setPos(stageX, stageY);
            drag.mouseEnabled = false;
            drag.mouseChildren = false;
            this.mouseEnabled = mouseEnabled;
            this.mouseChildren = mouseChildren;
            ROOT.addChild(drag)

            ROOT.on(MouseEventX.MouseMove, this.mouseMoveHandler, this, 10);
            ROOT.on(MouseEventX.MouseUp, this.mouseUpHandler, this);


            this.mouseDownTime = engineNow;

            facade.simpleDispatch(GameEvent.DRAG_START, caster);


        }

        stopDrag(target: IDragTarget) {
            let { caster } = this;
            facade.simpleDispatch(GameEvent.DRAG_STOP, { caster, target })
            let b = target.swtich(caster);
            if (!b) {
                if (engineNow - this.mouseDownTime < 200) {
                    caster.simpleDispatch(MouseEventX.CLICK);
                }
            }
            this.mouseUpHandler();
        }

        mouseMoveHandler(event: EventX) {
            event.stopImmediatePropagation = true;
            let { ox, oy } = event.data as IMouseEventData;
            let { drager } = this;
            let { _x, _y } = drager;
            drager.setPos(_x + ox, _y + oy);
        }

        mouseUpHandler(event?: EventX) {
            ROOT.off(MouseEventX.MouseMove, this.mouseMoveHandler, this);
            ROOT.off(MouseEventX.MouseUp, this.mouseUpHandler, this);

            let { drager, mouseEnabled, mouseChildren, caster, casterX, casterY, parent } = this;

            drager.setPos(casterX, casterY);
            caster.dragDisplay = drager;
            this.parent.addChild(drager);
            caster.reset();

            drager.mouseEnabled = mouseEnabled;
            drager.mouseChildren = mouseChildren;

            this.drager = undefined;
            this.caster = undefined;
            this.casterX = 0;
            this.casterY = 0;
            this.mouseEnabled = false;
            this.mouseChildren = false;
            this.parent = undefined;
            if (event) {

                facade.simpleDispatch(GameEvent.DRAG_STOP);
            }
        }
    }
}