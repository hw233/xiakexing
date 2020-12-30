 module rf {

    export interface ICookieConfig {
        account: string;
        token: string;
        ip: string;
    }

    export class LoginPanel extends Mediator {

        panel: Panel & IPackage_LoginPanel;

        tipsText: TextField;

        tokenText: TextField;
        ipText: TextField;

        constructor() {
            super("login");
            this.setPanel(new Panel("ui/package/", "loginPanel", RES_PERFIX));
        }

        resize(width: number, height: number) {

            let { panel } = this;
            let { w, h } = panel;

            let y = height - h >> 1;
            let x = width - w >> 1;
            this.panel.setPos(x, y);
        }

        bindComponents() {

            this.panel.setSize(stageWidth, stageHeight);

            let text = new TextField();
            this.panel.addChild(text);
            text.setPos(10, 15);
            text.html = true;
            text.format = defalue_format.clone();
            this.tokenText = text;

            text = new TextField();
            this.panel.addChild(text);
            text.setPos(250, 15);
            text.html = true;
            text.format = defalue_format.clone();
            this.ipText = text;

            let { tokenText, ipText, panel } = this;

            panel.denglucomp.setPos(0, stageHeight - panel.denglucomp.h - 10);

            new DengluDele(panel.denglucomp);

            let { ip, token } = cookieConfig;
            launchData.ip = ip;

            if (serversBool) {
                let servers = [
                    // { id: "137", label: "内网", ip: "192.168.103.137" },
                    // { id: "whh", label: "whh", ip: "10.246.121.117" },
                    // { id: "xjj", label: "xjj", ip: "10.246.120.192" },
                    // { id: "cjy", label: "cjy", ip: "10.246.121.68" },
                    // { id: "wf", label: "wf", ip: "10.246.121.150" },
                    // { id: "sbw", label: "sbw", ip: "10.246.120.110" },
                    { id: "sss", label: "本地", ip: "192.168.1.198" },
                ]

                setText(tokenText, token, Style.ORANGE, 24);
                setText(ipText, ip, Style.ORANGE, 24);

                forarr(servers, (v, k) => {
                    let button = new TButton();
                    this.panel.addChild(button);

                    button.setPos(555, (k * 55) + 15);
                    button.setButton(v.label, () => {

                        launchData.ip = cookieConfig.ip = v.ip;
                        setText(ipText, v.ip, Style.ORANGE, 24);

                    }, 80, 40);

                    return true;
                }, this);
            }
        }
    }
}