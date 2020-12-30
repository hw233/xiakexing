module rf {

    export var shou_shang_1 = [

        {
            time: 0,
            type: "scale",
            from: 2,
            to: 1,
            duration: 600,
            ease: "back.inout"
        },

        {
            time: 0,
            type: "alpha",
            from: 0,
            to: 1,
            duration: 250
        },

        {
            time: 500,
            type: "liner",
            // degree: [-150, -30],
            degree: -90,
            len: 50,
            duration: 500,
            ease: "quartic.inout"
        },

        {
            time: 700,
            type: "alpha",
            from: 1,
            to: 0,
            duration: 500
        }        

    ] as IPANEL_TWEEN_DATA[]

    export var xuan_zhuan_1 = [

        {
            time: 0,
            type: "rotation",
            from: 0,
            to: 360,
            duration: 1000
        },

        {
            time: 0,
            type: "liner",
            // degree: [-150, -30],
            degree: -90,
            len: 200,
            duration: 1000,
            // ease: "quartic.inout"
        },

    ] as IPANEL_TWEEN_DATA[]

    /**
     * 打开弹框动效
     */
    export var popup_effect_show = [

        {
            time: 0,
            type: "scale",
            from: 0.5,
            to: 1,
            duration: 200,
            ease: "back.out"
        },
        {
            time: 0,
            type: "alpha",
            to: 1,
            duration: 100
        },

    ] as IPANEL_TWEEN_DATA[]

    /**
     * 关闭弹框动效
     */
    export var popup_effect_hide = [

        {
            time: 0,
            type: "scale",
            from: 1,
            to: 0,
            duration: 100
        },
        {
            time: 50,
            type: "alpha",
            to: 0,
            duration: 50
        },

    ] as IPANEL_TWEEN_DATA[]

    export var framemask_force_effect = [

        {
            time: 0,
            type: "scale",
            from: 2,
            to: 1.2,
            duration: 1500,
            // ease: "back.out"
        },

        {
            time: 500,
            type: "alpha",
            to: 0,
            duration: 1000
        },

    ] as IPANEL_TWEEN_DATA[]

    export var zhuanchang_effect = [

        {
            time: 0,
            type: "alpha",
            from: 0,
            to: 1,
            duration: 1000,
        },
        {
            time: 1500,
            type: "alpha",
            from: 1,
            to: 0,
            duration: 1000
        },

    ] as IPANEL_TWEEN_DATA[]
}