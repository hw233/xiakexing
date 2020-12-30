declare module rf{
	/**
	* //补充注释
	* from shangcheng.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		shangcheng:{[key:string]:IShangcheng}
	}

	interface IShangcheng{
		/** id */
		id:number;
		
		/** 商品名称 */
		name:string;
		
		/** 商品描述 */
		describe:string;
		
		/** 稀有度 */
		rare:number;
		
		/** 购买条件 */
		limit:IConfigLimit[];
		
		/** 购买消耗 */
		cost:IConfigLimit[];
		
		/** 奖励 */
		reward:IConfigLimit[];
		
		/** 出售数量 */
		count:number;
		
		/** 刷新时间 */
		reload:number;
		
		/** icon */
		icon:string[];
		
		/** tag */
		tag:number;
			
	}


}