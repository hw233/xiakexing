declare module rf{
	/**
	* //补充注释
	* from channel.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		channel:{[key:string]:IChannel}
	}

	interface IChannel{
		/** id */
		id:number;
		
		/** 显示字体颜色 */
		myColor:string;
		
		/** 显示内容 */
		desc:string;
		
		/** 颜色 */
		color:string[];
			
	}


}