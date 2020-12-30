module rf {

    /**客户端跳过新手引导*/
    export function passXinshou() {
        rf._passXinshou = true;
        rf.foward(1, { "res.xsYindao": 1 });
        rf.gm("item", 1001, 5);
        console.warn(debug, "新手引导已跳过！！！");
    }

    /***/
    export var debug: string = "c==||====>";

    /**改变主界面组件*/
    export function changeMainDele(top: any, core?: any, bottom: boolean = true, isBack: boolean = false) {

        let main = singleton(MainMediator);

        if (!isBack) {

            let option = { top, core, bottom } as IPageListOption;
            pageList.push(option);

            facade.simpleDispatch(GameEvent.CHANGE_TITLE_BUTTON, true);
        }

        let { top: tp, core: cp, bottom: bp } = main.panel;

        tp.removeAllChild();
        cp.removeAllChild();

        if (top) {
            tp.addChild(top);
        }

        if (core) {
            cp.addChild(core);
        }

        if (bp._visible != bottom) {
            bp.visible = bottom;

            if (bottom) {
                facade.simpleDispatch(GameEvent.CHECK_BUTTON, checkData);
            }
        }
    }

    /**初始化按钮点击效果*/
    export function buttonModels(...buttons: any[]) {
        for (let i = 0; i < buttons.length; i++) {
            const element = buttons[i];
            element.buttonModel(element.w >> 1, element.h >> 1, 0);
        }
    }

    /**设置object开关*/
    export function setVisible(object: any, parent: any, show: boolean, event: boolean = true) {

        if (parent) {
            if (show) {
                parent.addChild(object);
            } else {
                object.remove();
            }
        } else {
            object.alpha = show ? 1 : 0;
            object.mouseEnabled = event && show;
            object.mouseChildren = event && show;
        }

        return object;
    }

    /**设置按钮开关*/
    export function setButtonEnabled(object: any, show: boolean, alpha: number = 0.5) {
        object.alpha = show ? 1 : alpha;
        object.mouseChildren = show;
        object.mouseEnabled = show;
    }

    export function addZhuizongTips(object: any, runtime: ITaskRuntimeData, ox: number = 25, oy: number = 13) {

        let sprite: TSpriteUI = object["zhuizong"];

        let flag = true;

        if (runtime) {
            if (!sprite) {
                sprite = object["zhuizong"] = new TSpriteUI();
                sprite.mouseEnabled = false;
                sprite.mouseChildren = false;
                let { w, h } = object;
                sprite.setPos(w - ox, -oy);
            }

            if (runtime.active) {
                object.addChild(sprite);
                let [url, key] = cfgData[`zhuizongIcon_${runtime.active}`];
                sprite.changeSprite(key, url);
                flag = false;
            }
        }

        if (sprite && flag) {
            // sprite.clear();
            sprite.remove();
        }

        return sprite;
    }

    export function setHongDian(object: any, show: boolean, ox: number = 0, oy: number = 0) {

        let sprite: TSpriteUI = object["hongdian"];

        let flag = true;

        if (show) {
            if (!sprite) {
                sprite = object["hongdian"] = new TSpriteUI();
                sprite.mouseEnabled = false;
                sprite.mouseChildren = false;
                let { w, h } = object;
                sprite.setPos((w >> 1) + ox, (h >> 1) + oy);
            }

            object.addChild(sprite);
            sprite.changeSprite("hongdian");
            flag = false;
        }

        if (sprite && flag) {
            sprite.remove();
        }

        return sprite;
    }

    export function getTimeLength(time: number) {
        let second = time * 0.001;
        let hour = (second / 60) / 60 >> 0;
        let minute = (second / 60) % 60 >> 0;
        return { hour, minute };
    }

    export interface ITime {
        day: number,
        hour: number,
        minute: number,
        second: number
    }

    /**获取时间 通过秒*/
    export function getTimeToS(time: number) {

        // time = time / 1000;

        let day = 0;
        if (time >= 86400) {
            day = time / 86400 >> 0;
            time -= day * 86400;
        }

        let hour = 0;
        if (time >= 3600) {
            hour = time / 3600 >> 0;
            time -= hour * 3600;
        }

        let minute = 0;
        if (time >= 60) {
            minute = time / 60 >> 0;
            time -= minute * 60;
        }

        let second = Math.round(time);

        let data = { day, hour, minute, second } as ITime;

        return data;
    }

    /**格式化字符串*/
    export function formatString(str: string) {

        if (typeof (str) == "string") {
            return str.replace(/丶/g, ".");
        }

        return str;
    }

    /**设置文本内容*/
    export function setText(text: TextField, str: string, color?: number | string, fsize?: number, gap = 2) {

        if (!text) {
            console.error("无法找到组件", str);
            return;
        }

        if (!text.html) {
            text.html = true;
        }

        text.gap = gap;

        text.text = `<font ${color ? `color="${color}"` : ""} ${fsize ? `size="${fsize}"` : ""} >${str}</font>`;

        return text;
    }

    /**设置按钮名字*/
    export function setButtonName(button: Sprite & { btnName?: TextField }, str: string, ox: number = 0, oy: number = 0) {

        if (button.phaseName) {
            __phaseTarget[button.phaseName] = button;
        }

        let { btnName, w, h } = button;

        if (btnName && btnName.mouseEnabled) {
            btnName.mouseChildren = false;
            btnName.mouseEnabled = false;
        }

        let sprite: TSpriteUI = button["sprite"];

        if (!sprite) {
            sprite = new TSpriteUI({ x: 0, y: 0 });
            button.addChild(sprite);
            sprite.mouseEnabled = false;
            sprite.mouseChildren = false;
            button["sprite"] = sprite;
        }

        let config = gameConfig.button[`${str}`];

        if (!config) {
            sprite.clear();

            if (btnName) {
                btnName.text = str;
            }

            console.warn("button表没有此按钮", str);

        } else {
            if (btnName) {
                btnName.text = "";
            }

            sprite.setPos((w >> 1) + ox, (h >> 1) + oy);
            let [url, name] = config.res;
            sprite.changeSprite(name, url);
        }
    }

    /**设置按钮冷却时间*/
    export function setButtonCooling(button: any, coolingTime: number) {
        let { shadow } = button;

        button.mouseEnabled = false;
        button.mouseChildren = false;

        shadow.visible = true;
        shadow.scaleX = 1;

        if (button._tweener) {
            tweenStop(button._tweener);
            // return;
        }

        button._tweener = tweenTo({ scaleX: 0 }, coolingTime, defaultTimeMixer, shadow);

        button._tweener.complete = () => {

            if (button._tweener) {
                button._tweener = undefined;
            }

            shadow.visible = false;
            button.mouseEnabled = true;
            button.mouseChildren = true;
        }
    }

    /**画进度条*/
    export function changeSlider(parent: any, jindu: number, color: number, offsetX: number = 2, offsetY: number = 2) {

        let sp: Sprite = undefined;

        forarr(parent.childrens, (v: any, k, o) => {

            if (v.name == "bar") {
                sp = v;
                return false;
            }
            return true;
        })

        if (!sp) {
            sp = new Sprite();
            sp.name = "bar";
            parent.addChild(sp);

            let { w, h } = parent;
            sp.setSize(w, h);
        }

        let { graphics, w, h } = sp;

        w = w - 2 * offsetX;
        h = h - 2 * offsetY;

        let r = h * 0.5;
        let min = h / w;

        // 左边 r, r, r
        // 中间 r, 0, jindu * (w - h)
        // 右边 jindu * (w - h) + r, r, r

        graphics.clear();
        if (jindu >= min) {
            graphics.drawCircle(r + offsetX, r + offsetY, r, undefined, undefined, color);
            graphics.drawCircle(jindu * (w - h) + r + offsetX, r + offsetY, r, undefined, undefined, color);
            graphics.drawRect(r + offsetX, offsetY, jindu * (w - h), h, color);
        } else if (jindu > 0.1) {
            graphics.drawCircle(r + offsetX, r + offsetY, r, undefined, undefined, color);
        }
        graphics.end();
    }

    /**过长数字转单位*/
    export function numberToKilo(value: number) {
        let str = "";

        if (value > 1000000) {
            value = (value * 0.00001 >> 0);
            let m = value % 10;
            let s = value * 0.1 >> 0;
            let h = m == 0 ? "" : `.${m}`

            str += `${s}${h}M`;
        } else if (value > 1000) {
            value = (value * 0.01 >> 0);
            let m = value % 10;
            let s = value * 0.1 >> 0;
            let h = m == 0 ? "" : `.${m}`

            str += `${s}${h}K`;
        }
        else {
            str += value;
        }

        return str;
    }

    export function numberToM(value: number) {

        if (value > 1000000) {
            value = (value * 0.00001 >> 0);
            let m = value % 10;
            let s = value * 0.1 >> 0;
            let h = (m == 0) ? "" : `.${m}`

            return `${s}${h}M`;
        }

        return value;
    }

    export interface IProStr {
        id: string;
        name: string,
        value: number | string,
    }

    /**获取装备的属性*/
    export function getStrFromPro(runtime: IRespro, gaoji: boolean = false) {

        let list: IProStr[] = [];

        foreach(runtime as any, (v, k: string) => {
            if (!v) {
                return true;
            }

            let ruslut = (basePros.indexOf(k) == -1);//没找到
            ruslut = gaoji ? ruslut : !ruslut

            if (ruslut) {
                return true;
            }

            let runtime = getProDefine("hero", k);

            if (!runtime) {
                console.error(`${debug} 没有找到 ${k}`);
            }

            let str = { id: k, name: runtime.name, value: v } as IProStr;
            list.push(str);

            return true;
        });

        return list;
    }

    /**打断当前状态触发事件*/
    export function interruptedCurrentStateTriggerEvent() {
        let status = modelData.hero.statusDoing;
        switch (status) {
            //睡觉
            case STATUS_DOING.REST: {
                singleton(ShuijiaoPopupComp).open();
                break;
            }
            // 练功
            case STATUS_DOING.PRACTICE: {
                let skillId = modelData.skill.trainSkillId;
                let runtime = modelData.skill.id[skillId];
                singleton(SkillPopupComp).open(runtime);
                break;
            }
            // 读书
            case STATUS_DOING.STUDY: {
                let runtime = {
                    title: "读书中",
                    value: "是否停止读书？",
                    rightEvt: () => {
                        foward(CM_CODE.CM_StopReadBook);
                    }
                } as IPopRuntime;

                singleton(WenziTitleSelectPopup).open(runtime);
                break;
            }
            // 打坐
            case STATUS_DOING.SIT: {
                singleton(DazuoPopupComp).open();
                break;
            }
            // 关卡中打坐
            case STATUS_DOING.GUANKASIT: {
                foward(CM_CODE.CM_StopSit);
                addPrompt("当前打坐已中断！", Style.RED);
                break;
            }
        }
    }

    export function setTaskTrack(obj: any) {

        let { track } = obj;

        if (track) {

            let comp: TrackTaskComp = track["track"];
            if (!comp) {
                comp = track["track"] = new TrackTaskComp();
                track.addChildAt(comp, 0);
            }

            let { runtimes, trackGuid } = modelData.task;
            if (trackGuid) {
                comp.data = runtimes[trackGuid];
            } else {
                comp.clear();
            }

        } else {
            console.error("没有设置对应track组件");
        }
    }

    export var zhuangchang: Sprite = undefined;
    export var zc_tween: ScriptTween = undefined;

    // time 延迟 0 第一组time延迟 1 第二组time延迟
    // duration 时长 0 第一组duration时长 1 第二组duration时长
    export function zhuanchangAction(time?: number[], duration?: number[]) {

        if (!zhuangchang) {
            zhuangchang = new Sprite();
            let { graphics } = zhuangchang;
            graphics.clear();
            graphics.drawRect(0, 0, stageWidth, stageHeight, 0, 1);
            graphics.end();
        }

        tipContainer.addChild(zhuangchang);

        forarr(zhuanchang_effect, (v, k) => {
            if (time == undefined) {
                return false;
            }
            v.time = time[k];
            v.duration = duration[k];
            return true;
        });

        if (zc_tween) {
            zc_tween.stop();
        }

        zhuangchang.alpha = 0;

        zc_tween = scriptTween_play(zhuangchang, zhuanchang_effect, defaultTimeMixer);
        zc_tween.on(EventT.COMPLETE, () => {
            zc_tween = undefined;
            zhuangchang.remove();
        }, zhuangchang);
    }

    export function charDetect2(str: string) {
        let chars = str.split("");
        let legitimate = true;

        let result = /[^\u4e00-\u9fa5]/g;
        forarr(chars, (char: string) => {
            let code = result.test(char);
            if (code) {
                legitimate = false;
                return false;
            }
            return true;
        });
        return legitimate;
    }
}

