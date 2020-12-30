declare module rf{
	/**
	* //补充注释
	* from jiaohu.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		jiaohu:{[key:string]:IJiaohu}
	}

	interface IJiaohu{
		/** ID */
		id:string;
		
		/** 交谈 */
		talk:IConfigLimit[];
		
		/** 是否可切磋 */
		fight:IConfigLimit[];
		
		/** 是否可杀死 */
		kill:IConfigLimit[];
		
		/** 是否可拜师 */
		master:IConfigLimit[];
		
		/** 是否可请教 */
		teach:IConfigLimit[];
		
		/** 打开 */
		open:IConfigLimit[];
		
		/** 睡觉 */
		sleep:IConfigLimit[];
		
		/** 起床 */
		getup:IConfigLimit[];
		
		/** 练功 */
		practice:IConfigLimit[];
		
		/** 读书 */
		book:IConfigLimit[];
		
		/** 种植 */
		plant:IConfigLimit[];
		
		/** 食物制作 */
		cook:IConfigLimit[];
		
		/** 交易 */
		deal:IConfigLimit[];
		
		/** 制符 */
		amulet:IConfigLimit[];
		
		/** 小游戏 */
		game:IConfigLimit[];
		
		/** 前往 */
		transfer:IConfigLimit[];
		
		/** 逃离关卡 */
		escape:IConfigLimit[];
		
		/** 兑换 */
		exchange:IConfigLimit[];
		
		/** 互动 */
		unlocking:IConfigLimit[];
		
		/** 悬赏 */
		xuanshang:IConfigLimit[];
		
		/** 打探 */
		inquire:IConfigLimit[];
		
		/** 勒索 */
		extort:IConfigLimit[];
			
	}


}