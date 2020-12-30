declare module rf {
    interface IPANEL_TWEEN_DATA {
        type: string;
        time: number;
        duration?: number;
        lifetime?: number;
        offsetDegree?: number | number[];
        ease?: string;
        from?: number | number[];
        to?: number | number[];
        len?: number | number[];
        degree?: number | number[];
        so?: {
            [key: string]: number;
        };
        eo?: {
            [key: string]: number;
        };
        ef?: string;
        p?: any;
        t?: any;
        sp?: number;
        rt?: boolean;
    }
    interface IPANEL_GLOBAL_CONFIG_BATTLE {
        time: number;
        atk: number[][];
    }
    interface IPANEL_ENERGY {
        max: number;
        recover: number;
        attack: number;
    }
    interface IPANEL_ATTACK {
        cd: number;
        blood: number;
        area: number;
        bscd: number;
        bsblood: number;
    }
    interface IPanel_Global_Config_Data {
        namefontsize: number;
        team_a_pos: {
            [key: number]: number[];
        };
        team_b_pos: {
            [key: number]: number[];
        };
        battle: IPANEL_GLOBAL_CONFIG_BATTLE;
        energy: IPANEL_ENERGY;
        attack: IPANEL_ATTACK;
        atkorder: {
            team_a: {
                [key: number]: number;
            };
            team_b: {
                [key: number]: number;
            };
        };
        bseffect: {
            [key: string]: {
                x: number;
                y: number;
                jiange: number;
                anim: IPANEL_TWEEN_DATA[];
            };
        };
    }
    interface IPanel_Global_Data {
        config: IPanel_Global_Config_Data;
    }
    interface IDemo_Batter_Unit_Data {
        index: number;
        unit: {
            type: string;
            id: number | string;
            level: number;
            moban?: string;
        };
    }
    interface IPanel_Demo_Data {
        map: string;
        team_A: IDemo_Batter_Unit_Data[];
        team_B: IDemo_Batter_Unit_Data[];
    }
    interface IPANEL_Demo_ROOT {
        demo: IPanel_Demo_Data;
    }
    interface IPANEL_FIGHT_FONT_ATTACK {
        type: number;
        add: number;
        dec: number;
        bx: number;
        by: number;
        offset: number;
        prefix: number[];
        unshownum: number;
        tween: IPANEL_TWEEN_DATA[];
    }
    interface IData {
        [key: string]: any;
        [key: number]: any;
    }
    interface ITextureData extends IData {
        key: string;
        url: string;
        mipmap: boolean;
        mag: number;
        mix: number;
        repeat: number;
        y: boolean;
    }
}
declare module rf {
    interface IOffsetResize {
        stageWidth: number;
        stageHeight: number;
        ox: number;
        oy: number;
        sx: number;
        sy: number;
    }
    var worker: Worker;
    let gl: WebGLRenderingContext;
    var sceneWidth: number;
    var sceneHeight: number;
    var windowWidth: number;
    var windowHeight: number;
    var innerWidth: number;
    var innerHeight: number;
    var lockWidth: number;
    var lockHeight: number;
    var lockStageArea: boolean;
    var offsetResize: IOffsetResize;
    var contextMatrix3D: IMatrix3D;
    var contextMatrix2D: IMatrix3D;
    var contextInvMatrix: IMatrix3D;
    var scissorRect: Size;
    var TEMP_RECT: Size;
    var isWindowResized: boolean;
    var max_vc: number;
    let c_white: string;
    let pixelFont: number;
    let pixelScale: number;
    let isMobile: boolean;
    let platform: string;
    let softKeyboard: boolean;
    var ROOT_PERFIX: string;
    var RES_PERFIX: string;
    var CONFIG_PERFIX: string;
    var ASSSETS_PERFIX: string;
    const enum DebugDefine {
        CANVAS = "canvas_Event"
    }
    const enum ExtensionDefine {
        JPG = ".jpg",
        PNG = ".png",
        KM = ".km",
        DAT = ".dat",
        P3D = ".p3d",
        PARTICLE = ".pa",
        SKILL = ".sk",
        KF = ".kf",
        ANI = ".ha",
        PAK = ".hp"
    }
    const enum Align {
        TOP_LEFT = 0,
        TOP_CENTER = 1,
        TOP_RIGHT = 2,
        MIDDLE_LEFT = 3,
        MIDDLE_CENTER = 4,
        MIDDLE_RIGHT = 5,
        BOTTOM_LEFT = 6,
        BOTTOM_CENTER = 7,
        BOTTOM_RIGHT = 8
    }
    function isPowerOfTwo(n: number): boolean;
    const enum WebGLConst {
        DEPTH_BUFFER_BIT = 256,
        STENCIL_BUFFER_BIT = 1024,
        COLOR_BUFFER_BIT = 16384,
        POINTS = 0,
        LINES = 1,
        LINE_LOOP = 2,
        LINE_STRIP = 3,
        TRIANGLES = 4,
        TRIANGLE_STRIP = 5,
        TRIANGLE_FAN = 6,
        ZERO = 0,
        ONE = 1,
        SRC_COLOR = 768,
        ONE_MINUS_SRC_COLOR = 769,
        SRC_ALPHA = 770,
        ONE_MINUS_SRC_ALPHA = 771,
        DST_ALPHA = 772,
        ONE_MINUS_DST_ALPHA = 773,
        DST_COLOR = 774,
        ONE_MINUS_DST_COLOR = 775,
        SRC_ALPHA_SATURATE = 776,
        CONSTANT_COLOR = 32769,
        ONE_MINUS_CONSTANT_COLOR = 32770,
        CONSTANT_ALPHA = 32771,
        ONE_MINUS_CONSTANT_ALPHA = 32772,
        FUNC_ADD = 32774,
        FUNC_SUBSTRACT = 32778,
        FUNC_REVERSE_SUBTRACT = 32779,
        BLEND_EQUATION = 32777,
        BLEND_EQUATION_RGB = 32777,
        BLEND_EQUATION_ALPHA = 34877,
        BLEND_DST_RGB = 32968,
        BLEND_SRC_RGB = 32969,
        BLEND_DST_ALPHA = 32970,
        BLEND_SRC_ALPHA = 32971,
        BLEND_COLOR = 32773,
        ARRAY_BUFFER_BINDING = 34964,
        ELEMENT_ARRAY_BUFFER_BINDING = 34965,
        LINE_WIDTH = 2849,
        ALIASED_POINT_SIZE_RANGE = 33901,
        ALIASED_LINE_WIDTH_RANGE = 33902,
        CULL_FACE_MODE = 2885,
        FRONT_FACE = 2886,
        DEPTH_RANGE = 2928,
        DEPTH_WRITEMASK = 2930,
        DEPTH_CLEAR_VALUE = 2931,
        DEPTH_FUNC = 2932,
        STENCIL_CLEAR_VALUE = 2961,
        STENCIL_FUNC = 2962,
        STENCIL_FAIL = 2964,
        STENCIL_PASS_DEPTH_FAIL = 2965,
        STENCIL_PASS_DEPTH_PASS = 2966,
        STENCIL_REF = 2967,
        STENCIL_VALUE_MASK = 2963,
        STENCIL_WRITEMASK = 2968,
        STENCIL_BACK_FUNC = 34816,
        STENCIL_BACK_FAIL = 34817,
        STENCIL_BACK_PASS_DEPTH_FAIL = 34818,
        STENCIL_BACK_PASS_DEPTH_PASS = 34819,
        STENCIL_BACK_REF = 36003,
        STENCIL_BACK_VALUE_MASK = 36004,
        STENCIL_BACK_WRITEMASK = 36005,
        VIEWPORT = 2978,
        SCISSOR_BOX = 3088,
        COLOR_CLEAR_VALUE = 3106,
        COLOR_WRITEMASK = 3107,
        UNPACK_ALIGNMENT = 3317,
        PACK_ALIGNMENT = 3333,
        MAX_TEXTURE_SIZE = 3379,
        MAX_VIEWPORT_DIMS = 3386,
        SUBPIXEL_BITS = 3408,
        RED_BITS = 3410,
        GREEN_BITS = 3411,
        BLUE_BITS = 3412,
        ALPHA_BITS = 3413,
        DEPTH_BITS = 3414,
        STENCIL_BITS = 3415,
        POLYGON_OFFSET_UNITS = 10752,
        POLYGON_OFFSET_FACTOR = 32824,
        TEXTURE_BINDING_2D = 32873,
        SAMPLE_BUFFERS = 32936,
        SAMPLES = 32937,
        SAMPLE_COVERAGE_VALUE = 32938,
        SAMPLE_COVERAGE_INVERT = 32939,
        COMPRESSED_TEXTURE_FORMATS = 34467,
        VENDOR = 7936,
        RENDERER = 7937,
        VERSION = 7938,
        IMPLEMENTATION_COLOR_READ_TYPE = 35738,
        IMPLEMENTATION_COLOR_READ_FORMAT = 35739,
        BROWSER_DEFAULT_WEBGL = 37444,
        STATIC_DRAW = 35044,
        STREAM_DRAW = 35040,
        DYNAMIC_DRAW = 35048,
        ARRAY_BUFFER = 34962,
        ELEMENT_ARRAY_BUFFER = 34963,
        BUFFER_SIZE = 34660,
        BUFFER_USAGE = 34661,
        CURRENT_VERTEX_ATTRIB = 34342,
        VERTEX_ATTRIB_ARRAY_ENABLED = 34338,
        VERTEX_ATTRIB_ARRAY_SIZE = 34339,
        VERTEX_ATTRIB_ARRAY_STRIDE = 34340,
        VERTEX_ATTRIB_ARRAY_TYPE = 34341,
        VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922,
        VERTEX_ATTRIB_ARRAY_POINTER = 34373,
        VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975,
        CULL_FACE = 2884,
        FRONT = 1028,
        BACK = 1029,
        FRONT_AND_BACK = 1032,
        BLEND = 3042,
        DEPTH_TEST = 2929,
        DITHER = 3024,
        POLYGON_OFFSET_FILL = 32823,
        SAMPLE_ALPHA_TO_COVERAGE = 32926,
        SAMPLE_COVERAGE = 32928,
        SCISSOR_TEST = 3089,
        STENCIL_TEST = 2960,
        NO_ERROR = 0,
        INVALID_ENUM = 1280,
        INVALID_VALUE = 1281,
        INVALID_OPERATION = 1282,
        OUT_OF_MEMORY = 1285,
        CONTEXT_LOST_WEBGL = 37442,
        CW = 2304,
        CCW = 2305,
        DONT_CARE = 4352,
        FASTEST = 4353,
        NICEST = 4354,
        GENERATE_MIPMAP_HINT = 33170,
        BYTE = 5120,
        UNSIGNED_BYTE = 5121,
        SHORT = 5122,
        UNSIGNED_SHORT = 5123,
        INT = 5124,
        UNSIGNED_INT = 5125,
        FLOAT = 5126,
        DEPTH_COMPONENT = 6402,
        ALPHA = 6406,
        RGB = 6407,
        RGBA = 6408,
        LUMINANCE = 6409,
        LUMINANCE_ALPHA = 6410,
        UNSIGNED_SHORT_4_4_4_4 = 32819,
        UNSIGNED_SHORT_5_5_5_1 = 32820,
        UNSIGNED_SHORT_5_6_5 = 33635,
        FRAGMENT_SHADER = 35632,
        VERTEX_SHADER = 35633,
        COMPILE_STATUS = 35713,
        DELETE_STATUS = 35712,
        LINK_STATUS = 35714,
        VALIDATE_STATUS = 35715,
        ATTACHED_SHADERS = 35717,
        ACTIVE_ATTRIBUTES = 35721,
        ACTIVE_UNIFORMS = 35718,
        MAX_VERTEX_ATTRIBS = 34921,
        MAX_VERTEX_UNIFORM_VECTORS = 36347,
        MAX_VARYING_VECTORS = 36348,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660,
        MAX_TEXTURE_IMAGE_UNITS = 34930,
        MAX_FRAGMENT_UNIFORM_VECTORS = 36349,
        SHADER_TYPE = 35663,
        SHADING_LANGUAGE_VERSION = 35724,
        CURRENT_PROGRAM = 35725,
        NEVER = 512,
        ALWAYS = 519,
        LESS = 513,
        EQUAL = 514,
        LEQUAL = 515,
        GREATER = 516,
        GEQUAL = 518,
        NOTEQUAL = 517,
        KEEP = 7680,
        REPLACE = 7681,
        INCR = 7682,
        DECR = 7683,
        INVERT = 5386,
        INCR_WRAP = 34055,
        DECR_WRAP = 34056,
        NEAREST = 9728,
        LINEAR = 9729,
        NEAREST_MIPMAP_NEAREST = 9984,
        LINEAR_MIPMAP_NEAREST = 9985,
        NEAREST_MIPMAP_LINEAR = 9986,
        LINEAR_MIPMAP_LINEAR = 9987,
        TEXTURE_MAG_FILTER = 10240,
        TEXTURE_MIN_FILTER = 10241,
        TEXTURE_WRAP_S = 10242,
        TEXTURE_WRAP_T = 10243,
        TEXTURE_2D = 3553,
        TEXTURE = 5890,
        TEXTURE_CUBE_MAP = 34067,
        TEXTURE_BINDING_CUBE_MAP = 34068,
        TEXTURE_CUBE_MAP_POSITIVE_X = 34069,
        TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,
        TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,
        TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,
        TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,
        TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074,
        MAX_CUBE_MAP_TEXTURE_SIZE = 34076,
        TEXTURE0 = 33984,
        TEXTURE1 = 33985,
        TEXTURE2 = 33986,
        TEXTURE3 = 33987,
        TEXTURE4 = 33988,
        TEXTURE5 = 33989,
        TEXTURE6 = 33990,
        TEXTURE7 = 33991,
        TEXTURE8 = 33992,
        TEXTURE9 = 33993,
        TEXTURE10 = 33994,
        TEXTURE11 = 33995,
        TEXTURE12 = 33996,
        TEXTURE13 = 33997,
        TEXTURE14 = 33998,
        TEXTURE15 = 33999,
        TEXTURE16 = 34000,
        TEXTURE17 = 34001,
        TEXTURE18 = 34002,
        TEXTURE19 = 34003,
        TEXTURE20 = 34004,
        TEXTURE21 = 34005,
        TEXTURE22 = 34006,
        TEXTURE23 = 34007,
        TEXTURE24 = 34008,
        TEXTURE25 = 34009,
        TEXTURE26 = 34010,
        TEXTURE27 = 34011,
        TEXTURE28 = 34012,
        TEXTURE29 = 34013,
        TEXTURE30 = 34014,
        TEXTURE31 = 34015,
        ACTIVE_TEXTURE = 34016,
        REPEAT = 10497,
        CLAMP_TO_EDGE = 33071,
        MIRRORED_REPEAT = 33648,
        FLOAT_VEC2 = 35664,
        FLOAT_VEC3 = 35665,
        FLOAT_VEC4 = 35666,
        INT_VEC2 = 35667,
        INT_VEC3 = 35668,
        INT_VEC4 = 35669,
        BOOL = 35670,
        BOOL_VEC2 = 35671,
        BOOL_VEC3 = 35672,
        BOOL_VEC4 = 35673,
        FLOAT_MAT2 = 35674,
        FLOAT_MAT3 = 35675,
        FLOAT_MAT4 = 35676,
        SAMPLER_2D = 35678,
        SAMPLER_CUBE = 35680,
        LOW_FLOAT = 36336,
        MEDIUM_FLOAT = 36337,
        HIGH_FLOAT = 36338,
        LOW_INT = 36339,
        MEDIUM_INT = 36340,
        HIGH_INT = 36341,
        FRAMEBUFFER = 36160,
        RENDERBUFFER = 36161,
        RGBA4 = 32854,
        RGB5_A1 = 32855,
        RGB565 = 36194,
        DEPTH_COMPONENT16 = 33189,
        STENCIL_INDEX = 6401,
        STENCIL_INDEX8 = 36168,
        DEPTH_STENCIL = 34041,
        RENDERBUFFER_WIDTH = 36162,
        RENDERBUFFER_HEIGHT = 36163,
        RENDERBUFFER_INTERNAL_FORMAT = 36164,
        RENDERBUFFER_RED_SIZE = 36176,
        RENDERBUFFER_GREEN_SIZE = 36177,
        RENDERBUFFER_BLUE_SIZE = 36178,
        RENDERBUFFER_ALPHA_SIZE = 36179,
        RENDERBUFFER_DEPTH_SIZE = 36180,
        RENDERBUFFER_STENCIL_SIZE = 36181,
        FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048,
        FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049,
        FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050,
        FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051,
        COLOR_ATTACHMENT0 = 36064,
        DEPTH_ATTACHMENT = 36096,
        STENCIL_ATTACHMENT = 36128,
        DEPTH_STENCIL_ATTACHMENT = 33306,
        NONE = 0,
        FRAMEBUFFER_COMPLETE = 36053,
        FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054,
        FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055,
        FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057,
        FRAMEBUFFER_UNSUPPORTED = 36061,
        FRAMEBUFFER_BINDING = 36006,
        RENDERBUFFER_BINDING = 36007,
        MAX_RENDERBUFFER_SIZE = 34024,
        INVALID_FRAMEBUFFER_OPERATION = 1286,
        UNPACK_FLIP_Y_WEBGL = 37440,
        UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441,
        UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443,
        READ_BUFFER = 3074,
        UNPACK_ROW_LENGTH = 3314,
        UNPACK_SKIP_ROWS = 3315,
        UNPACK_SKIP_PIXELS = 3316,
        PACK_ROW_LENGTH = 3330,
        PACK_SKIP_ROWS = 3331,
        PACK_SKIP_PIXELS = 3332,
        TEXTURE_BINDING_3D = 32874,
        UNPACK_SKIP_IMAGES = 32877,
        UNPACK_IMAGE_HEIGHT = 32878,
        MAX_3D_TEXTURE_SIZE = 32883,
        MAX_ELEMENTS_VERTICES = 33000,
        MAX_ELEMENTS_INDICES = 33001,
        MAX_TEXTURE_LOD_BIAS = 34045,
        MAX_FRAGMENT_UNIFORM_COMPONENTS = 35657,
        MAX_VERTEX_UNIFORM_COMPONENTS = 35658,
        MAX_ARRAY_TEXTURE_LAYERS = 35071,
        MIN_PROGRAM_TEXEL_OFFSET = 35076,
        MAX_PROGRAM_TEXEL_OFFSET = 35077,
        MAX_VARYING_COMPONENTS = 35659,
        FRAGMENT_SHADER_DERIVATIVE_HINT = 35723,
        RASTERIZER_DISCARD = 35977,
        VERTEX_ARRAY_BINDING = 34229,
        MAX_VERTEX_OUTPUT_COMPONENTS = 37154,
        MAX_FRAGMENT_INPUT_COMPONENTS = 37157,
        MAX_SERVER_WAIT_TIMEOUT = 37137,
        MAX_ELEMENT_INDEX = 36203,
        RED = 6403,
        RGB8 = 32849,
        RGBA8 = 32856,
        RGB10_A2 = 32857,
        TEXTURE_3D = 32879,
        TEXTURE_WRAP_R = 32882,
        TEXTURE_MIN_LOD = 33082,
        TEXTURE_MAX_LOD = 33083,
        TEXTURE_BASE_LEVEL = 33084,
        TEXTURE_MAX_LEVEL = 33085,
        TEXTURE_COMPARE_MODE = 34892,
        TEXTURE_COMPARE_FUNC = 34893,
        SRGB = 35904,
        SRGB8 = 35905,
        SRGB8_ALPHA8 = 35907,
        COMPARE_REF_TO_TEXTURE = 34894,
        RGBA32F = 34836,
        RGB32F = 34837,
        RGBA16F = 34842,
        RGB16F = 34843,
        TEXTURE_2D_ARRAY = 35866,
        TEXTURE_BINDING_2D_ARRAY = 35869,
        R11F_G11F_B10F = 35898,
        RGB9_E5 = 35901,
        RGBA32UI = 36208,
        RGB32UI = 36209,
        RGBA16UI = 36214,
        RGB16UI = 36215,
        RGBA8UI = 36220,
        RGB8UI = 36221,
        RGBA32I = 36226,
        RGB32I = 36227,
        RGBA16I = 36232,
        RGB16I = 36233,
        RGBA8I = 36238,
        RGB8I = 36239,
        RED_INTEGER = 36244,
        RGB_INTEGER = 36248,
        RGBA_INTEGER = 36249,
        R8 = 33321,
        RG8 = 33323,
        RGB10_A2UI = 36975,
        TEXTURE_IMMUTABLE_FORMAT = 37167,
        TEXTURE_IMMUTABLE_LEVELS = 33503,
        UNSIGNED_INT_2_10_10_10_REV = 33640,
        UNSIGNED_INT_10F_11F_11F_REV = 35899,
        UNSIGNED_INT_5_9_9_9_REV = 35902,
        FLOAT_32_UNSIGNED_INT_24_8_REV = 36269,
        HALF_FLOAT = 5131,
        RG = 33319,
        RG_INTEGER = 33320,
        INT_2_10_10_10_REV = 36255,
        CURRENT_QUERY = 34917,
        QUERY_RESULT = 34918,
        QUERY_RESULT_AVAILABLE = 34919,
        ANY_SAMPLES_PASSED = 35887,
        ANY_SAMPLES_PASSED_CONSERVATIVE = 36202,
        MAX_DRAW_BUFFERS = 34852,
        DRAW_BUFFER0 = 34853,
        DRAW_BUFFER1 = 34854,
        DRAW_BUFFER2 = 34855,
        DRAW_BUFFER3 = 34856,
        DRAW_BUFFER4 = 34857,
        DRAW_BUFFER5 = 34858,
        DRAW_BUFFER6 = 34859,
        DRAW_BUFFER7 = 34860,
        DRAW_BUFFER8 = 34861,
        DRAW_BUFFER9 = 34862,
        DRAW_BUFFER10 = 34863,
        DRAW_BUFFER11 = 34864,
        DRAW_BUFFER12 = 34865,
        DRAW_BUFFER13 = 34866,
        DRAW_BUFFER14 = 34867,
        DRAW_BUFFER15 = 34868,
        MAX_COLOR_ATTACHMENTS = 36063,
        COLOR_ATTACHMENT1 = 36065,
        COLOR_ATTACHMENT2 = 36066,
        COLOR_ATTACHMENT3 = 36067,
        COLOR_ATTACHMENT4 = 36068,
        COLOR_ATTACHMENT5 = 36069,
        COLOR_ATTACHMENT6 = 36070,
        COLOR_ATTACHMENT7 = 36071,
        COLOR_ATTACHMENT8 = 36072,
        COLOR_ATTACHMENT9 = 36073,
        COLOR_ATTACHMENT10 = 36074,
        COLOR_ATTACHMENT11 = 36075,
        COLOR_ATTACHMENT12 = 36076,
        COLOR_ATTACHMENT13 = 36077,
        COLOR_ATTACHMENT14 = 36078,
        COLOR_ATTACHMENT15 = 36079,
        SAMPLER_3D = 35679,
        SAMPLER_2D_SHADOW = 35682,
        SAMPLER_2D_ARRAY = 36289,
        SAMPLER_2D_ARRAY_SHADOW = 36292,
        SAMPLER_CUBE_SHADOW = 36293,
        INT_SAMPLER_2D = 36298,
        INT_SAMPLER_3D = 36299,
        INT_SAMPLER_CUBE = 36300,
        INT_SAMPLER_2D_ARRAY = 36303,
        UNSIGNED_INT_SAMPLER_2D = 36306,
        UNSIGNED_INT_SAMPLER_3D = 36307,
        UNSIGNED_INT_SAMPLER_CUBE = 36308,
        UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311,
        MAX_SAMPLES = 36183,
        SAMPLER_BINDING = 35097,
        PIXEL_PACK_BUFFER = 35051,
        PIXEL_UNPACK_BUFFER = 35052,
        PIXEL_PACK_BUFFER_BINDING = 35053,
        PIXEL_UNPACK_BUFFER_BINDING = 35055,
        COPY_READ_BUFFER = 36662,
        COPY_WRITE_BUFFER = 36663,
        COPY_READ_BUFFER_BINDING = 36662,
        COPY_WRITE_BUFFER_BINDING = 36663,
        FLOAT_MAT2x3 = 35685,
        FLOAT_MAT2x4 = 35686,
        FLOAT_MAT3x2 = 35687,
        FLOAT_MAT3x4 = 35688,
        FLOAT_MAT4x2 = 35689,
        FLOAT_MAT4x3 = 35690,
        UNSIGNED_INT_VEC2 = 36294,
        UNSIGNED_INT_VEC3 = 36295,
        UNSIGNED_INT_VEC4 = 36296,
        UNSIGNED_NORMALIZED = 35863,
        SIGNED_NORMALIZED = 36764,
        VERTEX_ATTRIB_ARRAY_INTEGER = 35069,
        VERTEX_ATTRIB_ARRAY_DIVISOR = 35070,
        TRANSFORM_FEEDBACK_BUFFER_MODE = 35967,
        MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 35968,
        TRANSFORM_FEEDBACK_VARYINGS = 35971,
        TRANSFORM_FEEDBACK_BUFFER_START = 35972,
        TRANSFORM_FEEDBACK_BUFFER_SIZE = 35973,
        TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 35976,
        MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 35978,
        MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 35979,
        INTERLEAVED_ATTRIBS = 35980,
        SEPARATE_ATTRIBS = 35981,
        TRANSFORM_FEEDBACK_BUFFER = 35982,
        TRANSFORM_FEEDBACK_BUFFER_BINDING = 35983,
        TRANSFORM_FEEDBACK = 36386,
        TRANSFORM_FEEDBACK_PAUSED = 36387,
        TRANSFORM_FEEDBACK_ACTIVE = 36388,
        TRANSFORM_FEEDBACK_BINDING = 36389,
        FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 33296,
        FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 33297,
        FRAMEBUFFER_ATTACHMENT_RED_SIZE = 33298,
        FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 33299,
        FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 33300,
        FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 33301,
        FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 33302,
        FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 33303,
        FRAMEBUFFER_DEFAULT = 33304,
        DEPTH24_STENCIL8 = 35056,
        DRAW_FRAMEBUFFER_BINDING = 36006,
        READ_FRAMEBUFFER = 36008,
        DRAW_FRAMEBUFFER = 36009,
        READ_FRAMEBUFFER_BINDING = 36010,
        RENDERBUFFER_SAMPLES = 36011,
        FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 36052,
        FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 36182,
        UNIFORM_BUFFER = 35345,
        UNIFORM_BUFFER_BINDING = 35368,
        UNIFORM_BUFFER_START = 35369,
        UNIFORM_BUFFER_SIZE = 35370,
        MAX_VERTEX_UNIFORM_BLOCKS = 35371,
        MAX_FRAGMENT_UNIFORM_BLOCKS = 35373,
        MAX_COMBINED_UNIFORM_BLOCKS = 35374,
        MAX_UNIFORM_BUFFER_BINDINGS = 35375,
        MAX_UNIFORM_BLOCK_SIZE = 35376,
        MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 35377,
        MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 35379,
        UNIFORM_BUFFER_OFFSET_ALIGNMENT = 35380,
        ACTIVE_UNIFORM_BLOCKS = 35382,
        UNIFORM_TYPE = 35383,
        UNIFORM_SIZE = 35384,
        UNIFORM_BLOCK_INDEX = 35386,
        UNIFORM_OFFSET = 35387,
        UNIFORM_ARRAY_STRIDE = 35388,
        UNIFORM_MATRIX_STRIDE = 35389,
        UNIFORM_IS_ROW_MAJOR = 35390,
        UNIFORM_BLOCK_BINDING = 35391,
        UNIFORM_BLOCK_DATA_SIZE = 35392,
        UNIFORM_BLOCK_ACTIVE_UNIFORMS = 35394,
        UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395,
        UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396,
        UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398,
        OBJECT_TYPE = 37138,
        SYNC_CONDITION = 37139,
        SYNC_STATUS = 37140,
        SYNC_FLAGS = 37141,
        SYNC_FENCE = 37142,
        SYNC_GPU_COMMANDS_COMPLETE = 37143,
        UNSIGNALED = 37144,
        SIGNALED = 37145,
        ALREADY_SIGNALED = 37146,
        TIMEOUT_EXPIRED = 37147,
        CONDITION_SATISFIED = 37148,
        WAIT_FAILED = 37149,
        SYNC_FLUSH_COMMANDS_BIT = 1,
        COLOR = 6144,
        STENCIL = 6146,
        MIN = 32775,
        DEPTH_COMPONENT24 = 33190,
        STREAM_READ = 35041,
        STREAM_COPY = 35042,
        STATIC_READ = 35045,
        STATIC_COPY = 35046,
        DYNAMIC_READ = 35049,
        DYNAMIC_COPY = 35050,
        DEPTH_COMPONENT32F = 36012,
        DEPTH32F_STENCIL8 = 36013,
        INVALID_INDEX = 4294967295,
        TIMEOUT_IGNORED = -1,
        MAX_CLIENT_WAIT_TIMEOUT_WEBGL = 37447,
        VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE = 35070,
        UNMASKED_VENDOR_WEBGL = 37445,
        UNMASKED_RENDERER_WEBGL = 37446,
        MAX_TEXTURE_MAX_ANISOTROPY_EXT = 34047,
        TEXTURE_MAX_ANISOTROPY_EXT = 34046,
        COMPRESSED_RGB_S3TC_DXT1_EXT = 33776,
        COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777,
        COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778,
        COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779,
        COMPRESSED_R11_EAC = 37488,
        COMPRESSED_SIGNED_R11_EAC = 37489,
        COMPRESSED_RG11_EAC = 37490,
        COMPRESSED_SIGNED_RG11_EAC = 37491,
        COMPRESSED_RGB8_ETC2 = 37492,
        COMPRESSED_RGBA8_ETC2_EAC = 37493,
        COMPRESSED_SRGB8_ETC2 = 37494,
        COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37495,
        COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37496,
        COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37497,
        COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840,
        COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842,
        COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841,
        COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843,
        COMPRESSED_RGB_ETC1_WEBGL = 36196,
        COMPRESSED_RGB_ATC_WEBGL = 35986,
        COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35986,
        COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798,
        UNSIGNED_INT_24_8_WEBGL = 34042,
        HALF_FLOAT_OES = 36193,
        RGBA32F_EXT = 34836,
        RGB32F_EXT = 34837,
        FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT = 33297,
        UNSIGNED_NORMALIZED_EXT = 35863,
        MIN_EXT = 32775,
        MAX_EXT = 32776,
        SRGB_EXT = 35904,
        SRGB_ALPHA_EXT = 35906,
        SRGB8_ALPHA8_EXT = 35907,
        FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT = 33296,
        FRAGMENT_SHADER_DERIVATIVE_HINT_OES = 35723,
        COLOR_ATTACHMENT0_WEBGL = 36064,
        COLOR_ATTACHMENT1_WEBGL = 36065,
        COLOR_ATTACHMENT2_WEBGL = 36066,
        COLOR_ATTACHMENT3_WEBGL = 36067,
        COLOR_ATTACHMENT4_WEBGL = 36068,
        COLOR_ATTACHMENT5_WEBGL = 36069,
        COLOR_ATTACHMENT6_WEBGL = 36070,
        COLOR_ATTACHMENT7_WEBGL = 36071,
        COLOR_ATTACHMENT8_WEBGL = 36072,
        COLOR_ATTACHMENT9_WEBGL = 36073,
        COLOR_ATTACHMENT10_WEBGL = 36074,
        COLOR_ATTACHMENT11_WEBGL = 36075,
        COLOR_ATTACHMENT12_WEBGL = 36076,
        COLOR_ATTACHMENT13_WEBGL = 36077,
        COLOR_ATTACHMENT14_WEBGL = 36078,
        COLOR_ATTACHMENT15_WEBGL = 36079,
        DRAW_BUFFER0_WEBGL = 34853,
        DRAW_BUFFER1_WEBGL = 34854,
        DRAW_BUFFER2_WEBGL = 34855,
        DRAW_BUFFER3_WEBGL = 34856,
        DRAW_BUFFER4_WEBGL = 34857,
        DRAW_BUFFER5_WEBGL = 34858,
        DRAW_BUFFER6_WEBGL = 34859,
        DRAW_BUFFER7_WEBGL = 34860,
        DRAW_BUFFER8_WEBGL = 34861,
        DRAW_BUFFER9_WEBGL = 34862,
        DRAW_BUFFER10_WEBGL = 34863,
        DRAW_BUFFER11_WEBGL = 34864,
        DRAW_BUFFER12_WEBGL = 34865,
        DRAW_BUFFER13_WEBGL = 34866,
        DRAW_BUFFER14_WEBGL = 34867,
        DRAW_BUFFER15_WEBGL = 34868,
        MAX_COLOR_ATTACHMENTS_WEBGL = 36063,
        MAX_DRAW_BUFFERS_WEBGL = 34852,
        VERTEX_ARRAY_BINDING_OES = 34229,
        QUERY_COUNTER_BITS_EXT = 34916,
        CURRENT_QUERY_EXT = 34917,
        QUERY_RESULT_EXT = 34918,
        QUERY_RESULT_AVAILABLE_EXT = 34919,
        TIME_ELAPSED_EXT = 35007,
        TIMESTAMP_EXT = 36392,
        GPU_DISJOINT_EXT = 36795
    }
    function wx_init(): void;
}
declare module rf {
    const rf_v3_identity: number[];
    const rf_m3_identity: number[];
    const rf_m2_identity: number[];
    const rf_m3_temp: Float32Array;
}
interface IArrayBase {
    clone(): IArrayBase;
    buffer: ArrayBuffer;
    set(array: ArrayLike<number> | IArrayBase, offset?: number): void;
    readonly length: number;
    [n: number]: number;
}
interface IMatrix3D extends IArrayBase {
    m3_identity(from?: ArrayLike<number>): IMatrix3D;
    m3_append(m3: ArrayLike<number> | IArrayBase, prepend?: boolean, from?: ArrayLike<number>): IMatrix3D;
    m3_rotation(degrees: number, axis: IVector3D | number[], prepend?: boolean, from?: ArrayLike<number>): IMatrix3D;
    m3_scale(x: number, y: number, z: number, prepend?: boolean, from?: ArrayLike<number>): IMatrix3D;
    m3_translation(x: number, y: number, z: number, prepend?: boolean, from?: ArrayLike<number>): IMatrix3D;
    m3_invert(from?: ArrayLike<number>, pos?: boolean): IMatrix3D;
    m3_decompose(pos: IVector3D | number[], rot: IVector3D | number[], sca: IVector3D | number[], orientationStyle?: rf.Orientation3D): any;
    m3_recompose(pos: IVector3D | number[], rot: IVector3D | number[], sca: IVector3D | number[], orientationStyle?: rf.Orientation3D): IMatrix3D;
    m3_copyColumnFrom(column: number, vector3D: IVector3D | number[]): any;
    m3_copyColumnTo(column: number, vector3D: IVector3D | number[]): any;
    m3_transformVector(v: IVector3D | number[], result?: IVector3D | number[]): any;
    m3_transformVectors(vin: ArrayLike<number>, vout: Float32Array | number[]): any;
    m3_transformRotation(v: IVector3D | number[], result?: IVector3D | number[]): any;
    m3_getMaxScaleOnAxis(): any;
    m3_toString(scale: number): any;
}
interface IVector3D extends IArrayBase {
    x: number;
    y: number;
    z: number;
    w: number;
    v3_lengthSquared: number;
    v2_length: number;
    v3_length: number;
    v3_add(v: IVector3D | ArrayLike<number>, out?: IVector3D): IVector3D;
    v3_sub(v: IVector3D | ArrayLike<number>, out?: IVector3D): IVector3D;
    v3_scale(v: number, out?: IVector3D): any;
    v4_scale(v: number): any;
    v3_normalize(from?: ArrayLike<number>): any;
    v3_dotProduct(t: ArrayLike<number>): any;
    v3_crossProduct(t: ArrayLike<number>, out?: IVector3D | number[]): any;
    v3_applyMatrix4(e: ArrayLike<number>, out?: IVector3D | number[]): any;
}
interface IMatrixComposeData {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotaiton: number;
}
interface IMatrix extends IArrayBase {
    m2_identity(): void;
    m2_append(m2: ArrayLike<number> | IArrayBase, prepend?: boolean, from?: ArrayLike<number>): IMatrix;
    m2_scale(scalex: number, scaley: number): void;
    m2_rotate(angle: number): void;
    m2_translation(x: number, y: number): void;
    m2_transformVector(v: IVector3D | number[], result?: IVector3D | number[]): IVector3D;
    m2_decompose(result?: IMatrixComposeData): IMatrixComposeData;
    m2_recompose(value: IMatrixComposeData): IMatrix;
    m2_clone(): IMatrix;
}
interface Float32Array extends IMatrix3D, IMatrix, IVector3D {
}
declare module rf {
    const enum Orientation3D {
        EULER_ANGLES = 0,
        AXIS_ANGLE = 1,
        QUATERNION = 2
    }
    function newMatrix3D(v?: ArrayLike<number> | ArrayBuffer): Float32Array;
    function newMatrix(v?: ArrayLike<number> | ArrayBuffer): Float32Array;
    function newVector3D(x?: ArrayLike<number> | ArrayBuffer | number, y?: number, z?: number, w?: number): Float32Array;
    function matrix2d_clearScale(matrix: IMatrix): void;
    function qua_lerp(qa: IVector3D, qb: IVector3D, t: number, out?: IVector3D): IVector3D;
    function qua_slerp(qa: IVector3D, qb: IVector3D, t: number, out?: IVector3D): IVector3D;
    function pos_lerp(ap: IVector3D, bp: IVector3D, t: number, out?: IVector3D): IVector3D;
}
declare module rf {
    type PosKey = "x" | "y";
    type SizeKey = "width" | "height";
    interface Point2D {
        x: number;
        y: number;
    }
    interface Point3D extends Point2D {
        z: number;
    }
    interface Point3DW extends Point3D {
        w: number;
    }
    interface Size extends Point2D {
        w: number;
        h: number;
    }
    function size_checkIn(size: Size, nx: number, ny: number): boolean;
    function range_checkIn(l: number, r: number, t: number, b: number, x: number, y: number, scale: number): boolean;
    function size_intersection(a: Size, b: Size, c?: Size): Size;
    interface IFrame extends Size {
        ix: number;
        iy: number;
    }
    interface IUVFrame extends IFrame {
        ul: number;
        ur: number;
        vt: number;
        vb: number;
    }
    let rgb_color_temp: IVector3D;
    function hexToCSS(d: number, a?: number): string;
    function toRGB(color: number, out?: IVector3D): IVector3D;
    function toRGBA(color: number, out?: IVector3D): IVector3D;
    function toCSS(color: IVector3D): string;
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        get length(): Number;
    }
    class Rect extends Point {
        w: number;
        h: number;
        constructor(x?: number, y?: number, w?: number, h?: number);
        clone(): Rect;
    }
    let RADIANS_TO_DEGREES: number;
    let DEGREES_TO_RADIANS: number;
    let tempAxeX: IVector3D;
    let tempAxeY: IVector3D;
    let tempAxeZ: IVector3D;
    let X_AXIS: IVector3D;
    let Y_AXIS: IVector3D;
    let Z_AXIS: IVector3D;
    let PI2: number;
    let RAW_DATA_CONTAINER: Float32Array;
    let TEMP_MATRIX3D: IMatrix3D;
    let TEMP_MATRIX2D: IMatrix;
    let TEMP_VECTOR3D: IVector3D;
    let TEMP_MatrixComposeData: IMatrixComposeData;
    interface IFunction {
        func: Function;
        thisobj: any;
    }
    function newCallBackFunction(func: Function, thisobj: any): IFunction;
    function callFunction(func: IFunction): void;
    interface Location {
        latitude: number;
        longitude: number;
    }
    interface LocationConstructor {
        getDist(l1: Location, l2: Location): number;
    }
    var Location: LocationConstructor;
    let EMPTY_POINT2D: Point;
    let EMPTY_POINT2D_2: Point;
    let EMPTY_POINT2D_3: Point;
    let EMPTY_SIZE: Size;
    function m2dTransform(matrix: ArrayLike<number>, p: number[], out: number[]): void;
}
declare module rf {
    class BitmapData {
        static FLIP_Y: boolean;
        private _rect;
        private _transparent;
        canvas: HTMLCanvasElement;
        _context: CanvasRenderingContext2D;
        get context(): CanvasRenderingContext2D;
        constructor(width: number, height: number, transparent?: boolean, fillColor?: number);
        static fromImageElement(img: HTMLImageElement): BitmapData;
        get width(): number;
        get height(): number;
        get rect(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        getImageData(x: number, y: number, w: number, h: number): ImageData;
        copyPixels(sourceBitmapData: BitmapData, sourceRect: Size, destPoint: Point2D): void;
        copyPixels(sourceBitmapData: HTMLImageElement | HTMLCanvasElement, sourceRect: Size, destPoint: Point2D): void;
        draw(source: BitmapData): void;
        draw(source: HTMLImageElement): void;
        fillRect(x: number, y: number, width: number, height: number, css: string | CanvasGradient | CanvasPattern): void;
    }
    class MaxRectsBinPack {
        static BESTSHORTSIDEFIT: number;
        static BESTLONGSIDEFIT: number;
        static BESTAREAFIT: number;
        static BOTTOMLEFTRULE: number;
        static CONTACTPOINTRULE: number;
        binWidth: number;
        binHeight: number;
        allowRotations: Boolean;
        usedRects: Rect[];
        freeRects: Rect[];
        private score1;
        private score2;
        private bestShortSideFit;
        private bestLongSideFit;
        constructor(width: number, height: number, rotations?: boolean);
        private count;
        insert(width: number, height: number, method?: number): Rect;
        private insert2;
        private placeRect;
        private scoreRect;
        private occupancy;
        private findPositionForNewNodeBottomLeft;
        private findPositionForNewNodeBestShortSideFit;
        private findPositionForNewNodeBestLongSideFit;
        private findPositionForNewNodeBestAreaFit;
        private commonIntervalLength;
        private contactPointScoreNode;
        private findPositionForNewNodeContactPoint;
        private splitFreeNode;
        private pruneFreeList;
        private isContainedIn;
    }
}
declare namespace rf {
    class EngineEvent {
        static VISIBILITY_CHANGE: string;
        static FPS_CHANGE: string;
    }
    let nativeMouseX: number;
    let nativeMouseY: number;
    let originMouseX: number;
    let originMouseY: number;
    var lastUpdateTime: number;
    var lastUpdateDate: number;
    function getUTCTime(time: number): number;
    function getFormatTime(time: number, format: string, isRaw?: boolean): string;
    function getProxTime(sec: number): string;
    function setDisplayArea(width: number, height: number): void;
    var contextWidth: number;
    var contextHeight: number;
    var appscale: number;
    function setContextMatrix(width: number, height: number, x: number, y: number): void;
    const enum IDeviceOrientation {
        PORTRAIT = "portrait",
        LANDSCAPE = "landscape",
        LANDSCAPE_REVERSE = "landscapeReverse"
    }
    var deviceOrientation: IDeviceOrientation;
    var currentOrientation: IDeviceOrientation;
    function debugDeviceOrientation(orientation: any): void;
}
declare module rf {
    type $CallbackInfo = CallbackInfo<Function>;
    class CallbackInfo<T extends Function> implements IRecyclable {
        callback: T;
        args: any[];
        thisObj: any;
        doRecycle: boolean;
        time: number;
        constructor();
        init(callback: T, thisObj?: any, args?: any[]): void;
        checkHandle(callback: T, thisObj: any): boolean;
        execute(doRecycle?: boolean): any;
        call(...args: any[]): any;
        callAndRecycle(...args: any[]): any;
        onRecycle(): void;
        recycle: {
            (): any;
        };
        static get<T extends Function>(callback: T, thisObj?: any, ...args: any[]): CallbackInfo<Function>;
    }
}
declare module rf {
    interface IBitmapSourceVO extends IUVFrame {
        scale: number;
        name: string;
        used: number;
        time: number;
        rw: number;
        rh: number;
        tw: number;
        th: number;
    }
    interface IFightSourceVO extends IBitmapSourceVO {
        f_ox: number;
        f_oy: number;
    }
    var refresh_uv_setting: number;
    function refreshUV(vo: IBitmapSourceVO, mw: number, mh: number): void;
    class BitmapSourceArea {
        name: number;
        source: BitmapSource;
        frames: {
            [key: string]: IBitmapSourceVO;
        };
        l: number;
        r: number;
        t: number;
        b: number;
        init(): void;
        getArea(name: string, x: number, y: number, w: number, h: number): IBitmapSourceVO;
        createFrameArea(name: string, frame: IFrame): IBitmapSourceVO;
        getEmptyArea(name: string, sw: number, sh: number): IBitmapSourceVO;
        getUnusedArea(name: string, sw: number, sh: number): IBitmapSourceVO;
    }
    class MixBitmapSourceArea extends BitmapSourceArea {
        maxRect: MaxRectsBinPack;
        init(): void;
        getEmptyArea(name: string, sw: number, sh: number): IBitmapSourceVO;
    }
    class BitmapSource extends MiniDispatcher {
        static DEFAULT: number;
        static PACK: number;
        constructor();
        name: string;
        textureData: ITextureData;
        width: number;
        height: number;
        originU: number;
        originV: number;
        areas: {
            [name: number]: BitmapSourceArea;
        };
        bmd: BitmapData | HTMLImageElement | HTMLCanvasElement;
        status: LoadStates;
        texture: Texture;
        create(name: string, bmd: BitmapData | HTMLCanvasElement, pack?: boolean): BitmapSource;
        setArea(name: number, x: number, y: number, w: number, h: number): BitmapSourceArea;
        setSourceVO(name: string, w: number, h: number, area?: number, sw?: number, sh?: number): IBitmapSourceVO;
        getSourceVO(name: string | number, area?: number): IBitmapSourceVO;
        sp: Sprite;
        getSprite(): Sprite;
        drawimg(img: HTMLImageElement | HTMLCanvasElement | BitmapData, x: number, y: number, w?: number, h?: number): void;
        clearBitmap(vo: IBitmapSourceVO): void;
        clearArea(area?: number): any;
        uploadContext(program: Program3D, variable: string): void;
        dispose(): void;
    }
    class UrlBitmapSource extends BitmapSource {
        completeFuncs: Function[];
        perfix: string;
        constructor(perfix: string, url: string);
        load(): void;
        loadImageComplete(event: EventX): void;
    }
    let bitmapSources: {
        [key: string]: BitmapSource;
    };
    let componentSource: BitmapSource;
    let textSource: BitmapSource;
    let textSource2: BitmapSource;
    function createBitmapSource(name: string, w: number, h: number, origin?: boolean): BitmapSource;
    function createUrlSource<T extends UrlBitmapSource>(perfix: string, url: string, extendtion?: ExtensionDefine, complete?: Function, CLS?: {
        new (perfix: string, url: string): T;
    }): T;
}
declare module rf {
    class Quaternion {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x?: number, y?: number, z?: number, w?: number);
        static lerp(qa: Point3DW, qb: Point3DW, percent: number): Quaternion;
        fromMatrix3D(m: IMatrix3D): this;
        toMatrix3D(target?: IMatrix3D): IMatrix3D;
        fromAxisAngle(axis: Point3DW, angleInRadians: number): void;
        conjugate(): void;
        toString(): string;
    }
}
declare module rf {
    class Ray {
        origin: IVector3D;
        direction: IVector3D;
        constructor(origion?: IVector3D, direction?: IVector3D);
        copyFrom(ray: Ray): Ray;
        at(t: number, target?: IVector3D): IVector3D;
        applyMatrix4(matrix: IMatrix3D): Ray;
        intersectsSphere(sphere: Sphere): boolean;
        distanceSqToPoint(point: IVector3D): number;
        intersectBox(box: IBox, target?: IVector3D): IVector3D;
        static diff: IVector3D;
        static edge1: IVector3D;
        static edge2: IVector3D;
        static normal: IVector3D;
        intersectTriangle(a: IVector3D, b: IVector3D, c: IVector3D, backfaceCulling: boolean, target: IVector3D): IVector3D;
    }
    interface IBox {
        minx: number;
        maxx: number;
        miny: number;
        maxy: number;
        minz: number;
        maxz: number;
    }
}
declare module rf {
    interface IMaterialData extends IData {
        depthMask: boolean;
        passCompareMode: number;
        srcFactor: number;
        dstFactor: number;
        cull: number;
        alphaTest: number;
        diffTex?: ITextureData;
        specularTex?: ITextureData;
        normalTex?: ITextureData;
        emissiveTex?: ITextureData;
    }
    interface IMeshData extends IData {
        vertex: Float32Array;
        index: Uint16Array;
        variables: {
            [key: string]: IVariable;
        };
        numVertices: number;
        numTriangles: number;
        data32PerVertex: number;
        vertexBuffer: VertexBuffer3D;
        indexBuffer: IndexBuffer3D;
        hitarea: HitArea;
        nameLabelY: number;
    }
    interface IBone extends IData {
        inv: IMatrix3D;
        matrix: IMatrix3D;
        sceneTransform: Float32Array;
        name: string;
        index: number;
        parent: IBone;
        children: IBone[];
    }
    interface ISkeletonData extends IData {
        vertex: Float32Array;
        rootBone: IBone;
        root?: IBone;
        data32PerVertex: number;
        numVertices: number;
        boneCount: number;
    }
    interface ISkeletonMeshData extends IData {
        mesh: IMeshData;
        material: IMaterialData;
        skeletonData: ISkeletonData;
        anims: string[];
        inited: boolean;
        skeleton: Skeleton;
        shadowCast: boolean;
        sun: boolean;
    }
    interface ISkeletonMatrixData {
        pos: IVector3D;
        qua: IVector3D;
    }
    interface ISkeletonCalcTarget {
        pos: IVector3D;
        qua: IVector3D;
        mat: IMatrix3D;
        out: IVector3D;
    }
    interface ISkeletonAnimationData extends IData {
        skeleton: Skeleton;
        matrices: Float32Array[];
        boneTransform: {
            [key: string]: IMatrix3D;
        }[];
        boneMatrix3D: {
            [key: string]: ISkeletonMatrixData;
        }[];
        duration: number;
        eDuration: number;
        totalFrame: number;
        name: string;
        frames: {
            [key: string]: Float32Array;
        };
    }
    interface IParticlePropertyData {
        delay: number;
        duration: number;
        index: number;
        startTime: number;
        total: number;
        totalTime: number;
    }
    interface IParticleRuntimeData extends IMeshData {
        props: IParticlePropertyData[];
    }
    interface IParticleSettingData {
        offset: number;
        speed: number;
        pos: IVector3D;
        rot: IVector3D;
    }
    interface IParticleNodeInfo {
        name: string;
        type: number;
        key: string;
        vertexFunction: string;
        fragmentFunction: string;
    }
    interface IParticleTimeNodeInfo extends IParticleNodeInfo {
        usesDuration: boolean;
        usesLooping: boolean;
        usesDelay: boolean;
    }
    interface IParticleFollowNodeInfo extends IParticleNodeInfo {
    }
    interface IParticleScaleNodeInfo extends IParticleNodeInfo {
        scaleType: number;
        usesCycle: boolean;
        usesPhase: boolean;
    }
    interface IParticleSegmentColorNodeInfo extends IParticleNodeInfo {
        usesMul: boolean;
        usesAdd: boolean;
        len: number;
        mul: number;
        add: number;
        data: Float32Array;
    }
    interface IParticleSpriteSheetAnimNodeInfo extends IParticleNodeInfo {
        usesCycle: boolean;
        usesPhase: boolean;
        totalFrames: number;
        colum: number;
        rows: number;
        data: Float32Array;
    }
    interface IParticleData {
        material: IMaterialData;
        mesh: IMeshData;
        runtime: IParticleRuntimeData;
        setting: IParticleSettingData;
        nodes: {
            [key: string]: IParticleNodeInfo;
        };
    }
    interface ISkillEvent {
        type: SkillEventConst;
        time: number;
        key: string;
        next: ISkillEvent;
        pre: ISkillEvent;
        x: number;
        y: number;
        z: number;
        rx: number;
        ry: number;
        rz: number;
        ou: number;
        ov: number;
        su: number;
        sv: number;
        mr: number;
        mg: number;
        mb: number;
        ma: number;
        ar: number;
        ag: number;
        ab: number;
        aa: number;
        fre: number;
        url: string;
        repart: number;
    }
    interface ISkillCreateEvent {
        type: SkillEventConst;
        time: number;
        url: string;
        x: number;
        y: number;
        z: number;
        rx: number;
        ry: number;
        rz: number;
    }
    interface ISkillPointData {
        events: ISkillEvent[];
        creates: ISkillEvent[];
        time: number;
        index: number;
    }
    interface ISkillLineData {
        desc: string;
        duration: number;
        loop: number;
        creates: ISkillCreateEvent[];
        events: ISkillEvent[];
    }
    interface ISkillData {
        duration: number;
        lines: ISkillLineData[];
    }
    const enum SkillEventConst {
        BIND = 0,
        COLOR = 1,
        ROT = 2,
        SCALE = 3,
        POS = 4,
        UV = 5,
        PLAY_ANIM = 6,
        SYNC_POSITION = 7,
        ALPHA = 8,
        BIND_ONCE = 9,
        TRACE = 10,
        EMIT = 11,
        SYNC_ROTATION = 12,
        SOUND = 13,
        COLLISION = 14,
        ROT_CASTER = 15,
        TRANS_CASTER = 16,
        USER_DEFINE = 17,
        LIU_GUANG = 18,
        WARYING = 19,
        LIGHT_RANGE = 20,
        CAMERA_MOVE = 21,
        ALPHA_THRESHOLD = 22,
        PLAY_SKILL = 23,
        SPRING_TRANSLATE = 24,
        ANIMSPEED = 25,
        SWORD_LIGHT = 26,
        LINES = 27,
        SWING_LINES = 28,
        CASTER_SCALE = 29,
        TEXTURE_CHANNEL = 30,
        COLOR_TRANFORM = 31,
        EVENTCOUNT = 32,
        INVALID_CREATE = 255,
        EFFECT_CREATE = 256,
        PARTICLE_CREATE = 257,
        LIGHT_CREATE = 258,
        SKILL_CREATE = 259,
        TEFFECT_CREATE = 260
    }
}
declare module rf {
    let vertex_ui_variable: {
        [key: string]: IVariable;
    };
    let vertex_ui_full_variable: {
        [key: string]: IVariable;
    };
    let vertex_mesh_variable: {
        [key: string]: IVariable;
    };
    let vertex_mesh_full_variable: {
        [key: string]: IVariable;
    };
    let vertex_skeleton_variable: {
        [key: string]: IVariable;
    };
    const EMPTY_MAX_NUMVERTICES: number;
    let empty_float32_pos: Float32Array;
    let empty_float32_normal: Float32Array;
    let empty_float32_tangent: Float32Array;
    let empty_float32_uv: Float32Array;
    let empty_float32_color: Float32Array;
    let empty_uint16_indexs: Uint16Array;
    let empty_float32_object: {
        [key: string]: Float32Array;
    };
    function createGeometry(data: {
        [key: string]: Float32Array;
    }, variables: {
        [key: string]: IVariable;
    }, numVertices: number, result?: Float32Array): Float32Array;
    interface IVariable {
        size: number;
        offset: number;
    }
    class VertexInfo {
        vertex: Float32Array;
        numVertices: number;
        data32PerVertex: number;
        variables: {
            [key: string]: IVariable;
        };
        constructor(value: number | Float32Array, data32PerVertex: number, variables?: {
            [key: string]: IVariable;
        });
        regVariable(variable: string, offset: number, size: number): void;
        get debug(): {};
    }
    interface IBounding {
        vertex: Float32Array;
        index: Uint16Array;
    }
    class Sphere {
        copyFrom(sphere: Sphere): void;
        change: boolean;
        radius: number;
        center: IVector3D;
        applyMatrix4(matrix: IMatrix3D, result?: Sphere): Sphere;
    }
    class OBB implements IBounding, IBox {
        constructor(bounding?: ArrayLike<number> | ArrayBuffer | number, maxx?: number, miny?: number, maxy?: number, minz?: number, maxz?: number);
        vertex: Float32Array;
        index: Uint16Array;
        static index: Uint16Array;
        change: boolean;
        minx: number;
        maxx: number;
        miny: number;
        maxy: number;
        minz: number;
        maxz: number;
        updateTriangle(): void;
        static updateOBBByGeometry(mesh: GeometryBase, out?: OBB): OBB;
    }
    interface IGeometry {
        vertex: VertexBuffer3D;
        index?: IndexBuffer3D;
    }
    class Temp_Float32Byte implements IRecyclable {
        constructor();
        data: Float32Array;
        data32PerVertex: number;
        numVertices: number;
        position: number;
        onSpawn(): void;
        set(array: ArrayLike<number>, offset?: number): void;
        toArray(): Float32Array;
    }
    function geometry_plane(width: number, height: number, position: number, variables: {
        [key: string]: IVariable;
    }, matrix3D?: IMatrix3D): void;
    class GeometryBase implements IGeometry {
        variables: {
            [key: string]: IVariable;
        };
        vertex: VertexBuffer3D;
        index: IndexBuffer3D;
        data: IMeshData;
        constructor(variables?: {
            [key: string]: IVariable;
        });
        data32PerVertex: number;
        numVertices: number;
        centerPoint: IVector3D;
        numTriangles: number;
        initData(data: IMeshData): void;
        setData(data: IMeshData): void;
        get pos(): any[];
        get uv(): any[];
        get triangles(): any[];
        calculateBoundingSphere(center: IVector3D, out?: Sphere): Sphere;
        uploadContext(camera: Camera, mesh: SceneObject, program: Program3D, now: number, interval: number): IMatrix3D;
    }
    interface ISkeletonJoint {
        index: number;
        name: string;
        inv: Float32Array;
        chind: ISkeletonJoint[];
        parent: ISkeletonJoint;
    }
    class SkeletonGeometry extends GeometryBase {
        skVertex: VertexBuffer3D;
        joints: {
            [key: string]: ISkeletonJoint;
        };
        jointroot: ISkeletonJoint;
    }
    class PlaneGeometry extends GeometryBase {
        create(width?: number, height?: number): this;
    }
    class BoxGeometry extends GeometryBase {
        create(width: number, height: number, depth: number): this;
    }
    class SkyBoxGeometry extends BoxGeometry {
        create(): this;
        uploadContext(camera: Camera, mesh: SceneObject, program: Program3D, now: number, interval: number): IMatrix3D;
    }
    function hsva(h: number, s: number, v: number, a: number): any[];
    class SphereGeometry extends GeometryBase {
        create(row: number, column: number, rad: number, color?: number[]): this;
    }
    class TorusGeomerty extends GeometryBase {
        create(row: number, column: number, irad: number, orad: number): this;
    }
}
declare module rf {
    class Material {
        cull: number;
        srcFactor: number;
        dstFactor: number;
        depthMask: boolean;
        passCompareMode: number;
        alphaTest: number;
        program: Program3D;
        diffTex: ITextureData;
        sun: boolean;
        createProgram(mesh: Mesh): Recyclable<Program3D>;
        initFilters(mesh: Mesh): void;
        setData(data: IMaterialData): void;
        uploadContextSetting(): void;
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        checkTexs(...args: any[]): boolean;
        getTextUrl(data: ITextureData): string;
    }
    class ShadowMaterial extends Material {
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        createProgram(mesh: Mesh): Recyclable<Program3D>;
    }
    class SkyBoxMaterial extends Material {
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        checkTexs(data: any): boolean;
        createProgram(mesh: Mesh): Recyclable<Program3D>;
    }
    class PhongMaterial extends Material {
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        createProgram(mesh: Mesh): Recyclable<Program3D>;
    }
}
declare module rf {
    interface IShaderCode {
        def: string;
        func: string;
        code: string;
    }
    interface IShaderSetting {
        skey: string;
        useEye?: boolean;
        usePos?: boolean;
        useQua2mat?: boolean;
        useNormal?: boolean;
        useColor?: boolean;
        useShadow?: boolean;
        useInvm?: boolean;
    }
    var IShaderSettingPros: string[];
    function newShaderCode(code: string, def: string, func: string): IShaderCode;
    class Shader {
        init(vertex_render_list: any, frament_render_list: any): void;
        vertex_render_list: (SkillEventConst | FilterConst)[];
        frament_render_list: (SkillEventConst | FilterConst)[];
        createProgram(target: {
            filters: {
                [key: string]: FilterBase;
            };
            shader?: boolean;
        }): Recyclable<Program3D>;
        createVertex2(filters: {
            [key: string]: FilterBase;
        }, setting?: IShaderSetting): string;
        createFragment2(filters: {
            [key: string]: FilterBase;
        }, setting?: IShaderSetting): string;
        static FUNC_QUA2MAT: string;
        static FUNC_SHADOW_ENCODE: string;
        static FUNC_SHADOW_DECODE: string;
        static FUNC_SAT: string;
        static FUNC_DOT_VALUE: string;
    }
}
declare module rf {
    var ROOT: Stage3D & IStage3DCamera;
    interface IMouse {
        mouseEnabled?: boolean;
        mouseChildren?: boolean;
        getObjectByPoint?(dx: number, dy: number, scale: number): DisplayObject;
    }
    interface IRenderOption {
        now: number;
        interval: number;
        rect: Size;
    }
    interface I3DRender extends IRecyclable {
        render?(camera: Camera, option: IRenderOption): void;
        __render_pre?: I3DRender;
        __render_next?: I3DRender;
        __graphics_next?: Sprite;
        $graphics?: Graphics;
        $vcIndex?: number;
        $sourceIndex?: number;
        program?: Program3D;
        changeStatus?: number;
        invSceneTransfrom?: IMatrix3D;
        updateBatchVCData?(refresh: boolean): void;
    }
    const enum DChange {
        trasnform = 1,
        alpha = 2,
        vertex = 4,
        vcdata = 8,
        ct = 16,
        area = 32,
        ca = 64,
        c_all = 80,
        ac = 96,
        ta = 3,
        batch = 12,
        base = 51,
        t_all = 19
    }
    class HitArea {
        allWays: boolean;
        left: number;
        right: number;
        top: number;
        bottom: number;
        front: number;
        back: number;
        clean(): void;
        combine(hitArea: HitArea, x: number, y: number): boolean;
        updateArea(x: number, y: number, z: number): boolean;
        checkIn(x: number, y: number, scale?: number): boolean;
        scale(value: number): void;
        toString(): string;
    }
    class DisplayObject extends MiniDispatcher implements IMouse {
        pool: RecyclablePool<DisplayObject>;
        hitArea: HitArea;
        mouseEnabled: boolean;
        mouseChildren: boolean;
        mousedown: boolean;
        mouseroll: boolean;
        pos: IVector3D;
        rot: IVector3D;
        sca: IVector3D;
        up: IVector3D;
        __childIndex: number;
        _x: number;
        _y: number;
        _z: number;
        w: number;
        h: number;
        _rotationX: number;
        _rotationY: number;
        _rotationZ: number;
        _scaleX: number;
        _scaleY: number;
        _scaleZ: number;
        _alpha: number;
        sceneAlpha: number;
        _visible: boolean;
        status: number;
        pivotZero: boolean;
        pivotPonumber: IVector3D;
        transform: IMatrix3D;
        sceneTransform: IMatrix3D;
        parent: DisplayObjectContainer;
        stage: Stage3D;
        name: string;
        locksize: boolean;
        tween: ScriptTween;
        filters: {
            [key: string]: FilterBase;
        };
        trandom: number;
        constructor();
        setChange(value: number, p?: number, c?: boolean): void;
        get visible(): boolean;
        set visible(value: boolean);
        cleanBatch(): void;
        set alpha(value: number);
        get alpha(): number;
        get scaleX(): number;
        set scaleX(value: number);
        get scaleY(): number;
        set scaleY(value: number);
        get scaleZ(): number;
        set scaleZ(value: number);
        get rotationX(): number;
        get rotationY(): number;
        get rotationZ(): number;
        set rotationX(value: number);
        set rotationY(value: number);
        set rotationZ(value: number);
        get rotation(): number;
        set rotation(value: number);
        get x(): number;
        get y(): number;
        get z(): number;
        set x(value: number);
        set y(value: number);
        set z(value: number);
        setPos(x: number, y: number, z?: number, update?: Boolean): void;
        set eulers(value: IVector3D);
        forwardPos(distance: number, target?: IVector3D): void;
        upPos(distance: number): void;
        rightPos(distance: number): void;
        setRot(rx: number, ry: number, rz: number, update?: Boolean): void;
        setRotRadians(rx: number, ry: number, rz: number, update?: Boolean): void;
        set scale(value: number);
        get scale(): number;
        setSca(sx: number, sy: number, sz: number, update?: Boolean): void;
        setPivotPonumber(x: number, y: number, z: number): void;
        setTransform(matrix: ArrayLike<number>): void;
        updateTransform(): void;
        preUpdateSceneTransformDate: number;
        updateSceneTransform(updateStatus?: number, parentSceneTransform?: IMatrix3D): number;
        updateBatchVCData(): void;
        remove(): void;
        __addchildflag: boolean;
        addToStage(): void;
        removeFromStage(): void;
        removeFromParent(): void;
        setSize(width: number, height: number): void;
        protected doResize(): void;
        dispatchEvent(event: EventX): boolean;
        preUpadateHitAreaDate: number;
        updateHitArea(): void;
        getObjectByPoint(dx: number, dy: number, scale: number): DisplayObject;
        get mouseX(): number;
        get mouseY(): number;
        get stageX(): number;
        get stageY(): number;
        render(camera: Camera, option: IRenderOption): void;
        lookat(target: IVector3D, upAxis?: IVector3D): void;
        onSpawn(): void;
        get shaderKey(): string;
        get factorKey(): string;
    }
}
declare module rf {
    function checkparent(target: DisplayObject): boolean;
    var childCheckNum: number;
    var changeCheckNum: number;
    class DisplayObjectContainer extends DisplayObject {
        constructor();
        setChange(value: number, p?: number, c?: boolean): void;
        childrens: Link<DisplayObject>;
        get numChildren(): number;
        addChild(child: DisplayObject): void;
        addChildAt(child: DisplayObject, index: number): void;
        getChildIndex(child: DisplayObject): number;
        removeChild(child: DisplayObject): void;
        removeAllChild(): void;
        removeFromStage(): void;
        addToStage(): void;
        updateSceneTransform(updateStatus?: number, parentSceneTransform?: IMatrix3D): number;
        updateHitArea(): void;
    }
}
declare module rf {
    class Camera extends DisplayObject {
        len: IMatrix3D;
        far: number;
        originFar: number;
        logDepthFar: number;
        worldTranform: IMatrix3D;
        invTransform: IMatrix3D;
        isPerspectiveCamera: boolean;
        isOrthographicCamera: boolean;
        contextMatrix: IMatrix3D;
        constructor(far?: number, contextMatrix?: IMatrix3D);
        updateSceneTransform(updateStatus?: number): number;
        resize(width: number, height: number): void;
    }
    function CameraUIResize(width: number, height: number, len: IMatrix3D, far: number, originFar: any, camera?: Camera): void;
    function CameraOrthResize(width: number, height: number, len: IMatrix3D, far: number, originFar: any, camera?: Camera): void;
    function Camera3DResize(width: number, height: number, len: IMatrix3D, far: number, originFar: number, camera?: Camera): void;
    function PerspectiveResize(width: number, height: number, len: IMatrix3D, far: number, degree: number, camera?: Camera): void;
}
declare module rf {
    const enum FilterConst {
        BASIC = "basic_",
        NORMAL = "normal_",
        UI = "ui_",
        COLOR = "color_",
        DIFF = "diff_",
        FILL = "fill_",
        UIDIFF = "uidiff_",
        GRAY = "gray_",
        HOLE = "hole_",
        COLOR_MATRIX = "HCOLOR_MATRIX_",
        CIRCLE = "circle_",
        BLUR = "blur_",
        MVP = "mvp_",
        MV = "mv_",
        P = "p_",
        DISCARD = "discard_"
    }
    class FilterBase extends STweenBase implements IShaderSetting {
        constructor(type: string);
        readly: boolean;
        disable: boolean;
        skey: string;
        vertex: IShaderCode;
        fragment: IShaderCode;
        updateSetting(setting: IShaderSetting): void;
        createCode(): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
    class BasicFilter extends FilterBase {
        constructor();
    }
    class NormalFilter extends FilterBase {
        constructor();
    }
    class ColorFilter extends FilterBase {
        constructor();
    }
    class MvpFilter extends FilterBase {
        constructor();
    }
    class MvFilter extends FilterBase {
        constructor();
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
    class MpFilter extends FilterBase {
        constructor();
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
    class DiscardFilter extends FilterBase {
        static FRAGMENT: IShaderCode;
        constructor();
    }
    class GrayFilter extends FilterBase {
        static FARGMENT: IShaderCode;
        constructor();
    }
    class HoleFilter extends FilterBase {
        static FARGMENT: IShaderCode;
        constructor();
        pos: IVector3D;
        setConstants(x: number, y: number, len: number, inner: number): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
    class CircleFilter extends FilterBase {
        static FRAGMENT: IShaderCode;
        constructor(x: number, y: number, len: number, inner: number);
        pos: IVector3D;
        setConstants(x: number, y: number, len: number, inner: number): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
    class UIFilter extends FilterBase {
        static VERTEX: IShaderCode;
        constructor();
    }
}
declare module rf {
    let debug_click_button: Sprite;
    abstract class RenderBase extends DisplayObjectContainer implements I3DRender {
        nativeRender: boolean;
        variables: {
            [key: string]: IVariable;
            data32PerVertex?: IVariable;
        };
        material: Material;
        tm: ITimeMixer;
        scrollRect: Size;
        render(camera: Camera, option: IRenderOption): void;
        constructor(variables?: {
            [key: string]: IVariable;
        });
        addToStage(): void;
    }
    class Sprite extends RenderBase {
        __batch: SuperBatchRenderer;
        __batch_render_data: IBatchRenderData;
        source: BitmapSource;
        renderer: I3DRender;
        $graphics: Graphics;
        __render_pre?: Sprite;
        __render_next?: Sprite;
        __graphics_next?: Sprite;
        $batchGeometry: IBatchGeometry;
        $vcIndex: number;
        $sourceIndex: number;
        pixcheck: boolean;
        shader: boolean;
        mask: Sprite;
        constructor(source?: BitmapSource, variables?: {
            [key: string]: IVariable;
        });
        setScrollRect(w: number, h: number, hStep?: number, vStep?: number, x?: number, y?: number): void;
        addChild(child: DisplayObject): void;
        setMask(color?: number, alpha?: number): void;
        get graphics(): Graphics;
        setChange(value: number, p?: number, c?: boolean): void;
        render(camera: Camera, option: IRenderOption): void;
        addToStage(): void;
        cleanAll(): void;
        setSize(width: number, height: number): void;
        setHitArea(r: number, b: number, l?: number, t?: number): void;
        updateHitArea(): void;
        getObjectByPoint(dx: number, dy: number, scale: number): DisplayObject;
        buttonModel(x: number, y: number, z: number): void;
        lockSca(sx: number, sy: number, sz: number, update?: Boolean): void;
        _tweener: ITweener;
        private identifier;
        pivotDownScale: number;
        pivotUpScale: number;
        protected pivotMouseDownHandler(event: EventX): void;
        protected pivotMouseUpHandler(event: EventX): void;
        scaleTweenComplete(t: ITweener): void;
        addFilter(filter: FilterBase): void;
        removeFilter(type: FilterConst): void;
        updateSceneTransform(updateStatus?: number, parentSceneTransform?: IMatrix3D): number;
        updateBatchVCData(refresh?: boolean): void;
        cleanBatch(): void;
        get visible(): boolean;
        set visible(value: boolean);
    }
    interface IGraphicsGeometry extends Size {
        offset: number;
        numVertices: number;
        base: Float32Array;
        matrix: IMatrix;
        vo: IBitmapSourceVO;
        rect: Size;
    }
    function newGraphicsGeometry(matrix?: IMatrix): IGraphicsGeometry;
    interface IBatchGeometry {
        vertex?: VertexInfo;
        vcData?: Float32Array;
        update(position: number, byte: Float32Array): any;
    }
}
declare module rf {
    const enum VA {
        pos = "pos",
        normal = "normal",
        tangent = "tangent",
        color = "color",
        uv = "uv",
        index = "index",
        weight = "weight"
    }
    const enum FS {
        diff = "diff",
        SHADOW = "shadow"
    }
    const enum VC {
        m = "m",
        mv = "mv",
        invm = "invm",
        sunmvp = "sunmvp",
        p = "p",
        mvp = "mvp",
        ui = "ui",
        lightDirection = "lightDirection",
        originFar = "originFar",
        logDepthFar = "logDepthFar",
        vc_diff = "vc_diff",
        vc_emissive = "vc_emissive",
        vc_bones = "bones"
    }
    class Buffer3D implements IRecyclable {
        preusetime: number;
        gctime: number;
        readly: boolean;
        constructor();
        awaken(): void;
        sleep(): void;
        onRecycle(): void;
    }
    class Program3D extends Buffer3D {
        program: WebGLProgram;
        private vShader;
        private fShader;
        vertexCode: string;
        fragmentCode: string;
        uniforms: Object;
        attribs: Object;
        setting: IShaderSetting;
        constructor();
        awaken(): boolean;
        dispose(): void;
        recycle(): void;
        private createShader;
    }
    class VertexBuffer3D extends Buffer3D {
        numVertices: number;
        data32PerVertex: number;
        data: VertexInfo;
        buffer: WebGLBuffer;
        constructor();
        recycle(): void;
        awaken(): boolean;
        uploadFromVector(data: number[] | Float32Array | VertexInfo, startVertex?: number, numVertices?: number): void;
        attribarray: object;
        uploadContext(program: Program3D): void;
    }
    class IndexBuffer3D extends Buffer3D {
        numIndices: number;
        data: Uint16Array;
        buffer: WebGLBuffer;
        quadid: number;
        constructor();
        recycle(): void;
        awaken(): boolean;
        uploadFromVector(data: number[] | Uint16Array, startOffset?: number, count?: number): void;
    }
    class Texture extends Buffer3D {
        key: number | string;
        data: ITextureData;
        texture: WebGLTexture;
        width: number;
        height: number;
        pixels: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | BitmapData;
        floatData: Uint8Array;
        constructor();
        awaken(): boolean;
        uploadContext(program: Program3D, variable: string): void;
        status: LoadStates;
        load(url?: string): void;
        loadComplete(e: EventX): void;
        recycle(): void;
    }
    class RTTexture extends Texture {
        frameBuffer: WebGLFramebuffer;
        renderBuffer: WebGLRenderbuffer;
        setting: IContext3DSetting;
        cleanBit: number;
        cleanColor: IVector3D;
        awaken(): boolean;
        recycle(): void;
    }
    class CubeTexture extends Texture {
        frameBuffer: WebGLFramebuffer;
        renderBuffer: WebGLRenderbuffer;
        setting: IContext3DSetting;
        files: string[];
        cubePixels: (ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement)[];
        awaken(): boolean;
        uploadContext(program: Program3D, variable: string): void;
        status: LoadStates;
        load(url?: string, type?: string): void;
        loadComplete(e: EventX): void;
        recycle(): void;
    }
}
declare namespace rf {
    let context3D: Context3D;
    const enum Context3DTextureFormat {
        BGRA = "bgra"
    }
    interface IWebglActiveInfo {
        tag: number;
        name: string;
        type: number;
        loc: any;
        len?: number;
        f?: string;
        v?: string;
        module?: string;
        used: boolean;
    }
    const enum Context3DVertexBufferFormat {
        BYTES_4 = 4,
        FLOAT_1 = 1,
        FLOAT_2 = 2,
        FLOAT_3 = 3,
        FLOAT_4 = 4
    }
    interface IContext3DSetting {
        cull: number;
        depth: boolean;
        logarithmicDepthBuffer: boolean;
        use_logdepth_ext: boolean;
        depthMode: number;
        src: number;
        dst: number;
    }
    class Context3D {
        bufferLink: Link<Recyclable<Buffer3D>>;
        triangles: number;
        dc: number;
        logarithmicDepthBuffer: boolean;
        use_logdepth_ext: boolean;
        setting: IContext3DSetting;
        _clearBit: number;
        render_setting: IContext3DSetting;
        createEmptyContext3DSetting(): IContext3DSetting;
        constructor();
        backBufferWidth: number;
        backBufferHeight: number;
        antiAlias: number;
        texIndex: number;
        configureBackBuffer(width: number, height: number, antiAlias?: number, enableDepthAndStencil?: boolean): void;
        lossScissor(rect: Size): void;
        setScissor(rect: Size, sceneX: number, sceneY: number, camera: Camera): {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number): void;
        updateSetting(render_setting: IContext3DSetting): void;
        attribarray: {
            [key: string]: boolean;
        };
        createVertexBuffer(data: number[] | Float32Array | VertexInfo, data32PerVertex?: number, startVertex?: number, numVertices?: number, CLS?: {
            new (): VertexBuffer3D;
        }): Recyclable<VertexBuffer3D>;
        indexByte: IndexBuffer3D;
        getIndexByQuad(quadCount: number): IndexBuffer3D;
        createIndexBuffer(data: number[] | Uint16Array | ArrayBuffer): IndexBuffer3D;
        defauleMag: number;
        getTextureData(url: string, mipmap?: boolean, mag?: number, mix?: number, repeat?: number, y?: boolean): ITextureData;
        textureObj: {
            [key: string]: Texture;
        };
        createTexture(key: ITextureData, pixels?: ImageBitmap | ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement | BitmapData): Texture;
        createEmptyTexture(key: ITextureData, width: number, height: number): Texture;
        createRttTexture(key: ITextureData, width: number, height: number): RTTexture;
        createCubeTexture(key: ITextureData): CubeTexture;
        rttTextures: RTTexture[];
        setRenderToTexture(texture: RTTexture, enableDepthAndStencil?: boolean, antiAlias?: number, surfaceSelector?: number, colorOutputIndex?: number): void;
        setRenderToBackBuffer(): void;
        programs: {
            [key: string]: Recyclable<Program3D>;
        };
        createProgram(vertexCode: string, fragmentCode: string, key?: string): Recyclable<Program3D>;
        setProgramConstantsFromVector(variable: string, data: number | number[] | Float32Array | ArrayLike<number>, format: number, array?: boolean, numstr?: string): void;
        setProgramConstantsFromMatrix(variable: string, rawData: ArrayLike<number>): void;
        cProgram: Program3D;
        setProgram(program: Program3D): 1 | 0 | -1;
        drawTriangles(indexBuffer: IndexBuffer3D, numTriangles: number, setting?: IContext3DSetting, offset?: number): void;
        uniform1f(loc: WebGLUniformLocation, data: number): void;
        uniform2f(loc: WebGLUniformLocation, data: Float32Array): void;
        uniform3f(loc: WebGLUniformLocation, data: Float32Array): void;
        updateUniformData(info: IWebglActiveInfo, data: any): void;
        gc(now: number): void;
        toString(): string;
    }
    function webGLSimpleReport(): Object;
}
declare module rf {
    class Light extends Camera {
        color: number;
        intensity: number;
        lookVector: IVector3D;
        updateSceneTransform(updateStatus?: number, parentSceneTransform?: IMatrix3D): number;
    }
    class DirectionalLight extends Light {
        lightoffset: IVector3D;
        normalsize: Float32Array;
        setDirectional(x: number, y: number, z: number): void;
        setSunOffset(x: number, y: number, z: number): void;
    }
}
declare module rf {
    class SceneObject extends Sprite {
        scene: Scene;
        shadowCast: boolean;
        shadowTarget: boolean;
        shadowMatrix: IMatrix3D;
        geometry: GeometryBase;
        invSceneTransform: IMatrix3D;
        minBoundingBox: OBB;
        boundingSphere: Sphere;
        distance: number;
        screenY: number;
        constructor(variables?: {
            [key: string]: IVariable;
        }, mouseEnabled?: boolean, source?: BitmapSource);
        update(now: number, interval: number): void;
        addChild(child: DisplayObject): void;
        get available(): boolean;
        addChildAt(child: DisplayObject, index: number): void;
        removeChild(child: DisplayObject): void;
        removeAllChild(): void;
        removeFromStage(): void;
        addToStage(): void;
        renderShadow(sun: Light, p: Program3D, c: Context3D, worldTranform: IMatrix3D, now: number, interval: number): void;
        static sphere: Sphere;
        static ray: Ray;
        raycast(raycaster: Raycaster, intersects?: IIntersectInfo[]): IIntersectInfo[];
    }
    class Scene extends SceneObject {
        sun: DirectionalLight;
        childChange: boolean;
        camera: Camera;
        rayCaster: Raycaster;
        constructor(variables?: {
            [key: string]: IVariable;
        }, mouseEnabled?: boolean);
        render(camera: Camera, option: IRenderOption): void;
        getObjectByPoint(dx: number, dy: number, scale: number): SceneObject;
    }
    class AllActiveSprite extends Sprite {
        constructor(source?: BitmapSource, variables?: {
            [key: string]: IVariable;
        });
    }
    class NoActiveSprite extends Sprite {
        constructor(source?: BitmapSource, variables?: {
            [key: string]: IVariable;
        });
    }
    let scene: Scene;
    let followScene: NoActiveSprite;
    let floorContainer: NoActiveSprite;
    let popContainer: AllActiveSprite;
    let tipContainer: AllActiveSprite;
    interface IStage3DCamera {
        camera: Camera;
        cameraUI: Camera;
        camera2D?: Camera;
        camera3D?: Camera;
        cameraOrth?: Camera;
        cameraPerspective?: Camera;
    }
    class Stage3D extends AllActiveSprite implements IStage3DCamera {
        canvas: HTMLCanvasElement;
        cameraUI: Camera;
        camera2D: Camera;
        camera: Camera;
        renderLink: Link<SceneObject>;
        shadow: ShadowEffect;
        constructor();
        names: string[];
        requestContext3D(canvas: HTMLCanvasElement): boolean;
        renderOption: IRenderOption;
        update(now: number, interval: number): void;
        resize(width: number, height: number): void;
        filterRenderList(d: SceneObject, link: Link<SceneObject>): void;
        getObjectByPoint(dx: number, dy: number, scale: number): DisplayObject;
    }
    class ShadowEffect {
        w: number;
        h: number;
        rtt: RTTexture;
        m: ShadowMaterial;
        len: IMatrix3D;
        constructor(w: number, h: number);
        render(link: Link<Mesh>, sun: DirectionalLight, now: number, interval: number): void;
    }
    class PassContainer extends RenderBase {
        camera: Camera;
        constructor(variables?: {
            [key: string]: IVariable;
        });
        render(camera: Camera, option: IRenderOption): void;
    }
    class UIContainer extends AllActiveSprite {
        render(camera: Camera, option: IRenderOption): void;
    }
    function getChildrenCount(d: DisplayObjectContainer, deep?: number): number;
}
declare module rf {
    let logging: boolean;
    function __log(msg: string): void;
    var systemInfo: ISystemInfo;
    class AppBase {
        nextGCTime: number;
        gcDelay: number;
        constructor(orientation?: IDeviceOrientation);
        rolldownHandler(event: EventX): void;
        rollupHandler(event: EventX): void;
        init(canvas: HTMLCanvasElement): void;
        onDeviceOrientationChange(value: IOrientationValue): void;
        initCanvas(canvas: HTMLCanvasElement): void;
        createSource(): void;
        initROOT(): void;
        initContainer(sceneCamera?: Camera, sceneMouse?: boolean): void;
        update(now: number, interval: number): void;
        softKeyBoardHandler: (width: number, height: number) => void;
        appWidth: number;
        appHeight: number;
        appResize(width: number, height: number): void;
        resize(width: number, height: number): void;
        gcChangeHandler(event: EventX): void;
    }
}
declare module rf {
    var test_bitmap: BitmapData;
    var test_text: TextField;
    var line3d: Line3D;
    class StageDebug extends AppBase {
        constructor();
        resize(w: number, h: number): void;
        createSource(): void;
        initROOT(): void;
        init(canvas: HTMLCanvasElement): void;
        testmesh(e?: EventX): void;
        moreItems(e: EventX): void;
        timerTest(): void;
        _time: number;
        randomtxt(): void;
        _isscal: boolean;
        sy: number;
        map2dTest(): void;
        mouseWheelHandler(event: EventX): void;
        attack(e: KeyboardEvent): void;
        dibiao: Skill;
        moveTest(e: EventX): void;
        mouseWheel3dHandler(event: EventX): void;
        unit3dCamera2DTest(): void;
        unit3dTest(): void;
        initCamera3d(): void;
        rayClickTest(e: EventX): void;
        filterTest(): void;
        superBatchTest(): void;
        kfmtest(): void;
        quaternionTest(): void;
        circleTest(): void;
        testtest(): void;
        fontTest(): void;
        loadTest(): Promise<void>;
    }
    var mesh: KFMMesh;
    var testConfig: {
        [key: string]: any;
        map?: {
            [key: string]: IMapData;
        };
    };
    function qua2mat(qua: IVector3D, pos: IVector3D): Float32Array;
}
declare module skill {
    var testskill: {};
}
declare module rf {
    interface IAnimFrame extends IBitmapSourceVO {
        duration: number;
    }
    interface AnimData {
        p: string;
        n: string;
        r: number;
        sx: number;
        sy: number;
        l: number;
        m: number;
        w: number;
        h: number;
        t: number;
        fs: {
            [key: string]: IAnimFrame;
        };
        matrix2d: IMatrix;
        source: Anim2dSource;
    }
    interface PakData {
        v: number;
        on: number;
        oh: number;
        hit: Size;
        sf: {
            [key: string]: number[];
        };
        actions: AnimData[][];
    }
    const enum Anim2DEventX {
        FRAME = 100,
        ATTACK = 101,
        COMPLETE = 102
    }
    class Anim2dSource extends BitmapSource implements ILoaderTask {
        config: AnimData;
        cachefs: {
            [key: string]: IBitmapSourceVO;
        };
        completeFuncs: Function[];
        constructor(url: string);
        load(): void;
        loadConfigComplete(event: EventX): void;
        loadByConfig(data: AnimData): void;
        loadImageComplete(event: EventX): void;
    }
    class Ani extends Sprite {
        constructor(source?: BitmapSource);
        extention: ExtensionDefine;
        url: string;
        config: AnimData;
        cur: number;
        max: number;
        nt: number;
        t: number;
        once: number;
        st: number;
        bindAnis: Link<Ani>;
        parentAni: Ani;
        lock: number;
        removeTime: number;
        load(url: string | AnimData): Anim2dSource;
        onSouceComplete(e: EventX): void;
        play(source: Anim2dSource): void;
        render(camera: Camera, option: IRenderOption): void;
        renderFrame(frame: number): number;
        lockFrame(frame: number): void;
        addBindAni(ani: Ani): void;
        removeBindAni(ani: Ani): void;
        onceComplete(finish: boolean): void;
        onComplete(t?: any): void;
    }
    class Pak extends Ani {
        static INFO_COMPLETE: string;
        constructor();
        info: PakData;
        action: number;
        faceto: number;
        load(url: string): any;
        pakLoadComplete(event: EventX): void;
        anim(anim: any, faceto: number, tm: ITimeMixer, once?: number, duration?: number, refresh?: boolean): void;
        onComplete(): void;
    }
    function anim_getSource(data: string | AnimData, extendtion?: ExtensionDefine, complete?: Function): Anim2dSource;
    function getAglinPoint(aglin: Align, w: number, h: number): number[];
    function fontRender(g: Graphics, vos: IFightSourceVO[], aglin: Align, gap?: number, rd?: number): void;
}
declare var GameGlobal: any;
declare module rf {
    const enum Keybord {
        A = 65,
        ALTERNATE = 18,
        AUDIO = 16777239,
        B = 66,
        BACK = 16777238,
        BACKQUOTE = 192,
        BACKSLASH = 220,
        BACKSPACE = 8,
        BLUE = 16777219,
        C = 67,
        CAPS_LOCK = 20,
        CHANNEL_DOWN = 16777221,
        CHANNEL_UP = 16777220,
        COMMA = 188,
        COMMAND = 15,
        CONTROL = 17,
        D = 68,
        DELETE = 46,
        DOWN = 40,
        DVR = 16777241,
        E = 69,
        END = 35,
        ENTER = 13,
        EQUAL = 187,
        ESCAPE = 27,
        EXIT = 16777237,
        F = 70,
        F1 = 112,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        F13 = 124,
        F14 = 125,
        F15 = 126,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        FAST_FORWARD = 16777226,
        G = 71,
        GREEN = 16777217,
        GUIDE = 16777236,
        H = 72,
        HELP = 16777245,
        HOME = 36,
        I = 73,
        INFO = 16777235,
        INPUT = 16777243,
        INSERT = 45,
        J = 74,
        K = 75,
        L = 76,
        LAST = 16777233,
        LEFT = 37,
        LEFTBRACKET = 219,
        LIVE = 16777232,
        M = 77,
        MASTER_SHELL = 16777246,
        MENU = 16777234,
        MINUS = 189,
        N = 78,
        NEXT = 16777230,
        NUMBER_0 = 48,
        NUMBER_1 = 49,
        NUMBER_2 = 50,
        NUMBER_3 = 51,
        NUMBER_4 = 52,
        NUMBER_5 = 53,
        NUMBER_6 = 54,
        NUMBER_7 = 55,
        NUMBER_8 = 56,
        NUMBER_9 = 57,
        NUMPAD = 21,
        NUMPAD_0 = 96,
        NUMPAD_1 = 97,
        NUMPAD_2 = 98,
        NUMPAD_3 = 99,
        NUMPAD_4 = 100,
        NUMPAD_5 = 101,
        NUMPAD_6 = 102,
        NUMPAD_7 = 103,
        NUMPAD_8 = 104,
        NUMPAD_9 = 105,
        NUMPAD_ADD = 107,
        NUMPAD_DECIMAL = 110,
        NUMPAD_DIVIDE = 111,
        NUMPAD_ENTER = 108,
        NUMPAD_MULTIPLY = 106,
        NUMPAD_SUBTRACT = 109,
        O = 79,
        P = 80,
        PAGE_DOWN = 34,
        PAGE_UP = 33,
        PAUSE = 16777224,
        PERIOD = 190,
        PLAY = 16777223,
        PREVIOUS = 16777231,
        Q = 81,
        QUOTE = 222,
        R = 82,
        RECORD = 16777222,
        RED = 16777216,
        REWIND = 16777227,
        RIGHT = 39,
        RIGHTBRACKET = 221,
        S = 83,
        SEARCH = 16777247,
        SEMICOLON = 186,
        SETUP = 16777244,
        SHIFT = 16,
        SKIP_BACKWARD = 16777229,
        SKIP_FORWARD = 16777228,
        SLASH = 191,
        SPACE = 32,
        STOP = 16777225,
        SUBTITLE = 16777240,
        T = 84,
        TAB = 9,
        U = 85,
        UP = 38,
        V = 86,
        VOD = 16777242,
        W = 87,
        X = 88,
        Y = 89,
        YELLOW = 16777218,
        Z = 90
    }
    class KeyManagerV2 extends MiniDispatcher {
        static enabled: Boolean;
        keylist: number[];
        keylimit: number[];
        isClosed: boolean;
        static _defaultMainKey: KeyManagerV2;
        static currentKey: KeyManagerV2;
        constructor(target?: DisplayObject);
        mouseDownHandler(e: EventX): void;
        static resetDefaultMainKey(value?: KeyManagerV2): void;
        static setFocus(focus?: KeyManagerV2): void;
        awaken(): void;
        sleep(): void;
        init(): void;
        onKeyHandle(e: KeyboardEvent): void;
        keyDict: {
            [key: string]: Function;
        };
        keyObj: {
            [key: string]: any;
        };
        currentKeyCode: number;
        doKey(e: KeyboardEvent, keyvalue: number): boolean;
        check(): boolean;
        regKeyDown(key: number, func: Function, thisobj: any, shift?: boolean, ctrl?: boolean, alt?: boolean): void;
        regKeyUp(key: number, func: Function, thisobj: any, shift?: boolean, ctrl?: boolean, alt?: boolean): void;
        removeKeyDown(key: number, func: Function, shift?: boolean, ctrl?: boolean, alt?: boolean): void;
    }
    let mainKey: KeyManagerV2;
}
declare module rf {
    class MD5 {
        constructor();
        private hexcase;
        private b64pad;
        hex_md5(s: any): string;
        private b64_md5;
        private any_md5;
        private hex_hmac_md5;
        private b64_hmac_md5;
        private any_hmac_md5;
        private md5_vm_test;
        private rstr_md5;
        private rstr_hmac_md5;
        private rstr2hex;
        private rstr2b64;
        private rstr2any;
        private str2rstr_utf8;
        private str2rstr_utf16le;
        private str2rstr_utf16be;
        private rstr2binl;
        private binl2rstr;
        private binl_md5;
        private md5_cmn;
        private md5_ff;
        private md5_gg;
        private md5_hh;
        private md5_ii;
        private safe_add;
        private bit_rol;
    }
}
declare module rf {
    class GUIProfile extends Sprite {
        timeTex: TextField;
        fpsTxt: TextField;
        dcTxt: TextField;
        repolyTxt: TextField;
        bufferTex: TextField;
        tweenTex: TextField;
        systemTex: TextField;
        constructor();
        private bindComponents;
        private createText;
        fpsChangeHandler(event: EventX): void;
    }
}
declare module rf {
    let line_variable: {
        [key: string]: IVariable;
    };
    class Line3DPoint {
        x: number;
        y: number;
        z: number;
        r: number;
        g: number;
        b: number;
        a: number;
        t: number;
        clear(): void;
        clone(): Line3DPoint;
        toRGB(color: number): void;
    }
    class Line3D extends SceneObject {
        constructor();
        private origin;
        private tempVertex;
        points: Line3DPoint[];
        vertexBuffer: VertexBuffer3D;
        program: Program3D;
        data32PerVertex: number;
        numVertices: number;
        triangles: number;
        quad: number;
        clear(): void;
        moveTo(x: number, y: number, z: number, thickness?: number, color?: number, alpha?: number): void;
        lineTo(x: number, y: number, z: number, thickness?: number, color?: number, alpha?: number): void;
        private build;
        end(): void;
        updateSceneTransform(updateStatus?: number, parentSceneTransform?: IMatrix3D): number;
        render(camera: Camera, option: IRenderOption): void;
        protected createProgram(): Program3D;
    }
    class Trident extends Line3D {
        constructor(len?: number, think?: number);
    }
    class LinePlane extends Line3D {
        constructor(len?: number, think?: number, scale?: number);
    }
}
declare module rf {
    function skeleton_debug(): void;
}
declare module rf {
    class AStar {
        map: Map2DSetting;
        xfrom: number;
        yfrom: number;
        xto: number;
        yto: number;
        event: MiniDispatcher;
        openlist: number[][];
        closelist: number[];
        minNode: number[];
        aSurOff: number[][];
        minih: number;
        go(map: Map2DSetting, xfrom: number, yfrom: number, xto: number, yto: number, event?: MiniDispatcher): number[][];
        getPushIndex(wayList: number[][], f: number): number;
        excute(): number;
        getNearest(): any[];
        format(node: any[]): any[];
        merge(ml: Map2DSetting, nearest: number[][]): number[][];
    }
}
declare module rf {
    class Arpg2DCamera extends Camera {
        map: SnakeMap;
        watchTarget: DisplayObject;
        top: number;
        left: number;
        right: number;
        bottom: number;
        init(): void;
        resize(width: number, height: number): void;
        update(now: number, interval: number): void;
    }
}
declare module rf {
    function map_create_data(id: string, pwc: number, phc: number): IMapData;
    interface IMapData {
        gw: number;
        gh: number;
        gew: number;
        geh: number;
        hgew: number;
        hgeh: number;
        w: number;
        h: number;
        pw: number;
        ph: number;
        id: string;
        byte: ArrayBuffer;
        setting: Map2DSetting;
    }
    class SnakeMap extends SceneObject {
        static sourceSize: Point2D;
        gx: number;
        gy: number;
        sw: number;
        sh: number;
        gw: number;
        gh: number;
        data: IMapData;
        perfix: string;
        mapHalo: Sprite;
        mapGrap: Sprite;
        constructor(variables?: {
            [key: string]: IVariable;
        });
        getFull(s: string, len: number): string;
        init(data: IMapData, sceneWidth: number, sceneHeight: number): void;
        render(camera: Camera, option: IRenderOption): void;
        setSize(width: number, height: number): void;
        setviewRect(x: number, y: number): void;
        maploadCompleteHandler(event: EventX): void;
    }
}
declare module rf {
    class Map2DSetting {
        path: Uint8Array;
        w: number;
        h: number;
        data: IMapData;
        alphas: number[];
        constructor(data: IMapData);
        getValue(x: number, y: number): number;
        getWalk(x: number, y: number): number;
        getsafe(x: number, y: number): number;
        getAlpha(x: number, y: number): number;
        setWalk(x: number, y: number, val: number): void;
        setAlpha(x: number, y: number, val: number): void;
        setSafe(x: number, y: number, val: number): void;
    }
}
declare module rf {
    class MapRtt extends SceneObject {
        rtt: RTTexture;
        nativeRender: boolean;
        render(camera: Camera, option: IRenderOption): void;
    }
}
declare module rf {
    type STATE_TRY_STOP = (activeId: number) => number;
    type STATE_STOP = (activeId: number) => void;
    interface IStateRuntimeVO {
        id: StateDefine;
        thisobj: any;
        trystop: STATE_TRY_STOP;
        stop: STATE_STOP;
        active: boolean;
    }
    class StateModel {
        running: {
            [key: number]: IStateRuntimeVO;
        };
        constructor();
        runningList(): any[];
        isRunning(id: StateDefine): boolean;
        check(id: StateDefine): boolean;
        startState(id: StateDefine, thisobj?: any, stop?: STATE_STOP, trystop?: STATE_TRY_STOP): IStateRuntimeVO;
        stopState(id: StateDefine, activeId: StateDefine): void;
        stop(activeId: StateDefine): void;
    }
}
declare module rf {
    const enum StateDefine {
    }
    const enum Ralation {
        FOBIDDEN = 0,
        BREAK = 1,
        ALLOW = 2
    }
    let stateRelation: number[][];
}
declare module rf {
    let RX: number;
    let SY: number;
    let OBJECT2D_SCALE: number;
    const enum SCENE_MODEL {
        MAP2D = 0,
        MAP3D = 1,
        UI = 2,
        CONTIANER = 3
    }
    class MapObject extends SceneObject {
        constructor();
        container: SceneObject;
        sceneModel: SCENE_MODEL;
        setSceneModel(value: SCENE_MODEL): void;
        createContainer(): void;
        set rotation(value: number);
        get rotation(): number;
        updateTransform(): void;
        setTransform(matrix: ArrayLike<number>): void;
    }
}
declare module rf {
    var mouse_current: DisplayObject;
    interface IMouseElement {
        target: DisplayObject;
        time: number;
        down: number;
        up: number;
        click: number;
        over?: number;
        out?: number;
    }
    interface ITouchlement {
        target: DisplayObject;
        time: number;
        data: IMouseEventData;
    }
    interface IMouseEventData {
        target: DisplayObject;
        time: number;
        identifier: number;
    }
    const enum MouseEventX {
        MouseDown = 50,
        MouseMiddleDown = 51,
        MouseRightDown = 52,
        MouseUp = 53,
        MouseMiddleUp = 54,
        MouseRightUp = 55,
        CLICK = 56,
        RightClick = 57,
        middleClick = 58,
        MouseWheel = 59,
        MOUSE_WHEEL_START = 60,
        MOUSE_WHEEL_END = 61,
        MouseMove = 62,
        ROLL_UP = 63,
        ROLL_DOWN = 64,
        ROLL_LEFT = 65,
        ROLL_RIGHT = 66,
        ROLL_OVER = 67,
        ROLL_OUT = 68
    }
    interface IMouseEventData {
        id: number;
        mouseDownX: number;
        mouseDownY: number;
        x: number;
        y: number;
        ox: number;
        oy: number;
        ctrl: boolean;
        shift: boolean;
        alt: boolean;
        wheel: IMouseWhellOption;
    }
    interface IMouseWhellOption {
        x: number;
        y: number;
        startWheel: number;
        preWheel: number;
        deltaY: number;
        wheel: number;
    }
    var mouseEnabled: boolean;
    class Mouse {
        preMouseTime: number;
        perMoveTime: number;
        preTarget: DisplayObject;
        static currentType: MouseEventX;
        static mouseDebug: boolean;
        mouseElement: {
            [key: number]: IMouseEventData;
        };
        touchElement: {
            [key: number]: ITouchlement;
        };
        eventData: IMouseEventData;
        updateNativeMouse(x: number, y: number): void;
        init(): void;
        onEvent(identifier: number, screenX: number, screenY: number, event: MouseEventX, ctrlKey?: boolean, shiftKey?: boolean, altKey?: boolean, deltaY?: IMouseWhellOption): void;
        onTouchStart(data: ITouchEventData): void;
        onTouchEnd(data: ITouchEventData): void;
        onTouchMove(data: ITouchEventData): void;
        wheelOption: IMouseWhellOption;
        onMousewheel(event: WheelEvent): void;
    }
}
declare module rf {
    class TrackballControls {
        object: Camera;
        target: IVector3D;
        mouseSitivity: number;
        distance: number;
        lock: boolean;
        up_axis: IVector3D;
        constructor(object: Camera, up_axis?: IVector3D);
        updateSun(): void;
        set tdistance(value: number);
        get tdistance(): number;
        tweener: ITweener;
        mouseWheelHandler(event: EventX): void;
        mouseDownHandler(event: EventX): void;
        mouseUpHandler(e: EventX): void;
        mouseMoveHandler(e: EventX): void;
        mouseRightDownHandler(event: EventX): void;
        mouseRightMoveHandler(event: EventX): void;
        mouseRightUpHandler(event: EventX): void;
    }
}
declare module rf {
    class Graphics {
        grometrys: IGraphicsGeometry[];
        target: Sprite;
        byte: Float32Array;
        hitArea: HitArea;
        numVertices: number;
        $batchOffset: number;
        verticesUpdate: (v: Float32Array, variables: {
            [key: string]: IVariable;
        }) => void;
        private preNumVertices;
        constructor(target: Sprite);
        clear(): void;
        updateByte(): void;
        end(): void;
        addPoint(geometry: IGraphicsGeometry, pos: number[], noraml: number[], uv: number[], color: number[], locksize: boolean): void;
        drawLine(x: number, y: number, tx: number, ty: number, color: number, thinkness?: number, alpha?: number, z?: number): IGraphicsGeometry;
        drawRect(x: number, y: number, width: number, height: number, color: number, alpha?: number, matrix?: IMatrix, z?: number): IGraphicsGeometry;
        drawQuad(ps: ArrayLike<number>[], color?: number, alpha?: number): IGraphicsGeometry;
        drawCircle(x: number, y: number, radius: number, vo?: IBitmapSourceVO, uiMatrix?: IMatrix, color?: number, alpha?: number, z?: number, len?: number, sr?: number): IGraphicsGeometry;
        drawTriangle(x: number, y: number, width: number, height: number, color: number, p2y?: number, alpha?: number, matrix?: IMatrix, z?: number): IGraphicsGeometry;
        setSize(width: number, height: number): void;
        drawScale9Bitmap(x: number, y: number, vo: IBitmapSourceVO, rect: Size, matrix?: IMatrix, geometry?: IGraphicsGeometry, color?: number, alpha?: number, z?: number): IGraphicsGeometry;
        drawBitmap(x: number, y: number, vo: IBitmapSourceVO, matrix?: IMatrix, z?: number, z2?: any, geometry?: IGraphicsGeometry, color?: number, alpha?: number): IGraphicsGeometry;
        drawRepeat(x: number, y: number, vo: IBitmapSourceVO, matrix?: IMatrix, geometry?: IGraphicsGeometry, color?: number, alpha?: number, z?: number): IGraphicsGeometry;
    }
}
declare module rf {
    function createUIQuad(width: number, height: number): VertexInfo;
    class RTTSprite extends Sprite {
        singleName: string;
        initFileter(filters: {
            [key: string]: FilterBase;
        }): void;
        constructor(singleName: string, source?: BitmapSource, variables?: {
            [key: string]: IVariable;
        });
        rtt: RTTexture;
        rttTarget: {
            filters: {
                [key: string]: FilterBase;
            };
            shader: boolean;
            program: typeof Program3D;
        };
        render(camera: Camera, option: IRenderOption): void;
    }
}
declare module rf {
    export interface ITGeometry {
        numVertices: number;
        vertex: Float32Array;
        data32PerVertex: number;
        variables: IVariables;
        index?: Uint16Array;
        numTriangles?: number;
    }
    interface IVariables {
        [key: string]: rf.IVariable;
    }
    export let empty_number_object: {
        [key: string]: number[];
    };
    export function createGeometryVertex(data: {
        [key: string]: Float32Array;
    }, variables: IVariables, numVertices: number, result?: Float32Array): Float32Array;
    export function geometry_getVariableValue(key: string): number[];
    export function geometry_addpoint(geometry: ITGeometry, value: {
        [key: string]: number[];
    }): void;
    export class TGeometry extends MiniDispatcher {
        vertex: VertexBuffer3D;
        index: IndexBuffer3D;
        data: ITGeometry;
        numTriangles: number;
        setData(data: ITGeometry): this;
    }
    export {};
}
declare module rf {
    var TextFormatCanvas: HTMLCanvasElement;
    var TextForamtContext: CanvasRenderingContext2D;
    class TextFormat {
        family: string;
        size: number;
        align: number;
        bold: string;
        italic: string;
        stroke: {
            size: number;
            color?: number;
        };
        shadow: {
            color: number;
            blur: number;
            offsetX?: number;
            offsetY?: number;
        };
        gradient: {
            color: number;
            percent?: number;
        }[];
        __font: string;
        leading: number;
        constructor(strokeSize?: number, strokeColor?: number);
        init(): TextFormat;
        fillContext(context: CanvasRenderingContext2D, character: string, scale: number, ox?: number, oy?: number): void;
        measureText(context: CanvasRenderingContext2D, text: string): TextMetrics;
        test(text: string, out: FontSize, scale: number): FontSize;
        draw(context: CanvasRenderingContext2D, text: string, ox: number, oy: number): void;
        getColorStr(color: number): string;
        clone(format?: TextFormat): TextFormat;
    }
}
declare module rf {
    var editTF: TextField;
    var oldWindowWidth: number;
    var oldWindowHeight: number;
    function __showKeyboard(tf: TextField): void;
    function onResizeKeboard(width: number, height: number): void;
    function __onKeyboardInput(option: {
        value: string;
    }): void;
    function __onKeyboardComplete(option: {
        value: string;
    }): void;
    const enum TextFieldType {
        INPUT = "input",
        DYNAMIC = "dynamic"
    }
    interface FontSize extends Size {
        rw: number;
        rh: number;
    }
    var EMPTY_FONTSIZE: FontSize;
    let defalue_format: TextFormat;
    class TextField extends Sprite {
        html: boolean;
        $text: string;
        format: TextFormat;
        color: number;
        element: HtmlElement;
        gap: number;
        multiline: boolean;
        maxChars: number;
        textHeight: number;
        textWidth: number;
        protected _edit: boolean;
        private _type;
        constructor(source?: BitmapSource);
        init(source?: BitmapSource, format?: TextFormat): void;
        private lines;
        private textLines;
        get text(): string;
        set text(value: string);
        cleanAll(): void;
        removeChild(child: DisplayObject): void;
        layout(): void;
        getCharSourceVO(char: string, format: TextFormat): IBitmapSourceVO;
        tranfromHtmlElement2CharDefine(html: HtmlElement, width?: number): Recyclable<Line>[];
        set type(val: string);
        get type(): string;
        protected mouseUpHandler(event: EventX): void;
        private looseEvt;
        private blurHandle;
        removeFromStage(): void;
    }
    class ImageVO {
        x: number;
        y: number;
        w: number;
        h: number;
        tag: string;
        name: string;
        display: Sprite;
        clone(vo?: ImageVO): ImageVO;
        dispose(): void;
    }
    class HtmlElement {
        newline: boolean;
        str: string;
        start: number;
        color: number;
        format: TextFormat;
        underline: boolean;
        image: Sprite;
        imageTag: number;
        w: number;
        h: number;
        pre: HtmlElement;
        next: HtmlElement;
        createAndCopyFormat(last?: HtmlElement, newline?: boolean): HtmlElement;
        clear(): void;
    }
    let emotion: {
        [key: string]: ImageVO;
    };
    let imageCreateFunctions: {
        [key: string]: {
            func: Function;
            thisobj: any;
        };
    };
    function formatHtml(value: string, html: HtmlElement, source: BitmapSource): void;
    class Char implements IRecyclable {
        index: number;
        name: string;
        ox: number;
        sx: number;
        ex: number;
        element: HtmlElement;
        display: IBitmapSourceVO | Sprite;
        w: number;
        h: number;
        onRecycle(): void;
    }
    class Line {
        w: number;
        h: number;
        chars: Recyclable<Char>[];
    }
    class TextLine extends Sprite {
        line: Line;
        renderText(line: Line): void;
    }
    const enum EventT {
        TEXT_LINK = 41
    }
    class TextALink extends TextField {
        set href(value: string);
        http: string;
        event: string;
        constructor();
        textHandler(e: EventX): void;
        layout(): void;
    }
}
declare module rf {
    interface IRenderer {
        __renderNext: IRenderer;
        renderInfo: IRendererInfo;
        render(option: IRenderOption): void;
    }
    interface IRendererInfo {
        renderer: IRenderer;
        batch: {
            status: number;
            invWorldMatrix: ArrayLike<number>;
        };
        enabled: boolean;
        graphicsnext?: IRenderer;
        source?: number;
        vc?: number;
    }
    interface IBatchRenderer extends IRenderer {
        root: IRenderer;
        current: IRenderer;
        sources: {
            [key: string]: {
                data: ITextureData;
                index: number;
                name: string;
            };
        };
        source: number;
        target: number;
        numVertices: number;
        offset?: number;
        triangles?: number;
        vc?: Float32Array;
        geometry?: TGeometry;
    }
}
declare module rf {
    class NormalRender implements I3DRender {
        target: Sprite;
        constructor(target: Sprite);
        render(camera: Camera, option: IRenderOption): void;
    }
}
declare module rf {
    class SingleRenderer implements I3DRender, IBatchGeometry {
        target: Sprite;
        vertex: VertexInfo;
        vertexBuffer: VertexBuffer3D;
        quadcount: number;
        program: Program3D;
        depth: boolean;
        depthMode: WebGLConst;
        srcFactor: WebGLConst;
        dstFactor: WebGLConst;
        constructor(target: Sprite);
        initFileter(filters: {
            [key: string]: FilterBase;
        }): void;
        update(position: number, byte: Float32Array): void;
        render(camera: Camera, option: IRenderOption): void;
        otherParms(c: Context3D, p: Program3D): void;
        createProgram(): Program3D;
    }
}
declare module rf {
    interface IBatchRenderData extends IRecyclable, I3DRender {
        name: string;
        filters: {
            [key: string]: FilterBase;
        };
        shader?: boolean;
        shaderKey: string;
        factorKey: string;
        first?: I3DRender;
        current?: I3DRender;
        program?: Program3D;
        count?: number;
        cull?: number;
        srcFactor?: number;
        dstFactor?: number;
        depthMask?: boolean;
        passCompareMode?: number;
        offset?: number;
        quad?: number;
        triangles?: number;
        vcData?: Float32Array;
        __render_pre?: IBatchRenderData;
        __render_next?: IBatchRenderData;
        __graphics_next?: Sprite;
    }
    class IBatchSourceData {
    }
    const enum FilterConst {
        MATRIX_UI = "MatrixUI_"
    }
    class MatrixUIFilter extends FilterBase {
        static VERTEX: IShaderCode;
        constructor();
    }
    class SuperBatchRenderer implements I3DRender, IBatchGeometry {
        target: Sprite;
        renderData: IBatchRenderData;
        i3DRender: I3DRender;
        currentRenderData: IBatchRenderData;
        invSceneTransfrom: IMatrix3D;
        vertexBuffer: VertexBuffer3D;
        worldTransform: IMatrix3D;
        length: number;
        sources: BitmapSource[];
        changeStatus: DChange;
        depth: boolean;
        depthMode: WebGLConst;
        srcFactor: WebGLConst;
        dstFactor: WebGLConst;
        cull: WebGLConst;
        constructor(target: Sprite);
        render(camera: Camera, option: IRenderOption): void;
        dc(renderData: IBatchRenderData, worldTransform: IMatrix3D): void;
        cleanBatch(): void;
        createNewRenderData(render: Sprite, factorKey: string): IBatchRenderData;
        copyRenderData(data: IBatchRenderData): IBatchRenderData;
        filterGeo(render: Sprite): void;
        toBatch(): void;
        update(position: number, byte: Float32Array): void;
    }
}
declare module rf {
    class PerspectiveMatrix3D extends Float32Array {
        lookAtLH(eye: Point3DW, at: Point3DW, up: Point3DW): void;
        lookAtRH(eye: Point3DW, at: Point3DW, up: Point3DW): void;
        perspectiveOffCenterLH(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;
        perspectiveLH(width: number, height: number, zNear: number, zFar: number): void;
        perspectiveFieldOfViewLH(fieldOfViewY: number, aspectRatio: number, zNear: number, zFar: number): void;
        orthoOffCenterLH(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;
        orthoLH(width: number, height: number, zNear: number, zFar: number): void;
        perspectiveOffCenterRH(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;
        perspectiveRH(width: number, height: number, zNear: number, zFar: number): void;
        perspectiveFieldOfViewRH(fieldOfViewY: number, aspectRatio: number, zNear: number, zFar: number): void;
        orthoOffCenterRH(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): void;
        orthoRH(width: number, height: number, zNear: number, zFar: number): void;
    }
}
declare module rf {
    class PassRttTexture extends RTTexture {
    }
    var pass_vertexBuffer: VertexBuffer3D;
    var pass_vertexInfo: VertexInfo;
    var pass_temp_pos: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    var pass_temp_uv: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    var pass_temp_transform: Float32Array;
    function pass_init_mesh(): void;
    function pass_update_mesh(pos?: Size, uv?: Size): void;
    var pass_vertex_code: string;
    var pass_fragment_code: string;
    function pass_dc(tex: Texture, program: Program3D, vertex?: VertexBuffer3D, transfrom?: IMatrix3D, quadcount?: number, index?: IndexBuffer3D): void;
    function pass_normal_render(tex: Texture, pos?: Size, uv?: Size, transfrom?: IMatrix3D): void;
    function pass_blur_render2(tex: Texture, blurX: number, blurY: number, pos?: Size, uv?: Size, transfrom?: IMatrix3D): void;
    function pass_outline_render(tex: Texture, pos?: Size, uv?: Size, transfrom?: IMatrix3D): void;
}
declare module rf {
    interface ISkeletonRenderData {
        skeleton: Skeleton;
        matrices: Float32Array;
    }
    class Skeleton extends MiniDispatcher {
        rootBone: IBone;
        defaultMatrices: Float32Array;
        vertex: VertexBuffer3D;
        boneCount: number;
        animations: {
            [key: string]: ISkeletonAnimationData;
        };
        id: string;
        size: number;
        boneTransform: {
            [key: string]: IMatrix3D;
        };
        constructor(config: ISkeletonData, id: string);
        initAnimationData(anim: ISkeletonAnimationData): void;
        createAnimation(): Recyclable<SkeletonAnimation>;
        getMatricesData(anim: ISkeletonAnimationData, frame: number): Float32Array;
        loadAnimationComplete(e: EventX): void;
        mediumpCalcA: ISkeletonCalcTarget;
        mediumpCalcB: ISkeletonCalcTarget;
        tempScale: Float32Array;
        getMediumpMatricesData(anim: SkeletonAnimation, frame: number, n: number, boneTransform: {
            [key: string]: IMatrix3D;
        }, buffer: ArrayBuffer, bonepq: {
            [key: string]: ISKeletonBonePQ;
        }): void;
        mixTransform(am: IMatrix3D, bm: IMatrix3D, n: number, bonepq: ISKeletonBonePQ, matrix?: IMatrix3D): void;
        preBonematrix: {
            [key: string]: Float32Array;
        };
        updateBone(bone: IBone, frames: {
            [key: string]: Float32Array;
        }, frame: number, nextframes: {
            [key: string]: Float32Array;
        }, nextFrame: number, n: number, boneTransform: {
            [key: string]: IMatrix3D;
        }, bonepq: {
            [key: string]: ISKeletonBonePQ;
        }): void;
        updateMatrices(bone: IBone, buffer: ArrayBuffer): void;
    }
    var skeleton_test_n: number;
    interface ISkeletonAnimationRuntime {
        starttime: number;
        data: ISkeletonAnimationData;
        frame: number;
        stoptime?: number;
    }
    interface ISKeletonBonePQ {
        p: IVector3D;
        q: IVector3D;
    }
    class SkeletonAnimation extends MiniDispatcher implements ISkeletonRenderData {
        skeleton: Skeleton;
        matrices: Float32Array;
        tm: ITimeMixer;
        animation: ISkeletonAnimationRuntime;
        preAnimation: ISkeletonAnimationRuntime;
        currentFrame: number;
        totalFrame: number;
        lockFrame: number;
        currentBoneTransfrom: {
            [key: string]: IMatrix3D;
        };
        currentBonePQ: {
            [key: string]: ISKeletonBonePQ;
        };
        mediump: boolean;
        play(animationData: ISkeletonAnimationData, tm: ITimeMixer, mediump?: boolean): void;
        preUploadTime: number;
        preFrame: number;
        uploadContext(camera: Camera, mesh: Mesh, program: Program3D, now: number, interval: number): void;
    }
    const enum FilterConst {
        SKELETON = "skeleton_"
    }
    class SkeletonFilter extends FilterBase {
        static VERTEX: IShaderCode;
        static FRAGMENT: IShaderCode;
        constructor();
    }
}
declare module rf {
    class Mesh extends SceneObject {
        scene: Scene;
        skAnim: SkeletonAnimation;
        skData: ISkeletonRenderData;
        outLineMaterial: OutLineMaterial;
        constructor(variables?: {
            [key: string]: IVariable;
        });
        updateSceneTransform(updateStatus?: number, parentSceneTransform?: IMatrix3D): number;
        renderShadow(sun: Light, p: Program3D, c: Context3D, worldTranform: IMatrix3D, now: number, interval: number): void;
        renderOutLine(camera: Camera, option: IRenderOption): void;
        render(camera: Camera, option: IRenderOption): void;
        onRecycle(): void;
    }
    class KFMMesh extends Mesh {
        id: string;
        kfm: ISkeletonMeshData;
        defaultAnim: string;
        currentAnim: string;
        mediump: boolean;
        constructor(material?: Material, variables?: {
            [key: string]: IVariable;
        });
        load(url: string): void;
        loadCompelte(e: EventX): void;
        setKFM(kfm: ISkeletonMeshData): void;
        removeFromStage(): void;
        calHitarea(): HitArea;
        get nameLabelY(): number;
        createMaterial(): Material;
        playAnim(name: string, refresh?: boolean): void;
        skeletonAnimLoadComplete(e: EventX): void;
        animationLoadCompleteHandler(e: EventX): void;
        onRecycle(): void;
        boneContainer: {
            [key: string]: SceneObject;
        };
        bindMesh(skeletonName: string, mesh: Sprite): void;
        skinAnimChangeHandler(event: EventX): void;
    }
}
declare module rf {
    var particle_Perfix: string;
    var particle_Texture_Perfix: string;
    var particle_test_now: number;
    class ParticleGeometry extends GeometryBase {
        followData: Float32Array;
        initRuntime(data: IParticleData): void;
        updateFollow(particle: Particle): void;
        uploadContext(camera: Camera, mesh: Particle, program: Program3D, now: number, interval: number): IMatrix3D;
    }
    class Particle extends Mesh {
        url: string;
        data: IParticleData;
        sk_st: number;
        now: number;
        followMatrix3D: IMatrix3D;
        followPos: IVector3D;
        followQua: IVector3D;
        followSca: IVector3D;
        updateSceneTransform(updateStatus: number, parentSceneTransform?: IMatrix3D): number;
        load(url: string): void;
        loadCompelte(e: EventX): void;
        play(data: IParticleData): void;
    }
    const enum P_PARTICLE {
        TIME = "p_time",
        SCALE = "p_scale",
        ROTATION = "p_init_rotation",
        VROTATION = "p_vrotation",
        ROTATION_HEAD = "p_rotation2head",
        POSITION = "p_position",
        FOLLOW = "p_follow",
        VELOCITY = "p_velocity",
        ACCELERITION = "p_accelerition",
        BILLBOARD = "p_billboard",
        SEGMENT_COLOR = "p_segment_color",
        SPRITE_SHEET = "p_sprite_sheet_anim",
        NOW = "now"
    }
    class ParticleMaterial extends Material {
        getTextUrl(data: ITextureData): string;
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        createProgram(mesh: Mesh): Recyclable<Program3D>;
        timeNode(info: IParticleTimeNodeInfo): string;
        scaleNode(info: IParticleScaleNodeInfo): string;
        followNode(info: IParticleFollowNodeInfo): string;
        segmentColorNode(info: IParticleSegmentColorNodeInfo): string;
        spriteSheetNode(info: IParticleSpriteSheetAnimNodeInfo): string;
    }
    class TestPartilce extends Particle {
        moveTest(tweener?: ITweener): void;
    }
}
declare module rf {
    class Raycaster {
        constructor(far?: number, near?: number);
        ray: Ray;
        near: number;
        far: number;
        setFromCamera(mousex: number, mousey: number, camera: Camera): void;
        intersectObject(object: SceneObject, intersects: IIntersectInfo[], recursive?: boolean): void;
        intersectObjects(arr: DisplayObject[], recursive?: boolean, intersects?: IIntersectInfo[]): IIntersectInfo[];
        static disSort(a: IIntersectInfo, b: IIntersectInfo): number;
    }
    interface IIntersectInfo {
        obj: SceneObject;
        distance: number;
        point: IVector3D;
    }
}
declare module rf {
    var skill_Perfix: string;
    var skill_event_define: {
        [key: string]: {
            new (): EventFilter;
        };
    };
    function skill_setup(): void;
    interface ISkillTarget {
        sk_st?: number;
    }
    class Skill extends MapObject {
        data: ISkillData;
        lines: SkillLine[];
        follow: SceneObject;
        sk_st: number;
        load(url: string): void;
        loadCompelte(e: EventX): void;
        play(data: ISkillData): void;
        reset(): void;
        update(now: number, interval: number): void;
    }
    class SkillLine extends MiniDispatcher {
        skill: Skill;
        data: ISkillLineData;
        closed: boolean;
        runtimes: SceneObject[];
        tm: ITimeMixer;
        loop: number;
        play(data: ISkillLineData, skill: Skill): void;
        addEvents(target: SceneObject, events: ISkillEvent[]): void;
        update(now: number, interval: number): boolean;
        reset(now?: number): void;
        onRecycle(): void;
    }
    class SkillMesh extends KFMMesh {
    }
    class SkillParticle extends Particle {
    }
    class SkillSkill extends Skill {
    }
    class TestSkill extends Skill {
        play(data: ISkillData): void;
        update(now: number, interval: number): void;
    }
}
declare module rf {
    function mesh_cut(mesh: Mesh): CutMesh;
    function mesh_fre_alpha_cut(mesh: Mesh): CutMesh;
    class CutMesh extends Mesh {
        render(camera: Camera, option: IRenderOption): void;
    }
}
declare module rf {
    class SelectMesh extends Mesh {
        static create(mesh: Mesh): void;
    }
}
declare module rf {
    class EventFilter extends FilterBase {
        target: Sprite;
        skillEvent: ISkillEvent;
        currentEvent: ISkillEvent;
        needUpdate: boolean;
        pro: any;
        starttime: number;
        setEvent(event: ISkillEvent, tick?: boolean): void;
        getCurrentEvent(now: number, skillEvent?: ISkillEvent): ISkillEvent;
        reset(): void;
        update(now: number, interval: number): void;
        updatepro(pro: any): void;
        end(): void;
    }
}
declare module rf {
    class BlueFilter extends EventFilter {
        constructor();
        blue: IVector3D;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite): void;
        static FRAGMENT: IShaderCode;
    }
}
declare module rf {
    class ColorMatrixFilter extends EventFilter {
        static FRAGMENT: IShaderCode;
        static IDENTITY: Float32Array;
        static LUMA_R: number;
        static LUMA_G: number;
        static LUMA_B: number;
        matrix: Float32Array;
        tmp: Float32Array;
        colorMatrix: Float32Array;
        colorOffset: Float32Array;
        constructor();
        updatepro(pro: {
            b: number;
            c: number;
            s: number;
            h: number;
        }): void;
        AdjustBrightness(value: number): void;
        AdjustContrast(value: number): void;
        AdjustSaturation(sat: number): void;
        AdjustHue(value: number): void;
        _ConcatValues(index: number, f0: number, f1: number, f2: number, f3: number, f4: number): void;
        UpdateMatrix(): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite): void;
    }
}
declare module rf {
    class ColorTransformFilter extends EventFilter {
        static FRAGMENT: IShaderCode;
        constructor();
        pro: {
            mr: number;
            mg: number;
            mb: number;
            ma: number;
            ar: number;
            ag: number;
            ab: number;
            aa: number;
        };
        mul: IVector3D;
        add: IVector3D;
        updatepro(pro: {
            mr: number;
            mg: number;
            mb: number;
            ma: number;
            ar: number;
            ag: number;
            ab: number;
            aa: number;
        }): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite): void;
        alphaTo(from: number, to: number, durtion: number): void;
        end(): void;
    }
}
declare module rf {
    interface ITexFilterData {
        tex: string;
        color: number;
    }
    class TexFilter extends EventFilter {
        source: BitmapSource;
        texData: ITexFilterData;
        color: IVector3D;
        constructor(target: Sprite, type: string);
        setData(texData: ITexFilterData): void;
        textureLoadComplete(source: BitmapSource): void;
    }
}
declare module rf {
    class DiffFilter extends FilterBase {
        static VERTEX: IShaderCode;
        static FRAGMENT: IShaderCode;
        constructor();
    }
    class UIDiffFilter extends FilterBase {
        static VERTEX: IShaderCode;
        static FRAGMENT: IShaderCode;
        constructor();
    }
    class FillFilter extends FilterBase {
        static FRAGMENT: IShaderCode;
        color: IVector3D;
        constructor(color: number, alpha: number);
        setData(color: number, alpha: number): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
}
declare module rf {
    const enum FilterConst {
        FRESNEL = "fresnel_",
        FRESNEL_ALPHA = "fresnelAlpha_"
    }
    class FresnelFilter extends EventFilter {
        static VERTEX: IShaderCode;
        static FRAGMENT: IShaderCode;
        constructor(type?: FilterConst);
        eye: IVector3D;
        pro: {
            fre: number;
        };
        updatepro(pro: {
            fre: number;
        }): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
        tweenTo(from: number, to: number, durtion: number): void;
        end(): void;
    }
    class FresnelAlphaFilter extends FresnelFilter {
        static VERTEX: IShaderCode;
        static FRAGMENT: IShaderCode;
        constructor(value: number);
        color: IVector3D;
    }
}
declare module rf {
    const enum FilterConst {
        GLOW = "glow_"
    }
    class GlowFilter extends EventFilter {
        constructor();
        blur: IVector3D;
        color: IVector3D;
        strength: IVector3D;
        dist: IVector3D;
        setPropety(color?: number, alpha?: number, blurX?: number, blurY?: number, strength?: number, inner?: boolean, knockout?: boolean): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite): void;
        static FRAGMENT: IShaderCode;
    }
}
declare module rf {
    const enum FilterConst {
        LIU_GUANG = "liuguang_"
    }
    interface ILiuGuangData extends ITexFilterData {
        speed: number;
        scale: number;
        alpha: number;
    }
    class LiuguangFilter extends TexFilter {
        constructor(target: Sprite, data: ILiuGuangData);
        speed: number;
        texData: ILiuGuangData;
        v: IVector3D;
        setData(setting: ILiuGuangData): void;
        textureLoadComplete(source: BitmapSource): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
}
declare module rf {
    class PosFilter extends EventFilter {
        constructor();
        updatepro(pro: {
            x: number;
            y: number;
            z: number;
        }): void;
    }
    class ScaleFilter extends EventFilter {
        constructor();
        updatepro(pro: {
            x: number;
            y: number;
            z: number;
        }): void;
    }
    class RotFilter extends EventFilter {
        constructor();
        updatepro(pro: {
            x: number;
            y: number;
            z: number;
        }): void;
    }
}
declare module rf {
    const enum FilterConst {
        SHADOW = "shadow_"
    }
    class ShadowFilter extends TexFilter {
        target: SceneObject;
        constructor(target: SceneObject);
        v: IVector3D;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
}
declare module rf {
    const enum FilterConst {
        SUN = "sun_"
    }
    class SunFilter extends FilterBase {
        static VERTEX: IShaderCode;
        static FROGMENT: IShaderCode;
        constructor();
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
}
declare module rf {
    class TexChannelFilter extends TexFilter {
        static VERTEX: IShaderCode;
        static FRAGMENT: IShaderCode;
        constructor();
        setEvent(event: ISkillEvent, tick?: boolean): void;
        uv: IVector3D;
        pro: {
            ou: number;
            ov: number;
            su: number;
            sv: number;
        };
        updatepro(pro: {
            ou: number;
            ov: number;
            su: number;
            sv: number;
        }): void;
        textureLoadComplete(source: BitmapSource): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
}
declare module rf {
    class UVAnimFilter extends EventFilter {
        static VERTEX: IShaderCode;
        constructor();
        uv: IVector3D;
        pro: {
            ou: number;
            ov: number;
            su: number;
            sv: number;
        };
        updatepro(pro: {
            ou: number;
            ov: number;
            su: number;
            sv: number;
        }): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
}
declare module rf {
    class BaseMaterial extends Material {
        filters: {
            [key: string]: FilterBase;
        };
        shader?: boolean;
    }
    class ColorMaterial extends Material {
        constructor(color?: number, alpha?: number);
        color: number;
        alpha: number;
        change: boolean;
        setColor(color: number, alpha: number): void;
        setData(data: IMaterialData): void;
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        initFilters(mesh: Mesh): void;
    }
}
declare module rf {
    const enum FilterConst {
        OUT_LINE = "outline_"
    }
    class OutLineFilter extends FilterBase {
        static VERTEX: IShaderCode;
        constructor();
        alpha: number;
        setData(v: number): void;
        setProgramConstants(context: Context3D, program: Program3D, target?: Sprite, camera?: Camera): void;
    }
    class OutLineMaterial extends BaseMaterial {
        filters: {
            [key: string]: FilterBase;
        };
        shader?: boolean;
        constructor(color: number, alpha: number, skeleton?: boolean);
        setColor(color: number, alpha: number): void;
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
    }
}
declare module rf {
    class StandardMaterial extends Material {
        uploadContext(camera: Camera, mesh: Mesh, now: number, interval: number): boolean;
        createProgram(mesh: Mesh): Program3D;
    }
}
declare module rf {
    function loadImage(perfix: string, url: string): Promise<IBitmapSourceVO>;
}
