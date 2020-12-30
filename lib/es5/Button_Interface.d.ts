declare module rf{
	/**
	* //补充注释
	* from button.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		button:{[key:string]:IButton}
	}

	interface IButton{
		/** 名字 */
		name:string;
		
		/** 图片资源 */
		res:string[];
			
	}


}