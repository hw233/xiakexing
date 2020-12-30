declare module rf{
	/**
	* //补充注释
	* from random.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		random:{[key:string]:IRandom}
	}

	interface IRandom{
		/** 类型 */
		id:string;
		
		/**子项*/
		limits:IRandomLimit[];
			
	}

	interface IRandomLimit{
		/** 类型 */
		id:string;
		
		/** 条件 */
		limit:IConfigLimit[];
		
		/** 权值 */
		weight:number;
		
		/** 奖励 */
		reward:IConfigLimit[];
		
		/** 事件 */
		module:IModule;
		
		/** 再次随机 */
		rnd:string;
		
		/** 参数 */
		pro:any;
			
	}


}