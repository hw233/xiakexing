
if (typeof global != "undefined") {
    rf = global["rf"] || {};
}
if (typeof GameGlobal != "undefined") {
    rf = GameGlobal["rf"] || {};
}
var rf;
(function (rf) {
    function createRewardedVideoAd(option) {
        return ad;
    }
    rf.createRewardedVideoAd = createRewardedVideoAd;
    var RewardedVideoAd = (function () {
        function RewardedVideoAd() {
            this.showinterval = -1;
            this.onLoadFuncs = [];
            this.onCloseFuncs = [];
            this.lastTime = 15;
            var div = document.createElement("div");
            var style = div.style;
            style.position = "absolute";
            style.width = "100%";
            style.height = "100%";
            style.backgroundColor = "aliceblue";
            style.top = "0px";
            style.left = "0px";
            div.innerHTML = "\n            <div style=\"position: absolute;top: 50px;left: 50px;\">\n                <font size=20> <span id=\"ad_time_text\">15\u79D2</span> </font>\n                <br>\n                <button id=\"ad_normal_button\" type=\"button\" style=\"width: 100px; height: 50px;\">\u666E\u901A\u5173\u95ED</button>\n                <br>\n                <button id=\"ad_complete_button\" type=\"button\" style=\"width: 100px; height: 50px;\">\u770B\u5B8C\u5173\u95ED</button>\n            </div>\n            ";
            this.div = div;
        }
        RewardedVideoAd.prototype.normalButtonClickHandler = function () {
            this.destroy();
        };
        RewardedVideoAd.prototype.completeButtonClickHandler = function () {
            this.lastTime = 0;
            this.destroy();
        };
        RewardedVideoAd.prototype.load = function () {
            function executor(resolve, reject) {
                resolve();
            }
            return new Promise(executor);
        };
        RewardedVideoAd.prototype.update = function () {
            this.txt.innerText = this.lastTime + "\u79D2";
            this.lastTime--;
            if (this.lastTime < 0) {
                clearInterval(this.showinterval);
                this.showinterval = -1;
            }
        };
        RewardedVideoAd.prototype.show = function () {
            var that = this;
            function executor(resolve, reject) {
                if (that.showinterval == -1) {
                    that.lastTime = 15;
                    that.showinterval = setInterval(that.update.bind(that), 1000);
                    document.body.append(that.div);
                    that.txt = document.getElementById("ad_time_text");
                    that.normalButton = document.getElementById("ad_normal_button");
                    that.completeButton = document.getElementById("ad_complete_button");
                    that.normalButton.onclick = that.normalButtonClickHandler.bind(that);
                    that.completeButton.onclick = that.completeButtonClickHandler.bind(that);
                    that.update();
                    resolve();
                }
                else {
                    reject();
                }
            }
            return new Promise(executor);
        };
        RewardedVideoAd.prototype.destroy = function () {
            var _a = this, onCloseFuncs = _a.onCloseFuncs, showinterval = _a.showinterval, div = _a.div, lastTime = _a.lastTime;
            if (showinterval != -1) {
                clearInterval(showinterval);
                this.showinterval = -1;
            }
            div.remove();
            var isEnded = lastTime <= 0;
            var out = { compId: 0, state: "close", isEnded: isEnded };
            for (var i = 0; i < onCloseFuncs.length; i++) {
                onCloseFuncs[i](out);
            }
        };
        RewardedVideoAd.prototype.onLoad = function (func) {
            var onLoadFuncs = this.onLoadFuncs;
            if (onLoadFuncs.indexOf(func) == -1) {
                onLoadFuncs.push(func);
            }
        };
        RewardedVideoAd.prototype.offLoad = function (func) {
            var onLoadFuncs = this.onLoadFuncs;
            var i = onLoadFuncs.indexOf(func);
            if (i != -1) {
                onLoadFuncs.splice(i, 1);
            }
        };
        RewardedVideoAd.prototype.onError = function (func) {
        };
        RewardedVideoAd.prototype.offError = function (func) {
        };
        RewardedVideoAd.prototype.onClose = function (func) {
            var onCloseFuncs = this.onCloseFuncs;
            if (onCloseFuncs.indexOf(func) == -1) {
                onCloseFuncs.push(func);
            }
        };
        RewardedVideoAd.prototype.offClose = function (func) {
            var onCloseFuncs = this.onCloseFuncs;
            var i = onCloseFuncs.indexOf(func);
            if (i != -1) {
                onCloseFuncs.splice(i, 1);
            }
        };
        return RewardedVideoAd;
    }());
    rf.RewardedVideoAd = RewardedVideoAd;
    var ad = new RewardedVideoAd();
})(rf || (rf = {}));
var rf;
(function (rf) {
    function login(options) {
        setTimeout(function () {
            var account = options.account, complete = options.complete;
            complete({ errMsg: "login:ok", code: account });
        }, 200);
    }
    rf.login = login;
    function checkSession(options) {
        setTimeout(function () {
            var complete = options.complete;
            complete({ errMsg: "refreshSession:ok" });
        }, 200);
    }
    rf.checkSession = checkSession;
    function getLaunchOptionsSync() {
        return {};
    }
    rf.getLaunchOptionsSync = getLaunchOptionsSync;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var buffers = {};
    var audios = [];
    rf.createInnerAudioContext = function () {
        return new InnerAudioContext(new (window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"])());
    };
    var InnerAudioContext = (function () {
        function InnerAudioContext(audiocontext) {
            this.autoplay = false;
            this.loop = false;
            this._vol = 1;
            this.audiocontext = audiocontext;
            if (audiocontext) {
                this.volNode = audiocontext.createGain();
                this.volNode.connect(audiocontext.destination);
            }
            this.childs = {};
        }
        Object.defineProperty(InnerAudioContext.prototype, "volume", {
            get: function () {
                return this._vol;
            },
            set: function (val) {
                var _a = this, volNode = _a.volNode, childs = _a.childs;
                this._vol = val;
                if (volNode) {
                    volNode.gain.value = val;
                }
                else {
                    for (var key in childs) {
                        var target = childs[key].target;
                        if (!target.ended)
                            target.volume = val;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InnerAudioContext.prototype, "src", {
            set: function (val) {
                var _a = this, autoplay = _a.autoplay, loop = _a.loop, childs = _a.childs, audiocontext = _a.audiocontext;
                var audioObj = childs[val];
                if (audiocontext) {
                    var thisobj_1 = this;
                    if (audiocontext.state == "suspended") {
                        audiocontext.resume().then(function () {
                            thisobj_1.src = val;
                        });
                        return;
                    }
                    this.childs[val] = audioObj = this.createsource(autoplay, loop);
                    var buffer = buffers[val];
                    if (!buffer) {
                        var request_1 = new XMLHttpRequest();
                        request_1.open("GET", val);
                        request_1.responseType = "arraybuffer";
                        request_1.onreadystatechange = function () {
                            if (request_1.readyState === 4) {
                                if (request_1.status === 200) {
                                    audiocontext.decodeAudioData(request_1.response, function (decodeBuffer) {
                                        audioObj.duration = decodeBuffer.duration;
                                        buffers[val] = decodeBuffer;
                                        if (audiocontext.state == "running") {
                                            thisobj_1.playSingle(decodeBuffer, val, autoplay, loop, true);
                                        }
                                    });
                                }
                            }
                        };
                        request_1.send();
                    }
                    else {
                        if (audiocontext.state == "running") {
                            audioObj.starttime = new Date().getTime();
                            audioObj.duration = buffers[val].duration;
                            this.playSingle(buffers[val], val, autoplay, loop);
                        }
                    }
                }
                else {
                    if (!audioObj)
                        this.childs[val] = audioObj = getFreeAudio(autoplay, loop);
                    audioObj.target.src = val;
                    if (!loop) {
                        audioObj.target.onended = this.audioEnd.bind(this);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        InnerAudioContext.prototype.play = function () {
            var _a = this, childs = _a.childs, audiocontext = _a.audiocontext;
            if (audiocontext) {
                if (audiocontext.state == "suspended") {
                    var thisobj_2 = this;
                    audiocontext.resume().then(function () { thisobj_2.play(); });
                    return;
                }
            }
            for (var key in childs) {
                var _b = childs[key], target = _b.target, loop = _b.loop, autoplay = _b.autoplay;
                if (target instanceof HTMLAudioElement) {
                    target.play();
                }
                else {
                    this.playSingle(buffers[key], key, autoplay, loop);
                }
            }
        };
        InnerAudioContext.prototype.pause = function () {
            var _a = this, audiocontext = _a.audiocontext, childs = _a.childs;
            if (audiocontext) {
                audiocontext.suspend();
            }
            else {
                for (var key in childs) {
                    var target = childs[key].target;
                    if (!target.ended)
                        target.pause();
                }
            }
        };
        InnerAudioContext.prototype.stop = function () {
            var _a = this, audiocontext = _a.audiocontext, childs = _a.childs;
            for (var key in childs) {
                var needdel = true;
                var _b = childs[key], target = _b.target, loop = _b.loop;
                if (target instanceof HTMLAudioElement) {
                    target.pause();
                    target.currentTime = 0;
                    target.onended = undefined;
                    if (loop) {
                        needdel = false;
                    }
                    else {
                        childs[key].target = target = undefined;
                    }
                }
                else {
                    if (target) {
                        target.onended = undefined;
                        target.disconnect();
                        childs[key].target = target = undefined;
                    }
                    if (loop)
                        needdel = false;
                }
                if (needdel)
                    delete childs[key];
            }
            if (audiocontext)
                audiocontext.suspend();
            this.childs = childs;
        };
        InnerAudioContext.prototype.destroy = function () {
        };
        InnerAudioContext.prototype.onCanplay = function (callback) { };
        InnerAudioContext.prototype.onEnded = function (callback) { };
        InnerAudioContext.prototype.onPause = function (callback) { };
        InnerAudioContext.prototype.onError = function (callback) { };
        InnerAudioContext.prototype.onPlay = function (callback) { };
        InnerAudioContext.prototype.onStop = function (callback) { };
        InnerAudioContext.prototype.onWaiting = function (callback) { };
        InnerAudioContext.prototype.onTimeUpdate = function (callback) { };
        InnerAudioContext.prototype.playSingle = function (data, key, autoplay, loop, needJump) {
            var _a = this, childs = _a.childs, audiocontext = _a.audiocontext, volNode = _a.volNode;
            if (audiocontext) {
                if (audiocontext.state == "suspended") {
                    var thisobj_3 = this;
                    var vo_1 = data;
                    audiocontext.resume().then(function () {
                        thisobj_3.playSingle(vo_1, key, autoplay, loop, needJump);
                    });
                    return;
                }
                if (audiocontext.state == "running") {
                    var ctime = 0;
                    var audioObj = childs[key];
                    childs[key] = audioObj = this.createsource(autoplay, loop, audioObj);
                    var starttime = audioObj.starttime, duration = audioObj.duration, target = audioObj.target;
                    if (data) {
                        if ((starttime + duration) >= audiocontext.currentTime) {
                            console.log("超出播放区域", key, starttime, duration, audiocontext.currentTime);
                            return;
                        }
                        ctime = needJump ? (audiocontext.currentTime - starttime) : 0;
                    }
                    else {
                        starttime = audiocontext.currentTime;
                    }
                    target.buffer = data ? data : buffers[key];
                    target.connect(volNode);
                    target.start(ctime);
                }
            }
        };
        InnerAudioContext.prototype.audioEnd = function (e) {
            var _audio = e.currentTarget;
            var childs = this.childs;
            for (var key in childs) {
                var target = childs[key].target;
                if (target == _audio) {
                    _audio.onended = undefined;
                    delete childs[key];
                    break;
                }
            }
        };
        InnerAudioContext.prototype.endHandler = function (e) {
            var _audio = e.currentTarget;
            var childs = this.childs;
            for (var key in childs) {
                var target = childs[key].target;
                if (target == _audio) {
                    _audio.onended = undefined;
                    _audio.disconnect();
                    _audio = undefined;
                    delete childs[key];
                    break;
                }
            }
        };
        InnerAudioContext.prototype.createsource = function (autoplay, loop, target) {
            var audiocontext = this.audiocontext;
            var source = audiocontext.createBufferSource();
            source.loop = loop;
            if (!loop)
                source.onended = this.endHandler.bind(this);
            if (target) {
                try {
                    var os = target.target;
                    if (os) {
                        os.onended = undefined;
                        os.disconnect();
                        os = undefined;
                    }
                    target = undefined;
                }
                catch (error) {
                    console.log(error);
                    console.log(error.stack);
                }
            }
            return { autoplay: autoplay, loop: loop, target: source, starttime: audiocontext.currentTime };
        };
        return InnerAudioContext;
    }());
    rf.InnerAudioContext = InnerAudioContext;
    function getFreeAudio(autoplay, loop) {
        var audio;
        for (var i = 0; i < audios.length; i++) {
            audio = audios[i];
            if (audio.ended || (audio.paused && audio.currentTime == 0)) {
                audio.autoplay = autoplay;
                audio.loop = loop;
                return { autoplay: autoplay, loop: loop, target: audio };
            }
        }
        audio = new Audio();
        audio.autoplay = autoplay;
        audio.loop = loop;
        audios.push(audio);
        return { autoplay: autoplay, loop: loop, target: audio };
    }
})(rf || (rf = {}));
var rf;
(function (rf) {
    function createBannerAd(option) {
        return new BannerAd(option);
    }
    rf.createBannerAd = createBannerAd;
    var ad = new rf.RewardedVideoAd();
    var BannerAd = (function () {
        function BannerAd(option) {
            this.onLoadFuncs = [];
            this.onCloseFuncs = [];
            this.option = option;
            var _a = option.style, width = _a.width, height = _a.height, left = _a.left, top = _a.top;
            var button = document.createElement("button");
            var style = button.style;
            style.position = "absolute";
            style.textAlign = "center";
            style.backgroundColor = "aliceblue";
            style.left = left + "px";
            style.top = top + "px";
            style.width = width + "px";
            style.height = height + "px";
            style.lineHeight = height + "px";
            button.innerHTML = "<font size=\"20\">Banner</font>";
            this.button = button;
        }
        BannerAd.prototype.show = function () {
            var that = this;
            function executor(resolve, reject) {
                document.body.append(that.button);
                that.button.onclick = that.adButtonClickHandler.bind(that);
                resolve();
            }
            return new Promise(executor);
        };
        BannerAd.prototype.adButtonClickHandler = function (event) {
            ad.show();
        };
        BannerAd.prototype.destroy = function () {
            var _a = this, onCloseFuncs = _a.onCloseFuncs, div = _a.button;
            div.remove();
            var isEnded = false;
            for (var i = 0; i < onCloseFuncs.length; i++) {
                onCloseFuncs[i](isEnded);
            }
        };
        BannerAd.prototype.onLoad = function (func) {
            var onLoadFuncs = this.onLoadFuncs;
            if (onLoadFuncs.indexOf(func) == -1) {
                onLoadFuncs.push(func);
            }
        };
        BannerAd.prototype.offLoad = function (func) {
            var onLoadFuncs = this.onLoadFuncs;
            var i = onLoadFuncs.indexOf(func);
            if (i != -1) {
                onLoadFuncs.splice(i, 1);
            }
        };
        BannerAd.prototype.onResize = function (func) {
        };
        BannerAd.prototype.hide = function () {
        };
        BannerAd.prototype.onError = function (func) {
        };
        BannerAd.prototype.offError = function (func) {
        };
        BannerAd.prototype.onClose = function (func) {
            var onCloseFuncs = this.onCloseFuncs;
            if (onCloseFuncs.indexOf(func) == -1) {
                onCloseFuncs.push(func);
            }
        };
        BannerAd.prototype.offClose = function (func) {
            var onCloseFuncs = this.onCloseFuncs;
            var i = onCloseFuncs.indexOf(func);
            if (i != -1) {
                onCloseFuncs.splice(i, 1);
            }
        };
        return BannerAd;
    }());
    rf.BannerAd = BannerAd;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function openCustomerServiceConversation(option) { }
    rf.openCustomerServiceConversation = openCustomerServiceConversation;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.cookie = {};
    function cookie_init() {
        var str = document.cookie + ";";
        var o = /data=(.*?);/.exec(str);
        if (!o) {
            return;
        }
        try {
            rf.cookie = JSON.parse(o[1]);
        }
        catch (error) {
            rf.cookie = {};
        }
    }
    rf.cookie_init = cookie_init;
    function cookie_flush() {
        var data = "data=" + JSON.stringify(rf.cookie);
        document.cookie = data;
    }
    rf.cookie_flush = cookie_flush;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function createCanvas() {
        return document.createElement("canvas");
    }
    rf.createCanvas = createCanvas;
    function createImage() {
        return document.createElement("img");
    }
    rf.createImage = createImage;
    function setPreferredFramesPerSecond(fps) {
    }
    rf.setPreferredFramesPerSecond = setPreferredFramesPerSecond;
    function initSystemInfo() {
        var info = {};
        var pixelRatio = window.devicePixelRatio;
        if (~~pixelRatio == 0) {
            var getPixelRatio = function (context) {
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            };
            pixelRatio = getPixelRatio(document.createElement("canvas").getContext("2d"));
        }
        info.pixelRatio = pixelRatio;
        info.devicePixelRatio = pixelRatio;
        var scene = window.screen;
        info.screenWidth = scene.width;
        info.screenHeight = scene.height;
        info.windowWidth = window.innerWidth;
        info.windowHeight = window.innerHeight;
        info.safeArea = { left: 0, right: info.windowWidth, top: 0, bottom: info.windowHeight, width: info.windowWidth, height: info.screenHeight };
        info.fontSizeSetting = 16;
        var userAgentInfo = navigator.userAgent.toLocaleLowerCase();
        if (userAgentInfo.search(/ios|iphone|ipad/) != -1) {
            info.platform = "iPhone";
            rf.no_ismobile = true;
            rf.no_isIphone = true;
        }
        else if (userAgentInfo.search(/android|pad/) != -1) {
            info.platform = "android";
            rf.no_ismobile = true;
        }
        else {
            info.platform = "pc";
            rf.no_ismobile = false;
            rf.no_isIphone = false;
        }
        info.statusBarHeight = 0;
        rf.no_systemInfo = info;
        window.addEventListener("focusin", windowFocusHandler);
        window.addEventListener("focusout", windowFocusHandler);
        document.addEventListener("visibilitychange", visibilitychange);
    }
    rf.initSystemInfo = initSystemInfo;
    function getSystemInfoSync() {
        if (!rf.no_systemInfo) {
            initSystemInfo();
        }
        return rf.no_systemInfo;
    }
    rf.getSystemInfoSync = getSystemInfoSync;
    function windowFocusHandler(e) {
        if (e.target instanceof HTMLInputElement && e.target.id == "txt_input") {
            if (e.type == "focusin") {
                rf.no_softKeyboard = true;
                console.log("开启键盘");
                rf.input_interval();
            }
            else if (rf.no_softKeyboard) {
                rf.no_softKeyboard = false;
                console.log("关闭键盘");
                rf.hideKeyboard();
            }
        }
    }
    function visibilitychange(e) {
        var funcs = document.visibilityState == "hidden" ? hideFuncs : showFuncs;
        for (var i = 0; i < funcs.length; i++) {
            funcs[i]();
        }
    }
    function updateOrientation(e) {
        var orientation = window.orientation;
        switch (orientation) {
            case 90:
            case -90:
                orientation = 'landscape';
                break;
            default:
                orientation = 'portrait';
                break;
        }
    }
    function onWindowResize(callback) {
        var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
        rf.no_stageWidth = innerWidth;
        rf.no_stageHeight = innerHeight;
        window.onresize = function (e) {
            var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
            if (rf.no_ismobile) {
                if (rf.no_stageWidth < innerWidth) {
                    rf.no_stageWidth = innerWidth;
                }
                if (rf.no_stageHeight < innerHeight) {
                    rf.no_stageHeight = innerHeight;
                }
                else if (rf.no_stageHeight > innerHeight) {
                }
                else {
                    if (rf.no_softKeyboard) {
                        console.log("Resize 关闭键盘");
                        rf.no_softKeyboard = false;
                        rf.hideKeyboard();
                    }
                }
            }
            callback({ windowWidth: innerWidth, windowHeight: innerHeight });
        };
    }
    rf.onWindowResize = onWindowResize;
    function resetCssStyle(style) {
        for (var id in style) {
            var element = document.getElementById(id);
            if (element) {
                var setting = style[id];
                var styles = element.style;
                for (var key in setting) {
                    styles[key] = setting[key];
                }
            }
        }
    }
    rf.resetCssStyle = resetCssStyle;
    var focustimer = undefined;
    var showFuncs = [];
    var hideFuncs = [];
    function onShow(callback) {
        var i = showFuncs.indexOf(callback);
        if (i == -1) {
            showFuncs.push(callback);
        }
    }
    rf.onShow = onShow;
    function offShow(callback) {
        var i = showFuncs.indexOf(callback);
        if (i != -1) {
            showFuncs.splice(i, 1);
        }
    }
    rf.offShow = offShow;
    function onHide(callback) {
        var i = hideFuncs.indexOf(callback);
        if (i == -1) {
            hideFuncs.push(callback);
        }
    }
    rf.onHide = onHide;
    function offHide(callback) {
        var i = hideFuncs.indexOf(callback);
        if (i != -1) {
            hideFuncs.splice(i, 1);
        }
    }
    rf.offHide = offHide;
    function onAudioInterruptionBegin(callback) {
    }
    rf.onAudioInterruptionBegin = onAudioInterruptionBegin;
    function onAudioInterruptionEnd(callback) {
    }
    rf.onAudioInterruptionEnd = onAudioInterruptionEnd;
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    rf.arrayBufferToBase64 = arrayBufferToBase64;
    ;
    function onMemoryWarning(callback) {
    }
    rf.onMemoryWarning = onMemoryWarning;
    function exitMiniProgram(res) {
    }
    rf.exitMiniProgram = exitMiniProgram;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function downloadFile(option) {
    }
    rf.downloadFile = downloadFile;
    var DownloadTask = (function () {
        function DownloadTask(option) {
            this.option = option;
        }
        DownloadTask.prototype.abort = function () {
        };
        DownloadTask.prototype.onProgressUpdate = function (callback) {
        };
        return DownloadTask;
    }());
    rf.DownloadTask = DownloadTask;
    function request(option) {
        var xhr;
        if (window["XMLHttpRequest"]) {
            xhr = new window["XMLHttpRequest"]();
        }
        else {
            xhr = new window["ActiveXObject"]("MSXML2.XMLHTTP");
        }
        var header = option.header, responseType = option.responseType, method = option.method, url = option.url, data = option.data;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == xhr.OPENED) {
                if (header) {
                    for (var key in header) {
                        xhr.setRequestHeader(key, header[key]);
                    }
                }
            }
            if (xhr.readyState == 4) {
                var data_1;
                if (xhr.response != undefined) {
                    data_1 = xhr.response;
                }
                else if (responseType == "text") {
                    return xhr.responseText;
                }
                else if (responseType == "arraybuffer" && /msie 9.0/i.test(navigator.userAgent)) {
                    var w = window;
                    return w["convertResponseBodyToText"](xhr["responseBody"]);
                }
                var statusCode = xhr.status;
                var complete = option.complete;
                if (undefined != complete) {
                    complete({ data: data_1, statusCode: statusCode });
                }
            }
        };
        xhr.responseType = responseType;
        xhr.open(method, url, true);
        xhr.send(data);
    }
    rf.request = request;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function getFileSystemManager() {
        if (localStorage) {
            return fileSystem;
        }
        return undefined;
    }
    rf.getFileSystemManager = getFileSystemManager;
    var FileSystemManager = (function () {
        function FileSystemManager() {
        }
        FileSystemManager.prototype.appendFileSync = function (filePath, data, encoding) {
            console.log("appendFileSync 没有实现");
        };
        FileSystemManager.prototype.accessSync = function (path) {
            return localStorage.getItem(path) !== undefined;
        };
        FileSystemManager.prototype.copyFileSync = function (srcPath, destPath) {
            var item = this.readFileData(srcPath);
            if (item !== undefined) {
                if (item.type != 1) {
                    this.writeFileData(destPath, this.toFileData(destPath, item.value));
                }
            }
        };
        FileSystemManager.prototype.toFileData = function (filePath, value) {
            var createTime = Date.now();
            var size = value.length;
            return { filePath: filePath, createTime: createTime, size: size, value: value };
        };
        FileSystemManager.prototype.readFileData = function (filePath) {
            var item = localStorage.getItem(filePath);
            if (item !== undefined) {
                return JSON.parse(item);
            }
            return undefined;
        };
        FileSystemManager.prototype.writeFileData = function (filePath, value) {
            localStorage.setItem(filePath, JSON.stringify(value));
        };
        FileSystemManager.prototype.getSavedFileList = function (option) {
            var fileList = [];
            var len = localStorage.length;
            for (var i = 0; i < len; i++) {
                var path = localStorage.key(i);
                var data = this.readFileData(path);
                if (data !== undefined) {
                    fileList.push(data);
                }
            }
            var res = { fileList: fileList };
            var success = option.success, complete = option.complete;
            if (complete !== undefined) {
                complete(res);
            }
            if (success !== undefined) {
                success(res);
            }
        };
        FileSystemManager.prototype.getFileInfo = function (option) {
        };
        FileSystemManager.prototype.removeSavedFile = function (option) {
        };
        FileSystemManager.prototype.mkdir = function (option) {
        };
        FileSystemManager.prototype.mkdirSync = function (dirPath, recursive) {
        };
        FileSystemManager.prototype.readFile = function (option) {
        };
        FileSystemManager.prototype.readFileSync = function (filePath, encoding, position, length) {
        };
        FileSystemManager.prototype.writeFile = function (option) {
        };
        FileSystemManager.prototype.writeFileSync = function (filePath, data, encoding) {
        };
        FileSystemManager.prototype.readdir = function (option) {
        };
        FileSystemManager.prototype.rmDir = function (option) {
        };
        FileSystemManager.prototype.rename = function (option) {
        };
        FileSystemManager.prototype.stat = function (option) {
            return undefined;
        };
        FileSystemManager.prototype.statSync = function (path) {
            return undefined;
        };
        FileSystemManager.prototype.unlink = function (option) {
        };
        FileSystemManager.prototype.unzip = function (option) {
        };
        return FileSystemManager;
    }());
    rf.FileSystemManager = FileSystemManager;
    var fileSystem = new FileSystemManager();
    var Stats = (function () {
        function Stats() {
        }
        Stats.prototype.isDirectory = function () {
            return false;
        };
        Stats.prototype.isFile = function () {
            return false;
        };
        return Stats;
    }());
    rf.Stats = Stats;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function loadFont(path, family, option) {
        if (typeof FontFace != 'undefined') {
            var source = "url('" + path + "')";
            console.log("FontFace " + family + " " + source);
            var fontFace = new FontFace(family, source);
            document["fonts"].add(fontFace);
            fontFace.source = source;
            fontFace.load();
            function onComplete() {
                if (option.complete) {
                    option.complete(fontFace, undefined);
                }
            }
            fontFace.loaded.then(function () {
                onComplete();
            }, function () {
                onComplete();
            });
        }
        else {
            var styles = document.createElement('style');
            styles.innerHTML = "@font-face{font-family:\"" + family + "\";src:\"url(" + path + ")\" format(\"truetype\");font-display:swap;}";
            document.getElementsByTagName('head')[0].appendChild(styles);
            if (option.complete) {
                option.complete(undefined, styles);
            }
        }
        return family;
    }
    rf.loadFont = loadFont;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function showToast(option) {
    }
    rf.showToast = showToast;
    function hideToast(option) {
    }
    rf.hideToast = hideToast;
    function showActionSheet(option) {
    }
    rf.showActionSheet = showActionSheet;
    var loadingDiv;
    function showLoading(option) {
        if (!loadingDiv) {
            var div = document.createElement("div");
            var style_1 = div.style;
            style_1.position = "absolute";
            style_1.width = "100%";
            style_1.height = "100%";
            style_1.top = "0px";
            style_1.left = "0px";
            style_1.textShadow = "#FFF 1px 0 0, #FFF 0 1px 0, #FFF -1px 0 0, #FFF 0 -1px 0";
            loadingDiv = div;
        }
        var style = loadingDiv.style;
        loadingDiv.innerHTML = option.title;
        document.body.append(loadingDiv);
    }
    rf.showLoading = showLoading;
    function hideLoading(option) {
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }
    rf.hideLoading = hideLoading;
    function showModal(option) {
    }
    rf.showModal = showModal;
    function getMenuButtonBoundingClientRect() {
        return { width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
    }
    rf.getMenuButtonBoundingClientRect = getMenuButtonBoundingClientRect;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function onKeyboardInput(callback) {
        rf.keyboardInputCallBack = callback;
    }
    rf.onKeyboardInput = onKeyboardInput;
    function offKeyboardInput(callback) {
        if (callback == rf.keyboardInputCallBack) {
            rf.keyboardInputCallBack = undefined;
        }
    }
    rf.offKeyboardInput = offKeyboardInput;
    function onKeyboardConfirm(callback) {
        rf.keyboardConfirmCallBack = callback;
    }
    rf.onKeyboardConfirm = onKeyboardConfirm;
    function offKeyboardConfirm(callback) {
        if (callback == rf.keyboardConfirmCallBack) {
            rf.keyboardConfirmCallBack = undefined;
        }
    }
    rf.offKeyboardConfirm = offKeyboardConfirm;
    function onKeyboardComplete(callback) {
        rf.keyboardCompleteCallBack = callback;
    }
    rf.onKeyboardComplete = onKeyboardComplete;
    function offKeyboardComplete(callback) {
        if (rf.keyboardCompleteCallBack == callback) {
            rf.keyboardCompleteCallBack = undefined;
        }
    }
    rf.offKeyboardComplete = offKeyboardComplete;
    var input_option = { width: 0, height: 0 };
    function input_interval() {
        var input = document.getElementById("txt_input");
        if (input) {
            var container2d = document.getElementById("container2d");
            if (rf.no_softKeyboard && !rf.no_isIphone) {
                var d = Math.floor((window.innerHeight / input_option.height) * container2d.offsetHeight);
                if (d < input.offsetTop) {
                    input.style.top = Math.floor(d - input.offsetHeight) + "px";
                }
                setTimeout(input_interval, 200);
            }
        }
    }
    rf.input_interval = input_interval;
    function showKeyboard(option) {
        var defaultValue = option.defaultValue, maxLength = option.maxLength, confirmHold = option.confirmHold, confirmType = option.confirmType, x = option.x, y = option.y, style = option.style;
        input_option.width = window.innerWidth;
        input_option.height = window.innerHeight;
        for (var id in style) {
            var element = document.getElementById(id);
            if (element) {
                var setting = style[id];
                var styles = element.style;
                for (var key in setting) {
                    styles[key] = setting[key];
                }
            }
        }
        var input = document.getElementById("txt_input");
        if (input) {
            maxLength = ~~maxLength;
            if (maxLength <= 0) {
                maxLength = 100;
            }
            input.value = defaultValue ? defaultValue : "";
            input.maxLength = maxLength;
            input.onchange = function (e) {
                if (undefined != rf.keyboardInputCallBack) {
                    rf.keyboardInputCallBack(input);
                }
            };
            input.focus();
        }
    }
    rf.showKeyboard = showKeyboard;
    function hideKeyboard(option) {
        var input = document.getElementById("txt_input");
        if (input) {
            input.style.visibility = "hidden";
            input.onchange = undefined;
        }
        if (undefined != rf.keyboardCompleteCallBack) {
            rf.keyboardCompleteCallBack(input);
        }
    }
    rf.hideKeyboard = hideKeyboard;
    function updateKeyboard(option) {
        var value = option.value;
        var input = document.getElementById("txt_input");
        if (input) {
            input.value = value;
            if (undefined != rf.keyboardInputCallBack) {
                rf.keyboardInputCallBack(input);
            }
        }
    }
    rf.updateKeyboard = updateKeyboard;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.logs = [];
    function dateFtt(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    rf.dateFtt = dateFtt;
    function showLog(value) {
        if (!rf.textarea) {
            rf.textarea = document.getElementById("debugArea");
            if (!rf.textarea) {
                rf.textarea = document.createElement("textArea");
                rf.textarea.id = "debugArea";
                rf.textarea.name = "debugArea";
                rf.textarea.readOnly = true;
                var style = rf.textarea.style;
                style.width = "100%";
                style.height = "100%";
                style.position = "absolute";
                style.background = "rgba(0,0,0,0.2)";
                style.top = "0px";
                style.color = "rgb(255,255,255)";
                style.resize = "none";
                style.border = "none";
            }
        }
        if (value) {
            var container2d = document.getElementById("container2d");
            if (container2d) {
                container2d.appendChild(rf.textarea);
                log();
            }
        }
        else {
            rf.textarea.remove();
        }
    }
    rf.showLog = showLog;
    function log(msg, color) {
        if (msg) {
            rf.logs.push(dateFtt("[hh:mm:ss]", new Date()) + " " + msg);
        }
        if (rf.textarea) {
            var msgs = rf.logs;
            if (rf.logs.length > 100) {
                msgs = rf.logs.slice(rf.logs.length - 100);
            }
            rf.textarea.value = msgs.join("\n");
            var scrollHeight = rf.textarea.scrollHeight, clientHeight = rf.textarea.clientHeight;
            rf.textarea.scrollTop = scrollHeight - clientHeight;
        }
    }
    rf.log = log;
})(rf || (rf = {}));
if (typeof global != "undefined") {
    global["rf"] = rf;
}
var rf;
(function (rf) {
    function melonmentSetup() {
        var system = rf.getSystemInfoSync();
        console.log(system);
        var windowWidth = system.windowWidth, windowHeight = system.windowHeight;
        rf.showLoading({ title: "加载中..." });
    }
    rf.melonmentSetup = melonmentSetup;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var toucheEventData = {};
    rf.eventTarget = document;
    function onTouchStart(callBack) {
        if (rf.no_ismobile) {
            rf.eventTarget.addEventListener("touchstart", function (e) {
                callBack(e);
            });
        }
        else {
            rf.eventTarget.addEventListener("contextmenu", function (e) {
                if (e.cancelable) {
                    e.preventDefault();
                }
            });
            var eventData_1 = toucheEventData;
            rf.eventTarget.addEventListener("mousedown", function (e) {
                eventData_1.event = e;
                callBack(eventData_1);
            });
        }
    }
    rf.onTouchStart = onTouchStart;
    function onTouchMove(callBack) {
        if (rf.no_ismobile) {
            rf.eventTarget.addEventListener("touchmove", function (e) {
                callBack(e);
            });
        }
        else {
            var eventData_2 = toucheEventData;
            rf.eventTarget.addEventListener("mousemove", function (e) {
                eventData_2.event = e;
                callBack(eventData_2);
            });
        }
    }
    rf.onTouchMove = onTouchMove;
    function onTouchEnd(callBack) {
        if (rf.no_ismobile) {
            rf.eventTarget.addEventListener("touchend", function (e) {
                callBack(e);
            });
        }
        else {
            var eventData_3 = toucheEventData;
            rf.eventTarget.addEventListener("mouseup", function (e) {
                eventData_3.event = e;
                callBack(eventData_3);
            });
        }
    }
    rf.onTouchEnd = onTouchEnd;
    function onTouchCancel(callBack) {
        if (rf.no_ismobile) {
            rf.eventTarget.addEventListener("touchcancel", function (e) {
                callBack(e);
            });
        }
    }
    rf.onTouchCancel = onTouchCancel;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function vibrateShort(option) {
    }
    rf.vibrateShort = vibrateShort;
    function vibrateLong(option) {
    }
    rf.vibrateLong = vibrateLong;
    window.addEventListener("online", onLineChangeHandler, false);
    function onLineChangeHandler(event) {
    }
    function onNetworkStatusChange(callback) {
    }
    rf.onNetworkStatusChange = onNetworkStatusChange;
    function getNetworkType(option) {
        if (navigator.onLine) {
        }
    }
    rf.getNetworkType = getNetworkType;
    function setScreenBrightness(option) {
    }
    rf.setScreenBrightness = setScreenBrightness;
    function setKeepScreenOn(option) {
    }
    rf.setKeepScreenOn = setKeepScreenOn;
    function getScreenBrightness(option) {
    }
    rf.getScreenBrightness = getScreenBrightness;
    function setClipboardData(option) {
    }
    rf.setClipboardData = setClipboardData;
    function getClipboardData(option) {
    }
    rf.getClipboardData = getClipboardData;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var canvas = rf.createCanvas();
    var OpenDataContext = (function () {
        function OpenDataContext() {
            this.canvas = canvas;
        }
        OpenDataContext.prototype.postMessage = function (message) {
        };
        return OpenDataContext;
    }());
    rf.OpenDataContext = OpenDataContext;
    var openDataContext = new OpenDataContext();
    function getOpenDataContext() {
        return openDataContext;
    }
    rf.getOpenDataContext = getOpenDataContext;
    function onMessage(callback) {
    }
    rf.onMessage = onMessage;
    function shareMessageToFriend(option) {
    }
    rf.shareMessageToFriend = shareMessageToFriend;
    function setUserCloudStorage(option) {
    }
    rf.setUserCloudStorage = setUserCloudStorage;
    function removeUserCloudStorage(option) {
    }
    rf.removeUserCloudStorage = removeUserCloudStorage;
    function onInteractiveStorageModified(callback) {
    }
    rf.onInteractiveStorageModified = onInteractiveStorageModified;
    function modifyFriendInteractiveStorage(option) {
    }
    rf.modifyFriendInteractiveStorage = modifyFriendInteractiveStorage;
    function getUserInteractiveStorage(option) {
    }
    rf.getUserInteractiveStorage = getUserInteractiveStorage;
    function getUserCloudStorage(option) {
    }
    rf.getUserCloudStorage = getUserCloudStorage;
    function getSharedCanvas() {
        return canvas;
    }
    rf.getSharedCanvas = getSharedCanvas;
    function getPotentialFriendList(option) {
    }
    rf.getPotentialFriendList = getPotentialFriendList;
    function getGroupInfo(option) {
    }
    rf.getGroupInfo = getGroupInfo;
    function getGroupCloudStorage(option) {
    }
    rf.getGroupCloudStorage = getGroupCloudStorage;
    function getFriendCloudStorage(option) {
    }
    rf.getFriendCloudStorage = getFriendCloudStorage;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var orientationHandlers = [];
    function orientationchange(e) {
        var orientation = window.orientation;
        var value;
        switch (orientation) {
            case 90:
                value = "landscape";
                break;
            case -90:
                value = "landscapeReverse";
                break;
            case 0:
            default:
                value = "portrait";
                break;
        }
        var v = { value: value };
        for (var i = 0, d = orientationHandlers.length; i < d; i++) {
            orientationHandlers[i](v);
        }
    }
    function onDeviceOrientationChange(callback) {
        if (!orientationHandlers.length) {
            window.addEventListener('orientationchange', orientationchange, false);
        }
        if (orientationHandlers.indexOf(callback) == -1) {
            orientationHandlers.push(callback);
        }
        orientationchange();
    }
    rf.onDeviceOrientationChange = onDeviceOrientationChange;
    function offDeviceOrientationChange(callback) {
        var i = orientationHandlers.indexOf(callback);
        if (i != -1) {
            orientationHandlers.splice(i, 1);
        }
        if (!orientationHandlers.length) {
            window.removeEventListener('orientationchange', orientationchange);
        }
    }
    rf.offDeviceOrientationChange = offDeviceOrientationChange;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function shareAppMessage(object) {
    }
    rf.shareAppMessage = shareAppMessage;
    function onShareAppMessage(callback) {
    }
    rf.onShareAppMessage = onShareAppMessage;
    function showShareMenu(object) {
    }
    rf.showShareMenu = showShareMenu;
    function updateShareMenu(option) {
    }
    rf.updateShareMenu = updateShareMenu;
    function hideShareMenu(object) {
    }
    rf.hideShareMenu = hideShareMenu;
    function getShareInfo(option) {
    }
    rf.getShareInfo = getShareInfo;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SocketTask = (function () {
        function SocketTask(options, socketTaskId) {
            this.socketTaskId = 0;
            this.onOpenFuncs = [];
            this.onCloseFuncs = [];
            this.onMessageFuncs = [];
            this.onErrorFuncs = [];
            var websocket = new WebSocket(options.url);
            websocket.binaryType = "arraybuffer";
            websocket.onopen = this.onSocketOpen.bind(this);
            websocket.onclose = this.onSocketClose.bind(this);
            websocket.onmessage = this.onSocketMessage.bind(this);
            websocket.onerror = this.onSocketError.bind(this);
            this.websocket = websocket;
            this.socketTaskId = socketTaskId;
            this.onSocketClose(this.destroy.bind(this));
        }
        SocketTask.prototype.destroy = function () {
            var _a = this, websocket = _a.websocket, onOpenFuncs = _a.onOpenFuncs, onCloseFuncs = _a.onCloseFuncs, onMessageFuncs = _a.onMessageFuncs, onErrorFuncs = _a.onErrorFuncs;
            websocket.onopen = undefined;
            websocket.onmessage = undefined;
            websocket.onclose = undefined;
            websocket.onerror = undefined;
            this.websocket = undefined;
            onOpenFuncs.length = 0;
            onCloseFuncs.length = 0;
            onMessageFuncs.length = 0;
            onErrorFuncs.length = 0;
        };
        SocketTask.prototype.onSocketOpen = function (e) {
            var _a = this, socketTaskId = _a.socketTaskId, onOpenFuncs = _a.onOpenFuncs;
            var result = { state: "open", socketTaskId: socketTaskId };
            for (var i = 0; i < onOpenFuncs.length; i++) {
                onOpenFuncs[i](result);
            }
        };
        SocketTask.prototype.onSocketClose = function (e) {
            var _a = this, socketTaskId = _a.socketTaskId, onCloseFuncs = _a.onCloseFuncs;
            var result = { state: "close", socketTaskId: socketTaskId, code: e.code };
            for (var i = 0; i < onCloseFuncs.length; i++) {
                onCloseFuncs[i](result);
            }
        };
        SocketTask.prototype.onSocketMessage = function (e) {
            var _a = this, socketTaskId = _a.socketTaskId, onMessageFuncs = _a.onMessageFuncs;
            var result = { state: "message", socketTaskId: socketTaskId, data: e.data };
            for (var i = 0; i < onMessageFuncs.length; i++) {
                onMessageFuncs[i](result);
            }
        };
        SocketTask.prototype.onSocketError = function (e) {
            var _a = this, socketTaskId = _a.socketTaskId, onErrorFuncs = _a.onErrorFuncs;
            var result = { state: "error", socketTaskId: socketTaskId };
            for (var i = 0; i < onErrorFuncs.length; i++) {
                onErrorFuncs[i](result);
            }
        };
        SocketTask.prototype.onOpen = function (callback) {
            var funcs = this.onOpenFuncs;
            if (funcs.indexOf(callback) == -1) {
                funcs.push(callback);
            }
        };
        SocketTask.prototype.onClose = function (callback) {
            var funcs = this.onCloseFuncs;
            if (funcs.indexOf(callback) == -1) {
                funcs.push(callback);
            }
        };
        SocketTask.prototype.onError = function (callback) {
            var funcs = this.onErrorFuncs;
            if (funcs.indexOf(callback) == -1) {
                funcs.push(callback);
            }
        };
        SocketTask.prototype.onMessage = function (callback) {
            var funcs = this.onMessageFuncs;
            if (funcs.indexOf(callback) == -1) {
                funcs.push(callback);
            }
        };
        SocketTask.prototype.send = function (option) {
            var s = this.websocket;
            if (s) {
                if (s.readyState == 1) {
                    s.send(option.data);
                }
                else {
                    if (option.fail) {
                        option.fail(s.readyState);
                    }
                }
            }
        };
        SocketTask.prototype.close = function (option) {
            var s = this.websocket;
            if (s) {
                try {
                    var _a = option ? option : { code: 1000, reason: "" }, code = _a.code, reason = _a.reason;
                    s.close(code || 1000, reason || "");
                }
                catch (e) {
                }
            }
        };
        return SocketTask;
    }());
    rf.SocketTask = SocketTask;
    var socketTaskId = 1;
    var sockets = {};
    function connectSocket(options) {
        var socketTaskID = socketTaskId++;
        var socket = new SocketTask(options, socketTaskID);
        sockets[socketTaskID] = socket;
        socket.onClose(function (e) {
            delete sockets[e.socketTaskId];
        });
        return socket;
    }
    rf.connectSocket = connectSocket;
    function closeSocket(options) {
        for (var key in sockets) {
            var socket = sockets[key];
            if (socket) {
                socket.close(options);
            }
        }
        sockets = {};
    }
    rf.closeSocket = closeSocket;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function clearStorage(option) {
    }
    rf.clearStorage = clearStorage;
    function clearStorageSync() {
        if (localStorage) {
            localStorage.clear();
        }
    }
    rf.clearStorageSync = clearStorageSync;
    function getStorageInfoSync() {
        if (localStorage) {
            var len = localStorage.length;
            var keys = [];
            var currentSize = 0;
            for (var i = 0; i < len; i++) {
                var key = localStorage.key(i);
                keys.push(key);
                var value = localStorage.getItem(key);
                currentSize += value.length;
            }
            return { keys: keys, currentSize: currentSize, limitSize: Number.MAX_VALUE };
        }
        return undefined;
    }
    rf.getStorageInfoSync = getStorageInfoSync;
    function setStorageSync(key, data) {
        if (localStorage) {
            localStorage.setItem(key, data);
        }
    }
    rf.setStorageSync = setStorageSync;
    function getStorageSync(key) {
        return localStorage ? localStorage.getItem(key) : undefined;
    }
    rf.getStorageSync = getStorageSync;
    function removeStorageSync(key) {
        if (localStorage) {
            localStorage.removeItem(key);
        }
    }
    rf.removeStorageSync = removeStorageSync;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var UpdateManager = (function () {
        function UpdateManager() {
        }
        UpdateManager.prototype.applyUpdate = function () {
        };
        UpdateManager.prototype.onCheckForUpdate = function (callback) {
        };
        UpdateManager.prototype.onUpdateReady = function (callback) {
        };
        UpdateManager.prototype.onUpdateFailed = function (callback) {
        };
        return UpdateManager;
    }());
    rf.UpdateManager = UpdateManager;
    var updateManager;
    function getUpdateManager() {
        if (!updateManager) {
            updateManager = new UpdateManager();
        }
        return updateManager;
    }
    rf.getUpdateManager = getUpdateManager;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function getUserInfo(option) {
        console.log(option);
    }
    rf.getUserInfo = getUserInfo;
    function createUserInfoButton(option) {
        return new UserInfoButton();
    }
    rf.createUserInfoButton = createUserInfoButton;
    function authorize(option) {
        console.log(option);
    }
    rf.authorize = authorize;
    function subscribeAppMsg(msg) {
        console.log(msg);
    }
    rf.subscribeAppMsg = subscribeAppMsg;
    function requestSubscribeMessage(msg) {
        console.log(msg);
    }
    rf.requestSubscribeMessage = requestSubscribeMessage;
    function getSetting(option) {
        console.log(option);
    }
    rf.getSetting = getSetting;
    var UserInfoButton = (function () {
        function UserInfoButton() {
        }
        UserInfoButton.prototype.show = function () {
        };
        UserInfoButton.prototype.hide = function () {
        };
        UserInfoButton.prototype.destroy = function () {
        };
        UserInfoButton.prototype.onTap = function (callback) {
        };
        UserInfoButton.prototype.offTap = function (callback) {
        };
        return UserInfoButton;
    }());
    rf.UserInfoButton = UserInfoButton;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function aldSendOpenid(openid) {
    }
    rf.aldSendOpenid = aldSendOpenid;
    function aldSendEvent(type, param) {
    }
    rf.aldSendEvent = aldSendEvent;
    function aldOnShareAppMessage(callback) {
        rf.onShareAppMessage(callback);
    }
    rf.aldOnShareAppMessage = aldOnShareAppMessage;
    function aldShareAppMessage(object) {
        rf.shareAppMessage(object);
    }
    rf.aldShareAppMessage = aldShareAppMessage;
    var aldStage = (function () {
        function aldStage() {
        }
        aldStage.onStart = function (data) {
        };
        aldStage.onRunning = function (data) {
        };
        aldStage.onEnd = function (data) {
        };
        return aldStage;
    }());
    rf.aldStage = aldStage;
    var aldLevel = (function () {
        function aldLevel() {
        }
        aldLevel.onInitLevel = function (data) {
        };
        aldLevel.onSetLevel = function (data) {
        };
        aldLevel.onPaySuccess = function (data) {
        };
        aldLevel.onPayFail = function (data) {
        };
        return aldLevel;
    }());
    rf.aldLevel = aldLevel;
})(rf || (rf = {}));

if (typeof global != "undefined") {
    global["rf"] = rf;
}
if (typeof GameGlobal != "undefined") {
    GameGlobal["rf"] = rf;
}
