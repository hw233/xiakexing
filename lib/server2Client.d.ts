// SM_playSound = 95,      //要求客户端播放音乐
declare type TSM_playSound = number
//音乐id

// SM_MapMove = 101,       //地图移动返回
// declare type TSM_MapMove = number
//返回ret  成功0 

// SM_MapIn = 102,       //地图进入返回
declare type TSM_MapIn = number//秘境表id
//告知客户端地图信息

// SM_MapInfo = 103,       //请求当前地图信息
declare type TSM_MapInfo = any;
//告知客户端地图信息

// SM_MapOut = 104,       //地图退出
declare type TSM_MapOut = [any, number, number]
//关卡結束類型  type，  结束地图mijingid, 秘境结束时间

// SM_MapJoin = 105,       //地图匹配
declare type TSM_MapJoin = number
//返回当前匹配人数

// SM_MapJoinCancel = 106,       //地图匹配取消
declare type TSM_MapJoinCancel = number
//返回成功结果

// SM_UpdateRoom = 109,    //单量更新房间
declare type TSM_UpdateRoom = any
//返回成功结果
// runtime = { rooms: {} }
// rooms[v.id] = { name, type, id, roomId, paths, x, y, roomStatus } as IRoomRuntime

// SM_RoomInfo = 110       //房间信息
declare type TSM_RoomInfo = undefined

//SM_RoomIn = 111       //房间进入
declare type TSM_RoomIn = string;
//如果失败返回失败原因,否则无返回直接返回房间信息

//SM_RoomUpgrade = 112       //房间升级
declare type TSM_RoomUpgrade = number;
//成功返回新的房间数据,失败返回失败原因

//SM_RoomUpgradeEnd = 113       //房间升级完毕
declare type TSM_RoomUpgradeEnd = number;


// SM_MapJoinChange = 114,       //地图匹配人数更新
declare type TSM_MapJoinChange = number
//返回成功结果 当前匹配人数


//返回房间数据
// SM_ElementAct = 120,     //元素互动
declare type TSM_ElementAct = { act: string, guid: number };
//返回元素互动具体数据
//SM_ElementAct = 121,    //元素互动
declare type TSM_ElementActEnd = { act: string, guid: number };

//SM_ElementInfo = 122,   //元素信息
declare type TSM_ElementInfo = number;
//返回元素具体信息

// SM_ChangeMapTime = 125, //改变地图时间
//map.data.close 地图关闭时间

// SM_IntoMiJingAndRoom = 126, //进入秘境并到指定房间
declare type TSM_IntoMiJingAndRoom = number
//返回ret  成功0 

// SM_UpdateRoleZhuangTai = 130,  //单量更新房间内某人的状态
declare type TSM_UpdateRoleZhuangTai = [number, number];
//role的guid   zhuangtai


// SM_Create = 201,        //创角获取基础属性
declare type TSM_Create = number
//返回ret  成功0 

// SM_JoinSect = 301,      //加入门派
declare type TSM_JoinSect = number
//返回ret  成功0 

// SM_Sit = 302,           //打坐
declare type TSM_Sit = number
//返回ret  成功0 

// SM_Treat = 303,         //治疗
declare type TSM_Treat = number
//返回ret  成功0 ， 1已回满  2mp不足 ，3 cd未好

// SM_GetTeacher = 304,    //拜师
declare type TSM_GetTeacher = number
//返回ret  成功0 

// SM_SetCurrAdd = 304,    //设置当前加力值
declare type TSM_SetCurrAdd = number

// SM_SkillLearn = 401,    //学技能
declare type TSM_SkillLearn = number
//返回ret  成功0 

// SM_SkillUpgrade = 402,  //升级技能 
declare type TSM_SkillUpgrade = number
//返回ret  成功0 

// SM_SkillTrain = 403,    //练习技能 
declare type TSM_SkillTrain = number
//返回ret  成功0 

