declare interface __IResfuzhou extends __IRespro{

    /**
       符咒列表
        undefined
    */
    __runtimes?: {[key:string]:IResfuzhou_runtimes}

}
declare interface IResfuzhou extends IRespro{

    /**
       符咒列表
        undefined
    */
    runtimes?: {[key:string]:IResfuzhou_runtimes}

}
declare interface IClientData{
    fuzhou?: IResfuzhou
}
declare interface __IReshero extends __IRespro{

    /**
       人物id
        undefined
    */
    __guid?: number

    /**
       类型
        1为玩家[不会保存],2为怪物,3.为其他元素
    */
    __type?: number

    /**
       头像背景
        undefined
    */
    __face_bg?: number

    /**
       头像头部
        undefined
    */
    __face_tou?: number

    /**
       头像头发
        undefined
    */
    __face_fa?: number

    /**
       头像眉毛
        undefined
    */
    __face_mei?: number

    /**
       头像眼睛
        undefined
    */
    __face_yan?: number

    /**
       头像胡子
        undefined
    */
    __face_hu?: number

    /**
       名字
        undefined
    */
    __name?: string

    /**
       称号
        undefined
    */
    __title?: string

    /**
       经验
        undefined
    */
    __exp?: number

    /**
       饱食度
        undefined
    */
    __hunger?: number

    /**
       最大饱食度
        undefined
    */
    __maxhunger?: number

    /**
       性别
        undefined
    */
    __sex?: number

    /**
       潜能点
        undefined
    */
    __potential?: number

    /**
       属性表
        undefined
    */
    __pros?: string[]

    /**
       所在地图
        undefined
    */
    __map?: number

    /**
       所在地图名字
        undefined
    */
    __mapName?: string

    /**
       所在地图上的房间
        undefined
    */
    __room?: string

    /**
       使用的元素表id
        undefined
    */
    __elementId?: number

    /**
       道具组
        undefined
    */
    __items?: number[]

    /**
       战场id
        大于0在战场中（打架）
    */
    __battleId?: number

    /**
       状态（健康）
        undefined
    */
    __statusHealth?: number

    /**
       状态（受伤）
        undefined
    */
    __statusHurt?: number

    /**
       无欲无求开始时间
        undefined
    */
    __WywqBeginTime?: number

    /**
       流血开始时间
        undefined
    */
    __BloodBeginTime?: number

    /**
       虚弱开始时间
        undefined
    */
    __WeakBeginTime?: number

    /**
       致盲开始时间
        undefined
    */
    __BlindBeginTime?: number

    /**
       状态（死亡）
        undefined
    */
    __statusDie?: number

    /**
       状态（饥饿）
        undefined
    */
    __statusHunger?: number

    /**
       状态（在干嘛）
        undefined
    */
    __statusDoing?: number

    /**
       状态（忙碌）
        undefined
    */
    __statusBusy?: number

    /**
       战斗模式
        undefined
    */
    __fightMode?: number

    /**
       战斗特殊状态
        undefined
    */
    __fightStatus?: number

    /**
       战斗状态结束时间
        undefined
    */
    __fightStatusEndTime?: number

    /**
       地图类型
        1自宅,2门派/城市,3.副本
    */
    __mapstatus?: number

    /**
       攻击次数
        undefined
    */
    __times?: number

    /**
       玩家状态（隐身，灼烧..）
        undefined
    */
    __zhuangtai?: number

    /**
       是否老号或老npc
        undefined
    */
    __boOld?: number

    /**
       在关卡内个人已被允许进入的房间
        undefined
    */
    __hasBeenAllowedInRooms?: string[]

    /**
       当前地图累积时间（秒）
        undefined
    */
    __curMapAddTime?: number

}
declare interface IReshero extends IRespro{

    /**
       人物id
        undefined
    */
    guid?: number

    /**
       类型
        1为玩家[不会保存],2为怪物,3.为其他元素
    */
    type?: number

    /**
       头像背景
        undefined
    */
    face_bg?: number

    /**
       头像头部
        undefined
    */
    face_tou?: number

    /**
       头像头发
        undefined
    */
    face_fa?: number

    /**
       头像眉毛
        undefined
    */
    face_mei?: number

    /**
       头像眼睛
        undefined
    */
    face_yan?: number

    /**
       头像胡子
        undefined
    */
    face_hu?: number

    /**
       名字
        undefined
    */
    name?: string

    /**
       称号
        undefined
    */
    title?: string

    /**
       经验
        undefined
    */
    exp?: number

    /**
       饱食度
        undefined
    */
    hunger?: number

    /**
       最大饱食度
        undefined
    */
    maxhunger?: number

    /**
       性别
        undefined
    */
    sex?: number

    /**
       潜能点
        undefined
    */
    potential?: number

    /**
       属性表
        undefined
    */
    pros?: string[]

    /**
       所在地图
        undefined
    */
    map?: number

    /**
       所在地图名字
        undefined
    */
    mapName?: string

    /**
       所在地图上的房间
        undefined
    */
    room?: string

    /**
       使用的元素表id
        undefined
    */
    elementId?: number

    /**
       道具组
        undefined
    */
    items?: number[]

    /**
       战场id
        大于0在战场中（打架）
    */
    battleId?: number

    /**
       状态（健康）
        undefined
    */
    statusHealth?: number

    /**
       状态（受伤）
        undefined
    */
    statusHurt?: number

    /**
       无欲无求开始时间
        undefined
    */
    WywqBeginTime?: number

    /**
       流血开始时间
        undefined
    */
    BloodBeginTime?: number

    /**
       虚弱开始时间
        undefined
    */
    WeakBeginTime?: number

    /**
       致盲开始时间
        undefined
    */
    BlindBeginTime?: number

    /**
       状态（死亡）
        undefined
    */
    statusDie?: number

    /**
       状态（饥饿）
        undefined
    */
    statusHunger?: number

    /**
       状态（在干嘛）
        undefined
    */
    statusDoing?: number

    /**
       状态（忙碌）
        undefined
    */
    statusBusy?: number

    /**
       战斗模式
        undefined
    */
    fightMode?: number

    /**
       战斗特殊状态
        undefined
    */
    fightStatus?: number

    /**
       战斗状态结束时间
        undefined
    */
    fightStatusEndTime?: number

    /**
       地图类型
        1自宅,2门派/城市,3.副本
    */
    mapstatus?: number

    /**
       攻击次数
        undefined
    */
    times?: number

    /**
       玩家状态（隐身，灼烧..）
        undefined
    */
    zhuangtai?: number

    /**
       是否老号或老npc
        undefined
    */
    boOld?: number

    /**
       在关卡内个人已被允许进入的房间
        undefined
    */
    hasBeenAllowedInRooms?: string[]

    /**
       当前地图累积时间（秒）
        undefined
    */
    curMapAddTime?: number

}
declare interface IClientData{
    hero?: IReshero
}
declare interface __IResshop extends __IRespro{

    /**
       undefined
        undefined
    */
    __id?: {[key:string]:IResshop_id}

}
declare interface IResshop extends IRespro{

