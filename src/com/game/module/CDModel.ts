module rf {
    export interface ICDRuntime extends IRescd, IModelRuntime {
    }

    @RegisterModel("cd")
    export class CDModel extends BaseModel<IConditionRuntime> {

        runtimes: ICDRuntime;
        
        id2runtime(limit:IConfigLimit){
            let condition = limit.target[0];
            let cd = this.runtimes.id[condition.value];
            if(!cd){
                this.runtimes.id[condition.value]= cd = {id:condition.value,nextTime:0};
            }
            return cd;
        }


    }
}