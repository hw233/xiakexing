declare module rf{
	/**
	* //补充注释
	* from element.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		element:{[key:string]:IElement}
	}

	interface IElement{
		/** ID */
		id:number;
		
		/** 名字 */
		name:string;
		
		/** 内容 */
		desc:string;
		
		/** 元素类型 */
		type:number;
		
		/** 难度和保护者 */
		fiduciary:number[];
		
		/** 元素角标 */
		flag:string[];
		
		/** 元素背景 */
		bg:number;
		
		/** 元素字体颜色 */
		ztys:number;
		
		/** 交互类型 */
		action:string;
		
		/** 相位 */
		xiangwei:string;
		
		/** 房间升级中是否能打开 */
		upgrade:number;
		
		/** 属性 */
		attribute:any;
		
		/** 交互ID */
		interactive:{[key:string]:(string | number)};
		
		/** 攻击武器类型 */
		wuqi:number;
		
		/** 攻击欲望 */
		attacking:number;
		
		/** 增加(消耗)精神/分 */
		vigorminute:number;
		
		/** 消耗饱食/分 */
		hungerminute:number;
		
		/** 增加功法经验/分 */
		skillexp:number;
		
		/** 执行条件 */
		condition:IConfigLimit[];
		
		/** 武功列表 */
		skill:{[key:string]:(string | number)};
		
		/** 交易列表 */
		deal:string;
		
		/** 固定掉落 */
		item:IConfigLimit[];
		
		/** 随机掉落 */
		itemeffect:IModule;
		
		/** NPC装备 */
		equip:IConfigLimit[];
		
		/** 杀死奖励 */
		reward:IConfigLimit[];
		
		/** 杀死奖励事件 */
		rewardeffect:IModule;
		
		/** 创建事件 */
		birth:IModule;
		
		/** 是否显示：怪物来到了地名：XX */
		show:number;
		
		/** 死亡事件 */
		die:IModule;
		
		/** 交谈 */
		talk:number[];
		
		/** 菜谱可制作菜的id */
		menuids:number[];
		
		/** 前往 */
		transfer:IModule;
		
		/** 逃离关卡 */
		escape:IModule;
		
		/** 兑换id */
		exchangeIds:number[];
		
		/** 互动 */
		unlocking:number;
		
		/** 打探类型 */
		qingbao:number;
		
		/** 勒索奖励相位（成功|失败） */
		lesuo:string[];
		
		/** 弹窗音效 */
		popupaudio:string[];
		
		/** 可读音效 */
		sound:string[];
		
		/** 打开进度条时间 */
		turnon:number;
		
		/** 挖矿 */
		dig:{[key:string]:(string | number)};
		
		/** 挖矿条件 */
		diglimit:IConfigLimit[];
		
		/** 挖矿消耗 */
		digcost:IConfigLimit[];
		
		/** 挖矿事件 */
		digmodule:IModule;
			
	}


}