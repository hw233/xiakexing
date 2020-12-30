declare module rf{
	/**
	* //补充注释
	* from shop.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		shop:{[key:string]:IShop}
	}

	interface IShop{
		/** group */
		group:number;
		
		/**子项*/
		ids:IShopId[];
			
	}

	interface IShopId{
		/** group */
		group:number;
		
		/** id */
		id:number;
		
		/** 出售物品 */
		item:IConfigLimit[];
		
		/** 出售数量 */
		count:number;
		
		/** 物品折扣 */
		dis:number;
		
		/** 刷新时间 */
		reload:number;
			
	}


}