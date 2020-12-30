declare module rf{
	/**
	* //补充注释
	* from buff.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		buff:{[key:string]:IBuff}
	}

	interface IBuff{
		/** id */
		id:number;
		
		/** 名称 */
		name:(string | number)[];
		
		/** 类型 */
		type:number;
		
		/** 参数模板 */
		template:number;
		
		/** 生效条件 */
		active:IConfigLimit[];
		
		/** 属性:开始执行 */
		pro1:IRespro;
		
		/** 效果:开始执行 */
		effect1:IConfigLimit[];
		
		/** 事件:开始执行 */
		event1:IModule;
		
		/** 执行条件:tick执行 */
		tiaojian:IConfigLimit[];
		
		/** 属性:tick执行 */
		pro2:IRespro;
		
		/** 效果:tick执行 */
		effect2:IConfigLimit[];
		
		/** 最大叠加层数:tick执行 */
		stack:number;
		
		/** 事件:tick执行 */
		event2:IModule;
		
		/** 属性:自然失效执行 */
		pro3:IRespro;
		
		/** 效果:自然失效执行 */
		effect3:IConfigLimit[];
		
		/** 事件:自然失效执行 */
		event3:IModule;
		
		/** 属性:最终执行 */
		pro4:IRespro;
		
		/** 效果:最终执行 */
		effect4:IConfigLimit[];
		
		/** 事件:最终执行 */
		event4:IModule;
		
		/** 聊天框文本提醒 */
		chatting:string;
		
		/** 失效时机:1.自然失效,2.战斗结束失效,3.关卡退出失效,4.下线失效,5交互失效,6移动失效,7到达逃脱点,8战斗中切换目标 */
		close:number[];
		
		/** 图标资源 */
		res:string;
		
		/** 描述 */
		desc:string;
			
	}


}