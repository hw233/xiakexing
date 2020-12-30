declare interface IItemExtraData {
    pro: IRespro
    durability: number
    maxdurability: number
}

declare interface IConfigLimit {

}

declare interface IFaceData {
    face_bg: number,
    face_tou: number,
    face_fa: number,
    face_mei: number,
    face_yan: number,
    face_hu: number,
}

declare interface IShopItemRuntime {

    index: number;

    //道具ID
    id: string;
    //道具数量
    count: number;

    //剩余数量 -1为无限
    hadCount: number;
    //折扣
    dis: number
}

declare const enum TEXT_LINK_TYPE {
    CHAT_LINK = "chat",// 聊天链接
    MAP_LINK = "map",// 地图链接
}

declare interface IClientData {
    waKuang?: WaKuangData;
}

declare interface WaKuangData {
    type: number;      //类型   1砍树2挖矿3观摩4搜索
    elementId: number;
    beginTime: number;  //该次采矿开始时间
    endTime: number;    //该次采矿结束时间
    user: number;         //正在挖的人的guid

    progress: number;        //已有进度  
    maxprogress: number;     //最大进度
    collection: number;      //已采集次数
    maxcollection: number;   //最大采集次数
}