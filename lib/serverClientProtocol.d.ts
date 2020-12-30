declare const enum IModuleSocketConst {

    MAP = 100,
    CREATE = 200,
    HERO = 300,
    SKILL = 400,
    FIELD = 500,
    COOK = 600,
    ITEM = 700,
    SHOP = 800,
    Battle = 900,
    FUZHOU = 1000,
    SETTING = 1100,
    TASK = 1200,
    DUIHUAN = 1300,
    WAKUANG = 1400,
    SHANGCHENG = 1500,
    AUTOMATICSKILL = 1600,

}

//客户端上行协议号
declare const enum CM_CODE {

    //Public

    //MAP
    //CM_MapMove = 101,       //地图移动
    CM_MapIn = 102,        //进地图
    CM_MapInfo = 103,       //地图信息
    CM_MapOut = 104,        //出地图
    CM_MapJoin = 105,       //地图匹配
    CM_MapJoinCancel = 106, //取消地图匹配
    CM_MapRecover = 108,    //客户端回到游戏地图恢复

    CM_RoomInfo = 110,      //房间信息
    CM_RoomIn = 111,        //进房间
    CM_RoomUpgrade = 112,    //房间升级
    CM_RoomUpgradeEnd = 113, //房间升级完毕
    CM_RoomInit = 114,       //房间初始化
    CM_ElementsRoom =115,    //获取元素房间位置

    CM_ElementAct = 120,    //元素互动
    CM_ElementActEnd = 121,
    CM_ElementInfo = 122,   //元素信息
    CM_ElementCheckAtt = 123, //判定npc攻击

    CM_IntoMiJingAndRoom = 126, //进入秘境并到指定房间
    //CREATE
    CM_Create = 201,        //创角获取基础属性

    //HERO
    CM_JoinSect = 301,      //加入门派
    CM_Sit = 302,           //打坐
    CM_Treat = 303,         //治疗
    CM_GetTeacher = 304,    //拜师
    CM_Rest = 305,          //睡觉
    CM_StopSit = 306,       //停止打坐
    CM_StopRest = 307,      //停止睡觉
    CM_FightMode = 308,     //切换战斗模式
    CM_StopTreat = 309,     //停止治疗
    CM_Propertys = 320,     //请求先天后天属性
    CM_SetCurrAdd = 322,    //设置当前加力值
    CM_ExcelReward = 399,   //领取excel奖励

    //SKILL
    CM_SkillLearn = 401,    //学技能
    CM_SkillUpgrade = 402,  //升级技能  
    CM_SkillTrain = 403,    //练习技能 
    CM_StopSkillTrain = 404, //停止练习技能
    CM_EquipSkill = 405,    //装备技能
    CM_TakeOfSkill = 406,   //脱下技能
    CM_ReadBook = 408,      //读书
    CM_StopReadBook = 409,  //停止读书

    //FIELD
    CM_Plant = 501,         //种田
    CM_Care = 502,          //照料
    CM_Harvest = 503,       //收获
    CM_StopPlant = 504,     //停止种田

    //COOK
    CM_Cook = 601,          //做菜
    CM_StopCook = 602,      //停止做菜
    CM_CookHarvest = 603,   //收获做菜

    //ITEM
    CM_MoveItem = 701,      //移动道具
    CM_UseItem = 702,      //使用道具
    CM_TakeOffEquip = 703,      //脱下装备
    CM_TakeOnEquip = 704,       //穿上装备
    CM_ChangeQuickSlot = 705,   //更换快捷栏道具
    CM_UseItemById = 706,       //通过道具id使用道具
    CM_ItemSplit = 707,         //道具拆分
    CM_ItemMerge = 708,         //道具合并
    CM_SellItem = 709,          //道具出售
    CM_BuyItem = 710,           //道具购买
    CM_CheatToBag = 711,        //道具宝箱到背包
    CM_BagToCheat = 712,        //道具背包到宝箱
    CM_MoveItemInCheat = 713,   //宝箱中移动物品
    CM_SwapItem = 714,          //交換道具
    CM_Repair = 715,            //修理道具
    CM_GetAllItemFromChet = 717, //宝箱一键获取
    CM_RemoveItem = 718,        //删除道具

    //SHOP
    CM_ShopBuy = 801,      //npc购买
    // CM_GetStore = 802,     //获取商城物品信息
    // CM_StoreBuy = 803,     //商城购买

    //Battle
    CM_BattleOut = 902,     //退出战斗
    CM_BattleAttack = 904,  //普通攻击
    CM_BattleSkill = 905,   //战斗技能
    CM_BattleEscape = 908,  //逃跑退出战斗
    CM_BattleTarget = 909,  //战斗切换目标
    CM_BattleRecover = 910, //客户端回到游戏战斗恢复
    CM_BattleRegain = 911,  //战斗回复
    CM_BattleUseItem = 912,  //战斗使用道具

    //FUZHOU
    CM_MakeFuzhou = 1001,          //做符咒
    CM_StopFuZhou = 1002,          //停止做符咒
    CM_FuzhouHarvest = 1003,       //收获符咒

    // SETTING
    CM_Chat = 1101,			// 信息栏通信
    // 1102     // 聊天返回
    CM_Sound = 1103,           //音乐音量
    CM_FangChenMi = 1104,      //置防沉迷
    CM_AutoSkill = 1105,       //自动释放技能开关

    //TASK
    CM_AcceptTask = 1201,       //接受任务
    CM_RewardTask = 1202,       //领取任务奖励
    CM_TrackTask = 1203,        //追踪任务
    CM_GiveUpTask = 1204,       //放弃任务（仅悬赏）
    CM_FreshXuanShangTask = 1205,  //刷新悬赏任务

    // DUIHUAN ,
    CM_DuiHuan = 1301,         //与npc兑换

    // WAKUANG
    CM_WaKuang = 1401,         //挖矿
    CM_WaKuangStop = 1402,     //中止挖矿
    CM_WaKuangReward = 1403,   //收获挖矿
    CM_WaKuangInfo = 1404,     //获取矿信息

    // SHANGCHENG
    CM_ShangchengBuy = 1502,   //商城购买

    // AUTOMATICSKILL = 1600,
    CM_SwitchAutoSkill = 1601,  //切换自动技能列表
    CM_ChangeAutoSkill = 1602,  //更改自动技能

    //
    CM_RoomsGundong = 1701, //通知房间内滚动条刷新
    CM_RoomsMapRoom = 1702, //通知房间内位置更新
}

