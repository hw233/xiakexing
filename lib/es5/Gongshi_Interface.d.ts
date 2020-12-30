declare module rf{
	/**
	* //补充注释
	* from gongshi.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		gongshi:{[key:string]:IGongshi}
	}

	interface IGongshi{
		/** ID */
		id:string;
		
		/** 公式 */
		gongshi:any;
		
		/** :0 */
		ler:any;
			
	}


}