    /**
       undefined
        undefined
    */
    id?: {[key:string]:IResshop_id}

}
declare interface IClientData{
    shop?: IResshop
}
declare interface __IResshop_id extends __IRespro{

    /**
       物品id
        undefined
    */
    __id?: number

    /**
       数量
        undefined
    */
    __count?: number

    /**
       折扣
        undefined
    */
    __dis?: number

}
declare interface IResshop_id extends IRespro{

    /**
       物品id
        undefined
    */
    id?: number

    /**
       数量
        undefined
    */
    count?: number

    /**
       折扣
        undefined
    */
    dis?: number

}
declare interface __IResmenpai extends __IRespro{

    /**
       é¨æ´¾
        undefined
    */
    __guild?: number

    /**
       师父
        undefined
    */
    __master?: number

    /**
       门派贡献
        undefined
    */
    __devote?: number

    /**
       门派分支
        undefined
    */
    __branch?: number

    /**
       门派地位
        undefined
    */
    __diwei?: number

    /**
       门派福利
        undefined
    */
    __welfare?: number

}
declare interface IResmenpai extends IRespro{

    /**
       é¨æ´¾
        undefined
    */
    guild?: number

    /**
       师父
        undefined
    */
    master?: number

    /**
       门派贡献
        undefined
    */
    devote?: number

    /**
       门派分支
        undefined
    */
    branch?: number

    /**
       门派地位
        undefined
    */
    diwei?: number

    /**
       门派福利
        undefined
    */
    welfare?: number

}
declare interface IClientData{
    menpai?: IResmenpai
}
declare interface __IRespro {

    /**
       臂力
        代表角色力气，主要影响攻击力。
    */
    __basestr?: number

    /**
       筋骨
        代表角色体制，主要影响内力和气血。
    */
    __basecon?: number

    /**
       身法
        代表角色灵活性，主要影响闪避和防御力。
    */
    __basedex?: number

    /**
       悟性
        代表角色智力程度，主要影响功法升级效率。
    */
    __baseler?: number

    /**
       灵性
        代表角色学武天赋，主要影响可学习技能数量。
    */
    __baseper?: number

    /**
       臂力
        代表角色力气，主要影响攻击力。
    */
    __str?: number

    /**
       筋骨
        代表角色体制，主要影响内力和气血。
    */
    __con?: number

    /**
       身法
        代表角色灵活性，主要影响闪避和防御力。
    */
    __dex?: number

    /**
       悟性
        代表角色智力程度，主要影响功法升级效率。
    */
    __ler?: number

    /**
       灵性
        代表角色学武天赋，主要影响可学习技能数量。
    */
    __per?: number

    /**
       福源
        代表角色运气，主要影响暴击和掉宝率。
    */
    __luck?: number

    /**
       等级
        undefined
    */
    __level?: number

    /**
       血量
        气血为0时，角色会陷入昏迷。气血上限为0时，角色会死亡。
    */
    __hp?: number

    /**
       血量上限
        undefined
    */
    __lhp?: number

    /**
       最大血量
        undefined
    */
    __mhp?: number

    /**
       内力
        内力主要为玩家释放技能和攻击时的消耗。
    */
    __mp?: number

    /**
       内力上限
        undefined
    */
    __lmp?: number

    /**
       最大内力
        undefined
    */
    __mmp?: number

    /**
       精神
        精神为玩家练功和读书时主要消耗。
    */
    __vigor?: number

    /**
       精神上限
        undefined
    */
    __maxvigor?: number

    /**
       年龄
        undefined
    */
    __age?: number

    /**
       攻击
        代表角色攻击降低对方气血的能力
    */
    __att?: number

    /**
       防御
        代表角色减少所受气血伤害的能力
    */
    __def?: number

    /**
       伤害
        代表角色攻击降低对方气血上限的能力
    */
    __hurt?: number

    /**
       防护
        代表角色减少所受气血上限伤害的能力
    */
    __prot?: number

    /**
       命中
        代表角色攻击命中对方的能力
    */
    __hit?: number

    /**
       闪避
        代表角色闪避对方攻击的能力
    */
    __agl?: number

    /**
       攻速
        代表角色释放技能后，距下一次技能释放快慢的能力
    */
    __spd?: number

    /**
       最大加力值
        undefined
    */
    __add?: number

    /**
       当前加力值
        undefined
    */
    __addcur?: number

    /**
       加力攻击力
        undefined
    */
    __addatt?: number

    /**
       气血最大减伤
        undefined
    */
    __sub?: number

    /**
       符咒使用的成功率
        undefined
    */
    __fzrate?: number

    /**
       界面地图&小地图视野范围
        undefined
    */
    __field?: number

    /**
       符咒造成的伤害增加X倍
        undefined
    */
    __fuzhou?: number

    /**
       状态（隐身）
        undefined
    */
    __statusYinShen?: number

    /**
       状态（隐藏npc）
        undefined
    */
    __statusHide?: number

    /**
       状态（战斗）
        undefined
    */
    __statusFight?: number

    /**
       状态（行走困难）
        undefined
    */
    __statusDifficultWalk?: number

    /**
       状态（昏迷）
        undefined
    */
    __statusStupor?: number

    /**
       气血上限提升(mhp)
        undefined
    */
    __mhpt?: number

    /**
       内力上限提升(mmp)
        undefined
    */
    __mmpt?: number

    /**
       房间是否解锁(1锁定，进不去)
        undefined
    */
    __cantIn?: number

    /**
       状态（晕眩）
        undefined
    */
    __statusVertigo?: number

    /**
       状态（无欲无求）
        undefined
    */
    __statusWywq?: number

    /**
       状态（流血）
        undefined
    */
    __statusBlood?: number

    /**
       状态（虚弱）
        undefined
    */
    __statusWeak?: number

    /**
       状态（致盲）
        undefined
    */
    __statusBlind?: number

    /**
       状态（臂力增加）
        undefined
    */
    __statusAddstr?: number

    /**
       状态（筋骨增加）
        undefined
    */
    __statusAddcon?: number

    /**
       状态（身法增加）
        undefined
    */
    __statusAdddex?: number

    /**
       状态（持续回复内力）
        undefined
    */
    __statusAddMp?: number

    /**
       状态（防御减少）
        undefined
    */
    __statusReducedef?: number

    /**
       状态（防御增加）
        undefined
    */
    __statusAdddef?: number

    /**
       状态（符咒额外使用成功率）
        undefined
    */
    __statusFuzhou?: number

    /**
       状态（攻击减少）
        undefined
    */
    __statusReduceatt?: number

    /**
       状态（攻击增加）
        undefined
    */
    __statusAddatt?: number

    /**
       状态（攻击速度增加）
        undefined
    */
    __statusAddspd?: number

    /**
       特殊NPC（1是，0否）
        undefined
    */
    __teshunpc?: number

    /**
       状态（殺戮）
        undefined
    */
    __statusShaLu?: number

}
declare interface IRespro{

