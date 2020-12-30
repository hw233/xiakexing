declare interface IClientUserInfo {
    nickName: string;
    site: string; //终端类型
    channel: string;  //渠道来源
    ad: string;   //广告来源
    ip: string;   //IP    //弃用，使用sdoUser上的ip
    firstVist: number;  //首次访问时间
    isOldPlayer: boolean;  //是否为新用户
    wx_aid: string;
    lastofflinetime: number;
    lastonlinetime: number;
    inviterOpenId: string;  //邀请者openid
    roleId: number;   //用户roleid

    name: string;    //名字
    face: string;    //头像
    device: string;  //设备
}

// CM_MapMove = 101,       //地图移动
declare type TCM_MapMove = string
//需要移动至的房间uid

// CM_MapOut = 102,        //出地图

// CM_IntoMiJingAndRoom = 126, //进入秘境并到指定房间
declare type TCM_IntoMiJingAndRoom = [number, string]
//mapid, roomid

// CM_NameAndSex = 201,    //修改名字性别
declare type TCM_Create = [string, number, IFaceData, any]
//名字，性别 1男 2女 3太监,头像，创角属性

// CM_JoinSect = 301,      //加入门派
declare type TCM_JoinSect = number
//门派id

// CM_Sit = 302,           //打坐

// CM_Treat = 303,         //治疗

// CM_GetTeacher = 304,    //拜师
declare type TCM_GetTeacher = string
// 师傅

// CM_Rest = 305,          //睡觉

// CM_StopSit = 306,       //停止打坐

// CM_StopRest = 307,      //停止睡觉

// CM_StopTreat = 309,     //停止治疗

// CM_SetCurrAdd = 322,    //设置当前加力值
declare type TCM_SetCurrAdd = number

// CM_SkillLearn = 401,    //学技能
declare type TCM_SkillLearn = number
// 技能id

// CM_SkillUpgrade = 402,  //升级技能 
declare type TCM_SkillUpgrade = [string, number, string]
// 技能id ，升级次数

// CM_SkillTrain = 403,    //练习技能 
declare type TCM_SkillTrain = string
// 技能名字

// CM_StopSkillTrain = 404, //停止练习技能

// CM_EquipSkill = 405,    //装备技能
declare type TCM_EquipSkill = string
// 技能名字

// CM_TakeOfSkill = 406,   //脱下技能
declare type TCM_TakeOfSkill = string
// 技能名字

// CM_ReadBook = 408,      //读书
declare type TCM_ReadBook = number
//书的guid

// CM_StopReadBook = 409,  //停止读书

// CM_Plant = 501,         //种田
declare type TCM_Plant = [number, number]
// 使用种子的guid , 土地的guid

// CM_Care = 502,          //照料
declare type TCM_Care = number
// 照料的土地guid

// CM_Harvest = 503,       //收获
declare type TCM_Harvest = number
// 收获的土地的guid

// CM_StopPlant = 504,     //停止种田
declare type TCM_StopPlant = number
// 土地guid

// CM_Cook = 601,          //做菜
declare type TCM_Cook = [number, number, number]
// 制作菜的id , 锅子的guid, 数量

// CM_StopCook = 602,      //停止做菜
declare type TCM_StopCook = number
//锅子的guid

// CM_CookHarvest = 603,   //收获做菜
declare type TCM_CookHarvest = number
//锅子的guid

// CM_MoveItem = 701,      //移动道具
declare type TCM_MoveItem = [number, number, number, number]
// 道具guid，所在背包location， 位置x， 位置y

// CM_UseItem = 702,      //使用道具
declare type TCM_UseItem = [number/*道具guid*/, number/*=1数量*/, number/*=undefined 拥有者*/]
// 道具guid，数量

// CM_TakeOffEquip = 703,      //脱下装备
declare type TCM_TakeOffEquip = number
//道具guid

// CM_TakeOnEquip = 704,       //穿上装备
declare type TCM_TakeOnEquip = [number, number, number/*=undefined 拥有者*/]
//道具guid ， 位置

// CM_ChangeQuickSlot = 705,   //更换快捷栏道具
declare type TCM_ChangeQuickSlot = [number, number]
//道具id ， 位置

