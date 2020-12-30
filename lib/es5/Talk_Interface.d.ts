declare module rf{
	/**
	* //补充注释
	* from talk.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		talk:{[key:string]:ITalk}
	}

	interface ITalk{
		/** ID */
		id:number;
		
		/** 内容 */
		value:string;
			
	}


}