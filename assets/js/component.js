
if (typeof global != "undefined") {
    rf = global["rf"] || {};
}
if (typeof GameGlobal != "undefined") {
    rf = GameGlobal["rf"] || {};
}
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var rf;
(function (rf) {
    var AdvTextFiled = (function () {
        function AdvTextFiled(textfiled, helpVal, helpColor) {
            if (helpColor === void 0) { helpColor = 0x999999; }
            this._maxChars = 9999;
            this._textfiled = textfiled;
            this._helpColor = helpColor;
            this._defaultColor = textfiled.color;
            this.helpValue = helpVal;
            this.editabled = true;
        }
        Object.defineProperty(AdvTextFiled.prototype, "editabled", {
            set: function (val) {
                var _a = this, _editabled = _a._editabled, _textfiled = _a._textfiled;
                if (_editabled == val)
                    return;
                this._editabled = val;
                if (val) {
                    _textfiled.type = "input";
                    _textfiled.mouseEnabled = true;
                    _textfiled.on(10, this.txtChangeHandler, this);
                    _textfiled.on(30, this.focusHandler, this);
                }
                else {
                    _textfiled.type = "dynamic";
                    _textfiled.mouseEnabled = false;
                    _textfiled.off(10, this.txtChangeHandler, this);
                    _textfiled.off(30, this.focusHandler, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AdvTextFiled.prototype, "maxChars", {
            set: function (val) {
                this._maxChars = val;
                this._textfiled.maxChars = val;
            },
            enumerable: true,
            configurable: true
        });
        AdvTextFiled.prototype.resetHelpValue = function () {
            var _a = this, _textfiled = _a._textfiled, _helpVal = _a._helpVal, _helpColor = _a._helpColor;
            _textfiled.color = _helpColor;
            _textfiled.text = _helpVal;
        };
        Object.defineProperty(AdvTextFiled.prototype, "helpValue", {
            get: function () {
                return this._helpVal;
            },
            set: function (value) {
                this._helpVal = value;
                this.resetHelpValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AdvTextFiled.prototype, "text", {
            get: function () {
                var _a = this, _textfiled = _a._textfiled, _helpVal = _a._helpVal;
                var v = _textfiled.text;
                if (v == _helpVal) {
                    return "";
                }
                return v;
            },
            set: function (v) {
                var _a = this, _textfiled = _a._textfiled, _defaultColor = _a._defaultColor, _maxChars = _a._maxChars;
                if (!v) {
                    this.resetHelpValue();
                }
                else {
                    if (v.length > _maxChars)
                        v = v.slice(0, _maxChars);
                    _textfiled.color = _defaultColor;
                    _textfiled.text = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        AdvTextFiled.prototype.changeHandler = function (func, target) {
            this._changeParms = { func: func, thisobj: target };
        };
        AdvTextFiled.prototype.txtChangeHandler = function (e) {
            var _a = this, _textfiled = _a._textfiled, _helpVal = _a._helpVal, _defaultColor = _a._defaultColor, _helpColor = _a._helpColor, _changeParms = _a._changeParms;
            var msg = (_textfiled.text == _helpVal || _textfiled.text == "") ? _helpVal : _textfiled.text;
            _textfiled.color = msg == _helpVal ? _helpColor : _defaultColor;
            _textfiled.text = msg;
            if (_changeParms) {
                var func = _changeParms.func, thisobj = _changeParms.thisobj;
                func.call(thisobj, this);
            }
        };
        AdvTextFiled.prototype.focusHandler = function (e) {
            var _a = this, _textfiled = _a._textfiled, _helpVal = _a._helpVal, _defaultColor = _a._defaultColor;
            if (_textfiled.text == _helpVal) {
                _textfiled.text = "";
            }
            _textfiled.color = _defaultColor;
        };
        return AdvTextFiled;
    }());
    rf.AdvTextFiled = AdvTextFiled;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var BitmapFont = (function (_super) {
        __extends(BitmapFont, _super);
        function BitmapFont() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BitmapFont.prototype.load = function (perfix, url) {
            this.source = rf.createUrlSource(perfix, url, "", this.sourceLoadComplete.bind(this), rf.TSource);
        };
        BitmapFont.prototype.sourceLoadComplete = function (source) {
            var value = this.value;
            if (value) {
                this.value = "";
                this.renderText(value);
            }
        };
        BitmapFont.prototype.renderText = function (str) {
            var _a = this, value = _a.value, source = _a.source, graphics = _a.graphics;
            if (str != value) {
                this.value = str;
                if (source.status == 2) {
                    graphics.clear();
                    var frames_1;
                    if (source) {
                        frames_1 = source.data.frames;
                    }
                    var ox = 0;
                    if (frames_1) {
                        var len = str.length;
                        for (var i = 0; i < len; i++) {
                            var ascii = str.charCodeAt(i);
                            var vo = frames_1[ascii];
                            if (vo) {
                                graphics.drawBitmap(ox, 0, vo);
                                ox += vo.w;
                            }
                        }
                    }
                }
                graphics.end();
            }
        };
        BitmapFont.tras = { ".": "dot" };
        return BitmapFont;
    }(rf.Sprite));
    rf.BitmapFont = BitmapFont;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TEventInterestSprite = (function (_super) {
        __extends(TEventInterestSprite, _super);
        function TEventInterestSprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._selected = false;
            _this._enabled = true;
            return _this;
        }
        TEventInterestSprite.prototype.addToStage = function () {
            _super.prototype.addToStage.call(this);
            rf.facade.registerEvent(this.eventInterests, this);
            this.simpleDispatch(23);
        };
        TEventInterestSprite.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            rf.facade.removeEvent(this.eventInterests, this);
            this.simpleDispatch(24);
        };
        Object.defineProperty(TEventInterestSprite.prototype, "selected", {
            get: function () { return this._selected; },
            set: function (value) { this._selected = value; this.doSelected(); },
            enumerable: true,
            configurable: true
        });
        TEventInterestSprite.prototype.doSelected = function () { };
        Object.defineProperty(TEventInterestSprite.prototype, "enabled", {
            get: function () { return this._enabled; },
            set: function (value) { if (this._enabled == value) {
                return;
            } this._enabled = value; this.doEnabled(); },
            enumerable: true,
            configurable: true
        });
        TEventInterestSprite.prototype.doEnabled = function () {
            this.mouseEnabled = false;
            this.mouseChildren = false;
        };
        Object.defineProperty(TEventInterestSprite.prototype, "data", {
            get: function () { return this._data; },
            set: function (value) { this._data = value; this.doData(); },
            enumerable: true,
            configurable: true
        });
        TEventInterestSprite.prototype.doData = function () { };
        TEventInterestSprite.prototype.refreshData = function () { this.doData(); };
        TEventInterestSprite.prototype.bindComponents = function () { };
        TEventInterestSprite.prototype.awaken = function () { };
        ;
        TEventInterestSprite.prototype.sleep = function () { };
        ;
        TEventInterestSprite.prototype.setSize = function (width, height) {
            var _a = this, w = _a.w, h = _a.h;
            if (w == width && h == height) {
                return;
            }
            _super.prototype.setSize.call(this, width, height);
        };
        TEventInterestSprite.prototype.setScrollRect = function (w, h, hStep, vStep, x, y) {
            if (hStep === void 0) { hStep = 0; }
            if (vStep === void 0) { vStep = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _a = this, renderer = _a.renderer, scroll = _a.scroll;
            if (!renderer) {
                this.renderer = renderer = new rf.SuperBatchRenderer(this);
            }
            this.scrollRect = { x: x, y: y, w: w, h: h };
            if (!scroll) {
                this.scroll = scroll = new rf.Scroll(this);
                scroll.bind(this, 1, 1);
                scroll.hStep = hStep;
                scroll.vStep = vStep;
            }
            return scroll;
        };
        TEventInterestSprite.prototype.onRecycle = function () {
            var _this = this;
            var recyleObj = this.recyleObj;
            if (recyleObj != undefined) {
                rf.foreach(recyleObj, function (v, k, o) {
                    _this[k] = v;
                    return true;
                });
            }
        };
        return TEventInterestSprite;
    }(rf.Sprite));
    rf.TEventInterestSprite = TEventInterestSprite;
    rf.toTextFormat = function (data) {
        var format = new rf.TextFormat();
        rf.pro_copy(format, data);
        if (format.stroke) {
            format.stroke.size = ~~format.stroke.size;
        }
        format.init();
        return format;
    };
    var TComponent = (function (_super) {
        __extends(TComponent, _super);
        function TComponent(source) {
            var _this = _super.call(this, source) || this;
            _this.z1 = 0;
            _this.z2 = 0;
            _this.color = 0xFFFFFF;
            return _this;
        }
        TComponent.prototype.getSacle9Matrix = function (matrix, ele, vo) {
            return matrix.clone();
        };
        TComponent.prototype.renderFrame = function (frame) {
            var clip = this.source.data.frames[frame];
            var graphics = this.graphics;
            graphics.clear();
            if (clip) {
                graphics.drawBitmap(0, 0, clip);
            }
            graphics.end();
        };
        TComponent.prototype.gotoAndStop = function (clip, refresh, symbol) {
            if (!symbol) {
                symbol = this.symbol;
            }
            var _a = this, source = _a.source, currentClip = _a.currentClip, z1 = _a.z1, z2 = _a.z2, color = _a.color, w = _a.w;
            var symbols = source.data.symbols;
            if (symbols) {
                var symbolData = symbols[symbol];
                this.symbolData = symbolData;
                if (!symbolData) {
                    return;
                }
                if (currentClip == clip && !refresh) {
                    return;
                }
                if (!w) {
                    this.setSize(symbolData.width, symbolData.height);
                }
                this.currentClip = clip;
                var elements = symbolData.displayFrames[clip];
                if (undefined == elements) {
                    return;
                }
                var sp = void 0;
                for (var i = 0; i < elements.length; i++) {
                    var ele = elements[i];
                    var type = ele.type, x = ele.x, y = ele.y, rect = ele.rect, id = ele.id, matrix2d = ele.matrix2d, width = ele.width, height = ele.height, sx = ele.sx, sy = ele.sy, rotation = ele.rotation, pivot = ele.pivot;
                    if (matrix2d instanceof ArrayBuffer) {
                        ele.matrix2d = matrix2d = new Float32Array(matrix2d);
                    }
                    if (type == 2) {
                        var text = ele.text, color_1 = ele.color, format = ele.format;
                        var t = new rf.TextField();
                        t.color = color_1 || 0;
                        t.setSize(width, height);
                        t.format = rf.toTextFormat(format);
                        t.setPos(x, y);
                        t.lockSca(sx, sy, 1);
                        t.rotation = rotation;
                        t.text = text;
                        this.addChild(t);
                        this[id] = t;
                    }
                    else if (type == 0) {
                        var sp_1 = this[id];
                        if (!sp_1) {
                            sp_1 = new ImageSprite(source);
                            sp_1.name = id;
                            this.addChild(sp_1);
                            this[id] = sp_1;
                        }
                        var _b = this, w_1 = _b.w, h = _b.h;
                        var graphics = sp_1.graphics;
                        graphics.clear();
                        var vo = source.getSourceVO(ele.libraryItemName, 0);
                        sp_1.setSize(width, height);
                        if (vo) {
                            if (rect) {
                                matrix2d = this.getSacle9Matrix(matrix2d.clone(), ele, vo);
                                graphics.drawScale9Bitmap(0, 0, vo, rect, matrix2d);
                            }
                            else {
                                graphics.drawBitmap(0, 0, vo, undefined, z1, z2, undefined, color);
                                sp_1.lockSca(sx, sy, 1);
                                sp_1.rotation = rotation;
                            }
                        }
                        graphics.end();
                        sp_1.setPos(x, y, y);
                    }
                    else {
                        sp = this[id];
                        if (!sp) {
                            var tempSymbol = symbols[ele.libraryItemName];
                            if (tempSymbol) {
                                sp = rf.recyclable(rf.TComponentClass[tempSymbol.type]);
                                sp.name = id;
                                sp.source = source;
                                sp.symbol = ele.libraryItemName;
                                sp.gotoAndStop(0, true);
                                sp.setPos(x, y, y);
                                sp.lockSca(sx, sy, 1);
                                sp.rotation = rotation;
                                sp.bindComponents();
                                this.addChild(sp);
                                this[id] = sp;
                            }
                        }
                    }
                }
            }
            else {
                this.renderFrame(symbol);
            }
        };
        TComponent.prototype.playMotion = function (name, target) {
            var symbolData = this.symbolData;
            if (symbolData) {
                var motions = symbolData.motions;
                if (motions) {
                    var data = motions[name];
                    if (data) {
                        if (!target) {
                            target = this;
                        }
                        return rf.scriptTween_play(target, data, rf.defaultTimeMixer);
                    }
                }
            }
            return undefined;
        };
        return TComponent;
    }(TEventInterestSprite));
    rf.TComponent = TComponent;
    function findUI(component, path) {
        var o = component;
        rf.forarr(path, function (v) {
            o = o[v];
            if (o === undefined) {
                return false;
            }
            return true;
        });
        return o;
    }
    rf.findUI = findUI;
    var ImageSprite = (function (_super) {
        __extends(ImageSprite, _super);
        function ImageSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageSprite.prototype.setSize = function (width, height) {
            var _a = this, w = _a.w, h = _a.h, locksize = _a.locksize, source = _a.source, scale = _a.scale;
            if (w == width && h == height) {
                return;
            }
            _super.prototype.setSize.call(this, width, height);
            var graphics = this.$graphics;
            if (graphics) {
                graphics.hitArea.clean();
                graphics.setSize(width / scale, height / scale);
            }
        };
        return ImageSprite;
    }(TEventInterestSprite));
    rf.ImageSprite = ImageSprite;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Label.prototype, "label", {
            get: function () { var _a = this, _editable = _a._editable, txt_label = _a.txt_label, _label = _a._label; if (_editable) {
                return txt_label.text;
            } return _label; },
            set: function (value) { this._label = value + ""; this.doLabel(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "editable", {
            get: function () { return this._editable; },
            set: function (value) { this._editable = value; this.doEditable(); },
            enumerable: true,
            configurable: true
        });
        Label.prototype.doEditable = function () { };
        ;
        Label.prototype.bindComponents = function () {
        };
        Label.prototype.doLabel = function () {
            var _a = this, txt_label = _a.txt_label, _label = _a._label;
            if (txt_label) {
                txt_label.text = _label;
                this.textResize();
            }
        };
        Label.prototype.textResize = function () { };
        return Label;
    }(rf.TComponent));
    rf.Label = Label;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.bindComponents = function () {
            this.mouseChildren = false;
            this.doEnabled();
            this.buttonModel(this.w >> 1, this.h >> 1, 0);
        };
        Button.prototype.getObjectByPoint = function (dx, dy, scale) {
            return _super.prototype.getObjectByPoint.call(this, dx, dy, 1 / this._scaleX);
        };
        Button.prototype.doEnabled = function () {
            this.mouseEnabled = this._enabled;
        };
        Button.prototype.clipRefresh = function () {
            this.gotoAndStop(0);
        };
        Button.prototype.addClick = function (listener, thisObj) {
            this.on(56, listener, thisObj);
            return this;
        };
        Button.prototype.setface = function (prefix, url) {
            var icon = this.icon;
            if (!icon) {
                this.icon = icon = new rf.Image(this.source);
                this.addChild(icon);
            }
            icon.on(4, this.faceHandler, this);
            icon.load(prefix, url);
        };
        Button.prototype.faceHandler = function (event) {
            event.currentTarget.off(event.type, this.faceHandler, this);
            this.updateHitArea();
            this.bindComponents();
            this.locksize = true;
            this.simpleDispatch(4);
        };
        return Button;
    }(rf.Label));
    rf.Button = Button;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckBox.prototype.doEnabled = function () {
            _super.prototype.doEnabled.call(this);
            var _enabled = this._enabled;
            if (_enabled) {
                this.on(56, this.clickHandler, this);
            }
            else {
                this.off(56, this.clickHandler, this);
            }
        };
        CheckBox.prototype.clickHandler = function (event) {
            this.selected = !this._selected;
        };
        CheckBox.prototype.doSelected = function () {
            this.simpleDispatch(15, this._selected);
            this.clipRefresh();
        };
        CheckBox.prototype.clipRefresh = function () {
            var _selected = this._selected;
            this.gotoAndStop(_selected ? 1 : 0);
        };
        return CheckBox;
    }(rf.Button));
    rf.CheckBox = CheckBox;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lock_a = 0;
            return _this;
        }
        Image.prototype.load = function (perfix, url, extension) {
            url = rf.getFullUrl(url, extension);
            if (this.url == url) {
                return;
            }
            if (url) {
                this.url = url;
                var _a = this, source = _a.source, lockkey = _a.lockkey, lock_a = _a.lock_a;
                var vo = source.getSourceVO(lockkey ? lockkey : url, lockkey ? lock_a : 1);
                if (!vo || lockkey) {
                    rf.loadRes(perfix, url, this.onImageComplete, this, 5);
                }
                else {
                    this.w = vo.w;
                    this.h = vo.h;
                    this.draw(vo);
                    this.simpleDispatch(4, this);
                }
            }
        };
        Image.prototype.onImageComplete = function (e) {
            if (e.type != 4) {
                return;
            }
            var res = e.currentTarget;
            var img = e.data;
            var _a = this, url = _a.url, drawW = _a.drawW, drawH = _a.drawH, lockkey = _a.lockkey, lock_a = _a.lock_a, source = _a.source, rect = _a.rect;
            if (url != res.url) {
                return;
            }
            var cw = img.width, ch = img.height;
            this.w = cw;
            this.h = ch;
            if (!rect) {
                if (drawW && drawH) {
                    this.w = cw = drawW;
                    this.h = ch = drawH;
                }
            }
            var vo = source.getSourceVO(lockkey ? lockkey : url, lockkey ? lock_a : 1);
            if (!vo || lockkey) {
                if (!lockkey) {
                    vo = source.setSourceVO(url, cw, ch, 1);
                }
                else {
                    vo.rw = vo.w;
                    vo.rh = vo.h;
                    source.clearBitmap(vo);
                }
                source.drawimg(img, vo.x, vo.y, cw, ch);
            }
            this.draw(vo);
            this.simpleDispatch(4, this);
        };
        Image.prototype.setSize = function (_width, _height) {
            this.w = this.drawW = _width;
            this.h = this.drawH = _height;
            var hitArea = this.hitArea;
            hitArea.clean();
            hitArea.updateArea(_width, _height, 0);
        };
        Image.prototype.draw = function (vo) {
            var g = this.graphics;
            g.clear();
            var ix, iy;
            if (this.aglin) {
                var p = rf.getAglinPoint(this.aglin, vo.w, vo.h);
                ix = p[0];
                iy = p[1];
            }
            else {
                ix = 0;
                iy = 0;
            }
            var _a = this, rect = _a.rect, drawW = _a.drawW, drawH = _a.drawH;
            var d;
            if (drawW != vo.w || drawH != vo.h) {
                d = rf.newMatrix();
                d.m2_scale(drawW / vo.w, drawH / vo.h);
            }
            if (rect && drawW != undefined && drawH != undefined) {
                g.drawScale9Bitmap(ix, iy, vo, rect, d);
            }
            else if (drawW != undefined && drawH != undefined) {
                g.drawBitmap(ix, iy, vo, d);
            }
            else {
                g.drawBitmap(ix, iy, vo);
            }
            g.end();
        };
        Image.prototype.clean = function () {
            var g = this.graphics;
            g.clear();
            g.end();
            this.aglin = 0;
            this.url = undefined;
            this.lockkey = undefined;
            this.lock_a = undefined;
        };
        Image.prototype.onRecycle = function () {
            this.clean();
            _super.prototype.onRecycle.call(this);
            this.drawW = this.drawH = undefined;
        };
        return Image;
    }(rf.TComponent));
    rf.Image = Image;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var List = (function (_super) {
        __extends(List, _super);
        function List(source, Clazz, itemWidth, itemHeight, hgap, vgap, vertical, columnCount, offsetX, offsetY) {
            if (hgap === void 0) { hgap = 0; }
            if (vgap === void 0) { vgap = 0; }
            if (vertical === void 0) { vertical = true; }
            if (columnCount === void 0) { columnCount = 1; }
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            var _this = _super.call(this, source) || this;
            _this._selectIndex = -1;
            _this.option = {
                itemWidth: itemWidth + hgap,
                itemHeight: itemHeight + vgap,
                vertical: vertical,
                columnCount: columnCount,
                clazz: Clazz,
                hgap: hgap,
                vgap: vgap,
                offsetX: offsetX,
                offsetY: offsetY
            };
            _this.runtime = {
                selectedIndex: -1,
                displayCount: -1,
            };
            _this.caches = [];
            return _this;
        }
        List.prototype.setSize = function (width, height) {
            _super.prototype.setSize.call(this, width, height);
            this.simpleDispatch(2);
        };
        List.prototype.displayList = function (data) {
            this.datas = data;
            var _a = this, option = _a.option, runtime = _a.runtime, scroll = _a.scroll;
            runtime.start = -1;
            runtime.end = -1;
            runtime.selectedIndex = -1;
            this.clear();
            this.refreshList();
            var columnCount = option.columnCount, itemWidth = option.itemWidth, itemHeight = option.itemHeight, vertical = option.vertical, hgap = option.hgap, vgap = option.vgap, offsetX = option.offsetX, offsetY = option.offsetY;
            var len = data.length;
            var maxlen = Math.ceil(len / columnCount);
            if (vertical) {
                this.h = maxlen * itemHeight - vgap;
                this.w = columnCount * itemWidth - hgap;
            }
            else {
                this.w = maxlen * itemWidth - hgap;
                this.h = columnCount * itemHeight - vgap;
            }
            this.w += offsetX;
            this.y += offsetY;
            this.simpleDispatch(2);
            if (scroll) {
                scroll.resetOrigin();
                scroll.on(12, this.s_c, this);
            }
        };
        List.prototype.scrollXY = function (x, y) {
            var scroll = this.scroll;
            if (scroll) {
                scroll.scrollxy(x, y);
                scroll.on(12, this.s_c, this);
            }
        };
        List.prototype.s_c = function (e) {
            rf.callLater.later(this.d_c, this, 200);
        };
        List.prototype.d_c = function (e) {
            this.simpleDispatch(10, this);
        };
        List.prototype.clear = function () {
            var _a = this, runtime = _a.runtime, caches = _a.caches;
            var len = caches.length;
            for (var i = 0; i < len; i++) {
                var item = caches[i];
                item.selected = false;
                item.remove();
                item.__next = item.__pre = undefined;
                item.recycle();
                item.off(53, this.itemClickHandler, this);
            }
            caches.length = 0;
            runtime.first = runtime.last = undefined;
        };
        List.prototype.refreshList = function (event) {
            var _a = this, datas = _a.datas, runtime = _a.runtime;
            var displayCount = runtime.displayCount, first = runtime.first, last = runtime.last;
            var start, end, datalen;
            datalen = datas.length;
            if (displayCount == -1) {
                start = 0;
                end = datalen;
            }
            else {
                var _b = this, option = _b.option, scrollRect = _b.scrollRect;
                var vertical = option.vertical, itemWidth = option.itemWidth, itemHeight = option.itemHeight;
                if (vertical) {
                    start = Math.clamp(Math.floor(-scrollRect.y / itemHeight), 0, Math.max(0, datalen - displayCount));
                }
                else {
                    start = Math.clamp(Math.floor(-scrollRect.x / itemWidth), 0, Math.max(0, datalen - displayCount));
                }
                end = Math.min(start + displayCount, datalen);
            }
            if (runtime.start == start && runtime.end == end) {
                return;
            }
            runtime.start = start;
            runtime.end = end;
            if (first && (first.index > end || last.index < start)) {
                this.clear();
            }
            else {
                while (first) {
                    if (first.index >= start)
                        break;
                    var f = first.__next;
                    this.removeItem(first);
                    first = f;
                }
                runtime.first = first;
                while (last) {
                    if (last.index < end)
                        break;
                    var l = last.__pre;
                    this.removeItem(last);
                    last = l;
                }
                runtime.last = last;
            }
            if (first) {
                for (var i = first.index - 1; i >= start; i--) {
                    var ins = this.addItem(i, datas[i]);
                    first.__pre = ins;
                    ins.__next = first;
                    first = ins;
                }
                for (var i = last.index + 1; i < end; i++) {
                    var ins = this.addItem(i, datas[i]);
                    last.__next = ins;
                    ins.__pre = last;
                    last = ins;
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    var ins = this.addItem(i, datas[i]);
                    if (!last) {
                        runtime.first = runtime.last = first = last = ins;
                    }
                    else {
                        last.__next = ins;
                        ins.__pre = last;
                        runtime.last = last = ins;
                    }
                }
            }
            runtime.first = first;
            runtime.last = last;
        };
        List.prototype.addItem = function (index, data) {
            var _a = this, caches = _a.caches, option = _a.option;
            var ins = caches[index];
            if (ins) {
                ins.data = data;
                this.addChild(ins);
                return ins;
            }
            var clazz = option.clazz, itemWidth = option.itemWidth, itemHeight = option.itemHeight, columnCount = option.columnCount, hgap = option.hgap, vgap = option.vgap, vertical = option.vertical, offsetX = option.offsetX, offsetY = option.offsetY;
            ins = rf.recyclable(clazz);
            ins.index = index;
            if (vertical) {
                ins.setPos((index % columnCount) * itemWidth + offsetX, Math.floor(index / columnCount) * itemHeight + offsetY);
            }
            else {
                ins.setPos(Math.floor(index / columnCount) * itemWidth + offsetX, (index % columnCount) * itemHeight + offsetY);
            }
            ins.on(56, this.itemClickHandler, this);
            ins.data = data;
            this.addChild(ins);
            caches[index] = ins;
            return ins;
        };
        List.prototype.removeItem = function (item) {
            item.remove();
            item.__next = item.__pre = item.data = undefined;
        };
        Object.defineProperty(List.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (value) {
                var index = this.runtime.selectedIndex;
                var item;
                if (index != -1) {
                    item = this.caches[index];
                    if (index == value) {
                        if (item) {
                            this.simpleDispatch(15, item);
                        }
                        return;
                    }
                    if (item) {
                        item.selected = false;
                    }
                }
                this.runtime.selectedIndex = value;
                this._selectIndex = value;
                item = this.caches[value];
                if (item) {
                    item.selected = true;
                    this.simpleDispatch(15, item);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "selectItem", {
            get: function () {
                var _a = this, caches = _a.caches, _selectIndex = _a._selectIndex;
                return caches[_selectIndex];
            },
            set: function (val) {
                var caches = this.caches;
                if (caches.indexOf(val) != -1) {
                    this.selectIndex = caches.indexOf(val);
                }
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.itemClickHandler = function (event) {
            var item = event.currentTarget;
            if (item.mouseEnabled) {
                this.selectItem = item;
            }
        };
        List.prototype.remove = function () {
            var item = this.selectItem;
            if (item)
                item.selected = false;
            _super.prototype.remove.call(this);
        };
        Object.defineProperty(List.prototype, "backward", {
            get: function () {
                var scroll = this.scroll;
                if (!scroll)
                    return false;
                return scroll.backward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "forward", {
            get: function () {
                var scroll = this.scroll;
                if (!scroll)
                    return false;
                return scroll.forward;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    }(rf.TComponent));
    rf.List = List;
    var DynmList = (function (_super) {
        __extends(DynmList, _super);
        function DynmList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DynmList.prototype.displayList = function (data) {
            _super.prototype.displayList.call(this, data);
            var runtime = this.runtime;
            var last = runtime.last;
            if (last) {
                this.h = last.y + last.h;
                this.w = last.x + last.w;
            }
            else {
                this.w = this.h = 0;
            }
            this.simpleDispatch(2);
        };
        DynmList.prototype.addItem = function (index, data) {
            var ins = _super.prototype.addItem.call(this, index, data);
            var last = this.runtime.last;
            if (!last) {
                ins.setPos(0, 0, 0);
            }
            else {
                var _a = this.option, clazz = _a.clazz, itemWidth = _a.itemWidth, itemHeight = _a.itemHeight, columnCount = _a.columnCount, hgap = _a.hgap, vgap = _a.vgap, vertical = _a.vertical;
                if (vertical) {
                    ins.setPos(last.x, last.y + last.h + vgap, 0);
                }
                else {
                    ins.setPos(last.x + last.w + hgap, last.y, 0);
                }
            }
            return ins;
        };
        return DynmList;
    }(List));
    rf.DynmList = DynmList;
    var TestListItemRender = (function (_super) {
        __extends(TestListItemRender, _super);
        function TestListItemRender(source) {
            var _this = _super.call(this, source) || this;
            var g = _this.graphics;
            g.clear();
            g.drawRect(0, 0, 100, 20, Math.floor(Math.random() * 0xFFFFFF));
            g.end();
            _this.t = new rf.TextField();
            _this.addChild(_this.t);
            return _this;
        }
        TestListItemRender.prototype.doData = function () {
            this.t.text = this.index + "";
        };
        return TestListItemRender;
    }(rf.TComponent));
    rf.TestListItemRender = TestListItemRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.codeParsers = {};
    function CodeFunc(name) {
        return function (classPrototype, propertyKey, descriptor) {
            name = name || propertyKey;
            rf.codeParsers[name] = { thisobj: classPrototype, func: descriptor.value };
        };
    }
    rf.CodeFunc = CodeFunc;
    function codeIntParser(leftval, operator, rightval) {
        if (operator == ":") {
            rightval = Math.abs(rightval);
        }
        return toOpera(leftval, operator, rightval);
    }
    rf.codeIntParser = codeIntParser;
    function codeParserLimit(self, property, params) {
        var len = property.length;
        var result = false;
        while (len--) {
            var _a = property[len], value_left = _a.value_left, value = _a.value, bijiao = _a.bijiao;
            value_left = codeDoProperty(self, value_left, params);
            value = codeDoProperty(self, value, params);
            var b = codeIntParser(value_left, bijiao, value);
            if (len <= 0) {
                return result || b;
            }
            len--;
            switch (property[len]) {
                case "&&":
                    if (!b) {
                        return false;
                    }
            }
            result = result || b;
        }
        return result;
    }
    rf.codeParserLimit = codeParserLimit;
    function toOpera(leftValue, operaType, rightValue) {
        switch (operaType) {
            case ">":
                {
                    return leftValue > rightValue;
                }
            case "<":
                {
                    return leftValue < rightValue;
                }
            case ":":
            case ">=":
                {
                    return leftValue >= rightValue;
                }
            case "<=":
                {
                    return leftValue <= rightValue;
                }
            case "=":
            case "==":
                {
                    return leftValue == rightValue;
                }
            case "!=":
                {
                    return leftValue != rightValue;
                }
        }
        return false;
    }
    rf.toOpera = toOpera;
    function calc(v, calcType, dv) {
        switch (calcType) {
            case "+":
                v += dv;
                break;
            case "-":
                v -= dv;
                break;
            case "*":
                v *= dv;
                break;
            case "/":
                v /= dv;
                break;
            case "^":
                v = Math.pow(v, dv);
                break;
        }
        return v;
    }
    rf.calc = calc;
    function codeDoProperty(self, property, params) {
        var _this = this;
        if (!params) {
            params = self;
        }
        if (property == undefined || property == null) {
            return property;
        }
        if (property instanceof Array) {
            var result_1 = [];
            rf.forarr(property, function (v, i) {
                result_1[i] = codeDoProperty(self, v, params);
                return true;
            });
            return result_1;
        }
        if (property.hasOwnProperty("type") == false) {
            var p_1 = property;
            if (p_1 == "self") {
                return self;
            }
            var type_1 = typeof property;
            if (type_1 == "object") {
                var c_1 = {};
                rf.foreach(property, function (v, k) {
                    c_1[k] = codeDoProperty(self, v, params);
                    return true;
                });
                property = c_1;
            }
            return property;
        }
        var p = property;
        var type = p.type;
        if (type == "JSCalcString") {
            var p_2 = property;
            var result_2 = [];
            p_2.propertys.forEach(function (element) {
                var rev = codeDoProperty(self, element, params);
                result_2.push(rev);
            });
            return p_2.desc.substitute(result_2);
        }
        if (type == "JSModule") {
            var p_3 = property;
            var limit = p_3.limit, list = p_3.list;
            if (limit) {
                if (codeParserLimit(self, limit, params) == false) {
                    return null;
                }
            }
            rf.forarr(list, function (v) {
                codeDoProperty(self, v, params);
                return true;
            });
        }
        if (type == "JSFunction") {
            var _a = property, name_1 = _a.name, propertys = _a.propertys;
            var f = rf.codeParsers[name_1];
            var func = void 0;
            var thisobj = void 0;
            if (!f) {
                f = self[name_1];
                if (f) {
                    func = self[name_1];
                    thisobj = self;
                }
                else {
                    func = params[name_1];
                    thisobj = params;
                }
            }
            else {
                func = f.func;
                thisobj = f.thisobj;
            }
            if (func) {
                var o_1 = [];
                rf.forarr(propertys, function (v, i) {
                    var t = codeDoProperty(_this, v, params);
                    o_1[i] = t === undefined ? v : t;
                    return true;
                });
                return func.call(thisobj, o_1, params);
            }
            return undefined;
        }
        if (type == "calc") {
            var value = property.value;
            var len = value.length - 1;
            var v = codeDoProperty(self, value[len], params);
            while (len > 0) {
                var calctype = value[len - 1];
                var dv = codeDoProperty(self, value[len - 2], params);
                len -= 2;
                v = calc(v, calctype, dv);
            }
            return v;
        }
        if (type == "JSProperty") {
            var temp = property.property;
            var o_2 = self;
            if (o_2) {
                rf.forarr(temp, function (v) {
                    o_2 = o_2[v];
                    if (o_2 === undefined) {
                        return false;
                    }
                    return true;
                });
            }
            if (!o_2) {
                o_2 = params;
                rf.forarr(temp, function (v) {
                    o_2 = o_2[v];
                    if (o_2 === undefined) {
                        return false;
                    }
                    return true;
                });
            }
            return o_2;
        }
        return property;
    }
    rf.codeDoProperty = codeDoProperty;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function MVC(type) {
        return function (target) {
            if (type) {
                rf.mediatorMap[type] = target;
            }
        };
    }
    rf.MVC = MVC;
    rf.mediatorMap = {};
    var Facade = (function (_super) {
        __extends(Facade, _super);
        function Facade() {
            var _this = _super.call(this) || this;
            _this.SINGLETON_MSG = "Facade Singleton already constructed!";
            return _this;
        }
        Facade.prototype.toggle = function (m, type, params) {
            if (type === void 0) { type = -1; }
            var mediator;
            if (m instanceof Mediator) {
                mediator = m;
            }
            else {
                mediator = rf.singleton(m);
            }
            if (!mediator.openParams)
                mediator.openParams = params;
            if (mediator.isReady == false && type == 0) {
                mediator.off(25, this.mediatorCompleteHandler, this);
                return mediator;
            }
            if (mediator.isReady == false && mediator.startSync()) {
                mediator.on(25, this.mediatorCompleteHandler, this, 10);
                return mediator;
            }
            this.togglepanel(mediator.panel, type);
            return mediator;
        };
        Facade.prototype.togglepanel = function (panel, type) {
            if (type === void 0) { type = -1; }
            switch (type) {
                case 1:
                    panel.isShow ? panel.bringTop() : panel.show();
                    break;
                case 0:
                    if (panel.isShow)
                        panel.hide();
                    break;
                case -1:
                    panel.isShow ? panel.hide() : panel.show();
                    break;
            }
        };
        Facade.prototype.mediatorCompleteHandler = function (event) {
            var mediator = event.data;
            mediator.off(25, this.mediatorCompleteHandler, this);
            this.togglepanel(mediator.panel, 1);
        };
        return Facade;
    }(rf.InterestEventDispatcher));
    rf.Facade = Facade;
    rf.facade = rf.singleton(Facade);
    var Mediator = (function (_super) {
        __extends(Mediator, _super);
        function Mediator(name) {
            var _this = _super.call(this) || this;
            _this.isReady = false;
            _this.weight = 1;
            _this.name = name;
            rf.mediatorMap[name] = _this;
            _this.mediatorParams = { ox: 0, oy: 0, centerFlag: false, resizeable: false, haveFight: false };
            return _this;
        }
        Mediator.loadMediator = function (propertys, params) {
            var mname = propertys[0];
            var m = rf.mediatorMap[mname];
            var v;
            if (m) {
                if (!(m instanceof Mediator)) {
                    rf.mediatorMap[mname] = m = rf.singleton(m);
                }
                if (!m.isReady) {
                    v = rf.recyclable(rf.MiniDispatcher);
                    m.on(25, function () {
                        v.simpleDispatch(4);
                        v.removeEventListeners();
                        v.recycle();
                    }, this);
                    m.startSync();
                }
            }
            return v;
        };
        Mediator.toggleMediator = function (propertys, params) {
            var mname = propertys[0], status = propertys[1];
            var m = rf.mediatorMap[mname];
            var v;
            if (m) {
                if (status == 1) {
                    if (!m.isReady) {
                        v = rf.recyclable(rf.MiniDispatcher);
                        m.on(25, function () {
                            v.simpleDispatch(4);
                            v.removeEventListeners();
                            v.recycle();
                        }, this);
                    }
                }
                rf.facade.toggle(m, status);
            }
            return v;
        };
        Mediator.getMediatorDisplay = function (propertys, params) {
            var mname = propertys[0], pro = propertys[1];
            var m = rf.mediatorMap[mname];
            if (m) {
                var v = rf.codeDoProperty(params, pro, m);
            }
            return v;
        };
        Mediator.prototype.setPanel = function (panel) {
            this.panel = panel;
            panel.name = this.name;
        };
        Mediator.prototype.startSync = function () {
            var panel = this.panel;
            var source = panel.source;
            if (!source || source.status == 0) {
                source = panel.load();
            }
            if (source.status == 2) {
                rf.callLater.add(this.preViewCompleteHandler, this);
            }
            else if (source.status == 1) {
                panel.on(4, this.preViewCompleteHandler, this);
            }
            return true;
        };
        Mediator.prototype.preViewCompleteHandler = function (e) {
            if (e) {
                var skin = e.currentTarget;
                if (skin) {
                    skin.removeEventListener(4, this.preViewCompleteHandler, this);
                }
            }
            this.setBindView(true);
            this.mediatorReadyHandle();
            this.simpleDispatch(25, this);
        };
        Mediator.prototype.addtostage = function () {
            rf.facade.registerEvent(this.eventInterests, this);
            if (this.isReady) {
                this.awaken();
                this.panelshow();
            }
        };
        Mediator.prototype.awakenAndSleepHandle = function (e) {
            var type = e.type;
            switch (type) {
                case 23:
                    this.addtostage();
                    break;
                case 24:
                    rf.facade.removeEvent(this.eventInterests, this);
                    this.sleep();
                    this.panelhide();
                    break;
            }
        };
        Mediator.prototype.setBindView = function (isBind) {
            var panel = this.panel;
            if (isBind) {
                panel.on(23, this.awakenAndSleepHandle, this);
                panel.on(24, this.awakenAndSleepHandle, this);
            }
            else {
                panel.off(23, this.awakenAndSleepHandle, this);
                panel.off(24, this.awakenAndSleepHandle, this);
            }
        };
        Mediator.prototype.mediatorReadyHandle = function () {
            this.isReady = true;
            this.bindComponents();
            this.bindEventInterests();
            if (this.panel.isShow) {
                rf.facade.registerEvent(this.eventInterests, this);
                this.awaken();
            }
        };
        Mediator.prototype.bindEventInterests = function () {
        };
        Mediator.prototype.bindComponents = function () {
        };
        Mediator.prototype.sleep = function () {
        };
        Mediator.prototype.awaken = function () {
        };
        Mediator.prototype.onRemove = function () {
        };
        Object.defineProperty(Mediator.prototype, "effParms", {
            set: function (value) {
                var panel = this.panel;
                if (!panel)
                    rf.ThrowError("没有panel信息");
                panel.effParms = value;
            },
            enumerable: true,
            configurable: true
        });
        Mediator.prototype.addAlign = function (item, align) {
            item["alignParms"] = { align: align, x: item.x, y: item.y };
            this._alignuse = true;
        };
        Mediator.prototype.addAligns = function (items, align) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item["alignParms"] = { align: align, x: item.x, y: item.y };
            }
            this._alignuse = true;
        };
        Mediator.prototype.panelshow = function () {
            var _a = this, _alignuse = _a._alignuse, mediatorParams = _a.mediatorParams;
            var resizeable = mediatorParams.resizeable, centerFlag = mediatorParams.centerFlag;
            if (resizeable || _alignuse || centerFlag) {
                rf.Engine.addResize(this.resize, this);
            }
        };
        Mediator.prototype.panelhide = function () {
            var _a = this, _alignuse = _a._alignuse, mediatorParams = _a.mediatorParams;
            var resizeable = mediatorParams.resizeable, centerFlag = mediatorParams.centerFlag;
            if (resizeable || _alignuse || centerFlag) {
                rf.Engine.removeResize(this.resize, this);
            }
        };
        Mediator.prototype.resize = function (width, height) {
            var _a = this, mediatorParams = _a.mediatorParams, _alignuse = _a._alignuse;
            var centerFlag = mediatorParams.centerFlag;
            if (centerFlag) {
                this.centerLayout();
            }
            if (_alignuse) {
                this.childrenLayout();
            }
        };
        Mediator.prototype.centerLayout = function () {
            var _a = this, panel = _a.panel, mediatorParams = _a.mediatorParams;
            var ox = mediatorParams.ox, oy = mediatorParams.oy;
            var stageWidth = rf.offsetResize.stageWidth, stageHeight = rf.offsetResize.stageHeight;
            panel.setPos((stageWidth - panel.w >> 1) + ox, (stageHeight - panel.h >> 1) + oy);
            if (panel.y < 0) {
                panel.y = 0;
            }
        };
        Mediator.prototype.childrenLayout = function () {
            var ox = rf.offsetResize.ox, oy = rf.offsetResize.oy;
            var childrens = this.panel.childrens;
            childrens.forData(function (item) {
                var params = item["alignParms"];
                if (params) {
                    var align = params.align, x = params.x, y = params.y;
                    var tmpx = void 0;
                    var tmpy = void 0;
                    switch (align) {
                        case 4:
                        case 3:
                        case 5:
                            tmpx = ox + x;
                            tmpy = y + oy;
                            break;
                        case 6:
                        case 7:
                        case 8:
                            tmpx = ox * 2 + x;
                            tmpy = y + oy * 2;
                            break;
                    }
                    tmpx = tmpx < x ? x : tmpx;
                    tmpy = tmpy < y ? y : tmpy;
                    item.setPos(tmpx, tmpy);
                }
                return true;
            }, this);
            this.panel.locksize = false;
            this.panel.updateHitArea();
            this.panel.locksize = true;
        };
        Mediator.prototype.back = function () {
            this.panel.hide();
            return 0;
        };
        Mediator.prototype.saveParms = function () {
        };
        __decorate([
            rf.CodeFunc()
        ], Mediator, "loadMediator", null);
        __decorate([
            rf.CodeFunc()
        ], Mediator, "toggleMediator", null);
        __decorate([
            rf.CodeFunc()
        ], Mediator, "getMediatorDisplay", null);
        return Mediator;
    }(rf.MiniDispatcher));
    rf.Mediator = Mediator;
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel(uri, cls, perfix) {
            var _this = _super.call(this) || this;
            if (!perfix) {
                perfix = rf.ASSSETS_PERFIX;
            }
            _this.perfix = perfix;
            _this.source = undefined;
            _this.symbol = cls;
            _this.mName = uri;
            _this.renderer = new rf.SuperBatchRenderer(_this);
            _this.mouseEnabled = false;
            _this.mouseChildren = true;
            _this.parentParms = { container: undefined, index: 0, mask: false, maskColor: 0, maskAlpha: 0.5 };
            return _this;
        }
        Panel.prototype.render = function (camera, option) {
            var _a = this, source = _a.source, renderer = _a.renderer;
            if (!source || source.status != 2 || !renderer) {
                return;
            }
            _super.prototype.render.call(this, camera, option);
        };
        Panel.prototype.show = function (container) {
            var _a = this, isShow = _a.isShow, parentParms = _a.parentParms;
            var mask = parentParms.mask;
            if (!container) {
                container = parentParms.container || (mask ? rf.tipContainer : rf.popContainer);
            }
            if (mask) {
                var graphics = container.graphics;
                var maskColor = parentParms.maskColor, maskAlpha = parentParms.maskAlpha;
                graphics.clear();
                graphics.drawRect(0, 0, rf.stageWidth, rf.stageHeight, maskColor, maskAlpha);
                graphics.end();
                container.mouseEnabled = true;
            }
            if (isShow) {
                this.bringTop();
                return;
            }
            if (parentParms && parentParms.index != undefined) {
                container.addChildAt(this, parentParms.index);
            }
            else {
                container.addChild(this);
            }
            this.isShow = true;
            this.awaken();
            this.doEff();
            this.on(50, this.bringTop, this);
            rf.facade.simpleDispatch(26, this.mName);
        };
        Panel.prototype.load = function () {
            var _a = this, source = _a.source, perfix = _a.perfix;
            if (!source) {
                this.source = source = rf.createUrlSource(perfix, this.mName, "", undefined, rf.TSource);
            }
            if (source.status == 2) {
                this.asyncsourceComplete();
            }
            else {
                if (source.status == 0) {
                    source.load();
                    rf.facade.simpleDispatch(28, this.mName);
                }
                source.on(4, this.asyncsourceComplete, this);
            }
            return source;
        };
        Panel.prototype.asyncsourceComplete = function (e) {
            if (e) {
                e.currentTarget.off(e.type, this.asyncsourceComplete, this);
                rf.facade.simpleDispatch(29);
            }
            this.gotoAndStop(0);
            this.setChange(12);
            this.simpleDispatch(4);
            this.locksize = true;
        };
        Panel.prototype.hide = function (e) {
            if (!this.isShow) {
                return;
            }
            this.isShow = false;
            if (this.parentParms.mask) {
                var container = this.parent;
                var graphics = container.graphics;
                graphics.clear();
                graphics.end();
                container.mouseEnabled = false;
            }
            this.doEff();
            this.off(50, this.bringTop, this);
            rf.facade.simpleDispatch(27, this.mName);
            this.simpleDispatch("PanelEvent_HIDE");
        };
        Panel.prototype.bringTop = function (e) {
            var parent = this.parent;
            if (parent == null)
                return;
            parent.addChild(this);
        };
        Panel.prototype.doEff = function () {
            var _a = this, isShow = _a.isShow, tween = _a.tween, effParms = _a.effParms;
            if (tween) {
                tween.stop();
            }
            if (isShow) {
                if (effParms && effParms.show) {
                    this.status = 0;
                    this.tween = tween = rf.scriptTween_play(this, effParms.show, rf.defaultTimeMixer);
                    tween.on(4, this.tweenHandler, this);
                }
            }
            else {
                if (effParms && effParms.hide) {
                    this.tween = tween = rf.scriptTween_play(this, effParms.hide, rf.defaultTimeMixer);
                    tween.on(4, this.tweenHandler, this);
                }
                else {
                    this.remove();
                }
            }
        };
        Panel.prototype.tweenHandler = function (e) {
            var isShow = this.isShow;
            this.tween = undefined;
            if (!isShow) {
                this.remove();
            }
            else {
            }
        };
        return Panel;
    }(rf.TComponent));
    rf.Panel = Panel;
    var TEventInteresterDele = (function (_super) {
        __extends(TEventInteresterDele, _super);
        function TEventInteresterDele(skin) {
            var _this = _super.call(this) || this;
            skin.mouseEnabled = false;
            _this.skin = skin;
            _this.bindEventInterests();
            _this.bindComponents();
            _this.setBindView();
            return _this;
        }
        TEventInteresterDele.prototype.bindEventInterests = function () {
        };
        TEventInteresterDele.prototype.bindComponents = function () {
        };
        TEventInteresterDele.prototype.setBindView = function () {
            var skin = this.skin;
            skin.addEventListener(23, this.awakenAndSleepHandle, this);
            skin.addEventListener(24, this.awakenAndSleepHandle, this);
            if (skin.stage) {
                rf.facade.registerEvent(this.eventInterests, this);
            }
        };
        TEventInteresterDele.prototype.awakenAndSleepHandle = function (e) {
            var type = e.type;
            switch (type) {
                case 23:
                    rf.facade.registerEvent(this.eventInterests, this);
                    this.awaken();
                    break;
                case 24:
                    rf.facade.removeEvent(this.eventInterests, this);
                    this.sleep();
                    break;
            }
        };
        TEventInteresterDele.prototype.awaken = function () {
        };
        TEventInteresterDele.prototype.sleep = function () {
        };
        Object.defineProperty(TEventInteresterDele.prototype, "data", {
            get: function () { return this._data; },
            set: function (value) { this._data = value; this.doData(); },
            enumerable: true,
            configurable: true
        });
        TEventInteresterDele.prototype.doData = function () { };
        ;
        TEventInteresterDele.prototype.refreshData = function () { this.doData(); };
        return TEventInteresterDele;
    }(rf.MiniDispatcher));
    rf.TEventInteresterDele = TEventInteresterDele;
    var TasyncDele = (function (_super) {
        __extends(TasyncDele, _super);
        function TasyncDele(m, source) {
            var _this = _super.call(this, source) || this;
            _this.m = m;
            _this.on(23, _this.awakenAndSleepHandle, _this);
            _this.on(24, _this.awakenAndSleepHandle, _this);
            return _this;
        }
        TasyncDele.prototype.awakenAndSleepHandle = function (e) {
            var type = e.type;
            switch (type) {
                case 23:
                    this.awaken();
                    break;
                case 24:
                    this.sleep();
                    break;
            }
        };
        TasyncDele.prototype.awaken = function () {
            var target = this.target;
            var mediator;
            if (!target) {
                mediator = rf.singleton(this.m);
                this.mname = mediator.name;
                this.target = mediator;
                mediator.panel.addp = this;
                rf.facade.toggle(this.m, 1);
                if (mediator.isReady) {
                    this.addChild(mediator.panel);
                    this.sizeHandler();
                }
                else {
                    mediator.on(25, this.sizeHandler, this);
                }
            }
            else {
                mediator = rf.mediatorMap[this.mname];
                mediator.mName = this.mname;
                if (mediator.isReady) {
                    this.addChild(mediator.panel);
                    this.sizeHandler();
                    rf.facade.simpleDispatch(26, mediator.mName);
                }
                else {
                    mediator.on(25, this.sizeHandler, this);
                }
            }
        };
        TasyncDele.prototype.sizeHandler = function (e) {
            if (e) {
                e.currentTarget.off(25, this.sizeHandler, this);
            }
            var mediator = rf.mediatorMap[this.mname];
            var _a = mediator.panel, w = _a.w, h = _a.h;
            this.setSize(w, h);
        };
        return TasyncDele;
    }(rf.TComponent));
    rf.TasyncDele = TasyncDele;
    var ItemRender = (function (_super) {
        __extends(ItemRender, _super);
        function ItemRender(perfix, uri, cls) {
            var _this = _super.call(this, rf.createUrlSource(perfix, uri, "", null, rf.TSource)) || this;
            _this.symbol = cls;
            _this.gotoAndStop(0);
            return _this;
        }
        return ItemRender;
    }(rf.TComponent));
    rf.ItemRender = ItemRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TSourceCompment = (function (_super) {
        __extends(TSourceCompment, _super);
        function TSourceCompment(prefix, url, cls, clip) {
            if (clip === void 0) { clip = 0; }
            var _this = _super.call(this) || this;
            _this.readly = true;
            _this.waitsource = true;
            _this.__binded = false;
            _this.currentClip = clip;
            _this.create(prefix, url, cls);
            return _this;
        }
        TSourceCompment.prototype.create = function (perfix, url, cls) {
            if (url && url.charAt(url.length - 1) != "/") {
                url += "/";
            }
            this.perfix = perfix;
            this.url = url;
            this.symbol = cls;
            this.clean();
            if (url) {
                this.readly = false;
                var source = rf.bitmapSources[url];
                if (source && source.status == 2) {
                    this.source = source;
                    rf.callLater.add(this.sourceLoadComplete, this, source);
                }
                else {
                    this.source = rf.createUrlSource(perfix, url, "", this.sourceLoadComplete.bind(this), rf.TSource);
                }
            }
        };
        TSourceCompment.prototype.sourceLoadComplete = function (source) {
            if (source == this.source) {
                var _a = this, readly = _a.readly, stage = _a.stage;
                this.readly = true;
                this.gotoAndStop(this.currentClip, true);
                if (!this.__binded) {
                    this.__binded = true;
                    this.bindComponents();
                }
                if (this.stage) {
                    this.onShow();
                }
                if (this.waitsource && this._data != undefined) {
                    this.doData();
                }
                this.simpleDispatch(4);
            }
            else {
            }
        };
        TSourceCompment.prototype.onShow = function () {
        };
        Object.defineProperty(TSourceCompment.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
                if (!this.waitsource || this.readly) {
                    this.doData();
                }
            },
            enumerable: true,
            configurable: true
        });
        TSourceCompment.prototype.onRecycle = function () {
        };
        TSourceCompment.prototype.clean = function () {
            var graphics = this.graphics;
            graphics.clear();
            graphics.end();
            this.childrens.forData(function (child) {
                if (child instanceof rf.ImageSprite) {
                    var graphics_1 = child.graphics;
                    graphics_1.clear();
                    graphics_1.end();
                }
                return true;
            }, this);
            this.setChange(4);
        };
        TSourceCompment.prototype.addClickSound = function (key) {
            this.soundKey = key;
            this.on(56, this.soundClickHandler, this);
        };
        TSourceCompment.prototype.soundClickHandler = function (event) {
            var soundKey = this.soundKey;
            var soundurl = rf.getSoundByKey(soundKey);
            if (soundurl) {
                rf.playSound(soundurl);
            }
        };
        TSourceCompment.prototype.addToStage = function () {
            _super.prototype.addToStage.call(this);
            if (this.readly) {
                this.onShow();
            }
            this.awaken();
        };
        TSourceCompment.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            this.sleep();
        };
        return TSourceCompment;
    }(rf.TComponent));
    rf.TSourceCompment = TSourceCompment;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function STRING_FORMAT(name) {
        return function (classPrototype, propertyKey, descriptor) {
            name = name || propertyKey;
            StringFormat.decodeDict[name] = descriptor.value;
        };
    }
    rf.STRING_FORMAT = STRING_FORMAT;
    var StringFormat = (function () {
        function StringFormat() {
        }
        StringFormat.decode = function (str) {
            var ss = "";
            if (!str) {
                return ss;
            }
            var decodeDict = this.decodeDict;
            if (this.stringFilter != null) {
                str = this.stringFilter(str);
            }
            var temp = rf.o1split.find(str, "{", "}");
            while (temp) {
                var i = str.indexOf(temp);
                if (i == -1) {
                    break;
                }
                ss += str.slice(0, i);
                var temp2 = temp.slice(1, temp.length - 1).split("|");
                var decode = decodeDict[temp2[0]];
                if (decode) {
                    ss += decode(temp2[1]);
                }
                else {
                    ss += temp;
                }
                str = str.slice(i + temp.length);
                temp = rf.o1split.find(str, "{", "}");
            }
            ss += str;
            return ss;
        };
        StringFormat._p = /[{](.+?)[:](.+?)[}]/g;
        StringFormat.decodeDict = {};
        return StringFormat;
    }());
    rf.StringFormat = StringFormat;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Map.prototype, "y", {
            set: function (value) {
                this._y = value;
                console.log(value);
            },
            enumerable: true,
            configurable: true
        });
        return Map;
    }(rf.TSourceCompment));
    rf.Map = Map;
    var ComponentTest = (function (_super) {
        __extends(ComponentTest, _super);
        function ComponentTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComponentTest.prototype.init = function (canvas) {
            _super.prototype.init.call(this, canvas);
            rf.ROOT.addChild(rf.singleton(rf.GUIProfile));
            rf.context3D.defauleMag = 9729;
            rf.TComponentClass = {};
            rf.TComponentClass[1] = rf.TComponent;
            rf.TComponentClass[2] = rf.TextField;
            rf.TComponentClass[3] = rf.Button;
            rf.TComponentClass[4] = rf.ProgressBar;
            var sp = new rf.Sprite();
            sp.setPos(200, 200);
            rf.ROOT.addChild(sp);
            var tsc = new rf.TSourceCompment();
            tsc.create("http://127.0.0.1/xiakexing/res/", "touxiang/", "nv_tou_1.png");
            sp.addChild(tsc);
            tsc = new rf.TSourceCompment();
            tsc.create("http://127.0.0.1/xiakexing/res/", "touxiang/", "nv_yanjing_1.png");
            sp.addChild(tsc);
            globalThis.tsc = tsc;
        };
        ComponentTest.prototype.xiangweiTest = function () {
        };
        ComponentTest.prototype.testTest = function () {
            var sc = new rf.TSourceCompment();
            sc.create("http://127.0.0.1/fishing/res/", "ui/test/", "testScene");
            sc.setPos(200, 200);
            rf.ROOT.addChild(sc);
        };
        ComponentTest.prototype.testFontNumber = function () {
            var font = new rf.BitmapFont();
            font.load("http://127.0.0.1/fishing/res/", "ui/package/");
            font.renderText("1234567890.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz");
            font.setPos(0, 100);
            rf.ROOT.addChild(font);
        };
        ComponentTest.prototype.testMovieClip = function () {
            var mc = new rf.MovieClip();
            mc.create("http://127.0.0.1/fishing/res/", "anim/haiou/", "fly");
            mc.setPos(200, 100);
            rf.ROOT.addChild(mc);
        };
        ComponentTest.prototype.testBezier = function () {
            var start = rf.newVector3D(0, 800, 0);
            var end = rf.newVector3D(1200, 800, 0);
            var p1 = rf.newVector3D(200, 800, 0);
            var p2 = rf.newVector3D(900, 300, 0);
            var p1s = new rf.SingleImage();
            p1s.setPos(p1.x, p1.y);
            p1s.load("http://127.0.0.1/EAnimation/com/", "ui/ea/assets/motion/assets/H.png", undefined, 10);
            rf.ROOT.addChild(p1s);
            var p2s = new rf.SingleImage();
            p2s.setPos(p2.x, p2.y);
            p2s.load("http://127.0.0.1/EAnimation/com/", "ui/ea/assets/motion/assets/H.png", undefined, 10);
            rf.ROOT.addChild(p2s);
            for (var i = 0; i < 100; i++) {
                var b = rf.bezier_3(start, end, p1, p2, i / 100);
                console.log(b);
                var s = new rf.SingleImage();
                s.load("http://127.0.0.1/EAnimation/com/", "ui/ea/assets/motion/assets/H.png", undefined, 10);
                rf.ROOT.addChild(s);
                s.setPos(b[0], b[1]);
            }
        };
        ComponentTest.prototype.testList = function () {
            var data = [{ name: "1" }];
            var skillList = new rf.List(undefined, ItemComp, 600, 40, 0, 10, true, 1);
            skillList.source = rf.createUrlSource("http://127.0.0.1/xiakexing/res/", "ui/jineng/", undefined, undefined, rf.TSource);
            rf.ROOT.addChild(skillList);
            skillList.displayList(data);
            skillList.setPos(0, 0);
            skillList.setScrollRect(600, 530, 1, 1);
        };
        return ComponentTest;
    }(rf.AppBase));
    rf.ComponentTest = ComponentTest;
    var ItemComp = (function (_super) {
        __extends(ItemComp, _super);
        function ItemComp() {
            var _this = _super.call(this, "http://127.0.0.1/xiakexing/res/", "ui/jineng/", "jineng_item") || this;
            _this.waitsource = true;
            return _this;
        }
        ItemComp.prototype.bindComponents = function () {
            this.skin = this;
        };
        ItemComp.prototype.doData = function () {
            console.log("快给老子显示");
            this.skin.txt_name.text = "1";
            this.skin.txt_shulian.text = "12";
            this.skin.txt_name.text = "123";
        };
        return ItemComp;
    }(rf.TSourceCompment));
    rf.ItemComp = ItemComp;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ox = 0;
            _this.oy = 0;
            _this.nextTime = 0;
            _this.lockClip = -1;
            return _this;
        }
        MovieClip.prototype.transformToMatrix = function (transform) {
            var x = transform.x, y = transform.y, sx = transform.sx, sy = transform.sy, r = transform.r, matrix = transform.matrix;
            matrix.m2_identity();
            matrix.m2_translation(x, y);
            matrix.m2_scale(sx, sy);
            matrix.m2_rotate(r * rf.DEGREES_TO_RADIANS);
        };
        MovieClip.prototype.awaken = function () {
            rf.Engine.addTick(this.update, this);
        };
        MovieClip.prototype.sleep = function () {
            rf.Engine.removeTick(this.update, this);
        };
        MovieClip.prototype.update = function (now, interval) {
            var _a = this, currentClip = _a.currentClip, nextClip = _a.nextClip, nextTime = _a.nextTime;
            if (nextTime > 0 && now > nextTime) {
                this.gotoAndStop(nextClip);
            }
        };
        MovieClip.prototype.sourceLoadComplete = function (source) {
            if (source == this.source) {
                var data = source.data;
                var animations = data.animations;
                if (this.symbol) {
                    this.animaData = animations[this.symbol];
                }
                this.currentClip = 0;
                this.gotoAndStop(this.currentClip, true);
            }
        };
        MovieClip.prototype.playAnimation = function (name, source) {
            this.symbol = name;
            if (source) {
                this.source = source;
            }
            else if (this.source.status == 2) {
                var data = this.source.data;
                var animaData = data.animations[name];
                this.nextTime = rf.engineNow;
                this.animaData = animaData;
                this.nextClip = 0;
                this.gotoAndStop(0, true);
            }
        };
        MovieClip.prototype.clean = function () {
            var graphics = this.graphics;
            graphics.clear();
            graphics.end();
        };
        MovieClip.prototype.drawFrames = function (clipData, z1, z2, lockRender) {
            if (z1 === void 0) { z1 = 0; }
            if (z2 === void 0) { z2 = 0; }
            if (lockRender === void 0) { lockRender = -1; }
            var _a = this, graphics = _a.graphics, animaData = _a.animaData, source = _a.source, ox = _a.ox, oy = _a.oy;
            var transform = animaData.transform;
            graphics.clear();
            if (clipData.frames) {
                for (var key in clipData.frames) {
                    var frame = clipData.frames[key];
                    var z = parseInt(key);
                    if (z == lockRender) {
                        continue;
                    }
                    var vo = source.getSourceVO(frame, 0);
                    if (vo) {
                        graphics.drawBitmap(ox, oy, vo, transform.matrix, z + z1, z + z2);
                    }
                }
            }
            else if (clipData.frame) {
                var vo = source.getSourceVO(clipData.frame, 0);
                if (vo) {
                    graphics.drawBitmap(ox, oy, vo, transform.matrix, 0, 0);
                }
            }
            graphics.end();
        };
        MovieClip.prototype.gotoAndStop = function (clip, refresh) {
            var _a = this, source = _a.source, currentClip = _a.currentClip, animaData = _a.animaData, lockClip = _a.lockClip;
            if (source.status != 2) {
                return;
            }
            if (!animaData) {
                return;
            }
            if (currentClip == clip && !refresh) {
                return;
            }
            var clips = animaData.clips, transform = animaData.transform;
            if (clip >= clips.length) {
                clip = 0;
            }
            this.currentClip = clip;
            if (lockClip != -1) {
                clip = lockClip;
            }
            var clipData = clips[clip];
            var d = clipData.d, n = clipData.n;
            if (d < 0) {
                this.nextTime = -1;
            }
            else {
                this.nextTime = rf.engineNow + clipData.d;
            }
            this.nextClip = n ? n - 1 : clip;
            this.drawFrames(clipData);
        };
        return MovieClip;
    }(rf.TSourceCompment));
    rf.MovieClip = MovieClip;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ProgressBar.prototype.bindComponents = function () {
            _super.prototype.bindComponents.call(this);
            this.barWidth = this.bar.w;
        };
        ProgressBar.prototype.setProgress = function (c, t) {
            var _a = this, bar = _a.bar, barWidth = _a.barWidth;
            bar.setSize(c / t * barWidth, bar.h);
        };
        ProgressBar.prototype.setProgressPercent = function (n) {
            var _a = this, bar = _a.bar, barWidth = _a.barWidth;
            bar.setSize(n * barWidth, bar.h);
        };
        ProgressBar.prototype.getSacle9Matrix = function (matrix, ele, vo) {
            return matrix.clone();
        };
        return ProgressBar;
    }(rf.TSourceCompment));
    rf.ProgressBar = ProgressBar;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        function RadioButtonGroup(name) {
            var _this = _super.call(this) || this;
            _this._selectIndex = -1;
            _this.name = name;
            _this.list = [];
            RadioButtonGroup.groupDict[name] = _this;
            return _this;
        }
        RadioButtonGroup.getGroup = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var group = RadioButtonGroup.groupDict[name];
            if (!group) {
                group = new RadioButtonGroup(name);
            }
            args.forEach(function (element) {
                element.group = group;
                group.addRadioButton(element);
            });
            return group;
        };
        RadioButtonGroup.prototype.setTabmodel = function (parent, index, select) {
            if (select === void 0) { select = 0; }
            var list = this.list;
            this.tab_index = index;
            this.tab_parent = parent;
            for (var i = 0; i < list.length; i++) {
                var data = list[i].data;
                if (data)
                    data.remove();
            }
            this.selectIndex = select;
        };
        RadioButtonGroup.prototype.addRadioButton = function (radioButton) {
            var list = this.list;
            if (list.indexOf(radioButton) == -1) {
                radioButton.on(15, this.selectHandler, this);
                list.push(radioButton);
            }
        };
        RadioButtonGroup.prototype.removeRadioButton = function (radioButton) {
            var list = this.list;
            var i = list.indexOf(radioButton);
            if (i == -1) {
                return;
            }
            radioButton.off(15, this.selectHandler, this);
            list.splice(i, 1);
        };
        Object.defineProperty(RadioButtonGroup.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (value) {
                var _a = this, list = _a.list, selectRadioButton = _a.selectRadioButton;
                this._selectIndex = value;
                if (value == -1) {
                    if (selectRadioButton) {
                        selectRadioButton.selected = false;
                        selectRadioButton.on(15, this.selectHandler, this);
                        var display = selectRadioButton.data;
                        if (display) {
                            display.remove();
                        }
                        this.selectRadioButton = undefined;
                    }
                    return;
                }
                var item = list[value];
                if (item) {
                    item.selected = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonGroup.prototype, "selectItem", {
            set: function (val) {
                var _a = this, list = _a.list, _selectIndex = _a._selectIndex;
                if (_selectIndex == list.indexOf(val)) {
                    return;
                }
                this.selectIndex = list.indexOf(val);
            },
            enumerable: true,
            configurable: true
        });
        RadioButtonGroup.prototype.selectHandler = function (event) {
            var target = event.data;
            var _a = this, selectRadioButton = _a.selectRadioButton, list = _a.list, tab_parent = _a.tab_parent, tab_index = _a.tab_index;
            if (selectRadioButton == target) {
                if (!target._selected) {
                    this.selectRadioButton = undefined;
                    if (tab_parent) {
                        var display = target.data;
                        if (display) {
                            display.remove();
                        }
                    }
                }
                this.simpleDispatch(10);
                return;
            }
            if (target && target.selected) {
                if (selectRadioButton) {
                    selectRadioButton.selected = false;
                    selectRadioButton.on(15, this.selectHandler, this);
                    if (tab_parent) {
                        var display = selectRadioButton.data;
                        if (display) {
                            display.remove();
                        }
                    }
                }
                this._selectIndex = list.indexOf(target);
                this.selectRadioButton = target;
                if (tab_parent) {
                    var display = target.data;
                    if (display) {
                        tab_parent.addChildAt(display, tab_index);
                    }
                }
                if (!target.cancancle) {
                    target.off(15, this.selectHandler, this);
                }
                this.simpleDispatch(10, target);
            }
        };
        RadioButtonGroup.groupDict = {};
        return RadioButtonGroup;
    }(rf.MiniDispatcher));
    rf.RadioButtonGroup = RadioButtonGroup;
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton() {
            return _super.call(this) || this;
        }
        RadioButton.prototype.bindComponents = function () {
            _super.prototype.bindComponents.call(this);
            var name = this.name;
            var arr = name.split("_");
            if (arr.length == 3) {
                RadioButtonGroup.getGroup(arr[1], this);
            }
        };
        RadioButton.prototype.doSelected = function () {
            this.simpleDispatch(15, this);
            this.clipRefresh();
            if (!this._selected) {
                this.on(56, this.clickHandler, this);
            }
            else {
                if (!this.cancancle)
                    this.off(56, this.clickHandler, this);
            }
        };
        return RadioButton;
    }(rf.CheckBox));
    rf.RadioButton = RadioButton;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Drager = (function (_super) {
        __extends(Drager, _super);
        function Drager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.vStep = 1;
            _this.hStep = 1;
            _this.areacheck = false;
            return _this;
        }
        Drager.prototype.updateScroll = function (scroll, dlen, mlen) {
            scroll.dlen = dlen;
            scroll.mlen = mlen;
            scroll.max = Math.max(0, mlen - dlen);
            scroll.pos = 0;
            return scroll;
        };
        Drager.prototype.setArea = function (w, h, width, height, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _a = this, rect = _a.rect, hStep = _a.hStep, vStep = _a.vStep, updateScroll = _a.updateScroll, target = _a.target;
            if (!rect) {
                this.rect = rect = { x: 0, y: 0, w: w, h: h };
            }
            else {
                rect.w = w;
                rect.h = h;
            }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            if (hStep > 0) {
                var hScroll = this.hScroll;
                if (!hScroll) {
                    this.hScroll = hScroll = {};
                }
                updateScroll(hScroll, w, width);
            }
            if (vStep > 0) {
                var vScroll = this.vScroll;
                if (!vScroll) {
                    this.vScroll = vScroll = {};
                }
                updateScroll(vScroll, h, height);
            }
            return this;
        };
        Drager.prototype.start = function () {
            var tweener = this.tweener;
            if (tweener) {
                rf.tweenEnd(tweener);
                this.tweener = undefined;
            }
        };
        Drager.prototype.update = function (ox, oy) {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, rect = _a.rect, vScroll = _a.vScroll, hScroll = _a.hScroll;
            if (hStep > 0) {
                ox += rect.x;
                if (ox > hScroll.max) {
                    ox = hScroll.max;
                }
                else if (ox < 0) {
                    ox = 0;
                }
                rect.x = ox;
            }
            if (vStep > 0) {
                oy += rect.y;
                if (oy > vScroll.max) {
                    oy = vScroll.max;
                }
                else if (oy < 0) {
                    oy = 0;
                }
                rect.y = oy;
            }
            this.refreshScroll();
        };
        Drager.prototype.end = function () {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, areacheck = _a.areacheck, rect = _a.rect, width = _a.width, height = _a.height;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            var o;
            if (hStep > 1) {
                var dx = x % hStep;
                if (Math.abs(dx) > hStep * .5) {
                    if (dx > 0) {
                        dx = Math.ceil(x / hStep) * hStep;
                    }
                    else {
                        dx = Math.floor(x / hStep) * hStep;
                    }
                }
                else {
                    if (dx > 0) {
                        dx = Math.floor(x / hStep) * hStep;
                    }
                    else {
                        dx = Math.ceil(x / hStep) * hStep;
                    }
                }
                x = dx;
                if (!o) {
                    o = { x: dx };
                }
                else {
                    o.x = dx;
                }
            }
            if (vStep > 1) {
                var dy = y % vStep;
                if (Math.abs(dy) > vStep * .5) {
                    if (dy > 0) {
                        dy = Math.ceil(y / vStep) * vStep;
                    }
                    else {
                        dy = Math.floor(y / vStep) * vStep;
                    }
                }
                else {
                    if (dy > 0) {
                        dy = Math.floor(y / vStep) * vStep;
                    }
                    else {
                        dy = Math.ceil(y / vStep) * vStep;
                    }
                }
                y = dy;
                if (!o) {
                    o = { y: dy };
                }
                else {
                    o.y = dy;
                }
            }
            if (areacheck) {
                if (hStep > 0) {
                    if (x + w > width) {
                        if (!o) {
                            o = { x: width - w };
                        }
                        else {
                            o.x = width - w;
                        }
                    }
                    else if (x < 0) {
                        if (!o) {
                            o = { x: 0 };
                        }
                        else {
                            o.x = 0;
                        }
                    }
                }
                if (vStep > 0) {
                    if (y + h > height) {
                        if (!o) {
                            o = { y: height - h };
                        }
                        else {
                            o.y = height - h;
                        }
                    }
                    else if (y < 0) {
                        if (!o) {
                            o = { y: 0 };
                        }
                        else {
                            o.y = 0;
                        }
                    }
                }
            }
            if (o) {
                var tweener = rf.tweenTo(o, 200, rf.defaultTimeMixer, rect);
                tweener.thisObj = this;
                tweener.update = this.refreshScroll;
                this.tweener = tweener;
            }
            else {
                this.refreshScroll();
            }
        };
        Drager.prototype.disbind = function (target) {
            if (this.target == target) {
                this.target = undefined;
            }
            target.off(50, this.mouseDownHandler, this);
        };
        Drager.prototype.bind = function (target, directionX, directionY) {
            target.on(50, this.mouseDownHandler, this);
            var t = target;
            t.dragDirX = directionX;
            t.dragDirY = directionY;
            return this;
        };
        Drager.prototype.mouseDownHandler = function (event) {
            var _a = this, mouseMoveHandler = _a.mouseMoveHandler, mouseUpHandler = _a.mouseUpHandler;
            this.currentDrager = event.currentTarget;
            rf.ROOT.on(62, mouseMoveHandler, this);
            rf.ROOT.on(53, mouseUpHandler, this);
            this.start();
        };
        Drager.prototype.mouseUpHandler = function (event) {
            rf.ROOT.off(62, this.mouseMoveHandler, this);
            rf.ROOT.off(53, this.mouseUpHandler, this);
            this.end();
        };
        Drager.prototype.mouseMoveHandler = function (event) {
            var _a = this.currentDrager, dragDirX = _a.dragDirX, dragDirY = _a.dragDirY;
            var _b = event.data, ox = _b.ox, oy = _b.oy;
            this.update(ox * dragDirX, oy * dragDirY);
        };
        Drager.prototype.refreshScroll = function (tweener) {
            var _a = this, hStep = _a.hStep, vStep = _a.vStep, rect = _a.rect, width = _a.width, height = _a.height, target = _a.target, originx = _a.x, originy = _a.y;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            if (hStep > 0) {
                var scroll_1 = this.hScroll;
                var max = scroll_1.max;
                if (x > 0) {
                    scroll_1.mlen = width + x;
                    scroll_1.pos = max;
                }
                else if (x < -max) {
                    scroll_1.mlen = width - x;
                    scroll_1.pos = 0;
                }
                else {
                    scroll_1.mlen = width;
                    scroll_1.pos = x;
                }
                this.hScroll.pos = scroll_1.pos;
            }
            if (vStep > 0) {
                var scroll_2 = this.vScroll;
                var max = scroll_2.max;
                if (y > 0) {
                    scroll_2.mlen = height + y;
                    scroll_2.pos = max;
                }
                else if (y < -max) {
                    scroll_2.mlen = height - y;
                    scroll_2.pos = Math.max(0, scroll_2.mlen - scroll_2.dlen);
                }
                else {
                    scroll_2.mlen = height;
                    scroll_2.pos = y;
                }
                this.vScroll.pos = scroll_2.pos;
            }
            this.simpleDispatch(12, this);
            if (target && (hStep || vStep)) {
                target.setPos(x + originx, y + originy);
                target.scrollRect.x = -x;
                target.scrollRect.y = -y;
                target.setChange(12);
            }
        };
        return Drager;
    }(rf.MiniDispatcher));
    rf.Drager = Drager;
    var Scroll = (function (_super) {
        __extends(Scroll, _super);
        function Scroll(target) {
            var _this = _super.call(this) || this;
            var scrollRect = target.scrollRect;
            _this.rect = {};
            rf.clone(scrollRect, _this.rect);
            var w = scrollRect.w, h = scrollRect.h;
            _this.areacheck = true;
            if (target.status | 32) {
                target.updateHitArea();
            }
            var width = target.w, height = target.h, x = target.x, y = target.y;
            _this.setArea(w, h, width, height, x, y);
            target.on(2, _this.resizeHandler, _this);
            _this.target = target;
            return _this;
        }
        Scroll.prototype.resizeHandler = function (event) {
            var _a = event.currentTarget, width = _a.w, height = _a.h;
            var _b = this.rect, w = _b.w, h = _b.h;
            this.setArea(w, h, width, height, this.x, this.y);
        };
        Scroll.prototype.resetOrigin = function () {
            this.rect.x = 0;
            this.rect.y = 0;
            this.end();
        };
        Scroll.prototype.scrollxy = function (x, y) {
            if (x != undefined)
                this.rect.x = -x;
            if (y != undefined)
                this.rect.y = -y;
            this.end();
        };
        Scroll.prototype.update = function (ox, oy) {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, rect = _a.rect, vScroll = _a.vScroll, hScroll = _a.hScroll;
            if (hStep > 0) {
                ox += rect.x;
                if (ox < -hScroll.max) {
                    ox = -hScroll.max;
                }
                else if (ox > 0) {
                    ox = 0;
                }
                rect.x = ox;
            }
            if (vStep > 0) {
                oy += rect.y;
                if (oy < -vScroll.max) {
                    oy = -vScroll.max;
                }
                else if (oy > 0) {
                    oy = 0;
                }
                rect.y = oy;
            }
            this.refreshScroll();
        };
        Scroll.prototype.end = function () {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, areacheck = _a.areacheck, rect = _a.rect, width = _a.width, height = _a.height;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            var o;
            if (hStep > 1) {
                var dx = x % hStep;
                if (Math.abs(dx) > hStep * .5) {
                    dx = Math.floor(x / hStep) * hStep;
                }
                else {
                    dx = Math.ceil(x / hStep) * hStep;
                }
                x = dx;
                if (!o) {
                    o = { x: dx };
                }
                else {
                    o.x = dx;
                }
            }
            if (vStep > 1) {
                var dy = y % vStep;
                if (Math.abs(dy) > vStep * .5) {
                    dy = Math.floor(y / vStep) * vStep;
                }
                else {
                    dy = Math.ceil(y / vStep) * vStep;
                }
                y = dy;
                if (!o) {
                    o = { y: dy };
                }
                else {
                    o.y = dy;
                }
            }
            if (areacheck) {
                if (hStep > 0) {
                    if (width > w) {
                        if (x + width < w) {
                            if (!o) {
                                o = { x: w - width };
                            }
                            else {
                                o.x = w - width;
                            }
                        }
                        else if (x > 0) {
                            if (!o) {
                                o = { x: 0 };
                            }
                            else {
                                o.x = 0;
                            }
                        }
                    }
                    else {
                        if (x != 0) {
                            if (!o) {
                                o = { x: 0 };
                            }
                            else {
                                o.x = 0;
                            }
                        }
                    }
                }
                if (vStep > 0) {
                    if (height > h) {
                        if (y + height < h) {
                            if (!o) {
                                o = { y: h - height };
                            }
                            else {
                                o.y = h - height;
                            }
                        }
                        else if (y > 0) {
                            if (!o) {
                                o = { y: 0 };
                            }
                            else {
                                o.y = 0;
                            }
                        }
                    }
                    else {
                        if (y != 0) {
                            if (!o) {
                                o = { y: 0 };
                            }
                            else {
                                o.y = 0;
                            }
                        }
                    }
                }
            }
            if (o) {
                var tweener = rf.tweenTo(o, 200, rf.defaultTimeMixer, rect);
                tweener.thisObj = this;
                tweener.update = this.refreshScroll;
                this.tweener = tweener;
            }
            else {
                this.refreshScroll();
            }
        };
        Object.defineProperty(Scroll.prototype, "backward", {
            get: function () {
                var _a = this, hStep = _a.hStep, hScroll = _a.hScroll, vScroll = _a.vScroll;
                var c = hStep > 0 ? hScroll.pos : vScroll.pos;
                var max = hStep > 0 ? hScroll.max : vScroll.max;
                return Math.abs(c) < max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroll.prototype, "forward", {
            get: function () {
                var _a = this, hStep = _a.hStep, hScroll = _a.hScroll, vScroll = _a.vScroll;
                var c = hStep > 0 ? hScroll.pos : vScroll.pos;
                return c < 0;
            },
            enumerable: true,
            configurable: true
        });
        return Scroll;
    }(Drager));
    rf.Scroll = Scroll;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SingleImage = (function (_super) {
        __extends(SingleImage, _super);
        function SingleImage() {
            var _this = _super.call(this) || this;
            _this.renderer = new rf.SingleRenderer(_this);
            return _this;
        }
        SingleImage.prototype.load = function (perfix, url, scale9, circle) {
            var source = rf.bitmapSources[url];
            this.scale9 = scale9;
            this.circle = circle;
            if (source && source.status == 2) {
                this.loadComplete(source);
            }
            else {
                rf.createUrlSource(perfix, url, undefined, this.loadComplete.bind(this));
            }
        };
        SingleImage.prototype.loadComplete = function (source) {
            this.source = source;
            var _a = this, graphics = _a.graphics, scale9 = _a.scale9, circle = _a.circle, w = _a.w, h = _a.h;
            graphics.clear();
            if (scale9) {
                graphics.drawScale9Bitmap(0, 0, source.getSourceVO(0), scale9);
            }
            else if (circle) {
                graphics.drawCircle(circle, circle, circle, source.getSourceVO(0));
            }
            else {
                graphics.drawBitmap(0, 0, source.getSourceVO(0));
            }
            graphics.end();
            if (w != 0) {
                this.w = 0;
                this.setSize(w, h);
                this.simpleDispatch(2, true);
            }
            this.simpleDispatch(4);
        };
        return SingleImage;
    }(rf.ImageSprite));
    rf.SingleImage = SingleImage;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function getSoundByKey(key) {
        return undefined;
    }
    rf.getSoundByKey = getSoundByKey;
    var actived = true;
    var sounds = {};
    function playSound(url, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (!actived)
            return;
        if (rf.http_hash) {
            var hashurl = rf.http_hash[url];
            if (hashurl) {
                url = hashurl;
            }
        }
        url = rf.RES_PERFIX + "/" + url;
        var sound = createSound(0);
        sound.autoplay = true;
        sound.loop = loop;
        sound.volume = 1;
        sound.src = url;
        return sound;
    }
    rf.playSound = playSound;
    function playBgSound(uri, loop) {
        if (loop === void 0) { loop = true; }
        if (!actived)
            return;
        if (rf.http_hash) {
            var hashurl = rf.http_hash[uri];
            if (hashurl) {
                uri = hashurl;
            }
        }
        var url = rf.RES_PERFIX + "/" + uri;
        var sound = createSound(1);
        sound.autoplay = true;
        sound.loop = loop;
        sound.src = url;
        return sound;
    }
    rf.playBgSound = playBgSound;
    var _bgmute = false;
    function bgsoundMute() {
        _bgmute = !_bgmute;
        var sound = sounds[1];
        sound.volume = (_bgmute || _mute) ? 0 : _volume;
    }
    rf.bgsoundMute = bgsoundMute;
    function createSound(type) {
        var sound = sounds[type];
        if (!sound) {
            sounds[type] = sound = rf.createInnerAudioContext();
        }
        sound.volume = _mute ? 0 : _volume;
        return sound;
    }
    function createUrlSound(res, loop) {
        if (loop === void 0) { loop = false; }
        var sound = sounds[res];
        if (!sound) {
            sounds[res] = sound = rf.createInnerAudioContext();
        }
        sound.volume = _mute ? 0 : _volume;
        sound.autoplay = true;
        sound.loop = loop;
        var url = rf.RES_PERFIX + "/" + res;
        sound.src = url;
        return sound;
    }
    rf.createUrlSound = createUrlSound;
    var _mute = false;
    function muteSounds() {
        _mute = !_mute;
        for (var key in sounds) {
            var sound = sounds[key];
            var novol = (~~key == 1 && _bgmute) ? true : false;
            sound.volume = _mute ? 0 : (novol ? 0 : _volume);
        }
    }
    rf.muteSounds = muteSounds;
    function soundIsMute() {
        return _mute;
    }
    rf.soundIsMute = soundIsMute;
    var _volume = 1;
    function sound_vol(val) {
        val = val > 1 ? val * 0.01 : val;
        _volume = val;
        if (_mute)
            return;
        for (var key in sounds) {
            var sound = sounds[key];
            if (~~key == 1 && _bgmute)
                continue;
            sound.volume = val;
        }
    }
    rf.sound_vol = sound_vol;
    function soundEnable() {
        actived = true;
        for (var key in sounds) {
            var sound = sounds[key];
            sound.play();
        }
    }
    rf.soundEnable = soundEnable;
    function soundProhibit() {
        actived = false;
        for (var key in sounds) {
            var sound = sounds[key];
            sound.stop();
        }
    }
    rf.soundProhibit = soundProhibit;
    function soundPause() {
        for (var key in sounds) {
            var sound = sounds[key];
            sound.pause();
        }
    }
    rf.soundPause = soundPause;
    function soundRecover() {
        for (var key in sounds) {
            var sound = sounds[key];
            sound.play();
        }
    }
    rf.soundRecover = soundRecover;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TSource = (function (_super) {
        __extends(TSource, _super);
        function TSource(perfix, url) {
            var _this = _super.call(this, perfix, url) || this;
            _this.task = new rf.LoadTask();
            _this.task.on(4, _this.taskCompleteHandler, _this);
            return _this;
        }
        TSource.prototype.load = function () {
            this.status = 1;
            var _a = this, task = _a.task, name = _a.name, perfix = _a.perfix;
            var res = task.add(perfix, name + "data.dat", 1, this.configCompleteHandler, this);
            if (res.status == 2) {
                this.data = res.data;
            }
            res = task.add(perfix, name + "diff.png", 5, this.imageCompelteHandler, this);
            if (res.status == 2) {
                var bmd = res.data;
                this.bmd = bmd;
                this.width = bmd.width;
                this.height = bmd.height;
                this.setArea(rf.BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            }
        };
        TSource.prototype.configCompleteHandler = function (e) {
            this.data = e.data;
        };
        TSource.prototype.imageCompelteHandler = function (e) {
            if (e.type == 4) {
                var bmd = e.data;
                this.bmd = bmd;
                this.width = bmd.width;
                this.height = bmd.height;
                this.setArea(rf.BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            }
        };
        TSource.prototype.taskCompleteHandler = function (e) {
            if (this.data) {
                var _a = this.data, frames_2 = _a.frames, width_1 = _a.width, height_1 = _a.height;
                var area = this.areas[0];
                area.frames = frames_2;
                if (width_1 !== undefined) {
                    rf.foreach(frames_2, function (frame) {
                        rf.refreshUV(frame, width_1, height_1);
                        return true;
                    }, this);
                }
                var vo = this.getSourceVO("origin.png");
                if (vo) {
                    this.originU = (vo.ur - vo.ul) * 0.5 + vo.ul;
                    this.originV = (vo.vb - vo.vt) * 0.5 + vo.vt;
                }
                this.status = 2;
                var completeFuncs = this.completeFuncs;
                for (var i = 0; i < completeFuncs.length; i++) {
                    completeFuncs[i](this);
                }
                completeFuncs.length = 0;
                this.simpleDispatch(4, this);
            }
        };
        return TSource;
    }(rf.UrlBitmapSource));
    rf.TSource = TSource;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function getAdaptiveInfo() {
        if (!rf.adaptiveInfo) {
            var system = rf.systemInfo;
            var menu = rf.getMenuButtonBoundingClientRect();
            var scaleY = 1;
            var scaleX = 1;
            if (rf.lockStageArea) {
                scaleY = rf.lockHeight / system.windowHeight;
                scaleX = rf.lockWidth / system.windowWidth;
            }
            var statusBarHeight = scaleY * system.statusBarHeight;
            var x = menu.left * scaleX;
            var y = menu.top * scaleY;
            var w = menu.width * scaleX;
            var h = menu.height * scaleY;
            rf.adaptiveInfo = { statusBarHeight: statusBarHeight, x: x, y: y, w: w, h: h };
        }
        return rf.adaptiveInfo;
    }
    rf.getAdaptiveInfo = getAdaptiveInfo;
    function convertToWindow(size) {
        var x = size.x, y = size.y, w = size.w, h = size.h;
        var system = rf.systemInfo;
        var scaleY = 1;
        var scaleX = 1;
        scaleY = rf.stageHeight / system.windowHeight;
        scaleX = rf.stageWidth / system.windowWidth;
        x /= scaleX;
        y /= scaleY;
        w /= scaleX;
        h /= scaleY;
        size.x = x;
        size.y = y;
        size.w = w;
        size.h = h;
    }
    rf.convertToWindow = convertToWindow;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.gameConfig = {};
    rf.modelData = {};
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Mask = (function (_super) {
        __extends(Mask, _super);
        function Mask() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.size = { x: 0, y: 0, w: 0, h: 0 };
            return _this;
        }
        Mask.prototype.movetoSize = function (size, duration, callback) {
            var x = size.x, y = size.y, w = size.w, h = size.h;
            var tweener = rf.tweenTo({ x: x, y: y, w: w, h: h }, duration, rf.defaultTimeMixer, this.size);
            tweener.thisObj = this;
            tweener.update = this.tweenUpdate;
            if (callback) {
                tweener.complete = callback;
            }
        };
        Mask.prototype.tweenUpdate = function () {
            this.drawBox(this.size);
        };
        Mask.prototype.drawBox = function (size, color, alpha) {
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 0.7; }
            this.size = size;
            var graphics = this.graphics;
            graphics.clear();
            graphics.drawRect(0, 0, rf.stageWidth, size.y, color, alpha);
            graphics.drawRect(0, size.y, size.x, rf.stageHeight - size.y, color, alpha);
            graphics.drawRect(size.x + size.w, size.y, rf.stageWidth - size.x + size.w, rf.stageHeight - size.y, color, alpha);
            graphics.drawRect(size.x, size.y + size.h, size.w, rf.stageHeight - size.y + size.h, color, alpha);
            graphics.end();
        };
        Mask.prototype.getObjectByPoint = function (dx, dy, scale) {
            var size = this.size;
            if (rf.size_checkIn(size, dx, dy)) {
                return undefined;
            }
            return _super.prototype.getObjectByPoint.call(this, dx, dy, scale);
        };
        return Mask;
    }(rf.Sprite));
    rf.Mask = Mask;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.phaseParsers = {};
    function PhaseFunc(name) {
        return function (classPrototype, propertyKey, descriptor) {
            name = name || propertyKey;
            rf.phaseParsers[name] = descriptor.value;
        };
    }
    rf.PhaseFunc = PhaseFunc;
    rf.phaseDebug = true;
    function playPhase(id, target, params) {
        var phasedata = rf.gameConfig.phase[id];
        if (phasedata) {
            var p = rf.recyclable(Phase);
            p.id = id;
            p.on(4, p.onPhaseComplete, p, 0);
            if (rf.phaseDebug) {
                console.log("phase play => " + id + " " + new Date().format("HH:mm:ss", true));
            }
            p.play(phasedata.tasks[0], target, this.tm, params);
            return p;
        }
    }
    rf.playPhase = playPhase;
    rf.__phaseTarget = {};
    var Phase = (function (_super) {
        __extends(Phase, _super);
        function Phase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Phase.getPhaseDisplay = function (name) {
            var d = rf.__phaseTarget[name];
            if (d instanceof Function) {
                d = d(name);
            }
            return d;
        };
        Phase.prototype.play = function (task, target, tm, params) {
            this.status = 1;
            this.task = task;
            this.steps = task.steps;
            this.actions = task.actions;
            this.target = target;
            this.params = params;
            this.index = 0;
            tm = this.tm = (tm || rf.defaultTimeMixer);
            this.nextActionTime = tm.now;
            this.temp = { params: params, phase: this };
            this.next();
        };
        Phase.prototype.stop = function () {
            this.status = 0;
            rf.Engine.removeTick(this.update, this);
            if (this.nextTime instanceof rf.MiniDispatcher) {
                this.nextTime.off(4, this.next, this);
                this.nextTime = undefined;
            }
            rf.callLater.remove(this.next, this);
        };
        Phase.prototype.act_desc = function (a) {
            var s = "";
            for (var key in a) {
                s += "  " + String(key) + ":" + String(a[key]) + "\t";
            }
            return s;
        };
        Phase.prototype.next = function (e) {
            var _a = this, index = _a.index, target = _a.target, actions = _a.actions, status = _a.status, tm = _a.tm, nextActionTime = _a.nextActionTime, params = _a.params;
            if (e) {
                e.currentTarget.off(4, this.next, this);
            }
            else if (nextActionTime > tm.now) {
                rf.log("error next");
                return;
            }
            rf.Engine.removeTick(this.update, this);
            if (status != 1) {
                return;
            }
            var action = actions[index++];
            if (!action) {
                this.complete();
                return;
            }
            this.index = index;
            var thisobj, f;
            var t = action.t;
            if (target) {
                thisobj = target;
                f = target[t];
            }
            thisobj = this;
            if (!f || !(f instanceof Function)) {
                f = rf.phaseParsers[t];
            }
            if (!f || !(f instanceof Function)) {
                f = this[t];
            }
            if (!f || !(f instanceof Function)) {
                this.next();
                return;
            }
            var actiont = this.coverAction(action, params);
            if (rf.phaseDebug) {
                console.log(actiont, "phase action => " + action.t + " " + new Date().format("HH:mm:ss", true));
            }
            var nextTime = f.call(thisobj, actiont, params);
            if (typeof nextTime == "number") {
                this.nextActionTime = this.tm.now + nextTime;
                rf.Engine.addTick(this.update, this);
            }
            else if (nextTime instanceof rf.MiniDispatcher) {
                this.nextTime = nextTime;
                nextTime.on(4, this.next, this);
            }
            else {
                this.next();
            }
        };
        Phase.prototype.coverAction = function (action, param) {
            var _this = this;
            var o = {};
            rf.foreach(action, function (v, k) {
                if (k == "t")
                    return true;
                var t = rf.codeDoProperty(_this, v, param);
                o[k] = t === undefined ? v : t;
                return true;
            }, this);
            return o;
        };
        Phase.prototype.update = function (now, interval) {
            var _a = this, tm = _a.tm, nextActionTime = _a.nextActionTime;
            if (tm.now >= nextActionTime) {
                rf.Engine.removeTick(this.update, this);
                this.next();
            }
        };
        Phase.prototype.complete = function () {
            if (rf.phaseDebug) {
                console.log("phase complete => " + this.id + " " + new Date().format("HH:mm:ss", true));
            }
            this.status = 2;
            this.simpleDispatch(4);
        };
        Phase.prototype.onRecycle = function () {
            this.stop();
            this.index = 0;
            this.actions = undefined;
            this.target = undefined;
            this.task = undefined;
            this.steps = undefined;
            this.status = undefined;
        };
        Phase.prototype.delay = function (action, params) {
            var d = action.d;
            d = rf.codeDoProperty(this, d, params);
            return d;
        };
        Phase.prototype.check = function (action) {
            var steps = this.steps;
            var f = action.f, p = action.p, q = action.q;
            if (f == true) {
                if (undefined != steps[p]) {
                    this.index = steps[p];
                }
            }
            else {
                if (undefined != steps[q]) {
                    this.index = steps[q];
                }
            }
        };
        Phase.prototype.if = function (action) {
            var steps = this.steps;
            var _a = action, f = _a.f, b = _a.b, p = _a.p, q = _a.q;
            if (f.toString() != b.toLowerCase()) {
                if (undefined != steps[p]) {
                    this.index = steps[p];
                }
            }
            else {
                if (undefined != steps[q]) {
                    this.index = steps[q];
                }
            }
        };
        Phase.prototype.goto = function (action) {
            this.index = this.steps[action.p];
        };
        Phase.prototype.xiangwei = function (action) {
            var f = action.f, p = action.p;
            if (p) {
                return this.playxw(f);
            }
            else {
                this.playxw(f);
            }
        };
        Phase.prototype.playxw = function (id) {
            var phasedata = rf.gameConfig.phase[id];
            if (phasedata) {
                var p = rf.recyclable(Phase);
                p.on(4, p.onPhaseComplete, p, 0);
                p.play(phasedata.tasks[0], p, this.tm);
                return p;
            }
        };
        Phase.prototype.onPhaseComplete = function (e) {
            var phase = e.currentTarget;
            phase.off(e.type, this.onPhaseComplete, this);
            phase.recycle();
        };
        Phase.prototype.func = function (action) {
            return action.p;
        };
        Phase.prototype.log = function (action) {
            console.log(rf.codeDoProperty(this, action.p, rf.modelData));
        };
        Phase.prototype.mask = function (action) {
            var p = action.p, duration = action.d, f = action.f;
            var mask = rf.singleton(rf.Mask);
            if (!p) {
                mask.remove();
                return;
            }
            var x = p[0], y = p[1], w = p[2], h = p[3];
            if (f) {
                var ox = f[0], oy = f[1], ow = f[2], oh = f[3];
                x += ox;
                y += oy;
                w += ow;
                h += oh;
            }
            if (duration) {
                mask.movetoSize({ x: x, y: y, w: w, h: h }, duration);
            }
            else {
                mask.drawBox({ x: x, y: y, w: w, h: h });
            }
            if (!mask.stage) {
                rf.tipContainer.addChild(mask);
            }
            return duration;
        };
        Phase.prototype.facade = function (action) {
            rf.facade.simpleDispatch(action.p);
        };
        Phase.prototype.event = function (action, params) {
            var _a = action.v, type = _a[0], timeout = _a[1];
            var v = rf.recyclable(rf.MiniDispatcher);
            function typeHandler(event) {
                rf.callLater.remove(typeHandler, this);
                rf.facade.off(type, typeHandler, this);
                v.simpleDispatch(4);
                v.removeEventListeners();
                v.recycle();
            }
            rf.facade.on(type, typeHandler, this);
            if (timeout === undefined) {
                timeout = 10;
            }
            else {
                timeout = rf.codeDoProperty(this, timeout, params);
            }
            rf.callLater.later(typeHandler, this, timeout);
            return v;
        };
        Phase.prototype.maskto = function (action) {
            var p = action.p, duration = action.d, f = action.f;
            var display = p;
            var x = display.stageX - 2;
            var y = display.stageY - 2;
            var w = display.w + 4;
            var h = display.h + 2;
            action.p = [x, y, w, h];
            return this.mask(action);
        };
        Phase.prototype.setpro = function (action) {
            var p = action.p, x = action.x;
            var temp = this.temp;
            temp[p] = x;
        };
        Phase.prototype.click = function (action) {
            var p = action.p;
            var v = rf.recyclable(rf.MiniDispatcher);
            function clickHandler(event) {
                p.off(56, clickHandler, this);
                v.simpleDispatch(4);
                v.removeEventListeners();
                v.recycle();
            }
            p.on(56, clickHandler, this);
            return v;
        };
        __decorate([
            PhaseFunc("set")
        ], Phase.prototype, "setpro", null);
        __decorate([
            rf.CodeFunc()
        ], Phase, "getPhaseDisplay", null);
        return Phase;
    }(rf.MiniDispatcher));
    rf.Phase = Phase;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var O1Split = (function () {
        function O1Split() {
            this._z = 0;
            this._d = 0;
            this._k = 0;
            this._m = 0;
            this._m2 = 0;
        }
        O1Split.prototype.init = function () {
            this._z = 0;
            this._d = 0;
            this._k = 0;
            this._m = 0;
            this._m2 = 0;
        };
        O1Split.prototype.split = function (str, separator, dot) {
            if (dot === void 0) { dot = false; }
            this.init();
            var result = [];
            var len = str.length;
            var v = "";
            for (var i = 0; i < len; i++) {
                var c = str.charAt(i);
                if (this.check(c, separator)) {
                    v.trim();
                    if (v.length) {
                        result.push(v);
                    }
                    if (dot) {
                        result.push(c);
                    }
                    v = "";
                }
                else {
                    v += c;
                }
            }
            v = v.trim();
            result.push(v);
            return result;
        };
        O1Split.prototype.check = function (c, enter) {
            if (enter === void 0) { enter = null; }
            var _a = this, _m = _a._m, _m2 = _a._m2;
            if (c == "[") {
                if (!_m) {
                    this._z++;
                }
            }
            else if (c == "{") {
                if (!_m) {
                    this._d++;
                }
            }
            else if (c == "}") {
                if (!_m) {
                    this._d--;
                }
            }
            else if (c == "]") {
                if (!_m) {
                    this._z--;
                }
            }
            else if (c == "(") {
                if (!_m) {
                    this._k++;
                }
            }
            else if (c == ")") {
                if (!_m) {
                    this._k--;
                }
            }
            else if (c == '"') {
                if (_m) {
                    this._m = 0;
                }
                else {
                    this._m = 1;
                }
            }
            else if (c == "'") {
                if (_m2) {
                    this._m2 = 0;
                }
                else {
                    this._m2 = 1;
                }
            }
            else if (enter) {
                if (this.isPass() == 1) {
                    if (typeof enter == "string") {
                        return enter.indexOf(c) != -1;
                    }
                    else {
                        return c.match(enter) != undefined;
                    }
                }
            }
            return false;
        };
        O1Split.prototype.isPass = function () {
            var _a = this, _d = _a._d, _z = _a._z, _k = _a._k, _m = _a._m, _m2 = _a._m2;
            if (_d < 0 || _z < 0 || _k < 0) {
                return -1;
            }
            if (_d > 0 || _z > 0 || _k > 0 || _m > 0 || _m2 > 0) {
                return 0;
            }
            if (_d == 0 && _z == 0 && _k == 0 && _m == 0) {
                return 1;
            }
            return -1;
        };
        O1Split.prototype.find = function (str, s, e) {
            this.init();
            var len = str.length;
            var v = "";
            var find = s;
            for (var i = 0; i < len; i++) {
                var c = str.charAt(i);
                if (c == find) {
                    v += c;
                    if (this.isPass() == 1) {
                        find = find == e ? undefined : e;
                    }
                    else {
                        this.check(c);
                    }
                }
                else {
                    this.check(c);
                    if (find == e) {
                        v += c;
                    }
                }
                if (find == undefined) {
                    return v;
                }
            }
            return undefined;
        };
        return O1Split;
    }());
    rf.O1Split = O1Split;
    rf.o1split = rf.singleton(O1Split);
})(rf || (rf = {}));
var rf;
(function (rf) {
    var HtmlUtil = (function () {
        function HtmlUtil() {
        }
        HtmlUtil.boldString = function (str) {
            return "<b>" + str + "</b>";
        };
        HtmlUtil.renderLink2 = function (linkName, o) {
            return "<a href ='event:" + JSON.stringify(o) + "'>" + linkName + "</a>";
        };
        HtmlUtil.renderLink = function (linkName, event, color) {
            linkName = "<a href='event:" + event + "'>" + linkName + "</a>";
            if (color) {
                linkName = this.renderColor(linkName, color);
            }
            return linkName;
        };
        HtmlUtil.renderAdvLink = function (linkName, o, color, u) {
            if (u === void 0) { u = false; }
            var result;
            if (typeof o == "string") {
                result = o;
            }
            else {
                result = JSON.stringify(o);
            }
            result = "<a href ='event:" + result + "'>" + linkName + "</a>";
            if (color) {
                result = "<font color='" + color + "'>" + result + "</font>";
            }
            if (u) {
                result = "<u>" + result + "</u>";
            }
            return result;
        };
        HtmlUtil.red = function (value) {
            return this.renderColor(value, this.RED);
        };
        HtmlUtil.green = function (value) {
            return this.renderColor(value, this.GREEN);
        };
        HtmlUtil.toggleColor = function (value, bool, clr1, clr2) {
            if (clr1 === void 0) { clr1 = null; }
            if (clr2 === void 0) { clr2 = null; }
            var clr;
            if (bool) {
                clr = clr1;
                if (!clr)
                    clr = this.DEF_TOGGLE1;
            }
            else {
                clr = clr2;
                if (!clr)
                    clr = this.DEF_TOGGLE2;
            }
            return this.renderColor(value, clr);
        };
        HtmlUtil.renderColor = function (value, color) {
            return "<font color='" + color + "'>" + value + "</font>";
        };
        HtmlUtil.underline = function (result) {
            return "<u>" + result + "</u>";
        };
        HtmlUtil.RED = "#FF4B27";
        HtmlUtil.GREEN = "#00FF00";
        HtmlUtil.WHITE = "#FFFFFF";
        HtmlUtil.YELLOW = "#FFFF00";
        HtmlUtil.RICEYELLOW = "#FFF2D7";
        HtmlUtil.DEF_TOGGLE1 = "#00FF00";
        HtmlUtil.DEF_TOGGLE2 = "#FF0000";
        return HtmlUtil;
    }());
    rf.HtmlUtil = HtmlUtil;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function bezier_2(s, e, d, t, result) {
        if (!result) {
            result = rf.TEMP_VECTOR3D;
        }
        var dt = 1 - t;
        var _a = s, sx = _a[0], sy = _a[1], sz = _a[2];
        var _b = e, ex = _b[0], ey = _b[1], ez = _b[2];
        var _c = d, dx = _c[0], dy = _c[1], dz = _c[2];
        var a = dt * dt;
        var b = 2 * t * dt;
        var c = t * t;
        result[0] = a * sx + b * dx + c * ex;
        result[1] = a * sy + b * dy + c * ey;
        result[2] = a * sz + b * dz + c * ez;
        return result;
    }
    rf.bezier_2 = bezier_2;
    function bezier_3(s, e, p1, p2, t, result) {
        if (!result) {
            result = rf.TEMP_VECTOR3D;
        }
        var dt = 1 - t;
        var t3 = t * t * t;
        var _a = s, sx = _a[0], sy = _a[1], sz = _a[2];
        var _b = e, ex = _b[0], ey = _b[1], ez = _b[2];
        var _c = p1, p1x = _c[0], p1y = _c[1], p1z = _c[2];
        var _d = p2, p2x = _d[0], p2y = _d[1], p2z = _d[2];
        var a = dt * dt * dt;
        var b = 3 * t * dt * dt;
        var c = 3 * t3 * dt;
        var d = t3;
        result[0] = a * sx + b * p1x + c * p2x + d * ex;
        result[1] = a * sy + b * p1y + c * p2y + d * ey;
        result[2] = a * sz + b * p1z + c * p2z + d * ez;
        return result;
    }
    rf.bezier_3 = bezier_3;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function initFilterstring(str, split) {
        var arr = str.split(split);
        _len = arr.length;
        var p = /([\/*().?|+\-$\^=:!@])/g;
        var p2 = /([\\\[\]])/g;
        var p3 = /[\u4E00-\u9FFF]/;
        var t, i;
        function toRegexp(t) {
            if (t.length > 1) {
                var d = t.charAt(0);
                for (var i_1 = 1; i_1 < t.length; i_1++) {
                    var v = t.charCodeAt(i_1);
                    if (v > 255) {
                        d += "[\\0-\\255|\\u0-\\u4DD0]*" + t.charAt(i_1);
                    }
                    else {
                        d += t.charAt(i_1);
                    }
                }
                t = d;
            }
            return t;
        }
        var stlen = 0;
        var regstr = "";
        _filterList = [];
        for (i = 0; i < _len; i++) {
            t = arr[i];
            t = t.replace(p2, "[\\$1]");
            t = t.replace(p, "[$1]");
            t = toRegexp(t);
            _filterList[i] = new RegExp(t, "g");
        }
        _filterList[i] = new RegExp("[|]", "g");
        _len = _len + 1;
        rf.WordFilter.wordCensor = wordCensor2;
        rf.WordFilter.checkWord = checkWord2;
    }
    rf.initFilterstring = initFilterstring;
    function wordCensor2(msg) {
        for (var i = _len - 1; i >= 0; i--) {
            msg = msg.replace(_filterList[i], rf.replaceDirty);
        }
        return msg;
    }
    rf.wordCensor2 = wordCensor2;
    function checkWord2(msg) {
        for (var i = 0; i < _len; i++) {
            _filterList[i].lastIndex = 0;
            if (_filterList[i].test(msg)) {
                return true;
            }
        }
        return false;
    }
    rf.checkWord2 = checkWord2;
    rf.replaceDirty = function (substring) {
        var len = substring.length;
        var result = "";
        while (len--) {
            result += "*";
        }
        return result;
    };
    var _filterList;
    var filterWords = /卐|妓|婊|尻|屄|屌|睾|肏|[|]/g;
    var _len;
    rf.WordFilter = {
        initFilterstring: initFilterstring,
        wordCensor: wordCensor2,
        setDirtyHandler: function (handler) {
            rf.replaceDirty = handler;
        },
        checkWord: checkWord2,
    };
})(rf || (rf = {}));
//# sourceMappingURL=component.js.map
if (typeof global != "undefined") {
    global["rf"] = rf;
}
if (typeof GameGlobal != "undefined") {
    GameGlobal["rf"] = rf;
}
