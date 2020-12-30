declare module rf{
	/**
	* //补充注释
	* from animation.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		animation:{[key:string]:IAnimation}
	}

	interface IAnimation{
		/** ID */
		id:string;
		
		/** 资源 */
		res:string[];
			
	}


}