    /**
       臂力
        代表角色力气，主要影响攻击力。
    */
    basestr?: number

    /**
       筋骨
        代表角色体制，主要影响内力和气血。
    */
    basecon?: number

    /**
       身法
        代表角色灵活性，主要影响闪避和防御力。
    */
    basedex?: number

    /**
       悟性
        代表角色智力程度，主要影响功法升级效率。
    */
    baseler?: number

    /**
       灵性
        代表角色学武天赋，主要影响可学习技能数量。
    */
    baseper?: number

    /**
       臂力
        代表角色力气，主要影响攻击力。
    */
    str?: number

    /**
       筋骨
        代表角色体制，主要影响内力和气血。
    */
    con?: number

    /**
       身法
        代表角色灵活性，主要影响闪避和防御力。
    */
    dex?: number

    /**
       悟性
        代表角色智力程度，主要影响功法升级效率。
    */
    ler?: number

    /**
       灵性
        代表角色学武天赋，主要影响可学习技能数量。
    */
    per?: number

    /**
       福源
        代表角色运气，主要影响暴击和掉宝率。
    */
    luck?: number

    /**
       等级
        undefined
    */
    level?: number

    /**
       血量
        气血为0时，角色会陷入昏迷。气血上限为0时，角色会死亡。
    */
    hp?: number

    /**
       血量上限
        undefined
    */
    lhp?: number

    /**
       最大血量
        undefined
    */
    mhp?: number

    /**
       内力
        内力主要为玩家释放技能和攻击时的消耗。
    */
    mp?: number

    /**
       内力上限
        undefined
    */
    lmp?: number

    /**
       最大内力
        undefined
    */
    mmp?: number

    /**
       精神
        精神为玩家练功和读书时主要消耗。
    */
    vigor?: number

    /**
       精神上限
        undefined
    */
    maxvigor?: number

    /**
       年龄
        undefined
    */
    age?: number

    /**
       攻击
        代表角色攻击降低对方气血的能力
    */
    att?: number

    /**
       防御
        代表角色减少所受气血伤害的能力
    */
    def?: number

    /**
       伤害
        代表角色攻击降低对方气血上限的能力
    */
    hurt?: number

    /**
       防护
        代表角色减少所受气血上限伤害的能力
    */
    prot?: number

    /**
       命中
        代表角色攻击命中对方的能力
    */
    hit?: number

    /**
       闪避
        代表角色闪避对方攻击的能力
    */
    agl?: number

    /**
       攻速
        代表角色释放技能后，距下一次技能释放快慢的能力
    */
    spd?: number

    /**
       最大加力值
        undefined
    */
    add?: number

    /**
       当前加力值
        undefined
    */
    addcur?: number

    /**
       加力攻击力
        undefined
    */
    addatt?: number

    /**
       气血最大减伤
        undefined
    */
    sub?: number

    /**
       符咒使用的成功率
        undefined
    */
    fzrate?: number

    /**
       界面地图&小地图视野范围
        undefined
    */
    field?: number

    /**
       符咒造成的伤害增加X倍
        undefined
    */
    fuzhou?: number

    /**
       状态（隐身）
        undefined
    */
    statusYinShen?: number

    /**
       状态（隐藏npc）
        undefined
    */
    statusHide?: number

    /**
       状态（战斗）
        undefined
    */
    statusFight?: number

    /**
       状态（行走困难）
        undefined
    */
    statusDifficultWalk?: number

    /**
       状态（昏迷）
        undefined
    */
    statusStupor?: number

    /**
       气血上限提升(mhp)
        undefined
    */
    mhpt?: number

    /**
       内力上限提升(mmp)
        undefined
    */
    mmpt?: number

    /**
       房间是否解锁(1锁定，进不去)
        undefined
    */
    cantIn?: number

    /**
       状态（晕眩）
        undefined
    */
    statusVertigo?: number

    /**
       状态（无欲无求）
        undefined
    */
    statusWywq?: number

    /**
       状态（流血）
        undefined
    */
    statusBlood?: number

    /**
       状态（虚弱）
        undefined
    */
    statusWeak?: number

    /**
       状态（致盲）
        undefined
    */
    statusBlind?: number

    /**
       状态（臂力增加）
        undefined
    */
    statusAddstr?: number

    /**
       状态（筋骨增加）
        undefined
    */
    statusAddcon?: number

    /**
       状态（身法增加）
        undefined
    */
    statusAdddex?: number

    /**
       状态（持续回复内力）
        undefined
    */
    statusAddMp?: number

    /**
       状态（防御减少）
        undefined
    */
    statusReducedef?: number

    /**
       状态（防御增加）
        undefined
    */
    statusAdddef?: number

    /**
       状态（符咒额外使用成功率）
        undefined
    */
    statusFuzhou?: number

    /**
       状态（攻击减少）
        undefined
    */
    statusReduceatt?: number

    /**
       状态（攻击增加）
        undefined
    */
    statusAddatt?: number

    /**
       状态（攻击速度增加）
        undefined
    */
    statusAddspd?: number

    /**
       特殊NPC（1是，0否）
        undefined
    */
    teshunpc?: number

    /**
       状态（殺戮）
        undefined
    */
    statusShaLu?: number

}
declare interface IClientData{
    pro?: IRespro
}
declare interface __IResskill_id extends __IRespro{

    /**
       技能id
        undefined
    */
    __id?: string

    /**
       技能等级
        undefined
    */
    __level?: number

    /**
       技能经验
        undefined
    */
    __exp?: number

    /**
       该级的最大经验
        undefined
    */
    __maxExp?: number

    /**
       是否装备
        undefined
    */
    __equip?: number

    /**
       技能效果
        undefined
    */
    __effect?: number

}
declare interface IResskill_id extends IRespro{

    /**
       技能id
        undefined
    */
    id?: string

    /**
       技能等级
        undefined
    */
    level?: number

    /**
       技能经验
        undefined
    */
    exp?: number

    /**
       该级的最大经验
        undefined
    */
    maxExp?: number

    /**
       是否装备
        undefined
    */
    equip?: number

    /**
       技能效果
        undefined
    */
    effect?: number

}
declare interface __IResitem extends __IRespro{

    /**
       快捷道具列表
        undefined
    */
    __quickSlot?: number[]

    /**
       道具列表
        undefined
    */
    __runtimes?: {[key:string]:IResitem_runtimes}

    /**
       背包列表
        undefined
    */
    __bag?: {[key:string]:IResitem_bag}

}
declare interface IResitem extends IRespro{

    /**
       快捷道具列表
        undefined
    */
    quickSlot?: number[]

    /**
       道具列表
        undefined
    */
    runtimes?: {[key:string]:IResitem_runtimes}

    /**
       背包列表
        undefined
    */
    bag?: {[key:string]:IResitem_bag}

}
declare interface IClientData{
    item?: IResitem
}
declare interface __IResshangcheng extends __IRespro{

    /**
       商城情况
        undefined
    */
    __actives?: {[key:string]:IResshangcheng_actives}

}
declare interface IResshangcheng extends IRespro{