// SM_StopSkillTrain = 404, //停止练习技能
declare type TSM_StopSkillTrain = number
//返回ret  成功0 

// SM_EquipSkill = 405,    //装备技能
declare type TSM_EquipSkill = number
//返回ret  成功0 

// SM_TakeOfSkill = 406,   //脱下技能
declare type TSM_TakeOfSkill = number
//返回ret  成功0 

// SM_ReadBook = 408,      //读书
declare type TSM_ReadBook = number
//返回ret  成功0   、1未学习基础技能

// SM_Plant = 501,         //种田
declare type TSM_Plant = number
//返回ret  成功0    1 该地正在种植    2 种子不够

// SM_Care = 502,          //照料
declare type TSM_Care = number
//返回ret  成功0   1 精神不足   2 cd未到

// SM_Harvest = 503,       //收获
declare type TSM_Harvest = number
//返回ret  成功0    1  收获时间未到

// SM_StopPlant = 504,     //停止种田
declare type TSM_StopPlant = number
//返回ret  成功0   1  该地没有种植

// SM_Cook = 601,          //做菜
declare type TSM_Cook = number
//返回ret  成功0 

// SM_StopCook = 602,      //停止做菜
declare type TSM_StopCook = [number, number, number]
//返回ret  成功0   ,  停止时已制作的数量, 该菜的conbineid

// SM_CookHarvest = 603,   //收获做菜
declare type TSM_CookHarvest = [number, number, number]
//返回ret  成功0   ,  停止时已制作的数量, 该菜的conbineid

// SM_MoveItem = 701,      //移动道具
declare type TSM_MoveItem = number
//返回ret  成功0 

// SM_UseItem = 702,		// 使用道具
declare type TSM_UseItem = { ret: number, reason: any, itemId: number };
//返回ret  成功0 ， 不可在战斗中使用 1， 使用条件不满足 2，    失败原因

//SM_TakeOffEquip = 703,      //脱下装备
declare type TSM_TakeOffEquip = number
// 当前装备guid

// SM_TakeOnEquip = 704,       //穿上装备
declare type TSM_TakeOnEquip = [number, number, number]
// 当前装备guid 当前装备位置 替换装备guid

// SM_ChangeQuickSlot = 705,   //更换快捷栏道具
declare type TSM_ChangeQuickSlot = [number, number]
//道具id ， 位置

// SM_RemoveItem = 706,    //宝箱删除物品
declare type TSM_RemoveItem = [number, number]
//道具guid ， slot

// SM_UpdateExtraData = 716,  //更新道具extradata
declare type TSM_UpdateExtraData = [number, { durability: number, maxdurability: number }]
//道具guid ， durability值， maxdurability值

// SM_ShowGetItems = 718,      // 显示玩家获取的奖励
declare type TSM_ShowGetItems = IConfigLimit[]
//奖励limit数组

// SM_ItemSplit = 719,         //道具拆分返回
declare type TSM_ItemSplit = number
//返回ret  成功0  ， 1 拆分数有误， 2背包格子不够

// SM_GetAllItemFromChet = 717, //宝箱一键获取
declare type TSM_GetAllItemFromChet = number
//返回ret  成功0 

//SM_BattleOut = 902,     //退出战斗
declare type TSM_BattleOut = undefined
//返回退出结果

//SM_BattleAttack = 904,  //普通攻击
declare type TSM_BattleAttack = undefined;
//返回战斗更新数据

//SM_BattleSkill = 905,   //战斗技能
declare type TSM_BattleSkill = [number, number];//招式id,技能id
//返回战斗更新数据

//SM_BattleEscape = 908,//逃跑退出战斗
declare type TSM_BattleEscape = undefined;
//成功则退出战斗，失败返回0

//SM_BattleSetTarget = 909,//战斗切换目标
declare type TSM_BattleSetTarget = number
//成功返回战斗更新数据，失败返回0

// SM_BattleStuporFromInfo = 912,  //杀死你的玩家的详细信息
declare type TSM_BattleStuporFromInfo =
    {
        hero: IReshero,
        skill: IResskill,
        item: IResitem
    }
