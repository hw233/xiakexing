declare module rf {
    class AdvTextFiled {
        private _helpVal;
        private _helpColor;
        private _defaultColor;
        private _textfiled;
        _maxChars: number;
        constructor(textfiled: TextField, helpVal: string, helpColor?: number);
        private _editabled;
        set editabled(val: boolean);
        set maxChars(val: number);
        resetHelpValue(): void;
        set helpValue(value: string);
        get helpValue(): string;
        get text(): string;
        set text(v: string);
        _changeParms: {
            func: Function;
            thisobj: any;
        };
        changeHandler(func: Function, target: any): void;
        private txtChangeHandler;
        private focusHandler;
    }
}
declare module rf {
    class BitmapFont extends Sprite {
        static tras: {
            [key: string]: string;
        };
        load(perfix: string, url: string): void;
        sourceLoadComplete(source: TSource): void;
        value: string;
        source: TSource;
        renderText(str: string): void;
    }
}
declare module rf {
    const enum TComponentConst {
        Component = 1,
        TextField = 2,
        Button = 3,
        CheckBox = 4,
        RadioButton = 5,
        ScrollBar = 6,
        Dele = 7,
        ProgressBar = 8
    }
    let TComponentClass: {
        [type: string]: {
            new (): TComponent | TextField;
        };
    };
    class TEventInterestSprite extends Sprite implements IEventInterests {
        eventInterests: EventInterestType;
        addToStage(): void;
        removeFromStage(): void;
        _selected: boolean;
        set selected(value: boolean);
        get selected(): boolean;
        doSelected(): void;
        _enabled: boolean;
        set enabled(value: boolean);
        get enabled(): boolean;
        doEnabled(): void;
        _data: {};
        set data(value: {});
        get data(): {};
        doData(): void;
        refreshData(): void;
        bindComponents(): void;
        awaken(): void;
        sleep(): void;
        setSize(width: number, height: number): void;
        scroll: Scroll;
        setScrollRect(w: number, h: number, hStep?: number, vStep?: number, x?: number, y?: number): Scroll;
        recyleObj: RecycleObjType;
        onRecycle(): void;
    }
    var toTextFormat: (data: object) => TextFormat;
    class TComponent extends TEventInterestSprite {
        z1: number;
        z2: number;
        color: number;
        source: TSource;
        constructor(source?: TSource);
        symbol: string;
        currentClip: number | string;
        symbolData: IDisplaySymbol;
        getSacle9Matrix(matrix: IMatrix, ele: IDisplayFrameElement, vo: IBitmapSourceVO): IMatrix;
        renderFrame(frame: string): void;
        gotoAndStop(clip: number | string, refresh?: boolean, symbol?: string): void;
        playMotion(name: string, target?: Sprite): Recyclable<ScriptTween>;
    }
    function findUI(component: TComponent, path: string[]): TComponent;
    class ImageSprite extends TEventInterestSprite {
        setSize(width: number, height: number): void;
    }
}
declare module rf {
    class Label extends TComponent {
        txt_label: TextField;
        _label: string;
        set label(value: string);
        get label(): string;
        _editable: boolean;
        set editable(value: boolean);
        get editable(): boolean;
        doEditable(): void;
        bindComponents(): void;
        doLabel(): void;
        textResize(): void;
    }
}
declare module rf {
    class Button extends Label {
        bindComponents(): void;
        getObjectByPoint(dx: number, dy: number, scale: number): DisplayObject;
        doEnabled(): void;
        protected clipRefresh(): void;
        addClick(listener: EventHandler, thisObj: any): this;
        icon: Image;
        setface(prefix: string, url: string): void;
        private faceHandler;
    }
}
declare module rf {
    interface CheckBox {
        on(type: EventT.SELECT | MouseEventX, listener: (e: EventX) => void, thisObject: any, priority?: number): void;
    }
    class CheckBox extends Button {
        doEnabled(): void;
        protected clickHandler(event: EventX): void;
        doSelected(): void;
        protected clipRefresh(): void;
    }
}
declare module rf {
    class Image extends TComponent {
        url: string;
        drawW: number;
        drawH: number;
        aglin: Align;
        lockkey: string;
        lock_a: number;
        rect: Size;
        load(perfix: string, url: string, extension?: ExtensionDefine): void;
        onImageComplete(e: EventX): void;
        setSize(_width: number, _height: number): void;
        draw(vo: IBitmapSourceVO): void;
        clean(): void;
        onRecycle(): void;
    }
}
declare module rf {
    interface IListOption {
        offsetX: number;
        offsetY: number;
        itemWidth?: number;
        itemHeight?: number;
        hgap?: number;
        vgap?: number;
        vertical?: boolean;
        columnCount?: number;
        clazz?: {
            new (): TComponent;
        };
    }
    interface IListRuntime {
        selectedIndex: number;
        first: ListItem & Recyclable<TComponent>;
        last: ListItem & Recyclable<TComponent>;
        displayCount: number;
        start: number;
        end: number;
    }
    interface ListItem extends LinkItem {
        data?: {};
        index?: number;
    }
    class List extends TComponent {
        datas: {}[];
        option: IListOption;
        runtime: IListRuntime;
        caches: (ListItem & Recyclable<TComponent>)[];
        scroll: Scroll;
        constructor(source: TSource, Clazz: {
            new (): TComponent;
        }, itemWidth: number, itemHeight: number, hgap?: number, vgap?: number, vertical?: boolean, columnCount?: number, offsetX?: number, offsetY?: number);
        setSize(width: number, height: number): void;
        displayList(data?: {}[]): void;
        scrollXY(x?: number, y?: number): void;
        s_c(e: EventX): void;
        d_c(e: EventX): void;
        clear(): void;
        refreshList(event?: EventX): void;
        addItem(index: number, data: {}): ListItem & TComponent & {
            recycle(): void;
        };
        removeItem(item: ListItem & Recyclable<TComponent>): void;
        _selectIndex: number;
        set selectIndex(value: number);
        get selectIndex(): number;
        set selectItem(val: ListItem & Recyclable<TComponent>);
        get selectItem(): ListItem & Recyclable<TComponent>;
        itemClickHandler(event: EventX): void;
        remove(): void;
        get backward(): boolean;
        get forward(): boolean;
    }
    class DynmList extends List {
        displayList(data?: {}[]): void;
        addItem(index: number, data: {}): ListItem & TComponent & {
            recycle(): void;
        };
    }
    class TestListItemRender extends TComponent {
        t: TextField;
        constructor(source?: TSource);
        doData(): void;
    }
}
declare module rf {
    interface ICodeExecBase {
        type: string;
    }
    interface ICodeCalc extends ICodeExecBase {
        value: (string | ICodeCalc)[];
    }
    interface ICodeProperty extends ICodeExecBase {
        property: string[];
    }
    interface ICodeLimit extends ICodeExecBase {
        value_left: number | string | ICodeExecBase;
        bijiao: string;
        value: number | ICodeExecBase;
    }
    interface ICodeFunction extends ICodeExecBase {
        name: string;
        propertys: any[];
    }
    interface IModule extends ICodeExecBase {
        list: ICodeFunction[];
        limit: any;
    }
    interface ICodeCalcString extends ICodeExecBase {
        desc: string;
        propertys: any[];
    }
    const enum CodeType {
        JSCalcString = "JSCalcString",
        JSModule = "JSModule",
        JSFunction = "JSFunction",
        calc = "calc",
        JSProperty = "JSProperty"
    }
    var codeParsers: {
        [key: string]: IFunction;
    };
    type CodeFuncType = (propertys: any, params: any) => any;
    function CodeFunc(name?: string): (classPrototype: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    function codeIntParser(leftval: number, operator: string, rightval: number): boolean;
    function codeParserLimit(self: any, property: string | ICodeLimit[], params?: any): boolean;
    function toOpera(leftValue: number, operaType: string, rightValue: number): boolean;
    function calc(v: number, calcType: string, dv: number): number;
    function codeDoProperty(self: object, property: any, params?: object): any;
}
declare module rf {
    const enum ExtensionDefine {
        NONE = ""
    }
    function MVC(type?: string): (target: new () => Mediator) => void;
    var mediatorMap: {
        [key: string]: Mediator;
    };
    class Facade extends InterestEventDispatcher {
        SINGLETON_MSG: string;
        constructor();
        toggle<T extends Mediator>(m: {
            new (): T;
        } | T, type?: number, params?: IOpenOption): T;
        private togglepanel;
        mediatorCompleteHandler(event: EventX): void;
    }
    let facade: Facade;
    interface IOpenOption {
        panel: string;
        url: string;
        tab: string | number;
    }
    interface IMediatorParmas {
        ox: number;
        oy: number;
        centerFlag: boolean;
        resizeable: boolean;
        haveFight: boolean;
        effParms?: object;
        hasMask?: boolean;
        parentCon?: DisplayObject;
    }
    class Mediator extends MiniDispatcher implements IEventInterests {
        static loadMediator(propertys: any, params: any): Recyclable<MiniDispatcher>;
        static toggleMediator(propertys: any, params: any): Recyclable<MiniDispatcher>;
        static getMediatorDisplay(propertys: any, params: any): any;
        eventInterests: EventInterestType;
        isReady: boolean;
        name: string;
        weight: number;
        openParams: IOpenOption;
        mediatorParams: IMediatorParmas;
        constructor(name: string);
        panel: Panel;
        setPanel(panel: Panel): void;
        startSync(): boolean;
        preViewCompleteHandler(e?: EventX): void;
        private addtostage;
        awakenAndSleepHandle(e: EventX): void;
        setBindView(isBind: boolean): void;
        mediatorReadyHandle(): void;
        bindEventInterests(): void;
        bindComponents(): void;
        sleep(): void;
        awaken(): void;
        onRemove(): void;
        set effParms(value: {
            show: IPANEL_TWEEN_DATA[];
            hide: IPANEL_TWEEN_DATA[];
        });
        private _alignuse;
        addAlign(item: DisplayObject, align: Align): void;
        addAligns(items: DisplayObject[], align: Align): void;
        protected panelshow(): void;
        protected panelhide(): void;
        resize(width: number, height: number): void;
        protected centerLayout(): void;
        protected childrenLayout(): void;
        back(): number;
        saveParms(): void;
    }
    interface IDisplayIcon {
        id: string | number;
        name: string;
        icon: any;
        bg: string;
    }
    interface IModelIcon extends IDisplayIcon {
        tag: string;
        moduleName: string;
        model: object;
        guid: string | number;
    }
    const enum PanelEvent {
        SHOW = "PanelEvent_SHOW",
        HIDE = "PanelEvent_HIDE"
    }
    interface IPanelSetting {
        container: Sprite;
        index?: number;
        mask: boolean;
        maskColor: number;
        maskAlpha: number;
    }
    class Panel extends TComponent {
        mName: string;
        isShow: boolean;
        perfix: string;
        parentParms: IPanelSetting;
        effParms: {
            show: IPANEL_TWEEN_DATA[];
            hide: IPANEL_TWEEN_DATA[];
        };
        source: TSource;
        constructor(uri: string, cls: string, perfix?: string);
        render(camera: Camera, option: IRenderOption): void;
        show(container?: Sprite): void;
        load(): TSource;
        asyncsourceComplete(e?: EventX): void;
        hide(e?: EventX): void;
        bringTop(e?: EventX): void;
        doEff(): void;
        private tweenHandler;
    }
    class TEventInteresterDele extends MiniDispatcher {
        eventInterests: EventInterestType;
        skin: TComponent;
        constructor(skin: TComponent);
        protected bindEventInterests(): void;
        bindComponents(): void;
        setBindView(): void;
        awakenAndSleepHandle(e: EventX): void;
        awaken(): void;
        sleep(): void;
        _data: {};
        set data(value: {});
        get data(): {};
        doData(): void;
        refreshData(): void;
    }
    class TasyncDele extends TComponent {
        private m;
        private mname;
        target: Mediator;
        constructor(m: {
            new (): Mediator;
        }, source?: TSource);
        awakenAndSleepHandle(e: EventX): void;
        awaken(): void;
        protected sizeHandler(e?: EventX): void;
    }
    class ItemRender extends TComponent {
        constructor(perfix: string, uri: string, cls: string);
    }
}
declare module rf {
    class TSourceCompment extends TComponent {
        constructor(prefix?: string, url?: string, cls?: string, clip?: number);
        perfix: string;
        url: string;
        soundKey: string;
        readly: boolean;
        waitsource: boolean;
        private __binded;
        create(perfix: string, url: string, cls: string): void;
        sourceLoadComplete(source: TSource): void;
        onShow(): void;
        set data(value: {});
        get data(): {};
        onRecycle(): void;
        clean(): void;
        addClickSound(key: string): void;
        protected soundClickHandler(event: EventX): void;
        addToStage(): void;
        removeFromStage(): void;
    }
}
declare module rf {
    type StringFormatFunction = (value: string) => string;
    function STRING_FORMAT(name?: string): (classPrototype: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    class StringFormat {
        static _p: RegExp;
        static decodeDict: {
            [key: string]: StringFormatFunction;
        };
        static stringFilter: Function;
        static decode(str: string): string;
    }
}
declare module rf {
    export class Map extends TSourceCompment {
        set y(value: number);
    }
    export class ComponentTest extends AppBase {
        init(canvas: HTMLCanvasElement): void;
        xiangweiTest(): void;
        testTest(): void;
        testFontNumber(): void;
        testMovieClip(): void;
        testBezier(): void;
        testList(): void;
    }
    interface IJineng_Jineng_item {
        txt_dengji: TextField;
        txt_shulian: TextField;
        txt_name: TextField;
    }
    export class ItemComp extends TSourceCompment {
        skin: TSourceCompment & IJineng_Jineng_item;
        _data: {};
        constructor();
        bindComponents(): void;
        doData(): void;
    }
    export {};
}
declare module rf {
    interface IMovieClipFrameData {
        i: number;
        frame: string;
        d: number;
        n: number;
        frames: {
            [key: string]: string;
        };
    }
    interface ITransformData {
        x: number;
        y: number;
        sx: number;
        sy: number;
        r: number;
        matrix?: IMatrix;
    }
    interface IMovieClipSourceData extends ITSourceData {
        width: number;
        height: number;
        ox: number;
        oy: number;
        sx: number;
        sy: number;
        fps: number;
        animations: {
            [key: string]: IMovieClipData;
        };
    }
    interface IMovieClipData {
        name: string;
        transform: ITransformData;
        clips: IMovieClipFrameData[];
        w: number;
        h: number;
        e: number;
        mx: number;
        my: number;
        trick: string;
    }
    class MovieClip extends TSourceCompment {
        ox: number;
        oy: number;
        source: TSource;
        nextTime: number;
        currentClip: number;
        nextClip: number;
        lockClip: number;
        lastClip: number;
        animaData: IMovieClipData;
        transformToMatrix(transform: ITransformData): void;
        awaken(): void;
        sleep(): void;
        update(now: number, interval: number): void;
        sourceLoadComplete(source: TSource): void;
        playAnimation(name: string, source?: TSource): void;
        clean(): void;
        drawFrames(clipData: any, z1?: number, z2?: number, lockRender?: number): void;
        gotoAndStop(clip: number, refresh?: boolean): void;
    }
}
declare module rf {
    class ProgressBar extends TSourceCompment {
        bar: Sprite;
        barWidth: number;
        bindComponents(): void;
        setProgress(c: number, t: number): void;
        setProgressPercent(n: number): void;
        getSacle9Matrix(matrix: IMatrix, ele: IDisplayFrameElement, vo: IBitmapSourceVO): IMatrix;
    }
}
declare module rf {
    interface RadioButtonGroup {
        on(type: EventT.CHANGE, listener: (e: EventX) => void, thisObject: any, priority?: number): void;
    }
    class RadioButtonGroup extends MiniDispatcher {
        static groupDict: object;
        static getGroup(name: string, ...args: RadioButton[]): RadioButtonGroup;
        name: String;
        list: RadioButton[];
        selectRadioButton: RadioButton;
        constructor(name: string);
        tab_parent: DisplayObjectContainer;
        tab_index: number;
        setTabmodel(parent: DisplayObjectContainer, index: number, select?: number): void;
        addRadioButton(radioButton: RadioButton): void;
        removeRadioButton(radioButton: RadioButton): void;
        _selectIndex: number;
        set selectIndex(value: number);
        get selectIndex(): number;
        set selectItem(val: RadioButton);
        selectHandler(event: EventX): void;
    }
    interface RadioButton {
        on(type: EventT.SELECT | MouseEventX, listener: (e: EventX) => void, thisObject: any, priority?: number): void;
    }
    class RadioButton extends CheckBox {
        group: RadioButtonGroup;
        cancancle: boolean;
        constructor();
        bindComponents(): void;
        doSelected(): void;
    }
}
declare module rf {
    interface IScrollData {
        dlen: number;
        mlen: number;
        pos: number;
        max: number;
    }
    interface IScrollDrager {
        dragDirX: number;
        dragDirY: number;
    }
    class Drager extends MiniDispatcher {
        vStep: number;
        hStep: number;
        vScroll: IScrollData;
        hScroll: IScrollData;
        rect: Size;
        x: number;
        y: number;
        width: number;
        height: number;
        target: RenderBase;
        tweener: ITweener;
        areacheck: boolean;
        updateScroll(scroll: IScrollData, dlen: number, mlen: number): IScrollData;
        setArea(w: number, h: number, width: number, height: number, x?: number, y?: number): this;
        start(): void;
        update(ox: number, oy: number): void;
        end(): void;
        disbind(target: RenderBase): void;
        bind(target: RenderBase, directionX: number, directionY: number): this;
        protected currentDrager: RenderBase & IScrollDrager;
        mouseDownHandler(event: EventX): void;
        mouseUpHandler(event: EventX): void;
        mouseMoveHandler(event: EventX): void;
        refreshScroll(tweener?: ITweener): void;
    }
    class Scroll extends Drager {
        constructor(target: RenderBase);
        resizeHandler(event?: EventX): void;
        resetOrigin(): void;
        scrollxy(x?: number, y?: number): void;
        update(ox: number, oy: number): void;
        end(): void;
        get backward(): boolean;
        get forward(): boolean;
    }
}
declare module rf {
    class SingleImage extends ImageSprite {
        scale9: Size;
        circle: number;
        constructor();
        load(perfix: string, url: string, scale9?: Size, circle?: number): void;
        loadComplete(source: BitmapSource): void;
    }
}
declare module rf {
    const enum SOUNDTYPE {
        NORMAL = 0,
        BGSOUND = 1
    }
    function getSoundByKey(key: string): any;
    function playSound(url: string, loop?: boolean, volume?: number): InnerAudioContext;
    function playBgSound(uri: string, loop?: boolean): InnerAudioContext;
    function bgsoundMute(): void;
    function createUrlSound(res: string, loop?: boolean): any;
    function muteSounds(): void;
    function soundIsMute(): boolean;
    function sound_vol(val: number): void;
    function soundEnable(): void;
    function soundProhibit(): void;
    function soundPause(): void;
    function soundRecover(): void;
}
declare module rf {
    interface ITSourceData {
        frames: {
            [key: string]: IBitmapSourceVO;
        };
        symbols: {
            [key: string]: IDisplaySymbol;
        };
        root: string;
        width: number;
        height: number;
    }
    interface IDisplaySymbol {
        width: number;
        height: number;
        className: String;
        displayClip: number;
        displayFrames: {
            [key: number]: IDisplayFrameElement[];
        };
        type: number;
        motions: {
            [key: string]: IPANEL_TWEEN_DATA[];
        };
    }
    interface IDisplayFrameElement {
        id: string;
        type: number;
        name: string;
        rect: any;
        x: number;
        y: number;
        sx: number;
        sy: number;
        rotation: number;
        pivot: number[];
        matrix2d: IMatrix;
        libraryItemName: string;
        width: number;
        height: number;
        text: string;
        color: number;
        format: TextFormat;
    }
    class TSource extends UrlBitmapSource {
        __mapindex: number;
        task: LoadTask;
        data: ITSourceData;
        constructor(perfix: string, url: string);
        load(): void;
        configCompleteHandler(e: EventX): void;
        imageCompelteHandler(e: EventX): void;
        taskCompleteHandler(e: EventX): void;
    }
}
declare module rf {
    interface IAdaptiveInfo {
        statusBarHeight: number;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    var adaptiveInfo: IAdaptiveInfo;
    function getAdaptiveInfo(): IAdaptiveInfo;
    function convertToWindow(size: Size): void;
}
declare interface IClientData {
    [key: string]: any;
}
declare module rf {
    var gameConfig: IGameConfig;
    var modelData: IClientData;
}
declare module rf {
    class Mask extends Sprite {
        size: Size;
        movetoSize(size: Size, duration: number, callback?: TweenUpdateFunction): void;
        tweenUpdate(): void;
        drawBox(size: Size, color?: number, alpha?: number): void;
        getObjectByPoint(dx: number, dy: number, scale: number): DisplayObject;
    }
}
declare module rf {
    var phaseParsers: {
        [key: string]: Function;
    };
    type PhaseFuncType = (action: IPhaseAction, phase: Phase) => any;
    function PhaseFunc(name?: string): (classPrototype: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    interface Sprite {
        phaseName: string;
    }
    interface IGameConfig {
        phase: {
            [key: string]: IPhaseData;
        };
    }
    interface IPhaseAction {
        t: string;
        x: number;
        d: number;
        team: number;
        p: any;
        f: any;
        q: number;
        a: any;
        b: any;
        name: string[];
        pos: number[];
        v: any[];
    }
    interface IPhaseTask {
        group: string;
        index: number;
        steps: {
            [key: string]: number;
        };
        actions: IPhaseAction[];
    }
    interface IPhaseData {
        id: string;
        tasks: IPhaseTask[];
    }
    var phaseDebug: boolean;
    function playPhase(id: string, target?: any, params?: any): Recyclable<Phase>;
    var __phaseTarget: {
        [key: string]: Sprite | ((key?: string) => Sprite);
    };
    class Phase extends MiniDispatcher implements IRecyclable {
        static getPhaseDisplay(name: string): Sprite;
        id: string;
        index: number;
        actions: IPhaseAction[];
        steps: {
            [key: string]: number;
        };
        temp: {
            [key: string]: any;
        };
        task: IPhaseTask;
        target: any;
        params: any;
        tm: ITimeMixer;
        nextActionTime: number;
        status: LoadStates;
        play(task: IPhaseTask, target?: any, tm?: ITimeMixer, params?: any): void;
        stop(): void;
        act_desc(a: any): string;
        nextTime: MiniDispatcher;
        next(e?: EventX): void;
        coverAction<T>(action: any, param: any): T;
        update(now: number, interval: number): void;
        complete(): void;
        onRecycle(): void;
        delay(action: IPhaseAction, params: any): number;
        check(action: IPhaseAction): void;
        if(action: {
            f: Boolean;
            b: string;
            p: string;
            q: string;
        }): void;
        goto(action: IPhaseAction): void;
        xiangwei(action: IPhaseAction): Recyclable<Phase>;
        playxw(id: string): Recyclable<Phase>;
        onPhaseComplete(e: EventX): void;
        func(action: IPhaseAction): any;
        log(action: IPhaseAction): void;
        mask(action: IPhaseAction): number;
        facade(action: IPhaseAction): void;
        event(action: IPhaseAction, params: any): Recyclable<MiniDispatcher>;
        maskto(action: IPhaseAction): number;
        setpro(action: IPhaseAction): void;
        click(action: IPhaseAction): Recyclable<MiniDispatcher>;
    }
}
declare module rf {
    class O1Split {
        init(): void;
        split(str: string, separator: string | RegExp, dot?: boolean): string[];
        private _z;
        private _d;
        private _k;
        private _m;
        private _m2;
        check(c: string, enter?: string | RegExp): Boolean;
        isPass(): 1 | 0 | -1;
        find(str: string, s: string, e: string): string;
    }
    var o1split: O1Split;
}
declare module rf {
    class HtmlUtil {
        static RED: string;
        static GREEN: string;
        static WHITE: string;
        static YELLOW: string;
        static RICEYELLOW: string;
        static DEF_TOGGLE1: string;
        static DEF_TOGGLE2: string;
        static boldString(str: string): string;
        static renderLink2(linkName: string, o: object): string;
        static renderLink(linkName: string, event: string, color?: string): string;
        static renderAdvLink(linkName: string, o: object, color: string, u?: boolean): string;
        static red(value: string): string;
        static green(value: string): string;
        static toggleColor(value: any, bool: Boolean, clr1?: string, clr2?: string): string;
        static renderColor(value: string, color: string): string;
        static underline(result: string): string;
    }
}
declare module rf {
    function bezier_2(s: IVector3D, e: IVector3D, d: IVector3D, t: number, result?: IVector3D): IVector3D;
    function bezier_3(s: IVector3D, e: IVector3D, p1: IVector3D, p2: IVector3D, t: number, result?: IVector3D): IVector3D;
}
declare module rf {
    function initFilterstring(str: string, split: string): void;
    function wordCensor2(msg: string): string;
    function checkWord2(msg: string): boolean;
    let replaceDirty: (substring: string) => string;
    const WordFilter: {
        initFilterstring: typeof initFilterstring;
        wordCensor: typeof wordCensor2;
        setDirtyHandler(handler: (substring: string) => string): void;
        checkWord: typeof checkWord2;
    };
}
