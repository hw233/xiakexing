declare module rf{
	/**
	* //补充注释
	* from rank.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		rank:{[key:string]:IRank}
	}

	interface IRank{
		/** 等级 */
		level:number;
		
		/** 经验 */
		exp:number;
		
		/** 经验总值 */
		totalexp:number;
		
		/** 奖励 */
		reward:IConfigLimit[];
		
		/** 奖励事件 */
		event:IModule;
			
	}


}