

module rf {

    export var foward: (code: number, value?: any, proto?: number) => void;

    export var gm: (command: string, ...args: any) => void

    export var socketMessageFlag = 1;

    export var socketData: { client_data: IClientData, userInfo: IClientUserInfo }

    export class TSocket extends Socket implements ISocketEventInterests {

        packer = singleton(AMFPacker)
        socketEventInterests: EventInterestType;

        constructor() {
            super();
            socketDispatcher.registerEvent(this.socketEventInterests, this);
        }

        // connect(url: string): void{

        // }

        sEncode(option: ISocketSendOption) {
            return this.packer.encode(option);
        }

        onMessage(e: ISocketMessageType) {
            if (e.socketTaskId == this.socketTaskId) {
                var stream = this.packer.decode(e.data);
                if (stream) {

                    if (stream.type >= socketMessageFlag) {
                        let sendTime = this.sendTime[stream.type];
                        if (sendTime) {
                            sendTime = Date.now() - sendTime;
                        } else {
                            sendTime = "-";
                        }
                        console.warn(`message ${stream.type} [${(e.data.byteLength / 1024).toFixed(2)}kb ${sendTime}ms] `, stream.data);
                        this.sendTime[stream.type] = 0;
                    }




                    socketDispatcher.dispatchEvent(stream);
                    stream.recycle();
                }
            }
        };

        sendTime: { [key: number]: number } = {};

        simpleSend(code: number, value?: any, proto?: number) {
            if (code >= socketMessageFlag) {
                console.warn(`send ${code} `, value)
                this.sendTime[code] = Date.now();
            }

            super.simpleSend(code, value, proto)
        }

        gm(command: string, ...args: any) {
            foward(3, [command, args]);
        }

        onOpen(e: ISocketType) {
            super.onOpen(e);
            console.log("onOpen");
            let account = launchData.account;
            this.simpleSend(8193, { account })
            foward = this.simpleSend.bind(this);
            gm = this.gm.bind(this);
            if (typeof globalThis != "undefined") {
                globalThis.foward = foward;
                globalThis.gm = gm;
            }
        }



        @SOCKET_EVT(4200)
        loginCompleteHandler(event: StreamX) {
            socketData = event.data as { client_data: IClientData, userInfo: IClientUserInfo };
            facade.simpleDispatch("socket_connect");
            this.ping();
        }


        ping() {
            foward(0);
        }

        @SOCKET_EVT(0)
        heartHandler(event: StreamX) {
            let { code, now } = event.data;
            if (!code) {
                console.log("socket error code:0")
                this.close(code);
                this.simpleDispatch("USER_RECONNECT_ACK")
            } else {
                serverDate = now;
                _engineNow = Date.now();
                callLater.later(this.ping, this, 10000);
            }
        }

        @EVT(SocketEventX.CLOSE)
        socketClose(e: EventX) {
            let data = e.data as ISocketType;

            if (kickOut) {
                return;
            }

            let runtime = {
                title: "系统提示",
                value: "与服务器断开连接，请刷新重进!",
                rightEvt: () => {
                    window.location.reload();
                }
            } as IPopRuntime;

            singleton(WenziTitleBtnPopup).open(runtime);
        }
    }


    export var serverDate = Date.now();
    var _engineNow = Date.now()

    export function getServerDate() {
        return serverDate + Date.now() - _engineNow;
    }
}