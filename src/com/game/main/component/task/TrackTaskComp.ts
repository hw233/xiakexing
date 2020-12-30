module rf {
    export class TrackTaskComp extends TSourceCompment {

        skin: TSourceCompment & IPackage_Current_task;

        _data: ITaskRuntimeData;

        constructor() {
            super(RES_PERFIX, "ui/package/", "current_task");
        }

        bindComponents() {
            this.skin = this as any;
            this.y = -3;
        }

        @EVT(GameEvent.REFRESH_TASK_JINDU)
        refresh(event: EventX) {
            let { _data } = this;
            if (!_data) {
                return;
            }

            this.doData();
        }

        @EVT(GameEvent.REFRESH_TASK_ACTIVE)
        REFRESH_TASK_ACTIVE(event: EventX) {

            let runtime = event.data as ITaskRuntimeData;
            let { _data } = this;

            if (_data && runtime.guid == _data.guid) {
                this.doData();
            }
        }

        doData() {
            let { _data, skin } = this;

            if (!skin) {
                return;
            }

            if (!_data) {
                console.log(debug, "没有任务_data");
                return;
            }

            let { txt_title } = skin;

            let { config, active } = _data;
            let { name, completionCondition, acceptdesc, completedesc } = config.model;

            let desc = "";

            if (active == TASK_FLAG.PRE_COMPLETE && completedesc) {
                desc = `<font color="${Style.PROTITLE}">${name}:</font><font color="${Style.WHITE}">${StringFormat.decode(completedesc)}</font>`;
            } else {
                desc = `<font color="${Style.PROTITLE}">${name}:</font><font color="${Style.WHITE}">${StringFormat.decode(acceptdesc)}</font>`;

                if (completionCondition) {
                    let limit = getLimitValues(completionCondition)[0];
                    if (limit != undefined) {
                        if (limit.count != undefined && limit.maxCount != undefined) {
                            let count = limit.count;
                            let maxCount = limit.maxCount;
                            count = Math.min(count, maxCount);
                            desc += `<font color="${Style.WHITE}">(${count}/${maxCount})</font>`;
                        }
                    }
                }
            }

            setText(txt_title, desc);
        }

        clear() {
            let { skin } = this;

            if (!skin) {
                return;
            }

            this._data = undefined;

            let { txt_title } = skin;
            setText(txt_title, "");
        }

    }
}