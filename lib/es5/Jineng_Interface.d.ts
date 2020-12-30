declare module rf{
	/**
	* //补充注释
	* from jineng.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		jineng:{[key:string]:IJineng}
	}

	interface IJineng{
		/** ID */
		id:string;
		
		/** 名称 */
		name:string;
		
		/** 类型 */
		type:number;
		
		/** 稀有度 */
		rare:number;
		
		/** 使用条件(客户端显示) */
		condition:IConfigLimit[];
		
		/** 作用目标 */
		mubiao:number;
		
		/** 伤害倍率 */
		doub:number;
		
		/** 技能属性 */
		pro:IRespro;
		
		/** 技能消耗 */
		xiaohao:IConfigLimit[];
		
		/** 技能释放条件—CD */
		cd:IConfigLimit[];
		
		/** 施法 */
		cast:IConfigLimit[];
		
		/** 施法效果 */
		casteffect:IModule;
		
		/** 施法属性 */
		casepro:IRespro;
		
		/** 使用动画 */
		anima:string[];
		
		/** 命中 */
		hit:IConfigLimit[];
		
		/** 命中效果 */
		hiteffect:IModule;
		
		/** 命中属性 */
		hitpro:IRespro;
		
		/** 对方命中 */
		behit:IConfigLimit[];
		
		/** 对方命中效果 */
		behiteffect:IModule;
		
		/** 对方命中属性 */
		behitpro:IRespro;
		
		/** 施法结束 */
		end:IConfigLimit[];
		
		/** 施法结束效果 */
		endeffect:IModule;
		
		/** 施法属性 */
		endpro:IRespro;
		
		/** 技能描述 */
		desc:string;
		
		/** bgm 受击 */
		shoujiSound:string;
		
		/** 战斗日志显示 */
		log:string;
			
	}


}