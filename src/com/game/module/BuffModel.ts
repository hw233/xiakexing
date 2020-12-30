module rf {

    @RegisterModel("buff")
    export class BuffModel extends BaseModel<IConditionRuntime> {

        @GM_CMD()
        addbuff(id: number, pro: any, delay: number, type: number) {
            gm("buff", id, pro, delay, type);
        }

    }



}