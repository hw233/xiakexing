declare module rf{
	/**
	* //补充注释
	* from interactive.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		interactive:{[key:string]:IInteractive}
	}

	interface IInteractive{
		/** id */
		id:number;
		
		/** 显示字体颜色:255|255|255，红|绿|蓝 */
		myColor:string;
		
		/** 显示内容 */
		desc:string;
		
		/** 颜色 */
		color:string[];
			
	}


}