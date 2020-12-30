declare module rf{
	/**
	* //补充注释
	* from qingbao.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		qingbao:{[key:string]:IQingbao}
	}

	interface IQingbao{
		/** ID */
		id:number;
		
		/**子项*/
		types:IQingbaoType[];
			
	}

	interface IQingbaoType{
		/** ID */
		id:number;
		
		/** 类型 */
		type:number;
		
		/** 优先级 */
		priority:number;
		
		/** 权重 */
		weight:number;
		
		/** 条件 */
		condition:IConfigLimit[];
		
		/** 条件文本 */
		term:string;
		
		/** 消耗 */
		cost:IConfigLimit[];
		
		/** 名字 */
		name:string;
		
		/** 内容 */
		desc:string;
		
		/** 详细内容 */
		detail:string;
		
		/** 元素id */
		eles:string[];
		
		/** 资源 */
		res:string[];
			
	}


}