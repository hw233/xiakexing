declare module rf{
	/**
	* //补充注释
	* from fightmode.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		fightmode:{[key:string]:IFightmode}
	}

	interface IFightmode{
		/** ID */
		id:number;
		
		/** 名称 */
		name:string;
		
		/** 类型 */
		type:number;
		
		/** 移动速度 */
		move:number;
		
		/** 主动叫杀 */
		killall:number;
		
		/** 叫杀busy时间 */
		busy:number;
		
		/** 无视叫杀 */
		dex:number;
			
	}


}