    /**
       商城情况
        undefined
    */
    actives?: {[key:string]:IResshangcheng_actives}

}
declare interface IClientData{
    shangcheng?: IResshangcheng
}
declare interface __IResautomaticSkill extends __IRespro{

    /**
       自动释放技能列表
        undefined
    */
    __runtimes?: {[key:string]:IResautomaticSkill_runtimes}

    /**
       当前使用的技能列表
        undefined
    */
    __nowId?: number

}
declare interface IResautomaticSkill extends IRespro{

    /**
       自动释放技能列表
        undefined
    */
    runtimes?: {[key:string]:IResautomaticSkill_runtimes}

    /**
       当前使用的技能列表
        undefined
    */
    nowId?: number

}
declare interface IClientData{
    automaticSkill?: IResautomaticSkill
}
declare interface __IRessetting extends __IRespro{

    /**
       自动释放技能开关
        undefined
    */
    __autoSkill?: number

    /**
       下一次私聊时间
        undefined
    */
    __privateNextTime?: number

    /**
       下一次房间聊天时间
        undefined
    */
    __roomNextTime?: number

    /**
       下一次世界聊天时间
        undefined
    */
    __worldNextTime?: number

    /**
       聊天频道(0系统 1世界 2房间 3私聊)
        undefined
    */
    __channel?: number

    /**
       音效音量
        undefined
    */
    __yinxiao?: number

    /**
       bgm音量
        undefined
    */
    __bgm?: number

    /**
       防沉迷
        undefined
    */
    __fangchenmi?: number

}
declare interface IRessetting extends IRespro{

    /**
       自动释放技能开关
        undefined
    */
    autoSkill?: number

    /**
       下一次私聊时间
        undefined
    */
    privateNextTime?: number

    /**
       下一次房间聊天时间
        undefined
    */
    roomNextTime?: number

    /**
       下一次世界聊天时间
        undefined
    */
    worldNextTime?: number

    /**
       聊天频道(0系统 1世界 2房间 3私聊)
        undefined
    */
    channel?: number

    /**
       音效音量
        undefined
    */
    yinxiao?: number

    /**
       bgm音量
        undefined
    */
    bgm?: number

    /**
       防沉迷
        undefined
    */
    fangchenmi?: number

}
declare interface IClientData{
    setting?: IRessetting
}
declare interface __IResreward_group extends __IRespro{

    /**
       undefined
        undefined
    */
    __group?: number

    /**
       undefined
        undefined
    */
    __index?: number

    /**
       undefined
        undefined
    */
    __active?: number

}
declare interface IResreward_group extends IRespro{

    /**
       undefined
        undefined
    */
    group?: number

    /**
       undefined
        undefined
    */
    index?: number

    /**
       undefined
        undefined
    */
    active?: number

}
declare interface __IResmap extends __IRespro{

    /**
       自宅guid
        undefined
    */
    __guid?: number

    /**
       自宅id
        undefined
    */
    __id?: string

}
declare interface IResmap extends IRespro{

    /**
       自宅guid
        undefined
    */
    guid?: number

    /**
       自宅id
        undefined
    */
    id?: string

}
declare interface IClientData{
    map?: IResmap
}
declare interface __IRestask_runtimes extends __IRespro{

    /**
       任务id
        undefined
    */
    __id?: number

    /**
       任务guid
        undefined
    */
    __guid?: number

    /**
       任务状态
        undefined
    */
    __active?: number

}
declare interface IRestask_runtimes extends IRespro{

    /**
       任务id
        undefined
    */
    id?: number

    /**
       任务guid
        undefined
    */
    guid?: number

    /**
       任务状态
        undefined
    */
    active?: number

}
declare interface __IResres extends __IRespro{

    /**
       玩家所在地图tag
        undefined
    */
    __ownMapTag?: string

    /**
       玩家所在房间id
        undefined
    */
    __ownRoomId?: number

    /**
       总游戏时长
        undefined
    */
    __time?: number

    /**
       总逃脱次数
        undefined
    */
    __escape?: number

    /**
       打晕总人数
        undefined
    */
    __dazzle?: number

    /**
       击杀总人数
        undefined
    */
    __killnumber?: number

    /**
       移动总格数
        undefined
    */
    __move?: number

    /**
       拾取物品数
        undefined
    */
    __artnumber?: number

    /**
       在线时长
        undefined
    */
    __onlineTime?: number

    /**
       当日在线时长
        undefined
    */
    __onlineTimeDay?: number

    /**
       距上次离线时长(分钟)
        undefined
    */
    __leaveTime?: number

    /**
       银两
        undefined
    */
    __silver?: number

    /**
       元宝
        undefined
    */
    __gold?: number

    /**
       活跃度
        undefined
    */
    __huoyue?: number

    /**
       新手引导完成
        0为不完成|1为完成
    */
    __xsYindao?: number

    /**
       后山副本离开条件
        0为不可离开|1为可离开（主要用于交互按钮显示）
    */
    __exitHoushan?: number

    /**
       门派任务进度
        标识门派任务开启条件|从0开始累加
    */
    __mpRenwu?: number

    /**
       双倍经验标记
        undefined
    */
    __doubleExp?: number

    /**
       双倍经验结束时间
        undefined
    */
    __doubleExpEndTime?: number

    /**
       双倍潜能标记
        undefined
    */
    __doublePotential?: number

    /**
       双倍潜能结束时间
        undefined
    */
    __doublePotentialEndTime?: number

}
declare interface IResres extends IRespro{

    /**
       玩家所在地图tag
        undefined
    */
    ownMapTag?: string

    /**
       玩家所在房间id
        undefined
    */
    ownRoomId?: number

    /**
       总游戏时长
        undefined
    */
    time?: number

    /**
       总逃脱次数
        undefined
    */
    escape?: number

    /**
       打晕总人数
        undefined
    */
    dazzle?: number

    /**
       击杀总人数
        undefined
    */
    killnumber?: number

    /**
       移动总格数
        undefined
    */
    move?: number

    /**
       拾取物品数
        undefined
    */
    artnumber?: number

    /**
       在线时长
        undefined
    */
    onlineTime?: number

    /**
       当日在线时长
        undefined
    */
    onlineTimeDay?: number

    /**
       距上次离线时长(分钟)
        undefined
    */
    leaveTime?: number

    /**
       银两
        undefined
    */
    silver?: number

    /**
       元宝
        undefined
    */
    gold?: number

    /**
       活跃度
        undefined
    */
    huoyue?: number

    /**
       新手引导完成
        0为不完成|1为完成
    */
    xsYindao?: number

    /**
       后山副本离开条件
        0为不可离开|1为可离开（主要用于交互按钮显示）
    */
    exitHoushan?: number

    /**
       门派任务进度
        标识门派任务开启条件|从0开始累加
    */
    mpRenwu?: number

    /**
       双倍经验标记
        undefined
    */
    doubleExp?: number

    /**
       双倍经验结束时间
        undefined
    */
    doubleExpEndTime?: number

