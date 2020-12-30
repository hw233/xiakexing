declare module rf{
	/**
	* //补充注释
	* from helptext.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		helptext:{[key:string]:IHelptext}
	}

	interface IHelptext{
		/** id */
		id:number;
		
		/** 提示内容 */
		desc:string;
			
	}


}