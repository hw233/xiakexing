declare module rf{
	/**
	* //补充注释
	* from shuxing.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		shuxing:{[key:string]:IShuxing}
	}

	interface IShuxing{
		/** 组 */
		group:string;
		
		/**子项*/
		ids:IShuxingId[];
			
	}

	interface IShuxingId{
		/** 组 */
		group:string;
		
		/** ID */
		id:string;
		
		/** 名称 */
		name:string;
		
		/** 类型 */
		type:number;
		
		/** 臂力 */
		str:number;
		
		/** 筋骨 */
		con:number;
		
		/** 身法 */
		dex:number;
		
		/** 悟性 */
		ler:number;
		
		/** 灵性 */
		per:number;
		
		/** 福源 */
		luck:number;
		
		/** 年龄 */
		age:number;
		
		/** 模板描述1 */
		describe1:string;
		
		/** 模板描述2 */
		describe2:string;
		
		/** 描述 */
		desc:string;
			
	}


}