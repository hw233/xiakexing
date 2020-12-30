
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var rf;
(function (rf) {
    var EngineMain = (function () {
        function EngineMain() {
            rf.Engine.start();
        }
        return EngineMain;
    }());
    rf.EngineMain = EngineMain;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function inRange(a, min, max) {
        return min <= a && a <= max;
    }
    rf.inRange = inRange;
    function byte_div(n, d) {
        return Math.floor(n / d);
    }
    rf.byte_div = byte_div;
    function byte_Error(fatal, opt_code_point) {
        if (fatal) {
        }
        return opt_code_point || 0xFFFD;
    }
    rf.byte_Error = byte_Error;
    function byte_inflate(data) {
        return new rf.Inflate(data).decompress();
    }
    rf.byte_inflate = byte_inflate;
    function byte_Deflate(data) {
        return rf.Deflate.compress(data);
    }
    rf.byte_Deflate = byte_Deflate;
    function byte_decodeUTF8(data) {
        var fatal = false;
        var pos = 0;
        var result = "";
        var code_point;
        var utf8_code_point = 0;
        var utf8_bytes_needed = 0;
        var utf8_bytes_seen = 0;
        var utf8_lower_boundary = 0;
        var inRange = rf.inRange;
        var decoderError = byte_Error;
        while (data.length > pos) {
            var _byte = data[pos++];
            if (_byte == -1) {
                if (utf8_bytes_needed != 0) {
                    code_point = decoderError(fatal);
                }
                else {
                    code_point = -1;
                }
            }
            else {
                if (utf8_bytes_needed == 0) {
                    if (inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    }
                    else {
                        if (inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        }
                        else if (inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        }
                        else if (inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        }
                        else {
                            decoderError(fatal);
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                }
                else if (!inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = decoderError(fatal, _byte);
                }
                else {
                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    }
                    else {
                        var cp = utf8_code_point;
                        var lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (inRange(cp, lower_boundary, 0x10FFFF) && !inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        }
                        else {
                            code_point = decoderError(fatal, _byte);
                        }
                    }
                }
            }
            if (code_point !== null && code_point !== -1) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0)
                        result += String.fromCharCode(code_point);
                }
                else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
    rf.byte_decodeUTF8 = byte_decodeUTF8;
    function stringToCodePoints(string) {
        var cps = [];
        var i = 0, n = string.length;
        while (i < string.length) {
            var c = string.charCodeAt(i);
            if (!inRange(c, 0xD800, 0xDFFF)) {
                cps.push(c);
            }
            else if (inRange(c, 0xDC00, 0xDFFF)) {
                cps.push(0xFFFD);
            }
            else {
                if (i == n - 1) {
                    cps.push(0xFFFD);
                }
                else {
                    var d = string.charCodeAt(i + 1);
                    if (inRange(d, 0xDC00, 0xDFFF)) {
                        var a = c & 0x3FF;
                        var b = d & 0x3FF;
                        i += 1;
                        cps.push(0x10000 + (a << 10) + b);
                    }
                    else {
                        cps.push(0xFFFD);
                    }
                }
            }
            i += 1;
        }
        return cps;
    }
    rf.stringToCodePoints = stringToCodePoints;
    function byte_encodeUTF8(str) {
        var pos = 0;
        var codePoints = stringToCodePoints(str);
        var outputBytes = [];
        var inRange = rf.inRange;
        var decoderError = byte_Error;
        while (codePoints.length > pos) {
            var code_point = codePoints[pos++];
            if (inRange(code_point, 0xD800, 0xDFFF)) {
                decoderError(code_point);
            }
            else if (inRange(code_point, 0x0000, 0x007f)) {
                outputBytes.push(code_point);
            }
            else {
                var count = void 0, offset = void 0;
                if (inRange(code_point, 0x0080, 0x07FF)) {
                    count = 1;
                    offset = 0xC0;
                }
                else if (inRange(code_point, 0x0800, 0xFFFF)) {
                    count = 2;
                    offset = 0xE0;
                }
                else if (inRange(code_point, 0x10000, 0x10FFFF)) {
                    count = 3;
                    offset = 0xF0;
                }
                outputBytes.push(byte_div(code_point, Math.pow(64, count)) + offset);
                while (count > 0) {
                    var temp = byte_div(code_point, Math.pow(64, count - 1));
                    outputBytes.push(0x80 + (temp % 64));
                    count -= 1;
                }
            }
        }
        return new Uint8Array(outputBytes);
    }
    rf.byte_encodeUTF8 = byte_encodeUTF8;
    var Byte = (function () {
        function Byte(buf) {
            this.setArrayBuffer(buf);
        }
        Byte.prototype.setArrayBuffer = function (buf) {
            if (undefined == buf) {
                this.length = this.position = 0;
                buf = new ArrayBuffer(0);
            }
            else {
                this.buf = new DataView(buf);
                this.length = buf.byteLength;
                this.position = 0;
            }
            this.uint8 = new Uint8Array(buf);
            this.buffer = buf;
        };
        Byte.prototype.outOfRange = function () {
        };
        Byte.prototype.readByte = function () {
            var position = this.position;
            if (position > this.length) {
                this.outOfRange();
                return;
            }
            ;
            var b = this.buf.getUint8(position);
            this.position++;
            return b;
        };
        Byte.prototype.validate = function (len) {
            return this.position + len > this.length;
        };
        Byte.prototype.writeByte = function (v) {
            var position = this.position;
            ;
            this.position++;
            this.buf.setInt8(position, v);
        };
        Byte.prototype.readUint16 = function (littleEndian) {
            var position = this.position;
            if (position + 2 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getUint16(position, littleEndian);
            this.position = position + 2;
            return b;
        };
        Byte.prototype.writeUint16 = function (v, littleEndian) {
            var position = this.position;
            this.position = position + 2;
            this.buf.setUint16(position, v, littleEndian);
        };
        Byte.prototype.writeInt = function (v) {
            var position = this.position;
            this.position = position + 4;
            this.buf.setInt32(position, v);
        };
        Byte.prototype.readUInt = function () {
            var position = this.position;
            if (position + 4 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getUint32(position);
            this.position = position + 4;
            return b;
        };
        Byte.prototype.writeUInt = function (v) {
            var position = this.position;
            ;
            this.position += 4;
            this.buf.setUint32(position, v);
        };
        Byte.prototype.readDouble = function () {
            var position = this.position;
            if (position + 8 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getFloat64(position);
            this.position = position + 8;
            return b;
        };
        Byte.prototype.readFloat = function () {
            var position = this.position;
            if (position + 4 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getFloat32(position);
            this.position = position + 4;
            return b;
        };
        Byte.prototype.readMultiByte = function (length, charSet) {
            if (charSet === void 0) { charSet = "utf-8"; }
            var _a = this, position = _a.position, buf = _a.buf;
            var end = position + length;
            if (end > this.length) {
                this.outOfRange();
                return;
            }
            this.position += length;
            var str = byte_decodeUTF8(new Uint8Array(buf.buffer.slice(position, end)));
            return str;
        };
        Byte.prototype.readByteArray = function (length) {
            var position = this.position;
            if (!length) {
                length = this.length - position;
            }
            var buf = this.buf.buffer.slice(position, position + length);
            this.position += length;
            return buf;
        };
        Byte.prototype.writeByteArray = function (byte) {
            var _a = this, position = _a.position, uint8 = _a.uint8;
            uint8.set(byte, position);
            this.position += byte.length;
        };
        return Byte;
    }());
    rf.Byte = Byte;
    var ClassDefine = (function () {
        function ClassDefine(className, members) {
            this.className = className;
            this.members = members;
        }
        return ClassDefine;
    }());
    rf.ClassDefine = ClassDefine;
    var AMF3Decode = (function (_super) {
        __extends(AMF3Decode, _super);
        function AMF3Decode(buf) {
            var _this = _super.call(this, buf) || this;
            _this.flags = 0;
            _this.stringsTable = [];
            _this.objectsTable = [];
            _this.traitsTable = [];
            _this.clsNameMap = {};
            _this.MASK = 1 << 28;
            return _this;
        }
        AMF3Decode.prototype.clear = function () {
            var _a = this, stringsTable = _a.stringsTable, objectsTable = _a.objectsTable, traitsTable = _a.traitsTable;
            stringsTable.length = 0;
            objectsTable.length = 0;
            traitsTable.length = 0;
            this.clsNameMap = {};
        };
        AMF3Decode.prototype.read29 = function (unsign) {
            var v = 0, a = 0;
            v = this.readByte();
            if (v >= 0x80) {
                a = this.readByte();
                v = (v & 0x7f) << 7;
                if (a < 0x80) {
                    v = v | a;
                }
                else {
                    v = (v | a & 0x7f) << 7;
                    a = this.readByte();
                    if (a < 0x80) {
                        v = v | a;
                    }
                    else {
                        v = (v | a & 0x7f) << 8;
                        a = this.readByte();
                        v = v | a;
                    }
                }
                v = -(v & 0x10000000) | v;
            }
            return v;
        };
        AMF3Decode.prototype.readInt = function () {
            var position = this.position;
            if (position + 4 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getInt32(position);
            this.position = position + 4;
            return b;
        };
        AMF3Decode.prototype.readString = function () {
            var handle = this.read29(true);
            var inline = (handle & 1) != 0;
            handle = handle >> 1;
            if (inline) {
                if (0 == handle) {
                    return "";
                }
                var str = this.readMultiByte(handle);
                this.stringsTable.push(str);
                return str;
            }
            return this.stringsTable[handle];
        };
        AMF3Decode.prototype.readDate = function (u29D) {
            return new Date(this.readDouble());
        };
        AMF3Decode.prototype.readObjectVector = function (length) {
            var fixed = this.read29(true);
            var list = [];
            this.objectsTable.push(list);
            var index = -1;
            while (++index < length) {
                list[index] = this.readObject();
            }
            return list;
        };
        AMF3Decode.prototype.readArray = function (length) {
            var objectsTable = this.objectsTable;
            var instance = [];
            objectsTable.push(instance);
            var key;
            while (key = this.readString()) {
                instance[key] = this.readObject();
            }
            var index = -1;
            while (++index < length) {
                instance[index] = this.readObject();
            }
            return instance;
        };
        AMF3Decode.prototype.readDictionary = function (length) {
            var weakKeys = this.readByte() != 0;
            var dic = {};
            this.objectsTable.push(dic);
            var key;
            var value;
            for (var i = 0; i < length; i++) {
                key = this.readObject();
                value = this.readObject();
                dic[key] = value;
            }
            return dic;
        };
        AMF3Decode.prototype.readObject = function () {
            if (!this.length || this.position == this.length) {
                return undefined;
            }
            var value;
            var marker = this.readByte();
            switch (marker) {
                case 4:
                    value = this.read29(false);
                    if (value >= 0x10000000) {
                        value = value - 0xFFFFFFFF - 1;
                    }
                    break;
                case 5:
                    value = this.readDouble();
                    break;
                case 2:
                case 3:
                    value = (marker == 3);
                    break;
                case 1:
                    value = null;
                    break;
                case 0:
                    value = undefined;
                    break;
                case 6:
                    value = this.readString();
                    break;
                case 18:
                case 19:
                case 9:
                case 10:
                case 8:
                case 11:
                case 7:
                case 12:
                case 16:
                case 13:
                case 14:
                case 15:
                case 17:
                    value = this.readReferencableObject(marker);
                    break;
                default:
                    throw Error("not implement:" + marker);
            }
            return value;
        };
        AMF3Decode.prototype.readByteArray = function (length) {
            var objectsTable = this.objectsTable;
            var buf = _super.prototype.readByteArray.call(this, length);
            objectsTable.push(buf);
            return buf;
        };
        AMF3Decode.prototype._readObject = function (handle) {
            var _a = this, traitsTable = _a.traitsTable, objectsTable = _a.objectsTable;
            var traits;
            var classDef;
            var className;
            var len;
            var i;
            var inlineClassDef = ((handle & 1) != 0);
            handle = handle >> 1;
            if (inlineClassDef) {
                className = this.readString();
                var isIExternalizable = (handle & 1) != 0;
                handle = handle >> 1;
                var isDynamic = (handle & 1) != 0;
                if (isDynamic == false) {
                }
                len = handle >> 1;
                traits = [];
                for (i = 0; i < len; i++) {
                    traits[i] = this.readString();
                }
                classDef = new ClassDefine(className, traits);
                classDef.isExternalizable = isIExternalizable;
                classDef.isDynamic = isDynamic;
                traitsTable.push(classDef);
            }
            else {
                classDef = traitsTable[handle];
                if (!classDef) {
                    throw new Error("no trait found with refId: " + handle);
                }
                traits = classDef.members;
                className = classDef.className;
            }
            var instance;
            instance = {};
            objectsTable.push(instance);
            for (var key in traits) {
                key = traits[key];
                instance[key] = this.readObject();
            }
            if (classDef.isDynamic) {
                var key = void 0;
                while (key = this.readString()) {
                    instance[key] = this.readObject();
                }
            }
            return instance;
        };
        AMF3Decode.prototype.readReferencableObject = function (marker) {
            var objectsTable = this.objectsTable;
            var object;
            var handle = this.read29(true);
            var isIn = (handle & 1) == 0;
            handle = handle >> 1;
            if (isIn) {
                object = objectsTable[handle];
                return object;
            }
            else {
                switch (marker) {
                    case 9:
                        object = this.readArray(handle);
                        break;
                    case 10:
                        object = this._readObject(handle);
                        break;
                    case 8:
                        object = this.readDate(handle);
                        break;
                    case 11:
                        object = this.readMultiByte(handle);
                        break;
                    case 7:
                        object = this.readMultiByte(handle);
                        break;
                    case 12:
                        object = this.readByteArray(handle);
                        break;
                    case 18:
                        object = new Float32Array(this.readByteArray(handle));
                        break;
                    case 19:
                        object = new Uint16Array(this.readByteArray(handle));
                        break;
                    case 16:
                    case 14:
                    case 13:
                    case 15:
                        object = this.readObjectVector(handle);
                        break;
                    case 17:
                        object = this.readDictionary(handle);
                        break;
                    default:
                        throw Error("not implement:" + handle);
                }
            }
            return object;
        };
        return AMF3Decode;
    }(Byte));
    rf.AMF3Decode = AMF3Decode;
    var AMF3Encode = (function (_super) {
        __extends(AMF3Encode, _super);
        function AMF3Encode(buf) {
            var _this = _super.call(this, buf || new ArrayBuffer(10240 * 1024)) || this;
            _this.stringsTable = [];
            _this.objectsTable = [];
            _this.traitsTable = [];
            _this.unit8 = new Uint8Array(_this.buf.buffer);
            return _this;
        }
        AMF3Encode.prototype.clear = function () {
            var _a = this, stringsTable = _a.stringsTable, objectsTable = _a.objectsTable, traitsTable = _a.traitsTable;
            stringsTable.length = 0;
            objectsTable.length = 0;
            traitsTable.length = 0;
            this.position = 0;
        };
        AMF3Encode.prototype.writeByte = function (value) {
            this.buf.setUint8(this.position, value);
            this.position++;
        };
        AMF3Encode.prototype.writeFloat = function (value) {
            this.buf.setFloat32(this.position, value);
            this.position += 4;
        };
        AMF3Encode.prototype.writeDouble = function (value) {
            this.buf.setFloat64(this.position, value);
            this.position += 8;
        };
        AMF3Encode.prototype.writeString = function (str) {
            var stringsTable = this.stringsTable;
            var index = stringsTable.indexOf(str);
            var handle;
            if (index == -1) {
                var byte = byte_encodeUTF8(str);
                var length_1 = byte.length;
                handle = length_1 << 1;
                handle |= 1;
                this.write29(handle, true);
                this.writeByteArray(byte);
                if (str) {
                    stringsTable.push(str);
                }
            }
            else {
                handle = index << 1;
                handle |= 0;
                this.write29(handle, true);
            }
        };
        AMF3Encode.prototype.write29 = function (v, unsign) {
            var len = 0;
            if (v < 0x80)
                len = 1;
            else if (v < 0x4000)
                len = 2;
            else if (v < 0x200000)
                len = 3;
            else
                len = 4;
            switch (len) {
                case 1:
                    this.writeByte(v);
                    break;
                case 2:
                    this.writeByte(((v >> 7) & 0x7F) | 0x80);
                    this.writeByte(v & 0x7F);
                    break;
                case 3:
                    this.writeByte(((v >> 14) & 0x7F) | 0x80);
                    this.writeByte(((v >> 7) & 0x7F) | 0x80);
                    this.writeByte(v & 0x7F);
                    break;
                case 4:
                    this.writeByte(((v >> 22) & 0x7F) | 0x80);
                    this.writeByte(((v >> 15) & 0x7F) | 0x80);
                    this.writeByte(((v >> 8) & 0x7F) | 0x80);
                    this.writeByte(v & 0xFF);
                    break;
            }
        };
        AMF3Encode.prototype.isRealNum = function (val) {
            if (val === "" || val == null) {
                return false;
            }
            if (!isNaN(val)) {
                return true;
            }
            else {
                return false;
            }
        };
        AMF3Encode.prototype.writeObject = function (o) {
            var type = typeof o;
            if (type === "string") {
                this.writeByte(6);
                this.writeString(String(o));
            }
            else if (type === "boolean") {
                this.writeByte(o == true ? 3 : 2);
            }
            else if ('number' === type) {
                if ((o >> 0) === o && o >= -0x10000000 && o < 0x10000000) {
                    if (o < 0) {
                        o = 0xFFFFFFFF + (o + 1);
                    }
                    this.writeByte(4);
                    this.write29(o, false);
                }
                else {
                    this.writeByte(5);
                    this.writeDouble(o);
                }
            }
            else if (o instanceof Uint16Array) {
                this.writeByte(19);
                this.writeBytes(o.buffer);
            }
            else if (o instanceof Float32Array) {
                this.writeByte(18);
                this.writeBytes(o.buffer);
            }
            else if (o instanceof Uint8Array
                || (o instanceof Uint32Array)
                || o instanceof Float64Array) {
                this.writeByte(12);
                this.writeBytes(o.buffer);
            }
            else if (o instanceof ArrayBuffer) {
                this.writeByte(12);
                this.writeBytes(o);
            }
            else if (o instanceof Array) {
                this.writeArray(o);
            }
            else if (o instanceof Object) {
                this.writeByte(10);
                var objectsTable = this.objectsTable;
                var index = objectsTable.indexOf(o);
                var ins = 0;
                if (index != -1) {
                    this.write29(index << 1, true);
                    return;
                }
                objectsTable.push(o);
                this.write29(11, true);
                this.write29(1, true);
                for (var key in o) {
                    this.writeString(key);
                    this.writeObject(o[key]);
                }
                this.writeByte(1);
            }
            else if (null === o) {
                this.writeByte(1);
            }
            else if (undefined === o) {
                this.writeByte(0);
            }
        };
        AMF3Encode.prototype.writeArray = function (arr) {
            this.writeByte(9);
            var objectsTable = this.objectsTable;
            var index = objectsTable.indexOf(arr);
            var ins = 0;
            if (index != -1) {
                this.write29(index << 1, true);
                return;
            }
            objectsTable.push(arr);
            var len = arr.length;
            this.write29((len << 1) | 1, true);
            this.writeByte(1);
            for (var i = 0; i < len; i++) {
                this.writeObject(arr[i]);
            }
        };
        AMF3Encode.prototype.writeBytes = function (buffer) {
            var objectsTable = this.objectsTable;
            var index = objectsTable.indexOf(buffer);
            var ins = 0;
            if (index != -1) {
                this.write29(index << 1, true);
                return;
            }
            objectsTable.push(buffer);
            var length = buffer.byteLength;
            this.write29((length << 1) | 1, true);
            this.unit8.set(new Uint8Array(buffer), this.position);
            this.position += buffer.byteLength;
        };
        AMF3Encode.prototype.toUint8Array = function () {
            return new Uint8Array(this.buf.buffer).slice(0, this.position);
        };
        AMF3Encode.prototype.toArrayBuffer = function (pos) {
            if (!~~pos) {
                pos = this.position;
            }
            return this.buf.buffer.slice(0, pos);
        };
        return AMF3Encode;
    }(Byte));
    rf.AMF3Encode = AMF3Encode;
    function amf_writeObject(obj) {
        var amf = rf.singleton(AMF3Encode);
        amf.clear();
        amf.writeObject(obj);
        return amf.toUint8Array();
    }
    rf.amf_writeObject = amf_writeObject;
    function amf_readObject(byte) {
        var amf = rf.singleton(AMF3Decode);
        if (byte instanceof Uint8Array) {
            byte = byte.buffer;
        }
        amf.clear();
        amf.setArrayBuffer(byte);
        var o = amf.readObject();
        return o;
    }
    rf.amf_readObject = amf_readObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function forarr(obj, func, thisobj) {
        if (!obj) {
            return;
        }
        var len = obj.length;
        var i = 0;
        while (i < len) {
            if (false === func.call(thisobj, obj[i], i, obj)) {
                return;
            }
            i++;
        }
    }
    rf.forarr = forarr;
    function foreach(obj, func, thisobj) {
        if (!obj) {
            return;
        }
        for (var key in obj) {
            if (false === func.call(thisobj, obj[key], key, obj)) {
                return;
            }
        }
    }
    rf.foreach = foreach;
    function EVT() {
        var evt = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            evt[_i] = arguments[_i];
        }
        return function (classPrototype, propertyKey, descriptor) {
            var map = classPrototype.eventInterests;
            if (!map) {
                classPrototype.eventInterests = map = [];
            }
            var v = descriptor.value;
            for (var i = 0; i < evt.length; i++) {
                map.push({ k: evt[i], v: v });
            }
        };
    }
    rf.EVT = EVT;
    function DebugProperty(enumerable, configurable) {
        if (enumerable === void 0) { enumerable = true; }
        if (configurable === void 0) { configurable = true; }
        return function (target, property) {
            Object.defineProperty(target, property, {
                get: function () {
                    return target["debugpro_" + property];
                },
                set: function (value) {
                    if (value != target["debugpro_" + property]) {
                        target["debugpro_" + property] = value;
                    }
                },
                enumerable: enumerable,
                configurable: configurable
            });
        };
    }
    rf.DebugProperty = DebugProperty;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ClassFactory = (function () {
        function ClassFactory(creator, props) {
            this._creator = creator;
            if (props != undefined)
                this._props = props;
        }
        ClassFactory.prototype.get = function () {
            var ins = new this._creator();
            var p = this._props;
            for (var key in p) {
                ins[key] = p[key];
            }
            return ins;
        };
        return ClassFactory;
    }());
    rf.ClassFactory = ClassFactory;
    function pro_copy(to, pros) {
        for (var key in pros) {
            to[key] = pros[key];
        }
        return to;
    }
    rf.pro_copy = pro_copy;
    var RecyclablePool = (function () {
        function RecyclablePool(TCreator, max) {
            if (max === void 0) { max = 100; }
            this._pool = [];
            this._max = max;
            this._creator = TCreator;
        }
        RecyclablePool.prototype.get = function (params) {
            var ins;
            var pool = this._pool;
            if (pool.length) {
                ins = pool.pop();
            }
            else {
                ins = new this._creator();
            }
            if (params) {
                pro_copy(ins, params);
            }
            if (typeof ins.onSpawn === "function") {
                ins.onSpawn();
            }
            if (ins._insid == undefined) {
                ins._insid = _recid++;
            }
            return ins;
        };
        RecyclablePool.prototype.recycle = function (t) {
            var pool = this._pool;
            var idx = pool.indexOf(t);
            if (!~idx) {
                if (typeof t.onRecycle === "function") {
                    t.onRecycle();
                }
                if (pool.length < this._max) {
                    pool.push(t);
                }
            }
        };
        return RecyclablePool;
    }());
    rf.RecyclablePool = RecyclablePool;
    var _recid = 0;
    function recyclable(clazz, addInstanceRecycle, params) {
        var pool;
        if (clazz.hasOwnProperty("_pool")) {
            pool = clazz._pool;
        }
        if (!pool) {
            if (addInstanceRecycle) {
                pool = new RecyclablePool(function () {
                    var ins = new clazz();
                    ins.recycle = recycle;
                    return ins;
                });
            }
            else {
                pool = new RecyclablePool(clazz);
                var pt = clazz.prototype;
                if (!pt.hasOwnProperty("recycle")) {
                    pt.recycle = recycle;
                }
            }
            Object.defineProperty(clazz, "_pool", {
                value: pool
            });
        }
        return pool.get(params);
        function recycle() {
            pool.recycle(this);
        }
    }
    rf.recyclable = recyclable;
    function singleton(clazz) {
        var instance;
        if (clazz.hasOwnProperty("_instance")) {
            instance = clazz._instance;
        }
        if (!instance) {
            instance = new clazz;
            Object.defineProperty(clazz, "_instance", {
                value: instance
            });
        }
        return instance;
    }
    rf.singleton = singleton;
    function RecyclePro(defaultValue) {
        return function (host, property) {
            var key = "recyleObj";
            var recyleObj = host[key];
            if (!recyleObj) {
                host[key] = recyleObj = {};
            }
            if (host.className != host.constructor.name) {
                host.className = host.constructor.name;
                host[key] = recyleObj = pro_copy({}, recyleObj);
            }
            recyleObj[property] = defaultValue;
        };
    }
    rf.RecyclePro = RecyclePro;
    var RecycleObject = (function () {
        function RecycleObject() {
            this.__class__ = rf.getQualifiedClassName(this);
        }
        RecycleObject.prototype.onRecycle = function () {
            var _this = this;
            var recyleObj = this.recyleObj;
            if (recyleObj != undefined) {
                rf.foreach(recyleObj, function (v, k, o) {
                    _this[k] = v;
                    return true;
                });
            }
        };
        return RecycleObject;
    }());
    rf.RecycleObject = RecycleObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var LinkVO = (function () {
        function LinkVO() {
            this.close = true;
            this.inLink = false;
            this.weight = 0;
            this.time = 0;
        }
        LinkVO.prototype.onRecycle = function () {
            this.data = undefined;
            this.args = undefined;
            this.thisObj = undefined;
            this.next = undefined;
            this.pre = undefined;
            this.weight = 0;
            this.close = true;
            this.inLink = false;
        };
        LinkVO.prototype.onSpawn = function () {
            this.close = false;
        };
        return LinkVO;
    }());
    rf.LinkVO = LinkVO;
    var Link = (function () {
        function Link() {
            this.last = undefined;
            this.first = undefined;
            this.__length = 0;
            this.warningMax = 2000;
            this.checkSameData = true;
            this.lock = false;
            this.lockLinks = [];
        }
        Link.prototype.getFrist = function () {
            if (undefined == this.first)
                return undefined;
            var vo = this.first;
            while (vo) {
                if (false == vo.close) {
                    return vo;
                }
                vo = vo.next;
            }
            return undefined;
        };
        Link.prototype.getLast = function () {
            if (undefined == this.last)
                return undefined;
            var vo = this.last;
            while (vo) {
                if (false == vo.close) {
                    return vo;
                }
                vo = vo.pre;
            }
            return undefined;
        };
        Link.prototype.getValueLink = function (value, thisObj) {
            var vo = this.getFrist();
            var result;
            var checkLen = 0;
            if (vo) {
                while (vo) {
                    checkLen++;
                    if (checkLen > this.warningMax) {
                        console.log("getValueLink linkLength > " + this.warningMax);
                        break;
                    }
                    if (false == vo.close) {
                        if (value == vo.data && thisObj == vo.thisObj) {
                            result = vo;
                        }
                    }
                    vo = vo.next;
                }
                if (!result) {
                    rf.forarr(this.lockLinks, function (vo) {
                        if (vo.data == value && vo.thisObj == thisObj) {
                            result = vo;
                        }
                        return true;
                    });
                }
            }
            return result;
        };
        Link.prototype.indexOf = function (value, thisObj) {
            var vo = this.getFrist();
            var i = -1;
            if (vo) {
                while (vo) {
                    if (false == vo.close) {
                        i++;
                        if (value == vo.data && thisObj == vo.thisObj) {
                            break;
                        }
                    }
                    vo = vo.next;
                }
            }
            return i;
        };
        Link.prototype.create = function (value, thisObj, args) {
            var vo;
            if (value) {
                if (this.checkSameData) {
                    vo = this.getValueLink(value, thisObj);
                    if (vo && vo.close == false)
                        return vo;
                }
                vo = rf.recyclable(LinkVO);
                vo.weight = undefined;
                vo.data = value;
                vo.args = args;
                vo.thisObj = thisObj;
            }
            return vo;
        };
        Link.prototype.add = function (value, thisObj, args) {
            var vo;
            if (this.checkSameData) {
                vo = this.getValueLink(value, thisObj);
                if (vo && vo.close == false)
                    return vo;
            }
            vo = rf.recyclable(LinkVO);
            vo.weight = undefined;
            vo.data = value;
            vo.args = args;
            vo.thisObj = thisObj;
            if (vo) {
                if (this.lock) {
                    if (this.lockLinks.length > 10000) {
                        console.log("this.lockLinks.length > 10000 ?????????????????????????????");
                    }
                    else {
                        this.lockLinks.push(vo);
                    }
                }
                else {
                    this.__addvo(vo);
                }
            }
            return vo;
        };
        Link.prototype.addByWeight = function (value, weight, thisObj, args) {
            if (!value)
                return undefined;
            var vo;
            if (this.checkSameData) {
                vo = this.getValueLink(value, thisObj);
                if (vo && vo.close == false) {
                    if (weight == vo.weight) {
                        return vo;
                    }
                    vo.close = true;
                }
            }
            vo = rf.recyclable(LinkVO);
            vo.weight = weight;
            vo.data = value;
            vo.thisObj = thisObj;
            vo.args = args;
            if (this.lock) {
                this.lockLinks.push(vo);
            }
            else {
                this.__addvo(vo);
            }
            return vo;
        };
        Link.prototype.__addvo = function (vo) {
            this.__length++;
            vo.inLink = true;
            if (undefined == this.first) {
                if (vo.weight === undefined) {
                    vo.weight = 0;
                }
                this.first = this.last = vo;
            }
            else {
                if (vo.weight === undefined) {
                    vo.weight = 0;
                    vo.pre = this.last;
                    this.last.next = vo;
                    this.last = vo;
                }
                else {
                    var tempvo = this.getFrist();
                    if (undefined == tempvo) {
                        vo.pre = this.last;
                        this.last.next = vo;
                        this.last = vo;
                    }
                    else {
                        while (tempvo) {
                            if (false == tempvo.close) {
                                if (tempvo.weight < vo.weight) {
                                    vo.next = tempvo;
                                    vo.pre = tempvo.pre;
                                    if (undefined != tempvo.pre) {
                                        tempvo.pre.next = vo;
                                    }
                                    tempvo.pre = vo;
                                    if (tempvo == this.first) {
                                        this.first = vo;
                                    }
                                    break;
                                }
                            }
                            tempvo = tempvo.next;
                        }
                        if (undefined == tempvo) {
                            vo.pre = this.last;
                            this.last.next = vo;
                            this.last = vo;
                        }
                    }
                }
            }
        };
        Link.prototype.remove = function (value, thisObj) {
            var vo = this.getValueLink(value, thisObj);
            if (!vo)
                return;
            if (vo.inLink) {
                this.removeLink(vo);
            }
        };
        Link.prototype.removeLink = function (vo) {
            if (vo.close == false) {
                if (this.__length <= 0) {
                    this.__length = 0;
                }
                else {
                    this.__length--;
                }
                vo.close = true;
            }
            vo.data = null;
            rf.callLater.later(this.clean, this, 500);
        };
        Link.prototype.clean = function () {
            var vo = this.first;
            var next;
            this.__length = 0;
            while (vo) {
                next = vo.next;
                if (true == vo.close) {
                    if (vo == this.first) {
                        this.first = vo.next;
                        if (undefined != this.first) {
                            this.first.pre = undefined;
                        }
                    }
                    else {
                        vo.pre.next = vo.next;
                    }
                    if (vo == this.last) {
                        this.last = vo.pre;
                        if (undefined != this.last) {
                            this.last.next = undefined;
                        }
                    }
                    else {
                        vo.next.pre = vo.pre;
                    }
                    vo.recycle();
                }
                else {
                    this.__length++;
                }
                vo = next;
            }
        };
        Link.prototype.pop = function () {
            var vo = this.getLast();
            if (vo) {
                var data = vo.data;
                this.removeLink(vo);
                return data;
            }
            return undefined;
        };
        Link.prototype.shift = function () {
            var vo = this.getFrist();
            if (vo) {
                var data = vo.data;
                this.removeLink(vo);
                return data;
            }
            return undefined;
        };
        Link.prototype.forEach = function (f, thisObj) {
            var _this = this;
            if (undefined == f)
                return;
            this.lock = true;
            var checkLen = 0;
            var vo = this.getFrist();
            while (vo) {
                checkLen++;
                if (checkLen > this.warningMax) {
                    console.log("forEach linkLength > " + this.warningMax);
                    break;
                }
                var temp = vo;
                vo = vo.next;
                if (false == temp.close) {
                    if (f.call(thisObj, temp) == false) {
                        break;
                    }
                }
            }
            this.lock = false;
            var lockLinks = this.lockLinks;
            rf.forarr(lockLinks, function (vo) {
                if (false == vo.close) {
                    _this.__addvo(vo);
                }
                return true;
            });
            lockLinks.length = 0;
        };
        Link.prototype.forData = function (f, thisObj) {
            var _this = this;
            if (undefined == f)
                return;
            this.lock = true;
            var checkLen = 0;
            var vo = this.getFrist();
            while (vo) {
                checkLen++;
                if (checkLen > this.warningMax) {
                    console.log("forData linkLength > " + this.warningMax);
                    break;
                }
                var temp = vo;
                vo = vo.next;
                if (false == temp.close) {
                    if (f.call(thisObj, temp.data) == false) {
                        break;
                    }
                }
            }
            this.lock = false;
            var lockLinks = this.lockLinks;
            rf.forarr(lockLinks, function (vo) {
                if (false == vo.close) {
                    _this.__addvo(vo);
                }
                return true;
            });
            lockLinks.length = 0;
        };
        Link.prototype.onRecycle = function () {
            var vo = this.first;
            var next;
            var c = 0;
            while (vo) {
                c++;
                if (c > this.warningMax) {
                    break;
                }
                next = vo.next;
                vo.recycle();
                vo = next;
            }
            this.first = this.last = undefined;
            this.__length = 0;
            this.checkSameData = true;
        };
        Link.prototype.toString = function () {
            var vo = this.getFrist();
            var s = "list:";
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    s += vo.data + ",";
                }
                vo = vo.next;
            }
            return s;
        };
        Object.defineProperty(Link.prototype, "datas", {
            get: function () {
                var arr = [];
                for (var vo = this.getFrist(); vo; vo = vo.next) {
                    if (vo.close == false) {
                        arr.push(vo.data);
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Link.prototype, "vos", {
            get: function () {
                var arr = [];
                for (var vo = this.getFrist(); vo; vo = vo.next) {
                    if (vo.close == false) {
                        arr.push(vo);
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        return Link;
    }());
    rf.Link = Link;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.weixin = false;
    rf.nextUpdateTime = 0;
    rf.lastUpdateDate = 0;
    rf.frameInterval = 0;
    rf.engineNow = 0;
    rf.windowWidth = 0;
    rf.windowHeight = 0;
    rf.isWindowResized = false;
    rf.stageWidth = 0;
    rf.stageHeight = 0;
    rf.pixelRatio = 1;
    rf.resizeStageSizeFunction = defaultResize;
    var Engine = (function () {
        function Engine() {
        }
        Engine.start = function () {
            rf.lastUpdateDate = Engine.startTime = Date.now();
            rf.engineNow = 0;
            Engine.frameRate = Engine._frameRate;
            rf.nextUpdateTime = rf.frameInterval;
            Engine._nextProfileTime = 1000;
            var pauseTime = 0;
            var isPause = false;
            function hide() {
                isPause = true;
                pauseTime = Date.now();
                if (animationflag) {
                    cancelAnimationFrame(animationflag);
                }
            }
            function show() {
                pauseTime = Date.now() - pauseTime;
                animationflag = animationRequest(onAnimationChange);
            }
            rf.onHide(hide);
            rf.onShow(show);
            var animationflag;
            var animationRequest = requestAnimationFrame;
            function onAnimationChange(time) {
                if (isPause) {
                    rf.nextUpdateTime = Date.now();
                    rf.lastUpdateDate = rf.nextUpdateTime - rf.frameInterval;
                    isPause = false;
                }
                time = Date.now();
                var interval = time - rf.lastUpdateDate;
                if (interval < 0) {
                    interval = 0;
                    console.log("interval <= 0");
                    setTimeout(function () {
                        animationflag = animationRequest(onAnimationChange);
                    }, rf.frameInterval);
                    return;
                }
                animationflag = animationRequest(onAnimationChange);
                if (time < rf.nextUpdateTime) {
                    return;
                }
                rf.lastUpdateDate = time;
                rf.nextUpdateTime = rf.lastUpdateDate + rf.frameInterval - 1;
                rf.tm_add(rf.defaultTimeMixer, interval);
                rf.engineNow = rf.defaultTimeMixer.now;
                Engine.update(rf.defaultTimeMixer.now, interval);
                Engine.profile();
            }
            animationRequest(onAnimationChange);
            if (!rf.weixin) {
                rf.onWindowResize(function (res) {
                    var width = res.windowWidth, height = res.windowHeight;
                    if (rf.windowWidth != width || rf.windowHeight != height) {
                        rf.windowWidth = width;
                        rf.windowHeight = height;
                        rf.isWindowResized = true;
                    }
                });
            }
            rf.resizeStageSizeFunction(rf.windowWidth, rf.windowHeight);
        };
        Engine.addResize = function (value, thisObj) {
            Engine.resizeLink.add(value, thisObj);
            value.call(thisObj, rf.stageWidth, rf.stageHeight);
        };
        Engine.removeResize = function (value, thisObj) {
            Engine.resizeLink.remove(value);
        };
        Engine.resize = function (width, height) {
            Engine.resizeLink.forEach(function (vo) {
                var value = vo.data;
                value.call(vo.thisObj, width, height);
                return true;
            }, this);
        };
        Engine.addTick = function (tick, thisObj) {
            Engine.ticklink.add(tick, thisObj);
        };
        Engine.removeTick = function (tick, thisObj) {
            Engine.ticklink.remove(tick, thisObj);
        };
        Engine.update = function (now, interval) {
            if (rf.isWindowResized) {
                rf.isWindowResized = false;
                rf.resizeStageSizeFunction(rf.windowWidth, rf.windowHeight);
            }
            Engine.ticklink.forEach(function (vo) {
                var tick = vo.data;
                tick.call(vo.thisObj, now, interval);
                return true;
            }, this);
        };
        Object.defineProperty(Engine, "frameRate", {
            get: function () {
                return Engine._frameRate;
            },
            set: function (value) {
                Engine._frameRate = value;
                rf.frameInterval = 1000 / value;
            },
            enumerable: true,
            configurable: true
        });
        Engine.profile = function () {
            var now = getTimer();
            var interval = now - Engine._nextProfileTime;
            Engine._fpsCount++;
            Engine._codeTime += now - rf.engineNow;
            if (interval > 0) {
                if (interval > 2000) {
                    Engine._nextProfileTime = now + 1000;
                }
                else {
                    Engine._nextProfileTime += 1000;
                }
                Engine.fps = Engine._fpsCount;
                Engine.code = Engine._codeTime;
                Engine._fpsCount = 0;
                Engine._codeTime = 0;
                if (typeof performance != "undefined") {
                    var memory = performance["memory"];
                    if (memory) {
                        Engine.memory = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
                    }
                }
                if (Engine.fpsHandler) {
                    Engine.fpsHandler();
                }
            }
        };
        Engine.startTime = 0;
        Engine.interval = 0;
        Engine.hidden = false;
        Engine.hiddenTime = 0;
        Engine.fps = 0;
        Engine.code = 0;
        Engine.ticklink = new rf.Link();
        Engine.resizeLink = new rf.Link();
        Engine._frameRate = 60;
        Engine._nextProfileTime = 0;
        Engine._fpsCount = 0;
        Engine._codeTime = 0;
        Engine.memory = 0;
        return Engine;
    }());
    rf.Engine = Engine;
    function getTimer() {
        return rf.engineNow + Date.now() - rf.lastUpdateDate;
    }
    rf.getTimer = getTimer;
    rf.getT = Date.now;
    function defaultResize(width, height) {
        rf.windowWidth = width;
        rf.windowHeight = height;
        var link = Engine.resizeLink;
        link.forEach(function (vo) {
            var data = vo.data, thisObj = vo.thisObj;
            data.call(thisObj, width, height);
            return true;
        }, this);
    }
    rf.defaultResize = defaultResize;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.ClientCheck = {
        isClientCheck: true
    };
    rf.errorPrefix = "";
    function getMsg(msg) {
        return new Date()["format"]("[yyyy-MM-dd HH:mm:ss]", true) + "[info:]" + msg;
    }
    rf.ThrowError = function (msg, err, alert) {
        msg = rf.errorPrefix + msg;
        msg += "%c";
        if (err) {
            msg += "\nError:\n[name]:" + err.name + ",[message]:" + err.message;
        }
        else {
            err = new Error();
        }
        msg += "\n[stack]:\n" + err.stack;
        console.log(msg, "color:red");
    };
})(rf || (rf = {}));
function zeroize(value, length) {
    if (length === void 0) { length = 2; }
    var str = "" + value;
    var zeros = "";
    for (var i = 0, len = length - str.length; i < len; i++) {
        zeros += "0";
    }
    return zeros + str;
}
function getDescriptor(descriptor, enumerable, writable, configurable) {
    if (enumerable === void 0) { enumerable = false; }
    if (writable === void 0) { writable = true; }
    if (configurable === void 0) { configurable = true; }
    if (!descriptor.set && !descriptor.get) {
        descriptor.writable = writable;
    }
    descriptor.configurable = configurable;
    descriptor.enumerable = enumerable;
    return descriptor;
}
function makeDefDescriptors(descriptors, enumerable, writable, configurable) {
    if (enumerable === void 0) { enumerable = false; }
    if (writable === void 0) { writable = true; }
    if (configurable === void 0) { configurable = true; }
    for (var key in descriptors) {
        var desc = descriptors[key];
        var enumer = desc.enumerable == undefined ? enumerable : desc.enumerable;
        var write = desc.writable == undefined ? writable : desc.writable;
        var config = desc.configurable == undefined ? configurable : desc.configurable;
        descriptors[key] = getDescriptor(desc, enumer, write, config);
    }
    return descriptors;
}
Object.defineProperties(Object.prototype, makeDefDescriptors({
    clone: {
        value: function () {
            var o = {};
            for (var n in this) {
                o[n] = this[n];
            }
            return o;
        }
    },
    getPropertyDescriptor: {
        value: function (property) {
            var data = Object.getOwnPropertyDescriptor(this, property);
            if (data) {
                return data;
            }
            var prototype = Object.getPrototypeOf(this);
            if (prototype) {
                return prototype.getPropertyDescriptor(property);
            }
        }
    },
    copyto: {
        value: function (to) {
            for (var p in this) {
                var data = to.getPropertyDescriptor(p);
                if (!data || (data.set || data.writable)) {
                    to[p] = this[p];
                }
            }
        }
    },
    equals: {
        value: function (checker) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!args.length) {
                args = Object.getOwnPropertyNames(checker);
            }
            for (var i = 0; i < args.length; i++) {
                var key = args[i];
                if (this[key] != checker[key]) {
                    return false;
                }
            }
            return true;
        }
    },
    copyWith: {
        value: function (to) {
            var proNames = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                proNames[_i - 1] = arguments[_i];
            }
            for (var i = 0; i < proNames.length; i++) {
                var p = proNames[i];
                if (p in this) {
                    to[p] = this[p];
                }
            }
        }
    },
    getSpecObject: {
        value: function () {
            var proNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                proNames[_i] = arguments[_i];
            }
            var obj = {};
            for (var i = 0; i < proNames.length; i++) {
                var p = proNames[i];
                if (p in this) {
                    if (this[p] != null) {
                        obj[p] = this[p];
                    }
                }
            }
            return obj;
        }
    }
}));
Object.defineProperties(Float32Array.prototype, makeDefDescriptors({
    x: {
        get: function () {
            return this[0];
        },
        set: function (value) {
            this[0] = value;
        }
    },
    y: {
        get: function () {
            return this[1];
        },
        set: function (value) {
            this[1] = value;
        }
    },
    z: {
        get: function () {
            return this[2];
        },
        set: function (value) {
            this[2] = value;
        }
    },
    w: {
        get: function () {
            return this[3];
        },
        set: function (value) {
            this[3] = value;
        }
    },
    update: {
        value: function (data32PerVertex, offset, v) {
            var len = this.length;
            for (var i = 0; i < len; i += data32PerVertex) {
                this[i + offset] = v;
            }
        }
    },
    wPoint1: {
        value: function (position, x, y, z, w) {
            this[position] = x;
        }
    },
    wPoint2: {
        value: function (position, x, y, z, w) {
            this[position] = x;
            this[position + 1] = y;
        }
    },
    wPoint3: {
        value: function (position, x, y, z, w) {
            this[position] = x;
            this[position + 1] = y;
            this[position + 2] = z;
        }
    },
    wPoint4: {
        value: function (position, x, y, z, w) {
            this[position] = x;
            this[position + 1] = y;
            this[position + 2] = z;
            this[position + 3] = w;
        }
    },
    clone: {
        value: function () {
            return new Float32Array(this);
        }
    }
}));
Object.defineProperties(Function.prototype, makeDefDescriptors({
    isSubClass: {
        value: function (testBase) {
            if (typeof testBase !== "function") {
                return false;
            }
            var base = this.prototype;
            var flag = false;
            while (base !== null && base !== Object) {
                if (base === testBase) {
                    flag = true;
                    break;
                }
                base = base.prototype;
            }
            return true;
        }
    }
}));
Math.DEG_TO_RAD = Math.PI / 180;
Math.RAD_TO_DEG = 180 / Math.PI;
Math.PI2 = 2 * Math.PI;
Math.PI_1_2 = Math.PI * .5;
Math.clamp = function (value, min, max) {
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    return value;
};
Math.random2 = function (min, max) {
    return min + Math.random() * (max - min);
};
Math.random3 = function (center, delta) {
    return center - delta + Math.random() * 2 * delta;
};
if (!Number.isSafeInteger) {
    Number.isSafeInteger = function (value) { return value < 9007199254740991 && value >= -9007199254740991; };
}
Object.defineProperties(Number.prototype, makeDefDescriptors({
    zeroize: getDescriptor({
        value: function (length) { return zeroize(this, length); }
    }),
    between: getDescriptor({
        value: function (min, max) { return min <= this && max >= this; }
    })
}));
Object.defineProperties(String.prototype, makeDefDescriptors({
    zeroize: {
        value: function (length) { return zeroize(this, length); },
    },
    trim: {
        value: function () {
            return this.replace(/(^[\s\t\f\r\n\u3000\ue79c ]*)|([\s\t\f\r\n\u3000\ue79c ]*$)/g, "");
        }
    },
    substitute: {
        value: function () {
            var len = arguments.length;
            if (len > 0) {
                var obj_1;
                if (len == 1) {
                    obj_1 = arguments[0];
                    if (typeof obj_1 !== "object") {
                        obj_1 = arguments;
                    }
                }
                else {
                    obj_1 = arguments;
                }
                if ((obj_1 instanceof Object) && !(obj_1 instanceof RegExp)) {
                    return this.replace(/\{(?:%([^{}]+)%)?([^{}]+)\}/g, function (match, handler, key) {
                        var value = obj_1[key];
                        if (handler) {
                            var func = String.subHandler[handler];
                            if (func) {
                                value = func(value);
                            }
                        }
                        return (value !== undefined) ? '' + value : match;
                    });
                }
            }
            return this.toString();
        }
    },
    hash: {
        value: function () {
            var len = this.length;
            var hash = 5381;
            for (var i = 0; i < len; i++) {
                hash += (hash << 5) + this.charCodeAt(i);
            }
            return hash & 0xffffffff;
        }
    },
    trueLength: {
        value: function () {
            var arr = this.match(/[\u2E80-\u9FBF]/ig);
            return this.length + (arr ? arr.length : 0);
        }
    }
}));
String.zeroize = zeroize;
String.subHandler = {};
String.regSubHandler = function (key, handler) {
    this.subHandler[key] = handler;
};
Object.defineProperties(Date.prototype, makeDefDescriptors({
    format: {
        value: function (mask, local) {
            var d = this;
            return mask.replace(/"[^"]*"|'[^']*'|(?:d{1,2}|m{1,2}|yy(?:yy)?|([hHMs])\1?)/g, function ($0) {
                switch ($0) {
                    case "d": return gd();
                    case "dd": return zeroize(gd());
                    case "M": return gM() + 1;
                    case "MM": return zeroize(gM() + 1);
                    case "yy": return (gy() + "").substr(2);
                    case "yyyy": return gy();
                    case "h": return gH() % 12 || 12;
                    case "hh": return zeroize(gH() % 12 || 12);
                    case "H": return gH();
                    case "HH": return zeroize(gH());
                    case "m": return gm();
                    case "mm": return zeroize(gm());
                    case "s": return gs();
                    case "ss": return zeroize(gs());
                    default: return $0.substr(1, $0.length - 2);
                }
            });
            function gd() { return local ? d.getDate() : d.getUTCDate(); }
            function gM() { return local ? d.getMonth() : d.getUTCMonth(); }
            function gy() { return local ? d.getFullYear() : d.getUTCFullYear(); }
            function gH() { return local ? d.getHours() : d.getUTCHours(); }
            function gm() { return local ? d.getMinutes() : d.getUTCMinutes(); }
            function gs() { return local ? d.getSeconds() : d.getUTCSeconds(); }
        }
    }
}));
Array.binaryInsert = function (partArr, item, filter) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var right = partArr.length - 1;
    var left = 0;
    while (left <= right) {
        var middle = (left + right) >> 1;
        var test = partArr[middle];
        if (filter.apply(void 0, __spreadArrays([test], args))) {
            right = middle - 1;
        }
        else {
            left = middle + 1;
        }
    }
    partArr.splice(left, 0, item);
};
Array.SORT_DEFAULT = {
    number: 0,
    string: "",
    boolean: false
};
Object.freeze(Array.SORT_DEFAULT);
Object.defineProperties(Array.prototype, makeDefDescriptors({
    cloneTo: {
        value: function (b) {
            b.length = this.length;
            var len = this.length;
            b.length = len;
            for (var i = 0; i < len; i++) {
                b[i] = this[i];
            }
        }
    },
    appendTo: {
        value: function (b) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                b.push(this[i]);
            }
        }
    },
    pushOnce: {
        value: function (t) {
            var idx = this.indexOf(t);
            if (!~idx) {
                idx = this.length;
                this[idx] = t;
            }
            return idx;
        }
    },
    remove: {
        value: function (t) {
            var idx = this.indexOf(t);
            if (~idx) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        },
        writable: true
    },
    doSort: {
        value: function () {
            var key, descend;
            var len = arguments.length;
            for (var i = 0; i < len; i++) {
                var arg = arguments[i];
                var t = typeof arg;
                if (t === "string") {
                    key = arg;
                }
                else {
                    descend = !!arg;
                }
            }
            if (key) {
                return this.sort(function (a, b) { return descend ? b[key] - a[key] : a[key] - b[key]; });
            }
            else {
                return this.sort(function (a, b) { return descend ? b - a : a - b; });
            }
        }
    },
    multiSort: {
        value: function (kArr, dArr) {
            var isArr = Array.isArray(dArr);
            return this.sort(function (a, b) {
                var def = Array.SORT_DEFAULT;
                for (var idx = 0, len = kArr.length; idx < len; idx++) {
                    var key = kArr[idx];
                    var mode = isArr ? !!dArr[idx] : !!dArr;
                    var av = a[key];
                    var bv = b[key];
                    var typea = typeof av;
                    var typeb = typeof bv;
                    if (typea == "object" || typeb == "object") {
                        return 0;
                    }
                    else if (typea != typeb) {
                        if (typea == "undefined") {
                            bv = def[typeb];
                        }
                        else if (typeb == "undefined") {
                            av = def[typea];
                        }
                        else {
                            return 0;
                        }
                    }
                    if (av < bv) {
                        return mode ? 1 : -1;
                    }
                    else if (av > bv) {
                        return mode ? -1 : 1;
                    }
                    else {
                        continue;
                    }
                }
                return 0;
            });
        }
    }
}));
var rf;
(function (rf) {
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    rf.getQualifiedClassName = getQualifiedClassName;
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    rf.getQualifiedSuperclassName = getQualifiedSuperclassName;
    function is(instance, ref) {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var prototype = Object.getPrototypeOf(instance);
        var types = prototype ? prototype.__types__ : null;
        if (!types) {
            return false;
        }
        return (types.indexOf(getQualifiedClassName(ref)) !== -1);
    }
    rf.is = is;
    function toString(instance, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        if (!instance) {
            return defaultValue;
        }
    }
    rf.toString = toString;
    function clone(from, to) {
        if (!to) {
            to = {};
        }
        for (var key in from) {
            to[key] = from[key];
        }
        return to;
    }
    rf.clone = clone;
    function properties(target, key) {
        var old = target[key];
        Object.defineProperty(target, key, {
            get: function () {
                return old;
            },
            set: function (value) {
                old = value;
            },
            configurable: true,
            enumerable: true
        });
    }
    rf.properties = properties;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TFile = (function () {
        function TFile(path) {
            this.nativePath = path = path.replace(/\\/g, "/");
            if (this.exists == true) {
                this.states = rf.fs.statSync(this.nativePath);
                if (this.isFile() == false) {
                    if (path[path.length - 1] != "/") {
                        this.nativePath = path + "/";
                    }
                }
            }
        }
        TFile.init = function () {
            rf.fs = rf.getFileSystemManager();
        };
        TFile.prototype.join = function (f, t) {
            var bf = f;
            var bt = t;
            if (f.lastIndexOf(".") != -1) {
                f = f.slice(0, f.lastIndexOf("/") + 1);
            }
            t = t.replace(/\\/g, "/");
            var i;
            while (true) {
                i = t.indexOf("../");
                if (i != -1) {
                    f = f.slice(0, f.lastIndexOf("/", f.length - 2) + 1);
                    t = t.replace("../", "");
                }
                else {
                    break;
                }
            }
            t = t.replace(/\.\//g, "");
            return f + t;
        };
        Object.defineProperty(TFile.prototype, "name", {
            get: function () {
                var _name = this.nativePath;
                _name = _name.slice(_name.lastIndexOf("/", _name.length - 2)).replace(/\//g, "");
                return _name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TFile.prototype, "extname", {
            get: function () {
                var _name = this.nativePath;
                return _name.slice(_name.lastIndexOf(".")).toLocaleLowerCase();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TFile.prototype, "exists", {
            get: function () {
                if (!rf.fs) {
                    return false;
                }
                rf.fs.accessSync(this.nativePath);
            },
            enumerable: true,
            configurable: true
        });
        TFile.prototype.isFile = function () {
            if (!rf.fs) {
                return false;
            }
            return this.states.isFile();
        };
        TFile.prototype.isDirectory = function () {
            if (!rf.fs) {
                return false;
            }
            return this.states.isDirectory();
        };
        Object.defineProperty(TFile.prototype, "parent", {
            get: function () {
                var nativePath = this.nativePath;
                var i = nativePath.lastIndexOf("/", nativePath.length - 2);
                if (i == -1) {
                    return undefined;
                }
                nativePath = nativePath.slice(0, i);
                return new TFile(nativePath);
            },
            enumerable: true,
            configurable: true
        });
        TFile.prototype.read = function () {
            return undefined;
        };
        TFile.prototype.readUTF8 = function (type) {
            if (type === void 0) { type = "utf8"; }
            return undefined;
        };
        TFile.prototype.mkdir = function (path) {
            if (this.exists == false) {
                this.parent.mkdir(this.name);
            }
        };
        TFile.prototype.write = function (buf) {
        };
        TFile.prototype.writeUTF8 = function (value) {
        };
        TFile.prototype.copyto = function (to) {
        };
        TFile.prototype.moveto = function (to) {
        };
        TFile.prototype.getDirectoryListing = function () {
            return undefined;
        };
        TFile.prototype.resolvePath = function (path) {
            var f;
            if (this.isFile() == true) {
                f = this.parent;
            }
            else {
                f = this;
            }
            if (path.indexOf(":/") != -1) {
                return new TFile(path);
            }
            return new TFile(this.join(f.nativePath, path));
        };
        TFile.prototype.getAllFiles = function () {
            return undefined;
        };
        return TFile;
    }());
    rf.TFile = TFile;
    rf.FILE_ROOT = undefined;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var guids = {};
    function getGuid(key) {
        var n = guids[key];
        if (n === undefined) {
            n = 0;
        }
        guids[key] = ++n;
        return n;
    }
    rf.getGuid = getGuid;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var EventX = (function (_super) {
        __extends(EventX, _super);
        function EventX(type, data, bubbles) {
            var _this = _super.call(this) || this;
            _this.type = undefined;
            _this.type = type;
            _this.data = data;
            _this.bubbles = bubbles;
            return _this;
        }
        EventX.TEMP = new EventX();
        __decorate([
            rf.RecyclePro(undefined)
        ], EventX.prototype, "data", void 0);
        __decorate([
            rf.RecyclePro(false)
        ], EventX.prototype, "bubbles", void 0);
        __decorate([
            rf.RecyclePro(undefined)
        ], EventX.prototype, "target", void 0);
        __decorate([
            rf.RecyclePro(undefined)
        ], EventX.prototype, "currentTarget", void 0);
        __decorate([
            rf.RecyclePro(false)
        ], EventX.prototype, "stopPropagation", void 0);
        __decorate([
            rf.RecyclePro(false)
        ], EventX.prototype, "stopImmediatePropagation", void 0);
        return EventX;
    }(rf.RecycleObject));
    rf.EventX = EventX;
    var MiniDispatcher = (function (_super) {
        __extends(MiniDispatcher, _super);
        function MiniDispatcher(target) {
            if (target === void 0) { target = null; }
            var _this = _super.call(this) || this;
            _this.addEventListener = _this.on;
            _this.removeEventListener = _this.off;
            _this.hasEventListener = _this.has;
            if (target == null) {
                target = _this;
            }
            _this.mTarget = target;
            return _this;
        }
        MiniDispatcher.prototype.on = function (type, listener, thisObject, priority, ones) {
            if (priority === void 0) { priority = 0; }
            if (ones === void 0) { ones = false; }
            if (undefined == this.mEventListeners) {
                this.mEventListeners = {};
            }
            var signal = this.mEventListeners[type];
            if (signal == null) {
                signal = this.mEventListeners[type] = rf.recyclable(rf.Link);
            }
            signal.addByWeight(listener, priority, thisObject).ones = ones;
        };
        MiniDispatcher.prototype.off = function (type, listener, thisObject) {
            if (undefined != this.mEventListeners) {
                var signal = this.mEventListeners[type];
                if (undefined == signal)
                    return;
                signal.remove(listener, thisObject);
            }
        };
        MiniDispatcher.prototype.removeEventListeners = function (type, self) {
            if (type === void 0) { type = undefined; }
            if (self === void 0) { self = true; }
            var signal;
            if (type && this.mEventListeners) {
                signal = this.mEventListeners[type];
                if (signal) {
                    signal.recycle();
                    this.mEventListeners[type] = undefined;
                }
                delete this.mEventListeners[type];
            }
            else if (this.mEventListeners) {
                for (type in this.mEventListeners) {
                    signal = this.mEventListeners[type];
                    if (signal) {
                        signal.recycle();
                        this.mEventListeners[type] = undefined;
                    }
                }
                this.mEventListeners = undefined;
            }
        };
        MiniDispatcher.prototype.dispatchEvent = function (event) {
            var mEventListeners = this.mEventListeners;
            if (!mEventListeners || !mEventListeners[event.type]) {
                return false;
            }
            event.currentTarget = this.mTarget;
            var signal = mEventListeners[event.type];
            signal.forEach(function (vo) {
                if (!event.stopPropagation && !event.stopImmediatePropagation) {
                    var f = vo.data;
                    if (undefined != f) {
                        f.call(vo.thisObj, event);
                    }
                    if (vo.ones) {
                        vo.close = true;
                    }
                    return true;
                }
                return false;
            }, this);
            return false == event.stopPropagation;
        };
        MiniDispatcher.prototype.simpleDispatch = function (type, data, bubbles) {
            if (data === void 0) { data = undefined; }
            if (bubbles === void 0) { bubbles = false; }
            if (!bubbles && (undefined == this.mEventListeners || undefined == this.mEventListeners[type])) {
                return false;
            }
            var event = rf.recyclable(EventX);
            event.type = type;
            event.data = data;
            event.bubbles = bubbles;
            event.target = this.mTarget;
            var bool = this.dispatchEvent(event);
            event.recycle();
            return bool;
        };
        MiniDispatcher.prototype.has = function (type) {
            if (undefined == this.mEventListeners) {
                return false;
            }
            var signal = this.mEventListeners[type];
            if (undefined == signal || 0 >= signal.__length) {
                return false;
            }
            return true;
        };
        MiniDispatcher.prototype.onRecycle = function () {
            this.removeEventListeners();
            _super.prototype.onRecycle.call(this);
        };
        return MiniDispatcher;
    }(rf.RecycleObject));
    rf.MiniDispatcher = MiniDispatcher;
    var InterestEventDispatcher = (function (_super) {
        __extends(InterestEventDispatcher, _super);
        function InterestEventDispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InterestEventDispatcher.prototype.registerEvent = function (events, thisobj) {
            var _this = this;
            rf.forarr(events, function (v, i, o) {
                _this.on(v.k, v.v, thisobj);
                return true;
            });
        };
        InterestEventDispatcher.prototype.removeEvent = function (events, thisobj) {
            var _this = this;
            rf.forarr(events, function (v, i, o) {
                _this.off(v.k, v.v, thisobj);
                return true;
            });
        };
        return InterestEventDispatcher;
    }(MiniDispatcher));
    rf.InterestEventDispatcher = InterestEventDispatcher;
    rf.interest = new InterestEventDispatcher();
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.HTTP_REPOSITORY = {};
    rf.http_load_debug = false;
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader(perfix, url, dataType, method) {
            if (dataType === void 0) { dataType = "arraybuffer"; }
            if (method === void 0) { method = "GET"; }
            var _this = _super.call(this) || this;
            _this.status = 0;
            _this.priority = 0;
            _this.queue = false;
            rf.HTTP_REPOSITORY[url] = _this;
            var option;
            _this.option = option = {};
            _this.url = url;
            _this.perfix = perfix;
            url = url.replace(perfix, "");
            if (rf.http_hash) {
                var hashurl = rf.http_hash[url];
                if (hashurl) {
                    url = hashurl;
                }
            }
            option.url = perfix + url;
            option.responseType = dataType;
            option.method = method;
            _this.initOption(option);
            _this.requstTimes = 0;
            _this.completeLink = new rf.Link();
            return _this;
        }
        Loader.prototype.initOption = function (option) {
        };
        Loader.prototype.load = function () {
            var option = this.option;
            if (option.method == "GET") {
                if (rf.FILE_ROOT) {
                    return;
                }
            }
            this.loadUseTime = rf.engineNow;
            this.status = 1;
            this.doLoad(option);
        };
        Loader.prototype.doLoad = function (option) {
            option.complete = this.preComplete.bind(this);
            rf.request(option);
            if (rf.http_load_debug) {
                console.log("load res " + option.url);
            }
        };
        Loader.prototype.complete = function (res) {
            this.data = res.data;
            var statusCode = res.statusCode, data = res.data;
            var event = rf.EventX.TEMP;
            event.currentTarget = this;
            if (!statusCode || statusCode >= 400) {
                this.status = 3;
                event.type = 3;
                event.data = undefined;
                console.log("loadError " + this.perfix + " " + this.url);
            }
            else {
                this.status = 2;
                this.lastActiveTime = rf.engineNow;
                event.type = 4;
                event.data = data;
            }
            var completeLink = this.completeLink;
            completeLink.forEach(function (vo) {
                var data = vo.data, thisObj = vo.thisObj;
                data.call(thisObj, event);
                vo.close = true;
                return true;
            }, this);
            completeLink.clean();
            this.dispatchEvent(event);
        };
        Loader.prototype.getFileByteLength = function (data) {
            if (data instanceof ArrayBuffer) {
                return data.byteLength;
            }
            else if (typeof data == "string") {
                return data.length;
            }
            return 0;
        };
        Loader.prototype.preComplete = function (res) {
            this.loadUseTime = rf.engineNow - this.loadUseTime;
            var data = res.data, statusCode = res.statusCode;
            if (statusCode == 200) {
                this.byte = this.getFileByteLength(data);
                this.data = res.data = this.formatData(data);
            }
            this.complete(res);
        };
        Loader.prototype.formatData = function (data) {
            return data;
        };
        return Loader;
    }(rf.MiniDispatcher));
    rf.Loader = Loader;
    var AMFLoader = (function (_super) {
        __extends(AMFLoader, _super);
        function AMFLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AMFLoader.prototype.formatData = function (data) {
            if (data instanceof ArrayBuffer) {
                if (this.inflate) {
                    data = rf.byte_inflate(new Uint8Array(data)).buffer;
                }
                return rf.amf_readObject(data);
            }
            return undefined;
        };
        return AMFLoader;
    }(Loader));
    rf.AMFLoader = AMFLoader;
    var JSonLoader = (function (_super) {
        __extends(JSonLoader, _super);
        function JSonLoader(perfix, url, dataType, method) {
            if (dataType === void 0) { dataType = "arraybuffer"; }
            if (method === void 0) { method = "GET"; }
            return _super.call(this, perfix, url, "text", method) || this;
        }
        JSonLoader.prototype.formatData = function (data) {
            try {
                return JSON.parse(data);
            }
            catch (error) {
            }
            return data;
        };
        return JSonLoader;
    }(Loader));
    rf.JSonLoader = JSonLoader;
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageLoader.prototype.doLoad = function (option) {
            var image = rf.createImage();
            image.crossOrigin = "Anonymous";
            image.onload = this.onLoaded.bind(this);
            image.onerror = this.onerror.bind(this);
            image.src = option.url;
            this.image = image;
        };
        ImageLoader.prototype.getFileByteLength = function (data) {
            return data.width * data.height * 4;
        };
        ImageLoader.prototype.onLoaded = function (e) {
            var data = this.image;
            var statusCode = 200;
            this.preComplete({ data: data, statusCode: statusCode });
        };
        ImageLoader.prototype.onerror = function (e) {
            var data = this.image;
            var statusCode = 404;
            this.preComplete({ data: data, statusCode: statusCode });
        };
        return ImageLoader;
    }(Loader));
    rf.ImageLoader = ImageLoader;
    rf.http_res_max_loader = 5;
    rf.http_current_loader_count = 0;
    rf.http_load_Link = new rf.Link();
    rf.http_loader = {};
    function setHttpHash(o) {
        var prefix = "";
        var hashs = rf.http_hash = {};
        function parserhash(prefix, hash) {
            rf.foreach(hash, function (v, k) {
                if (typeof v === "string") {
                    if (v.charAt(0) != "/") {
                        hashs[prefix + k] = prefix + v;
                    }
                    else {
                        hashs[prefix + k] = v;
                    }
                }
                else {
                    parserhash("" + prefix + k + "/", v);
                }
                return true;
            });
        }
        parserhash(prefix, o);
    }
    rf.setHttpHash = setHttpHash;
    function loadRes(perfix, url, complete, thisObj, type, priority, disposeTime) {
        if (priority === void 0) { priority = 0; }
        if (disposeTime === void 0) { disposeTime = 30000; }
        if (!url) {
            console.warn("request url is empty!");
            return;
        }
        var loader = rf.HTTP_REPOSITORY[url];
        if (!loader) {
            var CLS = void 0;
            if (undefined == type) {
                CLS = Loader;
            }
            else {
                if (typeof type == "number") {
                    CLS = rf.http_loader[type];
                }
                else {
                    CLS = type;
                }
            }
            if (CLS) {
                loader = new CLS(perfix, url);
            }
            else {
                switch (type) {
                    case 0:
                        loader = new Loader(perfix, url);
                        break;
                    case 3:
                        loader = new Loader(perfix, url, "text");
                        break;
                    case 1:
                        loader = new AMFLoader(perfix, url);
                        break;
                    case 2:
                        loader = new AMFLoader(perfix, url);
                        loader.inflate = true;
                        break;
                    case 5:
                        loader = new ImageLoader(perfix, url);
                }
            }
            loader.completeLink.add(complete, thisObj);
            rf.http_load_Link.addByWeight(loader, priority);
            if (rf.http_load_Link.lock == false) {
                if (rf.http_current_loader_count < rf.http_res_max_loader) {
                    http_load_continue();
                }
            }
        }
        else {
            switch (loader.status) {
                case 0:
                    rf.http_load_Link.addByWeight(loader, priority);
                    if (rf.http_load_Link.lock == false) {
                        if (rf.http_current_loader_count < rf.http_res_max_loader) {
                            http_load_continue();
                        }
                    }
                case 1:
                    loader.completeLink.add(complete, thisObj);
                    break;
                case 2:
                    setTimeout(function () {
                        var e = rf.EventX.TEMP;
                        e.type = 4;
                        e.data = loader.data;
                        e.currentTarget = loader;
                        complete.call(thisObj, e);
                    }, 20);
                    break;
            }
        }
        loader.requstTimes++;
        return loader;
    }
    rf.loadRes = loadRes;
    function http_load_continue(e) {
        var _this = this;
        var link = rf.http_load_Link;
        var max = rf.http_res_max_loader;
        var current = rf.http_current_loader_count;
        if (e) {
            current--;
        }
        link.forEach(function (vo) {
            if (current < max) {
                var loader = vo.data;
                if (loader) {
                    loader.completeLink.add(http_load_continue, _this);
                    if (loader.status == 0) {
                        loader.load();
                    }
                    else {
                        console.log("???");
                    }
                    current++;
                    link.removeLink(vo);
                }
            }
            else {
                return false;
            }
            return true;
        }, this);
        rf.http_current_loader_count = current;
        if (link.__length > 0 && current < max) {
            http_load_continue();
        }
    }
    rf.http_load_continue = http_load_continue;
    function getFullUrl(url, extension) {
        if (!url)
            return url;
        if (extension && url.lastIndexOf(extension) == -1) {
            url += extension;
        }
        return url;
    }
    rf.getFullUrl = getFullUrl;
    var LoadTask = (function (_super) {
        __extends(LoadTask, _super);
        function LoadTask() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.queue = {};
            _this.total = 0;
            _this.completeCount = 0;
            _this.progress = 0;
            return _this;
        }
        LoadTask.prototype.add = function (perfix, url, type, complete, thisObj) {
            var res = rf.HTTP_REPOSITORY[url];
            if (!res || res.status != 2) {
                res = loadRes(perfix, url, this.complteHandler, this, type);
                if (undefined != complete) {
                    res.completeLink.addByWeight(complete, 1, thisObj);
                }
            }
            this.queue[url] = res;
            this.total++;
            return res;
        };
        LoadTask.prototype.addTask = function (item) {
            if (item.status != 2) {
                item.on(4, this.complteHandler, this);
                item.on(3, this.complteHandler, this);
            }
            this.queue[item.name] = item;
            this.total++;
        };
        LoadTask.prototype.complteHandler = function (event) {
            var item = event.currentTarget;
            if (item instanceof rf.MiniDispatcher) {
                item.off(4, this.complteHandler, this);
                item.off(3, this.complteHandler, this);
            }
            var completed = this.checkComplete();
            this.simpleDispatch(19, this);
            if (completed) {
                this.simpleDispatch(4, this);
            }
        };
        LoadTask.prototype.checkComplete = function () {
            var queue = this.queue;
            var count = 0;
            var completeCount = 0;
            var totalCount = 0;
            for (var key in queue) {
                var item = queue[key];
                if (item.status >= 2) {
                    count++;
                    if (item.status == 2) {
                        completeCount++;
                    }
                }
                totalCount++;
            }
            this.progress = count;
            this.total = totalCount;
            this.completeCount = completeCount;
            return count == totalCount;
        };
        LoadTask.prototype.load = function () {
            if (this.checkComplete()) {
                this.simpleDispatch(4, this);
            }
        };
        LoadTask.prototype.onRecycle = function () {
            this.queue = {};
            this.progress = this.total = 0;
        };
        return LoadTask;
    }(rf.MiniDispatcher));
    rf.LoadTask = LoadTask;
    function http_gc(now) {
    }
    rf.http_gc = http_gc;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Int64 = (function () {
        function Int64(low, high) {
            this.low = low | 0;
            this.high = high | 0;
        }
        Int64.prototype.toNumber = function () {
            return this.high * _2_32 + (this.low >>> 0);
        };
        Int64.toNumber = function (low, high) {
            return (high | 0) * _2_32 + (low >>> 0);
        };
        Int64.fromNumber = function (value) {
            if (isNaN(value) || !isFinite(value)) {
                return ZERO;
            }
            if (value <= -_2_63) {
                return MIN_VALUE;
            }
            if (value + 1 >= _2_63) {
                return MAX_VALUE;
            }
            if (value < 0) {
                var v = Int64.fromNumber(-value);
                if (v.high === MIN_VALUE.high && v.low === MIN_VALUE.low) {
                    return MIN_VALUE;
                }
                v.low = ~v.low;
                v.high = ~v.high;
                return v.add(ONE);
            }
            else {
                return new Int64((value % _2_32) | 0, (value / _2_32) | 0);
            }
        };
        Int64.prototype.add = function (addend) {
            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;
            var b48 = addend.high >>> 16;
            var b32 = addend.high & 0xFFFF;
            var b16 = addend.low >>> 16;
            var b00 = addend.low & 0xFFFF;
            var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
            c00 += a00 + b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 + b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 + b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 + b48;
            c48 &= 0xFFFF;
            return new Int64((c16 << 16) | c00, (c48 << 16) | c32);
        };
        return Int64;
    }());
    rf.Int64 = Int64;
    var _2_16 = 1 << 16;
    var _2_32 = _2_16 * _2_16;
    var _2_64 = _2_32 * _2_32;
    var _2_63 = _2_64 / 2;
    var ZERO = new Int64();
    var MAX_VALUE = new Int64(-1, 0x7FFFFFFF);
    var MIN_VALUE = new Int64(0, -2147483648);
    var ONE = new Int64(1);
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PBMessage = (function () {
        function PBMessage() {
        }
        PBMessage.writeMessage = function (msg, type, side) {
            if (side === void 0) { side = "s"; }
            var dic = PBMessage.StructByName[type];
            if (!dic) {
                return null;
            }
            var decodes = dic[side];
            if (!decodes) {
                return null;
            }
            var amf;
            var b = false;
            for (var index in decodes) {
                var id = +index;
                var body = decodes[id];
                var name_1 = body[0];
                var label = body[1];
                if (label == 1 && !(name_1 in msg)) {
                    continue;
                }
                var value = msg[name_1];
                if (value == undefined || value === body[4]) {
                    if (label == 2) {
                        var tips = type + "." + name_1 + " is required!!";
                        if (this.ThrowErrorEnabled) {
                            throw new Error(tips);
                        }
                        else {
                            var e = new Error(tips);
                            console.error(e.stack);
                        }
                    }
                    continue;
                }
                if (amf == null) {
                    amf = new rf.AMF3Encode();
                }
                var wireType = this.type2WireType(body[2]);
                var subMsgType = body[3];
                var isList = label == 3 ? 1 : 0;
                var tag = (id << 4) | (isList << 3) | wireType;
                amf.write29(tag, true);
                if (label == 3) {
                    amf.write29(value.length, true);
                    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                        var item = value_1[_i];
                        this.writeElement(item, wireType, side, amf, subMsgType);
                    }
                }
                else {
                    this.writeElement(value, wireType, side, amf, subMsgType);
                }
            }
            return amf;
        };
        PBMessage.writeElement = function (value, wireType, side, amf, subMsgType) {
            if (side === void 0) { side = "s"; }
            switch (wireType) {
                case 0:
                    amf.writeInt(value);
                    break;
                case 1:
                    amf.writeDouble(value);
                    break;
                case 2:
                    amf.writeString(value);
                    break;
                case 3:
                    var message = this.writeMessage(value, subMsgType, "dto");
                    if (message) {
                        var bytes = message.toUint8Array();
                        amf.write29(bytes.length, true);
                        amf.writeByteArray(bytes);
                    }
                    else {
                        amf.write29(0, true);
                    }
                    break;
                case 4:
                    amf.writeObject(value);
                    break;
                case 5:
                    value = amf.writeFloat(value);
                    break;
                default:
                    amf.writeObject(value);
                    break;
            }
        };
        PBMessage.readMessage = function (amf, type, side, len) {
            if (side === void 0) { side = "c"; }
            var dic = PBMessage.StructByName[type];
            if (!dic) {
                rf.ThrowError("read:<<<<<" + type + " is empty");
                return null;
            }
            var encodes = dic[side];
            if (!encodes) {
                rf.ThrowError("read:<<<<<" + type + " is empty");
                return null;
            }
            var msg = {};
            for (var id in encodes) {
                var body = encodes[id];
                if (4 in body) {
                    var key = body[0];
                    msg[key] = body[4];
                }
            }
            var messageEndPos = amf.position + len;
            while (amf.position < messageEndPos) {
                var tag = amf.read29(true);
                var id = tag >>> 4;
                var isList = tag & 8;
                var wireType = tag & 7;
                var body = encodes[id];
                var name_2 = void 0;
                var subMsgType = void 0;
                if (!body) {
                    name_2 = id + "";
                    console.error("\u8BFB\u53D6\u6D88\u606F\u7C7B\u578B\u4E3A:" + type + "\uFF0C\u627E\u4E0D\u5230\u7D22\u5F15:" + id);
                }
                else {
                    name_2 = body[0];
                    subMsgType = body[3];
                }
                var listLen = 1;
                if (isList) {
                    listLen = amf.read29(true);
                    var arr = msg[name_2];
                    if (!arr)
                        msg[name_2] = arr = [];
                }
                for (var i = 0; i < listLen; i++) {
                    var value = void 0;
                    switch (wireType) {
                        case 0:
                            value = amf.readInt();
                            break;
                        case 1:
                            value = amf.readDouble();
                            break;
                        case 2:
                            value = amf.readString();
                            break;
                        case 3:
                            var len_1 = amf.read29(true);
                            if (len_1 > 0) {
                                value = this.readMessage(amf, subMsgType, "dto", len_1);
                            }
                            break;
                        case 4:
                            value = amf.readObject();
                            break;
                        case 5:
                            value = amf.readFloat();
                            break;
                        default:
                            value = amf.readObject();
                            break;
                    }
                    if (isList) {
                        msg[name_2].push(value);
                    }
                    else {
                        msg[name_2] = value;
                    }
                }
            }
            return msg;
        };
        PBMessage.type2WireType = function (type) {
            switch (type) {
                case 5:
                case 17:
                case 14:
                case 13:
                case 3:
                case 18:
                case 4:
                case 8:
                    return 0;
                case 1:
                case 6:
                case 16:
                    return 1;
                case 9:
                    return 2;
                case 11:
                    return 3;
                case 10:
                case 12:
                    return 4;
                case 7:
                case 15:
                case 2:
                    return 5;
            }
            return -1;
        };
        PBMessage.Enabled = false;
        PBMessage.ThrowErrorEnabled = true;
        PBMessage.StructByName = {};
        return PBMessage;
    }());
    rf.PBMessage = PBMessage;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var StreamX = (function (_super) {
        __extends(StreamX, _super);
        function StreamX() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StreamX.prototype.toObject = function (v, pros, to) {
            var n = v.length;
            if (!to) {
                to = {};
            }
            for (var i = 0; i < n; i++) {
                to[pros[i]] = v[i];
            }
            return to;
        };
        __decorate([
            rf.RecyclePro(undefined)
        ], StreamX.prototype, "data", void 0);
        __decorate([
            rf.RecyclePro(0)
        ], StreamX.prototype, "len", void 0);
        return StreamX;
    }(rf.EventX));
    rf.StreamX = StreamX;
    rf.socketDispatcher = new rf.InterestEventDispatcher();
    function SOCKET_EVT() {
        var evt = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            evt[_i] = arguments[_i];
        }
        return function (classPrototype, propertyKey, descriptor) {
            var map = classPrototype.socketEventInterests;
            if (!map) {
                classPrototype.socketEventInterests = map = [];
            }
            var v = descriptor.value;
            for (var i = 0; i < evt.length; i++) {
                map.push({ k: evt[i], v: v });
            }
        };
    }
    rf.SOCKET_EVT = SOCKET_EVT;
    var Socket = (function (_super) {
        __extends(Socket, _super);
        function Socket() {
            var _this = _super.call(this) || this;
            _this.connected = false;
            _this.socketoption = {};
            _this.sendOption = {};
            _this.status = 0;
            _this.connectInfo = { url: "" };
            _this.timeout = 3000;
            _this.connectTimes = 0;
            _this.nextConnectTime = 0;
            _this.socketTaskId = -1;
            _this.registerEvent(_this.eventInterests, _this);
            return _this;
        }
        Socket.prototype.connect = function (url) {
            this.socketTaskId = -1;
            this.connected = false;
            var _a = this, connectInfo = _a.connectInfo, timeout = _a.timeout;
            connectInfo.url = url;
            this.socket = rf.connectSocket(connectInfo);
            this.socket.onOpen(this.onOpen.bind(this));
            this.socket.onMessage(this.onMessage.bind(this));
            this.socket.onClose(this.onClose.bind(this));
            this.socket.onError(this.onError.bind(this));
            this.status = 1;
            if (timeout > 0) {
                rf.callLater.remove(this.connectTimeOut, this);
                rf.callLater.later(this.connectTimeOut, this, timeout);
            }
        };
        Socket.prototype.connectTimeOut = function () {
            rf.callLater.remove(this.connectTimeOut, this);
            this.close("TIME_OUT");
        };
        Socket.prototype.reconnect = function () {
            var nextConnectTime = this.nextConnectTime;
            return;
            var now = Date.now();
            if (now > nextConnectTime) {
                var connectInfo = this.connectInfo;
                this.connect(connectInfo.url);
            }
            else {
                rf.callLater.later(this.reconnect, this, 500);
            }
        };
        Socket.prototype.onOpen = function (e) {
            this.socketTaskId = e.socketTaskId;
            this.connected = true;
            this.status = 2;
            this.connectTimes = 0;
            this.closeReason = undefined;
            rf.callLater.remove(this.connectTimeOut, this);
            this.simpleDispatch(65536, e);
        };
        Socket.prototype.close = function (reason) {
            this.closeReason = reason;
            this.socket.close({ code: 1000, reason: reason });
        };
        Socket.prototype.onClose = function (e) {
            if (e) {
                if (e.socketTaskId == this.socketTaskId) {
                    this.connected = false;
                    this.status = 0;
                    this.simpleDispatch(65537, e);
                    var _a = this, connectTimes = _a.connectTimes, closeReason = _a.closeReason;
                    if (!closeReason || closeReason == "TIME_OUT") {
                        this.nextConnectTime = 500 + Math.min(10000, Math.pow(Math.PI * 0.5, connectTimes) * 500) + Date.now();
                        this.connectTimes++;
                        this.reconnect();
                    }
                }
            }
        };
        Socket.prototype.onError = function (e) {
            if (e.socketTaskId == this.socketTaskId) {
                this.connected = false;
                this.status == 0;
                rf.callLater.remove(this.connectTimeOut, this);
                this.simpleDispatch(65538, e);
                this.close("CLIENT_CLOSE");
            }
        };
        Socket.prototype.sDecode = function (data) {
            return undefined;
        };
        Socket.prototype.sEncode = function (option) {
            return undefined;
        };
        Socket.prototype.onMessage = function (e) {
            if (e.socketTaskId == this.socketTaskId) {
                var stream = this.sDecode(e.data);
                if (stream) {
                    this.dispatchEvent(stream);
                    stream.recycle();
                }
            }
        };
        Socket.prototype.send = function (option) {
            var _a = this, socket = _a.socket, socketoption = _a.socketoption;
            var buff = this.sEncode(option);
            if (undefined != buff) {
                socketoption.data = buff;
                socket.send(socketoption);
            }
        };
        Socket.prototype.simpleSend = function (code, value, proto) {
            var sendOption = this.sendOption;
            sendOption.code = code;
            sendOption.value = value;
            sendOption.proto = proto;
            this.send(sendOption);
        };
        return Socket;
    }(rf.InterestEventDispatcher));
    rf.Socket = Socket;
    var SocketDecoder = (function () {
        function SocketDecoder(socket, types) {
            if (!socket) {
                return;
            }
            this.socket = socket;
            var n = types.length;
            for (var i = 0; i < n; i++) {
                var type = types[i];
                var f = this["f_" + type];
                if (f) {
                    socket.on(type, f, this);
                }
                else {
                    console.log("缺少function:f_" + type);
                }
            }
        }
        SocketDecoder.prototype.showError = function (args, type) {
            if (type === void 0) { type = 0; }
        };
        return SocketDecoder;
    }());
    rf.SocketDecoder = SocketDecoder;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.defaultTimeMixer = newTimeMixer(undefined, 0.0, undefined, 1.0);
    function newTimeMixer(target, now, tm, speed) {
        if (now === void 0) { now = 0; }
        if (speed === void 0) { speed = 1; }
        var t = { target: target, now: now, speed: speed, parent: tm, childs: [] };
        if (tm) {
            tm.childs.push(t);
        }
        return t;
    }
    rf.newTimeMixer = newTimeMixer;
    function removeTimeMixer(tm) {
        var parent = tm.parent;
        if (parent) {
            parent.childs.remove(tm);
        }
    }
    rf.removeTimeMixer = removeTimeMixer;
    function tm_add(t, interval) {
        if (!t.pause) {
            t.interval = interval *= t.speed;
            t.now += interval;
            var childs = t.childs;
            for (var i = 0; i < childs.length; i++) {
                var element = childs[i];
                tm_add(element, interval);
            }
        }
        return t.now;
    }
    rf.tm_add = tm_add;
    function tm_set(t, now) {
        var interval = now - t.now;
        t.now = now;
        var childs = t.childs;
        for (var i = 0; i < childs.length; i++) {
            var element = childs[i];
            tm_add(element, interval);
        }
    }
    rf.tm_set = tm_set;
    var TimerEventX = (function (_super) {
        __extends(TimerEventX, _super);
        function TimerEventX() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimerEventX.TIMER = 'timer';
        TimerEventX.TIMER_COMPLETE = 'timerComplete';
        return TimerEventX;
    }(rf.EventX));
    rf.TimerEventX = TimerEventX;
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            var _this = _super.call(this) || this;
            _this._delay = 0;
            _this.currnetTime = 0;
            _this.repeatCount = 0;
            _this.running = false;
            _this.delay = delay;
            _this.repeatCount = repeatCount;
            return _this;
        }
        Object.defineProperty(Timer.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            set: function (value) {
                if (value < 1) {
                    value = 1;
                }
                if (this._delay == value) {
                    return;
                }
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        Timer.prototype.start = function () {
            this.currnetTime = 0;
            rf.Engine.addTick(this.update, this);
        };
        Timer.prototype.stop = function () {
            rf.Engine.removeTick(this.update, this);
            this.currnetTime = 0;
            this.repeatCount = 0;
        };
        Timer.prototype.update = function (now, interval) {
            this.currnetTime += interval;
            if (this.currnetTime >= this._delay) {
                this.simpleDispatch(TimerEventX.TIMER);
                this.currnetTime = this.currnetTime % this._delay;
            }
            if (this.repeatCount > 0) {
                this.repeatCount--;
                if (this.repeatCount <= 0) {
                    this.simpleDispatch(TimerEventX.TIMER_COMPLETE);
                    this.stop();
                }
            }
        };
        return Timer;
    }(rf.MiniDispatcher));
    rf.Timer = Timer;
    var GTimer = (function () {
        function GTimer(delay) {
            this.link = new rf.Link();
            this.timer = new Timer(delay);
            this.timer.addEventListener(TimerEventX.TIMER, this.timerHandler, this);
        }
        GTimer.prototype.timerHandler = function (event) {
            this.link.forEach(function (vo) {
                var func = vo.data;
                var thisobj = vo.thisObj;
                if (undefined != func) {
                    if (vo.args !== undefined) {
                        func.call(thisobj, vo.args);
                    }
                    else {
                        func.call(thisobj);
                    }
                }
                return true;
            }, this);
        };
        GTimer.prototype.add = function (func, thisobj, args) {
            var vo = this.link.add(func, thisobj, args);
            this.timer.start();
            return vo;
        };
        GTimer.prototype.remove = function (func, thisobj) {
            var link = this.link;
            link.remove(func, thisobj);
            if (!link.__length) {
                this.timer.stop();
            }
        };
        return GTimer;
    }());
    rf.GTimer = GTimer;
    var GTimerCallLater = (function (_super) {
        __extends(GTimerCallLater, _super);
        function GTimerCallLater() {
            return _super.call(this, 10) || this;
        }
        GTimerCallLater.prototype.later = function (f, thisobj, time, args, checksame) {
            if (checksame === void 0) { checksame = true; }
            if (undefined == f) {
                return;
            }
            this.link.checkSameData = checksame;
            var vo = _super.prototype.add.call(this, f, thisobj, args);
            if (!vo.weight) {
                vo.weight = rf.engineNow + time;
            }
            return vo;
        };
        GTimerCallLater.prototype.add = function (func, thisobj, args, checksame) {
            if (checksame === void 0) { checksame = true; }
            return this.later(func, thisobj, 10, args, checksame);
        };
        GTimerCallLater.prototype.remove = function (func, thisobj) {
            var link = this.link;
            for (var vo = link.first; vo; vo = vo.next) {
                if (vo.data == func && vo.thisObj == thisobj && vo.close == false) {
                    link.removeLink(vo);
                }
            }
            if (!link.__length) {
                this.timer.stop();
            }
        };
        GTimerCallLater.prototype.timerHandler = function (event) {
            var now = rf.defaultTimeMixer.now;
            var cleanflag = false;
            var link = this.link;
            link.forEach(function (vo) {
                if (now > vo.weight) {
                    vo.close = true;
                    vo.weight = 0;
                    var func = vo.data;
                    func.call(vo.thisObj, vo.args);
                    cleanflag = true;
                }
                return true;
            }, this);
            if (cleanflag) {
                link.clean();
            }
        };
        return GTimerCallLater;
    }(GTimer));
    rf.GTimerCallLater = GTimerCallLater;
    var TickLink = (function () {
        function TickLink() {
            this.link = new rf.Link();
            rf.Engine.addTick(this.update, this);
        }
        TickLink.prototype.addTick = function (tick, thisObj) {
            this.link.add(tick, thisObj);
        };
        TickLink.prototype.removeTick = function (tick, thisObj) {
            this.link.remove(tick, thisObj);
        };
        TickLink.prototype.update = function (now, interval) {
            this.link.forEach(function (vo) {
                var tick = vo.data;
                tick.call(vo.thisObj, now, interval);
                return true;
            }, this);
        };
        return TickLink;
    }());
    rf.TickLink = TickLink;
    rf.gameTick = new TickLink();
    rf.skillTick = new TickLink();
    rf.timerobj = {};
    function getGTimer(time) {
        var gtimer = rf.timerobj[time];
        if (undefined == gtimer) {
            rf.timerobj[time] = gtimer = new GTimer(time);
        }
        return gtimer;
    }
    rf.getGTimer = getGTimer;
    rf.time250 = getGTimer(250);
    rf.time500 = getGTimer(500);
    rf.time1000 = getGTimer(1000);
    rf.time3000 = getGTimer(3000);
    rf.time4000 = getGTimer(4000);
    rf.time5000 = getGTimer(5000);
    rf.callLater = new GTimerCallLater();
})(rf || (rf = {}));
var rf;
(function (rf) {
    function ease_default(t, b, c, d) {
        return c * t / d + b;
    }
    rf.ease_default = ease_default;
    function ease_quartic_in(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    }
    rf.ease_quartic_in = ease_quartic_in;
    function ease_quartic_out(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    rf.ease_quartic_out = ease_quartic_out;
    function ease_quartic_inout(t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    rf.ease_quartic_inout = ease_quartic_inout;
    function ease_back_in(t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    rf.ease_back_in = ease_back_in;
    function ease_back_out(t, b, c, d) {
        var s = 5;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    rf.ease_back_out = ease_back_out;
    function ease_back_inout(t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
    rf.ease_back_inout = ease_back_inout;
    rf.tween_ease_function = {
        "Quadratic.out": ease_quartic_out,
        "Quadratic.in": ease_quartic_in,
        "Quadratic.inout": ease_quartic_inout
    };
    rf.tweenLink = new rf.Link();
    function tweener_createItem(eo, so, target, data, tweener) {
        var l = 0, e = 0, d = 0, s = 0;
        if (!data) {
            data = [];
        }
        for (var k in eo) {
            if (target) {
                s = target[k];
                if (undefined != s) {
                    s = (so && undefined != so[k]) ? so[k] : s;
                }
                else {
                    s = 0;
                }
            }
            else {
                s = (so && undefined != so[k]) ? so[k] : 0;
            }
            e = eo[k];
            data[l++] = { k: k, s: s, e: e, d: e - s, n: 0 };
        }
        if (tweener) {
            tweener.l = l;
        }
        return data;
    }
    rf.tweener_createItem = tweener_createItem;
    function createTweener(eo, duration, tm, target, ease, so) {
        var tweener = { data: [], caster: target, tm: tm, st: tm.now, ease: ease ? ease : ease_default, duration: duration };
        var data = tweener.data;
        tweener_createItem(eo, so, target, data, tweener);
        return tweener;
    }
    rf.createTweener = createTweener;
    function tween_lerp_pro(a, b, n, pro, ease) {
        if (!ease)
            ease = ease_default;
        for (var key in pro) {
            var s = a[key];
            var e = b[key];
            if (s === undefined || e === undefined) {
                continue;
            }
            if (s != e) {
                pro[key] = ease(n, s, e - s, 1);
            }
            else {
                pro[key] = s;
            }
        }
    }
    rf.tween_lerp_pro = tween_lerp_pro;
    function tweenTo(eo, duration, tm, target, ease, so) {
        var tweener = createTweener(eo, duration, tm, target, ease, so);
        if (tweener.l > 0) {
            rf.tweenLink.add(tweener);
        }
        return tweener;
    }
    rf.tweenTo = tweenTo;
    function tweenUpdate() {
        rf.tweenLink.forData(function (tweener) {
            var caster = tweener.caster, l = tweener.l, data = tweener.data, ease = tweener.ease, tm = tweener.tm, st = tweener.st, duration = tweener.duration, update = tweener.update, thisObj = tweener.thisObj;
            var now = tm.now - st;
            if (now >= duration) {
                tweenEnd(tweener);
            }
            else {
                for (var i = 0; i < l; i++) {
                    var item = data[i];
                    var k = item.k, s = item.s, d = item.d;
                    item.n = ease(now, s, d, duration);
                    if (caster) {
                        caster[k] = item.n;
                    }
                }
                if (undefined != update) {
                    update.call(thisObj, tweener);
                }
            }
            return true;
        }, this);
    }
    rf.tweenUpdate = tweenUpdate;
    function tweenEnd(tweener) {
        if (!tweener || tweener.completed)
            return;
        var _a = tweener, caster = _a.caster, l = _a.l, data = _a.data, update = _a.update, complete = _a.complete, thisObj = _a.thisObj;
        for (var i = 0; i < l; i++) {
            var item = data[i];
            var k = item.k, e = item.e;
            item.n = e;
            if (caster) {
                caster[k] = e;
            }
        }
        tweener.completed = true;
        if (undefined != update) {
            update.call(thisObj, tweener);
        }
        if (undefined != complete) {
            complete.call(thisObj, tweener);
        }
        rf.tweenLink.remove(tweener);
    }
    rf.tweenEnd = tweenEnd;
    function tweenStop(tweener) {
        if (!tweener || tweener.completed)
            return;
        rf.tweenLink.remove(tweener);
        tweener.completed = true;
    }
    rf.tweenStop = tweenStop;
    function scriptTween_play(target, data, tm, mx, my, dtype, property) {
        var tween = rf.recyclable(ScriptTween);
        tween.play(target, data, tm, mx, my, dtype, property);
        return tween;
    }
    rf.scriptTween_play = scriptTween_play;
    function random_number(num) {
        if (num instanceof Array) {
            return num[0] + Math.random() * (num[1] - num[0]);
        }
        return ~~num ? +num : 0;
    }
    rf.random_number = random_number;
    var STweenBase = (function () {
        function STweenBase() {
            this.needupdate = true;
        }
        STweenBase.prototype.start = function () {
            var _a = this, type = _a.type, data = _a.data, target = _a.target;
            var eo = {};
            eo[type] = (undefined != data.to) ? random_number(data.to) : target[type];
            if (data.duration <= 0) {
                target[type] = eo[type];
                this.complete();
            }
            else {
                var so = {};
                so[type] = (undefined != data.from) ? random_number(data.from) : target[type];
                this.tweenItems = tweener_createItem(eo, so);
                this.needupdate = true;
            }
        };
        STweenBase.prototype.update = function (now, interval) {
            var _a = this, tweenItems = _a.tweenItems, data = _a.data, target = _a.target, ease = _a.ease, st = _a.st, lifeTime = _a.lifeTime;
            var duration = ~~data.duration;
            if (isNaN(lifeTime) || lifeTime < duration) {
                this.lifeTime = lifeTime = duration;
            }
            now -= st;
            if (now >= lifeTime) {
                this.complete();
            }
            else {
                if (!tweenItems) {
                    return;
                }
                if (now > duration) {
                    now = duration;
                }
                var n = tweenItems.length;
                for (var i = 0; i < n; i++) {
                    var element = tweenItems[i];
                    if (element) {
                        var k = element.k, s = element.s, d = element.d;
                        target[k] = ease(now, s, d, duration);
                    }
                }
            }
        };
        STweenBase.prototype.stop = function (local) {
            if (local === void 0) { local = true; }
            this.tweenItems = undefined;
            if (local) {
                this.complete();
            }
        };
        STweenBase.prototype.complete = function () {
            var _a = this, tweenItems = _a.tweenItems, target = _a.target;
            if (tweenItems) {
                tweenItems.forEach(function (element) {
                    if (element) {
                        var k = element.k, e = element.e;
                        target[k] = e;
                    }
                });
            }
            this.status = 2;
            this.data = undefined;
            this.target = undefined;
            this.tweenItems = undefined;
            this.stween = undefined;
            this.lifeTime = 0;
        };
        return STweenBase;
    }());
    rf.STweenBase = STweenBase;
    var STweenPro = (function (_super) {
        __extends(STweenPro, _super);
        function STweenPro() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        STweenPro.prototype.start = function () {
            var _a = this, data = _a.data, target = _a.target;
            var so = data.so ? data.so : {};
            var eo = data.eo ? data.eo : {};
            for (var type in so) {
                if (eo[type] === undefined) {
                    eo[type] = target[type];
                }
            }
            for (var type in eo) {
                if (so[type] === undefined) {
                    so[type] = target[type];
                }
            }
            if (data.duration <= 0) {
                for (var type in eo) {
                    target[type] = eo[type];
                }
                this.complete();
            }
            else {
                this.tweenItems = tweener_createItem(eo, so);
            }
        };
        return STweenPro;
    }(STweenBase));
    rf.STweenPro = STweenPro;
    var STweenLiner = (function (_super) {
        __extends(STweenLiner, _super);
        function STweenLiner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        STweenLiner.prototype.start = function () {
            var _a = this, type = _a.type, data = _a.data, target = _a.target;
            var so = {};
            var eo = {};
            var degree = target.rotation;
            degree += random_number(data.degree);
            degree += ~~data.offsetDegree;
            degree *= Math.DEG_TO_RAD;
            var len = random_number(data.len);
            so.x = target._x;
            so.y = target._y;
            eo.x = so.x + len * Math.cos(degree);
            eo.y = so.y + len * Math.sin(degree);
            if (data.duration <= 0) {
                target.x = eo.x;
                target.y = eo.y;
                this.complete();
            }
            else {
                this.tweenItems = tweener_createItem(eo, so);
            }
        };
        return STweenLiner;
    }(STweenBase));
    rf.STweenLiner = STweenLiner;
    var ScriptTween = (function (_super) {
        __extends(ScriptTween, _super);
        function ScriptTween() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScriptTween.prototype.play = function (target, data, tm, mx, my, dtype, property) {
            this.target = target;
            var tweens = this.tweens;
            if (!tweens) {
                this.tweens = tweens = [];
            }
            this.tm = tm ? tm : rf.defaultTimeMixer;
            var st = tm.now;
            var n = data.length;
            for (var i = 0; i < n; i++) {
                var element = data[i];
                var type = element.type, child = element.child;
                var c = rf.ScriptTweenIns[type];
                if (c) {
                    var t = rf.recyclable(c);
                    t.type = type;
                    t.data = element;
                    t.target = child ? target[child] : target;
                    t.dtype = dtype;
                    t.mx = mx;
                    t.my = my;
                    t.property = property;
                    t.status = 0;
                    t.ease = rf.tween_ease_function[element.ease] ? rf.tween_ease_function[element.ease] : ease_default;
                    t.st = st + element.time;
                    t.stween = this;
                    if (t.target) {
                        tweens.push(t);
                    }
                }
            }
            rf.Engine.addTick(this.update, this);
            this.update(0, 0);
        };
        ScriptTween.prototype.playPro = function (target, tm, duration, to, from, time) {
            if (time === void 0) { time = 0; }
            var tweens = this.tweens;
            if (!tweens) {
                this.tweens = tweens = [];
            }
            this.tm = tm;
            var t = rf.recyclable(STweenPro);
            t.type = "pro";
            t.data = { so: from, eo: to, duration: duration, time: time };
            t.target = target;
            t.status = 0;
            t.ease = ease_default;
            t.st = tm.now + time;
            t.stween = this;
            tweens.push(t);
            rf.Engine.addTick(this.update, this);
            this.update(0, 0);
            return t;
        };
        ScriptTween.prototype.update = function (now, interval) {
            var runing = 0;
            var _a = this, tweens = _a.tweens, tm = _a.tm;
            now = tm.now;
            var n = tweens.length;
            for (var i = 0; i < n; i++) {
                var element = tweens[i];
                var status_1 = element.status, data = element.data;
                if (status_1 != 2) {
                    runing++;
                    if (status_1 == 0) {
                        if (now >= element.st) {
                            element.status = 1;
                            element.start();
                            if (data.duration > 0 && element.needupdate) {
                                element.update(now, tm.interval);
                            }
                        }
                    }
                    else {
                        if (element.needupdate) {
                            element.update(now, tm.interval);
                        }
                    }
                }
            }
            if (0 == runing) {
                this.simpleDispatch(4);
                rf.Engine.removeTick(this.update, this);
                this.target = undefined;
                tweens.length = 0;
            }
        };
        ScriptTween.prototype.stop = function () {
            rf.Engine.removeTick(this.update, this);
            var tweens = this.tweens;
            this.target = undefined;
            for (var i = 0; i < tweens.length; i++) {
                var tween = tweens[i];
                tween.stop(false);
            }
            if (tweens)
                tweens.length = 0;
        };
        __decorate([
            rf.RecyclePro(undefined)
        ], ScriptTween.prototype, "target", void 0);
        __decorate([
            rf.RecyclePro(undefined)
        ], ScriptTween.prototype, "tweens", void 0);
        __decorate([
            rf.RecyclePro(undefined)
        ], ScriptTween.prototype, "tm", void 0);
        return ScriptTween;
    }(rf.MiniDispatcher));
    rf.ScriptTween = ScriptTween;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Endian = (function () {
        function Endian() {
        }
        Endian.LITTLE_ENDIAN = "littleEndian";
        Endian.BIG_ENDIAN = "bigEndian";
        return Endian;
    }());
    rf.Endian = Endian;
    var EgretByte = (function () {
        function EgretByte(buffer, bufferExtSize) {
            if (bufferExtSize === void 0) { bufferExtSize = 0; }
            this.bufferExtSize = 0;
            this.EOF_byte = -1;
            this.EOF_code_point = -1;
            if (bufferExtSize < 0) {
                bufferExtSize = 0;
            }
            this.bufferExtSize = bufferExtSize;
            var bytes, wpos = 0;
            if (buffer) {
                var uint8 = void 0;
                if (buffer instanceof Uint8Array) {
                    uint8 = buffer;
                    wpos = buffer.length;
                }
                else {
                    wpos = buffer.byteLength;
                    uint8 = new Uint8Array(buffer);
                }
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = (wpos / bufferExtSize | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
            }
            else {
                bytes = new Uint8Array(bufferExtSize);
            }
            this.write_position = wpos;
            this._position = 0;
            this._bytes = bytes;
            this.data = new DataView(bytes.buffer);
            this.endian = Endian.BIG_ENDIAN;
        }
        Object.defineProperty(EgretByte.prototype, "endian", {
            get: function () {
                return this.$endian == 0 ? Endian.LITTLE_ENDIAN : Endian.BIG_ENDIAN;
            },
            set: function (value) {
                this.$endian = value == Endian.LITTLE_ENDIAN ? 0 : 1;
            },
            enumerable: true,
            configurable: true
        });
        EgretByte.prototype.setArrayBuffer = function (buffer) {
        };
        Object.defineProperty(EgretByte.prototype, "readAvailable", {
            get: function () {
                return this.write_position - this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "buffer", {
            get: function () {
                return this.data.buffer.slice(0, this.write_position);
            },
            set: function (value) {
                var wpos = value.byteLength;
                var uint8 = new Uint8Array(value);
                var bufferExtSize = this.bufferExtSize;
                var bytes;
                if (bufferExtSize == 0) {
                    bytes = new Uint8Array(wpos);
                }
                else {
                    var multi = (wpos / bufferExtSize | 0) + 1;
                    bytes = new Uint8Array(multi * bufferExtSize);
                }
                bytes.set(uint8);
                this.write_position = wpos;
                this._bytes = bytes;
                this.data = new DataView(bytes.buffer);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "rawBuffer", {
            get: function () {
                return this.data.buffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "bytes", {
            get: function () {
                return this._bytes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "dataView", {
            get: function () {
                return this.data;
            },
            set: function (value) {
                this.buffer = value.buffer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "bufferOffset", {
            get: function () {
                return this.data.byteOffset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                if (value > this.write_position) {
                    this.write_position = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EgretByte.prototype, "length", {
            get: function () {
                return this.write_position;
            },
            set: function (value) {
                this.write_position = value;
                if (this.data.byteLength > value) {
                    this._position = value;
                }
                this._validateBuffer(value);
            },
            enumerable: true,
            configurable: true
        });
        EgretByte.prototype._validateBuffer = function (value) {
            if (this.data.byteLength < value) {
                var be = this.bufferExtSize;
                var tmp = void 0;
                if (be == 0) {
                    tmp = new Uint8Array(value);
                }
                else {
                    var nLen = ((value / be >> 0) + 1) * be;
                    tmp = new Uint8Array(nLen);
                }
                tmp.set(this._bytes);
                this._bytes = tmp;
                this.data = new DataView(tmp.buffer);
            }
        };
        Object.defineProperty(EgretByte.prototype, "bytesAvailable", {
            get: function () {
                return this.data.byteLength - this._position;
            },
            enumerable: true,
            configurable: true
        });
        EgretByte.prototype.clear = function () {
            var buffer = new ArrayBuffer(this.bufferExtSize);
            this.data = new DataView(buffer);
            this._bytes = new Uint8Array(buffer);
            this._position = 0;
            this.write_position = 0;
        };
        EgretByte.prototype.readBoolean = function () {
            if (this.validate(1))
                return !!this._bytes[this.position++];
        };
        EgretByte.prototype.readByte = function () {
            if (this.validate(1))
                return this.data.getInt8(this.position++);
        };
        EgretByte.prototype.readBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            if (!bytes) {
                return;
            }
            var pos = this._position;
            var available = this.write_position - pos;
            if (available < 0) {
                return;
            }
            if (length == 0) {
                length = available;
            }
            else if (length > available) {
                return;
            }
            var position = bytes._position;
            bytes._position = 0;
            bytes.validateBuffer(offset + length);
            bytes._position = position;
            bytes._bytes.set(this._bytes.subarray(pos, pos + length), offset);
            this.position += length;
        };
        EgretByte.prototype.readDouble = function () {
            if (this.validate(8)) {
                var value = this.data.getFloat64(this._position, this.$endian == 0);
                this.position += 8;
                return value;
            }
        };
        EgretByte.prototype.readFloat = function () {
            if (this.validate(4)) {
                var value = this.data.getFloat32(this._position, this.$endian == 0);
                this.position += 4;
                return value;
            }
        };
        EgretByte.prototype.readInt = function () {
            if (this.validate(4)) {
                var value = this.data.getInt32(this._position, this.$endian == 0);
                this.position += 4;
                return value;
            }
        };
        EgretByte.prototype.readShort = function () {
            if (this.validate(2)) {
                var value = this.data.getInt16(this._position, this.$endian == 0);
                this.position += 2;
                return value;
            }
        };
        EgretByte.prototype.readUnsignedByte = function () {
            if (this.validate(1))
                return this._bytes[this.position++];
        };
        EgretByte.prototype.readUnsignedInt = function () {
            if (this.validate(4)) {
                var value = this.data.getUint32(this._position, this.$endian == 0);
                this.position += 4;
                return value;
            }
        };
        EgretByte.prototype.readUnsignedShort = function () {
            if (this.validate(2)) {
                var value = this.data.getUint16(this._position, this.$endian == 0);
                this.position += 2;
                return value;
            }
        };
        EgretByte.prototype.readUTF = function () {
            var length = this.readUnsignedShort();
            if (length > 0) {
                return this.readUTFBytes(length);
            }
            else {
                return "";
            }
        };
        EgretByte.prototype.readUTFBytes = function (length) {
            if (!this.validate(length)) {
                return;
            }
            var data = this.data;
            var bytes = new Uint8Array(data.buffer, data.byteOffset + this._position, length);
            this.position += length;
            return this.decodeUTF8(bytes);
        };
        EgretByte.prototype.writeBoolean = function (value) {
            this.validateBuffer(1);
            this._bytes[this.position++] = +value;
        };
        EgretByte.prototype.writeByte = function (value) {
            this.validateBuffer(1);
            this._bytes[this.position++] = value & 0xff;
        };
        EgretByte.prototype.writeBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            var writeLength;
            if (offset < 0) {
                return;
            }
            if (length < 0) {
                return;
            }
            else if (length == 0) {
                writeLength = bytes.length - offset;
            }
            else {
                writeLength = Math.min(bytes.length - offset, length);
            }
            if (writeLength > 0) {
                this.validateBuffer(writeLength);
                this._bytes.set(bytes._bytes.subarray(offset, offset + writeLength), this._position);
                this.position = this._position + writeLength;
            }
        };
        EgretByte.prototype.writeDouble = function (value) {
            this.validateBuffer(8);
            this.data.setFloat64(this._position, value, this.$endian == 0);
            this.position += 8;
        };
        EgretByte.prototype.writeFloat = function (value) {
            this.validateBuffer(4);
            this.data.setFloat32(this._position, value, this.$endian == 0);
            this.position += 4;
        };
        EgretByte.prototype.writeInt = function (value) {
            this.validateBuffer(4);
            this.data.setInt32(this._position, value, this.$endian == 0);
            this.position += 4;
        };
        EgretByte.prototype.writeShort = function (value) {
            this.validateBuffer(2);
            this.data.setInt16(this._position, value, this.$endian == 0);
            this.position += 2;
        };
        EgretByte.prototype.writeUnsignedInt = function (value) {
            this.validateBuffer(4);
            this.data.setUint32(this._position, value, this.$endian == 0);
            this.position += 4;
        };
        EgretByte.prototype.writeUnsignedShort = function (value) {
            this.validateBuffer(2);
            this.data.setUint16(this._position, value, this.$endian == 0);
            this.position += 2;
        };
        EgretByte.prototype.writeUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(2 + length);
            this.data.setUint16(this._position, length, this.$endian == 0);
            this.position += 2;
            this._writeUint8Array(utf8bytes, false);
        };
        EgretByte.prototype.writeUTFBytes = function (value) {
            this._writeUint8Array(this.encodeUTF8(value));
        };
        EgretByte.prototype.toString = function () {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
        };
        EgretByte.prototype._writeUint8Array = function (bytes, validateBuffer) {
            if (validateBuffer === void 0) { validateBuffer = true; }
            var pos = this._position;
            var npos = pos + bytes.length;
            if (validateBuffer) {
                this.validateBuffer(npos);
            }
            this.bytes.set(bytes, pos);
            this.position = npos;
        };
        EgretByte.prototype.validate = function (len) {
            var bl = this._bytes.length;
            if (bl > 0 && this._position + len <= bl) {
                return true;
            }
            else {
            }
        };
        EgretByte.prototype.validateBuffer = function (len) {
            this.write_position = len > this.write_position ? len : this.write_position;
            len += this._position;
            this._validateBuffer(len);
        };
        EgretByte.prototype.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count = void 0, offset = void 0;
                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    }
                    else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    }
                    else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                        count = 3;
                        offset = 0xF0;
                    }
                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                    while (count > 0) {
                        var temp = this.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        };
        EgretByte.prototype.decodeUTF8 = function (data) {
            var fatal = false;
            var pos = 0;
            var result = "";
            var code_point;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;
            while (data.length > pos) {
                var _byte = data[pos++];
                if (_byte == this.EOF_byte) {
                    if (utf8_bytes_needed != 0) {
                        code_point = this.decoderError(fatal);
                    }
                    else {
                        code_point = this.EOF_code_point;
                    }
                }
                else {
                    if (utf8_bytes_needed == 0) {
                        if (this.inRange(_byte, 0x00, 0x7F)) {
                            code_point = _byte;
                        }
                        else {
                            if (this.inRange(_byte, 0xC2, 0xDF)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xC0;
                            }
                            else if (this.inRange(_byte, 0xE0, 0xEF)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xE0;
                            }
                            else if (this.inRange(_byte, 0xF0, 0xF4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xF0;
                            }
                            else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    }
                    else if (!this.inRange(_byte, 0x80, 0xBF)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    }
                    else {
                        utf8_bytes_seen += 1;
                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        }
                        else {
                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                                code_point = cp;
                            }
                            else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }
                    }
                }
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xFFFF) {
                        if (code_point > 0)
                            result += String.fromCharCode(code_point);
                    }
                    else {
                        code_point -= 0x10000;
                        result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                        result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        };
        EgretByte.prototype.encoderError = function (code_point) {
        };
        EgretByte.prototype.decoderError = function (fatal, opt_code_point) {
            if (fatal) {
            }
            return opt_code_point || 0xFFFD;
        };
        EgretByte.prototype.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        EgretByte.prototype.div = function (n, d) {
            return Math.floor(n / d);
        };
        EgretByte.prototype.stringToCodePoints = function (string) {
            var cps = [];
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                }
                else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                }
                else {
                    if (i == n - 1) {
                        cps.push(0xFFFD);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        return EgretByte;
    }());
    rf.EgretByte = EgretByte;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ByteArray = (function (_super) {
        __extends(ByteArray, _super);
        function ByteArray(buffer, ext) {
            return _super.call(this, buffer, ext) || this;
        }
        ByteArray.prototype.replaceBuffer = function (value) {
            this.write_position = value.byteLength;
            this._bytes = new Uint8Array(value);
            this.data = new DataView(value);
        };
        ByteArray.prototype.readBuffer = function (length) {
            if (!this.validate(length))
                return;
            var start = this.position;
            this.position += length;
            return this.buffer.slice(start, this.position);
        };
        ByteArray.prototype.readInt64 = function () {
            if (this.validate(8)) {
                var low = void 0, high = void 0;
                var flag = this.$endian == 0;
                var data = this.data;
                var pos = this._position;
                if (flag) {
                    low = data.getUint32(pos, flag);
                    high = data.getUint32(pos + 4, flag);
                }
                else {
                    high = data.getUint32(pos, flag);
                    low = data.getUint32(pos + 4, flag);
                }
                this.position = pos + 8;
                return rf.Int64.toNumber(low, high);
            }
        };
        ByteArray.prototype.writeInt64 = function (value) {
            this.validateBuffer(8);
            var i64 = rf.Int64.fromNumber(value);
            var high = i64.high, low = i64.low;
            var flag = this.$endian == 0;
            var data = this.data;
            var pos = this._position;
            if (flag) {
                data.setUint32(pos, low, flag);
                data.setUint32(pos + 4, high, flag);
            }
            else {
                data.setUint32(pos, high, flag);
                data.setUint32(pos + 4, low, flag);
            }
            this.position = pos + 8;
        };
        ByteArray.prototype.readPBDouble = function () {
            if (this.validate(8)) {
                var value = this.data.getFloat64(this._position, true);
                this.position += 8;
                return value;
            }
        };
        ByteArray.prototype.writePBDouble = function (value) {
            this.validateBuffer(8);
            this.data.setFloat64(this._position, value, true);
            this.position += 8;
        };
        ByteArray.prototype.readPBFloat = function () {
            if (this.validate(4)) {
                var value = this.data.getFloat32(this._position, true);
                this.position += 4;
                return value;
            }
        };
        ByteArray.prototype.writePBFloat = function (value) {
            this.validateBuffer(4);
            this.data.setFloat32(this._position, value, true);
            this.position += 4;
        };
        ByteArray.prototype.readFix32 = function () {
            if (this.validate(4)) {
                var value = this.data.getUint32(this._position, true);
                this.position += 4;
                return value;
            }
        };
        ByteArray.prototype.writeFix32 = function (value) {
            this.validateBuffer(4);
            this.data.setUint32(this._position, value, true);
            this.position += 4;
        };
        ByteArray.prototype.readSFix32 = function () {
            if (this.validate(4)) {
                var value = this.data.getInt32(this._position, true);
                this.position += 4;
                return value;
            }
        };
        ByteArray.prototype.writeSFix32 = function (value) {
            this.validateBuffer(4);
            this.data.setInt32(this._position, value, true);
            this.position += 4;
        };
        ByteArray.prototype.readFix64 = function () {
            if (this.validate(8)) {
                var pos = this._position;
                var data = this.data;
                var low = data.getUint32(pos, true);
                var high = data.getUint32(pos + 4, true);
                this.position = pos + 8;
                return rf.Int64.toNumber(low, high);
            }
        };
        ByteArray.prototype.writeFix64 = function (value) {
            var i64 = rf.Int64.fromNumber(value);
            this.validateBuffer(8);
            var pos = this._position;
            var data = this.data;
            data.setUint32(pos, i64.low, true);
            data.setUint32(pos + 4, i64.high, true);
            this.position = pos + 8;
        };
        ByteArray.prototype.readByteArray = function (length, ext) {
            if (ext === void 0) { ext = 0; }
            var ba = new ByteArray(this.readBuffer(length), ext);
            ba.$endian = this.$endian;
            return ba;
        };
        ByteArray.prototype.writeVarint64 = function (value) {
            var i64 = rf.Int64.fromNumber(value);
            var high = i64.high;
            var low = i64.low;
            if (high == 0) {
                this.writeVarint(low);
            }
            else {
                for (var i = 0; i < 4; ++i) {
                    this.writeByte((low & 0x7F) | 0x80);
                    low >>>= 7;
                }
                if ((high & (0xFFFFFFF << 3)) == 0) {
                    this.writeByte((high << 4) | low);
                }
                else {
                    this.writeByte((((high << 4) | low) & 0x7F) | 0x80);
                    this.writeVarint(high >>> 3);
                }
            }
        };
        ByteArray.prototype.writeVarint = function (value) {
            for (;;) {
                if (value < 0x80) {
                    this.writeByte(value);
                    return;
                }
                else {
                    this.writeByte((value & 0x7F) | 0x80);
                    value >>>= 7;
                }
            }
        };
        ByteArray.prototype.readVarint = function () {
            var result = 0;
            for (var i = 0;; i += 7) {
                if (i < 32) {
                    var b = this.readUnsignedByte();
                    if (b >= 0x80) {
                        result |= ((b & 0x7f) << i);
                    }
                    else {
                        result |= (b << i);
                        break;
                    }
                }
                else {
                    while (this.readUnsignedByte() >= 0x80) { }
                    break;
                }
            }
            return result;
        };
        ByteArray.prototype.readVarint64 = function () {
            var b, low, high, i = 0;
            for (;; i += 7) {
                b = this.readUnsignedByte();
                if (i == 28) {
                    break;
                }
                else {
                    if (b >= 0x80) {
                        low |= ((b & 0x7f) << i);
                    }
                    else {
                        low |= (b << i);
                        return rf.Int64.toNumber(low, high);
                    }
                }
            }
            if (b >= 0x80) {
                b &= 0x7f;
                low |= (b << i);
                high = b >>> 4;
            }
            else {
                low |= (b << i);
                high = b >>> 4;
                return rf.Int64.toNumber(low, high);
            }
            for (i = 3;; i += 7) {
                b = this.readUnsignedByte();
                if (i < 32) {
                    if (b >= 0x80) {
                        high |= ((b & 0x7f) << i);
                    }
                    else {
                        high |= (b << i);
                        break;
                    }
                }
            }
            return rf.Int64.toNumber(low, high);
        };
        Object.defineProperty(ByteArray.prototype, "outBytes", {
            get: function () {
                return new Uint8Array(this._bytes.buffer, 0, this.write_position);
            },
            enumerable: true,
            configurable: true
        });
        ByteArray.prototype.reset = function () {
            this.write_position = this.position = 0;
        };
        return ByteArray;
    }(rf.EgretByte));
    rf.ByteArray = ByteArray;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function fixHex(n) {
        var s = n.toString(16);
        if (s.length < 2) {
            s = "0" + s;
        }
        return s.toLocaleUpperCase();
    }
    rf.fixHex = fixHex;
    function toHex(uint8, tag) {
        if (tag === void 0) { tag = " "; }
        var hex = "";
        for (var i = 0; i < uint8.length; i++) {
            hex += fixHex(uint8[i]) + " ";
        }
        return tag + hex;
    }
    rf.toHex = toHex;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.DEBUG = false;
    var wireTypeMap = [
        ,
        1,
        5,
        0,
        0,
        0,
        1,
        5,
        0,
        2,
        ,
        2,
        2,
        0,
        0,
        5,
        1,
        0,
        0
    ];
    function Log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.call(this, args);
    }
    function getPBUtils() {
        var structDict = {};
        var defDict = {};
        function regDef(m, def) {
            var msg;
            if (typeof m != "object") {
                msg = structDict[m];
                if (!msg) {
                    defDict[m] = def;
                    return;
                }
            }
            else {
                msg = m;
            }
            Object.defineProperty(msg, "def", {
                value: def
            });
        }
        function regStruct(msgType, struct) {
            if (rf.DEBUG && (msgType in structDict)) {
                Log("PB\u7684\u7ED3\u6784\u5B9A\u4E49\u7684key[" + msgType + "]\u6CE8\u518C\u91CD\u590D");
            }
            var def = defDict[msgType];
            if (def) {
                regDef(struct, def);
            }
            initDefault(struct);
            structDict[msgType] = struct;
        }
        function initDefault(struct, ref) {
            for (var idx in struct) {
                var body = struct[idx];
                if (4 in body) {
                    var def = struct.def;
                    if (!def) {
                        def = ref && ref.prototype || {};
                        Object.defineProperty(struct, "def", {
                            value: def
                        });
                    }
                    def[body[0]] = body[4];
                }
            }
            if (ref) {
                struct.ref = ref;
            }
        }
        return {
            regDef: regDef,
            regStruct: regStruct,
            initDefault: initDefault,
            add: function (dict) {
                if (dict) {
                    if (!dict.$$inted) {
                        for (var name_3 in dict) {
                            var struct = dict[name_3];
                            if (typeof struct != "object") {
                                var cycle = [name_3, struct];
                                while (true) {
                                    struct = dict[struct];
                                    if (struct == null) {
                                        return rf.DEBUG && Log("\u6DFB\u52A0ProtoBuf\u5B57\u5178\u6709\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E");
                                    }
                                    if (typeof struct == "object") {
                                        break;
                                    }
                                    if (~cycle.indexOf(struct)) {
                                        return rf.DEBUG && Log("\u6DFB\u52A0ProtoBuf\u5B57\u5178\u6709\u8BEF\uFF0C\u51FA\u73B0\u5FAA\u73AF\u7684\u914D\u7F6E");
                                    }
                                    cycle.push(struct);
                                }
                            }
                            regStruct(name_3, struct);
                        }
                        dict.$$inted = 1;
                    }
                }
            },
            readFrom: readFrom,
            writeTo: writeTo,
            readMessage: readMessage,
            readString: readString,
            readBytes: readBytes,
        };
        function readFrom(msgType, bytes, len) {
            if (len === undefined)
                len = -1;
            var afterLen = 0;
            if (len > -1) {
                afterLen = bytes.bytesAvailable - len;
            }
            var struct = typeof msgType == "object" ? msgType : structDict[msgType];
            if (!struct) {
                Log("\u975E\u6CD5\u7684\u901A\u4FE1\u7C7B\u578B[" + msgType + "]");
                return;
            }
            var ref = struct.ref, def = struct.def;
            var msg = ref ? new ref() : def ? Object.create(struct.def) : {};
            while (bytes.bytesAvailable > afterLen) {
                var tag = bytes.readVarint();
                if (tag == 0)
                    continue;
                var idx = tag >>> 3;
                var body = struct[idx];
                if (!body) {
                    Log("\u8BFB\u53D6\u6D88\u606F\u7C7B\u578B\u4E3A\uFF1A" + msgType + "\uFF0C\u7D22\u5F15" + idx + "\u65F6\u6570\u636E\u51FA\u73B0\u9519\u8BEF\uFF0C\u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u6570\u636E\u7ED3\u6784\u914D\u7F6E");
                    readValue(tag, bytes);
                    continue;
                }
                var name_4 = body[0];
                var label = body[1];
                var type = body[2];
                var subMsgType = body[3];
                var value = void 0;
                var isRepeated = label == 3;
                if (!isRepeated || (tag & 7) != 7) {
                    switch (type) {
                        case 1:
                            value = bytes.readPBDouble();
                            break;
                        case 2:
                            value = bytes.readPBFloat();
                            break;
                        case 3:
                        case 4:
                        case 18:
                            value = bytes.readVarint64();
                            break;
                        case 17:
                            value = decodeZigzag32(bytes.readVarint());
                            break;
                        case 5:
                        case 13:
                        case 14:
                            value = bytes.readVarint();
                            break;
                        case 6:
                        case 16:
                            value = bytes.readFix64();
                            break;
                        case 7:
                            value = bytes.readFix32();
                            break;
                        case 8:
                            value = bytes.readBoolean();
                            break;
                        case 9:
                            value = readString(bytes);
                            break;
                        case 10:
                            value = undefined;
                            if (rf.DEBUG) {
                                Log("\u8BFB\u53D6\u6D88\u606F\u7C7B\u578B\u4E3A\uFF1A" + msgType + "\uFF0C\u7D22\u5F15" + idx + "\u65F6\u6570\u636E\u51FA\u73B0\u5DF2\u5F03\u7528\u7684GROUP\u5206\u7EC4\u7C7B\u578B");
                            }
                            break;
                        case 11:
                            value = readMessage(bytes, subMsgType);
                            break;
                        case 12:
                            value = readBytes(bytes);
                            break;
                        case 15:
                            value = bytes.readSFix32();
                            break;
                        default:
                            value = readValue(tag, bytes);
                    }
                }
                if (isRepeated) {
                    var arr = msg[name_4];
                    if (!arr)
                        msg[name_4] = arr = [];
                    arr.push(value);
                }
                else {
                    msg[name_4] = value;
                }
            }
            return msg;
        }
        function readValue(tag, bytes) {
            var wireType = tag & 7;
            var value;
            switch (wireType) {
                case 0:
                    value = bytes.readVarint();
                    break;
                case 2:
                    value = readString(bytes);
                    break;
                case 5:
                    value = bytes.readInt();
                    break;
                case 1:
                    value = bytes.readDouble();
                    break;
                default:
                    Log("protobuf的wireType未知");
                    break;
            }
            return value;
        }
        function readString(bytes) {
            var blen = bytes.readVarint();
            return blen > 0 ? bytes.readUTFBytes(blen) : "";
        }
        function readMessage(bytes, msgType) {
            var blen = bytes.readVarint();
            return readFrom(msgType, bytes, blen);
        }
        function readBytes(bytes) {
            var blen = bytes.readVarint();
            return bytes.readByteArray(blen);
        }
        function writeTo(msg, msgType, bytes, debugOutData) {
            if (msg == undefined) {
                return;
            }
            var struct = typeof msgType == "object" ? msgType : structDict[msgType];
            if (!struct) {
                Log("\u975E\u6CD5\u7684\u901A\u4FE1\u7C7B\u578B[" + msgType + "]\uFF0C\u5806\u6808\u4FE1\u606F:" + new Error());
                return;
            }
            if (!bytes) {
                bytes = new rf.ByteArray;
            }
            for (var numberStr in struct) {
                var num = +numberStr;
                var body = struct[num];
                var name_5 = body[0], label = body[1];
                if (label == 1 && !(name_5 in msg)) {
                    continue;
                }
                var value = msg[name_5];
                if (value == undefined || value === body[4]) {
                    continue;
                }
                var type = body[2];
                var subMsgType = body[3];
                var wireType = wireTypeMap[type];
                var tag = (num << 3) | wireType;
                if (label == 3) {
                    if (rf.DEBUG && debugOutData) {
                        var arr = [];
                        debugOutData[name_5] = arr;
                    }
                    for (var key in value) {
                        var element = value[key];
                        if (rf.DEBUG && debugOutData) {
                            arr.push(writeElementTo(element, type, element == undefined ? ((num << 3) | 7) : tag, bytes, subMsgType));
                        }
                        else {
                            writeElementTo(element, type, element == undefined ? ((num << 3) | 7) : tag, bytes, subMsgType);
                        }
                    }
                }
                else {
                    if (rf.DEBUG && debugOutData) {
                        debugOutData[name_5] = writeElementTo(value, type, tag, bytes, subMsgType);
                    }
                    else {
                        writeElementTo(value, type, tag, bytes, subMsgType);
                    }
                }
            }
            return bytes;
        }
        function writeElementTo(value, type, tag, bytes, subMsgType) {
            if (rf.DEBUG) {
                var out = value;
            }
            bytes.writeVarint(tag);
            switch (type) {
                case 7:
                    bytes.writeFix32(checkUInt32(value, type));
                    break;
                case 15:
                    bytes.writeSFix32(checkInt32(value, type));
                    break;
                case 2:
                    bytes.writePBFloat(value);
                    break;
                case 1:
                    bytes.writePBDouble(value);
                    break;
                case 6:
                case 16:
                    bytes.writeFix64(value);
                    break;
                case 5:
                    value = checkInt32(value, type);
                    if (value < 0) {
                        bytes.writeVarint64(value);
                    }
                    else {
                        bytes.writeVarint(value);
                    }
                    break;
                case 17:
                    bytes.writeVarint(zigzag32(checkInt32(value, type)));
                    break;
                case 14:
                case 13:
                    bytes.writeVarint(checkUInt32(value, type));
                    break;
                case 3:
                case 18:
                case 4:
                    bytes.writeVarint64(value);
                    break;
                case 8:
                    bytes.writeVarint(value ? 1 : 0);
                    break;
                case 9:
                case 12:
                case 11:
                    if (type == 11) {
                        if (rf.DEBUG) {
                            out = {};
                            temp = writeTo(value, subMsgType, null, out);
                        }
                        else {
                            var temp = writeTo(value, subMsgType);
                        }
                    }
                    else if (type == 12) {
                        temp = value;
                        if (rf.DEBUG) {
                            out = Uint8Array.from(temp.bytes);
                        }
                    }
                    else {
                        temp = new rf.ByteArray;
                        temp.writeUTFBytes(value);
                    }
                    var len = temp ? temp.length : 0;
                    bytes.writeVarint(len);
                    if (len > 0) {
                        bytes.writeBytes(temp, 0, len);
                    }
                    break;
            }
            if (rf.DEBUG) {
                return out;
            }
        }
        function checkUInt32(value, type) {
            value = +value || 0;
            if (value > 4294967295 || value < 0) {
                Log("PBMessageUtils\u5199\u5165\u6570\u636E\u65F6\u5019\uFF0C\u4F7F\u7528\u7684\u7C7B\u578B\uFF1A" + type + "\uFF0C\u503C\u4E3A\uFF1A" + value + "\uFF0C\u4F46\u8D85\u51FA\u6574\u578B\u8303\u56F4\u3002");
                value >>> 0;
            }
            return value;
        }
        function checkInt32(value, type) {
            value = +value || 0;
            if (value > 2147483647 || value < -2147483648) {
                Log("PBMessageUtils\u5199\u5165\u6570\u636E\u65F6\u5019\uFF0C\u4F7F\u7528\u7684\u7C7B\u578B\uFF1A" + type + "\uFF0C\u503C\u4E3A\uFF1A" + value + "\uFF0C\u4F46\u8D85\u51FA\u6574\u578B\u8303\u56F4\u3002");
                value >> 0;
            }
            return value;
        }
        function zigzag32(n) {
            return (n << 1) ^ (n >> 31);
        }
        function decodeZigzag32(n) {
            return n >> 1 ^ (((n & 1) << 31) >> 31);
        }
    }
    rf.getPBUtils = getPBUtils;
    rf.PBUtils = getPBUtils();
})(rf || (rf = {}));

if (typeof global != "undefined") {
    global["rf"] = rf;
}
if (typeof GameGlobal != "undefined") {
    GameGlobal["rf"] = rf;
}
