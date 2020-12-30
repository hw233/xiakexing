module rf {
    export interface IMenpaiRuntime extends IResmenpai, IModelRuntime {
        runtimes: { [key: string]: IMenpaiRuntimeData }
    }

    export interface IMenpaiRuntimeData extends IResmenpai, IConditionRuntime {

    }

    @RegisterModel("menpai")
    export class MenpaiModel extends BaseModel<IMenpaiRuntimeData> {

        runtimes: IMenpaiRuntime;

        menpaiconfig: { [key: number]: { [key: number]: IMenpaiBranch[] } } = {};

        loadSaveData(runtimes: { [key: string]: any }) {
            super.loadSaveData(runtimes)

            foreach(gameConfig.menpai, (v, k) => {

                forarr(v.branchs, branch => {
                    if (!this.menpaiconfig[k]) {
                        this.menpaiconfig[k] = {};
                    }
                    if (!this.menpaiconfig[k][branch.branch]) {
                        this.menpaiconfig[k][branch.branch] = [];
                    }
                    this.menpaiconfig[k][branch.branch].push(branch);
                    return true;
                })

                return true;
            })
        }
    }

    export let menpaiModel = singleton(MenpaiModel);
}
