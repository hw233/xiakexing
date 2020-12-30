declare module rf{
	/**
	* //补充注释
	* from touxiang.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		touxiang:{[key:string]:ITouxiang}
	}

	interface ITouxiang{
		/** ID */
		id:string;
		
		/** 名字 */
		name:string;
		
		/**子项*/
		indexs:ITouxiangIndex[];
			
	}

	interface ITouxiangIndex{
		/** ID */
		id:string;
		
		/** 序号 */
		index:number;
		
		/** 性别 */
		sex:number;
		
		/** 资源 */
		res:string;
			
	}


}