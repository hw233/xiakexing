declare module rf{
	/**
	* //补充注释
	* from task.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		task:{[key:string]:ITask}
	}

	interface ITask{
		/** 任务组 */
		group:number;
		
		/** 类型 */
		type:number;
		
		/** 种类 */
		kind:number;
		
		/**子项*/
		indexs:ITaskIndex[];
			
	}

	interface ITaskIndex{
		/** 任务组 */
		group:number;
		
		/** 标 */
		index:number;
		
		/** ID */
		id:number;
		
		/** 类型 */
		type:number;
		
		/** 种类 */
		kind:number;
		
		/** 任务激活提示文案 */
		activetips:string;
		
		/** 任务地图 */
		mapid:number;
		
		/** 随机任务权重 */
		weight:number;
		
		/** 开始任务npc */
		beginNpcId:string;
		
		/** 完成任务npc */
		npcId:string;
		
		/** 开始条件 */
		openCondition:IConfigLimit[];
		
		/** 接取任务module */
		acceptTaskModule:IModule;
		
		/** 完成条件 */
		completionCondition:IConfigLimit[];
		
		/** 奖励内容 */
		reward:IConfigLimit[];
		
		/** 奖励内容2 */
		reward_client:IConfigLimit[];
		
		/** 奖励module */
		module:IModule;
		
		/** key维护 */
		keymodule:IModule;
		
		/** 任务名称 */
		name:string;
		
		/** 任务已接取未完成描述 */
		acceptdesc:string;
		
		/** 任务已完成未提交描述 */
		completedesc:string;
		
		/** npc任务接取前对话对白 */
		activePhase:string;
		
		/** npc任务接取后对白 */
		acceptPhase:string;
		
		/** npc结束对白 */
		endPhase:string;
		
		/** 相位 */
		xiangwei:string;
		
		/** 悬赏权重 */
		xsqz:number;
		
		/** 悬赏描述 */
		describe:string;
		
		/** 悬赏难度 */
		xuanshangnandu:number;
		
		/** 悬赏icon */
		icon:string[];
			
	}


}