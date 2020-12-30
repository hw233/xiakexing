declare module rf{
	/**
	* //补充注释
	* from name.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		name:{[key:string]:IName}
	}

	interface IName{
		/** ID */
		id:number;
		
		/**子项*/
		values:INameValue[];
			
	}

	interface INameValue{
		/** ID */
		id:number;
		
		/** 姓名 */
		value:string;
			
	}


}