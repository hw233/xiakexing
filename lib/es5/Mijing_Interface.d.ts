declare module rf{
	/**
	* //补充注释
	* from mijing.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		mijing:{[key:string]:IMijing}
	}

	interface IMijing{
		/** ID */
		id:number;
		
		/** 关卡名字 */
		name:string;
		
		/** 关卡 */
		guanqia:number;
		
		/** 类型/规模 */
		type:number;
		
		/** 死亡是否掉落 */
		drop:number;
		
		/** 人数 */
		player:number;
		
		/** 匹配等级分组 */
		perlevel:number;
		
		/** 匹配最大时长 */
		pipei:number;
		
		/** 进入条件 */
		condition:IConfigLimit[];
		
		/** 显示条件 */
		display:IConfigLimit[];
		
		/** 关卡地图id */
		mapID:string[];
		
		/** 关卡地图 */
		res:string;
		
		/** 奖励 */
		reward:IConfigLimit[];
		
		/** 逃出时长 */
		escape:number;
		
		/** 关卡时长 */
		time:number;
		
		/** 逃出(罗盘)道具id */
		iconcondition:number;
		
		/** 秘境描述 */
		desc:string;
		
		/** BGM */
		sound:string;
		
		/** 倒计时文本 */
		daojishi:string;
		
		/** 错误文本 */
		error:string;
		
		/** 初始化地图 */
		iniMap:IModule;
			
	}


}