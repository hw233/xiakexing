module rf {

    // export let socket:TSocket;

    export let launchData: ILaunchData;

    export interface ILaunchData {
        account: string;
        time: number;
        md5: string;

        pid: string;
        sid: number;
        platform: string;
        params: { [key: string]: any };
        demo: number;
        domain: string;

        resroot: string;
        confroot: string;
        assetsroot: string;

        ip: string;
        port: number;
        wsurl: string;

        canvas: HTMLCanvasElement;
    }

    export function launchGame(setting: ILaunchData) {
        // UIDiffFilter.FRAGMENT.code = "vec4 color = vec4(1.0,1.0,1.0,1.0);"
        launchData = setting;
        http_load_Link.warningMax = 1000;
        http_res_max_loader = 10;
        new Main().init(launchData.canvas);
    }
}