    /**
       双倍潜能标记
        undefined
    */
    doublePotential?: number

    /**
       双倍潜能结束时间
        undefined
    */
    doublePotentialEndTime?: number

}
declare interface IClientData{
    res?: IResres
}
declare interface __IResfuzhou_runtimes extends __IRespro{

    /**
       elementId
        undefined
    */
    __elementId?: number

    /**
       道场做符咒位置唯一id
        undefined
    */
    __guid?: number

    /**
       是否在做符咒
        undefined
    */
    __making?: number

    /**
       符咒id
        undefined
    */
    __fuzhouid?: number

    /**
       收货时间
        undefined
    */
    __harvestTime?: number

    /**
       制作数量
        undefined
    */
    __times?: number

}
declare interface IResfuzhou_runtimes extends IRespro{

    /**
       elementId
        undefined
    */
    elementId?: number

    /**
       道场做符咒位置唯一id
        undefined
    */
    guid?: number

    /**
       是否在做符咒
        undefined
    */
    making?: number

    /**
       符咒id
        undefined
    */
    fuzhouid?: number

    /**
       收货时间
        undefined
    */
    harvestTime?: number

    /**
       制作数量
        undefined
    */
    times?: number

}
declare interface __IResfield extends __IRespro{

    /**
       农田列表
        undefined
    */
    __runtimes?: {[key:string]:IResfield_runtimes}

}
declare interface IResfield extends IRespro{

    /**
       农田列表
        undefined
    */
    runtimes?: {[key:string]:IResfield_runtimes}

}
declare interface IClientData{
    field?: IResfield
}
declare interface __IResreward extends __IRespro{

    /**
       undefined
        undefined
    */
    __group?: {[key:string]:IResreward_group}

}
declare interface IResreward extends IRespro{

    /**
       undefined
        undefined
    */
    group?: {[key:string]:IResreward_group}

}
declare interface IClientData{
    reward?: IResreward
}
declare interface __IResroom extends __IRespro{

    /**
       房间id
        undefined
    */
    __id?: {[key:string]:IResroom_id}

}
declare interface IResroom extends IRespro{

    /**
       房间id
        undefined
    */
    id?: {[key:string]:IResroom_id}

}
declare interface IClientData{
    room?: IResroom
}
declare interface __IReselement extends __IRespro{

    /**
       交谈
        undefined
    */
    __talk?: number

    /**
       切磋
        undefined
    */
    __fight?: number

    /**
       杀死
        undefined
    */
    __kill?: number

    /**
       拜师
        undefined
    */
    __baishi?: number

    /**
       请教
        undefined
    */
    __consult?: number

    /**
       交易
        undefined
    */
    __element?: number

    /**
       ç¡è§
        undefined
    */
    __sleep?: number

    /**
       ç»å
        undefined
    */
    __practice?: number

    /**
       ç§æ¤
        undefined
    */
    __plant?: number

    /**
       制作食物
        undefined
    */
    __cook?: number

    /**
       NPC复活时间（S）
        undefined
    */
    __revive?: number

    /**
       进度条当前进度
        undefined
    */
    __progress?: number

    /**
       进度条最大进度
        undefined
    */
    __maxprogress?: number

}
declare interface IReselement extends IRespro{

    /**
       交谈
        undefined
    */
    talk?: number

    /**
       切磋
        undefined
    */
    fight?: number

    /**
       杀死
        undefined
    */
    kill?: number

    /**
       拜师
        undefined
    */
    baishi?: number

    /**
       请教
        undefined
    */
    consult?: number

    /**
       交易
        undefined
    */
    element?: number

    /**
       ç¡è§
        undefined
    */
    sleep?: number

    /**
       ç»å
        undefined
    */
    practice?: number

    /**
       ç§æ¤
        undefined
    */
    plant?: number

    /**
       制作食物
        undefined
    */
    cook?: number

    /**
       NPC复活时间（S）
        undefined
    */
    revive?: number

    /**
       进度条当前进度
        undefined
    */
    progress?: number

    /**
       进度条最大进度
        undefined
    */
    maxprogress?: number

}
declare interface IClientData{
    element?: IReselement
}
declare interface __IResskill extends __IRespro{

    /**
       当前训练的技能
        undefined
    */
    __trainSkillId?: string

    /**
       当前读书的书guid
        undefined
    */
    __trainBookGuid?: number

    /**
       当前装备的内功技能
        undefined
    */
    __nowNeiGongSkillId?: string

    /**
       当前装备的轻功技能
        undefined
    */
    __nowQingGongSkillId?: string

    /**
       当前装备的武器技能
        undefined
    */
    __nowWuQiSkillId?: string

    /**
       技能列表
        undefined
    */
    __id?: {[key:string]:IResskill_id}

    /**
       已学习的高级技能数
        undefined
    */
    __learnedSkillNum?: number

}
declare interface IResskill extends IRespro{

    /**
       当前训练的技能
        undefined
    */
    trainSkillId?: string

    /**
       当前读书的书guid
        undefined
    */
    trainBookGuid?: number

    /**
       当前装备的内功技能
        undefined
    */
    nowNeiGongSkillId?: string

    /**
       当前装备的轻功技能
        undefined
    */
    nowQingGongSkillId?: string

    /**
       当前装备的武器技能
        undefined
    */
    nowWuQiSkillId?: string

    /**
       技能列表
        undefined
    */
    id?: {[key:string]:IResskill_id}

    /**
       已学习的高级技能数
        undefined
    */
    learnedSkillNum?: number

}
declare interface IClientData{
    skill?: IResskill
}
declare interface __IResitem_runtimes extends __IRespro{

    /**
       道具id
        undefined
    */
    __id?: number

    /**
       道具唯一id
        undefined
    */
    __guid?: number

    /**
       顶点x轴位置
        undefined
    */
    __x?: number

    /**
       顶点y轴位置
        undefined
    */
    __y?: number

    /**
       道具类型
        undefined
    */
    __type?: number

    /**
       堆叠数量
        undefined
    */
    __count?: number

    /**
       所在背包
        undefined
    */
    __location?: number

    /**
       所在位置
        undefined
    */
    __slot?: number

    /**
       扩展数据
        undefined
    */
    __extraData?: IItemExtraData

}
declare interface IResitem_runtimes extends IRespro{

    /**
       道具id
        undefined
    */
    id?: number

    /**
       道具唯一id
        undefined
    */
    guid?: number

    /**
       顶点x轴位置
        undefined
    */
    x?: number

    /**
       顶点y轴位置
        undefined
    */
    y?: number

    /**
       道具类型
        undefined
    */
    type?: number

    /**
       堆叠数量
        undefined
    */
    count?: number

    /**
       所在背包
        undefined
    */
    location?: number

    /**
       所在位置
        undefined
    */
    slot?: number

    /**
       扩展数据
        undefined
    */
    extraData?: IItemExtraData

}
declare interface __IRescd_id extends __IRespro{

    /**
       cd名字
        undefined
    */
    __id?: string

