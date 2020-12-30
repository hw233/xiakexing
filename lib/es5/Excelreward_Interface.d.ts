declare module rf{
	/**
	* //补充注释
	* from excelreward.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		excelreward:{[key:string]:IExcelreward}
	}

	interface IExcelreward{
		/** ID */
		id:number;
		
		/** 奖励内容 */
		reward:IConfigLimit[];
		
		/** 奖励事件 */
		event:IModule;
			
	}


}