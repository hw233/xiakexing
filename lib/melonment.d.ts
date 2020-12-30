declare module rf {
    interface ICreateRewardedVideoAdOption {
        adUnitId: string;
        multiton?: boolean;
    }
    interface IAdSuccessOption {
        compId: number;
        state: string;
        isEnded: boolean;
    }
    function createRewardedVideoAd(option: ICreateRewardedVideoAdOption): RewardedVideoAd;
    class RewardedVideoAd {
        div: HTMLDivElement;
        txt: HTMLSpanElement;
        completeButton: HTMLButtonElement;
        normalButton: HTMLButtonElement;
        showinterval: any;
        constructor();
        normalButtonClickHandler(): void;
        completeButtonClickHandler(): void;
        private onLoadFuncs;
        private onCloseFuncs;
        load(): Promise<unknown>;
        private lastTime;
        private update;
        show(): Promise<unknown>;
        destroy(): void;
        onLoad(func: Function): void;
        offLoad(func: Function): void;
        onError(func: Function): void;
        offError(func: Function): void;
        onClose(func: Function): void;
        offClose(func: Function): void;
    }
}
declare module rf {
    interface ILoginOption extends IActiveOption {
        account?: string;
    }
    function login(options: ILoginOption): void;
    function checkSession(options: IActiveOption): void;
    const enum IScene {
        Scene_1001 = 1001,
        Scene_1005 = 1005,
        Scene_1006 = 1006,
        Scene_1007 = 1007,
        Scene_1008 = 1008,
        Scene_1011 = 1011,
        Scene_1012 = 1012,
        Scene_1013 = 1013,
        Scene_1014 = 1014,
        Scene_1017 = 1017,
        Scene_1019 = 1019,
        Scene_1020 = 1020,
        Scene_1022 = 1022,
        Scene_1023 = 1023,
        Scene_1024 = 1024,
        Scene_1025 = 1025,
        Scene_1026 = 1026,
        Scene_1027 = 1027,
        Scene_1028 = 1028,
        Scene_1029 = 1029,
        Scene_1030 = 1030,
        Scene_1031 = 1031,
        Scene_1032 = 1032,
        Scene_1034 = 1034,
        Scene_1035 = 1035,
        Scene_1036 = 1036,
        Scene_1037 = 1037,
        Scene_1038 = 1038,
        Scene_1039 = 1039,
        Scene_1042 = 1042,
        Scene_1043 = 1043,
        Scene_1044 = 1044,
        Scene_1045 = 1045,
        Scene_1046 = 1046,
        Scene_1047 = 1047,
        Scene_1048 = 1048,
        Scene_1049 = 1049,
        Scene_1052 = 1052,
        Scene_1053 = 1053,
        Scene_1054 = 1054,
        Scene_1056 = 1056,
        Scene_1057 = 1057,
        Scene_1058 = 1058,
        Scene_1059 = 1059,
        Scene_1064 = 1064,
        Scene_1067 = 1067,
        Scene_1068 = 1068,
        Scene_1069 = 1069,
        Scene_1071 = 1071,
        Scene_1072 = 1072,
        Scene_1073 = 1073,
        Scene_1074 = 1074,
        Scene_1077 = 1077,
        Scene_1078 = 1078,
        Scene_1079 = 1079,
        Scene_1081 = 1081,
        Scene_1082 = 1082,
        Scene_1084 = 1084,
        Scene_1089 = 1089,
        Scene_1090 = 1090,
        Scene_1091 = 1091,
        Scene_1092 = 1092,
        Scene_1095 = 1095,
        Scene_1096 = 1096,
        Scene_1097 = 1097,
        Scene_1099 = 1099,
        Scene_1102 = 1102,
        Scene_1103 = 1103,
        Scene_1104 = 1104
    }
    interface ReferrerInfo {
        appId: string;
        extraData: object;
    }
    interface ILaunchOption {
        scene: IScene;
        query: any;
        shareTicket: string;
        referrerInfo: ReferrerInfo;
    }
    function getLaunchOptionsSync(): ILaunchOption;
}
declare module rf {
    let createInnerAudioContext: () => InnerAudioContext;
    interface IAudioContextChild {
        loop: boolean;
        autoplay: boolean;
        target: any;
        starttime?: number;
        duration?: number;
    }
    class InnerAudioContext {
        private audiocontext;
        private volNode;
        autoplay: boolean;
        loop: boolean;
        private _vol;
        private childs;
        constructor(audiocontext?: AudioContext);
        set volume(val: number);
        get volume(): number;
        set src(val: string);
        play(): void;
        pause(): void;
        stop(): void;
        destroy(): void;
        onCanplay(callback: Function): void;
        onEnded(callback: Function): void;
        onPause(callback: Function): void;
        onError(callback: Function): void;
        onPlay(callback: Function): void;
        onStop(callback: Function): void;
        onWaiting(callback: Function): void;
        onTimeUpdate(callback: Function): void;
        private playSingle;
        private audioEnd;
        private endHandler;
        private createsource;
    }
}
declare module rf {
    const enum IBannerAdTestDemoType {
        STYLE_W1_P1_65 = "65",
        STYLE_W1_P1_184 = "184",
        STYLE_W0_P1_193 = "193",
        STYLE_W2_P1_194 = "194",
        STYLE_W1_P1_210 = "210",
        STYLE_W1_P3_285 = 285
    }
    interface IBannerAdStyle {
        left: number;
        top: number;
        width: number;
        height: number;
    }
    interface IBannerAdOption {
        adUnitId: string;
        style: IBannerAdStyle;
        testDemoType?: IBannerAdTestDemoType;
        adIntervals?: number;
    }
    function createBannerAd(option: IBannerAdOption): BannerAd;
    class BannerAd {
        button: HTMLButtonElement;
        option: IBannerAdOption;
        style: IBannerAdStyle;
        private onLoadFuncs;
        private onCloseFuncs;
        constructor(option: IBannerAdOption);
        show(): Promise<unknown>;
        adButtonClickHandler(event: MouseEvent): void;
        destroy(): void;
        onLoad(func: Function): void;
        offLoad(func: Function): void;
        onResize(func: Function): void;
        hide(): void;
        onError(func: Function): void;
        offError(func: Function): void;
        onClose(func: Function): void;
        offClose(func: Function): void;
    }
}
declare module rf {
    interface IServiceConversationOption extends IActiveOption {
        sessionFrom?: string;
        showMessageCard?: boolean;
        sendMessageTitle?: string;
        sendMessagePath?: string;
        sendMessageImg?: string;
    }
    function openCustomerServiceConversation(option: IServiceConversationOption): void;
}
declare module rf {
    var cookie: {
        [key: string]: string;
    };
    function cookie_init(): void;
    function cookie_flush(): void;
}
declare module rf {
    var no_systemInfo: ISystemInfo;
    var no_ismobile: boolean;
    var no_isIphone: boolean;
    var no_maincanvas: HTMLCanvasElement;
    var no_softKeyboard: boolean;
    var no_stageWidth: number;
    var no_stageHeight: number;
    function createCanvas(): HTMLCanvasElement;
    function createImage(): HTMLImageElement;
    function setPreferredFramesPerSecond(fps: number): void;
    interface ISystemInfo {
        model: string;
        pixelRatio: number;
        windowWidth: number;
        windowHeight: number;
        system: string;
        language: string;
        version: string;
        screenWidth: number;
        screenHeight: number;
        SDKVersion: string;
        brand: string;
        fontSizeSetting: number;
        benchmarkLevel: number;
        batteryLevel: number;
        statusBarHeight: number;
        safeArea: ISystemInfoSafeArea;
        platform: string;
        devicePixelRatio: number;
    }
    interface ISystemInfoSafeArea {
        right: number;
        bottom: number;
        left: number;
        top: number;
        width: number;
        height: number;
    }
    function initSystemInfo(): void;
    function getSystemInfoSync(): ISystemInfo;
    interface IWindowResizeData {
        windowWidth: number;
        windowHeight: number;
    }
    var isShowSoftKeyboard: boolean;
    function onWindowResize(callback: Function): void;
    function resetCssStyle(style: {
        [key: string]: {
            [key: string]: string;
        };
    }): void;
    interface IOnShowData {
        scene: string;
        query: object;
        shareTicket: string;
        referrerInfo: {
            appId: string;
            extraData: object;
        };
    }
    function onShow(callback: Function): void;
    function offShow(callback: Function): void;
    function onHide(callback: Function): void;
    function offHide(callback: Function): void;
    function onAudioInterruptionBegin(callback: Function): void;
    function onAudioInterruptionEnd(callback: Function): void;
    function arrayBufferToBase64(buffer: ArrayBuffer): string;
    function onMemoryWarning(callback: (res: any) => void): void;
    interface IExitMiniProgramOption {
        success?: Function;
        fail?: Function;
        complete?: Function;
    }
    function exitMiniProgram(res: IExitMiniProgramOption): void;
}
declare module rf {
    const enum HttpResponseType {
        TEXT = "text",
        ARRAY_BUFFER = "arraybuffer"
    }
    const enum HttpMethod {
        GET = "GET",
        POST = "POST"
    }
    interface IHttpOption extends IActiveOption {
        url?: string;
        filePath?: string;
        header?: {
            [key: string]: string;
        };
        method?: HttpMethod;
        responseType?: HttpResponseType;
        data?: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream;
    }
    interface IHttpData {
        errMsg?: string;
        statusCode?: number;
        tempFilePath?: string;
        header?: object;
        data?: string | object | ArrayBuffer;
    }
    function downloadFile(option: IHttpOption): void;
    class DownloadTask {
        protected option: IHttpOption;
        constructor(option: IHttpOption);
        abort(): void;
        onProgressUpdate(callback: Function): void;
    }
    function request(option: IHttpOption): void;
}
declare module rf {
    interface ISavedFileListItemData {
        filePath: string;
        size: number;
        createTime: number;
    }
    interface ISavedFileListData {
        fileList: ISavedFileListItemData[];
    }
    interface IFileInfoData {
        size: number;
    }
    const enum READ_FILE_ENCODING {
        BINARY = "binary",
        UTF8 = "utf-8"
    }
    interface IFileOption extends IActiveOption {
        path: string;
        filePath: string;
        encoding: READ_FILE_ENCODING;
        oldPath: string;
        newPath: string;
        data: string | ArrayBuffer;
    }
    interface IZipOption extends IActiveOption {
        zipFilePath: string;
        targetPath: string;
    }
    interface IDirOption extends IActiveOption {
        dirPath: string;
        recursive?: boolean;
    }
    const enum env {
        USER_DATA_PATH = ""
    }
    function getFileSystemManager(): FileSystemManager;
    class FileSystemManager {
        appendFileSync(filePath: string, data: string | ArrayBuffer, encoding: string): void;
        accessSync(path: string): boolean;
        copyFileSync(srcPath: string, destPath: string): void;
        private toFileData;
        private readFileData;
        private writeFileData;
        getSavedFileList(option: IActiveOption): void;
        getFileInfo(option: IFileOption): void;
        removeSavedFile(option: IFileOption): void;
        mkdir(option: IDirOption): void;
        mkdirSync(dirPath: string, recursive: boolean): void;
        readFile(option: IFileOption): void;
        readFileSync(filePath: string, encoding?: READ_FILE_ENCODING, position?: string, length?: string): void;
        writeFile(option: IFileOption): void;
        writeFileSync(filePath: string, data: string | ArrayBuffer, encoding?: READ_FILE_ENCODING): void;
        readdir(option: IDirOption): void;
        rmDir(option: IDirOption): void;
        rename(option: IFileOption): void;
        stat(option: IFileOption): Stats;
        statSync(path: string): Stats;
        unlink(option: IFileOption): void;
        unzip(option: IZipOption): void;
    }
    class Stats {
        model: string;
        size: number;
        lastAccessedTime: number;
        lastModifiedTime: number;
        isDirectory(): boolean;
        isFile(): boolean;
    }
}
declare module rf {
    interface IFontFace {
        constructor(fontFamily: string, url: string | ArrayBuffer): IFontFace;
        load(): Promise<IFontFace>;
        loaded: Promise<IFontFace>;
        display: string;
        family: string;
        featureSettings: string;
        status: string;
        stretch: string;
        style: string;
        unicodeRange: string;
        variant: string;
        weight: string;
        source: string;
    }
    function loadFont(path: string, family?: string, option?: IActiveOption): string;
}
declare module rf {
    interface IActiveOption {
        success?: Function;
        fail?: Function;
        complete?: Function;
    }
}
declare module rf {
    interface IShowToastOption extends IActiveOption {
        title: string;
        icon: string;
        image: string;
        duration: number;
        mask: boolean;
    }
    function showToast(option: IShowToastOption): void;
    function hideToast(option: IActiveOption): void;
    interface IShowActionSheetOption extends IActiveOption {
        itemList: string[];
        itemColor: string;
    }
    function showActionSheet(option: IShowActionSheetOption): void;
    interface IShowLoadingOption extends IActiveOption {
        title: string;
        mask: boolean;
    }
    function showLoading(option: IShowLoadingOption): void;
    function hideLoading(option: IActiveOption): void;
    interface IShowModalOption extends IActiveOption {
        title: string;
        content: string;
        showCancel: boolean;
        cancelText: string;
        cancelColor: string;
        confirmText: string;
        confirmColor: string;
    }
    function showModal(option: IShowModalOption): void;
    interface IMenuButtonBoundingClientRectData {
        width: number;
        height: number;
        top: number;
        right: number;
        bottom: number;
        left: number;
    }
    function getMenuButtonBoundingClientRect(): IMenuButtonBoundingClientRectData;
}
declare module rf {
    const enum KeyboardConfirmType {
        DONE = "done",
        NEXT = "next",
        SEARCH = "search",
        GO = "go",
        SEND = "send"
    }
    const enum KeyboardInputType {
        EMAIL = "email",
        NUMBER = "number",
        DECIMAL = "number",
        PHONE_NUMBER = "phone",
        SINGLE_LINE = "text",
        ANY = "text",
        PASSWARD = "password"
    }
    interface IKeyboardOption extends IActiveOption {
        value?: string;
        defaultValue?: string;
        maxLength?: number;
        multiple?: boolean;
        confirmHold?: boolean;
        confirmType?: KeyboardConfirmType;
        inputType?: KeyboardInputType;
        x?: number;
        y?: number;
        w?: number;
        h?: number;
        style?: {
            [key: string]: {
                [key: string]: string;
            };
        };
    }
    interface IKeyboardData {
        value: string;
    }
    var keyboardInputCallBack: Function;
    var keyboardConfirmCallBack: Function;
    var keyboardCompleteCallBack: Function;
    function onKeyboardInput(callback: Function): void;
    function offKeyboardInput(callback: Function): void;
    function onKeyboardConfirm(callback: Function): void;
    function offKeyboardConfirm(callback: Function): void;
    function onKeyboardComplete(callback: Function): void;
    function offKeyboardComplete(callback: Function): void;
    function input_interval(): void;
    function showKeyboard(option?: IKeyboardOption): void;
    function hideKeyboard(option?: IActiveOption): void;
    function updateKeyboard(option?: IKeyboardOption): void;
}
declare module rf {
    var textarea: HTMLTextAreaElement;
    var logs: string[];
    function dateFtt(fmt: any, date: any): any;
    function showLog(value: boolean): void;
    function log(msg?: string, color?: string): void;
}
declare module rf {
    function melonmentSetup(): void;
}
declare module rf {
    interface ITouchData {
        identifier: number;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
    }
    interface ITouchEventData {
        touches: ITouchData[];
        changedTouches: ITouchData[];
        timeStamp: number;
        target: EventTarget;
        event: MouseEvent;
        preventDefault: Function;
        stopPropagation: Function;
        ctrlKey: boolean;
        shiftKey: boolean;
        altKey: boolean;
        type: string;
    }
    var eventTarget: Document;
    function onTouchStart(callBack: Function): void;
    function onTouchMove(callBack: Function): void;
    function onTouchEnd(callBack: Function): void;
    function onTouchCancel(callBack: Function): void;
}
declare module rf {
    function vibrateShort(option?: IActiveOption): void;
    function vibrateLong(option?: IActiveOption): void;
    function onNetworkStatusChange(callback: (res: {
        isConnected: boolean;
        networkType: string;
    }) => void): void;
    function getNetworkType(option: IActiveOption): void;
    interface ISceenBrightneesOption extends IActiveOption {
        value: number;
    }
    function setScreenBrightness(option: ISceenBrightneesOption): void;
    interface IKeepScreenOnOption extends IActiveOption {
        keepScreenOn: boolean;
    }
    function setKeepScreenOn(option: IKeepScreenOnOption): void;
    function getScreenBrightness(option: IActiveOption): void;
    interface IClipboardData extends IActiveOption {
        data: string;
    }
    function setClipboardData(option: IClipboardData): void;
    function getClipboardData(option: IActiveOption): void;
}
declare module rf {
    class OpenDataContext {
        canvas: HTMLCanvasElement;
        postMessage(message: any): void;
    }
    function getOpenDataContext(): OpenDataContext;
    function onMessage(callback: (message: any) => void): void;
    interface IShareMessageToFriendOption extends IActiveOption {
        openId: string;
        title?: string;
        imageUrl?: string;
        imageUrlId?: string;
    }
    function shareMessageToFriend(option: IShareMessageToFriendOption): void;
    interface ISetUserCloudStorageOption extends IActiveOption {
        KVDataList: {
            [key: string]: string;
        }[];
    }
    function setUserCloudStorage(option: ISetUserCloudStorageOption): void;
    interface IRemoveUserCloudStorageOption extends IActiveOption {
        keyList: string[];
    }
    function removeUserCloudStorage(option: IRemoveUserCloudStorageOption): void;
    function onInteractiveStorageModified(callback: (key: string) => void): void;
    const enum IModifyFriendOperation {
        ADD = "add"
    }
    interface IModifyFriendInteractiveStorageOption extends IActiveOption {
        key: string;
        opNum: number;
        operation: IModifyFriendOperation;
        toUser?: string;
        title?: string;
        imageUrl?: string;
        imageUrlId?: string;
        quiet?: boolean;
    }
    function modifyFriendInteractiveStorage(option: IModifyFriendInteractiveStorageOption): void;
    interface IGetUserInteractiveStorageOption extends IActiveOption {
        keyList: string | string[];
    }
    function getUserInteractiveStorage(option: IGetUserInteractiveStorageOption): void;
    function getUserCloudStorage(option: IGetUserInteractiveStorageOption): void;
    function getSharedCanvas(): HTMLCanvasElement;
    interface IGetFriendInfo {
        avatarUrl: string;
        nickname: string;
        openid: string;
    }
    interface IGetPotentialFriendList extends IActiveOption {
        fail: (res: IGetFriendInfo[]) => void;
        complete: (res: IGetFriendInfo[]) => void;
        success: (res: IGetFriendInfo[]) => void;
    }
    function getPotentialFriendList(option: IActiveOption): void;
    interface IGetGroupInfoOption extends IActiveOption {
        openGId: string;
    }
    function getGroupInfo(option: IGetGroupInfoOption): void;
    interface IUserGameData extends IGetFriendInfo {
        KVDataList: {
            [key: string]: number | string;
        }[];
    }
    interface IGetGroupCloudStorageOption extends IActiveOption {
        shareTicket: string;
        keyList: string[];
        complete: (res: IUserGameData[]) => void;
        success: (res: IUserGameData[]) => void;
    }
    function getGroupCloudStorage(option: IGetGroupCloudStorageOption): void;
    interface IGetFriendCloudStorageOption extends IGetUserInteractiveStorageOption {
        complete: (res: IUserGameData[]) => void;
        success: (res: IUserGameData[]) => void;
    }
    function getFriendCloudStorage(option: IGetUserInteractiveStorageOption): void;
    const enum GetUserInfoLang {
        EN = "en",
        ZH_CN = "zh_CN",
        ZH_TW = "zh_TW"
    }
    interface IGetUserInfoOption extends IActiveOption {
        openIdList?: string[];
        lang?: GetUserInfoLang;
    }
}
declare module rf {
    interface IOrientationValue {
        value: string;
    }
    function onDeviceOrientationChange(callback: Function): void;
    function offDeviceOrientationChange(callback: Function): void;
}
declare module rf {
    const enum IShareAppType {
        QQ = "qq",
        QQ_FAST_SHARE = "qqFastShare",
        QQ_FAST_SHARE_LIST = "qqFastShareList",
        QZONE = "qzone",
        WECHAT_FRIENDS = "wechatFriends",
        WECHAT_MOMENT = "wechatMoment"
    }
    interface IShareOption extends IActiveOption {
        title: string;
        imageUrlId: string;
        imageUrl: string;
        query: string;
        shareAppType: IShareAppType;
        entryDataHash: string;
    }
    function shareAppMessage(object: IShareOption): void;
    function onShareAppMessage(callback: () => {
        title: string;
        imageUrl: string;
        query: string;
    }): void;
    function showShareMenu(object: {
        showShareItems: string[];
        withShareTicket: boolean;
    }): void;
    function updateShareMenu(option: {
        withShareTicket: boolean;
    }): void;
    function hideShareMenu(object: any): void;
    interface IShareInfoOption extends IActiveOption {
        shareTicket: string;
        timeout: number;
        success: (res: {
            errMsg: string;
            encryptedData: string;
            iv: string;
        }) => void;
        complete: (res: {
            errMsg: string;
            encryptedData: string;
            iv: string;
        }) => void;
    }
    function getShareInfo(option: IShareInfoOption): void;
}
declare module rf {
    type SocketHandler = (...arsg: any[]) => void;
    interface ConnectSocketOption extends IActiveOption {
        url: string;
        header: object;
        protocols: string[];
        method?: string;
    }
    interface CloseSocketOption extends IActiveOption {
        reason: string;
        code?: number;
    }
    interface SendSocketMessageOption extends IActiveOption {
        data: ArrayBuffer;
        success?: Function;
        fail?: Function;
        complete?: Function;
    }
    interface ISocketType {
        socketTaskId: number;
        state: string;
    }
    interface ISocketMessageType extends ISocketType {
        data: ArrayBuffer;
    }
    class SocketTask {
        private websocket;
        private socketTaskId;
        private onOpenFuncs;
        private onCloseFuncs;
        private onMessageFuncs;
        private onErrorFuncs;
        constructor(options: ConnectSocketOption, socketTaskId: number);
        private destroy;
        private onSocketOpen;
        private onSocketClose;
        private onSocketMessage;
        private onSocketError;
        onOpen(callback: SocketHandler): void;
        onClose(callback: SocketHandler): void;
        onError(callback: SocketHandler): void;
        onMessage(callback: SocketHandler): void;
        send(option: SendSocketMessageOption): void;
        close(option?: CloseSocketOption): void;
    }
    function connectSocket(options: ConnectSocketOption): SocketTask;
    function closeSocket(options: CloseSocketOption): void;
}
declare module rf {
    interface IStorageData {
        data: any;
        size: number;
        time: number;
    }
    interface ISetStorageOption extends IActiveOption {
        key: string;
        data: any;
    }
    interface IStorageInfo {
        keys: string[];
        currentSize: number;
        limitSize: number;
    }
    function clearStorage(option: IActiveOption): void;
    function clearStorageSync(): void;
    function getStorageInfoSync(): IStorageInfo;
    function setStorageSync(key: string, data: string): void;
    function getStorageSync(key: string): string;
    function removeStorageSync(key: string): void;
}
declare module rf {
    class UpdateManager {
        applyUpdate(): void;
        onCheckForUpdate(callback: Function): void;
        onUpdateReady(callback: Function): void;
        onUpdateFailed(callback: Function): void;
    }
    function getUpdateManager(): UpdateManager;
}
declare module rf {
    interface IUserInfoActive {
        avatarUrl: string;
        city: string;
        country: string;
        gender: number;
        language: string;
        nickName: string;
        province: string;
    }
    interface IAuthSetting {
        "scope.userInfo": Boolean;
        "scope.userLocation": Boolean;
        "scope.qqrun": Boolean;
        "scope.address": Boolean;
        "scope.camera": Boolean;
        "scope.invoice": Boolean;
        "scope.invoiceTitle": Boolean;
        "scope.record": Boolean;
        "scope.personalize": Boolean;
        "scope.uploadAvatar": Boolean;
        "scope.writePhotosAlbum": Boolean;
        "scope.appMsgSubscribed": Boolean;
        "setting.appMsgSubscribed": Boolean;
    }
    interface IAuthSettingActive {
        authSetting: IAuthSetting;
    }
    interface ITapInfoOption {
        userInfo: IUserInfoActive;
        rawData: string;
        signature: string;
        encryptedData: string;
        iv: string;
    }
    interface IUserInfoOption extends IActiveOption {
        withCredentials: boolean;
        lang: string;
    }
    interface IAuthorizeOption extends IActiveOption {
        scope: string;
    }
    interface ICreateUserInfoOption {
        type: string;
        style: IButtonStyle;
        withCredentials: boolean;
        text?: string;
        image?: string;
        lang?: string;
    }
    interface IButtonStyle extends IBannerAdStyle {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        borderRadius: number;
        color: string;
        textAlign: string;
        fontSize: number;
        lineHeight: number;
    }
    interface ISubscribeAppMsgActive {
        SubscribeAppMsgCode: number | string;
        subscribeAppMsg: string;
    }
    interface ISubscribeAppMsg {
        subscribe: Boolean;
        success?: Function;
        fail?: Function;
    }
    function getUserInfo(option: IUserInfoOption): void;
    function createUserInfoButton(option: ICreateUserInfoOption): UserInfoButton;
    function authorize(option: IAuthorizeOption): void;
    function subscribeAppMsg(msg: ISubscribeAppMsg): void;
    interface ISubscribeMessage extends IActiveOption {
        tmplIds: string[];
    }
    function requestSubscribeMessage(msg: ISubscribeMessage): void;
    interface ISettingOption extends IActiveOption {
        withSubscriptions?: boolean;
    }
    function getSetting(option: ISettingOption): void;
    class UserInfoButton {
        show(): void;
        hide(): void;
        destroy(): void;
        onTap(callback: (res: ITapInfoOption) => void): void;
        offTap(callback: (res: ITapInfoOption) => void): void;
    }
}
declare module rf {
    function aldSendOpenid(openid: string): void;
    function aldSendEvent(type: string, param: object): void;
    function aldOnShareAppMessage(callback: () => {
        title: string;
        imageUrl: string;
        query: string;
    }): void;
    function aldShareAppMessage(object: any): void;
    interface IAldStageStartOption {
        stageId: string;
        stageName: string;
        userId: string;
    }
    interface IAldStageRunningOption extends IAldStageStartOption {
        event: string;
        params: {
            itemName: string;
            itemId: string;
            itemCount: number;
            desc: string;
            itemMoney: number;
        };
    }
    interface IAldStageEndOption extends IAldStageStartOption {
        event: string;
        params: {
            desc: string;
        };
    }
    class aldStage {
        static onStart(data: IAldStageStartOption): void;
        static onRunning(data: IAldStageRunningOption): void;
        static onEnd(data: IAldStageEndOption): void;
    }
    interface IOnInitLevelOption {
        levelId: string;
        levelName: string;
        userId: string;
        userName: string;
    }
    interface IOnPayOption extends IOnInitLevelOption {
        params: {
            amount: number;
            desc: string;
        };
    }
    class aldLevel {
        static onInitLevel(data: IOnInitLevelOption): void;
        static onSetLevel(data: IOnInitLevelOption): void;
        static onPaySuccess(data: IOnPayOption): void;
        static onPayFail(data: IOnPayOption): void;
    }
}
