declare module rf{
	/**
	* //补充注释
	* from item.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		item:{[key:string]:IItem}
	}

	interface IItem{
		/** ID */
		id:number;
		
		/** 名字 */
		name:string;
		
		/** 类型 */
		type:number;
		
		/** 地图任务道具 */
		maptask:number;
		
		/** 等级 */
		level:number;
		
		/** 装备部位 */
		slot:number[];
		
		/** 稀有度 */
		rare:number;
		
		/** 武器类型 */
		weapontype:number;
		
		/** 符咒类型 */
		scene:number;
		
		/** 道具类型（只管前端显示） */
		flag:string;
		
		/** 使用条件 */
		limit:IConfigLimit[];
		
		/** 背包内是否可使用 */
		bag:number;
		
		/** 是否可装备到快捷道具栏 */
		quick:number;
		
		/** 重量 */
		weight:number;
		
		/** 耐久度上限 */
		maxdurability:number;
		
		/** 先天属性 */
		probase:{[key:string]:(string | number)};
		
		/** 战斗属性 */
		pro:{[key:string]:(string | number)};
		
		/** 装备评分 */
		score:number;
		
		/** 使用奖励 */
		reward:IConfigLimit[];
		
		/** 卸下装备奖励 */
		rmreward:IConfigLimit[];
		
		/** 使用特殊效果 */
		module:IModule;
		
		/** 使用动画 */
		anima:string[];
		
		/** 最大堆叠数量 */
		stack:number;
		
		/** 形状 */
		shape:number[];
		
		/** 购买价格 */
		buy:IConfigLimit[];
		
		/** 出售价格 */
		sell:IConfigLimit[];
		
		/** icon */
		icon:string[];
		
		/** 道具效果描述 */
		effect:string;
		
		/** 道具描述 */
		describe:string;
		
		/** 书籍增加基础经验/分钟 */
		bookAddExp:number;
		
		/** 读书增加对应技能的id */
		bookAddSkillId:string;
		
		/** 战斗日志显示 */
		log:string;
			
	}


}