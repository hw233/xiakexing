declare module rf {
    interface IExcelGuanQiaData {
        index: number,
        id: string,
        roomId: number,
        type: number,
        x: number,//从0开始
        y: number,//从1开始
        paths: string[],
        element: number[],
        prop?: any,
    }

    interface IExcelGuanQiaBox {
        tag: string,
        enters: string[][]
        datas: { [key: string]: IExcelGuanQiaData }
    }

    interface IGameConfig {
        guanqia: { [key: string]: IExcelGuanQiaBox }
    }

    interface IRoomRuntime {
        id?: string,
        index?: number,
        name?: string,
        type?: number,
        roomId?: number,
        roomStatus?: number,
        paths?: string[],
        x?: number,
        y?: number,
        parent: IRoomRuntime,
    }

    interface IMapRuntime extends IResmap {
        mijingId?: number,
        name?: string,
        enter: string,
        exit: string,
        close: number,
        escape: number,
        rooms?: { [key: string]: IRoomRuntime }
    }
}


declare interface IReshero {
    target?: number;
    panelId?: number;
    mapload?: number;
}