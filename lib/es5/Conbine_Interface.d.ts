declare module rf{
	/**
	* //补充注释
	* from conbine.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		conbine:{[key:string]:IConbine}
	}

	interface IConbine{
		/** ID */
		id:number;
		
		/** 名字 */
		name:string;
		
		/** 道具表id */
		itemId:number;
		
		/** 类型 */
		type:number;
		
		/** 合成条件 */
		conbineCondition:IConfigLimit[];
		
		/** 合成消耗 */
		conbineCost:IConfigLimit[];
		
		/** 合成时间 */
		cookTimeSeconds:number;
		
		/** 合成获得 */
		reward:IConfigLimit[];
		
		/** 解锁获得 */
		lockreward:IModule;
			
	}


}