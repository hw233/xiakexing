module rf {
    export interface IGameConfig {
        system: IPanelSystem
    }

    export var input_format: TextFormat = undefined;
    export var inputSource: BitmapSource = undefined;

    export var cfgData: IPanelSystemSystem;

    export var serversBool: boolean = true;

    export class Main extends AppBase {

        init(canvas: HTMLCanvasElement): void {

            deviceOrientation = IDeviceOrientation.PORTRAIT;
            setDisplayArea(640, 1080);

            super.init(canvas);

            rf.refresh_uv_setting = 0.2;

            context3D.defauleMag = WebGLConst.LINEAR;
            // let gui = singleton(GUIProfile);
            // gui.setPos(10,70);
            // ROOT.addChild(gui);

            rf.phaseDebug = false;
            rf.socketMessageFlag = Number.MAX_VALUE;

            input_format = defalue_format.clone();
            input_format.family = "楷体";
            input_format.bold = "bold";
            input_format.leading = -5;
            input_format.init();

            let { resroot, confroot, assetsroot, params } = launchData;

            if (params.local) {
                let root = "http://127.0.0.1/xiakexing/";
                resroot = root + "res/"
                confroot = root + "conf/zhcn/trunk/"
                assetsroot = root + "res/"
            }

            RES_PERFIX = resroot;
            CONFIG_PERFIX = confroot;
            ASSSETS_PERFIX = assetsroot;

            TComponentClass = {
                1: TComponent,
                2: TextField,
                3: Button,
                4: TProgressBar,
            }

            if (!ScriptTweenIns) {
                ScriptTweenIns = {};
            }

            ScriptTweenIns = {
                "pro": STweenPro,
                "scale": STweenBase,
                "alpha": STweenBase,
                "liner": STweenLiner,
                "scaleX": STweenBase,
                "rotationZ": STweenBase,
                "y": STweenBase,
            }

            tween_ease_function["back.out"] = ease_back_out;
            tween_ease_function["back.in"] = ease_back_in;
            tween_ease_function["back.inout"] = ease_back_inout;
            tween_ease_function["quartic.in"] = ease_quartic_in;
            tween_ease_function["quartic.out"] = ease_quartic_out;
            tween_ease_function["quartic.inout"] = ease_quartic_inout;

            regGameScene(new ScenePreLoad());
            regGameScene(new SceneCreate());
            regGameScene(new SceneGame());

            let bg = singleton(TBackground);
            bg.change("bg/loginbg.png");
            ROOT.addChildAt(bg, 0);

            switchGameScene(GameSceneEnum.PRE_LOAD);

            // ROOT.on(MouseEventX.CLICK, this.playbgm, this);

            rf.toTextFormat = function (data: object) {
                let format = new TextFormat();
                pro_copy(format, data);
                format.family = "Tianshi-Yanti";
                if (format.stroke) {
                    format.stroke.size = ~~format.stroke.size;
                }
                format.init();
                return format;
            }

            this.test();
        }

        // playbgm() {
        //     addPrompt("播放音乐！");
        //     playBgmKeyByAudio("chuangjue");
        //     ROOT.off(MouseEventX.CLICK, this.playbgm, this);
        // }

        createSource() {

            componentSource = createBitmapSource("component", 1024, 1024, true);
            textSource = createBitmapSource("textsource", 2048, 2048, true);
            textSource2 = createBitmapSource("textsource2", 2048, 2048, true);
            inputSource = createBitmapSource("inputSource", 2048, 2048, true);
        }

        /**
         * 测试用
         */
        test(){

            // let test = new TAnimation();
            // tipContainer.addChild(test);
            // test.create(RES_PERFIX,"animation/jiantou/","jiantouyou");
            // let test = new TSpriteUI();
            // tipContainer.addChild(test);
            // test.changeSprite("querenxuanze","button");
        }

    }
}