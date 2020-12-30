declare module rf{
	/**
	* //补充注释
	* from fightlog.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		fightlog:{[key:string]:IFightlog}
	}

	interface IFightlog{
		/** 名字 */
		id:string;
		
		/** 文本 */
		desc:string;
			
	}


}