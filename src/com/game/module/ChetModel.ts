module rf {
    export interface IChetRuntime extends IItemRuntime {
        // guid: number,
        user: number;
        // items: { [key: string]: IItemRuntimeData }
        width: number;
        height: number;

        cbag: IItemBagData
    }

    @RegisterModel("chet")
    export class ChetModel extends BaseModel<IConditionRuntime> {
        current: IChetRuntime;

        setCurrent(data: IChetRuntime) {

            let { guid, width, height } = data;

            let slots = data.slots = {};

            let itemobj = gameConfig.item;

            foreach(data.runtimes, item => {
                item.owner = guid;
                slots[item.slot] = item;
                item.model = itemobj[item.id];
                return true;
            }, this)

            data.cbag = { item: data, guid, width, height, beginSlot: 0, endSlot: width * height } as IItemBagData

            this.current = data;


            itemModel.itemRuntimes[data.guid] = data;

            return data;
        }




        @SOCKET_EVT(CM_CODE.CM_MoveItemInCheat)
        CM_MoveItemInCheat(event: EventX) {
            let [chetguid, itemguid] = event.data;

            let { current } = this;

            if (current && current.guid == chetguid) {
                let item = current.items[itemguid];
                if (item) {
                    // item.x = x;
                    // item.y = y;

                    facade.simpleDispatch("switchItem", item);
                }
            }



        }



        @SOCKET_EVT(CM_CODE.CM_CheatToBag)
        CM_CheatToBag(event: EventX) {
            // let [chetguid, itemguid] = event.data;
            // let { current } = this;
            // if (current && current.guid == chetguid) {
            //     let item = current.items[itemguid];
            //     if (item) {
            //         delete current.items[itemguid];
            //         // current.byte.removeItem(item);
            //         facade.simpleDispatch("removeItem", item);
            //     }
            // }
        }


        @SOCKET_EVT(CM_CODE.CM_BagToCheat)
        CM_BagToCheat(event: EventX) {
            // let [chetguid, item] = event.data;
            // let { current } = this;
            // if (current && current.guid == chetguid) {
            //     let runtime = item as IItemRuntimeData;
            //     runtime.chet = chetguid;
            //     current.byte.addItem(runtime);
            //     current.items[runtime.guid] = runtime;
            //     facade.simpleDispatch("addItem", runtime);
            // }
        }
    }

    export var chetModel = singleton(ChetModel);
}