//死亡时发送杀死你的玩家的详细信息

// SM_BattleReward = 913,          //击杀获得奖励
declare type TSM_BattleReward = any
//奖励内容 limit


// SM_MakeFuzhou = 1001,          //做符咒
declare type TSM_MakeFuzhou = [number, number, number]
//返回ret  成功0 

// SM_StopFuZhou = 1002,          //停止做符咒
declare type TSM_StopFuZhou = number
//返回ret  成功0   ,  停止时已制作的数量, 该符咒的conbineid

// SM_FuzhouHarvest = 1003,       //收获符咒
declare type TSM_FuzhouHarvest = [number, number, number]
//返回ret  成功0   ,  停止时已制作的数量, 该符咒的conbineid

// SM_NearPerson = 1004,          //侦查周围玩家信息
declare type TSM_NearPerson = { [key: string]: number }
//key  ：roomid    几个

// SM_NearDeadPerson = 1005,          //侦查周围尸体信息
declare type TSM_NearDeadPerson = { [key: string]: number }
//key  ：roomid    几个

// SM_ChangeCanSeePerson = 1006,  //修改可看见的玩家
declare type TSM_ChangeCanSeePerson = number[]
//可看见玩家guid数组

// SM_Chat = 1101,      // 聊天返回
declare type TSM_Chat = [number, number]
//返回ret  成功0  错误状态码：玩家不存在0 冷却时间未到1 敏感词2

// SM_InfoMessage = 1102			// 信息栏通信
declare type TSM_InfoMessage = [number, string, number, string, number, string]				// 信息栏通信
// 通道、发送内容、发出消息者GUID、发出消息者名字、目标GUID、目标名字

// SM_FangChenMi = 1104,      //置防沉迷
declare type TSM_FangChenMi = number      
//返回ret  成功0

// SM_KickOut = 1105,          //服务器踢人
declare type TSM_KickOut = [number,any]      
//返回踢人原因  1001防沉迷时间到   , reason原因

// // SM_AcceptTask = 1201,       //接受任务
declare type TSM_AcceptTask = number
// // 返回ret  成功0 

// sM_RewardTask = 1202,       //领取任务奖励
declare type TSM_RewardTask = number
// 返回ret  成功0 

// SM_TrackTask = 1203,        //追踪任务
declare type TSM_TrackTask = number
// 返回ret  成功0

// SM_GiveUpTask = 1204,       //放弃任务（仅悬赏）
declare type TSM_GiveUpTask = number
// 返回ret  成功0

// SM_FreshXuanShangTask = 1205,  //刷新悬赏任务
declare type TSM_FreshXuanShangTask = number
// 返回ret  成功0

// SM_DuiHuan = 1301,         //与npc兑换
declare type TSM_DuiHuan = number
// 返回ret  成功0

// SM_WaKuang = 1401,         //挖矿
declare type TSM_WaKuang = [number, number, number]
// 返回ret  成功0， 开始时间，结束时间

// SM_WaKuangStop = 1402,     //中止挖矿
declare type TSM_WaKuangStop = [number, number]
// 返回ret  成功0， 进度值

// SM_WaKuangReward = 1403,   //收获挖矿
declare type TSM_WaKuangReward = [number, number]
// 返回ret  成功0， 次数

// SM_WaKuangInfo = 1404,     //挖矿信息
declare type TSM_WaKuangInfo = WaKuangData
// 挖矿信息

// SM_ShangchengBuy = 1502,   //商城购买
declare type TSM_ShangchengBuy = number
// 返回ret  成功0

// SM_SwitchAutoSkill = 1601,  //切换自动技能列表
declare type TSM_SwitchAutoSkill = number
// 返回ret  成功0

// SM_ChangeAutoSkill = 1602,  //更改自动技能
declare type TSM_ChangeAutoSkill = number
// 返回ret  成功0