//服务器下行协议号
declare const enum SM_CODE {

    //Public
    SM_PlayPhase = 94,      //要求客户端播放相位
    SM_PlaySound = 95,      //要求客户端播放音乐
    SM_Log = 96,            //客戶端 
    SM_Prompt = 97,         //tip提示   
    SM_Message = 98,        //聊天系统提示   
    SM_Alert = 99,          //确认弹框

    //MAP
    //SM_MapMove = 101,       //地图移动返回
    SM_MapIn = 102,        //进地图返回
    SM_MapInfo = 103,       //地图信息
    SM_MapOut = 104,        //出地图
    SM_MapJoin = 105,
    SM_MapJoinCancel = 106, //取消地图匹配
    SM_MapRecover = 108,    //客户端回到游戏地图恢复
    SM_UpdateRoom = 109,    //单量更新房间

    SM_RoomInfo = 110,       //房间信息
    SM_RoomIn = 111,        //进房间
    SM_RoomUpgrade = 112,    //房间升级
    SM_RoomUpgradeEnd = 113, //房间升级完毕
    SM_MapJoinChange = 114, // 匹配人数更新
    SM_ElementsRoom =115,    //获取元素房间位置

    SM_ElementAct = 120,    //元素互动
    SM_ElementActEnd = 121,
    SM_ElementInfo = 122,   //元素信息
    SM_ElementIn = 123, //元素改变
    SM_ElementOut = 124, //元素改变
    SM_ChangeMapTime = 125, //改变地图时间
    SM_IntoMiJingAndRoom = 126, //进入秘境并到指定房间


    SM_UpdateRoleZhuangTai = 130,  //单量更新房间内某人的状态
    //CREATE
    SM_Create = 201,        //创角获取基础属性
    //HERO
    SM_JoinSect = 301,      //加入门派
    SM_Sit = 302,           //打坐
    SM_Treat = 303,         //治疗
    SM_GetTeacher = 304,    //拜师
    SM_FightMode = 308,     //切换战斗模式
    SM_HeroDead = 309,      //人物血量/精神/内力因为XX原因改变
    SM_Propertys = 320,     //先天后天属性
    SM_Property = 321,      //先天后天属性
    SM_SetCurrAdd = 322,    //设置当前加力值
    SM_Kill = 330,          //角色死亡
    SM_ExcelReward = 399,   //领取excel奖励

    //SKILL
    SM_SkillLearn = 401,    //学技能
    SM_SkillUpgrade = 402,  //升级技能  
    SM_SkillTrain = 403,    //练习技能 
    SM_StopSkillTrain = 404, //停止练习技能
    SM_EquipSkill = 405,    //装备技能
    SM_TakeOfSkill = 406,   //脱下技能
    SM_SkillEffect = 407,   //技能效果
    SM_ReadBook = 408,      //读书

    //FIELD
    SM_Plant = 501,         //种田
    SM_Care = 502,          //照料
    SM_Harvest = 503,       //收获
    SM_StopPlant = 504,     //停止种田

    //COOK
    SM_Cook = 601,          //做菜
    SM_StopCook = 602,      //停止做菜
    SM_CookHarvest = 603,   //收获做菜

    //ITEM
    SM_MoveItem = 701,      //移动道具
    SM_UseItem = 702,		// 使用道具
    SM_TakeOffEquip = 703,      //脱下装备
    SM_TakeOnEquip = 704,       //穿上装备
    SM_ChangeQuickSlot = 705,   //更换快捷栏道具
    SM_RemoveItem = 706,    //道具删除
    SM_ChangeItem = 707,    //道具数量变化
    SM_UpdateExtraData = 716,  //更新道具extradata
    SM_GetAllItemFromChet = 717, //宝箱一键获取
    SM_ShowGetItems = 718,      // 显示玩家获取的奖励
    SM_ItemSplit = 719,         //道具拆分返回
    SM_UpdateItems = 720,        //更新道具背包
    SM_MoveItemOver = 721,        //移动道具结束
    SM_ShowGetItemsTips = 722,      // 显示玩家获取的道具奖励，并弹窗

    //Buff
    SM_BuffAdd = 801,       //buff添加
    SM_BuffUpdate = 802,    //buff效果刷新
    SM_BuffRemove = 803,    //buff移除
    //Battle
    SM_BattleIn = 901,      //进入战斗
    SM_BattleOut = 902,     //退出战斗
    SM_BattleUpdate = 903,  //战斗更新
    SM_BattleAttack = 904,  //普通攻击
    SM_BattleSkill = 905,   //战斗技能
    SM_BattleOtherIn = 906, //其他人加入战斗
    SM_BattleOtherOut = 907,//其他人退出战斗
    SM_BattleEscape = 908,  //逃跑退出战斗
    SM_BattleTarget = 909,  //战斗切换目标
    SM_BattleRecover = 910, //客户端回到游戏战斗恢复
    SM_BattleRegain = 911,  //战斗回复
    SM_BattleStuporFromInfo = 912,  //杀死你的玩家的详细信息
    SM_BattleReward = 913,          //击杀获得奖励

    //FUZHOU
    SM_MakeFuzhou = 1001,          //做符咒
    SM_StopFuZhou = 1002,          //停止做符咒
    SM_FuzhouHarvest = 1003,       //收获符咒

    SM_NearPerson = 1004,          //侦查周围玩家信息
    SM_NearDeadPerson = 1005,          //侦查周围尸体信息
    SM_ChangeCanSeePerson = 1006,  //修改可看见的玩家


    // SETTING
    SM_Chat = 1101,				// 聊天
    SM_InfoMessage = 1102,      // 同步客户端聊天信息
    SM_FangChenMi = 1104,      //置防沉迷返回
    SM_KickOut = 1105,          //服务器踢人

    //TASK
    SM_AcceptTask = 1201,       //接受任务
    SM_RewardTask = 1202,       //领取任务奖励
    SM_TrackTask = 1203,        //追踪任务
    SM_GiveUpTask = 1204,       //放弃任务（仅悬赏）
    SM_FreshXuanShangTask = 1205,  //刷新悬赏任务
  
    // DUIHUAN ,
    SM_DuiHuan = 1301,         //与npc兑换

    // WAKUANG
    SM_WaKuang = 1401,         //挖矿
    SM_WaKuangStop = 1402,     //中止挖矿
    SM_WaKuangReward = 1403,   //收获挖矿
    SM_WaKuangInfo = 1404,     //挖矿信息

    //SHANGCHENG
    SM_ShopBuy = 1501,      //npc购买
    SM_ShangchengBuy = 1502,   //商城购买 

    // AUTOMATICSKILL = 1600,
    SM_SwitchAutoSkill = 1601,  //切换自动技能列表
    SM_ChangeAutoSkill = 1602,  //更改自动技能


    //
    SM_RoomsGundong = 1701, //通知房间内滚动条刷新
    SM_RoomsMapRoom = 1702, //通知房间内位置更新
}



