declare module rf{
	/**
	* //补充注释
	* from room.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		room:{[key:string]:IRoom}
	}

	interface IRoom{
		/** ID */
		id:number;
		
		/** 默认等级 */
		deflv:number;
		
		/** 房间类型 */
		type:number;
		
		/** 房间角标 */
		flag:string[];
		
		/** 房间音效 */
		sound:string;
		
		/** 特殊图标 */
		specialflag:number;
		
		/** 初始解锁 */
		active:number;
		
		/** 错误描述 */
		error:string;
		
		/** 房间元素刷新 */
		renovateelement:IModule;
		
		/** 房间初始化 */
		iniRoom:{[key:string]:(string | number)};
		
		/** 房间进入条件（对个人） */
		intoLimit:IConfigLimit[];
		
		/** 房间进入奖励 */
		intoreward:IModule;
		
		/** 房间离开奖励 */
		leavereward:IModule;
		
		/**子项*/
		levels:IRoomLevel[];
			
	}

	interface IRoomLevel{
		/** ID */
		id:number;
		
		/** 等级 */
		level:number;
		
		/** 房间名字 */
		name:string;
		
		/** 显示条件 */
		display:IConfigLimit[];
		
		/** 房间元素 */
		element:number[];
		
		/** 升级条件 */
		requirement:IConfigLimit[];
		
		/** 升级消耗 */
		levelconsume:IConfigLimit[];
		
		/** 建造/升级时间 */
		time:number;
		
		/** 升级描述 */
		desc:string[];
			
	}


}