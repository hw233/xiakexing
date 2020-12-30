declare module rf{
	/**
	* //补充注释
	* from menpai.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		menpai:{[key:string]:IMenpai}
	}

	interface IMenpai{
		/** ID */
		id:number;
		
		/** 名称 */
		name:string;
		
		/** 门派地图 */
		map:number;
		
		/** 图标 */
		icon:string[];
		
		/** 加入门派条件 */
		condition:IConfigLimit[];
		
		/**子项*/
		branchs:IMenpaiBranch[];
			
	}

	interface IMenpaiBranch{
		/** ID */
		id:number;
		
		/** 门派分支 */
		branch:number;
		
		/** 地位ID */
		diwei:number;
		
		/** 称号 */
		title:string;
		
		/** 属性奖励 */
		pro:{[key:string]:(string | number)};
		
		/** 门派福利 */
		welfare:IConfigLimit[];
		
		/** 地位 */
		identity:string;
			
	}


}