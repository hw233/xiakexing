module rf {

    export class RoleInfoComp extends DragComponent {

        skin: TSourceCompment & IBeibaoScene_Role_info;

        dragkey = "item";

        renderer = new SuperBatchRenderer(this);

        slots: { [key: string]: Recyclable<ZhuangbeiDrag> };

        constructor() {
            super(RES_PERFIX, "ui/beibaoScene/", "role_info");
        }

        bindComponents() {
            this.skin = this as any;
            let { skin, slots } = this;
            let config = getTypeDefines(TYPE_CONFIG.ZHUANGBEI);

            this.slots = slots = {};

            foreach(config, (v, k) => {
                let item = skin[`${v.type}`];
                if (item) {
                    let bg = new TSpriteUI();
                    item.addChild(bg);
                    bg.setPos(-8, -13);
                    bg.changeSprite(`zbbg_${v.type}`, "itemIcon/zhuangbeidiban");

                    let slot = recyclable(ZhuangbeiDrag);
                    slots[v.type] = slot;
                    skin.addChild(slot);
                    slot.setPos(item._x, item._y);
                    // slot.data = itemModel.runtimes.slots[v.type];
                }
                return true;
            });

            if (skin.stage) {
                this.awaken();
            }
        }

        awaken() {

            let { skin, slots } = this;

            if (!skin) {
                return;
            }

            foreach(slots, (v, k) => {
                v.data = itemModel.runtimes.slots[k];
                return true;
            });

        }

        @EVT("addItem")
        add(event: EventX) {
            let runtime = event.data as IItemRuntimeData;
            let { owner, slot } = runtime;
            let { skin, slots } = this;
            let view = slots[slot];
            if (view) {
                view.data = runtime;
            }
        }

        @EVT("removeItem")
        removeItem(event: EventX) {
            let runtime = event.data as IItemRuntimeData;
            let { slot } = runtime;
            let { slots } = this;
            let view = slots[slot];
            if (view) {
                view.data = undefined;
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

        swtich(caster: ItemDrag) {

            if (modelData.hero.statusStupor) {
                addPrompt("昏迷中,无法使用该功能!");
                return false;
            }

            let { slot: sl, guid, model, owner } = caster._data as IItemRuntimeData;

            let { slots } = this;

            let view = slots[sl];
            if (view) {
                return false;
            }

            if (model.type == ITEM_TYPE.Zhuangbei) {

                // let [soltA, soltB] = model.slot;

                // view = slots[soltA];

                // let slot = view.data ? soltB ? slots[soltB].data ? soltA : soltB : soltA : soltA;

                foward(CM_CODE.CM_UseItem, [guid, 1, owner]);

                // if (view.data) {
                //     foward(CM_CODE.CM_UseItem, [guid, 1, owner]);
                // } else {
                //     foward(CM_CODE.CM_TakeOnEquip, [guid, slot, owner]);
                // }

            } else {
                addPrompt("该物品不是装备!");
            }

            return true;
        }

    }
}