// CM_UseItemById = 706,       //通过道具id使用道具
declare type TCM_UseItemById = number
//道具id

// CM_ItemSplit = 707,         //道具拆分
declare type TCM_ItemSplit = [number, number, number, number]
//道具guid, 数量, x, y

// CM_ItemMerge = 708,         //道具合并
declare type TCM_ItemMerge = [number, number]
//道具guid, 道具guid

// CM_SellItem = 709,          //道具出售
declare type TCM_SellItem = [number, number]
//道具guid, 数量

// CM_BuyItem = 710,           //道具购买
declare type TCM_BuyItem = [number, number, number]
//商人id, 道具guid, 数量， 

// CM_CheatToBag = 711,        //道具宝箱到背包
declare type TCM_CheatToBag = [number, number, number, number, number]
//宝箱guid,道具guid ,loaction, x，y

// CM_BagToCheat = 712,        //道具背包到宝箱
declare type TCM_BagToCheat = [number, number, number, number]
//道具guid ,宝箱guid, x，y

// CM_MoveItemInCheat = 713,   //宝箱中移动物品
declare type TCM_MoveItemInCheat = [number, number, number]
//道具guid , x，y

// CM_SwapItem = 714,          //交換道具
declare type TCM_SwapItem = [number, number]
//道具guid ,道具guid

// CM_Repair = 715,            //修理道具
declare type TCM_Repair = number
//道具guid（0为一键全修理）

// CM_GetAllItemFromChet = 717, //宝箱一键获取
declare type TCM_GetAllItemFromChet = number
//宝箱guid

// CM_ShopBuy = 801,      //商店购买
declare type TCM_ShopBuy = [number, number, number]
//npcid, 商品id, 数量，


// CM_MakeFuzhou = 1001,          //做符咒
declare type TCM_MakeFuzhou = [number, number, number]
// 制作符咒的id , 锅子的guid, 数量

// CM_StopFuZhou = 1002,          //停止做符咒
declare type TCM_StopFuZhou = number
//锅子的guid

// CM_FuzhouHarvest = 1003,       //收获符咒
declare type TCM_FuzhouHarvest = number
//锅子的guid

// CM_Chat = 1101			// 信息栏通信
declare type TCM_Chat = [number, string, number]				// 信息栏通信
// 通道 内容 目标guid

// CM_Sound = 1103,          // 音乐音量
declare type TCM_Sound = [number, number]       // 音乐音量
// 0 音效 1 bgm  | 音量

// CM_FangChenMi = 1104,      //置防沉迷
declare type TCM_FangChenMi = number       // 置防沉迷
// 0 成人 1 未成年人

// // CM_AcceptTask = 1201,       //接受任务
declare type TCM_AcceptTask = number
// // 任务id

// CM_RewardTask = 1202,       //领取任务奖励
declare type TCM_RewardTask = number
// 任务guid

// CM_TrackTask = 1203,        //追踪任务
declare type TCM_TrackTask = number
// 任务guid

// CM_GiveUpTask = 1204,       //放弃任务（仅悬赏）
declare type TCM_GiveUpTask = number
// 任务guid

// CM_FreshXuanShangTask = 1205,  //刷新悬赏任务


// CM_DuiHuan = 1301,         //与npc兑换
declare type TCM_DuiHuan = [number, number]
// npcGUID, 兑换id

// CM_WaKuang = 1401,         //挖矿
declare type TCM_WaKuang = number
// 矿的guid

// CM_WaKuangStop = 1402,     //中止挖矿
declare type TCM_WaKuangStop = number
// 矿的guid

// CM_WaKuangReward = 1403,   //收获挖矿
declare type TCM_WaKuangReward = number
// 矿的guid

// CM_WaKuangInfo = 1404,     //获取矿信息
declare type TCM_WaKuangInfo = number
// 矿的guid

// CM_ShangchengBuy = 1502,   //商城购买
declare type TCM_ShangchengBuy = [number, number]
// ID,COUNT

// CM_SwitchAutoSkill = 1601,  //切换自动技能列表
declare type TCM_SwitchAutoSkill = number
// NOWID

// CM_ChangeAutoSkill = 1602,  //更改自动技能
declare type TCM_ChangeAutoSkill = [number, any]
// [ID,{jineng1: 2001, jineng2: 2002}]