    /**
       cd结束时间
        undefined
    */
    __nextTime?: number

}
declare interface IRescd_id extends IRespro{

    /**
       cd名字
        undefined
    */
    id?: string

    /**
       cd结束时间
        undefined
    */
    nextTime?: number

}
declare interface __IResbuff extends __IRespro{

    /**
       undefined
        undefined
    */
    __runtimes?: {[key:string]:IResbuff_runtimes}

}
declare interface IResbuff extends IRespro{

    /**
       undefined
        undefined
    */
    runtimes?: {[key:string]:IResbuff_runtimes}

}
declare interface IClientData{
    buff?: IResbuff
}
declare interface __IRestask extends __IRespro{

    /**
       任务激活
        undefined
    */
    __runtimes?: {[key:string]:IRestask_runtimes}

    /**
       任务条件
        undefined
    */
    __key?: {[key:string]:IRestask_key}

    /**
       追踪任务Guid
        undefined
    */
    __trackGuid?: number

    /**
       当日悬赏任务完成次数
        undefined
    */
    __xuanshangTimes?: number

    /**
       下次悬赏刷新时间
        undefined
    */
    __xuanshangFreshTime?: number

}
declare interface IRestask extends IRespro{

    /**
       任务激活
        undefined
    */
    runtimes?: {[key:string]:IRestask_runtimes}

    /**
       任务条件
        undefined
    */
    key?: {[key:string]:IRestask_key}

    /**
       追踪任务Guid
        undefined
    */
    trackGuid?: number

    /**
       当日悬赏任务完成次数
        undefined
    */
    xuanshangTimes?: number

    /**
       下次悬赏刷新时间
        undefined
    */
    xuanshangFreshTime?: number

}
declare interface IClientData{
    task?: IRestask
}
declare interface __IRescook extends __IRespro{

    /**
       锅子列表
        undefined
    */
    __runtimes?: {[key:string]:IRescook_runtimes}

}
declare interface IRescook extends IRespro{

    /**
       锅子列表
        undefined
    */
    runtimes?: {[key:string]:IRescook_runtimes}

}
declare interface IClientData{
    cook?: IRescook
}
declare interface __IRestask_key extends __IRespro{

    /**
       键值
        undefined
    */
    __key?: string

    /**
       数量
        undefined
    */
    __value?: number

}
declare interface IRestask_key extends IRespro{

    /**
       键值
        undefined
    */
    key?: string

    /**
       数量
        undefined
    */
    value?: number

}
declare interface __IRescd extends __IRespro{

    /**
       普通攻击CD
        undefined
    */
    __attackCD?: number

    /**
       技能公共CD
        undefined
    */
    __gonggongCD?: number

    /**
       药物cd1
        undefined
    */
    __yaoWu1?: number

    /**
       药物cd2
        undefined
    */
    __yaoWu2?: number

    /**
       战斗模式cd
        undefined
    */
    __fightModeCD?: number

    /**
       疗伤cd
        undefined
    */
    __liaoShangCD?: number

    /**
       逃跑cd
        undefined
    */
    __taoPaoCD?: number

    /**
       cd的id用于动态生成cd
        undefined
    */
    __id?: {[key:string]:IRescd_id}

}
declare interface IRescd extends IRespro{

    /**
       普通攻击CD
        undefined
    */
    attackCD?: number

    /**
       技能公共CD
        undefined
    */
    gonggongCD?: number

    /**
       药物cd1
        undefined
    */
    yaoWu1?: number

    /**
       药物cd2
        undefined
    */
    yaoWu2?: number

    /**
       战斗模式cd
        undefined
    */
    fightModeCD?: number

    /**
       疗伤cd
        undefined
    */
    liaoShangCD?: number

    /**
       逃跑cd
        undefined
    */
    taoPaoCD?: number

    /**
       cd的id用于动态生成cd
        undefined
    */
    id?: {[key:string]:IRescd_id}

}
declare interface IClientData{
    cd?: IRescd
}
declare interface __IResitem_bag extends __IRespro{

    /**
       undefined
        undefined
    */
    __level?: number

    /**
       undefined
        undefined
    */
    __location?: number

    /**
       undefined
        undefined
    */
    __ceil?: number

}
declare interface IResitem_bag extends IRespro{

    /**
       undefined
        undefined
    */
    level?: number

    /**
       undefined
        undefined
    */
    location?: number

    /**
       undefined
        undefined
    */
    ceil?: number

}
declare interface __IResautomaticSkill_runtimes extends __IRespro{

    /**
       技能列表序号
        undefined
    */
    __id?: number

    /**
       技能1
        undefined
    */
    __jineng1?: string

    /**
       技能2
        undefined
    */
    __jineng2?: string

    /**
       技能3
        undefined
    */
    __jineng3?: string

    /**
       技能4
        undefined
    */
    __jineng4?: string

    /**
       技能5
        undefined
    */
    __jineng5?: string

    /**
       技能6
        undefined
    */
    __jineng6?: string

}
declare interface IResautomaticSkill_runtimes extends IRespro{

    /**
       技能列表序号
        undefined
    */
    id?: number

    /**
       技能1
        undefined
    */
    jineng1?: string

    /**
       技能2
        undefined
    */
    jineng2?: string

    /**
       技能3
        undefined
    */
    jineng3?: string

    /**
       技能4
        undefined
    */
    jineng4?: string

    /**
       技能5
        undefined
    */
    jineng5?: string

    /**
       技能6
        undefined
    */
    jineng6?: string

}
declare interface __IResfield_runtimes extends __IRespro{

    /**
       elementId
        undefined
    */
    __elementId?: number

    /**
       农田唯一id
        undefined
    */
    __guid?: number

    /**
       是否在种植
        undefined
    */
    __planting?: number

    /**
       种子id
        undefined
    */
    __seedid?: number

    /**
       收货时间
        undefined
    */
    __harvestTime?: number

    /**
       下次照料时间
        undefined
    */
    __nextCareTime?: number

}
declare interface IResfield_runtimes extends IRespro{

    /**
       elementId
        undefined
    */
    elementId?: number

    /**
       农田唯一id
        undefined
    */
    guid?: number

    /**
       是否在种植
        undefined
    */
    planting?: number

    /**
       种子id
        undefined
    */
    seedid?: number

    /**
       收货时间
        undefined
    */
    harvestTime?: number

    /**
       下次照料时间
        undefined
    */
    nextCareTime?: number

}
declare interface __IResshangcheng_actives extends __IRespro{

    /**
       编号
        undefined
    */
    __id?: number

    /**
       剩余数量
        undefined
    */
    __count?: number

}
declare interface IResshangcheng_actives extends IRespro{

    /**
       编号
        undefined
    */
    id?: number

    /**
       剩余数量
        undefined
    */
    count?: number

}
declare interface __IResbuff_runtimes extends __IRespro{

    /**
       buffid
        undefined
    */
    __id?: number

    /**
       buffguid
        undefined
    */
    __guid?: number

    /**
       执行次数
        undefined
    */
    __times?: number

    /**
       过期时间
        undefined
    */
    __duration?: number