declare const enum ZHUANGTAI {   //玩家状态
    YINSHEN = 0b1,
    FIGHT = YINSHEN << 1,
    HIDE = YINSHEN << 2,     //用于npc隐藏
    DIE = YINSHEN << 3,       //死亡
    STUPOR = YINSHEN << 4,    //昏迷
    VERTIGO = YINSHEN << 5,   //眩晕
    WYWQ = YINSHEN << 6,      //无欲无求
    BLOOD = YINSHEN << 7,     //流血
    WEAK = YINSHEN << 8,      //虚弱
    BLIND = YINSHEN << 9,     //致盲
    ADDSTR = YINSHEN << 10,   //臂力增加
    ADDCON = YINSHEN << 11,   //筋骨增加
    ADDDEX = YINSHEN << 12,   //身法增加
    ADDMP = YINSHEN << 13,    //持续恢复内力
    REDUCEDEF = YINSHEN << 14,//防御减少
    ADDDEF = YINSHEN << 15,   //防御增加
    FUZHOU = YINSHEN << 16,   //符咒额外使用成功率
    REDUCEATT = YINSHEN << 17,//攻击减少
    ADDATT = YINSHEN << 18,   //攻击增加
    ADDSPD = YINSHEN << 19,   //攻击速度增加
    DIFFICULTWALK = YINSHEN << 20,  //行走困难
    SHALU = YINSHEN << 21,  //杀戮
}

