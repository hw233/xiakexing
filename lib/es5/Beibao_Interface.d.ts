declare module rf{
	/**
	* //补充注释
	* from beibao.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		beibao:{[key:string]:IBeibao}
	}

	interface IBeibao{
		/** ID */
		id:number;
		
		/** 名称 */
		name:string;
		
		/** 死亡是否可掉落 */
		lose:number;
		
		/** 初始slot */
		slot:number;
		
		/** 初始active */
		active:number;
		
		/**子项*/
		levels:IBeibaoLevel[];
			
	}

	interface IBeibaoLevel{
		/** ID */
		id:number;
		
		/** 等级 */
		level:number;
		
		/** 形状宽 */
		width:number;
		
		/** 高 */
		height:number;
		
		/** 初始格子数量 */
		ceil:number;
			
	}


}