    /**
       倍率
        undefined
    */
    __count?: number

}
declare interface IResbuff_runtimes extends IRespro{

    /**
       buffid
        undefined
    */
    id?: number

    /**
       buffguid
        undefined
    */
    guid?: number

    /**
       执行次数
        undefined
    */
    times?: number

    /**
       过期时间
        undefined
    */
    duration?: number

    /**
       倍率
        undefined
    */
    count?: number

}
declare interface __IRescook_runtimes extends __IRespro{

    /**
       elementId
        undefined
    */
    __elementId?: number

    /**
       锅子唯一id
        undefined
    */
    __guid?: number

    /**
       是否在做菜
        undefined
    */
    __cooking?: number

    /**
       菜id
        undefined
    */
    __foodid?: number

    /**
       收货时间
        undefined
    */
    __harvestTime?: number

    /**
       制作数量
        undefined
    */
    __times?: number

}
declare interface IRescook_runtimes extends IRespro{

    /**
       elementId
        undefined
    */
    elementId?: number

    /**
       锅子唯一id
        undefined
    */
    guid?: number

    /**
       是否在做菜
        undefined
    */
    cooking?: number

    /**
       菜id
        undefined
    */
    foodid?: number

    /**
       收货时间
        undefined
    */
    harvestTime?: number

    /**
       制作数量
        undefined
    */
    times?: number

}
declare interface __IResroom_id extends __IRespro{

    /**
       名字
        undefined
    */
    __name?: string

    /**
       等级
        undefined
    */
    __level?: number

    /**
       状态
        undefined
    */
    __status?: number

    /**
       升级时间
        undefined
    */
    __time?: number

    /**
       房间id
        undefined
    */
    __id?: number

    /**
       每分钟床增加精神
        undefined
    */
    __addVigor?: number

    /**
       每分钟练功加经验
        undefined
    */
    __addExp?: number

    /**
       每分钟练功花费饥饿
        undefined
    */
    __addHunger?: number

}
declare interface IResroom_id extends IRespro{

    /**
       名字
        undefined
    */
    name?: string

    /**
       等级
        undefined
    */
    level?: number

    /**
       状态
        undefined
    */
    status?: number

    /**
       升级时间
        undefined
    */
    time?: number

    /**
       房间id
        undefined
    */
    id?: number

    /**
       每分钟床增加精神
        undefined
    */
    addVigor?: number

    /**
       每分钟练功加经验
        undefined
    */
    addExp?: number

    /**
       每分钟练功花费饥饿
        undefined
    */
    addHunger?: number

}

declare const enum ResConst{
	FUZHOU = "fuzhou",
	HERO = "hero",
	SHOP = "shop",
	SHOP_ID = "shop_id",
	MENPAI = "menpai",
	PRO = "pro",
	SKILL_ID = "skill_id",
	ITEM = "item",
	SHANGCHENG = "shangcheng",
	AUTOMATICSKILL = "automaticSkill",
	SETTING = "setting",
	REWARD_GROUP = "reward_group",
	MAP = "map",
	TASK_RUNTIMES = "task_runtimes",
	RES = "res",
	FUZHOU_RUNTIMES = "fuzhou_runtimes",
	FIELD = "field",
	REWARD = "reward",
	ROOM = "room",
	ELEMENT = "element",
	SKILL = "skill",
	ITEM_RUNTIMES = "item_runtimes",
	CD_ID = "cd_id",
	BUFF = "buff",
	TASK = "task",
	COOK = "cook",
	TASK_KEY = "task_key",
	CD = "cd",
	ITEM_BAG = "item_bag",
	AUTOMATICSKILL_RUNTIMES = "automaticSkill_runtimes",
	FIELD_RUNTIMES = "field_runtimes",
	SHANGCHENG_ACTIVES = "shangcheng_actives",
	BUFF_RUNTIMES = "buff_runtimes",
	COOK_RUNTIMES = "cook_runtimes",
	ROOM_ID = "room_id",
}

declare const enum IResfuzhouConst{
	RUNTIMES="runtimes",
}

declare const enum IResfuzhou_runtimesConst{
	ELEMENTID="elementId",
	GUID="guid",
	MAKING="making",
	FUZHOUID="fuzhouid",
	HARVESTTIME="harvestTime",
	TIMES="times",
}

declare const enum IResheroConst{
	GUID="guid",
	TYPE="type",
	FACE_BG="face_bg",
	FACE_TOU="face_tou",
	FACE_FA="face_fa",
	FACE_MEI="face_mei",
	FACE_YAN="face_yan",
	FACE_HU="face_hu",
	NAME="name",
	TITLE="title",
	EXP="exp",
	HUNGER="hunger",
	MAXHUNGER="maxhunger",
	SEX="sex",
	POTENTIAL="potential",
	PROS="pros",
	MAP="map",
	MAPNAME="mapName",
	ROOM="room",
	ELEMENTID="elementId",
	ITEMS="items",
	BATTLEID="battleId",
	STATUSHEALTH="statusHealth",
	STATUSHURT="statusHurt",
	WYWQBEGINTIME="WywqBeginTime",
	BLOODBEGINTIME="BloodBeginTime",
	WEAKBEGINTIME="WeakBeginTime",
	BLINDBEGINTIME="BlindBeginTime",
	STATUSDIE="statusDie",
	STATUSHUNGER="statusHunger",
	STATUSDOING="statusDoing",
	STATUSBUSY="statusBusy",
	FIGHTMODE="fightMode",
	FIGHTSTATUS="fightStatus",
	FIGHTSTATUSENDTIME="fightStatusEndTime",
	MAPSTATUS="mapstatus",
	TIMES="times",
	ZHUANGTAI="zhuangtai",
	BOOLD="boOld",
	HASBEENALLOWEDINROOMS="hasBeenAllowedInRooms",
	CURMAPADDTIME="curMapAddTime",
}

declare const enum IResshopConst{
	ID="id",
}

declare const enum IResshop_idConst{
	ID="id",
	COUNT="count",
	DIS="dis",
}

declare const enum IResmenpaiConst{
	GUILD="guild",
	MASTER="master",
	DEVOTE="devote",
	BRANCH="branch",
	DIWEI="diwei",
	WELFARE="welfare",
}

