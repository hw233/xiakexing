declare module rf{
	/**
	* //补充注释
	* from reward.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		reward:{[key:string]:IReward}
	}

	interface IReward{
		/** 奖励组 */
		group:number;
		
		/** 类型 */
		type:number;
		
		/**子项*/
		indexs:IRewardIndex[];
			
	}

	interface IRewardIndex{
		/** 奖励组 */
		group:number;
		
		/** 标 */
		index:number;
		
		/** ID */
		id:number;
		
		/** 事件 */
		shijian:string;
		
		/** 条件 */
		condition:IConfigLimit[];
		
		/** 奖励内容 */
		reward:IConfigLimit[];
		
		/** 奖励事件 */
		event:IModule;
			
	}


}