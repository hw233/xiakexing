module rf {

    export class ChatMessageListComp extends TComponent {

        _data: Size;

        doData() {
            let { _data } = this;
            let { x, y, w, h } = _data;
            this.setPos(x, y);
            this.setSize(w, h);
            this.setScrollRect(w, h, 0, 1);
            this.scroll.scrollxy(0, this.h);
        }

        @EVT(GameEvent.CHECK_BUTTON)
        shieldMessage(event: EventX) {
            let data = event.data;
            let channels = [];
            let cachaMessage = undefined;
            if (data instanceof Array) {
                cachaMessage = screenMessageCache(data)
            } else {
                foreach(data, (channelCheck: { id: number, visible: boolean }) => {
                    if (channelCheck.visible) {
                        channels.push(channelCheck.id);
                    }
                    return true;
                });
                cachaMessage = screenMessageCache(channels)
            }

            this.removeAllChild();
            this.scroll.scrollxy(0, 0);

            forarr(cachaMessage, (message: IMessageRuntime) => {
                this.addMessage({ data: message } as EventX);
                return true;
            });
        }

        // @STRING_FORMAT("target")
        // targetRoleforamt(value: string) {
        //     let values = o1split.split(value, ",");
        //     return HtmlUtil.renderLink(values[0], values[1], values[2]);
        // }

        // @STRING_FORMAT("item")
        // itemRoleforamt(value: string) {
        //     let values = o1split.split(value, ",");
        //     let id = JSON.parse(values[0]);
        //     let itemConfig = gameConfig.item[id.id];
        //     return `<font color="#74bbd5">${itemConfig.name}</font>`;
        //     // return HtmlUtil.renderLink(itemConfig.name, undefined);
        // }

        // @STRING_FORMAT("map")
        // mapRoleforamt(value: string) {
        //     let values = o1split.split(value, ",");
        //     let name = JSON.parse(values[0]);
        //     return `${name.id}`;
        // }

        @EVT(GameEvent.ADD_MESSAGE)
        addMessage(event: EventX) {
            let runtime = event.data as IMessageRuntime;
            let { channel } = runtime;
            let isShow = true;

            // popContainer.addChild(this);
            foreach(checkData, (channelCheck: { id: number, visible: boolean }) => {
                if (channel == channelCheck.id && !channelCheck.visible) {
                    isShow = false;
                    return false;
                }
                return true;
            });

            if (!isShow) {
                return;
            }

            this.appendMessage(runtime.message);
        }

        appendMessage(msg: string) {
            let { _data, childrens } = this;
            let datas = childrens.datas;
            let endItem = datas[datas.length - 1];
            let newY = 0;
            if (endItem) {
                newY = endItem.y + endItem.h;
                // newY += 5;
            }

            let txtMsg = recyclable(TextField);
            this.addChild(txtMsg);
            // txtMsg.renderer = new SuperBatchRenderer(txtMsg);
            txtMsg.format = input_format.clone();
            txtMsg.source = inputSource;
            txtMsg.multiline = true;
            txtMsg.html = true;
            txtMsg.w = _data.w;
            txtMsg.h = 5;
            txtMsg.setPos(0, newY);
            txtMsg.text = `<font size="22" >${msg}</font>`;

            let scroll = newY + txtMsg.h;
            if (scroll >= _data.h) {
                this.h = scroll;
                this.simpleDispatch(EventT.RESIZE);
                this.scroll.scrollxy(0, scroll - _data.h);
            }
        }
    }

    export class FightMessageListComp extends TComponent {

        _data: Size;

        doData() {
            let { _data } = this;
            let { x, y, w, h } = _data;
            this.setPos(x, y);
            this.setSize(w, h);
            this.setScrollRect(w, h, 0, 1);
            this.scroll.scrollxy(0, this.h);
        }

        clearMessage() {
            this.removeAllChild();
            if (this.scroll) {
                this.scroll.scrollxy(0, 0);
            }
        }

        @EVT(GameEvent.ADD_FIGHT_MESSAGE)
        addFightMessage(event: EventX) {
            let { _data, childrens } = this;
            let datas = childrens.datas;
            let endItem = datas[datas.length - 1];
            let newY = 0;
            if (endItem) {
                newY = endItem.y + endItem.h;
                // newY += 5;
            }

            let txtMsg = recyclable(TextField);
            this.addChild(txtMsg);
            txtMsg.format = input_format.clone();
            txtMsg.source = inputSource;
            txtMsg.multiline = true;
            txtMsg.html = true;
            txtMsg.color = 0;
            txtMsg.w = _data.w;
            txtMsg.h = 5;
            txtMsg.setPos(0, newY);
            txtMsg.text = `<font size="22" >${event.data}</font>`;

            let scroll = newY + txtMsg.h;
            if (scroll >= _data.h) {
                this.h = scroll;
                this.simpleDispatch(EventT.RESIZE);
                this.scroll.scrollxy(0, scroll - _data.h);
            }
        }
    }

    // export class FightMessageListComp extends TComponent {

    //     offSetY: number;

    //     clearMessage() {
    //         this.removeAllChild();
    //         this.newY = 0;
    //         this.y = 0;

    //         // this.scroll.resetOrigin();
    //         // this.scroll.on(EventT.SCROLL, this.s_c, this);
    //     }

    //     newY: number = 0;

    //     @EVT(GameEvent.ADD_FIGHT_MESSAGE)
    //     addFightMessage(event: EventX) {
    //         let { newY, scroll, offSetY } = this;

    //         let txtMsg = recyclable(TextField);
    //         this.addChild(txtMsg);
    //         txtMsg.format = input_format.clone();
    //         txtMsg.source = inputSource;
    //         txtMsg.multiline = true;
    //         txtMsg.html = true;
    //         txtMsg.w = 590;
    //         txtMsg.color = 0;
    //         txtMsg.setPos(0, newY);
    //         txtMsg.text = event.data;

    //         this.newY += txtMsg.h;

    //         this.h = this.newY;

    //         this.setSize(590, this.newY);

    //         if (this.newY >= offSetY) {
    //             this.y = offSetY - this.newY - 10;
    //         }
    //     }

    //     s_c(e: EventX) {
    //         callLater.later(this.d_c, this, 200);
    //     }

    //     d_c(e: EventX) {
    //         this.simpleDispatch(EventT.CHANGE, this);
    //     }

    // }
}