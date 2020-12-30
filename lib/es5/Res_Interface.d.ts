declare module rf{
	/**
	* //补充注释
	* from res.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		res:{[key:string]:IRes}
	}

	interface IRes{
		/** 模块 */
		mo:string;
		
		/**子项*/
		ids:IResId[];
			
	}

	interface IResId{
		/** 模块 */
		mo:string;
		
		/** 屬性 */
		id:string;
		
		/** 属性类型 */
		type:string;
		
		/** 名称 */
		name:string;
		
		/** 数值 */
		value:any;
		
		/** 最小值 */
		valuemin:number;
		
		/** 最大值 */
		valuemax:number;
		
		/** 说明 */
		desc:string;
		
		/** 图标 */
		icon:string[];
		
		/** 大图标 */
		bigicon:string[];
		
		/** 是否显示 */
		show:number;
			
	}


}