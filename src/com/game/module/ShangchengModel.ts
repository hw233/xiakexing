module rf {

    export interface IShangchengRuntime extends IResshangcheng, IModelRuntime {
        actives: { [key: string]: IShangchengData }
    }

    export interface IShangchengData extends IConditionRuntime {
        id: number;
        count: number;
        model: IShangcheng;
    }

    @RegisterModel("shangcheng")
    export class ShangchengModel extends BaseModel<IShangchengData> {

        runtimes: IShangchengRuntime;

        loadSaveData(runtimes: { [key: string]: any }) {
            super.loadSaveData(runtimes)
            let actives = this.runtimes.actives;
            foreach(gameConfig.shangcheng, v => {
                actives[v.id].model = v;
                return true;
            }, this)
        }

        @EVT(`${ResConst.SHANGCHENG}.${IResshangchengConst.ACTIVES}.count`)
        refreshCount(event: EventX) {
            let v = event.data as IShangchengData;
            if (v) {
                facade.simpleDispatch(GameEvent.REFRESH_SHANGCHENG_DATA, v.id);
            }
        }

    }
}