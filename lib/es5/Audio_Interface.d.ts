declare module rf{
	/**
	* //补充注释
	* from audio.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		audio:{[key:string]:IAudio}
	}

	interface IAudio{
		/** 名字 */
		id:string;
		
		/** 类型 */
		type:number;
		
		/** 位置 */
		url:string;
		
		/** 次数 */
		count:number;
		
		/** 说明 */
		desc:string;
			
	}


}