declare const enum IResproConst{
	BASESTR="basestr",
	BASECON="basecon",
	BASEDEX="basedex",
	BASELER="baseler",
	BASEPER="baseper",
	STR="str",
	CON="con",
	DEX="dex",
	LER="ler",
	PER="per",
	LUCK="luck",
	LEVEL="level",
	HP="hp",
	LHP="lhp",
	MHP="mhp",
	MP="mp",
	LMP="lmp",
	MMP="mmp",
	VIGOR="vigor",
	MAXVIGOR="maxvigor",
	AGE="age",
	ATT="att",
	DEF="def",
	HURT="hurt",
	PROT="prot",
	HIT="hit",
	AGL="agl",
	SPD="spd",
	ADD="add",
	ADDCUR="addcur",
	ADDATT="addatt",
	SUB="sub",
	FZRATE="fzrate",
	FIELD="field",
	FUZHOU="fuzhou",
	STATUSYINSHEN="statusYinShen",
	STATUSHIDE="statusHide",
	STATUSFIGHT="statusFight",
	STATUSDIFFICULTWALK="statusDifficultWalk",
	STATUSSTUPOR="statusStupor",
	MHPT="mhpt",
	MMPT="mmpt",
	CANTIN="cantIn",
	STATUSVERTIGO="statusVertigo",
	STATUSWYWQ="statusWywq",
	STATUSBLOOD="statusBlood",
	STATUSWEAK="statusWeak",
	STATUSBLIND="statusBlind",
	STATUSADDSTR="statusAddstr",
	STATUSADDCON="statusAddcon",
	STATUSADDDEX="statusAdddex",
	STATUSADDMP="statusAddMp",
	STATUSREDUCEDEF="statusReducedef",
	STATUSADDDEF="statusAdddef",
	STATUSFUZHOU="statusFuzhou",
	STATUSREDUCEATT="statusReduceatt",
	STATUSADDATT="statusAddatt",
	STATUSADDSPD="statusAddspd",
	TESHUNPC="teshunpc",
	STATUSSHALU="statusShaLu",
}

declare const enum IResskill_idConst{
	ID="id",
	LEVEL="level",
	EXP="exp",
	MAXEXP="maxExp",
	EQUIP="equip",
	EFFECT="effect",
}

declare const enum IResskillConst{
	TRAINSKILLID="trainSkillId",
	TRAINBOOKGUID="trainBookGuid",
	NOWNEIGONGSKILLID="nowNeiGongSkillId",
	NOWQINGGONGSKILLID="nowQingGongSkillId",
	NOWWUQISKILLID="nowWuQiSkillId",
	ID="id",
	LEARNEDSKILLNUM="learnedSkillNum",
}

declare const enum IResitemConst{
	QUICKSLOT="quickSlot",
	RUNTIMES="runtimes",
	BAG="bag",
}

declare const enum IResitem_runtimesConst{
	ID="id",
	GUID="guid",
	X="x",
	Y="y",
	TYPE="type",
	COUNT="count",
	LOCATION="location",
	SLOT="slot",
	EXTRADATA="extraData",
}

declare const enum IResitem_bagConst{
	LEVEL="level",
	LOCATION="location",
	CEIL="ceil",
}

declare const enum IResshangchengConst{
	ACTIVES="actives",
}

declare const enum IResshangcheng_activesConst{
	ID="id",
	COUNT="count",
}

declare const enum IResautomaticSkillConst{
	RUNTIMES="runtimes",
	NOWID="nowId",
}

declare const enum IResautomaticSkill_runtimesConst{
	ID="id",
	JINENG1="jineng1",
	JINENG2="jineng2",
	JINENG3="jineng3",
	JINENG4="jineng4",
	JINENG5="jineng5",
	JINENG6="jineng6",
}

declare const enum IRessettingConst{
	AUTOSKILL="autoSkill",
	PRIVATENEXTTIME="privateNextTime",
	ROOMNEXTTIME="roomNextTime",
	WORLDNEXTTIME="worldNextTime",
	CHANNEL="channel",
	YINXIAO="yinxiao",
	BGM="bgm",
	FANGCHENMI="fangchenmi",
}

declare const enum IResreward_groupConst{
	GROUP="group",
	INDEX="index",
	ACTIVE="active",
}

declare const enum IResrewardConst{
	GROUP="group",
}

declare const enum IResmapConst{
	GUID="guid",
	ID="id",
}

declare const enum IRestask_runtimesConst{
	ID="id",
	GUID="guid",
	ACTIVE="active",
}

declare const enum IRestaskConst{
	RUNTIMES="runtimes",
	KEY="key",
	TRACKGUID="trackGuid",
	XUANSHANGTIMES="xuanshangTimes",
	XUANSHANGFRESHTIME="xuanshangFreshTime",
}

declare const enum IRestask_keyConst{
	KEY="key",
	VALUE="value",
}

declare const enum IResresConst{
	OWNMAPTAG="ownMapTag",
	OWNROOMID="ownRoomId",
	TIME="time",
	ESCAPE="escape",
	DAZZLE="dazzle",
	KILLNUMBER="killnumber",
	MOVE="move",
	ARTNUMBER="artnumber",
	ONLINETIME="onlineTime",
	ONLINETIMEDAY="onlineTimeDay",
	LEAVETIME="leaveTime",
	SILVER="silver",
	GOLD="gold",
	HUOYUE="huoyue",
	XSYINDAO="xsYindao",
	EXITHOUSHAN="exitHoushan",
	MPRENWU="mpRenwu",
	DOUBLEEXP="doubleExp",
	DOUBLEEXPENDTIME="doubleExpEndTime",
	DOUBLEPOTENTIAL="doublePotential",
	DOUBLEPOTENTIALENDTIME="doublePotentialEndTime",
}

declare const enum IResfieldConst{
	RUNTIMES="runtimes",
}

declare const enum IResfield_runtimesConst{
	ELEMENTID="elementId",
	GUID="guid",
	PLANTING="planting",
	SEEDID="seedid",
	HARVESTTIME="harvestTime",
	NEXTCARETIME="nextCareTime",
}

declare const enum IResroomConst{
	ID="id",
}

declare const enum IResroom_idConst{
	NAME="name",
	LEVEL="level",
	STATUS="status",
	TIME="time",
	ID="id",
	ADDVIGOR="addVigor",
	ADDEXP="addExp",
	ADDHUNGER="addHunger",
}

declare const enum IReselementConst{
	TALK="talk",
	FIGHT="fight",
	KILL="kill",
	BAISHI="baishi",
	CONSULT="consult",
	ELEMENT="element",
	SLEEP="sleep",
	PRACTICE="practice",
	PLANT="plant",
	COOK="cook",
	REVIVE="revive",
	PROGRESS="progress",
	MAXPROGRESS="maxprogress",
}

declare const enum IRescd_idConst{
	ID="id",
	NEXTTIME="nextTime",
}

declare const enum IRescdConst{
	ATTACKCD="attackCD",
	GONGGONGCD="gonggongCD",
	YAOWU1="yaoWu1",
	YAOWU2="yaoWu2",
	FIGHTMODECD="fightModeCD",
	LIAOSHANGCD="liaoShangCD",
	TAOPAOCD="taoPaoCD",
	ID="id",
}

declare const enum IResbuffConst{
	RUNTIMES="runtimes",
}

declare const enum IResbuff_runtimesConst{
	ID="id",
	GUID="guid",
	TIMES="times",
	DURATION="duration",
	COUNT="count",
}

declare const enum IRescookConst{
	RUNTIMES="runtimes",
}

declare const enum IRescook_runtimesConst{
	ELEMENTID="elementId",
	GUID="guid",
	COOKING="cooking",
	FOODID="foodid",
	HARVESTTIME="harvestTime",
	TIMES="times",
}
