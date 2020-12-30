declare module rf{
	/**
	* //补充注释
	* from skill.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		skill:{[key:string]:ISkill}
	}

	interface ISkill{
		/** ID */
		id:string;
		
		/** 名称 */
		name:string;
		
		/** 功法种类 */
		class:number;
		
		/** 类型 */
		type:number[];
		
		/** 稀有度 */
		rare:number;
		
		/** 属性 */
		nature:number;
		
		/** 经验参数 */
		expParameter:number[];
		
		/** 最大等级 */
		maxLevel:number;
		
		/** 使用消耗 */
		use:IConfigLimit[];
		
		/** 激活条件 */
		condition:IConfigLimit[];
		
		/** 练功条件 */
		levelupLimit:IConfigLimit[];
		
		/** 学习条件 */
		study:IConfigLimit[];
		
		/** 学习奖励 */
		reward:IConfigLimit[];
		
		/** 升级属性奖励 */
		rewardpro:any[];
		
		/** 奖励事件 */
		event:IModule;
		
		/** 境界系数 */
		leveldes:number[];
		
		/** 图标资源 */
		icon:string[];
		
		/** 功法效果 */
		effect:string;
		
		/** 功法描述 */
		skilldes:string;
		
		/** 练功图标 */
		liangongIcon:string[];
		
		/** 读书图标 */
		readIcon:string[];
			
	}


}