declare module rf{
	/**
	* //补充注释
	* from field.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		field:{[key:string]:IField}
	}

	interface IField{
		/** ID */
		id:number;
		
		/** 名称 */
		name:string;
		
		/** 图标 */
		icon:string[];
		
		/** 每秒增加成熟度 */
		maturePerSecond:number;
		
		/** 所需成熟度 */
		maturity:number;
		
		/** 照料增加成熟度 */
		careAddMaturity:number;
		
		/** 精神消耗 */
		careCostVigor:IConfigLimit[];
		
		/** 道具消耗 */
		careCostItem:IConfigLimit[];
		
		/** 照料cd时间(秒) */
		careCD:number;
		
		/** 基础产量(收获) */
		reward:IConfigLimit[];
			
	}


}