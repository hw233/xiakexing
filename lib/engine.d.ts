declare module rf {
    class EngineMain {
        constructor();
    }
}
declare module rf {
    function inRange(a: any, min: any, max: any): boolean;
    function byte_div(n: any, d: any): number;
    function byte_Error(fatal: any, opt_code_point?: any): number;
    function byte_inflate(data: Uint8Array): Uint8Array;
    function byte_Deflate(data: Uint8Array): Uint8Array;
    function byte_decodeUTF8(data: Uint8Array): string;
    function stringToCodePoints(string: any): any[];
    function byte_encodeUTF8(str: string): Uint8Array;
    class Byte {
        position: number;
        length: number;
        buf: DataView;
        uint8: Uint8Array;
        buffer: ArrayBuffer;
        constructor(buf?: ArrayBuffer);
        setArrayBuffer(buf: ArrayBuffer): void;
        outOfRange(): void;
        readByte(): number;
        validate(len: number): boolean;
        writeByte(v: number): void;
        readUint16(littleEndian?: boolean): number;
        writeUint16(v: number, littleEndian?: boolean): void;
        writeInt(v: number): void;
        readUInt(): number;
        writeUInt(v: number): void;
        readDouble(): number;
        readFloat(): number;
        readMultiByte(length: number, charSet?: string): string;
        readByteArray(length?: number): ArrayBuffer;
        writeByteArray(byte: ArrayLike<number>): void;
    }
    const enum AMF3Define {
        UNDEFINED = 0,
        NULL = 1,
        FALSE = 2,
        TRUE = 3,
        INT = 4,
        DOUBLE = 5,
        STRING = 6,
        XMLDOC = 7,
        DATE = 8,
        ARRAY = 9,
        OBJECT = 10,
        XML = 11,
        BYTEARRAY = 12,
        INTVECTOR = 13,
        UINTVECTOR = 14,
        DOUBLEVECTOR = 15,
        OBJECTVECTOR = 16,
        DICTIONARY = 17,
        FLOAT32 = 18,
        UINT16 = 19
    }
    class ClassDefine {
        className: string;
        members: string[];
        isExternalizable: boolean;
        isDynamic: boolean;
        constructor(className: string, members: string[]);
    }
    class AMF3Decode extends Byte {
        flags: number;
        ref: any;
        stringsTable: any[];
        objectsTable: any[];
        traitsTable: any[];
        clsNameMap: {};
        MASK: number;
        constructor(buf?: ArrayBuffer);
        clear(): void;
        read29(unsign: boolean): number;
        readInt(): number;
        readString(): string;
        readDate(u29D: number): Date;
        readObjectVector(length: number): any[];
        readArray(length: number): any[];
        readDictionary(length: number): {};
        readObject(): any;
        readByteArray(length: number): ArrayBuffer;
        private _readObject;
        readReferencableObject(marker: number): any;
    }
    class AMF3Encode extends Byte {
        stringsTable: any[];
        objectsTable: any[];
        traitsTable: any[];
        unit8: Uint8Array;
        constructor(buf?: ArrayBuffer);
        clear(): void;
        writeByte(value: number): void;
        writeFloat(value: number): void;
        writeDouble(value: number): void;
        writeString(str: string): void;
        write29(v: number, unsign: boolean): void;
        isRealNum(val: any): boolean;
        writeObject(o: any): void;
        writeArray(arr: any): void;
        writeBytes(buffer: ArrayBuffer): void;
        toUint8Array(): Uint8Array;
        toArrayBuffer(pos?: number): ArrayBuffer;
    }
    function amf_writeObject(obj: object): Uint8Array;
    function amf_readObject(byte: ArrayBuffer | Uint8Array): any;
}
declare module rf {
    type ForEachFunction<T> = (v: T, k: string | number, obj: {
        [key: string]: T;
    } | T[]) => boolean;
    type ForArrFunction<T> = (v: T, k: number, obj: T[]) => boolean;
    function forarr<T>(obj: T[], func: ForArrFunction<T>, thisobj?: any): void;
    function foreach<T>(obj: {
        [key: string]: T;
    }, func: ForEachFunction<T>, thisobj?: any): void;
    function EVT(...evt: (string | number)[]): (classPrototype: IEventInterests, propertyKey: string, descriptor: PropertyDescriptor) => void;
    function DebugProperty(enumerable?: boolean, configurable?: boolean): (target: any, property: string) => void;
}
declare module rf {
    interface IDisposable {
        dispose(): void;
    }
    type Creator<T> = {
        new (): T;
    } | {
        (): T;
    };
    class ClassFactory<T> {
        private _creator;
        private _props;
        constructor(creator: Creator<T>, props?: Partial<T>);
        get(): any;
    }
    interface IRecyclable {
        onRecycle?: {
            (): any;
        };
        onSpawn?: {
            (): any;
        };
        _insid?: number;
    }
    function pro_copy(to: object, pros: object): object;
    class RecyclablePool<T> {
        private _pool;
        private _max;
        private _creator;
        get(params?: object): T;
        recycle(t: T): void;
        constructor(TCreator: Creator<T>, max?: number);
    }
    type Recyclable<T> = T & {
        recycle(): void;
    };
    function recyclable<T>(clazz: {
        new (): T & {
            _pool?: RecyclablePool<T>;
        };
    }, addInstanceRecycle?: boolean, params?: object): Recyclable<T>;
    function recyclable<T>(clazz: {
        (): T & {
            _pool?: RecyclablePool<T>;
        };
    }, addInstanceRecycle?: boolean, params?: object): Recyclable<T>;
    function singleton<T>(clazz: {
        new (): T;
        _instance?: T;
    }): T;
    function RecyclePro(defaultValue: any): (host: {
        recyleObj: RecycleObjType;
        className: string;
        constructor: {
            name: string;
        };
    }, property: string) => void;
    type RecycleObjType = {
        [key: string]: any;
    };
    class RecycleObject implements IRecyclable {
        recyleObj: RecycleObjType;
        className: string;
        __class__: string;
        constructor();
        onRecycle(): void;
    }
}
declare module rf {
    class LinkVO<T> implements IRecyclable {
        close: boolean;
        data: T;
        ones?: boolean;
        inLink: boolean;
        args: any;
        thisObj: any;
        next: Recyclable<LinkVO<T>>;
        pre: Recyclable<LinkVO<T>>;
        weight: number;
        time: number;
        onRecycle(): void;
        onSpawn(): void;
    }
    class Link<T> {
        last: Recyclable<LinkVO<T>>;
        first: Recyclable<LinkVO<T>>;
        id: string;
        __length: number;
        warningMax: number;
        checkSameData: boolean;
        lock: boolean;
        private getFrist;
        getLast(): Recyclable<LinkVO<T>>;
        getValueLink(value: any, thisObj: object): Recyclable<LinkVO<T>>;
        indexOf(value: any, thisObj: object): number;
        create(value: any, thisObj?: object, args?: any): Recyclable<LinkVO<T>>;
        lockLinks: Recyclable<LinkVO<T>>[];
        add(value: T, thisObj?: object, args?: any): Recyclable<LinkVO<T>>;
        addByWeight(value: T, weight: number, thisObj?: object, args?: any): Recyclable<LinkVO<T>>;
        private __addvo;
        remove(value: any, thisObj?: any): void;
        removeLink(vo: Recyclable<LinkVO<T>>): void;
        clean(): void;
        pop(): T;
        shift(): T;
        forEach(f: (vo: Recyclable<LinkVO<T>>) => boolean, thisObj: any): void;
        forData(f: (vo: T) => boolean, thisObj: any): void;
        onRecycle(): void;
        toString(): string;
        get datas(): any[];
        get vos(): any[];
    }
    interface LinkItem extends IRecyclable {
        __next?: LinkItem;
        __pre?: LinkItem;
    }
}
declare module rf {
    var weixin: boolean;
    let nextUpdateTime: number;
    var lastUpdateDate: number;
    let frameInterval: number;
    let engineNow: number;
    var windowWidth: number;
    var windowHeight: number;
    var isWindowResized: boolean;
    var stageWidth: number;
    var stageHeight: number;
    var pixelRatio: number;
    type ResizeHandler = (width: number, height: number) => void;
    let resizeStageSizeFunction: ResizeHandler;
    class Engine {
        static startTime: number;
        static interval: number;
        static hidden: boolean;
        static hiddenTime: number;
        static fps: number;
        static code: number;
        static ticklink: Link<TickHandler>;
        static resizeLink: Link<ResizeHandler>;
        private static _frameRate;
        private static _nextProfileTime;
        private static _fpsCount;
        private static _codeTime;
        static memory: number;
        static fpsHandler: Function;
        static start(): void;
        static addResize(value: ResizeHandler, thisObj: any): void;
        static removeResize(value: ResizeHandler, thisObj: any): void;
        static resize(width: number, height: number): void;
        static addTick(tick: TickHandler, thisObj: object): void;
        static removeTick(tick: TickHandler, thisObj: object): void;
        static update(now: number, interval: number): void;
        static set frameRate(value: number);
        static get frameRate(): number;
        static profile(): void;
    }
    function getTimer(): number;
    const getT: ({
        (): number;
    });
    function defaultResize(width: number, height: number): void;
}
declare module rf {
    var ClientCheck: {
        isClientCheck: boolean;
    };
    var errorPrefix: string;
    interface ThrowError {
        (msg: string, err?: Error, alert?: boolean): void;
        MaxCount?: number;
        errorMsg?: string[];
    }
    var DEBUG: boolean;
    var Log: {
        (...msg: any[]): void;
    };
    const ThrowError: ThrowError;
}
declare function parseInt(s: number, radix?: number): number;
declare function zeroize(value: number | string, length?: number): string;
declare function getDescriptor(descriptor: PropertyDescriptor, enumerable?: boolean, writable?: boolean, configurable?: boolean): PropertyDescriptor;
declare function makeDefDescriptors(descriptors: object, enumerable?: boolean, writable?: boolean, configurable?: boolean): PropertyDescriptorMap;
interface Object {
    clone(): Object;
    copyto(to: Object): any;
    getPropertyDescriptor(property: string): PropertyDescriptor;
    equals(checker: object, ...args: (keyof this)[]): any;
    copyWith<T>(this: T, to: object, ...proNames: (keyof T)[]): void;
    getSpecObject<T>(this: T, ...proNames: (keyof T)[]): object;
}
interface Float32Array {
    x: number;
    y: number;
    z: number;
    w: number;
    update(data32PerVertex: number, offset: number, v: number): void;
    wPoint1(position: number, x: number, y?: number, z?: number, w?: number): void;
    wPoint2(position: number, x: number, y: number, z?: number, w?: number): void;
    wPoint3(position: number, x: number, y: number, z: number, w?: number): void;
    wPoint4(position: number, x: number, y: number, z: number, w: number): void;
    clone(): Float32Array;
}
interface Function {
    isSubClass(testBase: Function): boolean;
}
interface Math {
    clamp(value: number, min: number, max: number): number;
    random2(min: number, max: number): number;
    random3(center: number, delta: number): number;
    DEG_TO_RAD: number;
    RAD_TO_DEG: number;
    PI2: number;
    PI_1_2: number;
}
interface NumberConstructor {
    isSafeInteger(value: number): boolean;
}
interface Number {
    zeroize(length: number): string;
    between(min: number, max: number): boolean;
}
interface String {
    trim(): string;
    substitute(...args: any[]): string;
    substitute(args: any[]): string;
    zeroize(length: number): string;
    hash(): number;
    trueLength(): number;
}
interface StringConstructor {
    zeroize: (value: number, length: number) => string;
    regSubHandler(key: string, handler: {
        (input: any): string;
    }): any;
    subHandler: Readonly<{
        [index: string]: {
            (input: any): string;
        };
    }>;
}
interface Date {
    format(mask: string, local?: boolean): string;
}
declare const enum ArraySort {
    ASC = 0,
    DESC = 1
}
interface ArrayConstructor {
    binaryInsert<T>(partArr: T[], item: T, filter: {
        (tester: T, ...args: any[]): boolean;
    }, ...args: any[]): any;
    SORT_DEFAULT: {
        number: 0;
        string: "";
        boolean: false;
    };
}
interface Array<T> {
    pushOnce(t: T): number;
    remove(t: T): boolean;
    multiSort(kArr: (keyof T)[], dArr?: boolean[] | ArraySort[]): this;
    doSort(key?: keyof T, descend?: boolean | ArraySort): this;
    doSort(descend?: boolean | ArraySort, key?: keyof T): this;
    cloneTo<T>(to: Array<T>): any;
    appendTo<T>(to: Array<T>): any;
}
declare module rf {
    function getQualifiedClassName(value: any): string;
    function getQualifiedSuperclassName(value: any): string;
    function is(instance: any, ref: {
        new (): any;
    }): boolean;
    function toString(instance: any, defaultValue?: string): string;
    function clone(from: any, to?: any): any;
    function properties(target: any, key: string): void;
}
declare module rf {
    var fs: rf.FileSystemManager;
    class TFile {
        static init(): void;
        states: Stats;
        nativePath: string;
        constructor(path: string);
        join(f: string, t: string): string;
        get name(): string;
        get extname(): string;
        get exists(): boolean;
        isFile(): boolean;
        isDirectory(): boolean;
        get parent(): TFile;
        read(): any;
        readUTF8(type?: string): string;
        mkdir(path: string): void;
        write(buf: Uint8Array): void;
        writeUTF8(value: string): void;
        copyto(to: File | string): void;
        moveto(to: File | string): void;
        getDirectoryListing(): File[];
        resolvePath(path: string): TFile;
        getAllFiles(): TFile[];
    }
    var FILE_ROOT: any;
}
declare module rf {
    function getGuid(key: string): number;
}
declare module rf {
    type EventHandler = (event: EventX) => void;
    interface IEventDispatcherX {
        on(type: string | number, listener: Function, thisObject: any, priority?: number, ones?: boolean): void;
        off(type: string | number, listener: Function, thisObject: any): void;
        has?(type: string | number): boolean;
        dispatchEvent(event: EventX): boolean;
        simpleDispatch?(type: string | number, data?: any, bubbles?: boolean): boolean;
    }
    const enum EventT {
        ENTER_FRAME = 1,
        RESIZE = 2,
        FAILED = 3,
        COMPLETE = 4,
        PLAY_COMPLETE = 5,
        MOVE_COMPLETE = 6,
        CAST_COMPLETE = 7,
        NAVIGATION_LOC_COMPLETE = 8,
        CONTEXT3D_CREATE = 9,
        CHANGE = 10,
        CANCEL = 11,
        SCROLL = 12,
        OPEN = 13,
        CLOSE = 14,
        SELECT = 15,
        DISPOSE = 16,
        DATA = 17,
        ERROR = 18,
        PROGRESS = 19,
        IO_ERROR = 20,
        MESSAGE = 21,
        RECYCLE = 22,
        ADD_TO_STAGE = 23,
        REMOVE_FROM_STAGE = 24,
        COMPLETE_LOADED = 25,
        MVC_PANEL_OPEN = 26,
        MVC_PANEL_HIDE = 27,
        PANEL_LOAD_START = 28,
        PANEL_LOAD_END = 29,
        FOCUS_IN = 30
    }
    class EventX extends RecycleObject {
        static TEMP: EventX;
        type: string | number;
        data: any;
        bubbles: boolean;
        target: IEventDispatcherX;
        currentTarget: IEventDispatcherX;
        stopPropagation: boolean;
        stopImmediatePropagation: boolean;
        constructor(type?: string | number, data?: any, bubbles?: boolean);
    }
    class MiniDispatcher extends RecycleObject implements IEventDispatcherX {
        mEventListeners: {
            [key: string]: Recyclable<Link<EventHandler>>;
        };
        mTarget: IEventDispatcherX;
        constructor(target?: IEventDispatcherX);
        on(type: string | number, listener: EventHandler, thisObject: any, priority?: number, ones?: boolean): void;
        off(type: string | number, listener: Function, thisObject: any): void;
        removeEventListeners(type?: string, self?: boolean): void;
        dispatchEvent(event: EventX): boolean;
        simpleDispatch(type: string | number, data?: any, bubbles?: boolean): boolean;
        has(type: string | number): boolean;
        onRecycle(): void;
        addEventListener: (type: string | number, listener: EventHandler, thisObject: any, priority?: number, ones?: boolean) => void;
        removeEventListener: (type: string | number, listener: Function, thisObject: any) => void;
        hasEventListener: (type: string | number) => boolean;
    }
    class InterestEventDispatcher extends MiniDispatcher implements IEventInterests {
        eventInterests: EventInterestType;
        registerEvent(events: EventInterestType, thisobj: any): void;
        removeEvent(events: EventInterestType, thisobj: any): void;
    }
    var interest: InterestEventDispatcher;
}
declare module rf {
    var HTTP_REPOSITORY: {
        [key: string]: Loader;
    };
    type LoaderType = new (perfix: string, url: string) => Loader;
    const enum LoadPriority {
        low = 0,
        middle = 1,
        high = 2,
        max = 3
    }
    const enum LoadStates {
        WAIT = 0,
        LOADING = 1,
        COMPLETE = 2,
        FAILED = 3
    }
    const enum ResType {
        bin = 0,
        amf = 1,
        amf_inflate = 2,
        text = 3,
        sound = 4,
        image = 5
    }
    interface IResHandler {
        complete: EventHandler;
        thisObj: any;
    }
    var http_load_debug: boolean;
    class Loader extends MiniDispatcher {
        status: LoadStates;
        option: IHttpOption;
        byte: number;
        loadUseTime: number;
        disposeTime: number;
        lastActiveTime: number;
        requstTimes: number;
        data: any;
        url: string;
        perfix: string;
        priority: LoadPriority;
        queue: boolean;
        completeLink: Link<Function>;
        constructor(perfix: string, url: string, dataType?: HttpResponseType, method?: HttpMethod);
        initOption(option: IHttpOption): void;
        load(): void;
        doLoad(option: IHttpOption): void;
        complete(res: IHttpData): void;
        getFileByteLength(data: any): number;
        preComplete(res: IHttpData): void;
        formatData(data: string | object | ArrayBuffer): string | object | ArrayBuffer;
    }
    class AMFLoader extends Loader {
        inflate: boolean;
        formatData(data: string | object | ArrayBuffer): any;
    }
    class JSonLoader extends Loader {
        constructor(perfix: string, url: string, dataType?: HttpResponseType, method?: HttpMethod);
        formatData(data: string): any;
    }
    class ImageLoader extends Loader {
        image: HTMLImageElement;
        doLoad(option: IHttpOption): void;
        getFileByteLength(data: HTMLImageElement): number;
        onLoaded(e: Event): void;
        onerror(e: Event): void;
    }
    var http_res_max_loader: number;
    var http_current_loader_count: number;
    var http_load_Link: Link<Loader>;
    var http_loader: {
        [key: number]: LoaderType;
    };
    var http_hash: {
        [key: string]: string;
    };
    function setHttpHash(o: any): void;
    function loadRes(perfix: string, url: string, complete?: EventHandler, thisObj?: any, type?: ResType | LoaderType, priority?: LoadPriority, disposeTime?: number): Loader;
    function http_load_continue(e?: EventX): void;
    function getFullUrl(url: string, extension?: string): string;
    interface ILoaderTask {
        name?: string;
        data?: any;
        status: LoadStates;
    }
    interface LoadTask {
        on(type: EventT.PROGRESS | EventT.COMPLETE, listener: (e: EventX) => void, thisObject: any, priority?: number): void;
        on(type: string | number, listener: (e: EventX) => void, thisObject: any, priority?: number): void;
    }
    class LoadTask extends MiniDispatcher implements IRecyclable {
        queue: {
            [key: string]: ILoaderTask;
        };
        total: number;
        completeCount: number;
        progress: number;
        add(perfix: string, url: string, type: ResType | LoaderType, complete?: EventHandler, thisObj?: any): Loader;
        addTask(item: ILoaderTask & IEventDispatcherX): void;
        complteHandler(event: EventX): void;
        checkComplete(): boolean;
        load(): void;
        onRecycle(): void;
    }
    function http_gc(now: number): void;
}
declare module rf {
    class Int64 {
        high: number;
        low: number;
        constructor(low?: number, high?: number);
        toNumber(): number;
        static toNumber(low?: number, high?: number): number;
        static fromNumber(value: number): any;
        add(addend: Int64): Int64;
    }
}
declare module rf {
    type MessageStruct = [string | number, string | number, string | number] | [string | number, string | number, string | number, string] | [string | number, string | number, string | number, string, any];
    class PBMessage {
        static Enabled: boolean;
        static ThrowErrorEnabled: boolean;
        static StructByName: {
            [index: string]: {
                c?: {
                    [key: string]: (string | number)[];
                };
                s?: MessageStruct;
                dto?: MessageStruct;
            };
        };
        static writeMessage(msg: object, type: number | string, side?: string): AMF3Encode;
        private static writeElement;
        static readMessage(amf: AMF3Decode, type: number | string, side: string, len: number): any;
        private static type2WireType;
    }
}
declare module rf {
    type EventInterestType = {
        k: string | number;
        v: EventHandler;
        p?: number;
        s?: number;
        [key: string]: any;
    }[];
    interface IEventInterests {
        eventInterests: EventInterestType;
    }
    const enum SocketEventX {
        OPEN = 65536,
        CLOSE = 65537,
        ERROR = 65538
    }
    const enum SocketStatus {
        CLOSE = 0,
        CONNECTING = 1,
        CONNECTED = 2
    }
    const enum SocketCloseReason {
        TIME_OUT = "TIME_OUT",
        CLIENT_CLOSE = "CLIENT_CLOSE"
    }
    interface ISocketSendOption {
        code: number;
        value: any;
        proto?: number;
        globalID?: number;
    }
    type SocketDecode = (buff: ArrayBuffer, ...args: any[]) => StreamX;
    type SocketEncode = (option: ISocketSendOption, ...args: any[]) => ArrayBuffer;
    interface ISocketPacker {
        encode: SocketEncode;
        decode: SocketDecode;
    }
    interface ISocketExec {
        onSocketOpen(callback: SocketHandler): void;
        onSocketClose(callback: SocketHandler): void;
        onSocketError(callback: SocketHandler): void;
        onSocketMessage(callback: SocketHandler): void;
        connectSocket(option: ConnectSocketOption): void;
        closeSocket(option: CloseSocketOption): void;
        sendSocketMessage(option: SendSocketMessageOption): void;
        encode?: SocketEncode;
        decode?: SocketDecode;
    }
    class StreamX extends EventX {
        data: any;
        len: number;
        toObject(v: any[], pros: string[], to?: object): object;
    }
    var socketDispatcher: InterestEventDispatcher;
    interface ISocketEventInterests {
        socketEventInterests: EventInterestType;
    }
    function SOCKET_EVT(...evt: (string | number)[]): (classPrototype: ISocketEventInterests, propertyKey: string, descriptor: PropertyDescriptor) => void;
    class Socket extends InterestEventDispatcher {
        socket: SocketTask;
        connected: boolean;
        socketoption: SendSocketMessageOption;
        sendOption: ISocketSendOption;
        status: SocketStatus;
        connectInfo: ConnectSocketOption;
        closeReason: SocketCloseReason;
        timeout: number;
        connectTimes: number;
        nextConnectTime: number;
        constructor();
        connect(url: string): void;
        connectTimeOut(): void;
        reconnect(): void;
        socketTaskId: number;
        onOpen(e: ISocketType): void;
        close(reason: SocketCloseReason): void;
        onClose(e: ISocketType): void;
        onError(e: any): void;
        sDecode(data: ArrayBuffer): any;
        sEncode(option: ISocketSendOption): any;
        onMessage(e: ISocketMessageType): void;
        send(option: ISocketSendOption): void;
        simpleSend(code: number, value?: any, proto?: number): void;
    }
    class SocketDecoder {
        socket: Socket;
        constructor(socket: Socket, types: number[]);
        showError(args: any[], type?: number): void;
    }
}
declare namespace rf {
    const defaultTimeMixer: ITimeMixer;
    interface ITimeMixer {
        now: number;
        interval: number;
        speed: number;
        pause: boolean;
        parent: ITimeMixer;
        childs: ITimeMixer[];
        target: any;
    }
    function newTimeMixer(target: any, now?: number, tm?: ITimeMixer, speed?: number): ITimeMixer;
    function removeTimeMixer(tm: ITimeMixer): void;
    function tm_add(t: ITimeMixer, interval: number): number;
    function tm_set(t: ITimeMixer, now: number): void;
    type TickHandler = (now: number, interval: number) => void;
    class TimerEventX extends EventX {
        static TIMER: string;
        static TIMER_COMPLETE: string;
    }
    class Timer extends MiniDispatcher {
        private _delay;
        private currnetTime;
        repeatCount: number;
        running: Boolean;
        constructor(delay: number, repeatCount?: number);
        set delay(value: number);
        get delay(): number;
        start(): void;
        stop(): void;
        update(now: number, interval: number): void;
    }
    class GTimer {
        link: Link<Function>;
        timer: Timer;
        constructor(delay: number);
        timerHandler(event: EventX): void;
        add(func: Function, thisobj: any, args?: any): Recyclable<LinkVO<Function>>;
        remove(func: Function, thisobj: any): void;
    }
    class GTimerCallLater extends GTimer {
        constructor();
        later(f: Function, thisobj: any, time: number, args?: any, checksame?: boolean): Recyclable<LinkVO<Function>>;
        add(func: Function, thisobj: any, args?: any, checksame?: boolean): Recyclable<LinkVO<Function>>;
        remove(func: Function, thisobj: any): void;
        timerHandler(event: EventX): void;
    }
    class TickLink {
        link: Link<TickHandler>;
        constructor();
        addTick(tick: TickHandler, thisObj: object): void;
        removeTick(tick: TickHandler, thisObj: object): void;
        update(now: number, interval: number): void;
    }
    let gameTick: TickLink;
    let skillTick: TickLink;
    let timerobj: {
        [key: number]: GTimer;
    };
    function getGTimer(time: number): GTimer;
    let time250: GTimer;
    let time500: GTimer;
    let time1000: GTimer;
    let time3000: GTimer;
    let time4000: GTimer;
    let time5000: GTimer;
    let callLater: GTimerCallLater;
}
declare module rf {
    interface IPANEL_TWEEN_DATA {
        type: string;
        time: number;
        child: string;
        duration?: number;
        lifetime?: number;
        offsetDegree?: number | number[];
        ease?: string;
        from?: number | number[];
        to?: number | number[];
        len?: number | number[];
        degree?: number | number[];
        so?: {
            [key: string]: number;
        };
        eo?: {
            [key: string]: number;
        };
        ef?: string;
        p?: any;
        t?: any;
        sp?: number;
        rt?: boolean;
    }
    type EaseFunction = (t: number, b: number, c: number, d: number, ...args: any[]) => number;
    type TweenUpdateFunction = (tweener: ITweener) => void;
    interface ITweenerItem {
        k: string;
        s: number;
        e: number;
        d: number;
        n?: number;
        ease?: EaseFunction;
    }
    interface ITweener {
        caster: any;
        st: number;
        duration: number;
        l: number;
        tm: ITimeMixer;
        data: ITweenerItem[];
        ease: EaseFunction;
        update: TweenUpdateFunction;
        complete: TweenUpdateFunction;
        thisObj: any;
        completed: boolean;
    }
    function ease_default(t: number, b: number, c: number, d: number): number;
    function ease_quartic_in(t: number, b: number, c: number, d: number): number;
    function ease_quartic_out(t: number, b: number, c: number, d: number): number;
    function ease_quartic_inout(t: number, b: number, c: number, d: number): number;
    function ease_back_in(t: number, b: number, c: number, d: number): number;
    function ease_back_out(t: number, b: number, c: number, d: number): number;
    function ease_back_inout(t: number, b: number, c: number, d: number): number;
    var tween_ease_function: {
        [key: string]: EaseFunction;
    };
    var tweenLink: Link<ITweener>;
    function tweener_createItem(eo: {
        [key: string]: number;
    }, so?: {
        [key: string]: number;
    }, target?: any, data?: ITweenerItem[], tweener?: ITweener): ITweenerItem[];
    function createTweener(eo: {
        [key: string]: number;
    }, duration: number, tm: ITimeMixer, target?: any, ease?: EaseFunction, so?: {
        [key: string]: number;
    }): ITweener;
    function tween_lerp_pro(a: any, b: any, n: number, pro: {
        [key: string]: number;
    }, ease?: EaseFunction): void;
    function tweenTo(eo: {
        [key: string]: number;
    }, duration: number, tm: ITimeMixer, target?: any, ease?: EaseFunction, so?: {
        [key: string]: number;
    }): ITweener;
    function tweenUpdate(): void;
    function tweenEnd(tweener: ITweener): void;
    function tweenStop(tweener: ITweener): void;
    let ScriptTweenIns: {
        [key: string]: {
            new (): STweenBase;
        };
    };
    function scriptTween_play(target: any, data: IPANEL_TWEEN_DATA[], tm: ITimeMixer, mx?: number, my?: number, dtype?: number, property?: any): Recyclable<ScriptTween>;
    function random_number(num: number | number[]): number;
    class STweenBase {
        type: string;
        target: any;
        stween: ScriptTween;
        data: IPANEL_TWEEN_DATA;
        status: LoadStates;
        ease: EaseFunction;
        tweenItems: ITweenerItem[];
        st: number;
        lifeTime: number;
        needupdate: boolean;
        dtype: number;
        mx: number;
        my: number;
        property: any;
        start(): void;
        update(now: number, interval: number): void;
        stop(local?: boolean): void;
        complete(): void;
    }
    class STweenPro extends STweenBase {
        start(): void;
    }
    class STweenLiner extends STweenBase {
        start(): void;
    }
    class ScriptTween extends MiniDispatcher {
        target: any;
        tweens: STweenBase[];
        tm: ITimeMixer;
        play(target: any, data: IPANEL_TWEEN_DATA[], tm: ITimeMixer, mx?: number, my?: number, dtype?: number, property?: any): void;
        playPro(target: any, tm: ITimeMixer, duration: number, to: {
            [key: string]: number;
        }, from?: {
            [key: string]: number;
        }, time?: number): Recyclable<STweenPro>;
        update(now: number, interval: number): void;
        stop(): void;
    }
}
declare module rf {
    class Endian {
        static LITTLE_ENDIAN: string;
        static BIG_ENDIAN: string;
    }
    const enum EndianConst {
        LITTLE_ENDIAN = 0,
        BIG_ENDIAN = 1
    }
    class EgretByte {
        protected bufferExtSize: number;
        protected data: DataView;
        protected _bytes: Uint8Array;
        protected _position: number;
        protected write_position: number;
        get endian(): string;
        set endian(value: string);
        protected $endian: EndianConst;
        constructor(buffer?: ArrayBuffer | Uint8Array, bufferExtSize?: number);
        setArrayBuffer(buffer: ArrayBuffer): void;
        get readAvailable(): number;
        get buffer(): ArrayBuffer;
        get rawBuffer(): ArrayBuffer;
        set buffer(value: ArrayBuffer);
        get bytes(): Uint8Array;
        get dataView(): DataView;
        set dataView(value: DataView);
        get bufferOffset(): number;
        get position(): number;
        set position(value: number);
        get length(): number;
        set length(value: number);
        protected _validateBuffer(value: number): void;
        get bytesAvailable(): number;
        clear(): void;
        readBoolean(): boolean;
        readByte(): number;
        readBytes(bytes: EgretByte, offset?: number, length?: number): void;
        readDouble(): number;
        readFloat(): number;
        readInt(): number;
        readShort(): number;
        readUnsignedByte(): number;
        readUnsignedInt(): number;
        readUnsignedShort(): number;
        readUTF(): string;
        readUTFBytes(length: number): string;
        writeBoolean(value: boolean): void;
        writeByte(value: number): void;
        writeBytes(bytes: EgretByte, offset?: number, length?: number): void;
        writeDouble(value: number): void;
        writeFloat(value: number): void;
        writeInt(value: number): void;
        writeShort(value: number): void;
        writeUnsignedInt(value: number): void;
        writeUnsignedShort(value: number): void;
        writeUTF(value: string): void;
        writeUTFBytes(value: string): void;
        toString(): string;
        _writeUint8Array(bytes: Uint8Array | ArrayLike<number>, validateBuffer?: boolean): void;
        validate(len: number): boolean;
        protected validateBuffer(len: number): void;
        private encodeUTF8;
        private decodeUTF8;
        private encoderError;
        private decoderError;
        private EOF_byte;
        private EOF_code_point;
        private inRange;
        private div;
        private stringToCodePoints;
    }
}
declare module rf {
    const enum ByteArraySize {
        SIZE_OF_UINT32 = 4,
        SIZE_OF_FIX64 = 8,
        SIZE_OF_INT64 = 8,
        SIZE_OF_DOUBLE = 8,
        SIZE_OF_FLOAT = 4,
        SIZE_OF_FIX32 = 4,
        SIZE_OF_SFIX32 = 4,
        SIZE_OF_UINT16 = 2,
        SIZE_OF_INT16 = 2
    }
    class ByteArray extends EgretByte {
        $endian: EndianConst;
        constructor(buffer?: ArrayBuffer, ext?: number);
        replaceBuffer(value: ArrayBuffer): void;
        readBuffer(length: number): ArrayBuffer;
        readInt64(): number;
        writeInt64(value: number): void;
        readPBDouble(): number;
        writePBDouble(value: number): void;
        readPBFloat(): number;
        writePBFloat(value: number): void;
        readFix32(): number;
        writeFix32(value: number): void;
        readSFix32(): number;
        writeSFix32(value: number): void;
        readFix64(): number;
        writeFix64(value: number): void;
        readByteArray(length: number, ext?: number): EgretByte;
        writeVarint64(value: number): void;
        writeVarint(value: number): void;
        readVarint(): number;
        readVarint64(): number;
        get outBytes(): Uint8Array;
        reset(): void;
    }
}
declare module rf {
    function fixHex(n: number): string;
    function toHex(uint8: Uint8Array, tag?: string): string;
}
declare module rf {
    type Key = number | string;
    var DEBUG: boolean;
    const enum PBType {
        Double = 1,
        Float = 2,
        Int64 = 3,
        UInt64 = 4,
        Int32 = 5,
        Fixed64 = 6,
        Fixed32 = 7,
        Bool = 8,
        String = 9,
        Group = 10,
        Message = 11,
        Bytes = 12,
        Uint32 = 13,
        Enum = 14,
        SFixed32 = 15,
        SFixed64 = 16,
        SInt32 = 17,
        SInt64 = 18
    }
    const enum PBFieldType {
        Optional = 1,
        Required = 2,
        Repeated = 3
    }
    interface PBField extends Array<any> {
        0: Key;
        1: PBFieldType;
        2: number;
        3?: Key | PBStruct;
        4?: any;
    }
    interface PBStruct {
        [index: number]: PBField;
        def?: any;
        ref?: {
            new (): any;
            prototype: any;
        };
    }
    interface PBStructDictInput {
        $$inted?: any;
        [index: string]: PBStruct | Key;
    }
    function getPBUtils(): {
        regDef: {
            (msg: PBStruct, def: any): any;
            (msgType: string | number, def: any): any;
        };
        regStruct: (msgType: string | number, struct: PBStruct) => void;
        initDefault: (struct: PBStruct, ref?: {
            new (): any;
            prototype: any;
        }) => void;
        add(dict: PBStructDictInput): void;
        readFrom: (msgType: string | number | PBStruct, bytes: ByteArray, len?: number) => any;
        writeTo: (msg: object, msgType: string | number | PBStruct, bytes?: ByteArray, debugOutData?: Object) => ByteArray;
        readMessage: (bytes: ByteArray, msgType: string | number | PBStruct) => any;
        readString: (bytes: ByteArray) => string;
        readBytes: (bytes: ByteArray) => EgretByte;
    };
    const PBUtils: {
        regDef: {
            (msg: PBStruct, def: any): any;
            (msgType: string | number, def: any): any;
        };
        regStruct: (msgType: string | number, struct: PBStruct) => void;
        initDefault: (struct: PBStruct, ref?: {
            new (): any;
            prototype: any;
        }) => void;
        add(dict: PBStructDictInput): void;
        readFrom: (msgType: string | number | PBStruct, bytes: ByteArray, len?: number) => any;
        writeTo: (msg: object, msgType: string | number | PBStruct, bytes?: ByteArray, debugOutData?: Object) => ByteArray;
        readMessage: (bytes: ByteArray, msgType: string | number | PBStruct) => any;
        readString: (bytes: ByteArray) => string;
        readBytes: (bytes: ByteArray) => EgretByte;
    };
    type PBUtils = ReturnType<typeof getPBUtils>;
}
