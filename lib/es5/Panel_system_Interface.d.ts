declare module rf {

	export interface IPanelSystemSystemDefaultPro {
		age: number;
		con: number;
		per: number;
		luck: number;
		str: number;
		ler: number;
		dex: number;
	}

	export interface IPanelSystemSystemDefaultFaceNan {
		face_hu: number;
		face_yan: number;
		face_tou: number;
		face_mei: number;
		face_bg: number;
		face_fa: number;
	}

	export interface IPanelSystemSystemPlayerStatus {
		80: string;
		50: string;
		20: string;
		70: string;
		40: string;
		90: string;
		10: string;
		60: string;
		30: string;
	}

	export interface IPanelSystemSystemDefaultFaceNv {
		face_hu: number;
		face_yan: number;
		face_tou: number;
		face_mei: number;
		face_bg: number;
		face_fa: number;
	}

	export interface IPanelSystemSystem {
		mapScale: number;
		fuzhouIcon: string[];
		hpXishu: number;
		zlLHPpercent: number;
		magterm: number;
		cookIcon: string[];
		privateInterval: number;
		dzXishu: number;
		repairIcon: string[];
		zhuizongIcon_3: string[];
		fieldIcon: string[];
		basehit: number;
		worldInterval: number;
		updateSelfMapRoom: number;
		roomInterval: number;
		xinshoudesc: string;
		fangchenmiNotice: number;
		mapItemInfo: number[];
		taskTimesEveryday: number;
		bsdXiaohao: number;
		zhandouyanchi: number;
		sharetime: number;
		randomTaskNum: number;
		defaultFaceNv: IPanelSystemSystemDefaultFaceNv;
		findPathTime: number;
		version: string;
		playerStatus: IPanelSystemSystemPlayerStatus;
		defaultFaceNan: IPanelSystemSystemDefaultFaceNan;
		mapRoadVInfo: number[];
		fangchenmiKickTime: number;
		bookCostDurabilityPerMin: number;
		protpercent: number;
		zlHPpercent: number;
		fightmodetime: number;
		zhuizongIcon_2: string[];
		escapetime: number;
		upgradeIcon: string[];
		mapRoadHInfo: number[];
		defaultPro: IPanelSystemSystemDefaultPro;
		hurtpercent: number;
		zhuizongIcon_1: string[];
	}

	export interface IPanelSystem {
		system: IPanelSystemSystem;
	}

}