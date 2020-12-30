declare module rf{
	/**
	* //补充注释
	* from mapcreateelement.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		mapcreateelement:{[key:string]:IMapcreateelement}
	}

	interface IMapcreateelement{
		/** 地图ID */
		id:string;
		
		/**子项*/
		indexs:IMapcreateelementIndex[];
			
	}

	interface IMapcreateelementIndex{
		/** 地图ID */
		id:string;
		
		/** 目录 */
		index:number;
		
		/** 元素ID */
		elementid:number;
		
		/** 初始化元素 */
		initElement:IModule;
			
	}


}