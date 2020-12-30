declare module rf {
    interface IBattleRuntime {
        //战场id
        guid: number,
        //战场时间
        time: number,
        //成员
        roles: { [key: string]: IBattleHeroRuntime },

        info: IBattleInfo,
        shows: { guid: number, opera: string, value: number, color: number | string }[],

        creater: number
    }

    interface IBuffRuntime {
        time: number
        times: number
        duration: number,
        interval: number,
    }

    interface IBattleInfo {

        //攻击的人物guid
        roleId: number;

        //被攻击的人物guid
        target: number;

        //技能id
        jineng: string;

        //道具id
        item: number;

        /**
         * 1.恢复
         * 2.道具
         */
        type: number;

        buff: number;

        hits: { hp: number, lhp: number, burst: number }[]

        bloods: IBattleHeroInfo[];
    }

    export interface IBattleHeroInfo {
        guid: number;
        hp: number,
        mhp: number,
        lhp: number,
        mp: number,
        mmp: number,
        lmp: number,
        zhuangtai: number,
        faces: IFaceData,
        vigor: number,
        maxvigor: number,
        name: string
    }

    class IBattleHeroRuntime {
        //战场id
        battleId: number;
        //人物id
        roleId: number;
        info: IBattleHeroInfo;

        //攻击CD
        atktime: number;
        //技能共享CD
        sharetime: number;
        //道具使用CD
        itemtime: { [key: string]: number };
        //目标id
        target: number;

        wuqi: number;

        zhuangtai: number;
    }

    interface IHeroHurtInfo {
        type: string,
        name: string,
        value: number,
        option?: any,
        role: string,//玩家名
    }
}


