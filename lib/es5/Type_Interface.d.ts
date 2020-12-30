declare module rf{
	/**
	* //补充注释
	* from type.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		type:{[key:string]:IType}
	}

	interface IType{
		/** ID */
		id:number;
		
		/**子项*/
		types:ITypeType[];
			
	}

	interface ITypeType{
		/** ID */
		id:number;
		
		/** 类型 */
		type:any;
		
		/** 名称 */
		name:string;
		
		/** 资源 */
		res:string[];
		
		/** 描述 */
		desc:string;
			
	}


}