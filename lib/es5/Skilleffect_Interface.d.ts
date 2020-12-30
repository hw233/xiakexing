declare module rf{
	/**
	* //补充注释
	* from skilleffect.csv
	* @author newcsv
	* 
	*/	
	
	interface IGameConfig{
		skilleffect:{[key:string]:ISkilleffect}
	}

	interface ISkilleffect{
		/** ID */
		id:string;
		
		/** 名称 */
		name:string;
		
		/** 技能攻击系数 */
		atkcoe:number[];
		
		/** 技能命中系数 */
		hitcoe:number[];
		
		/** 技能伤害系数 */
		hurtcoe:number[];
		
		/** 技能防御系数 */
		defcoe:number[];
		
		/** 技能加力系数 */
		addcoe:number[];
		
		/** 内功生命系数 */
		hpcoe:number[];
		
		/** 生命恢复系数 */
		reccoe:number[];
		
		/** 技能攻速系数 */
		spdcoe:number[];
		
		/** 轻功闪避系数 */
		aglcoe:number[];
		
		/** 普通攻击 */
		natk:number;
		
		/** 主动技能 */
		effect:number[];
		
		/** 被动技能 */
		passiveDesc:number[];
		
		/** 装备效果 */
		passive:IModule;
		
		/** 卸下装备效果 */
		takedown:IModule;
		
		/** 主动技能显示（前端 */
		jinengId1:number[];
		
		/** 被动技能显示（前端 */
		jinengId2:number[];
		
		/** 组合技能显示（前端 */
		jinengId3:number[];
			
	}


}