declare const enum ROOMSTATUS {  //房间状态
    CANTIN = 0b1,             //是否不可进入

}


declare const enum BAG_FLAG {
    EMPTY = 0,
    LOCK = -1,
    TEMP = -2
}

declare const enum STATUS_DOING {
    DAZE = 0,  //发呆
    PRACTICE = 1, //练功
    STUDY = 2, //读书
    REST = 3,  //休息
    SIT = 4,  //打坐
    TREAT = 5, //疗伤   //弃用
    GUANKASIT = 6, //关卡中打坐
    FIGHT = 7, //关卡中战斗
}

declare const enum MAP_STATUS {
    ZI_ZHAI = 1,  // 自宅
    CHENG_SHI = 2,// 門派 城市
    FU_BEN = 3,// 副本
}

declare const enum MAP_DROP_TYPE {
    TRUE = 1,
    FALSE = 2,
}

declare const enum MAP_OUT_TYPE {
    Success = 0,
    Dead,
    KickOut,
    OffLine,
    TELEPORT,
    SINGLEFUBEN,
}

declare const enum FIGHT_STATUS {
    NONE = 0,
    XUANYUN = 1,
    DIANXUE = 2,
}

declare const enum MEN_PAI_TYPE {
    DIAN_CANG = 1,
    CHAO_TING = 2,
}


declare const enum TASK_FLAG {
    NotActive = 0,
    Active = 1,
    ACCEPT = 2,
    PRE_COMPLETE = 3,
    COMPLETE = 4,
}

declare const enum ROOM_TYPE {

    WoShi = 2, //卧室
    LianGongFang = 3, //练功房
    ShuFang = 4,  //书房
    TianYuan = 5,  //田园
    ChuFang = 6, //厨房
    CangKu = 7, //仓库
    Fuzhou = 8, //制符室
}

declare const enum TARGET_TYPE {
    Self = 0,
    Target = 1,
    Other = 2,
    All = 3,
}

declare const enum ITEM_TYPE {
    Daoju = 1,       //道具
    Zhuangbei = 2,   //装备
    Zhongzi = 3,     //种子
    Cai = 4,         //菜
    Jianzao = 5,     //建造材料
    Shuji = 6,       //书籍
    Fuzhou = 7,      //符咒
    Yaopin = 8,      //药品
    Task = 9,        //特殊任务物品
    Silver = 100,    //银两
}

declare const enum CHAT_TYPE {
    SYSTEM = 1,//系统
    WORLD = 2,//世界
    ROOM = 3,//当前
    PRIVATE = 4,//私聊
    INTERACTIVE = 5,//互动
}

declare const enum CHAT_ERROR_CODE {
    UNKNOWN = 0,// 未知目标
    CD = 1,// 冷却时间未到
    SENSITIVE = 2,// 敏感词
}
declare const enum CHAT_BTN_TYPE {
    ALL = 1,//全部
    CHAT = 2,//聊天
    SYSTEM = 3,//系统
    INTERACTIVE = 4,//互动
}

declare const enum INTERACTIVE_TYPE {
    USE = 1,// 使用
    NEAR_DEATH = 2,// 濒死
    HUNGER = 3,// 饥饿
    KILL = 4,// 杀死
    COME = 5,// 来到
    GO_AWAY = 6,// 离开
    XI_JI = 23,// 袭击
}

declare const enum SOUND_TYPE {
    Effect = 0,// 音效
    Bgm = 1//  bgm
}


declare const enum DIALOGUR_TYPE {
    SELF = 0,// 自己
    NPC = 1,//  别人
    NARRATOR = 2,// 旁白
}

declare const enum TASK_KIND_TYPE {
    CHENG_SHI = 1,
    MEN_PAI = 2,
    XUAN_SHANG = 3,
    CHENG_JIU = 4,
    XIAN_SHI = 5,
}

declare const enum TASK_TYPE {
    Nomal = 1,            //普通
    Daily = 2,            //每日
    New = 3,              //新手
    Map = 4,              //地图随机任务
}