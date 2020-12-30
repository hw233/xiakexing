module rf {
    export interface IAutoSkillRuntime extends IModelRuntime {
        runtimes?: { [key: string]: IAutoSkillData }
        nowId?: number;
    }

    export interface IAutoSkillData extends __IResautomaticSkill_runtimes, IConditionRuntime {

    }

    @RegisterModel("automaticSkill")
    export class AutomaticSkillModel extends BaseModel<IAutoSkillData> {

        runtimes: IAutoSkillRuntime;
    }

}