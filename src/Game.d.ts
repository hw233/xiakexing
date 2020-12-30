declare module rf {

    interface IConditionRuntime extends IModelIcon {
        bigicon: any;
        fromModule: string;
        opera: string;
        value: any;
        pt: string;
        count: number;
        quality: number;
        maxCount: number;
        runtime: any;
        show: number;
    }

    interface IHeroPro {
        atk: number;
        def: number;
        hp: number;
    }


    interface IScriptTweenTarget {
        caster: Sprite;
        x: number;
        y: number;
    }

    // interface ILimit{
    //     type:string;
    //     bijiao:string;
    //     value_left:any;
    //     value:any;
    // }

    // interface ILimitModule{
    //     type:string;
    //     target:{[key:string]:string|number};
    //     value:ILimit[];
    // }

    interface IConfigLimit {
        module: string;
        target: IConditionRuntime[];
        value: IConditionRuntime[];
        count: IConditionRuntime;
        counts: IConditionRuntime[];
        rewards: IConditionRuntime[];
        limitValues: IConditionRuntime[];
    }

    interface ITrapActionHandler {
        handler: (action: ITrapActionData, param: any) => boolean
        thisobj: any;
    }



    interface ITrapActionData {
        type: string;
        target: string;
        frame: number;
        shake?: boolean;
        id?: string;
    }


    interface ITrapData {
        id: string;

        limit: any;



        active: ITrapActionData[];
        unactive: ITrapActionData[];


        open?: boolean;
        param?: any;

        // hander: (pro:any) => boolean;
        // thisObj:any;
        // pro:any;
    }


    interface IMapMonster {
        id: string;

        // level: string;

        x: number;
        y: number;
    }


    interface ITiledReleaseTexture {
        width: number;
        height: number;
        source: string;
    }

    interface ITiledReleaseLayer {
        sources: TSource[]
        name: string;
        pro: any;
        x: number;
        y: number;
        elements: ITiledReleaseElement[];
    }

    interface ITiledReleaseElement {
        x: number;
        y: number;
        i: number;
        s: string;
    }



    interface ITileAreaVO extends IMapData {
        name: string;
        res: string;
        //机关陷阱



        createpos: number[];

        reward: any[];


        //textures
        textures: ITiledReleaseTexture[];
        //layers
        layers: ITiledReleaseLayer[];

        sources: TSource[]

        stone: ITiledReleaseLayer;

        monsters: IMapMonster[];
    }



    // interface IMapVO extends IMapData {
    //     name: string;

    //     sources: TSource[];
    //     layers: ITiledReleaseLayer[];
    //     stones: ITiledReleaseLayer[];

    //     traps: ITrapData[];
    //     monsters: IMapMonster[];
    //     createpos: number[]

    //     model: IMap;

    //     orientation: string;
    // }





    interface IUnitVO {
        guid: string | number
        id: string;
        hp: number;
        atk: number;
        def: number;

    }

    interface IAvatarVO extends IUnitVO {

    }

    interface IMonsterVO extends IUnitVO {

    }


    interface IBulletData {
        source: string;
        res: string;
        shadow: string;

        h: number;
        speed: number;

        rot: number;
        frame_rot: number;

        x: number;
        y: number;
        z: number;

        minlen: number;

        addlen: number;

        tween: IPANEL_TWEEN_DATA[]
    }

    const enum TYPE_CONFIG {
        ZHUANGBEI = 0,      //武器部位
        SKILL = 1,          //技能栏按钮
        SEX = 2,            //性别
        WEIZHI1 = 3,        //未知
        ZHAUNGTAI = 4,      //标题状态名字
        MAPSTATUS = 5,      //地图上特殊图标类型
        TASK = 6,           //任务分类
        CHAT = 7,           //聊天分类
        ZHUDONGSKILL = 8,   //主动技能
        BUFF = 9,           //buff图标
        CANGKU = 10,        //仓库分类
        DIG = 11,           //挖矿等类型
        DEAD = 12,          //死亡原因分类
        ATUOSKILL = 13,     //自动技能列表
        SKILLJINGJIE = 14,  //技能境界
        FACE = 15,          //头像顺序
        XUAN_SHANG_NAN_DU = 16,// 悬赏难度 
        WUQI_ATTACK_EFFECT = 17,// 武器攻击特效
    }

    const enum GameEvent {
        DRAG = 1000,
        MAIN = 1100,
        CREATE = 1200,
        TASK = 1300,
        MAP = 1400,

        RES_PRELOAD,
        RES_READLY,

        CHECK_SET_BTN,
        CHECK_FANGCHENMI,

        REFRESH_NEXT_POINT,
        REFRESH_HIGHTLIGHT_POINT,

        REFRESH_SKILL_LEVEL,

        REFRESH_ROOM_ELEMENT,
        REFRESH_FIND_ROOM_INFO,

        CLOSE_ALL_POPUP = 10000,

        ADD_FIGHT_MESSAGE,

        REFRESH_TONGXIANG_SELECT,

        CLOSE_MIJING_TONGXIANG_COMP,
        ADD_INPUT_BOTTOM,
        REFRESH_MAP_POS,
        REFRESH_MAP_DIRECTION,
        STOP_AUTO_FINDROOM,
        CLOSE_MAP_DIRECTION,

        UPDATE_ROLEZHUANGTAI,
        UPDATE_BATTLE_FACE,
        CHANGE_TRAGET,

        REFRESH_HONGDIAN,

        REFRESH_UPGRADE_BTN,
        REFRESH_UPGRADE_ROOM,
        REFRESH_STATUS_ROOM,
        REFRESH_QINGBAO_ROOM,

        REFRESH_ROOM_PROGRESS,
        REFRESH_FIELD,
        REFRESH_COOK,
        REFRESH_FUZHOU,
        REFRESH_ELEMENT,
        ADD_MIJING_BEIBAO,

        REFRESH_SHANGCHENG_DATA,

        REFRESH_ITEM_DATA,

        REFRESH_FIGHT_SKILL,
        REFRESH_FIGHT_TRAGET,
        REFRESH_FIGHT_ROLES,
        REFRESH_FIGHT_DATA,
        REFRESH_FIGHT_MODE,

        REFRESH_QUICK_ITEM,
        REFRESH_MATCH_ROLE,

        CHECK_ROOM_EXIT,

        GAME = 20000,

        REFRESH_WAKUANG_DATA,
    }
}