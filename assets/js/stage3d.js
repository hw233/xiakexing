
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var rf;
(function (rf) {
    rf.sceneWidth = 0;
    rf.sceneHeight = 0;
    rf.windowWidth = 0;
    rf.windowHeight = 0;
    rf.innerWidth = 0;
    rf.innerHeight = 0;
    rf.lockWidth = 0;
    rf.lockHeight = 0;
    rf.TEMP_RECT = {};
    rf.isWindowResized = false;
    rf.max_vc = 60;
    rf.c_white = "rgb(255,255,255)";
    rf.pixelFont = 1;
    rf.pixelScale = 1;
    rf.softKeyboard = false;
    function isPowerOfTwo(n) {
        return (n !== 0) && ((n & (n - 1)) === 0);
    }
    rf.isPowerOfTwo = isPowerOfTwo;
    function wx_init() {
        var path = "";
        if (path) {
        }
    }
    rf.wx_init = wx_init;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.rf_v3_identity = [0, 0, 0, 1];
    rf.rf_m3_identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    rf.rf_m2_identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    rf.rf_m3_temp = new Float32Array(16);
})(rf || (rf = {}));
Object.defineProperties(Float32Array.prototype, {
    m3_identity: {
        value: function (from) {
            if (!from) {
                from = rf.rf_m3_identity;
            }
            this.set(from);
            return this;
        }
    },
    m3_toString: {
        value: function (scale) {
            var str = "";
            for (var i = 0; i < 16; i++) {
                var d = this[i];
                d = ((i + 1) % 4) == 0 ? d : d / scale;
                str += d + ",";
            }
            return str.slice(0, str.length - 1);
        }
    },
    m3_append: {
        value: function (m3, prepend, from) {
            var a;
            var b;
            if (!prepend) {
                a = from ? from : this;
                b = m3;
            }
            else {
                a = m3;
                b = from ? from : this;
            }
            var _a = a, a11 = _a[0], a12 = _a[1], a13 = _a[2], a14 = _a[3], a21 = _a[4], a22 = _a[5], a23 = _a[6], a24 = _a[7], a31 = _a[8], a32 = _a[9], a33 = _a[10], a34 = _a[11], a41 = _a[12], a42 = _a[13], a43 = _a[14], a44 = _a[15];
            var _b = b, b11 = _b[0], b12 = _b[1], b13 = _b[2], b14 = _b[3], b21 = _b[4], b22 = _b[5], b23 = _b[6], b24 = _b[7], b31 = _b[8], b32 = _b[9], b33 = _b[10], b34 = _b[11], b41 = _b[12], b42 = _b[13], b43 = _b[14], b44 = _b[15];
            this[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            this[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            this[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            this[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
            this[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            this[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            this[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            this[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
            this[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            this[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            this[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            this[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
            this[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            this[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            this[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            this[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
            return this;
        }
    },
    m3_rotation: {
        value: function (angle, axis, prepend, from) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis[0], y = axis[1], z = axis[2];
            var tx = t * x, ty = t * y;
            var b = rf.rf_m3_temp;
            b.set([
                tx * x + c, tx * y + s * z, tx * z - s * y, 0,
                tx * y - s * z, ty * y + c, ty * z + s * x, 0,
                tx * z + s * y, ty * z - s * x, t * z * z + c, 0,
                0, 0, 0, 1
            ]);
            return this.m3_append(b, prepend, from);
        }
    },
    m3_scale: {
        value: function (x, y, z, prepend, from) {
            if (from)
                this.set(from);
            if (prepend) {
                this[0] *= x;
                this[4] *= y;
                this[8] *= z;
                this[1] *= x;
                this[5] *= y;
                this[9] *= z;
                this[2] *= x;
                this[6] *= y;
                this[10] *= z;
                this[3] *= x;
                this[7] *= y;
                this[11] *= z;
            }
            else {
                this[0] *= x;
                this[1] *= y;
                this[2] *= z;
                this[4] *= x;
                this[5] *= y;
                this[6] *= z;
                this[8] *= x;
                this[9] *= y;
                this[10] *= z;
                this[12] *= x;
                this[13] *= y;
                this[14] *= z;
            }
            return this;
        }
    },
    m3_translation: {
        value: function (x, y, z, prepend, from) {
            if (prepend) {
                var b = rf.rf_m3_temp;
                b.set(rf.rf_m3_identity);
                b[12] = x;
                b[13] = y;
                b[14] = z;
                this.m3_append(b, undefined, from);
            }
            else {
                from = from ? from : this;
                this[12] = from[12] + x;
                this[13] = from[13] + y;
                this[14] = from[14] + z;
            }
            return this;
        }
    },
    m3_invert: {
        value: function (from, pos) {
            if (pos === void 0) { pos = true; }
            from = from ? from : this;
            var a = from[0], b = from[1], c = from[2], d = from[3], e = from[4], f = from[5], g = from[6], h = from[7], i = from[8], j = from[9], k = from[10], l = from[11], m = from[12], n = from[13], o = from[14], p = from[15], q = a * f - b * e, r = a * g - c * e, s = a * h - d * e, t = b * g - c * f, u = b * h - d * f, v = c * h - d * g, w = i * n - j * m, x = i * o - k * m, y = i * p - l * m, z = j * o - k * n, A = j * p - l * n, B = k * p - l * o, ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
            this[0] = (f * B - g * A + h * z) * ivd;
            this[1] = (-b * B + c * A - d * z) * ivd;
            this[2] = (n * v - o * u + p * t) * ivd;
            this[3] = (-j * v + k * u - l * t) * ivd;
            this[4] = (-e * B + g * y - h * x) * ivd;
            this[5] = (a * B - c * y + d * x) * ivd;
            this[6] = (-m * v + o * s - p * r) * ivd;
            this[7] = (i * v - k * s + l * r) * ivd;
            this[8] = (e * A - f * y + h * w) * ivd;
            this[9] = (-a * A + b * y - d * w) * ivd;
            this[10] = (m * u - n * s + p * q) * ivd;
            this[11] = (-i * u + j * s - l * q) * ivd;
            if (pos) {
                this[12] = (-e * z + f * x - g * w) * ivd;
                this[13] = (a * z - b * x + c * w) * ivd;
                this[14] = (-m * t + n * r - o * q) * ivd;
            }
            else {
                this[12] = 0;
                this[13] = 0;
                this[14] = 0;
            }
            this[15] = (i * t - j * r + k * q) * ivd;
            return this;
        }
    },
    m3_decompose: {
        value: function (pos, rot, sca, orientationStyle) {
            if (undefined == orientationStyle) {
                orientationStyle = 0;
            }
            var _a = this, m0 = _a[0], m1 = _a[1], m2 = _a[2], m3 = _a[3], m4 = _a[4], m5 = _a[5], m6 = _a[6], m7 = _a[7], m8 = _a[8], m9 = _a[9], m10 = _a[10], m11 = _a[11], m12 = _a[12], m13 = _a[13], m14 = _a[14], m15 = _a[15];
            if (undefined != pos) {
                pos[0] = m12;
                pos[1] = m13;
                pos[2] = m14;
            }
            var sqrt = Math.sqrt, atan2 = Math.atan2;
            var sx = sqrt(m0 * m0 + m1 * m1 + m2 * m2);
            var sy = sqrt(m4 * m4 + m5 * m5 + m6 * m6);
            var sz = sqrt(m8 * m8 + m9 * m9 + m10 * m10);
            if (m0 * (m5 * m10 - m6 * m9) - m1 * (m4 * m10 - m6 * m8) + m2 * (m4 * m9 - m5 * m8) < 0) {
                sz = -sz;
            }
            if (undefined != sca) {
                sca[0] = sx;
                sca[1] = sy;
                sca[2] = sz;
            }
            if (undefined != rot) {
                m0 /= sx;
                m1 /= sx;
                m2 /= sx;
                m4 /= sy;
                m5 /= sy;
                m6 /= sy;
                m8 /= sz;
                m9 /= sz;
                m10 /= sz;
                switch (orientationStyle) {
                    case 0:
                        rot[1] = Math.asin(-m2);
                        if (m2 != 1 && m2 != -1) {
                            rot[0] = atan2(m6, m10);
                            rot[2] = atan2(m1, m0);
                        }
                        else {
                            rot[2] = 0;
                            rot[0] = atan2(-m4, m5);
                        }
                        break;
                    case 2:
                        var tr = m0 + m5 + m10;
                        if (tr > 0) {
                            var rw = sqrt(1 + tr) / 2;
                            rot[3] = rw;
                            rw *= 4;
                            rot[0] = (m6 - m9) / rw;
                            rot[1] = (m8 - m2) / rw;
                            rot[2] = (m1 - m4) / rw;
                        }
                        else if ((m0 > m5) && (m0 > m10)) {
                            var rx = sqrt(1 + m0 - m5 - m10) / 2;
                            rot[0] = rx;
                            rx *= 4;
                            rot[3] = (m6 - m9) / rx;
                            rot[1] = (m1 + m4) / rx;
                            rot[2] = (m8 + m2) / rx;
                        }
                        else if (m5 > m10) {
                            rot[1] = sqrt(1 + m5 - m0 - m10) / 2;
                            rot[0] = (m1 + m4) / (4 * rot[1]);
                            rot[3] = (m8 - m2) / (4 * rot[1]);
                            rot[2] = (m6 + m9) / (4 * rot[1]);
                        }
                        else {
                            rot[2] = sqrt(1 + m10 - m0 - m5) / 2;
                            rot[0] = (m8 + m2) / (4 * rot[2]);
                            rot[1] = (m6 + m9) / (4 * rot[2]);
                            rot[3] = (m1 - m4) / (4 * rot[2]);
                        }
                        break;
                    case 1:
                        rot[3] = Math.acos((m0 + m5 + m10 - 1) / 2);
                        var len = Math.sqrt((m6 - m9) * (m6 - m9) + (m8 - m2) * (m8 - m2) + (m1 - m4) * (m1 - m4));
                        if (len == 0) {
                            rot[0] = 0;
                            rot[1] = 0;
                            rot[2] = 0;
                        }
                        else {
                            rot[0] = (m6 - m9) / len;
                            rot[1] = (m8 - m2) / len;
                            rot[2] = (m1 - m4) / len;
                        }
                        break;
                }
            }
        }
    },
    m3_recompose: {
        value: function (pos, rot, sca, orientationStyle) {
            if (undefined == orientationStyle) {
                orientationStyle = 0;
            }
            var scale_0_1_2 = sca[0], scale_4_5_6 = sca[1], scale_8_9_10 = sca[2];
            if (scale_0_1_2 == 0 || scale_4_5_6 == 0 || scale_8_9_10 == 0)
                return;
            var c0x = pos[0], c0y = pos[1], c0z = pos[2];
            var c1x = rot[0], c1y = rot[1], c1z = rot[2], c1w = rot[3];
            var cos = Math.cos, sin = Math.sin;
            switch (orientationStyle) {
                case 0:
                    {
                        var cx = cos(c1x);
                        var cy = cos(c1y);
                        var cz = cos(c1z);
                        var sx = sin(c1x);
                        var sy = sin(c1y);
                        var sz = sin(c1z);
                        this[0] = cy * cz * scale_0_1_2;
                        this[1] = cy * sz * scale_0_1_2;
                        this[2] = -sy * scale_0_1_2;
                        this[3] = 0;
                        this[4] = (sx * sy * cz - cx * sz) * scale_4_5_6;
                        this[5] = (sx * sy * sz + cx * cz) * scale_4_5_6;
                        this[6] = sx * cy * scale_4_5_6;
                        this[7] = 0;
                        this[8] = (cx * sy * cz + sx * sz) * scale_8_9_10;
                        this[9] = (cx * sy * sz - sx * cz) * scale_8_9_10;
                        this[10] = cx * cy * scale_8_9_10;
                        this[11] = 0;
                        this[12] = c0x;
                        this[13] = c0y;
                        this[14] = c0z;
                        this[15] = 1;
                    }
                    break;
                default:
                    {
                        var x = c1x;
                        var y = c1y;
                        var z = c1z;
                        var w = c1w;
                        if (orientationStyle == 1) {
                            var w_2 = w / 2;
                            var sinW_2 = sin(w_2);
                            x *= sinW_2;
                            y *= sinW_2;
                            z *= sinW_2;
                            w = cos(w_2);
                        }
                        ;
                        this[0] = (1 - 2 * y * y - 2 * z * z) * scale_0_1_2;
                        this[1] = (2 * x * y + 2 * w * z) * scale_0_1_2;
                        this[2] = (2 * x * z - 2 * w * y) * scale_0_1_2;
                        this[3] = 0;
                        this[4] = (2 * x * y - 2 * w * z) * scale_4_5_6;
                        this[5] = (1 - 2 * x * x - 2 * z * z) * scale_4_5_6;
                        this[6] = (2 * y * z + 2 * w * x) * scale_4_5_6;
                        this[7] = 0;
                        this[8] = (2 * x * z + 2 * w * y) * scale_8_9_10;
                        this[9] = (2 * y * z - 2 * w * x) * scale_8_9_10;
                        this[10] = (1 - 2 * x * x - 2 * y * y) * scale_8_9_10;
                        this[11] = 0;
                        this[12] = c0x;
                        this[13] = c0y;
                        this[14] = c0z;
                        this[15] = 1;
                    }
                    break;
            }
            return this;
        }
    },
    m3_copyColumnFrom: {
        value: function (column, vector3D) {
            column *= 4;
            this[column] = vector3D[0];
            this[column + 1] = vector3D[1];
            this[column + 2] = vector3D[2];
            this[column + 3] = vector3D[3];
        }
    },
    m3_copyColumnTo: {
        value: function (column, vector3D) {
            column *= 4;
            vector3D[0] = this[column];
            vector3D[1] = this[column + 1];
            vector3D[2] = this[column + 2];
            vector3D[3] = this[column + 3];
        }
    },
    m3_transformVector: {
        value: function (v, result) {
            var x = v[0], y = v[1], z = v[2], w = v[3];
            if (undefined == result) {
                result = new Float32Array(rf.rf_v3_identity);
            }
            result[0] = x * this[0] + y * this[4] + z * this[8] + w * this[12];
            result[1] = x * this[1] + y * this[5] + z * this[9] + w * this[13];
            result[2] = x * this[2] + y * this[6] + z * this[10] + w * this[14];
            result[3] = x * this[3] + y * this[7] + z * this[11] + w * this[15];
            return result;
        }
    },
    m3_transformVectors: {
        value: function (vin, vout) {
            var i = 0;
            var v = [0, 0, 0];
            var v2 = [0, 0, 0];
            while (i + 3 <= vin.length) {
                v[0] = vin[i];
                v[1] = vin[i + 1];
                v[2] = vin[i + 2];
                this.transformVector(v, v2);
                vout[i] = v2[0];
                vout[i + 1] = v2[1];
                vout[i + 2] = v2[2];
                i += 3;
            }
        }
    },
    m3_transformRotation: {
        value: function (v, result) {
            var x = v[0], y = v[1], z = v[2];
            if (undefined == result) {
                result = new Float32Array(rf.rf_v3_identity);
            }
            result[0] = x * this[0] + y * this[4] + z * this[8];
            result[1] = x * this[1] + y * this[5] + z * this[9];
            result[2] = x * this[2] + y * this[6] + z * this[10];
            return result;
        }
    },
    m3_getMaxScaleOnAxis: {
        value: function () {
            var scaleXSq = this[0] * this[0] + this[1] * this[1] + this[2] * this[2];
            var scaleYSq = this[4] * this[4] + this[5] * this[5] + this[6] * this[6];
            var scaleZSq = this[8] * this[8] + this[9] * this[9] + this[10] * this[10];
            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
        }
    }
});
Object.defineProperties(Float32Array.prototype, {
    v3_lengthSquared: {
        get: function () {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            return x * x + y * y + z * z;
        }
    },
    v2_length: {
        get: function () {
            var _a = this, x = _a[0], y = _a[1];
            return Math.sqrt(x * x + y * y);
        }
    },
    v3_length: {
        get: function () {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
    },
    v3_add: {
        value: function (v, out) {
            var o = out || new Float32Array(4);
            for (var i = 0; i < 3; i++)
                o[i] = this[i] + v[i];
            return o;
        }
    },
    v3_sub: {
        value: function (v, out) {
            var o = out || new Float32Array(4);
            for (var i = 0; i < 3; i++)
                o[i] = this[i] - v[i];
            return o;
        }
    },
    v3_scale: {
        value: function (v, out) {
            if (!out) {
                out = this;
            }
            for (var i = 0; i < 3; i++)
                out[i] = this[i] * v;
            return out;
        }
    },
    v4_scale: {
        value: function (v) {
            this[0] *= v;
            this[1] *= v;
            this[2] *= v;
            this[3] *= v;
        }
    },
    v3_normalize: {
        value: function (from) {
            if (from) {
                this[0] = from[0];
                this[1] = from[1];
                this[2] = from[2];
            }
            var leng = this.v3_length;
            if (leng != 0) {
                var v = 1 / leng;
                this[0] *= v;
                this[1] *= v;
                this[2] *= v;
            }
        }
    },
    v3_dotProduct: {
        value: function (t) {
            return this[0] * t[0] + this[1] * t[1] + this[2] * t[2];
        }
    },
    v3_crossProduct: {
        value: function (t, out) {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            var ax = t[0], ay = t[1], az = t[2];
            if (undefined == out) {
                out = new Float32Array(4);
            }
            out[0] = y * az - z * ay;
            out[1] = z * ax - x * az;
            out[2] = x * ay - y * ax;
            return out;
        }
    },
    v3_applyMatrix4: {
        value: function (e, out) {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            if (undefined == out) {
                out = this;
            }
            var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
            out[0] = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            out[1] = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            out[2] = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
            out[3] = 1;
            return out;
        }
    }
});
Object.defineProperties(Float32Array.prototype, {
    m2_identity: {
        value: function () {
            this.set(rf.rf_m2_identity);
        }
    },
    m2_clone: {
        value: function () {
            return new Float32Array(this);
        }
    },
    m2_scale: {
        value: function (x, y) {
            this[0] *= x;
            this[1] *= y;
            this[3] *= x;
            this[4] *= y;
            this[6] *= x;
            this[7] *= y;
        }
    },
    m2_rotate: {
        value: function (angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var arr = new Float32Array(9);
            arr[0] = cos;
            arr[1] = sin;
            arr[3] = -sin;
            arr[4] = cos;
            this.m2_append(arr);
        }
    },
    m2_translation: {
        value: function (x, y) {
            this[6] += x;
            this[7] += y;
        }
    },
    m2_transformVector: {
        value: function (v, result) {
            var x = v[0], y = v[1];
            if (undefined == result) {
                result = new Float32Array(rf.rf_v3_identity);
            }
            result[0] = x * this[0] + y * this[3] + this[6];
            result[1] = x * this[1] + y * this[4] + this[7];
            return result;
        }
    },
    m2_append: {
        value: function (m2, prepend, from) {
            var a;
            var b;
            if (!prepend) {
                a = from ? from : this;
                b = m2;
            }
            else {
                a = m2;
                b = from ? from : this;
            }
            var _a = a, a11 = _a[0], a12 = _a[1], a13 = _a[2], a21 = _a[3], a22 = _a[4], a23 = _a[5], a31 = _a[6], a32 = _a[7], a33 = _a[8];
            var _b = b, b11 = _b[0], b12 = _b[1], b13 = _b[2], b21 = _b[3], b22 = _b[4], b23 = _b[5], b31 = _b[6], b32 = _b[7], b33 = _b[8];
            this[0] = a11 * b11 + a12 * b21 + a13 * b31;
            this[1] = a11 * b12 + a12 * b22 + a13 * b32;
            this[2] = a11 * b13 + a12 * b23 + a13 * b33;
            this[3] = a21 * b11 + a22 * b21 + a23 * b31;
            this[4] = a21 * b12 + a22 * b22 + a23 * b32;
            this[5] = a21 * b13 + a22 * b23 + a23 * b33;
            this[6] = a31 * b11 + a32 * b21 + a33 * b31;
            this[7] = a31 * b12 + a32 * b22 + a33 * b32;
            this[8] = a31 * b13 + a32 * b23 + a33 * b33;
            return this;
        }
    },
    m2_decompose: {
        value: function (result) {
            var _a = this, m0 = _a[0], m1 = _a[1], m2 = _a[2], m3 = _a[3], m4 = _a[4], m5 = _a[5], m6 = _a[6], m7 = _a[7];
            var sx = Math.sqrt(m0 * m0 + m1 * m1), sy = Math.sqrt(m3 * m3 + m4 * m4);
            var x = m6, y = m7;
            var rotaiton = Math.acos(m0 / sx) * rf.RADIANS_TO_DEGREES;
            if (!result) {
                result = { x: x, y: y, scaleX: sx, scaleY: sy, rotaiton: rotaiton };
            }
            else {
                result.x = x;
                result.y = y;
                result.scaleX = sx;
                result.scaleY = sy;
                result.rotaiton = rotaiton;
            }
            return result;
        }
    },
    m2_recompose: {
        value: function (value) {
            var x = value.x === undefined ? 0 : value.x;
            var y = value.y === undefined ? 0 : value.y;
            var sx = value.scaleX === undefined ? 1 : value.scaleX;
            var sy = value.scaleY === undefined ? 1 : value.scaleY;
            var rotaiton = value.rotaiton === undefined ? 0 : value.rotaiton;
            rotaiton *= rf.DEGREES_TO_RADIANS;
            var cos = Math.cos(rotaiton), sin = Math.sin(rotaiton);
            this[0] = sx * cos;
            this[1] = -sin;
            this[3] = sin;
            this[4] = cos * sy;
            this[6] = x;
            this[7] = y;
        }
    }
});
(function (rf) {
    var DEG_2_RAD = Math.PI / 180;
    function newMatrix3D(v) {
        var out;
        if (v instanceof ArrayBuffer) {
            out = new Float32Array(v);
        }
        else {
            if (undefined != v) {
                out = new Float32Array(v);
            }
            else {
                out = new Float32Array(rf.rf_m3_identity);
            }
        }
        return out;
    }
    rf.newMatrix3D = newMatrix3D;
    function newMatrix(v) {
        var out;
        if (v instanceof ArrayBuffer) {
            out = new Float32Array(v);
        }
        else {
            if (undefined != v) {
                out = new Float32Array(v);
            }
            else {
                out = new Float32Array(rf.rf_m2_identity);
            }
        }
        return out;
    }
    rf.newMatrix = newMatrix;
    function newVector3D(x, y, z, w) {
        if (undefined == x) {
            return new Float32Array(rf.rf_v3_identity);
        }
        if (x instanceof ArrayBuffer) {
            return new Float32Array(x);
        }
        if (undefined == y) {
            y = 0;
        }
        if (undefined == z) {
            z = 0;
        }
        if (undefined == w) {
            w = 0;
        }
        return new Float32Array([Number(x), y, z, w]);
    }
    rf.newVector3D = newVector3D;
    function matrix2d_clearScale(matrix) {
    }
    rf.matrix2d_clearScale = matrix2d_clearScale;
    function qua_lerp(qa, qb, t, out) {
        var qax = qa[0], qay = qa[1], qaz = qa[2], qaw = qa[3];
        var qbx = qb[0], qby = qb[1], qbz = qb[2], qbw = qb[3];
        if (!out) {
            out = newVector3D();
        }
        if (qax * qbx + qay * qby + qaz * qbz + qaw * qbw < 0) {
            out[0] = qax + t * (-qbx - qax);
            out[1] = qay + t * (-qby - qay);
            out[2] = qaz + t * (-qbz - qaz);
            out[3] = qaw + t * (-qbw - qaw);
        }
        else {
            out[0] = qax + t * (qbx - qax);
            out[1] = qay + t * (qby - qay);
            out[2] = qaz + t * (qbz - qaz);
            out[3] = qaw + t * (qbw - qaw);
        }
        return out;
    }
    rf.qua_lerp = qua_lerp;
    function qua_slerp(qa, qb, t, out) {
        var x, y, z, w;
        var x1 = qa[0], y1 = qa[1], z1 = qa[2], w1 = qa[3];
        var x2 = qb[0], y2 = qb[1], z2 = qb[2], w2 = qb[3];
        var dot = x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2;
        if (dot < 0) {
            dot = -dot;
            w2 = -w2;
            x2 = -x2;
            y2 = -y2;
            z2 = -z2;
        }
        if (dot < 0.95) {
            var angle = Math.acos(dot);
            var s = 1 / Math.sin(angle);
            var s1 = Math.sin(angle * (1 - t)) * s;
            var s2 = Math.sin(angle * t) * s;
            w = w1 * s1 + w2 * s2;
            x = x1 * s1 + x2 * s2;
            y = y1 * s1 + y2 * s2;
            z = z1 * s1 + z2 * s2;
        }
        else {
            w = w1 + t * (w2 - w1);
            x = x1 + t * (x2 - x1);
            y = y1 + t * (y2 - y1);
            z = z1 + t * (z2 - z1);
            var len = 1.0 / Math.sqrt(w * w + x * x + y * y + z * z);
            w *= len;
            x *= len;
            y *= len;
            z *= len;
        }
        if (!out) {
            out = newVector3D();
        }
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }
    rf.qua_slerp = qua_slerp;
    function pos_lerp(ap, bp, t, out) {
        var x = ap[0], y = ap[1], z = ap[2];
        if (!out) {
            out = newVector3D();
        }
        out[0] = x + t * (bp[0] - x);
        out[1] = y + t * (bp[1] - y);
        out[2] = z + t * (bp[2] - z);
        return out;
    }
    rf.pos_lerp = pos_lerp;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function size_checkIn(size, nx, ny) {
        var x = size.x, y = size.y, w = size.w, h = size.h;
        w += x;
        h += y;
        return nx > x && nx < w && ny > y && ny < h;
    }
    rf.size_checkIn = size_checkIn;
    function range_checkIn(l, r, t, b, x, y, scale) {
        return x > l * scale && x < r * scale && y > t * scale && y < b * scale;
    }
    rf.range_checkIn = range_checkIn;
    function size_intersection(a, b, c) {
        c = c || {};
        var ax = a.x, ay = a.y, aw = a.w, ah = a.h;
        var bx = b.x, by = b.y, bw = b.w, bh = b.h;
        c.x = Math.max(ax, bx);
        c.y = Math.max(ay, by);
        c.w = Math.min(ax + aw, bx + bw) - c.x;
        c.h = Math.min(ay + ah, by + bh) - c.y;
        return c;
    }
    rf.size_intersection = size_intersection;
    rf.rgb_color_temp = new Float32Array([1, 1, 1, 1]);
    function hexToCSS(d, a) {
        if (a === void 0) { a = 1; }
        var r = ((d & 0x00ff0000) >>> 16) & 0xFF;
        var g = ((d & 0x0000ff00) >>> 8) & 0xFF;
        var b = d & 0x000000ff;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    rf.hexToCSS = hexToCSS;
    function toRGB(color, out) {
        if (undefined == out) {
            out = rf.newVector3D();
        }
        out[0] = ((color & 0x00ff0000) >>> 16) / 0xFF;
        out[1] = ((color & 0x0000ff00) >>> 8) / 0xFF;
        out[2] = (color & 0x000000ff) / 0xFF;
        out[3] = 1.0;
        return out;
    }
    rf.toRGB = toRGB;
    function toRGBA(color, out) {
        out = toRGB(color);
        out[3] = ((color & 0xff000000) >>> 24) / 0xFF;
        return out;
    }
    rf.toRGBA = toRGBA;
    function toCSS(color) {
        return "rgba(" + color[0] * 0xFF + "," + color[1] * 0xFF + "," + color[2] * 0xFF + "," + color[3] * 0xFF + ")";
    }
    rf.toCSS = toCSS;
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Point.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    }());
    rf.Point = Point;
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(x, y, w, h) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            var _this = _super.call(this, x, y) || this;
            _this.w = 0;
            _this.h = 0;
            _this.w = w;
            _this.h = h;
            return _this;
        }
        Rect.prototype.clone = function () {
            return new Rect(this.x, this.y, this.w, this.h);
        };
        return Rect;
    }(Point));
    rf.Rect = Rect;
    rf.RADIANS_TO_DEGREES = 180 / Math.PI;
    rf.DEGREES_TO_RADIANS = Math.PI / 180;
    rf.tempAxeX = rf.newVector3D();
    rf.tempAxeY = rf.newVector3D();
    rf.tempAxeZ = rf.newVector3D();
    rf.X_AXIS = rf.newVector3D(1, 0, 0);
    rf.Y_AXIS = rf.newVector3D(0, 1, 0);
    rf.Z_AXIS = rf.newVector3D(0, 0, 1);
    rf.PI2 = Math.PI * 2;
    rf.RAW_DATA_CONTAINER = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
    rf.TEMP_MATRIX3D = rf.newMatrix3D();
    rf.TEMP_MATRIX2D = rf.newMatrix();
    rf.TEMP_VECTOR3D = rf.newVector3D();
    rf.TEMP_MatrixComposeData = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotaiton: 0 };
    function newCallBackFunction(func, thisobj) {
        return { func: func, thisobj: thisobj };
    }
    rf.newCallBackFunction = newCallBackFunction;
    function callFunction(func) {
        func.func.call(func.thisobj);
    }
    rf.callFunction = callFunction;
    rf.Location = {
        getDist: function (l1, l2) {
            var dtr = rf.DEGREES_TO_RADIANS;
            var radlat1 = l1.latitude * dtr;
            var radlat2 = l2.latitude * dtr;
            var a = radlat1 - radlat2;
            var b = (l1.longitude - l2.longitude) * dtr;
            return Math.asin(Math.sqrt(Math.pow(Math.sin(a * .5), 2) + Math.cos(radlat1) * Math.cos(radlat2) * (Math.pow(Math.sin(b * .5), 2)))) * 12756274;
        }
    };
    rf.EMPTY_POINT2D = new Point();
    rf.EMPTY_POINT2D_2 = new Point();
    rf.EMPTY_POINT2D_3 = new Point();
    rf.EMPTY_SIZE = { x: 0, y: 0, w: 0, h: 0 };
    function m2dTransform(matrix, p, out) {
        var _a = matrix, m11 = _a[0], m12 = _a[1], m13 = _a[2], m21 = _a[3], m22 = _a[4], m23 = _a[5], m31 = _a[6], m32 = _a[7], m33 = _a[8];
        var x = p[0];
        var y = p[1];
        var dx = x * m11 + y * m21;
        var dy = x * m12 + y * m22;
        out[0] = dx + m31;
        out[1] = dy + m32;
    }
    rf.m2dTransform = m2dTransform;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var BitmapData = (function () {
        function BitmapData(width, height, transparent, fillColor) {
            if (transparent === void 0) { transparent = true; }
            if (fillColor === void 0) { fillColor = 0xFFFFFFFF; }
            var canvas = rf.createCanvas();
            canvas.width = width;
            canvas.height = height;
            this.canvas = canvas;
        }
        Object.defineProperty(BitmapData.prototype, "context", {
            get: function () {
                if (!this._context) {
                    var con = this.canvas.getContext("2d");
                    if (con) {
                        this._context = con;
                        con.textAlign = "left";
                        con.textBaseline = "middle";
                    }
                    else {
                        rf.__log("create 2dcontext error! w:" + this.canvas.width + " h:" + this.canvas.height);
                    }
                }
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        BitmapData.fromImageElement = function (img) {
            var bmd = new BitmapData(img.width, img.height, true);
            var context = bmd.context;
            if (context) {
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
            }
            return bmd;
        };
        Object.defineProperty(BitmapData.prototype, "width", {
            get: function () {
                return this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapData.prototype, "height", {
            get: function () {
                return this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapData.prototype, "rect", {
            get: function () {
                return this._rect;
            },
            enumerable: true,
            configurable: true
        });
        BitmapData.prototype.getImageData = function (x, y, w, h) {
            return this.context.getImageData(x, y, w, h);
        };
        BitmapData.prototype.copyPixels = function (sourceBitmapData, sourceRect, destPoint) {
            var context = this.context;
            if (context) {
                if (sourceBitmapData instanceof BitmapData)
                    this.context.drawImage(sourceBitmapData.canvas, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, destPoint.x, destPoint.y, sourceRect.w, sourceRect.h);
                else {
                    this.context.drawImage(sourceBitmapData, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, destPoint.x, destPoint.y, sourceRect.w, sourceRect.h);
                }
            }
        };
        BitmapData.prototype.draw = function (source) {
            var context = this.context;
            if (context) {
                if (source instanceof BitmapData) {
                    context.drawImage(source.canvas, 0, 0);
                }
                else {
                    context.drawImage(source, 0, 0);
                }
            }
        };
        BitmapData.prototype.fillRect = function (x, y, width, height, css) {
            var context = this.context;
            if (context) {
                context.fillStyle = css;
                if (BitmapData.FLIP_Y) {
                    y = this.height - height - y;
                }
                context.fillRect(x, y, width, height);
            }
        };
        BitmapData.FLIP_Y = false;
        return BitmapData;
    }());
    rf.BitmapData = BitmapData;
    var MaxRectsBinPack = (function () {
        function MaxRectsBinPack(width, height, rotations) {
            if (rotations === void 0) { rotations = false; }
            this.binWidth = 0;
            this.binHeight = 0;
            this.allowRotations = false;
            this.usedRects = [];
            this.freeRects = [];
            this.score1 = 0;
            this.score2 = 0;
            this.binWidth = width;
            this.binHeight = height;
            this.allowRotations = rotations;
            var n = new rf.Rect();
            n.x = 0;
            n.y = 0;
            n.w = width;
            n.h = height;
            this.usedRects.length = 0;
            this.freeRects.length = 0;
            this.freeRects.push(n);
        }
        MaxRectsBinPack.prototype.count = function (n) {
            if (n >= 2)
                return this.count(n / 2);
            return n;
        };
        MaxRectsBinPack.prototype.insert = function (width, height, method) {
            if (method === void 0) { method = 0; }
            var newNode = new rf.Rect();
            this.score1 = 0;
            this.score2 = 0;
            switch (method) {
                case MaxRectsBinPack.BESTSHORTSIDEFIT:
                    newNode = this.findPositionForNewNodeBestShortSideFit(width, height);
                    break;
                case MaxRectsBinPack.BOTTOMLEFTRULE:
                    newNode = this.findPositionForNewNodeBottomLeft(width, height, this.score1, this.score2);
                    break;
                case MaxRectsBinPack.CONTACTPOINTRULE:
                    newNode = this.findPositionForNewNodeContactPoint(width, height, this.score1);
                    break;
                case MaxRectsBinPack.BESTLONGSIDEFIT:
                    newNode = this.findPositionForNewNodeBestLongSideFit(width, height, this.score2, this.score1);
                    break;
                case MaxRectsBinPack.BESTAREAFIT:
                    newNode = this.findPositionForNewNodeBestAreaFit(width, height, this.score1, this.score2);
                    break;
            }
            if (newNode.h == 0)
                return newNode;
            this.placeRect(newNode);
            return newNode;
        };
        MaxRectsBinPack.prototype.insert2 = function (Rects, dst, method) {
            dst.length = 0;
            while (Rects.length > 0) {
                var bestScore1 = Infinity;
                var bestScore2 = Infinity;
                var bestRectIndex = -1;
                var bestNode = new rf.Rect();
                for (var i = 0; i < Rects.length; ++i) {
                    var score1 = 0;
                    var score2 = 0;
                    var newNode = this.scoreRect(Rects[i].w, Rects[i].h, method, score1, score2);
                    if (score1 < bestScore1 || (score1 == bestScore1 && score2 < bestScore2)) {
                        bestScore1 = score1;
                        bestScore2 = score2;
                        bestNode = newNode;
                        bestRectIndex = i;
                    }
                }
                if (bestRectIndex == -1)
                    return;
                this.placeRect(bestNode);
                Rects.splice(bestRectIndex, 1);
            }
        };
        MaxRectsBinPack.prototype.placeRect = function (node) {
            var numRectsToProcess = this.freeRects.length;
            for (var i = 0; i < numRectsToProcess; i++) {
                if (this.splitFreeNode(this.freeRects[i], node)) {
                    this.freeRects.splice(i, 1);
                    --i;
                    --numRectsToProcess;
                }
            }
            this.
                pruneFreeList();
            this.usedRects.push(node);
        };
        MaxRectsBinPack.prototype.scoreRect = function (width, height, method, score1, score2) {
            var newNode = new rf.Rect();
            score1 = Infinity;
            score2 = Infinity;
            switch (method) {
                case MaxRectsBinPack.BESTSHORTSIDEFIT:
                    newNode = this.findPositionForNewNodeBestShortSideFit(width, height);
                    break;
                case MaxRectsBinPack.BOTTOMLEFTRULE:
                    newNode = this.findPositionForNewNodeBottomLeft(width, height, score1, score2);
                    break;
                case MaxRectsBinPack.CONTACTPOINTRULE:
                    newNode = this.findPositionForNewNodeContactPoint(width, height, score1);
                    score1 = -score1;
                    break;
                case MaxRectsBinPack.BESTLONGSIDEFIT:
                    newNode = this.findPositionForNewNodeBestLongSideFit(width, height, score2, score1);
                    break;
                case MaxRectsBinPack.BESTAREAFIT:
                    newNode = this.findPositionForNewNodeBestAreaFit(width, height, score1, score2);
                    break;
            }
            if (newNode.h == 0) {
                score1 = Infinity;
                score2 = Infinity;
            }
            return newNode;
        };
        MaxRectsBinPack.prototype.occupancy = function () {
            var usedSurfaceArea = 0;
            for (var i = 0; i < this.usedRects.length; i++)
                usedSurfaceArea += this.usedRects[i].w * this.usedRects[i].h;
            return usedSurfaceArea / (this.binWidth * this.binHeight);
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBottomLeft = function (width, height, bestY, bestX) {
            var bestNode = new rf.Rect();
            bestY = Infinity;
            var rect;
            var topSideY;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    topSideY = rect.y + height;
                    if (topSideY < bestY || (topSideY == bestY && rect.x < bestX)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestY = topSideY;
                        bestX = rect.x;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    topSideY = rect.y + width;
                    if (topSideY < bestY || (topSideY == bestY && rect.x < bestX)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestY = topSideY;
                        bestX = rect.x;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBestShortSideFit = function (width, height) {
            var bestNode = new rf.Rect();
            this.
                bestShortSideFit = Infinity;
            this.bestLongSideFit = this.score2;
            var rect;
            var leftoverHoriz;
            var leftoverVert;
            var shortSideFit;
            var longSideFit;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    leftoverHoriz = Math.abs(rect.w - width);
                    leftoverVert = Math.abs(rect.h - height);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    longSideFit = Math.max(leftoverHoriz, leftoverVert);
                    if (shortSideFit < this.bestShortSideFit || (shortSideFit == this.bestShortSideFit && longSideFit < this.bestLongSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        this.bestShortSideFit = shortSideFit;
                        this.bestLongSideFit = longSideFit;
                    }
                }
                var flippedLeftoverHoriz;
                var flippedLeftoverVert;
                var flippedShortSideFit;
                var flippedLongSideFit;
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    flippedLeftoverHoriz = Math.abs(rect.w - height);
                    flippedLeftoverVert = Math.abs(rect.h - width);
                    flippedShortSideFit = Math.min(flippedLeftoverHoriz, flippedLeftoverVert);
                    flippedLongSideFit = Math.max(flippedLeftoverHoriz, flippedLeftoverVert);
                    if (flippedShortSideFit < this.bestShortSideFit || (flippedShortSideFit == this.bestShortSideFit && flippedLongSideFit < this.bestLongSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        this.bestShortSideFit = flippedShortSideFit;
                        this.bestLongSideFit = flippedLongSideFit;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBestLongSideFit = function (width, height, bestShortSideFit, bestLongSideFit) {
            var bestNode = new rf.Rect();
            bestLongSideFit = Infinity;
            var rect;
            var leftoverHoriz;
            var leftoverVert;
            var shortSideFit;
            var longSideFit;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    leftoverHoriz = Math.abs(rect.w - width);
                    leftoverVert = Math.abs(rect.h - height);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    longSideFit = Math.max(leftoverHoriz, leftoverVert);
                    if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestShortSideFit = shortSideFit;
                        bestLongSideFit = longSideFit;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    leftoverHoriz = Math.abs(rect.w - height);
                    leftoverVert = Math.abs(rect.h - width);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    longSideFit = Math.max(leftoverHoriz, leftoverVert);
                    if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestShortSideFit = shortSideFit;
                        bestLongSideFit = longSideFit;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBestAreaFit = function (width, height, bestAreaFit, bestShortSideFit) {
            var bestNode = new rf.Rect();
            bestAreaFit = Infinity;
            var rect;
            var leftoverHoriz;
            var leftoverVert;
            var shortSideFit;
            var areaFit;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                areaFit = rect.w * rect.h - width * height;
                if (rect.w >= width && rect.h >= height) {
                    leftoverHoriz = Math.abs(rect.w - width);
                    leftoverVert = Math.abs(rect.h - height);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestShortSideFit = shortSideFit;
                        bestAreaFit = areaFit;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    leftoverHoriz = Math.abs(rect.w - height);
                    leftoverVert = Math.abs(rect.h - width);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestShortSideFit = shortSideFit;
                        bestAreaFit = areaFit;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.commonIntervalLength = function (i1start, i1end, i2start, i2end) {
            if (i1end < i2start || i2end < i1start)
                return 0;
            return Math.min(i1end, i2end) - Math.max(i1start, i2start);
        };
        MaxRectsBinPack.prototype.contactPointScoreNode = function (x, y, width, height) {
            var score = 0;
            if (x == 0 || x + width == this.binWidth)
                score += height;
            if (y == 0 || y + height == this.binHeight)
                score += width;
            var rect;
            for (var i = 0; i < this.usedRects.length; i++) {
                rect = this.usedRects[i];
                if (rect.x == x + width || rect.x + rect.w == x)
                    score += this.commonIntervalLength(rect.y, rect.y + rect.h, y, y + height);
                if (rect.y == y + height || rect.y + rect.h == y)
                    score += this.commonIntervalLength(rect.x, rect.x + rect.w, x, x + width);
            }
            return score;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeContactPoint = function (width, height, bestContactScore) {
            var bestNode = new rf.Rect();
            bestContactScore = -1;
            var rect;
            var score;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    score = this.contactPointScoreNode(rect.x, rect.y, width, height);
                    if (score > bestContactScore) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestContactScore = score;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    score = this.contactPointScoreNode(rect.x, rect.y, height, width);
                    if (score > bestContactScore) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestContactScore = score;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.splitFreeNode = function (freeNode, usedNode) {
            if (usedNode.x >= freeNode.x + freeNode.w || usedNode.x + usedNode.w <= freeNode.x ||
                usedNode.y >= freeNode.y + freeNode.h || usedNode.y + usedNode.h <= freeNode.y)
                return false;
            var newNode;
            if (usedNode.x < freeNode.x + freeNode.w && usedNode.x + usedNode.w > freeNode.x) {
                if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.h) {
                    newNode = freeNode.clone();
                    newNode.h = usedNode.y - newNode.y;
                    this.freeRects.push(newNode);
                }
                if (usedNode.y + usedNode.h < freeNode.y + freeNode.h) {
                    newNode = freeNode.clone();
                    newNode.y = usedNode.y + usedNode.h;
                    newNode.h = freeNode.y + freeNode.h - (usedNode.y + usedNode.h);
                    this.freeRects.push(newNode);
                }
            }
            if (usedNode.y < freeNode.y + freeNode.h && usedNode.y + usedNode.h > freeNode.y) {
                if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.w) {
                    newNode = freeNode.clone();
                    newNode.w = usedNode.x - newNode.x;
                    this.freeRects.push(newNode);
                }
                if (usedNode.x + usedNode.w < freeNode.x + freeNode.w) {
                    newNode = freeNode.clone();
                    newNode.x = usedNode.x + usedNode.w;
                    newNode.w = freeNode.x + freeNode.w - (usedNode.x + usedNode.w);
                    this.freeRects.push(newNode);
                }
            }
            return true;
        };
        MaxRectsBinPack.prototype.pruneFreeList = function () {
            for (var i = 0; i < this.freeRects.length; i++)
                for (var j = i + 1; j < this.freeRects.length; j++) {
                    if (this.isContainedIn(this.freeRects[i], this.freeRects[j])) {
                        this.freeRects.splice(i, 1);
                        break;
                    }
                    if (this.isContainedIn(this.freeRects[j], this.freeRects[i])) {
                        this.freeRects.splice(j, 1);
                    }
                }
        };
        MaxRectsBinPack.prototype.isContainedIn = function (a, b) {
            return a.x >= b.x && a.y >= b.y
                && a.x + a.w <= b.x + b.w
                && a.y + a.h <= b.y + b.h;
        };
        MaxRectsBinPack.BESTSHORTSIDEFIT = 0;
        MaxRectsBinPack.BESTLONGSIDEFIT = 1;
        MaxRectsBinPack.BESTAREAFIT = 2;
        MaxRectsBinPack.BOTTOMLEFTRULE = 3;
        MaxRectsBinPack.CONTACTPOINTRULE = 4;
        return MaxRectsBinPack;
    }());
    rf.MaxRectsBinPack = MaxRectsBinPack;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var EngineEvent = (function () {
        function EngineEvent() {
        }
        EngineEvent.VISIBILITY_CHANGE = 'visibility_change';
        EngineEvent.FPS_CHANGE = 'FPS_CHANGE';
        return EngineEvent;
    }());
    rf.EngineEvent = EngineEvent;
    rf.nativeMouseX = 0;
    rf.nativeMouseY = 0;
    rf.originMouseX = 0;
    rf.originMouseY = 0;
    rf.lastUpdateTime = 0;
    rf.lastUpdateDate = 0;
    var _sharedDate = new Date();
    var _utcOffset = -_sharedDate.getTimezoneOffset() * 60000;
    function getUTCTime(time) {
        return time + _utcOffset;
    }
    rf.getUTCTime = getUTCTime;
    function getFormatTime(time, format, isRaw) {
        if (isRaw === void 0) { isRaw = true; }
        if (isRaw) {
            time = getUTCTime(time);
        }
        _sharedDate.setTime(time);
        return _sharedDate.format(format);
    }
    rf.getFormatTime = getFormatTime;
    function getProxTime(sec) {
        sec *= 1000;
        if (sec < 1800) {
            return Math.ceil(sec / 60) + "分钟";
        }
        else if (sec < 86400000) {
            return Math.ceil(sec / 3600) + "小时";
        }
        else if (sec < 604800000) {
            return Math.ceil(sec / 86400000) + "天";
        }
        else {
            return "7天";
        }
    }
    rf.getProxTime = getProxTime;
    function setDisplayArea(width, height) {
        rf.lockStageArea = true;
        rf.lockWidth = width;
        rf.lockHeight = height;
    }
    rf.setDisplayArea = setDisplayArea;
    rf.contextWidth = 0;
    rf.contextHeight = 0;
    rf.appscale = 1;
    function setContextMatrix(width, height, x, y) {
        this.contextWidth = width;
        this.contextHeight = height;
        width *= rf.pixelRatio;
        height *= rf.pixelRatio;
        var scale = 1;
        if (rf.lockStageArea) {
            var sx = width / rf.lockWidth;
            var sy = height / rf.lockHeight;
            if (sx < sy) {
                rf.stageWidth = rf.lockWidth;
                rf.stageHeight = ((rf.lockWidth / rf.contextWidth) * rf.contextHeight >> 0) - y;
                scale = sx;
            }
            else {
                rf.stageWidth = ((rf.lockHeight / rf.contextHeight) * rf.contextWidth >> 0);
                rf.stageHeight = rf.lockHeight - y;
                scale = sy;
            }
        }
        var m = rf.contextMatrix2D;
        m.m3_identity();
        if (rf.deviceOrientation == "landscape") {
            if (rf.currentOrientation == "portrait") {
                m.m3_rotation(90 * rf.DEGREES_TO_RADIANS, rf.Z_AXIS);
                m.m3_translation(rf.stageHeight, 0, 0);
            }
        }
        else if (rf.deviceOrientation == "portrait") {
            if (rf.currentOrientation == "landscape") {
                m.m3_rotation(-90 * rf.DEGREES_TO_RADIANS, rf.Z_AXIS);
                m.m3_translation(0, rf.stageWidth, 0);
            }
            else if (rf.currentOrientation == "landscapeReverse") {
                m.m3_rotation(90 * rf.DEGREES_TO_RADIANS, rf.Z_AXIS);
                m.m3_translation(rf.stageHeight, 0, 0);
            }
            else {
            }
        }
        rf.pixelFont = rf.isMobile ? scale : 1;
        m.m3_scale(scale, scale, 1);
        rf.appscale = scale;
        rf.contextInvMatrix.m3_invert(m);
        if (typeof rf.resetCssStyle != "undefined") {
            var container2d = {};
            container2d.transform = "matrix3d(" + rf.contextMatrix2D.m3_toString(rf.pixelRatio) + ")";
            container2d.width = rf.stageWidth + "px";
            container2d.height = rf.stageHeight + "px";
            rf.resetCssStyle({ container2d: container2d });
        }
    }
    rf.setContextMatrix = setContextMatrix;
    rf.deviceOrientation = "portrait";
    rf.currentOrientation = "portrait";
    function debugDeviceOrientation(orientation) {
        switch (orientation) {
            case 1:
                orientation = "landscape";
                break;
            case 2:
                orientation = "landscapeReverse";
                break;
            case 0:
            default:
                orientation = "portrait";
        }
        rf.deviceOrientation = orientation;
        rf.Engine.resize(rf.windowWidth, rf.windowHeight);
    }
    rf.debugDeviceOrientation = debugDeviceOrientation;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function call(info, ars) {
        var args = [];
        var i = 0;
        if (ars) {
            for (; i < ars.length; i++) {
                args[i] = ars[i];
            }
        }
        var argus = info.args;
        if (argus) {
            for (var j = 0; j < argus.length; j++) {
                args[i++] = argus[j];
            }
        }
        var callback = info.callback;
        if (callback != undefined) {
            try {
                return callback.apply(info.thisObj, args);
            }
            catch (e) {
            }
        }
    }
    var CallbackInfo = (function () {
        function CallbackInfo() {
            this.doRecycle = true;
        }
        CallbackInfo.prototype.init = function (callback, thisObj, args) {
            this.callback = callback;
            this.args = args;
            this.thisObj = thisObj;
        };
        CallbackInfo.prototype.checkHandle = function (callback, thisObj) {
            return this.callback === callback && this.thisObj == thisObj;
        };
        CallbackInfo.prototype.execute = function (doRecycle) {
            var callback = this.callback;
            var result = call(this);
            if (doRecycle == undefined) {
                doRecycle = this.doRecycle;
            }
            if (doRecycle) {
                this.recycle();
            }
            return result;
        };
        CallbackInfo.prototype.call = function () {
            return call(this, arguments);
        };
        CallbackInfo.prototype.callAndRecycle = function () {
            var result = call(this, arguments);
            this.recycle();
            return result;
        };
        CallbackInfo.prototype.onRecycle = function () {
            this.callback = undefined;
            this.args = undefined;
            this.thisObj = undefined;
            this.doRecycle = true;
        };
        CallbackInfo.get = function (callback, thisObj) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var info = rf.recyclable(CallbackInfo);
            info.init(callback, thisObj, args);
            return info;
        };
        return CallbackInfo;
    }());
    rf.CallbackInfo = CallbackInfo;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.refresh_uv_setting = 0.1;
    function refreshUV(vo, mw, mh) {
        var x = vo.x, y = vo.y, w = vo.w, h = vo.h;
        var dx = rf.refresh_uv_setting / mw;
        var dy = rf.refresh_uv_setting / mh;
        vo.ul = x / mw + dx;
        vo.ur = (x + w) / mw - dx;
        vo.vt = y / mh + dy;
        vo.vb = (y + h) / mh - dy;
    }
    rf.refreshUV = refreshUV;
    var BitmapSourceArea = (function () {
        function BitmapSourceArea() {
            this.name = 0;
            this.source = undefined;
            this.frames = {};
        }
        BitmapSourceArea.prototype.init = function () { };
        ;
        BitmapSourceArea.prototype.getArea = function (name, x, y, w, h) {
            var vo = {
                name: name,
                x: x,
                y: y,
                ix: 0,
                iy: 0,
                w: w,
                h: h,
                rw: w,
                rh: h,
                used: 0,
                time: rf.engineNow,
            };
            this.frames[name] = vo;
            return vo;
        };
        BitmapSourceArea.prototype.createFrameArea = function (name, frame) {
            var x = frame.x, y = frame.y, w = frame.w, h = frame.h, ix = frame.ix, iy = frame.iy;
            var vo = this.getArea(name, ix - x, iy - y, w, h);
            if (undefined != vo) {
                vo.ix = ix;
                vo.iy = iy;
            }
            return vo;
        };
        BitmapSourceArea.prototype.getEmptyArea = function (name, sw, sh) {
            return undefined;
        };
        BitmapSourceArea.prototype.getUnusedArea = function (name, sw, sh) {
            var frames = this.frames;
            var vo;
            var now = rf.engineNow;
            vo = frames[name];
            if (!vo) {
                for (var dname in frames) {
                    vo = frames[dname];
                    if (!vo)
                        continue;
                    if (vo.time < now && 0 >= vo.used && sw <= vo.rw && sh <= vo.rh) {
                        frames[vo.name] = undefined;
                        vo.name = name;
                        vo.w = sw;
                        vo.h = sh;
                        vo.time = now;
                        frames[name] = vo;
                        break;
                    }
                    else {
                        vo = undefined;
                    }
                }
            }
            if (vo) {
                this.source.clearBitmap(vo);
                return vo;
            }
            return undefined;
        };
        return BitmapSourceArea;
    }());
    rf.BitmapSourceArea = BitmapSourceArea;
    var MixBitmapSourceArea = (function (_super) {
        __extends(MixBitmapSourceArea, _super);
        function MixBitmapSourceArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MixBitmapSourceArea.prototype.init = function () {
            this.maxRect = new rf.MaxRectsBinPack(this.r - this.l, this.b - this.t);
        };
        MixBitmapSourceArea.prototype.getEmptyArea = function (name, sw, sh) {
            var rect = this.maxRect.insert(sw + 0, sh + 0);
            var vo;
            if (rect.w != 0) {
                vo = this.getArea(name, rect.x + this.l, rect.y + this.t, sw, sh);
            }
            else {
                vo = this.getUnusedArea(name, sw, sh);
            }
            if (vo) {
                this.frames[name] = vo;
            }
            return vo;
        };
        return MixBitmapSourceArea;
    }(BitmapSourceArea));
    rf.MixBitmapSourceArea = MixBitmapSourceArea;
    var BitmapSource = (function (_super) {
        __extends(BitmapSource, _super);
        function BitmapSource() {
            var _this = _super.call(this) || this;
            _this.name = undefined;
            _this.width = 0;
            _this.height = 0;
            _this.originU = 0;
            _this.originV = 0;
            _this.areas = {};
            return _this;
        }
        BitmapSource.prototype.create = function (name, bmd, pack) {
            if (pack === void 0) { pack = false; }
            this.name = name;
            this.bmd = bmd;
            this.width = bmd.width;
            this.height = bmd.height;
            if (pack == false) {
                this.setArea(0, 0, 0, this.width, this.height);
            }
            else {
                this.areas[0] = this.setArea(1, 0, 0, this.width, this.height);
            }
            rf.bitmapSources[name] = this;
            return this;
        };
        BitmapSource.prototype.setArea = function (name, x, y, w, h) {
            var area = this.areas[name];
            if (undefined == area) {
                if (1 == name) {
                    var mix = new MixBitmapSourceArea();
                    area = mix;
                }
                else {
                    area = new BitmapSourceArea();
                }
                area.l = x;
                area.t = y;
                area.r = x + w;
                area.b = y + h;
            }
            else {
                rf.ThrowError("area exist");
                return area;
            }
            area.source = this;
            area.name = name;
            area.init();
            this.areas[name] = area;
            return area;
        };
        BitmapSource.prototype.setSourceVO = function (name, w, h, area, sw, sh) {
            if (area === void 0) { area = 1; }
            if (sw === void 0) { sw = w; }
            if (sh === void 0) { sh = h; }
            var barea = this.areas[area];
            if (undefined == barea) {
                return undefined;
            }
            var vo = barea.getEmptyArea(name, sw, sh);
            if (vo) {
                vo.w = w;
                vo.h = h;
                refreshUV(vo, this.width, this.height);
            }
            return vo;
        };
        BitmapSource.prototype.getSourceVO = function (name, area) {
            if (area === void 0) { area = 0; }
            var barea = this.areas[area];
            if (undefined == barea) {
                return undefined;
            }
            var vo = barea.frames[name];
            if (vo) {
                vo.time = rf.engineNow;
            }
            return vo;
        };
        BitmapSource.prototype.getSprite = function () {
            var sp = this.sp;
            if (!sp) {
                this.sp = sp = new rf.Sprite();
                sp.source = this;
                var vo = this.areas[0].createFrameArea("bitmap_all", { x: 0, y: 0, w: this.width, h: this.height, ix: 0, iy: 0 });
                refreshUV(vo, this.width, this.height);
                var graphics = sp.graphics;
                graphics.clear();
                graphics.drawBitmap(0, 0, vo);
                graphics.end();
            }
            return sp;
        };
        BitmapSource.prototype.drawimg = function (img, x, y, w, h) {
            var _a = this, name = _a.name, textureData = _a.textureData;
            var bmd = this.bmd;
            if (img instanceof rf.BitmapData) {
                img = img.canvas;
            }
            if (w == undefined && h == undefined) {
                bmd.context.drawImage(img, x, y);
            }
            else {
                bmd.context.drawImage(img, x, y, w, h);
            }
            if (textureData) {
                var texture = rf.context3D.textureObj[textureData.key];
                if (undefined != texture) {
                    texture.readly = false;
                }
            }
        };
        BitmapSource.prototype.clearBitmap = function (vo) {
            var x = vo.x, y = vo.y, rw = vo.rw, rh = vo.rh;
            var bmd = this.bmd;
            if (rw && rh) {
                var context = bmd.context;
                context.globalCompositeOperation = "destination-out";
                context.fillStyle = rf.c_white;
                context.fillRect(x, y, rw, rh);
                context.globalCompositeOperation = "source-over";
            }
        };
        BitmapSource.prototype.clearArea = function (area) {
            if (area === void 0) { area = 1; }
            var barea = this.areas[area];
            if (undefined == barea) {
                return undefined;
            }
            var bmd = this.bmd;
            var context = bmd.context;
            context.globalCompositeOperation = "destination-out";
            context.fillStyle = rf.c_white;
            context.fillRect(barea.l, barea.t, barea.r - barea.l, barea.b - barea.t);
            context.globalCompositeOperation = "source-over";
        };
        BitmapSource.prototype.uploadContext = function (program, variable) {
            var texture = this.texture;
            if (!texture) {
                var c = rf.context3D;
                var _a = this, textureData = _a.textureData, bmd = _a.bmd, name_1 = _a.name;
                if (!textureData) {
                    this.textureData = textureData = c.getTextureData(name_1, false);
                }
                texture = textureData.key ? rf.context3D.textureObj[textureData.key] : undefined;
                if (!texture) {
                    texture = rf.context3D.createTexture(textureData, bmd);
                }
                this.texture = texture;
            }
            texture.uploadContext(program, variable);
        };
        BitmapSource.prototype.dispose = function () {
        };
        BitmapSource.DEFAULT = 0;
        BitmapSource.PACK = 1;
        return BitmapSource;
    }(rf.MiniDispatcher));
    rf.BitmapSource = BitmapSource;
    var UrlBitmapSource = (function (_super) {
        __extends(UrlBitmapSource, _super);
        function UrlBitmapSource(perfix, url) {
            var _this = _super.call(this) || this;
            _this.name = url;
            _this.perfix = perfix;
            _this.status = 0;
            _this.completeFuncs = [];
            return _this;
        }
        UrlBitmapSource.prototype.load = function () {
            this.status = 1;
            rf.loadRes(this.perfix, this.name, this.loadImageComplete, this, 5);
        };
        UrlBitmapSource.prototype.loadImageComplete = function (event) {
            var _this = this;
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var bmd = this.bmd = event.data;
            this.width = bmd.width;
            this.height = bmd.height;
            var area = this.setArea(BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            var vo = { x: 0, y: 0, w: bmd.width, h: bmd.height, ix: 0, iy: 0 };
            refreshUV(vo, this.width, this.height);
            area.frames[0] = vo;
            vo = this.getSourceVO("origin") || this.getSourceVO("origin.png");
            if (vo) {
                this.originU = vo.ul;
                this.originV = vo.vt;
            }
            this.status = 2;
            this.simpleDispatch(4);
            this.completeFuncs.forEach(function (element) {
                element(_this);
            });
            this.completeFuncs.length = 0;
        };
        return UrlBitmapSource;
    }(BitmapSource));
    rf.UrlBitmapSource = UrlBitmapSource;
    rf.bitmapSources = {};
    function createBitmapSource(name, w, h, origin) {
        var bmd = new rf.BitmapData(w, h, true);
        var source = new BitmapSource().create(name, bmd, true);
        if (origin) {
            var vo = source.setSourceVO("origin", 1, 1);
            bmd.fillRect(vo.x, vo.y, vo.w, vo.h, "#FFFFFF");
            source.originU = vo.ul;
            source.originV = vo.vt;
        }
        return source;
    }
    rf.createBitmapSource = createBitmapSource;
    function createUrlSource(perfix, url, extendtion, complete, CLS) {
        url = rf.getFullUrl(url, extendtion);
        var source = rf.bitmapSources[url];
        if (!CLS) {
            CLS = UrlBitmapSource;
        }
        if (!source) {
            rf.bitmapSources[url] = source = new CLS(perfix, url);
            source.load();
        }
        else if (source.status == 0) {
            source.load();
        }
        else if (complete && source.status == 2) {
            setTimeout(complete, 10, source);
            return source;
        }
        if (complete) {
            var completes = source.completeFuncs;
            if (completes.indexOf(complete) == -1) {
                completes.push(complete);
            }
        }
        return source;
    }
    rf.createUrlSource = createUrlSource;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Quaternion = (function () {
        function Quaternion(x, y, z, w) {
            if (w === void 0) { w = 1; }
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w;
        }
        Quaternion.lerp = function (qa, qb, percent) {
            var qax = qa.x, qay = qa.y, qaz = qa.z, qaw = qa.w;
            var qbx = qb.x, qby = qb.y, qbz = qb.z, qbw = qb.w;
            if (qax * qbx + qay * qby + qaz * qbz + qaw * qbw < 0) {
                return new Quaternion(qax + percent * (-qbx - qax), qay + percent * (-qby - qay), qaz + percent * (-qbz - qaz), qaw + percent * (-qbw - qaw));
            }
            return new Quaternion(qax + percent * (qbx - qax), qay + percent * (qby - qay), qaz + percent * (qbz - qaz), qaw + percent * (qbw - qaw));
        };
        Quaternion.prototype.fromMatrix3D = function (m) {
            var _a = m, m11 = _a[0], m12 = _a[1], m13 = _a[2], m21 = _a[4], m22 = _a[5], m23 = _a[6], m31 = _a[8], m32 = _a[9], m33 = _a[10];
            var tr = m11 + m22 + m33;
            var tmp;
            if (tr > 0) {
                tmp = 1 / (2 * Math.sqrt(tr + 1));
                this.x = (m23 - m32) * tmp;
                this.y = (m31 - m13) * tmp;
                this.z = (m12 - m21) * tmp;
                this.w = 0.25 / tmp;
            }
            else {
                if ((m11 > m22) && (m11 > m33)) {
                    tmp = 1 / (2 * Math.sqrt(1 + m11 - m22 + m33));
                    this.x = (m21 + m12) * tmp;
                    this.y = (m13 + m31) * tmp;
                    this.z = (m32 - m23) * tmp;
                    this.w = 0.25 / tmp;
                }
                else if ((m22 > m11) && (m22 > m33)) {
                    tmp = 1 / (Math.sqrt(1 + m22 - m11 - m33));
                    this.x = 0.25 / tmp;
                    this.y = (m32 + m23) * tmp;
                    this.z = (m13 - m31) * tmp;
                    this.w = (m21 + m12) * tmp;
                }
                else if ((m33 > m11) && (m33 > m22)) {
                    tmp = 1 / (Math.sqrt(1 + m33 - m11 - m22));
                    this.x = (m32 + m23) * tmp;
                    this.y = 0.25 / tmp;
                    this.z = (m21 - m12) * tmp;
                    this.w = (m13 + m31) * tmp;
                }
            }
            return this;
        };
        Quaternion.prototype.toMatrix3D = function (target) {
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            var x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
            if (!target) {
                target = rf.newMatrix3D();
            }
            var rawData = target;
            rawData[0] = 1 - (yy + zz);
            rawData[1] = xy + wz;
            rawData[2] = xz - wy;
            rawData[3] = 0;
            rawData[4] = xy - wz;
            rawData[5] = 1 - (xx + zz);
            rawData[6] = yz + wx;
            rawData[7] = 0;
            rawData[8] = xz + wy;
            rawData[9] = yz - wx;
            rawData[10] = 1 - (xx + yy);
            rawData[11] = 0;
            rawData[12] = 0;
            rawData[13] = 0;
            rawData[14] = 0;
            rawData[15] = 1;
            return target;
        };
        Quaternion.prototype.fromAxisAngle = function (axis, angleInRadians) {
            var angle = angleInRadians * 0.5;
            var sin_a = Math.sin(angle);
            var cos_a = Math.cos(angle);
            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.w = cos_a;
        };
        Quaternion.prototype.conjugate = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        };
        Quaternion.prototype.toString = function () {
            return "[Quaternion] (x:" + this.x + " ,y:" + this.y + ", z:" + this.z + ", w:" + this.w + ")";
        };
        return Quaternion;
    }());
    rf.Quaternion = Quaternion;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Ray = (function () {
        function Ray(origion, direction) {
            this.origin = rf.newVector3D(origion);
            this.direction = rf.newVector3D(direction);
        }
        Ray.prototype.copyFrom = function (ray) {
            this.origin.set(ray.origin);
            this.direction.set(ray.direction);
            return this;
        };
        Ray.prototype.at = function (t, target) {
            if (target == undefined) {
                target = rf.newVector3D();
            }
            target.set(this.direction);
            target.v3_scale(t);
            target.v3_add(this.origin, target);
            return target;
        };
        Ray.prototype.applyMatrix4 = function (matrix) {
            matrix.m3_transformVector(this.origin, this.origin);
            matrix.m3_transformRotation(this.direction, this.direction);
            return this;
        };
        Ray.prototype.intersectsSphere = function (sphere) {
            return this.distanceSqToPoint(sphere.center) <= sphere.radius;
        };
        Ray.prototype.distanceSqToPoint = function (point) {
            var v1 = rf.TEMP_VECTOR3D;
            v1.set(point);
            v1.v3_sub(this.origin, v1);
            var directionDistance = v1.v3_dotProduct(this.direction);
            if (directionDistance < 0) {
                v1.set(this.origin);
                v1.v3_sub(point, v1);
                return v1.v3_length;
            }
            v1.set(this.direction);
            v1.v3_scale(directionDistance);
            v1.v3_add(this.origin, v1);
            v1.v3_sub(point, v1);
            return v1.v3_length;
        };
        Ray.prototype.intersectBox = function (box, target) {
            var tmin, tmax, tymin, tymax, tzmin, tzmax;
            var invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
            var origin = this.origin;
            if (invdirx >= 0) {
                tmin = (box.minx - origin.x) * invdirx;
                tmax = (box.maxx - origin.x) * invdirx;
            }
            else {
                tmin = (box.maxx - origin.x) * invdirx;
                tmax = (box.minx - origin.x) * invdirx;
            }
            if (invdiry >= 0) {
                tymin = (box.miny - origin.y) * invdiry;
                tymax = (box.maxy - origin.y) * invdiry;
            }
            else {
                tymin = (box.maxy - origin.y) * invdiry;
                tymax = (box.miny - origin.y) * invdiry;
            }
            if ((tmin > tymax) || (tymin > tmax))
                return null;
            if (tymin > tmin || tmin !== tmin)
                tmin = tymin;
            if (tymax < tmax || tmax !== tmax)
                tmax = tymax;
            if (invdirz >= 0) {
                tzmin = (box.minz - origin.z) * invdirz;
                tzmax = (box.maxz - origin.z) * invdirz;
            }
            else {
                tzmin = (box.maxz - origin.z) * invdirz;
                tzmax = (box.minz - origin.z) * invdirz;
            }
            if ((tmin > tzmax) || (tzmin > tmax))
                return null;
            if (tzmin > tmin || tmin !== tmin)
                tmin = tzmin;
            if (tzmax < tmax || tmax !== tmax)
                tmax = tzmax;
            if (tmax < 0)
                return null;
            return this.at(tmin >= 0 ? tmin : tmax, target);
        };
        Ray.prototype.intersectTriangle = function (a, b, c, backfaceCulling, target) {
            var diff = Ray.diff, edge1 = Ray.edge1, edge2 = Ray.edge2, normal = Ray.normal;
            edge1.set(b);
            edge1.v3_sub(a, edge1);
            edge2.set(c);
            edge2.v3_sub(a, edge2);
            normal.set(edge1);
            normal.v3_crossProduct(edge2, normal);
            var DdN = this.direction.v3_dotProduct(normal);
            var sign;
            if (DdN > 0) {
                if (backfaceCulling)
                    return null;
                sign = 1;
            }
            else if (DdN < 0) {
                sign = -1;
                DdN = -DdN;
            }
            else {
                return null;
            }
            diff.set(this.origin);
            diff.v3_sub(a, diff);
            diff.v3_crossProduct(edge2, edge2);
            var DdQxE2 = sign * this.direction.v3_dotProduct(edge2);
            if (DdQxE2 < 0) {
                return null;
            }
            edge1.v3_crossProduct(diff, edge1);
            var DdE1xQ = sign * this.direction.v3_dotProduct(edge1);
            if (DdE1xQ < 0) {
                return null;
            }
            if (DdQxE2 + DdE1xQ > DdN) {
                return null;
            }
            var QdN = -sign * diff.v3_dotProduct(normal);
            if (QdN < 0) {
                return null;
            }
            return this.at(QdN / DdN, target);
        };
        Ray.diff = rf.newVector3D();
        Ray.edge1 = rf.newVector3D();
        Ray.edge2 = rf.newVector3D();
        Ray.normal = rf.newVector3D();
        return Ray;
    }());
    rf.Ray = Ray;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.vertex_ui_variable = {
        "pos": { size: 3, offset: 0 },
        "uv": { size: 4, offset: 3 },
        "color": { size: 4, offset: 7 },
        "data32PerVertex": { size: 11, offset: 0 }
    };
    rf.vertex_ui_full_variable = {
        "pos": { size: 3, offset: 0 },
        "normal": { size: 3, offset: 3 },
        "uv": { size: 4, offset: 6 },
        "color": { size: 4, offset: 10 },
        "data32PerVertex": { size: 14, offset: 0 }
    };
    rf.vertex_mesh_variable = {
        "pos": { size: 3, offset: 0 },
        "normal": { size: 3, offset: 3 },
        "uv": { size: 2, offset: 6 },
        "data32PerVertex": { size: 8, offset: 0 }
    };
    rf.vertex_mesh_full_variable = {
        "pos": { size: 3, offset: 0 },
        "normal": { size: 3, offset: 3 },
        "uv": { size: 2, offset: 6 },
        "color": { size: 4, offset: 8 },
        "data32PerVertex": { size: 12, offset: 0 }
    };
    rf.vertex_skeleton_variable = {
        "index": { size: 4, offset: 0 },
        "weight": { size: 4, offset: 4 },
        "data32PerVertex": { size: 8, offset: 0 }
    };
    rf.EMPTY_MAX_NUMVERTICES = Math.pow(2, 13);
    rf.empty_float32_pos = new Float32Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_normal = new Float32Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_tangent = new Float32Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_uv = new Float32Array(2 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_color = new Float32Array(4 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_uint16_indexs = new Uint16Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_object = {
        "pos": rf.empty_float32_pos,
        "normal": rf.empty_float32_normal,
        "uv": rf.empty_float32_uv,
        "color": rf.empty_float32_color
    };
    function createGeometry(data, variables, numVertices, result) {
        var data32PerVertex = variables["data32PerVertex"].size;
        if (undefined == result) {
            result = new Float32Array(data32PerVertex * numVertices);
        }
        var offset = 0;
        var offsetIndex = 0;
        var offsetData = 0;
        var key = "";
        var index = 0;
        for (var i = 0; i < numVertices; i++) {
            offset = data32PerVertex * i;
            for (key in data) {
                var variable = variables[key];
                if (undefined == variable) {
                    continue;
                }
                var array = data[key];
                offsetData = i * variable.size;
                offsetIndex = offset + variable.offset;
                for (index = 0; index < variable.size; index++) {
                    result[offsetIndex + index] = array[offsetData + index];
                }
            }
        }
        return result;
    }
    rf.createGeometry = createGeometry;
    var VertexInfo = (function () {
        function VertexInfo(value, data32PerVertex, variables) {
            this.numVertices = 0;
            this.data32PerVertex = 0;
            if (value instanceof Float32Array) {
                this.vertex = value;
            }
            else {
                this.vertex = new Float32Array(value);
            }
            this.data32PerVertex = data32PerVertex;
            this.numVertices = this.vertex.length / data32PerVertex;
            this.variables = variables;
        }
        VertexInfo.prototype.regVariable = function (variable, offset, size) {
            if (undefined == this.variables) {
                this.variables = {};
            }
            this.variables[variable] = { size: size, offset: offset };
        };
        Object.defineProperty(VertexInfo.prototype, "debug", {
            get: function () {
                var _a = this, variables = _a.variables, vertex = _a.vertex;
                var o = {};
                var data32PerVertex = variables.data32PerVertex.size;
                for (var i = 0; i < vertex.length; i += data32PerVertex) {
                    for (var key in variables) {
                        if (key == "data32PerVertex") {
                            continue;
                        }
                        var arr = o[key];
                        if (!arr) {
                            o[key] = arr = [];
                        }
                        var variable = variables[key];
                        var size = variable.size, offset = variable.offset;
                        if (size == 1) {
                            arr.push(vertex[i + offset]);
                        }
                        else {
                            var temp = [];
                            for (var j = 0; j < size; j++) {
                                temp.push(vertex[i + offset + j]);
                            }
                            arr.push(temp);
                        }
                    }
                }
                return o;
            },
            enumerable: true,
            configurable: true
        });
        return VertexInfo;
    }());
    rf.VertexInfo = VertexInfo;
    var Sphere = (function () {
        function Sphere() {
            this.change = true;
            this.radius = 0;
            this.center = rf.newVector3D();
        }
        Sphere.prototype.copyFrom = function (sphere) {
            this.center.set(sphere.center);
            this.radius = sphere.radius;
            this.change = false;
        };
        Sphere.prototype.applyMatrix4 = function (matrix, result) {
            result = result || this;
            result.copyFrom(this);
            matrix.m3_transformVector(result.center, result.center);
            result.radius = this.radius * matrix.m3_getMaxScaleOnAxis();
            return result;
        };
        return Sphere;
    }());
    rf.Sphere = Sphere;
    var OBB = (function () {
        function OBB(bounding, maxx, miny, maxy, minz, maxz) {
            this.change = true;
            this.vertex = new Float32Array(24);
            this.index = OBB.index;
            if (bounding != undefined) {
                if (bounding instanceof ArrayBuffer) {
                    this.minx = bounding[0];
                    this.maxx = bounding[1];
                    this.miny = bounding[2];
                    this.maxy = bounding[3];
                    this.minz = bounding[4];
                    this.maxz = bounding[5];
                }
                else {
                    this.minx = Number(bounding);
                    this.maxx = maxx;
                    this.miny = miny;
                    this.maxy = maxy;
                    this.minz = minz;
                    this.maxz = maxz;
                }
                this.updateTriangle();
                this.change = false;
            }
        }
        OBB.prototype.updateTriangle = function () {
            this.vertex[0] = this.minx;
            this.vertex[1] = this.miny;
            this.vertex[2] = this.minz;
            this.vertex[3] = this.minx;
            this.vertex[4] = this.maxy;
            this.vertex[5] = this.minz;
            this.vertex[6] = this.maxx;
            this.vertex[7] = this.maxy;
            this.vertex[8] = this.minz;
            this.vertex[9] = this.maxx;
            this.vertex[10] = this.miny;
            this.vertex[11] = this.minz;
            this.vertex[12] = this.maxx;
            this.vertex[13] = this.miny;
            this.vertex[14] = this.maxz;
            this.vertex[15] = this.maxx;
            this.vertex[16] = this.maxy;
            this.vertex[17] = this.maxz;
            this.vertex[18] = this.minx;
            this.vertex[19] = this.maxy;
            this.vertex[20] = this.maxz;
            this.vertex[21] = this.minx;
            this.vertex[22] = this.miny;
            this.vertex[23] = this.maxz;
        };
        OBB.updateOBBByGeometry = function (mesh, out) {
            var obb = out || new OBB();
            var _a = mesh.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, variables = _a.variables;
            var pos = variables['pos'];
            obb.maxx = obb.minx = vertex[pos.offset];
            obb.maxy = obb.miny = vertex[pos.offset + 1];
            obb.maxz = obb.minz = vertex[pos.offset + 2];
            for (var i = 1; i < numVertices; i++) {
                var p = i * data32PerVertex + pos.offset;
                var x = vertex[p];
                var y = vertex[p + 1];
                var z = vertex[p + 2];
                if (x < obb.minx)
                    obb.minx = x;
                else if (x > obb.maxx)
                    obb.maxx = x;
                if (y < obb.miny)
                    obb.miny = y;
                else if (y > obb.maxy)
                    obb.maxy = y;
                if (z < obb.minz)
                    obb.minz = z;
                else if (z > obb.maxz)
                    obb.maxz = z;
            }
            obb.updateTriangle();
            obb.change = false;
            return obb;
        };
        OBB.index = new Uint16Array([
            0, 1, 2, 0, 2, 3,
            1, 6, 5, 1, 5, 2,
            2, 5, 4, 2, 4, 3,
            3, 4, 7, 3, 7, 0,
            4, 5, 6, 4, 6, 7,
            0, 7, 6, 0, 6, 1
        ]);
        return OBB;
    }());
    rf.OBB = OBB;
    var Temp_Float32Byte = (function () {
        function Temp_Float32Byte() {
            this.data32PerVertex = 1;
            this.numVertices = 0;
            this.position = 0;
            this.data = new Float32Array(2048);
        }
        Temp_Float32Byte.prototype.onSpawn = function () {
            this.data32PerVertex = 1;
            this.numVertices = 0;
            this.position = 0;
        };
        Temp_Float32Byte.prototype.set = function (array, offset) {
            if (undefined == offset) {
                offset = this.position;
            }
            this.data.set(array, offset);
            this.position = offset + array.length;
        };
        Temp_Float32Byte.prototype.toArray = function () {
            var len = this.data32PerVertex * this.numVertices;
            var arr = new Float32Array(len);
            arr.set(this.data.subarray(0, len));
            return arr;
        };
        return Temp_Float32Byte;
    }());
    rf.Temp_Float32Byte = Temp_Float32Byte;
    function geometry_plane(width, height, position, variables, matrix3D) {
        var width_half = width * 0.5;
        var height_half = height * 0.5;
        var points = [
            width_half, height_half, 0, 0, 0,
            -width_half, height_half, 0, 1, 0,
            -width_half, -height_half, 0, 1, 1,
            width_half, -height_half, 0, 0, 1
        ];
        var v = rf.TEMP_VECTOR3D;
        var variable = variables["pos"];
        var pos = variable ? variable.size * 4 : -1;
        variable = variables["normal"];
        var normal = variable ? variable.size * 4 : -1;
        variable = variables["uv"];
        var uv = variable ? variable.size * 4 : -1;
        for (var i = 0; i < 4; i++) {
            var p = i * 5;
            if (-1 != pos) {
                v.x = points[p];
                v.y = points[p + 1];
                v.z = points[p + 2];
                v.w = 1.0;
                if (undefined != matrix3D) {
                    matrix3D.m3_transformVector(v, v);
                }
                rf.empty_float32_pos.wPoint3(position * pos + (i * 3), v.x, v.y, v.z);
            }
            if (-1 != normal) {
                v.x = 0;
                v.y = 0;
                v.z = 1;
                if (undefined != matrix3D) {
                    matrix3D.m3_transformRotation(v, v);
                }
                rf.empty_float32_normal.wPoint3(position * normal + (i * 3), -v.x, -v.y, v.z);
            }
            if (-1 != uv) {
                rf.empty_float32_uv.wPoint2(position * uv + (i * 2), points[p + 3], points[p + 4]);
            }
        }
    }
    rf.geometry_plane = geometry_plane;
    var GeometryBase = (function () {
        function GeometryBase(variables) {
            this.data32PerVertex = 0;
            this.numVertices = 0;
            this.centerPoint = rf.newVector3D();
            this.numTriangles = 0;
            if (undefined == variables) {
                variables = rf.vertex_mesh_variable;
            }
            this.variables = variables;
            this.data32PerVertex = variables["data32PerVertex"].size;
        }
        GeometryBase.prototype.initData = function (data) {
            var c = rf.context3D;
            var variables = data.variables, data32PerVertex = data.data32PerVertex, vertex = data.vertex, index = data.index, vertexBuffer = data.vertexBuffer, indexBuffer = data.indexBuffer;
            if (!vertexBuffer) {
                var info = new VertexInfo(vertex, data32PerVertex, variables);
                data.vertexBuffer = vertexBuffer = c.createVertexBuffer(info);
            }
            if (!indexBuffer) {
                if (index) {
                    data.indexBuffer = indexBuffer = c.createIndexBuffer(index);
                }
            }
        };
        GeometryBase.prototype.setData = function (data) {
            this.data = data;
            var meshVar = data.variables, numVertices = data.numVertices, numTriangles = data.numTriangles, data32PerVertex = data.data32PerVertex;
            var variables = this.variables;
            var c = rf.context3D;
            if (!meshVar) {
                data.variables = variables;
                data.data32PerVertex = data32PerVertex;
            }
            else {
                variables = data.variables;
            }
            this.numVertices = numVertices;
            this.numTriangles = numTriangles;
            this.data32PerVertex = data32PerVertex;
            this.initData(data);
            var vertexBuffer = data.vertexBuffer, indexBuffer = data.indexBuffer;
            this.vertex = vertexBuffer;
            this.index = indexBuffer;
        };
        Object.defineProperty(GeometryBase.prototype, "pos", {
            get: function () {
                var _a = this.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex;
                var pos = [];
                for (var i = 0; i < numVertices; i++) {
                    var p = i * data32PerVertex;
                    pos.push([vertex[p], vertex[p + 1], vertex[p + 2]]);
                }
                return pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryBase.prototype, "uv", {
            get: function () {
                var _a = this.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, variables = _a.variables;
                var uv = variables["uv"];
                var uvs = [];
                for (var i = 0; i < numVertices; i++) {
                    var p = i * data32PerVertex + uv.offset;
                    uvs.push([vertex[p], vertex[p + 1]]);
                }
                return uvs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryBase.prototype, "triangles", {
            get: function () {
                var numTriangles = this.numTriangles;
                var data = this.index.data;
                var triangles = [];
                for (var i = 0; i < numTriangles; i++) {
                    var p = i * 3;
                    triangles.push([data[p], data[p + 1], data[p + 2]]);
                }
                return triangles;
            },
            enumerable: true,
            configurable: true
        });
        GeometryBase.prototype.calculateBoundingSphere = function (center, out) {
            var sphere = out || new Sphere();
            var _a = this.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, variables = _a.variables;
            var minR = 0;
            var pos = variables['pos'];
            for (var i = 0; i < numVertices; i++) {
                var p = i * data32PerVertex + pos.offset;
                var x = vertex[p];
                var y = vertex[p + 1];
                var z = vertex[p + 2];
                x -= center.x;
                x *= x;
                y -= center.y;
                y *= y;
                z -= center.z;
                z *= z;
                var dis = Math.sqrt(x + y + z);
                if (dis > minR) {
                    minR = dis;
                }
            }
            sphere.center.set(center);
            sphere.radius = minR;
            sphere.change = false;
            return sphere;
        };
        GeometryBase.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var c = rf.context3D;
            this.vertex.uploadContext(program);
            var sceneTransform = mesh.sceneTransform, invSceneTransform = mesh.invSceneTransform;
            var worldTranform = rf.TEMP_MATRIX3D;
            worldTranform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            c.setProgramConstantsFromMatrix("invm", invSceneTransform);
            return worldTranform;
        };
        return GeometryBase;
    }());
    rf.GeometryBase = GeometryBase;
    var SkeletonGeometry = (function (_super) {
        __extends(SkeletonGeometry, _super);
        function SkeletonGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkeletonGeometry;
    }(GeometryBase));
    rf.SkeletonGeometry = SkeletonGeometry;
    var PlaneGeometry = (function (_super) {
        __extends(PlaneGeometry, _super);
        function PlaneGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlaneGeometry.prototype.create = function (width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            var numVertices = 0;
            var quad = 0;
            var variables = this.variables;
            var matrix3D = rf.newMatrix3D();
            geometry_plane(width, height, 0, variables);
            numVertices += 4;
            quad++;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.getIndexByQuad(quad);
            this.numVertices = numVertices;
            this.numTriangles = quad * 2;
            return this;
        };
        return PlaneGeometry;
    }(GeometryBase));
    rf.PlaneGeometry = PlaneGeometry;
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BoxGeometry.prototype.create = function (width, height, depth) {
            var matrix3D = rf.newMatrix3D();
            var numVertices = 0;
            var quad = 0;
            var variables = this.variables;
            matrix3D.m3_translation(0, 0, depth * 0.5);
            geometry_plane(width, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(180 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
            matrix3D.m3_translation(0, 0, -depth * 0.5);
            geometry_plane(width, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(-90 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
            matrix3D.m3_translation(width * 0.5, 0, 0);
            geometry_plane(depth, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(90 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
            matrix3D.m3_translation(-width * 0.5, 0, 0);
            geometry_plane(depth, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(90 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
            matrix3D.m3_translation(0, height * 0.5, 0);
            geometry_plane(width, depth, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(-90 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
            matrix3D.m3_translation(0, -height * 0.5, 0);
            geometry_plane(width, depth, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.getIndexByQuad(quad);
            this.numVertices = numVertices;
            this.numTriangles = quad * 2;
            return this;
        };
        return BoxGeometry;
    }(GeometryBase));
    rf.BoxGeometry = BoxGeometry;
    var SkyBoxGeometry = (function (_super) {
        __extends(SkyBoxGeometry, _super);
        function SkyBoxGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkyBoxGeometry.prototype.create = function () {
            return _super.prototype.create.call(this, 500., 500., 500.);
        };
        SkyBoxGeometry.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var c = rf.context3D;
            this.vertex.uploadContext(program);
            var sceneTransform = mesh.sceneTransform, invSceneTransform = mesh.invSceneTransform;
            var worldTranform = rf.TEMP_MATRIX3D;
            sceneTransform[12] = camera.pos[0];
            sceneTransform[13] = camera.pos[1];
            sceneTransform[14] = camera.pos[2];
            worldTranform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            c.setProgramConstantsFromMatrix("invm", invSceneTransform);
            return worldTranform;
        };
        return SkyBoxGeometry;
    }(BoxGeometry));
    rf.SkyBoxGeometry = SkyBoxGeometry;
    function hsva(h, s, v, a) {
        if (s > 1 || v > 1 || a > 1) {
            return;
        }
        var th = h % 360;
        var i = Math.floor(th / 60);
        var f = th / 60 - i;
        var m = v * (1 - s);
        var n = v * (1 - s * f);
        var k = v * (1 - s * (1 - f));
        var color = [];
        var r = [v, n, m, m, k, v];
        var g = [k, v, v, n, m, m];
        var b = [m, m, k, v, v, n];
        color.push(r[i], g[i], b[i], a);
        return color;
    }
    rf.hsva = hsva;
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SphereGeometry.prototype.create = function (row, column, rad, color) {
            var numVertices = 0;
            for (var i = 0; i <= row; i++) {
                var r = Math.PI / row * i;
                var ry = Math.cos(r);
                var rr = Math.sin(r);
                for (var ii = 0; ii <= column; ii++) {
                    var tr = Math.PI * 2 / column * ii;
                    var tx = rr * rad * Math.cos(tr);
                    var ty = ry * rad;
                    var tz = rr * rad * Math.sin(tr);
                    var rx = rr * Math.cos(tr);
                    var rz = rr * Math.sin(tr);
                    var tc = color;
                    if (undefined == tc) {
                        tc = hsva(360 / row * i, 1, 1, 1);
                    }
                    rf.empty_float32_pos.wPoint3(numVertices * 3, tx, ty, tz);
                    rf.empty_float32_normal.wPoint3(numVertices * 3, rx, ry, rz);
                    rf.empty_float32_uv.wPoint2(numVertices * 2, 1 - 1 / column * ii, 1 / row * i);
                    rf.empty_float32_color.wPoint4(numVertices * 4, tc[0], tc[1], tc[2], tc[3]);
                    numVertices++;
                }
            }
            var position = 0;
            for (var i = 0; i < row; i++) {
                for (var ii = 0; ii < column; ii++) {
                    var r = (column + 1) * i + ii;
                    rf.empty_uint16_indexs.set([r, r + 1, r + column + 2, r, r + column + 2, r + column + 1], position);
                    position += 6;
                }
            }
            var variables = this.variables;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.createIndexBuffer(rf.empty_uint16_indexs.slice(0, position));
            this.numVertices = numVertices;
            this.numTriangles = position / 3;
            return this;
        };
        return SphereGeometry;
    }(GeometryBase));
    rf.SphereGeometry = SphereGeometry;
    var TorusGeomerty = (function (_super) {
        __extends(TorusGeomerty, _super);
        function TorusGeomerty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TorusGeomerty.prototype.create = function (row, column, irad, orad) {
            var numVertices = 0;
            for (var i = 0; i <= row; i++) {
                var r = Math.PI * 2 / row * i;
                var rr = Math.cos(r);
                var ry = Math.sin(r);
                for (var ii = 0; ii <= column; ii++) {
                    var tr = Math.PI * 2 / column * ii;
                    var tx = (rr * irad + orad) * Math.cos(tr);
                    var ty = ry * irad;
                    var tz = (rr * irad + orad) * Math.sin(tr);
                    var rx = rr * Math.cos(tr);
                    var rz = rr * Math.sin(tr);
                    var rs = 1 / column * ii;
                    var rt = 1 / row * i + 0.5;
                    if (rt > 1.0) {
                        rt -= 1.0;
                    }
                    rt = 1.0 - rt;
                    rf.empty_float32_pos.wPoint3(numVertices * 3, tx, ty, tz);
                    rf.empty_float32_normal.wPoint3(numVertices * 3, rx, ry, rz);
                    rf.empty_float32_uv.wPoint2(numVertices * 2, rs, rt);
                    numVertices++;
                }
            }
            var position = 0;
            for (i = 0; i < row; i++) {
                for (ii = 0; ii < column; ii++) {
                    r = (column + 1) * i + ii;
                    rf.empty_uint16_indexs.set([r, r + column + 1, r + 1, r + column + 1, r + column + 2, r + 1], position);
                    position += 6;
                }
            }
            var variables = this.variables;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.createIndexBuffer(rf.empty_uint16_indexs.slice(0, position));
            this.numVertices = numVertices;
            this.numTriangles = position / 3;
            return this;
        };
        return TorusGeomerty;
    }(GeometryBase));
    rf.TorusGeomerty = TorusGeomerty;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Material = (function () {
        function Material() {
            this.depthMask = false;
            this.sun = true;
        }
        Material.prototype.createProgram = function (mesh) {
            this.initFilters(mesh);
            var shader = rf.singleton(rf.Shader);
            var p = shader.createProgram(mesh);
            this.program = p;
            return p;
        };
        Material.prototype.initFilters = function (mesh) {
            var filters = mesh.filters;
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["normal_"] = rf.singleton(rf.NormalFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
            filters["diff_"] = rf.singleton(rf.DiffFilter);
            if (mesh.skData) {
                filters["skeleton_"] = rf.singleton(rf.SkeletonFilter);
            }
            if (this.sun) {
                filters["sun_"] = rf.singleton(rf.SunFilter);
            }
            filters["discard_"] = rf.singleton(rf.DiscardFilter);
        };
        Material.prototype.setData = function (data) {
            if (!data) {
                this.cull = 0;
                this.depthMask = true;
                this.passCompareMode = 515;
                this.srcFactor = 770;
                this.dstFactor = 771;
                this.alphaTest = -1;
            }
            else {
                var cull = data.cull, depthMask = data.depthMask, passCompareMode = data.passCompareMode, srcFactor = data.srcFactor, dstFactor = data.dstFactor, alphaTest = data.alphaTest, diffTex = data.diffTex;
                this.cull = (undefined != cull) ? cull : 1029;
                this.depthMask = undefined != depthMask ? depthMask : true;
                this.passCompareMode = passCompareMode ? passCompareMode : 515;
                this.srcFactor = srcFactor ? srcFactor : 770;
                this.dstFactor = dstFactor ? dstFactor : 771;
                this.alphaTest = ~~alphaTest;
                if (diffTex) {
                    this.diffTex = diffTex;
                }
            }
        };
        Material.prototype.uploadContextSetting = function () {
            var setting = rf.context3D.setting;
            var _a = this, cull = _a.cull, srcFactor = _a.srcFactor, dstFactor = _a.dstFactor, depthMask = _a.depthMask, passCompareMode = _a.passCompareMode;
            setting.cull = cull;
            setting.depth = depthMask;
            setting.depthMode = passCompareMode;
            setting.src = srcFactor;
            setting.dst = dstFactor;
        };
        Material.prototype.uploadContext = function (camera, mesh, now, interval) {
            var _a = this, program = _a.program, diffTex = _a.diffTex;
            var filters = mesh.filters;
            var filter;
            if (mesh.shader) {
                mesh.shader = false;
                program = undefined;
            }
            if (!program) {
                var b = this.checkTexs(diffTex);
                if (false == b) {
                    return false;
                }
                for (var key in filters) {
                    filter = filters[key];
                    if (!filter.readly) {
                        return false;
                    }
                }
                this.program = program = this.createProgram(mesh);
            }
            var c = rf.context3D;
            c.setProgram(program);
            this.uploadContextSetting();
            for (var key in filters) {
                filter = filters[key];
                filter.setProgramConstants(c, program, mesh, camera);
            }
            if (diffTex) {
                var t = void 0;
                t = c.textureObj[diffTex.key];
                if (t) {
                    t.uploadContext(program, "diff");
                }
            }
            return true;
        };
        Material.prototype.checkTexs = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var c = rf.context3D;
            var b = true;
            args.forEach(function (data) {
                if (undefined != data) {
                    var tex = void 0;
                    if (data.key) {
                        tex = c.textureObj[data.key];
                    }
                    if (undefined == tex) {
                        tex = c.createTexture(data, undefined);
                        b = false;
                    }
                    var readly = tex.readly, status_1 = tex.status;
                    if (false == readly) {
                        if (2 != status_1) {
                            if (0 == status_1) {
                                tex.load(_this.getTextUrl(data));
                            }
                            b = false;
                        }
                    }
                }
            });
            return b;
        };
        Material.prototype.getTextUrl = function (data) {
            return data.url;
        };
        return Material;
    }());
    rf.Material = Material;
    var ShadowMaterial = (function (_super) {
        __extends(ShadowMaterial, _super);
        function ShadowMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShadowMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var _a = this, program = _a.program, diffTex = _a.diffTex;
            if (!program) {
                this.program = program = this.createProgram(mesh);
            }
            var c = rf.context3D;
            c.setProgram(program);
            this.uploadContextSetting();
            return true;
        };
        ShadowMaterial.prototype.createProgram = function (mesh) {
            var c = rf.context3D;
            var key = "ShadowMaterial";
            var p = c.programs[key];
            if (undefined != p) {
                return p;
            }
            var skAnim = mesh.skAnim;
            var v_def = "";
            if (undefined != skAnim) {
                key += "-skeleton";
                v_def += "#define USE_SKINNING\n           #define MAX_BONES 100\n";
            }
            var vertexCode = "\n                precision mediump float;\n\n                " + v_def + "\n\n\n\n                attribute vec3 " + "pos" + ";\n                uniform mat4 " + "mvp" + ";\n\n                mat4 qua2mat(vec4 qua,vec4 pos){\n                    vec4 t1 = qua * qua;\n                    vec3 t2 = 2.0 * qua.xxx * qua.yzw;\n                    vec3 t3 = 2.0 * qua.yyz * qua.zww;\n                    return mat4(\n                        t1.x - t1.y - t1.z + t1.w , t2.x + t3.z , t2.y - t3.y , 0.0 ,\n                        t2.x - t3.z , -t1.x + t1.y - t1.z + t1.w , t3.x + t2.z , 0.0 ,\n                        t2.y + t3.y , t3.x - t2.z , -t1.x - t1.y + t1.z + t1.w , 0.0 ,\n                        pos.x,pos.y,pos.z,1.0\n                    );\n                }\n\n\n#ifdef USE_SKINNING\n                attribute vec4 " + "index" + ";\n                attribute vec4 " + "weight" + ";\n                uniform vec4 " + "bones" + "[ MAX_BONES ];\n                mat4 getBoneMatrix( const in float i ) {\n                    float d = i * 2.0;\n                    vec4 qua = " + "bones" + "[ int(d) ];\n                    vec4 pos = " + "bones" + "[ int(d + 1.0) ];\n                    return qua2mat(qua,pos);\n                }\n#endif\n                void main(void){\n                    vec4 t_pos = vec4(" + "pos" + ",1.0);\n\n                    #ifdef USE_SKINNING\n                        mat4 skinMatrix = mat4( 0.0 );\n                        skinMatrix += " + "weight" + ".x * getBoneMatrix( " + "index" + ".x );\n                        skinMatrix += " + "weight" + ".y * getBoneMatrix( " + "index" + ".y );\n                        skinMatrix += " + "weight" + ".z * getBoneMatrix( " + "index" + ".z );\n                        skinMatrix += " + "weight" + ".w * getBoneMatrix( " + "index" + ".w );\n                        t_pos = skinMatrix * t_pos;\n                    #endif\n\n                    gl_Position = " + "mvp" + " * t_pos;\n                }\n            ";
            var fragmentCode = "\n                precision mediump float;\n\n                const vec3 PackFactors2 = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const float PackUpscale = 256. / 255.;\n                const float ShiftRight8 = 1. / 256.;\n\n                vec4 packDepthToRGBA( float v ) {\n                    vec4 r = vec4( fract( v * PackFactors2 ), v );\n                    r.yzw -= r.xyz * ShiftRight8;\n                    return r * PackUpscale;\n                }\n\n\n                const float UnpackDownscale = 255. / 256.;\n                const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n                float unpackRGBAToDepth( const in vec4 v ) {\n                    return dot( v, UnpackFactors );\n                }\n\n                varying vec4 vPos;\n                void main(void){\n                    // gl_FragColor = vec4(vec3(gl_FragCoord.z),1.0);\n                    gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n                }\n                \n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return ShadowMaterial;
    }(Material));
    rf.ShadowMaterial = ShadowMaterial;
    var SkyBoxMaterial = (function (_super) {
        __extends(SkyBoxMaterial, _super);
        function SkyBoxMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkyBoxMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var scene = mesh.scene;
            var c = rf.context3D;
            var diffTex = this.diffTex;
            var skAnim = mesh.skAnim;
            if (!diffTex) {
                return false;
            }
            var b = this.checkTexs(diffTex);
            if (false == b) {
                return false;
            }
            _super.prototype.uploadContext.call(this, camera, mesh, now, interval);
            var program = this.program;
            var t;
            t = c.textureObj[diffTex.key];
            t.uploadContext(program, "diff");
            return true;
        };
        SkyBoxMaterial.prototype.checkTexs = function (data) {
            var c = rf.context3D;
            var b = true;
            var tex;
            if (data.key) {
                tex = c.textureObj[data.key];
            }
            if (undefined == tex) {
                tex = c.createCubeTexture(data);
                b = false;
            }
            var readly = tex.readly, status = tex.status;
            if (false == readly) {
                if (2 != status) {
                    if (0 == status) {
                        tex.load(this.getTextUrl(data));
                    }
                    b = false;
                }
            }
            return b;
        };
        SkyBoxMaterial.prototype.createProgram = function (mesh) {
            var c = rf.context3D;
            var f_def = "";
            var v_def = "";
            var key = "SkyBoxMaterial";
            key += "-diff";
            f_def += "#define DIFF\n";
            var p = c.programs[key];
            if (undefined != p) {
                return p;
            }
            var vertexCode = "\n                precision mediump float;\n                " + v_def + "\n                attribute vec3 " + "pos" + ";\n                attribute vec2 " + "uv" + ";\n                \n                uniform mat4 " + "mvp" + ";\n\n                varying vec3 v_texCoord;\n\n                void main() {\n                    vec4 t_pos = vec4(" + "pos" + ", 1.0);\n                    \n                    v_texCoord = " + "pos" + ";\n\n                    t_pos = " + "mvp" + " * t_pos;\n                    \n                    gl_Position = t_pos.xyww;\n                }\n            ";
            var fragmentCode = "\n            precision mediump float;    \n\n            " + f_def + "\n\n            uniform samplerCube " + "diff" + ";\n            \n            uniform vec4 " + "vc_diff" + ";\n            uniform vec4 " + "vc_emissive" + ";\n            \n            varying vec3 v_texCoord;\n\n            void main(void){\n\n                vec4 c = textureCube(" + "diff" + ", v_texCoord);\n                \n                gl_FragColor = c;\n            }\n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return SkyBoxMaterial;
    }(Material));
    rf.SkyBoxMaterial = SkyBoxMaterial;
    var PhongMaterial = (function (_super) {
        __extends(PhongMaterial, _super);
        function PhongMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PhongMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var diffTex = this.diffTex;
            if (!diffTex) {
                return false;
            }
            var b = this.checkTexs(diffTex);
            if (false == b) {
                return false;
            }
            var c = rf.context3D;
            var skAnim = mesh.skAnim, scene = mesh.scene, shader = mesh.shader;
            _super.prototype.uploadContext.call(this, camera, mesh, now, interval);
            var program = this.program;
            var sun = scene.sun;
            c.setProgramConstantsFromVector("lightDirection", sun.normalsize, 4);
            if (mesh.shadowTarget) {
                rf.ROOT.shadow.rtt.uploadContext(program, "shadow");
            }
            if (rf.context3D.logarithmicDepthBuffer) {
                c.setProgramConstantsFromVector("logDepthFar", camera.logDepthFar, 1, false);
            }
            return true;
        };
        PhongMaterial.prototype.createProgram = function (mesh) {
            var diffTex = this.diffTex;
            var skAnim = mesh.skAnim, shadowTarget = mesh.shadowTarget, filters = mesh.filters;
            var c = rf.context3D;
            var f_def = "";
            var v_def = "";
            var key = "PhongMaterial";
            if (undefined != diffTex) {
                key += "-diff";
                f_def += "#define DIFF\n";
            }
            if (shadowTarget) {
                key += "-shadow";
                f_def += "#define SHADOW\n";
                v_def += "#define SHADOW\n";
            }
            if (undefined != skAnim) {
                key += "-skeleton";
                v_def += "#define USE_SKINNING\n           #define MAX_BONES 100\n";
            }
            var filter = filters["liuguang_"];
            if (filter) {
                if (filter.readly) {
                    key += filter.skey;
                    f_def += "#define LIU_GUANG\n";
                    v_def += "#define LIU_GUANG\n";
                }
            }
            filter = filters[5];
            if (filter) {
                key += filter.skey;
                v_def += "#define UV_ANIM\n";
            }
            filter = filters[31];
            if (filter) {
                key += filter.skey;
                f_def += "#define COLOR_TRANFORM\n";
            }
            if (rf.context3D.logarithmicDepthBuffer) {
                key += "-log_depth_buffer";
                v_def += "#define LOG_DEPTH_BUFFER\n";
                f_def += "#define LOG_DEPTH_BUFFER\n";
                if (rf.context3D.use_logdepth_ext) {
                    key += "_ext";
                    v_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                    f_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                }
            }
            var p = c.programs[key];
            if (undefined != p) {
                return p;
            }
            var vertexCode = "\n        // precision mediump float;\n        " + v_def + "\n        attribute vec3 " + "pos" + ";\n        attribute vec3 " + "normal" + ";\n        attribute vec2 " + "uv" + ";\n        #ifdef USE_SKINNING\n            attribute vec4 " + "index" + ";\n            attribute vec4 " + "weight" + ";\n        #endif\n        uniform mat4 " + "mvp" + ";\n        uniform mat4 " + "invm" + ";\n        uniform vec4 " + "lightDirection" + ";\n        uniform mat4 " + "sunmvp" + ";\n\n        varying vec4 vDiffuse;\n        varying vec2 vUV;\n        varying vec4 vShadowUV;\n        #ifdef LOG_DEPTH_BUFFER\n            #ifdef LOG_DEPTH_BUFFER_EXT\n                varying float depth;\n            #else\n                uniform float logDepthFar;\n            #endif\n        #endif\n\n        mat4 qua2mat(vec4 qua,vec4 pos){\n            vec4 t1 = qua * qua;\n            vec3 t2 = 2.0 * qua.xxx * qua.yzw;\n            vec3 t3 = 2.0 * qua.yyz * qua.zww;\n            return mat4(\n                t1.x - t1.y - t1.z + t1.w , t2.x + t3.z , t2.y - t3.y , 0.0 ,\n                t2.x - t3.z , -t1.x + t1.y - t1.z + t1.w , t3.x + t2.z , 0.0 ,\n                t2.y + t3.y , t3.x - t2.z , -t1.x - t1.y + t1.z + t1.w , 0.0 ,\n                pos.x,pos.y,pos.z,1.0\n            );\n        }\n\n        vec4 liuguangFunc(in vec4 liuguang,in vec2 uv){\n            vec4 tuv = vec4(uv,liuguang.zw);\n            tuv.xy *= liuguang.yy;\n            tuv.xy += liuguang.xx;\n            return tuv;\n        }\n                \n#ifdef USE_SKINNING\n        uniform vec4 " + "bones" + "[ MAX_BONES ];\n        mat4 getBoneMatrix( const in float i ) {\n            float d = i * 2.0;\n            vec4 qua = " + "bones" + "[ int(d) ];\n            vec4 pos = " + "bones" + "[ int(d + 1.0) ];\n            return qua2mat(qua,pos);\n        }\n#endif\n                \n        \n\n#ifdef LIU_GUANG\n        uniform vec4 liuguang;\n        varying vec4 vLiuguang;\n#endif\n\n\n#ifdef UV_ANIM\n        uniform vec4 uvAnim;\n#endif\n\n        varying vec4 vDebug;\n\n        void main() {\n            vec4 t_pos = vec4(" + "pos" + ", 1.0);\n            vec3 t_normal = " + "normal" + ";\n\n            #ifdef USE_SKINNING\n                mat4 skinMatrix = mat4( 0.0 );\n                skinMatrix += " + "weight" + ".x * getBoneMatrix( " + "index" + ".x );\n                skinMatrix += " + "weight" + ".y * getBoneMatrix( " + "index" + ".y );\n                skinMatrix += " + "weight" + ".z * getBoneMatrix( " + "index" + ".z );\n                skinMatrix += " + "weight" + ".w * getBoneMatrix( " + "index" + ".w );\n                t_normal = vec4( skinMatrix * vec4( t_normal, 0.0 ) ).xyz;\n                t_pos = skinMatrix * t_pos;\n            #endif\n\n            t_normal = normalize(vec4(t_normal,0.0) * " + "invm" + ").xyz;\n            vec3 invLight = normalize(" + "lightDirection" + ".xyz);\n            float diffuse  = clamp(dot(t_normal , invLight), 0.1, 1.0);\n            vDiffuse = vec4(vec3(diffuse), 1.0);\n            \n            // vDebug = vec4(diffuse,diffuse,diffuse,1.0);\n            // vDebug = vec4(t_normal,1.0);\n\n#ifdef UV_ANIM\n    vUV = ((" + "uv" + ".xy - vec2(0.5)) * uvAnim.zw) + uvAnim.xy + vec2(0.5);\n#else\n    vUV = " + "uv" + ";\n#endif\n\n#ifdef LIU_GUANG\n            vLiuguang = liuguangFunc(liuguang,vUV);            \n#endif\n            \n            gl_Position = " + "mvp" + " * t_pos;\n            #ifdef LOG_DEPTH_BUFFER\n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    depth = gl_Position.w + 1.0;\n                #else\n                    gl_Position.z = log2( max( 0.0000001, gl_Position.w + 1.0 ) ) * logDepthFar * 2.0 - 1.0;\n                    gl_Position.z *= gl_Position.w;\n                #endif\n            #endif\n            \n#ifdef SHADOW\n            t_pos = " + "sunmvp" + " * t_pos;\n            // t_pos.xyz /= t_pos.w;\n            // t_pos.xy = t_pos.xy * 0.5 + 0.5;\n            vShadowUV = t_pos;\n#endif\n        }\n    ";
            var fragmentCode = "\n                " + f_def + "\n                precision mediump float;    \n                \n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    #extension GL_EXT_frag_depth : enable\n                #endif\n                \n                uniform sampler2D " + "diff" + ";\n                uniform sampler2D " + "shadow" + ";\n\n                uniform vec4 " + "vc_diff" + ";\n                uniform vec4 " + "vc_emissive" + ";\n\n                varying vec4 vDiffuse;\n                varying vec2 vUV;\n                varying vec4 vShadowUV;\n                \n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    varying float depth;\n                    uniform float logDepthFar;\n                #endif\n\n\n                #ifdef LIU_GUANG\n                    uniform sampler2D liuguangTex;\n                    varying vec4 vLiuguang;\n                #endif\n\n                #ifdef COLOR_TRANFORM\n                        uniform vec4 color_mul;\n                        uniform vec4 color_add;\n                #endif\n\n\n                const vec3 PackFactors2 = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const float PackUpscale = 256. / 255.;\n                const float ShiftRight8 = 1. / 256.;\n\n                vec4 packDepthToRGBA( float v ) {\n                    vec4 r = vec4( fract( v * PackFactors2 ), v );\n                    r.yzw -= r.xyz * ShiftRight8;\n                    return r * PackUpscale;\n                }\n\n\n                const float UnpackDownscale = 255. / 256.;\n                const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n                float unpackRGBAToDepth( const in vec4 v ) {\n                    return dot( v, UnpackFactors );\n                }\n\n                float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n                    return step( unpackRGBAToDepth( texture2D( depths, uv ) ) , compare );\n                }\n\n                float sat(float v)\n                {\n                    return clamp(v,0.0,1.0);\n                }\n\n\n                varying vec4 vDebug;\n                \n                void main(void){\n\n                    vec2 tUV = vUV;\n                    vec4 diffuse = vDiffuse;\n\n                    #ifdef DIFF\n                        vec4 color = texture2D(" + "diff" + ", tUV);\n                    #else\n                        #ifdef VC_DIFF\n                            vec4 color = " + "vc_diff" + ";\n                        #else\n                            vec4 color = vec4(1.0,1.0,1.0,1.0) ;\n                        #endif\n                    #endif\n\n\n#ifdef COLOR_TRANFORM\n                    color  = color * color_mul + color_add;\n#endif\n\n                    if(color.w <= 0.05){\n                        discard;\n                    }\n\n\n                    \n\n                    \n                    #ifdef SHADOW\n                        // diffuse.xyz = vec3(1.0);\n                        vec4 sc = vShadowUV;\n                        sc.xyz /= sc.w;\n                        sc.xyz = sc.xyz * 0.5 + 0.5;\n                        float shadow = texture2DCompare(" + "shadow" + ", sc.xy,sc.z+0.001);\n                        // vec4 scolor = texture2D( " + "shadow" + ", sc.xy );\n                        // float shadow = unpackRGBAToDepth( scolor );\n                        // shadow = step(shadow,sc.z); \n                        diffuse.xyz *= (1.0 - shadow * 0.3);\n                        // color = scolor;\n                    #endif\n\n                    \n                    \n                    #ifdef LOG_DEPTH_BUFFER_EXT\n\t                    gl_FragDepthEXT = log2( depth ) * logDepthFar;\n                    #endif\n\n\n                    #ifdef LIU_GUANG\n                        vec4 lc = texture2D(liuguangTex, vLiuguang.xy);\n                        color.xyz += lc.xyz * sat(color.w - vLiuguang.z) * vLiuguang.www;\n                    #endif\n\n                    color.xyz *= (diffuse.xyz * 0.6 + 1.0);\n                    // color.xyz *= 1.65;\n                    // color.xyz += diffuse.xyz;\n\n\n                    gl_FragColor = color;\n\n                    // gl_FragColor = vDebug;\n\n                    \n\n                    // gl_FragColor = vec4(gl_FragCoord.zzz,1.0);\n\n                    // float deep = unpackRGBAToDepth(vec4(1.0));\n                    // gl_FragColor = vec4(vec3(deep),1.0);\n\n                    // gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n                    \n                    // gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n                    // gl_FragColor = vec4(vUV,0.0,1.0);\n                }\n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return PhongMaterial;
    }(Material));
    rf.PhongMaterial = PhongMaterial;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.IShaderSettingPros = [
        "useEye", "usePos", "useQua2mat", "useNormal", "useColor",
        "useShadow", "useInvm"
    ];
    function newShaderCode(code, def, func) {
        return { def: def, func: func, code: code };
    }
    rf.newShaderCode = newShaderCode;
    var Shader = (function () {
        function Shader() {
            this.vertex_render_list = [
                "basic_",
                "normal_",
                "color_",
                "ui_",
                "MatrixUI_",
                "skeleton_",
                "sun_",
                "fresnel_",
                "fresnelAlpha_",
                "diff_",
                5,
                30,
                "uidiff_",
                "liuguang_",
                "shadow_",
                "mv_",
                "outline_",
                "p_",
                "mvp_",
            ];
            this.frament_render_list = [
                "diff_",
                "fill_",
                "color_",
                30,
                "discard_",
                "HCOLOR_MATRIX_",
                31,
                "sun_",
                "fresnel_",
                "fresnelAlpha_",
                "gray_",
                "blur_",
                "glow_",
                "hole_",
                "circle_",
                "shadow_"
            ];
        }
        Shader.prototype.init = function (vertex_render_list, frament_render_list) {
            this.vertex_render_list = vertex_render_list;
            this.frament_render_list = frament_render_list;
        };
        Shader.prototype.createProgram = function (target) {
            var filters = target.filters;
            var key = "";
            for (var filterKey in filters) {
                var filter = filters[filterKey];
                if (filter && filter.readly) {
                    key += filter.skey;
                }
            }
            var p = rf.context3D.programs[key];
            if (!p) {
                var setting = {};
                for (var filterKey in filters) {
                    var filter = filters[filterKey];
                    if (filter && filter.readly) {
                        filter.updateSetting(setting);
                    }
                }
                var v = this.createVertex2(filters, setting);
                var f = this.createFragment2(filters, setting);
                p = rf.context3D.createProgram(v, f, key);
                p.setting = setting;
            }
            target.shader = false;
            return p;
        };
        Shader.prototype.createVertex2 = function (filters, setting) {
            var filter;
            var def = "";
            var code = "";
            var func = "";
            if (!setting) {
                setting = {};
            }
            function append(filter) {
                if (filter && filter.readly) {
                    var vertex = filter.vertex;
                    if (vertex) {
                        if (vertex.def) {
                            def += vertex.def;
                        }
                        if (vertex.func) {
                            func += vertex.func;
                        }
                        if (vertex.code) {
                            code += vertex.code;
                        }
                    }
                }
            }
            func += Shader.FUNC_SAT;
            func += Shader.FUNC_DOT_VALUE;
            if (setting.useQua2mat) {
                func += Shader.FUNC_QUA2MAT;
            }
            var list = this.vertex_render_list;
            for (var i = 0; i < list.length; i++) {
                append(filters[list[i]]);
            }
            if (setting.useInvm) {
                def += "uniform mat4 invm;\n";
            }
            if (setting.usePos) {
                def += "varying vec3 vpos;\n";
                code += "vpos.xyz = p.xyz;\n";
            }
            if (setting.useColor) {
                code += "vColor = c;";
            }
            return "\n" + def + "\n" + func + "\nvoid main(void){\n    " + code + "\n    gl_Position = p;\n}\n";
        };
        Shader.prototype.createFragment2 = function (filters, setting) {
            function append(filter) {
                if (filter && filter.readly) {
                    var fragment = filter.fragment;
                    if (fragment) {
                        if (fragment.def) {
                            def += fragment.def;
                        }
                        if (fragment.func) {
                            func += fragment.func;
                        }
                        if (fragment.code) {
                            code += fragment.code;
                        }
                    }
                }
            }
            var def = "";
            var func = "";
            var code = "";
            var list = this.frament_render_list;
            for (var i = 0; i < list.length; i++) {
                append(filters[list[i]]);
            }
            if (setting.usePos) {
                def += "varying vec3 vpos;\n";
            }
            func += Shader.FUNC_SAT;
            return "\n// precision mediump float;\nprecision highp float;\n// precision lowp float;\n" + def + "\n" + func + "\nvoid main(void){\n    " + code + "\n    gl_FragColor = color;   \n}\n";
        };
        Shader.FUNC_QUA2MAT = "\nmat4 qua2mat(vec4 qua,vec4 pos){\n    vec4 t1 = qua * qua;\n    vec3 t2 = 2.0 * qua.xxx * qua.yzw;\n    vec3 t3 = 2.0 * qua.yyz * qua.zww;\n    return mat4(\n        t1.x - t1.y - t1.z + t1.w , t2.x + t3.z , t2.y - t3.y , 0.0 ,\n        t2.x - t3.z , -t1.x + t1.y - t1.z + t1.w , t3.x + t2.z , 0.0 ,\n        t2.y + t3.y , t3.x - t2.z , -t1.x - t1.y + t1.z + t1.w , 0.0 ,\n        pos.x,pos.y,pos.z,1.0\n    );\n}\n";
        Shader.FUNC_SHADOW_ENCODE = "\nconst vec3 PackFactors2 = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst float PackUpscale = 256. / 255.;\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( float v ) {\n    vec4 r = vec4( fract( v * PackFactors2 ), v );\n    r.yzw -= r.xyz * ShiftRight8;\n    return r * PackUpscale;\n}\n";
        Shader.FUNC_SHADOW_DECODE = "\nconst float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nfloat unpackRGBAToDepth( const in vec4 v ) {\n    return dot( v, UnpackFactors );\n}\n\nfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n    return step( unpackRGBAToDepth( texture2D( depths, uv ) ) , compare );\n}\n";
        Shader.FUNC_SAT = "\nfloat sat(float v)\n{\n    return clamp(v,0.0,1.0);\n}\n\nvec2 sat(vec2 v)\n{\n    return clamp(v,0.0,1.0);\n}\n";
        Shader.FUNC_DOT_VALUE = "\nfloat dotValue(vec3 n,vec4 dir,mat4 invm){\n    return dot(normalize(vec4(n, 0.0) * invm).xyz,dir.xyz);\n}\n";
        return Shader;
    }());
    rf.Shader = Shader;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var HitArea = (function () {
        function HitArea() {
            this.left = 0;
            this.right = 0;
            this.top = 0;
            this.bottom = 0;
            this.front = 0;
            this.back = 0;
        }
        HitArea.prototype.clean = function () {
            this.left = this.right = this.top = this.bottom = this.front = this.back = 0;
        };
        HitArea.prototype.combine = function (hitArea, x, y) {
            var b = false;
            if (hitArea == undefined) {
                return b;
            }
            if (this.left > hitArea.left + x) {
                this.left = hitArea.left + x;
                b = true;
            }
            if (this.right < hitArea.right + x) {
                this.right = hitArea.right + x;
                b = true;
            }
            if (this.top > hitArea.top + y) {
                this.top = hitArea.top + y;
                b = true;
            }
            if (this.bottom < hitArea.bottom + y) {
                this.bottom = hitArea.bottom + y;
                b = true;
            }
            if (this.front > hitArea.front) {
                this.front = hitArea.front;
                b = true;
            }
            if (this.back < hitArea.back) {
                this.back = hitArea.back;
                b = true;
            }
            return b;
        };
        HitArea.prototype.updateArea = function (x, y, z) {
            var b = false;
            if (this.left > x) {
                this.left = x;
                b = true;
            }
            else if (this.right < x) {
                this.right = x;
                b = true;
            }
            if (this.top > y) {
                this.top = y;
                b = true;
            }
            else if (this.bottom < y) {
                this.bottom = y;
                b = true;
            }
            if (this.front > z) {
                this.front = z;
                b = true;
            }
            else if (this.back < z) {
                this.back = z;
                b = true;
            }
            return b;
        };
        HitArea.prototype.checkIn = function (x, y, scale) {
            if (scale === void 0) { scale = 1; }
            if (this.allWays) {
                return true;
            }
            if (x > this.left * scale && x < this.right * scale && y > this.top * scale && y < this.bottom * scale) {
                return true;
            }
            return false;
        };
        HitArea.prototype.scale = function (value) {
            this.left *= value;
            this.right *= value;
            this.top *= value;
            this.bottom *= value;
        };
        HitArea.prototype.toString = function () {
            return "HitArea left:" + this.left + " right:" + this.right + " top:" + this.top + " bottom:" + this.bottom + " front:" + this.front + " back:" + this.back;
        };
        return HitArea;
    }());
    rf.HitArea = HitArea;
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = true;
            _this.mouseChildren = true;
            _this.mousedown = false;
            _this.mouseroll = false;
            _this.up = rf.newVector3D(0, 1, 0);
            _this._x = 0;
            _this._y = 0;
            _this._z = 0;
            _this.w = 0;
            _this.h = 0;
            _this._rotationX = 0;
            _this._rotationY = 0;
            _this._rotationZ = 0;
            _this._scaleX = 1;
            _this._scaleY = 1;
            _this._scaleZ = 1;
            _this._alpha = 1;
            _this.sceneAlpha = 1;
            _this._visible = true;
            _this.status = 0;
            _this.pivotZero = false;
            _this.locksize = false;
            _this.filters = {};
            _this.preUpdateSceneTransformDate = 0;
            _this.__addchildflag = false;
            _this.preUpadateHitAreaDate = 0;
            _this.pos = rf.newVector3D();
            _this.rot = rf.newVector3D();
            _this.sca = rf.newVector3D(1, 1, 1);
            _this.transform = rf.newMatrix3D();
            _this.sceneTransform = rf.newMatrix3D();
            _this.trandom = Math.random();
            return _this;
        }
        DisplayObject.prototype.setChange = function (value, p, c) {
            if (p === void 0) { p = 0; }
            if (c === void 0) { c = false; }
            this.status |= (value & ~12);
            if (undefined != this.parent) {
                if (value & 3) {
                    value |= 16;
                }
                if (value & 32) {
                    value |= 64;
                }
                this.parent.setChange(value & 12, value & 80, true);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "visible", {
            get: function () { return this._visible; },
            set: function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    this.setChange(4);
                    this.cleanBatch();
                }
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.cleanBatch = function () {
        };
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (this._alpha == value) {
                    return;
                }
                var vertex = 0;
                if (this._alpha <= 0 || value == 0) {
                    vertex |= 4;
                }
                this._alpha = value;
                this.setChange(vertex | 2 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () { return this._scaleX; },
            set: function (value) {
                if (this._scaleX == value)
                    return;
                this._scaleX = value;
                this.sca.x = value;
                this.setChange(1 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () { return this._scaleY; },
            set: function (value) { this._scaleY = value; this.sca.y = value; this.setChange(1); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleZ", {
            get: function () { return this._scaleZ; },
            set: function (value) { this._scaleZ = value; this.sca.z = value; this.setChange(1); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotationX", {
            get: function () { return this._rotationX * rf.RADIANS_TO_DEGREES; },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationX)
                    return;
                this._rotationX = value;
                this.rot.x = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotationY", {
            get: function () { return this._rotationY * rf.RADIANS_TO_DEGREES; },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationY)
                    return;
                this._rotationY = value;
                this.rot.y = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotationZ", {
            get: function () { return this._rotationZ * rf.RADIANS_TO_DEGREES; },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationZ)
                    return;
                this._rotationZ = value;
                this.rot.z = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return this._rotationZ * rf.RADIANS_TO_DEGREES;
            },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationZ)
                    return;
                this._rotationZ = value;
                this.rot.z = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "x", {
            get: function () { return this._x; },
            set: function (value) {
                if (value == this._x)
                    return;
                this._x = value;
                this.pos.x = value;
                this.setChange(1 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "y", {
            get: function () { return this._y; },
            set: function (value) {
                if (value == this._y)
                    return;
                this._y = value;
                this.pos.y = value;
                this.setChange(1 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "z", {
            get: function () { return this._z; },
            set: function (value) {
                if (value == this._z)
                    return;
                this._z = value;
                this.pos.z = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.setPos = function (x, y, z, update) {
            if (z === void 0) { z = 0; }
            if (update === void 0) { update = true; }
            if (this._x == x && this._y == y && this._z == z)
                return;
            this.pos.x = this._x = x;
            this.pos.y = this._y = y;
            this.pos.z = this._z = z;
            if (update) {
                this.setChange(1 | 8);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "eulers", {
            set: function (value) {
                this._rotationX = value.x * rf.DEGREES_TO_RADIANS;
                this._rotationY = value.y * rf.DEGREES_TO_RADIANS;
                this._rotationZ = value.z * rf.DEGREES_TO_RADIANS;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.forwardPos = function (distance, target) {
            var pos = this.pos;
            this.transform.m3_copyColumnTo(2, rf.tempAxeX);
            rf.tempAxeX.v3_normalize();
            if (undefined != target) {
                pos.x = -rf.tempAxeX.x * distance + target.x;
                pos.y = -rf.tempAxeX.y * distance + target.y;
                pos.z = -rf.tempAxeX.z * distance + target.z;
            }
            else {
                pos.x += rf.tempAxeX.x * distance;
                pos.y += rf.tempAxeX.y * distance;
                pos.z += rf.tempAxeX.z * distance;
            }
            this._x = pos.x;
            this._y = pos.y;
            this._z = pos.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.upPos = function (distance) {
            this.transform.m3_copyColumnTo(1, rf.tempAxeX);
            rf.tempAxeX.v3_normalize();
            this.pos.x += rf.tempAxeX.x * distance;
            this.pos.y += rf.tempAxeX.y * distance;
            this.pos.z += rf.tempAxeX.z * distance;
            this._x = this.pos.x;
            this._y = this.pos.y;
            this._z = this.pos.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.rightPos = function (distance) {
            this.transform.m3_copyColumnTo(0, rf.tempAxeX);
            rf.tempAxeX.v3_normalize();
            this.pos.x += rf.tempAxeX.x * distance;
            this.pos.y += rf.tempAxeX.y * distance;
            this.pos.z += rf.tempAxeX.z * distance;
            this._x = this.pos.x;
            this._y = this.pos.y;
            this._z = this.pos.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.setRot = function (rx, ry, rz, update) {
            if (update === void 0) { update = true; }
            this.rot.x = this._rotationX = rx * rf.DEGREES_TO_RADIANS;
            this.rot.y = this._rotationY = ry * rf.DEGREES_TO_RADIANS;
            this.rot.z = this._rotationZ = rz * rf.DEGREES_TO_RADIANS;
            if (update) {
                this.setChange(1);
            }
        };
        DisplayObject.prototype.setRotRadians = function (rx, ry, rz, update) {
            if (update === void 0) { update = true; }
            this.rot.x = this._rotationX = rx;
            this.rot.y = this._rotationY = ry;
            this.rot.z = this._rotationZ = rz;
            if (update) {
                this.setChange(1);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "scale", {
            get: function () {
                var _a = this, _scaleX = _a._scaleX, _scaleY = _a._scaleY, _scaleZ = _a._scaleZ;
                if (_scaleX == _scaleY && _scaleX == _scaleZ) {
                    return _scaleX;
                }
                return Math.min(_scaleX, _scaleY, _scaleZ);
            },
            set: function (value) {
                this.setSca(value, value, value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.setSca = function (sx, sy, sz, update) {
            if (update === void 0) { update = true; }
            this.sca.x = this._scaleX = sx;
            this.sca.y = this._scaleY = sy;
            this.sca.z = this._scaleZ = sz;
            if (update) {
                this.setChange(1 | 8);
            }
        };
        DisplayObject.prototype.setPivotPonumber = function (x, y, z) {
            if (undefined == this.pivotPonumber) {
                this.pivotPonumber = rf.newVector3D();
            }
            ;
            this.pivotPonumber.x = x;
            this.pivotPonumber.y = y;
            this.pivotPonumber.z = z;
            this.pivotZero = (x != 0 || y != 0 || z != 0);
        };
        DisplayObject.prototype.setTransform = function (matrix) {
            var _a = this, transform = _a.transform, pos = _a.pos, rot = _a.rot, sca = _a.sca;
            transform.set(matrix);
            transform.m3_decompose(pos, rot, sca, 0);
            this._x = pos.x;
            this._y = pos.y;
            this._z = pos.z;
            this._rotationX = rot.x;
            this._rotationY = rot.y;
            this._rotationZ = rot.z;
            this._scaleX = sca.x;
            this._scaleY = sca.y;
            this._scaleZ = sca.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.updateTransform = function () {
            var _a = this, transform = _a.transform, pivotZero = _a.pivotZero;
            if (pivotZero) {
                var _b = this, pivotPonumber = _b.pivotPonumber, _scaleX = _b._scaleX, _scaleY = _b._scaleY, _scaleZ = _b._scaleZ, _x = _b._x, _y = _b._y, _z = _b._z;
                var x = pivotPonumber[0], y = pivotPonumber[1], z = pivotPonumber[2];
                transform.m3_identity();
                transform.m3_translation(-x, -y, -z);
                transform.m3_scale(_scaleX, _scaleY, _scaleZ);
                transform.m3_translation(_x + x, _y + y, _z + z);
            }
            else {
                transform.m3_recompose(this.pos, this.rot, this.sca);
            }
            this.status &= ~1;
        };
        DisplayObject.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            this.preUpdateSceneTransformDate = rf.lastUpdateDate;
            var _a = this, status = _a.status, parent = _a.parent;
            if (status & 1) {
                this.updateTransform();
                updateStatus |= 1;
            }
            if (status & 2) {
                updateStatus |= 2;
                this.status &= ~2;
            }
            if (updateStatus & 1) {
                if (parentSceneTransform) {
                    this.sceneTransform.m3_append(parentSceneTransform, false, this.transform);
                }
                else {
                    if (parent) {
                        this.sceneTransform.m3_append(parent.sceneTransform, false, this.transform);
                    }
                    else {
                        this.sceneTransform.set(this.transform);
                    }
                }
            }
            if (updateStatus & 2) {
                if (parent) {
                    this.sceneAlpha = parent.sceneAlpha * this._alpha;
                }
                else {
                    this.sceneAlpha = this._alpha;
                }
            }
            return updateStatus;
        };
        DisplayObject.prototype.updateBatchVCData = function () { };
        DisplayObject.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        DisplayObject.prototype.addToStage = function () { };
        ;
        DisplayObject.prototype.removeFromStage = function () { };
        ;
        DisplayObject.prototype.removeFromParent = function () { };
        ;
        DisplayObject.prototype.setSize = function (width, height) {
            this.locksize = true;
            this.w = width;
            this.h = height;
        };
        DisplayObject.prototype.doResize = function () { };
        DisplayObject.prototype.dispatchEvent = function (event) {
            var bool = false;
            var parent = this.parent;
            if (undefined != this.mEventListeners && event.type in this.mEventListeners) {
                bool = _super.prototype.dispatchEvent.call(this, event);
            }
            if (parent && (false == event.stopImmediatePropagation && event.bubbles)) {
                parent.dispatchEvent(event);
            }
            return bool;
        };
        DisplayObject.prototype.updateHitArea = function () {
            this.preUpadateHitAreaDate = rf.lastUpdateDate;
            this.status &= ~96;
        };
        DisplayObject.prototype.getObjectByPoint = function (dx, dy, scale) {
            var area = this.hitArea;
            if (undefined == area) {
                return undefined;
            }
            if (area.checkIn(dx, dy, this._scaleX * scale) == true) {
                return this;
            }
            return undefined;
        };
        Object.defineProperty(DisplayObject.prototype, "mouseX", {
            get: function () {
                return rf.nativeMouseX - this.sceneTransform[12];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "mouseY", {
            get: function () {
                return rf.nativeMouseY - this.sceneTransform[13];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "stageX", {
            get: function () {
                return this.sceneTransform[12];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "stageY", {
            get: function () {
                return this.sceneTransform[13];
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.render = function (camera, option) {
        };
        DisplayObject.prototype.lookat = function (target, upAxis) {
            if (upAxis === void 0) { upAxis = null; }
            var xAxis = rf.tempAxeX;
            var yAxis = rf.tempAxeY;
            var zAxis = rf.tempAxeZ;
            var _a = this, transform = _a.transform, _scaleX = _a._scaleX, _scaleY = _a._scaleY, _scaleZ = _a._scaleZ, _x = _a._x, _y = _a._y, _z = _a._z, rot = _a.rot;
            if (undefined == upAxis) {
                upAxis = rf.Y_AXIS;
            }
            zAxis.x = target.x - _x;
            zAxis.y = target.y - _y;
            zAxis.z = target.z - _z;
            zAxis.v3_normalize();
            xAxis.x = upAxis.y * zAxis.z - upAxis.z * zAxis.y;
            xAxis.y = upAxis.z * zAxis.x - upAxis.x * zAxis.z;
            xAxis.z = upAxis.x * zAxis.y - upAxis.y * zAxis.x;
            xAxis.v3_normalize();
            if (xAxis.v3_length < .05) {
                xAxis.x = upAxis.y;
                xAxis.y = upAxis.x;
                xAxis.z = 0;
                xAxis.v3_normalize();
            }
            yAxis.x = zAxis.y * xAxis.z - zAxis.z * xAxis.y;
            yAxis.y = zAxis.z * xAxis.x - zAxis.x * xAxis.z;
            yAxis.z = zAxis.x * xAxis.y - zAxis.y * xAxis.x;
            var raw = transform;
            raw[0] = _scaleX * xAxis.x;
            raw[1] = _scaleX * xAxis.y;
            raw[2] = _scaleX * xAxis.z;
            raw[3] = 0;
            raw[4] = _scaleY * yAxis.x;
            raw[5] = _scaleY * yAxis.y;
            raw[6] = _scaleY * yAxis.z;
            raw[7] = 0;
            raw[8] = _scaleZ * zAxis.x;
            raw[9] = _scaleZ * zAxis.y;
            raw[10] = _scaleZ * zAxis.z;
            raw[11] = 0;
            raw[12] = _x;
            raw[13] = _y;
            raw[14] = _z;
            raw[15] = 1;
            transform.m3_decompose(undefined, rot, undefined);
            this._rotationX = rot.x;
            this._rotationY = rot.y;
            this._rotationZ = rot.z;
            if (zAxis.z < 0) {
                this._rotationY = rot.y = (Math.PI - rot.y);
                this._rotationX = rot.x = rot.x - Math.PI;
                this._rotationZ = rot.z = rot.z - Math.PI;
            }
            this.setChange(1);
        };
        DisplayObject.prototype.onSpawn = function () {
            this.scale = 1.0;
            this.alpha = 1.0;
            this.setRot(0, 0, 0);
        };
        Object.defineProperty(DisplayObject.prototype, "shaderKey", {
            get: function () {
                var filters = this.filters;
                var key = "";
                for (var filterKey in filters) {
                    var filter = filters[filterKey];
                    if (filter && filter.readly) {
                        key += filter.skey;
                    }
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "factorKey", {
            get: function () {
                var key = "";
                if (this.srcFactor) {
                    key += this.srcFactor + "_" + this.dstFactor;
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        return DisplayObject;
    }(rf.MiniDispatcher));
    rf.DisplayObject = DisplayObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function checkparent(target) {
        var t = 0;
        while (target) {
            target = target.parent;
            t++;
            if (t > 1000) {
                t = 0;
                var str = "";
                while (t < 5) {
                    str += rf.getQualifiedClassName(target) + "->";
                    target = target.parent;
                    t++;
                }
                console.log("checkparent:" + str);
                return false;
            }
        }
        return true;
    }
    rf.checkparent = checkparent;
    rf.childCheckNum = 0;
    rf.changeCheckNum = 0;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this) || this;
            _this.childrens = new rf.Link();
            _this.childrens.checkSameData = true;
            return _this;
        }
        DisplayObjectContainer.prototype.setChange = function (value, p, c) {
            if (p === void 0) { p = 0; }
            if (c === void 0) { c = false; }
            if (true == c) {
                this.status |= p;
                if (this.parent) {
                    this.parent.setChange(value, p, true);
                }
            }
            else {
                _super.prototype.setChange.call(this, value);
            }
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
            get: function () {
                return this.childrens.__length;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.addChild = function (child) {
            if (undefined == child || child == this)
                return;
            var _a = this, stage = _a.stage, childrens = _a.childrens;
            var vo = childrens.getValueLink(child, this);
            if (vo) {
                childrens.removeLink(vo);
            }
            else {
                if (child.parent)
                    child.remove();
            }
            child.parent = this;
            childrens.add(child, this);
            if (true == checkparent(child)) {
                this.setChange(12 | 51);
                rf.childCheckNum = 0;
                if (stage) {
                    if (!child.stage) {
                        child.stage = stage;
                        child.addToStage();
                    }
                }
            }
            else {
                console.log("addChild ", rf.getQualifiedClassName(child), " ", "loop!");
                childrens.onRecycle();
            }
        };
        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            if (undefined == child || child == this)
                return;
            if (child.parent)
                child.remove();
            var childrens = this.childrens;
            if (index < 0) {
                index = 0;
            }
            else if (index > childrens.__length) {
                index = childrens.__length;
            }
            var vo = childrens.first;
            if (!vo) {
                childrens.add(child, this);
            }
            else {
                if (index == 0) {
                    var nvo = childrens.create(child, this);
                    vo.pre = nvo;
                    nvo.next = vo;
                    childrens.first = nvo;
                }
                else if (index == childrens.__length) {
                    childrens.add(child, this);
                }
                else {
                    var i = 0;
                    for (vo; vo; vo = vo.next) {
                        if (vo.close == false) {
                            if (i == index) {
                                var nvo = childrens.create(child, this);
                                var pre = vo.pre;
                                nvo.pre = pre;
                                pre.next = nvo;
                                nvo.next = vo;
                                vo.pre = nvo;
                                break;
                            }
                            i++;
                        }
                    }
                }
            }
            child.parent = this;
            if (true == checkparent(child)) {
                this.setChange(12 | 51);
                if (this.stage) {
                    if (!child.stage) {
                        child.stage = this.stage;
                        child.addToStage();
                    }
                }
            }
            else {
                console.log("addChildAt ", rf.getQualifiedClassName(child), " ", "loop!");
                childrens.clean();
            }
        };
        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.childrens.indexOf(child, this);
        };
        DisplayObjectContainer.prototype.removeChild = function (child) {
            if (undefined == child) {
                return;
            }
            var childrens = this.childrens;
            var vo = childrens.getValueLink(child, this);
            if (vo) {
                childrens.removeLink(vo);
                child.stage = undefined;
                child.parent = undefined;
                child.removeFromParent();
                child.removeFromStage();
                child.cleanBatch();
                this.setChange(12);
            }
            else {
            }
        };
        DisplayObjectContainer.prototype.removeAllChild = function () {
            var childrens = this.childrens;
            childrens.forEach(function (vo) {
                var child = vo.data;
                vo.close = true;
                child.stage = undefined;
                child.parent = undefined;
                child.removeFromParent();
                child.removeFromStage();
                child.cleanBatch();
                return true;
            }, this);
            childrens.clean();
            this.setChange(12);
        };
        DisplayObjectContainer.prototype.removeFromStage = function () {
            var childrens = this.childrens;
            childrens.forData(function (child) {
                if (child.stage) {
                    child.stage = undefined;
                    child.removeFromStage();
                }
                return true;
            }, this);
            _super.prototype.removeFromStage.call(this);
        };
        DisplayObjectContainer.prototype.addToStage = function () {
            var _a = this, childrens = _a.childrens, stage = _a.stage;
            childrens.forData(function (child) {
                if (!child.stage) {
                    child.stage = stage;
                    child.addToStage();
                }
                else {
                    console.log("?? addToStage had stage " + rf.getQualifiedClassName(child));
                }
                return true;
            }, this);
            _super.prototype.addToStage.call(this);
        };
        DisplayObjectContainer.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            var _a = this, childrens = _a.childrens, sceneTransform = _a.sceneTransform;
            if (updateStatus || this.status & 16) {
                childrens.forData(function (children) {
                    children.updateSceneTransform(updateStatus, sceneTransform);
                    return true;
                }, this);
                this.status &= ~16;
            }
            return updateStatus;
        };
        DisplayObjectContainer.prototype.updateHitArea = function () {
            var hitArea = this.hitArea;
            if (hitArea) {
                hitArea.clean();
                var childrens = this.childrens;
                childrens.forData(function (child) {
                    var hit = child.hitArea;
                    if (undefined !== hit) {
                        if (child.status & 96) {
                            if (child.preUpadateHitAreaDate != rf.lastUpdateDate) {
                                child.updateHitArea();
                            }
                            else {
                                console.log("updateHitArea?");
                            }
                        }
                        hitArea.combine(hit, child._x, child._y);
                    }
                    return true;
                }, this);
            }
            this.status &= ~96;
        };
        return DisplayObjectContainer;
    }(rf.DisplayObject));
    rf.DisplayObjectContainer = DisplayObjectContainer;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(far, contextMatrix) {
            if (far === void 0) { far = 10000; }
            var _this = _super.call(this) || this;
            _this.isPerspectiveCamera = false;
            _this.isOrthographicCamera = false;
            _this.far = far;
            _this.originFar = far;
            _this.len = rf.newMatrix3D();
            _this.worldTranform = rf.newMatrix3D();
            _this.invTransform = rf.newMatrix3D();
            if (!contextMatrix) {
                contextMatrix = rf.contextMatrix2D;
            }
            _this.contextMatrix = contextMatrix;
            return _this;
        }
        Camera.prototype.updateSceneTransform = function (updateStatus) {
            if (this.status | 1) {
                this.updateTransform();
                this.sceneTransform.m3_invert(this.transform);
                this.sceneTransform.m3_append(this.contextMatrix);
                this.worldTranform.m3_append(this.len, false, this.sceneTransform);
                this.invTransform.m3_invert(this.worldTranform);
            }
            this.status = 0;
            return 0;
        };
        Camera.prototype.resize = function (width, height) {
        };
        return Camera;
    }(rf.DisplayObject));
    rf.Camera = Camera;
    function CameraUIResize(width, height, len, far, originFar, camera) {
        len[0] = 2 / width;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = -2 / height;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = -1 / far;
        len[11] = 0;
        len[12] = -1;
        len[13] = 1;
        len[14] = 0;
        len[15] = 1;
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.status |= 1;
            camera.isOrthographicCamera = true;
            camera.isPerspectiveCamera = false;
            camera.resize(width, height);
        }
    }
    rf.CameraUIResize = CameraUIResize;
    function CameraOrthResize(width, height, len, far, originFar, camera) {
        len[0] = 2 / width;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = 2 / height;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = 1 / far;
        len[11] = 0;
        len[12] = 0;
        len[13] = 0;
        len[14] = -1 / far * Math.PI * 100;
        len[15] = 1;
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.status |= 1;
            camera.isOrthographicCamera = true;
            camera.isPerspectiveCamera = false;
        }
    }
    rf.CameraOrthResize = CameraOrthResize;
    function Camera3DResize(width, height, len, far, originFar, camera) {
        len[0] = 2 / width;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = 2 / height;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = 1 / far;
        len[11] = 1 / originFar;
        len[12] = 0;
        len[13] = 0;
        len[14] = -1 / far * Math.PI * 100;
        len[15] = 0;
        len[14] = -1 / far * Math.PI;
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.originFar = originFar = far / Math.PI2;
            camera.status |= 1;
            camera.isPerspectiveCamera = true;
            camera.isOrthographicCamera = false;
        }
    }
    rf.Camera3DResize = Camera3DResize;
    function PerspectiveResize(width, height, len, far, degree, camera) {
        var radians = degree * rf.DEGREES_TO_RADIANS;
        var zNear = 0.5;
        var zFar = far;
        var wh = 640 / 1080.;
        var xScale;
        var yScale;
        var standardS = 1 / Math.tan(radians / 2.0);
        var wh2 = width / height;
        var h = height;
        if (wh2 < wh) {
            h = width / wh;
        }
        yScale = standardS * h / height;
        xScale = standardS * h / width;
        len[0] = xScale;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = yScale;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = (zFar + zNear) / (zFar - zNear);
        len[11] = 1.0;
        len[12] = 0;
        len[13] = 0;
        len[14] = zFar * zNear / (zNear - zFar);
        len[15] = 0;
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.originFar = 0.5 * height * yScale;
            camera.logDepthFar = 1.0 / (Math.log(camera.far + 1.0) / Math.LN2);
            camera.status |= 1;
            camera.isPerspectiveCamera = true;
            camera.isOrthographicCamera = false;
        }
    }
    rf.PerspectiveResize = PerspectiveResize;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FilterBase = (function (_super) {
        __extends(FilterBase, _super);
        function FilterBase(type) {
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.skey = type;
            _this.readly = true;
            return _this;
        }
        FilterBase.prototype.updateSetting = function (setting) {
            var pros = rf.IShaderSettingPros;
            for (var i = 0; i < pros.length; i++) {
                var element = pros[i];
                setting[element] = setting[element] || this[element];
            }
        };
        FilterBase.prototype.createCode = function () {
        };
        FilterBase.prototype.setProgramConstants = function (context, program, target, camera) {
        };
        return FilterBase;
    }(rf.STweenBase));
    rf.FilterBase = FilterBase;
    var BasicFilter = (function (_super) {
        __extends(BasicFilter, _super);
        function BasicFilter() {
            var _this = _super.call(this, "basic_") || this;
            var def = "\n// attribute highp vec3 pos;\nattribute vec3 pos;\n";
            var func = "";
            var code = "\nvec4 p = vec4(pos,1.0);\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        return BasicFilter;
    }(FilterBase));
    rf.BasicFilter = BasicFilter;
    var NormalFilter = (function (_super) {
        __extends(NormalFilter, _super);
        function NormalFilter() {
            var _this = _super.call(this, "basic_") || this;
            var def = "\nattribute vec3 normal;\n";
            var func = "";
            var code = "\nvec3 n = normal;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        return NormalFilter;
    }(FilterBase));
    rf.NormalFilter = NormalFilter;
    var ColorFilter = (function (_super) {
        __extends(ColorFilter, _super);
        function ColorFilter() {
            var _this = _super.call(this, "basic_") || this;
            var def = "\nattribute vec4 color;\nvarying vec4 vColor;\n";
            var func = "";
            var code = "\nvec4 c = color;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            def =
                "\nvarying vec4 vColor;\n";
            func = "";
            code =
                "\ncolor = vColor * color;\n";
            _this.fragment = rf.newShaderCode(code, def, func);
            _this.useColor = true;
            return _this;
        }
        return ColorFilter;
    }(FilterBase));
    rf.ColorFilter = ColorFilter;
    var MvpFilter = (function (_super) {
        __extends(MvpFilter, _super);
        function MvpFilter() {
            var _this = _super.call(this, "mvp_") || this;
            var def = "\nuniform mat4 mvp;\n";
            var func = "";
            var code = "\np = mvp * p;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        return MvpFilter;
    }(FilterBase));
    rf.MvpFilter = MvpFilter;
    var MvFilter = (function (_super) {
        __extends(MvFilter, _super);
        function MvFilter() {
            var _this = _super.call(this, "mv_") || this;
            var def = "\nuniform mat4 mv;\n";
            var func = "";
            var code = "\nn = (mv * vec4(n,1.0)).xyz;\np = mv * p;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        MvFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var sceneTransform = target.sceneTransform;
            var m = rf.TEMP_MATRIX3D.m3_append(camera.sceneTransform, false, sceneTransform);
            context.setProgramConstantsFromMatrix("mv", m);
        };
        return MvFilter;
    }(FilterBase));
    rf.MvFilter = MvFilter;
    var MpFilter = (function (_super) {
        __extends(MpFilter, _super);
        function MpFilter() {
            var _this = _super.call(this, "mv_") || this;
            var def = "\nuniform mat4 mp;\n";
            var func = "";
            var code = "\np = mp * p;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        MpFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromMatrix("mp", camera.len);
        };
        return MpFilter;
    }(FilterBase));
    rf.MpFilter = MpFilter;
    var DiscardFilter = (function (_super) {
        __extends(DiscardFilter, _super);
        function DiscardFilter() {
            var _this = _super.call(this, "discard_") || this;
            _this.fragment = DiscardFilter.FRAGMENT;
            return _this;
        }
        DiscardFilter.FRAGMENT = {
            code: "\nif(color.w <= 0.05) {\n    discard;\n}\ncolor.w = (color.w - 0.05) / 0.95;\n"
        };
        return DiscardFilter;
    }(FilterBase));
    rf.DiscardFilter = DiscardFilter;
    var GrayFilter = (function (_super) {
        __extends(GrayFilter, _super);
        function GrayFilter() {
            var _this = _super.call(this, "gray_") || this;
            _this.fragment = GrayFilter.FARGMENT;
            return _this;
        }
        GrayFilter.FARGMENT = {
            code: "\nfloat grey = dot(color.xyz,vec3(0.299, 0.587, 0.114));\ncolor.xyz = vec3(grey,grey,grey);\n"
        };
        return GrayFilter;
    }(FilterBase));
    rf.GrayFilter = GrayFilter;
    var HoleFilter = (function (_super) {
        __extends(HoleFilter, _super);
        function HoleFilter() {
            var _this = _super.call(this, "hole_") || this;
            _this.pos = rf.newVector3D();
            _this.usePos = true;
            _this.fragment = HoleFilter.FARGMENT;
            return _this;
        }
        HoleFilter.prototype.setConstants = function (x, y, len, inner) {
            var pos = this.pos;
            pos.x = x;
            pos.y = y;
            pos.z = len - inner;
            pos.w = inner;
        };
        HoleFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("hole", this.pos, 4);
        };
        HoleFilter.FARGMENT = {
            def: "uniform vec4 hole;",
            code: "\nvec2 pos = vpos.xy - hole.xy;\nfloat r = length(pos) - hole.w;\ncolor.w = sat(r / hole.z) * color.w;\n"
        };
        return HoleFilter;
    }(FilterBase));
    rf.HoleFilter = HoleFilter;
    var CircleFilter = (function (_super) {
        __extends(CircleFilter, _super);
        function CircleFilter(x, y, len, inner) {
            var _this = _super.call(this, "circle_") || this;
            _this.pos = rf.newVector3D();
            _this.fragment = CircleFilter.FRAGMENT;
            _this.setConstants(x, y, len, inner);
            return _this;
        }
        CircleFilter.prototype.setConstants = function (x, y, len, inner) {
            var pos = this.pos;
            pos.x = x;
            pos.y = y;
            pos.z = len - 1.0;
            pos.w = inner - 1.0;
        };
        CircleFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("circleConst", this.pos, 4);
        };
        CircleFilter.FRAGMENT = rf.newShaderCode("\nuniform vec4 circleConst;\n", "\nfloat circleFunc(vec3 pos,vec4 data){\n    float a=length(pos.xy-data.xy);\n    return (1.0 - sat(a-data.z)) * sat(a-data.w);\n}\n", "\ncolor.w = circleFunc(vpos,circleConst) * color.w;\n");
        return CircleFilter;
    }(FilterBase));
    rf.CircleFilter = CircleFilter;
    var UIFilter = (function (_super) {
        __extends(UIFilter, _super);
        function UIFilter() {
            var _this = _super.call(this, "ui_") || this;
            _this.vertex = UIFilter.VERTEX;
            return _this;
        }
        UIFilter.VERTEX = {
            def: "uniform vec4 ui[" + rf.max_vc + "];\n",
            code: "vec4 tv = ui[int(uv.z)];\np.xy = p.xy + tv.xy;\np.xy = p.xy * tv.zz;\nc.w *= tv.w;\n"
        };
        return UIFilter;
    }(FilterBase));
    rf.UIFilter = UIFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var RenderBase = (function (_super) {
        __extends(RenderBase, _super);
        function RenderBase(variables) {
            var _this = _super.call(this) || this;
            _this.nativeRender = false;
            _this.variables = variables;
            return _this;
        }
        RenderBase.prototype.render = function (camera, option) {
            var i = 0;
            var childrens = this.childrens;
            childrens.forData(function (child) {
                child.render(camera, option);
                return true;
            }, this);
        };
        RenderBase.prototype.addToStage = function () {
            _super.prototype.addToStage.call(this);
            this.setChange(4);
        };
        return RenderBase;
    }(rf.DisplayObjectContainer));
    rf.RenderBase = RenderBase;
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(source, variables) {
            var _this = _super.call(this) || this;
            _this.$vcIndex = -1;
            _this.pivotDownScale = 0.9;
            _this.pivotUpScale = 1.0;
            _this.hitArea = new rf.HitArea();
            _this.source = source ? source : rf.componentSource;
            _this.variables = variables ? variables : rf.vertex_ui_variable;
            _this.mouseChildren = true;
            _this.mouseEnabled = true;
            return _this;
        }
        Sprite.prototype.setScrollRect = function (w, h, hStep, vStep, x, y) {
            if (hStep === void 0) { hStep = 0; }
            if (vStep === void 0) { vStep = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var renderer = this.renderer;
            if (!renderer) {
                this.renderer = renderer = new rf.SuperBatchRenderer(this);
            }
            this.scrollRect = { x: x, y: y, w: w, h: h };
        };
        Sprite.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);
            if (this.mask && this.mask.parent == this) {
                _super.prototype.addChild.call(this, this.mask);
            }
        };
        Sprite.prototype.setMask = function (color, alpha) {
            if (color === void 0) { color = undefined; }
            if (alpha === void 0) { alpha = 0.95; }
            var mask = this.mask;
            if (color != undefined) {
                if (!mask) {
                    mask = this.mask = new Sprite(this.source);
                }
                this.addChild(mask);
                var g = mask.graphics;
                g.clear();
                g.drawRect(0, 0, this.w, this.h, color, 0.95);
                g.end();
            }
            else {
                if (this.mask) {
                    this.mask.remove();
                }
            }
        };
        Object.defineProperty(Sprite.prototype, "graphics", {
            get: function () {
                if (undefined == this.$graphics) {
                    this.$graphics = new rf.Graphics(this);
                }
                return this.$graphics;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.setChange = function (value, p, c) {
            if (p === void 0) { p = 0; }
            if (c === void 0) { c = false; }
            if (undefined != this.renderer) {
                this.status |= (value | p);
                if (value & 4) {
                    if (this.__batch) {
                        this.__batch.changeStatus |= 4;
                    }
                    else {
                        _super.prototype.setChange.call(this, 4);
                    }
                }
            }
            else {
                _super.prototype.setChange.call(this, value, p, c);
            }
        };
        Sprite.prototype.render = function (camera, option) {
            if (undefined != this.renderer) {
                if (this.status & 19) {
                    this.updateSceneTransform();
                }
                this.renderer.render(camera, option);
            }
            else {
                _super.prototype.render.call(this, camera, option);
            }
        };
        Sprite.prototype.addToStage = function () {
            if (this.$graphics && this.$graphics.numVertices) {
                this.setChange(4);
            }
            if (this.renderer) {
                this.renderer.changeStatus = 4;
            }
            _super.prototype.addToStage.call(this);
        };
        Sprite.prototype.cleanAll = function () {
            if (this.childrens.__length) {
                this.removeAllChild();
            }
            var g = this.$graphics;
            if (g && g.numVertices > 0) {
                g.clear();
                g.end();
            }
        };
        Sprite.prototype.setSize = function (width, height) {
            _super.prototype.setSize.call(this, width, height);
            var hitArea = this.hitArea;
            hitArea.clean();
            hitArea.updateArea(width, height, 0);
        };
        Sprite.prototype.setHitArea = function (r, b, l, t) {
            if (l === void 0) { l = 0; }
            if (t === void 0) { t = 0; }
            this.locksize = true;
            var hitArea = this.hitArea;
            hitArea.clean();
            hitArea.top = t;
            hitArea.left = l;
            hitArea.right = r;
            hitArea.bottom = b;
        };
        Sprite.prototype.updateHitArea = function () {
            var locksize = this.locksize;
            if (locksize) {
                this.status &= ~96;
                return;
            }
            var hitArea = this.hitArea;
            hitArea.clean();
            var childrens = this.childrens;
            childrens.forData(function (child) {
                if (child.status & 96) {
                    child.updateHitArea();
                }
                hitArea.combine(child.hitArea, child._x, child._y);
                return true;
            }, this);
            if (this.$graphics) {
                hitArea.combine(this.$graphics.hitArea, 0, 0);
            }
            this.w = hitArea.right - hitArea.left;
            this.h = hitArea.bottom - hitArea.top;
            this.status &= ~96;
        };
        Sprite.prototype.getObjectByPoint = function (dx, dy, scale) {
            var _a = this, mouseEnabled = _a.mouseEnabled, mouseChildren = _a.mouseChildren, visible = _a.visible, pivotPonumber = _a.pivotPonumber;
            if (visible && (mouseEnabled || mouseChildren)) {
                var _b = this, scrollRect = _b.scrollRect, hitArea = _b.hitArea, _scaleX = _b._scaleX;
                if (this.status & 96) {
                    this.updateHitArea();
                }
                dx -= this._x;
                dy -= this._y;
                scale *= pivotPonumber ? 1 : _scaleX;
                var b = true;
                if (scrollRect) {
                    var w = scrollRect.w, h = scrollRect.h, x = scrollRect.x, y = scrollRect.y;
                    b = rf.range_checkIn(x, w + x, y, h + y, dx, dy, scale);
                }
                else {
                    b = hitArea.checkIn(dx, dy, scale);
                }
                if (rf.Mouse.mouseDebug && rf.Mouse.currentType == 53) {
                    console.log(this.name, rf.getQualifiedClassName(this), " ", dx, " ", dy, " ", b);
                }
                if (b) {
                    if (mouseChildren) {
                        var children = this.childrens;
                        var result = void 0;
                        var vo = children.last;
                        for (vo; vo; vo = vo.pre) {
                            if (vo.close == false) {
                                var child = vo.data;
                                result = child.getObjectByPoint(dx, dy, scale);
                                if (result) {
                                    return result;
                                }
                            }
                        }
                    }
                    if (mouseEnabled) {
                        if (hitArea.allWays) {
                            return this;
                        }
                        if (!this.pixcheck) {
                            return this;
                        }
                        var g = this.$graphics;
                        var vo = void 0;
                        if (g && g.grometrys.length && (vo = g.grometrys[0].vo)) {
                            var b_1 = true;
                            if (b_1) {
                                return this;
                            }
                        }
                        else {
                            return this;
                        }
                    }
                }
            }
            return undefined;
        };
        Sprite.prototype.buttonModel = function (x, y, z) {
            _super.prototype.setPivotPonumber.call(this, x, y, z);
            this.on(50, this.pivotMouseDownHandler, this);
        };
        Sprite.prototype.lockSca = function (sx, sy, sz, update) {
            if (update === void 0) { update = true; }
            _super.prototype.setSca.call(this, sx, sy, sz, update);
            this.pivotDownScale = sx * 0.9;
            this.pivotUpScale = sx;
        };
        Sprite.prototype.pivotMouseDownHandler = function (event) {
            var identifier = event.data.identifier;
            this.identifier = identifier;
            rf.ROOT.on(53, this.pivotMouseUpHandler, this);
            rf.debug_click_button = this;
            var _a = this, _tweener = _a._tweener, pivotDownScale = _a.pivotDownScale;
            if (_tweener) {
                rf.tweenStop(_tweener);
            }
            this._tweener = rf.tweenTo({ scale: pivotDownScale }, 200, rf.defaultTimeMixer, this, rf.ease_quartic_out);
        };
        Sprite.prototype.pivotMouseUpHandler = function (event) {
            var _a = this, _tweener = _a._tweener, identifier = _a.identifier, pivotUpScale = _a.pivotUpScale;
            var nident = event.data.identifier;
            if (identifier != nident)
                return;
            rf.ROOT.off(53, this.pivotMouseUpHandler, this);
            if (_tweener) {
                rf.tweenStop(_tweener);
            }
            this._tweener = _tweener = rf.tweenTo({ scale: pivotUpScale }, 200, rf.defaultTimeMixer, this, rf.ease_back_out);
            _tweener.complete = this.scaleTweenComplete.bind(this);
        };
        Sprite.prototype.scaleTweenComplete = function (t) {
            this.setChange(12);
        };
        Sprite.prototype.addFilter = function (filter) {
            var _a = this, filters = _a.filters, renderer = _a.renderer;
            if (!filters) {
                this.filters = filters = {};
            }
            filters[filter.type] = filter;
            filter.disable = false;
            if (renderer) {
                renderer.program = undefined;
            }
        };
        Sprite.prototype.removeFilter = function (type) {
            var _a = this, filters = _a.filters, renderer = _a.renderer;
            if (!filters)
                return;
            filters[type] = undefined;
            if (renderer) {
                renderer.program = undefined;
            }
        };
        Sprite.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            var renderer = this.renderer;
            if (renderer && renderer.invSceneTransfrom) {
                renderer.invSceneTransfrom.m3_invert(this.sceneTransform);
                this.updateBatchVCData();
            }
            return updateStatus;
        };
        Sprite.prototype.updateBatchVCData = function (refresh) {
            if (refresh === void 0) { refresh = true; }
            var _a = this, childrens = _a.childrens, __batch_render_data = _a.__batch_render_data, _visible = _a._visible, stage = _a.stage, $vcIndex = _a.$vcIndex;
            if ($vcIndex != -1) {
                var _b = this, __batch = _b.__batch, sceneTransform = _b.sceneTransform, sceneAlpha = _b.sceneAlpha, $vcIndex_1 = _b.$vcIndex;
                var invSceneTransfrom = __batch.invSceneTransfrom;
                var vcData = __batch_render_data.vcData;
                var index = $vcIndex_1 * 8;
                var temp = rf.TEMP_MATRIX3D;
                temp.m3_append(invSceneTransfrom, false, sceneTransform);
                vcData[index] = temp[0];
                vcData[index + 1] = temp[1];
                vcData[index + 2] = temp[4];
                vcData[index + 3] = temp[5];
                vcData[index + 4] = temp[12];
                vcData[index + 5] = temp[13];
                vcData[index + 6] = temp[14];
                vcData[index + 7] = sceneAlpha;
            }
            if (refresh) {
                childrens.forData(function (child) {
                    child.updateBatchVCData();
                    return true;
                }, this);
            }
        };
        Sprite.prototype.cleanBatch = function () {
            var _a = this, $graphics = _a.$graphics, childrens = _a.childrens;
            if ($graphics)
                $graphics.$batchOffset = -1;
            this.$batchGeometry = undefined;
            this.$vcIndex = -1;
            if (!this.renderer) {
                this.__batch = undefined;
            }
            this.__batch_render_data = undefined;
            this.__render_pre = undefined;
            this.__render_next = undefined;
            this.__graphics_next = undefined;
            childrens.forData(function (child) {
                if (child.__batch) {
                    child.cleanBatch();
                }
                return true;
            }, this);
        };
        Object.defineProperty(Sprite.prototype, "visible", {
            get: function () { return this._visible; },
            set: function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    this.cleanBatch();
                    _super.prototype.setChange.call(this, 12);
                }
            },
            enumerable: true,
            configurable: true
        });
        return Sprite;
    }(RenderBase));
    rf.Sprite = Sprite;
    function newGraphicsGeometry(matrix) {
        return { numVertices: 0, matrix: matrix, offset: 0 };
    }
    rf.newGraphicsGeometry = newGraphicsGeometry;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Buffer3D = (function () {
        function Buffer3D() {
            this.preusetime = 0;
            this.gctime = 3000;
            this.readly = false;
        }
        Buffer3D.prototype.awaken = function () { };
        ;
        Buffer3D.prototype.sleep = function () { };
        ;
        Buffer3D.prototype.onRecycle = function () {
            this.readly = false;
            this.preusetime = 0;
        };
        return Buffer3D;
    }());
    rf.Buffer3D = Buffer3D;
    var Program3D = (function (_super) {
        __extends(Program3D, _super);
        function Program3D() {
            var _this = _super.call(this) || this;
            _this.uniforms = {};
            _this.attribs = {};
            _this.gctime = 60000;
            return _this;
        }
        Program3D.prototype.awaken = function () {
            if (undefined != this.program) {
                return true;
            }
            if (!this.vertexCode || !this.fragmentCode) {
                console.log("vertexCode or fragmentCode is empty");
                return false;
            }
            var g = rf.gl;
            this.vShader = this.createShader(this.vertexCode, g.VERTEX_SHADER);
            this.fShader = this.createShader(this.fragmentCode, g.FRAGMENT_SHADER);
            this.program = g.createProgram();
            g.attachShader(this.program, this.vShader);
            g.attachShader(this.program, this.fShader);
            g.linkProgram(this.program);
            if (!g.getProgramParameter(this.program, rf.gl.LINK_STATUS)) {
                this.dispose();
                console.log("create program error:" + g.getProgramInfoLog(this.program));
                return false;
            }
            rf.context3D.bufferLink.add(this, this, undefined);
            this.readly = true;
            return true;
        };
        Program3D.prototype.dispose = function () {
            var g = rf.gl;
            if (this.vShader) {
                g.detachShader(this.program, this.vShader);
                g.deleteShader(this.vShader);
                this.vShader = null;
            }
            if (this.fShader) {
                g.detachShader(this.program, this.fShader);
                g.deleteShader(this.fShader);
                this.fShader = null;
            }
            if (this.program) {
                g.deleteProgram(this.program);
                this.program = null;
            }
        };
        Program3D.prototype.recycle = function () {
            this.dispose();
            this.preusetime = 0;
            this.readly = false;
            this.uniforms = {};
            this.attribs = {};
        };
        Program3D.prototype.createShader = function (code, type) {
            var g = rf.gl;
            var shader = g.createShader(type);
            g.shaderSource(shader, code);
            g.compileShader(shader);
            if (!g.getShaderParameter(shader, g.COMPILE_STATUS)) {
                var error = g.getShaderInfoLog(shader);
                g.deleteShader(shader);
                console.log(error);
                throw new Error(error);
            }
            return shader;
        };
        return Program3D;
    }(Buffer3D));
    rf.Program3D = Program3D;
    var VertexBuffer3D = (function (_super) {
        __extends(VertexBuffer3D, _super);
        function VertexBuffer3D() {
            var _this = _super.call(this) || this;
            _this.numVertices = 0;
            _this.data32PerVertex = 0;
            _this.buffer = null;
            _this.attribarray = {};
            return _this;
        }
        VertexBuffer3D.prototype.recycle = function () {
            var g = rf.gl;
            var att = rf.context3D.attribarray;
            var _a = this, buffer = _a.buffer, attribarray = _a.attribarray;
            if (buffer) {
                for (var t in attribarray) {
                    attribarray[t] = false;
                    att[t] = false;
                    g.bindBuffer(g.ARRAY_BUFFER, buffer);
                    g.disableVertexAttribArray(~~t);
                }
                g.deleteBuffer(buffer);
                this.buffer = undefined;
            }
            this.readly = false;
            this.preusetime = 0;
        };
        VertexBuffer3D.prototype.awaken = function () {
            if (!this.data || !this.data32PerVertex || !this.numVertices) {
                this.readly = false;
                rf.ThrowError("vertexBuffer3D unavailable");
                return false;
            }
            var g = rf.gl;
            if (undefined == this.buffer) {
                this.buffer = g.createBuffer();
            }
            g.bindBuffer(g.ARRAY_BUFFER, this.buffer);
            g.bufferData(g.ARRAY_BUFFER, this.data.vertex, g.STATIC_DRAW);
            g.bindBuffer(g.ARRAY_BUFFER, null);
            this.readly = true;
            rf.context3D.bufferLink.add(this);
            return true;
        };
        VertexBuffer3D.prototype.uploadFromVector = function (data, startVertex, numVertices) {
            if (startVertex === void 0) { startVertex = 0; }
            if (numVertices === void 0) { numVertices = -1; }
            if (data instanceof rf.VertexInfo) {
                this.data = data;
                this.numVertices = data.numVertices;
                this.readly = false;
                return;
            }
            if (0 > startVertex) {
                startVertex = 0;
            }
            var nd;
            var data32PerVertex = this.data32PerVertex;
            if (numVertices != -1) {
                this.numVertices = data.length / data32PerVertex;
                if (this.numVertices - startVertex < numVertices) {
                    rf.ThrowError("numVertices out of range");
                    return;
                }
                if (this.numVertices != numVertices && startVertex == 0) {
                    this.numVertices = numVertices;
                    nd = new Float32Array(data32PerVertex * numVertices);
                    nd.set(data.slice(startVertex * data32PerVertex, numVertices * data32PerVertex));
                    data = nd;
                }
            }
            if (0 < startVertex) {
                if (numVertices == -1) {
                    numVertices = data.length / data32PerVertex - startVertex;
                }
                nd = new Float32Array(data32PerVertex * numVertices);
                nd.set(data.slice(startVertex * data32PerVertex, numVertices * data32PerVertex));
                data = nd;
                this.numVertices = numVertices;
            }
            else {
                if (false == (data instanceof Float32Array)) {
                    data = new Float32Array(data);
                }
                this.numVertices = data.length / data32PerVertex;
            }
            this.data = new rf.VertexInfo(data, data32PerVertex);
        };
        VertexBuffer3D.prototype.uploadContext = function (program) {
            if (false == this.readly) {
                if (false == this.awaken()) {
                    throw new Error("create VertexBuffer error!");
                }
            }
            var loc = -1;
            var g = rf.gl;
            var att = rf.context3D.attribarray;
            var attribs = program.attribs;
            var p = program.program;
            var attribarray = this.attribarray;
            g.bindBuffer(g.ARRAY_BUFFER, this.buffer);
            var variables = this.data.variables;
            for (var variable in variables) {
                if (true == (variable in attribs)) {
                    loc = attribs[variable];
                }
                else {
                    loc = g.getAttribLocation(p, variable);
                    attribs[variable] = loc;
                }
                if (loc < 0) {
                    continue;
                }
                var o = variables[variable];
                g.vertexAttribPointer(loc, o.size, g.FLOAT, false, this.data32PerVertex * 4, o.offset * 4);
                attribarray[loc] = true;
                if (true != att[loc]) {
                    g.enableVertexAttribArray(loc);
                    att[loc] = true;
                }
            }
            this.preusetime = rf.engineNow;
        };
        return VertexBuffer3D;
    }(Buffer3D));
    rf.VertexBuffer3D = VertexBuffer3D;
    var IndexBuffer3D = (function (_super) {
        __extends(IndexBuffer3D, _super);
        function IndexBuffer3D() {
            var _this = _super.call(this) || this;
            _this.quadid = -1;
            return _this;
        }
        IndexBuffer3D.prototype.recycle = function () {
            if (this.buffer) {
                rf.gl.deleteBuffer(this.buffer);
                this.buffer = undefined;
            }
            this.readly = false;
            this.preusetime = 0;
        };
        IndexBuffer3D.prototype.awaken = function () {
            if (true == this.readly) {
                if (undefined == this.buffer) {
                    rf.ThrowError("indexBuffer readly is true but buffer is null");
                    return false;
                }
                return true;
            }
            if (!this.data) {
                this.readly = false;
                rf.ThrowError("indexData unavailable");
                return false;
            }
            var g = rf.gl;
            if (undefined == this.buffer) {
                this.buffer = g.createBuffer();
            }
            g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.buffer);
            g.bufferData(g.ELEMENT_ARRAY_BUFFER, this.data, g.STATIC_DRAW);
            g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
            this.readly = true;
            rf.context3D.bufferLink.add(this);
        };
        IndexBuffer3D.prototype.uploadFromVector = function (data, startOffset, count) {
            if (startOffset === void 0) { startOffset = 0; }
            if (count === void 0) { count = -1; }
            if (0 > startOffset) {
                startOffset = 0;
            }
            if (count != -1) {
                if (this.numIndices - startOffset < count) {
                    rf.ThrowError("VectorData out of range");
                    return;
                }
            }
            if (0 < startOffset) {
                if (-1 == count) {
                    count = data.length - startOffset;
                }
                var nd = new Uint16Array(count);
                nd.set(data.slice(startOffset, startOffset + count));
                data = nd;
            }
            else {
                if (false == (data instanceof Uint16Array)) {
                    data = new Uint16Array(data);
                }
            }
            this.numIndices = data.length;
            this.data = data;
        };
        return IndexBuffer3D;
    }(Buffer3D));
    rf.IndexBuffer3D = IndexBuffer3D;
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            var _this = _super.call(this) || this;
            _this.width = 0;
            _this.height = 0;
            _this.status = 0;
            return _this;
        }
        Texture.prototype.awaken = function () {
            var tex = this.texture;
            var g = rf.gl;
            var data = this.pixels;
            if (data instanceof rf.BitmapData) {
                data = data.canvas;
            }
            if (undefined == tex) {
                this.texture = tex = g.createTexture();
            }
            g.bindTexture(g.TEXTURE_2D, tex);
            var textureData = this.data;
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, textureData.mag);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, textureData.mix);
            var pepeat = textureData.repeat;
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, pepeat);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, pepeat);
            var _a = this, width = _a.width, height = _a.height;
            if (data) {
                g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, data);
                width = data.width;
                height = data.height;
            }
            else {
                if (!this.floatData) {
                    this.floatData = new Uint8Array(width * height * 4);
                }
                g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, width, height, 0, g.RGBA, g.UNSIGNED_BYTE, this.floatData);
            }
            if (textureData.mipmap) {
                g.generateMipmap(g.TEXTURE_2D);
            }
            this.readly = true;
            rf.context3D.bufferLink.add(this);
            return true;
        };
        Texture.prototype.uploadContext = function (program, variable) {
            var index = rf.context3D.texIndex++;
            var uniforms = program.uniforms;
            var g = rf.gl;
            var index_tex;
            index_tex = uniforms[variable];
            if (undefined == index_tex) {
                index_tex = g.getUniformLocation(program.program, variable);
                uniforms[variable] = index_tex;
            }
            if (undefined != index_tex) {
                g.activeTexture(g["TEXTURE" + index]);
                g.uniform1i(index_tex, index);
                if (false == this.readly) {
                    this.awaken();
                }
                else {
                    g.bindTexture(g.TEXTURE_2D, this.texture);
                }
            }
            this.preusetime = rf.engineNow;
        };
        Texture.prototype.load = function (url) {
            if (undefined == url) {
                url = this.data.url;
            }
            if (0 == this.status) {
                this.status = 1;
                rf.loadRes(rf.RES_PERFIX, url, this.loadComplete, this, 5);
            }
        };
        Texture.prototype.loadComplete = function (e) {
            if (e.type == 4) {
                this.status = 2;
                var image = e.data;
                this.width = image.width;
                this.height = image.height;
                this.pixels = image;
            }
            else {
                this.status = 3;
            }
        };
        Texture.prototype.recycle = function () {
            if (this.texture) {
                rf.gl.deleteTexture(this.texture);
                this.texture = undefined;
            }
            this.readly = false;
        };
        return Texture;
    }(Buffer3D));
    rf.Texture = Texture;
    var RTTexture = (function (_super) {
        __extends(RTTexture, _super);
        function RTTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.setting = {};
            return _this;
        }
        RTTexture.prototype.awaken = function () {
            var b = _super.prototype.awaken.call(this);
            var g = rf.gl;
            if (b) {
                var _a = this, frameBuffer = _a.frameBuffer, renderBuffer = _a.renderBuffer, texture = _a.texture, width = _a.width, height = _a.height;
                if (!frameBuffer) {
                    this.frameBuffer = frameBuffer = g.createFramebuffer();
                }
                g.bindFramebuffer(g.FRAMEBUFFER, frameBuffer);
                if (!renderBuffer) {
                    this.renderBuffer = renderBuffer = g.createRenderbuffer();
                }
                g.bindRenderbuffer(g.RENDERBUFFER, renderBuffer);
                g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, width, height);
                g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, renderBuffer);
                g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, texture, 0);
                g.bindRenderbuffer(g.RENDERBUFFER, undefined);
                g.bindFramebuffer(g.FRAMEBUFFER, undefined);
            }
            return b;
        };
        RTTexture.prototype.recycle = function () {
            var g = rf.gl;
            var _a = this, frameBuffer = _a.frameBuffer, renderBuffer = _a.renderBuffer, texture = _a.texture;
            if (frameBuffer) {
                g.deleteFramebuffer(frameBuffer);
                this.frameBuffer = undefined;
            }
            if (renderBuffer) {
                g.deleteRenderbuffer(renderBuffer);
                this.renderBuffer = undefined;
            }
            if (texture) {
                g.deleteTexture(texture);
                this.texture = undefined;
            }
            this.readly = false;
        };
        return RTTexture;
    }(Texture));
    rf.RTTexture = RTTexture;
    var CubeTexture = (function (_super) {
        __extends(CubeTexture, _super);
        function CubeTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.setting = {};
            _this.files = ["nx", 'ny', 'nz', 'px', 'py', 'pz'];
            _this.status = 0;
            return _this;
        }
        CubeTexture.prototype.awaken = function () {
            var tex = this.texture;
            var g = rf.gl;
            var data = [];
            var _a = this.cubePixels, nx = _a[0], ny = _a[1], nz = _a[2], px = _a[3], py = _a[4], pz = _a[5];
            var textureData = this.data;
            if (undefined == tex) {
                this.texture = tex = g.createTexture();
            }
            g.bindTexture(g.TEXTURE_CUBE_MAP, tex);
            g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, 1);
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, textureData.mag);
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, textureData.mix);
            var pepeat = textureData.repeat;
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_WRAP_S, pepeat);
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_WRAP_T, pepeat);
            g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, px);
            g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, nx);
            g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, py);
            g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, ny);
            g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, pz);
            g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, nz);
            if (textureData.mipmap) {
                g.generateMipmap(g.TEXTURE_CUBE_MAP);
            }
            g.bindTexture(g.TEXTURE_CUBE_MAP, null);
            this.readly = true;
            rf.context3D.bufferLink.add(this);
            return true;
        };
        CubeTexture.prototype.uploadContext = function (program, variable) {
            if (false == this.readly) {
                this.awaken();
            }
            var index = rf.context3D.texIndex++;
            var uniforms = program.uniforms;
            var g = rf.gl;
            var index_tex;
            g.activeTexture(rf.gl["TEXTURE" + index]);
            g.bindTexture(g.TEXTURE_CUBE_MAP, this.texture);
            if (true == uniforms.hasOwnProperty(variable)) {
                index_tex = uniforms[variable];
            }
            else {
                index_tex = g.getUniformLocation(program.program, variable);
                uniforms[variable] = index_tex;
            }
            if (undefined != index_tex) {
                g.uniform1i(index_tex, index);
            }
            this.preusetime = rf.engineNow;
        };
        CubeTexture.prototype.load = function (url, type) {
            if (type === void 0) { type = '.jpg'; }
            if (undefined == url) {
                url = this.data.url;
            }
            if (url.charAt(url.length - 1) != '/') {
                url += '/';
            }
            this.cubePixels = [];
            if (0 == this.status) {
                this.status = 1;
                var files = this.files;
                for (var i = 0; i < files.length; i++) {
                    var face = files[i];
                    rf.loadRes(rf.RES_PERFIX, url + face + type, this.loadComplete, this, 5);
                }
            }
        };
        CubeTexture.prototype.loadComplete = function (e) {
            if (e.type == 4) {
                var res = e.currentTarget;
                var image = e.data;
                this.width = image.width;
                this.height = image.height;
                var index = res.url.lastIndexOf('/');
                var fname = res.url.slice(index + 1);
                fname = fname.split('.')[0];
                index = this.files.indexOf(fname);
                this.cubePixels[index] = image;
                var b = true;
                for (var i = 0; i < 6; ++i) {
                    var pixels = this.cubePixels[i];
                    if (pixels == undefined) {
                        b = false;
                    }
                }
                if (b) {
                    this.status = 2;
                }
            }
            else {
                this.status = 3;
            }
        };
        CubeTexture.prototype.recycle = function () {
            if (this.texture) {
                rf.gl.deleteTexture(this.texture);
                this.texture = undefined;
            }
            this.readly = false;
        };
        return CubeTexture;
    }(Texture));
    rf.CubeTexture = CubeTexture;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Context3D = (function () {
        function Context3D() {
            this.logarithmicDepthBuffer = true;
            this.use_logdepth_ext = false;
            this.texIndex = 0;
            this.attribarray = {};
            this.defauleMag = 9728;
            this.textureObj = {};
            this.rttTextures = [];
            this.programs = {};
            this.bufferLink = new rf.Link();
            this.bufferLink.warningMax = 3000;
        }
        Context3D.prototype.createEmptyContext3DSetting = function () {
            var setting = {};
            setting.cull = 0;
            setting.depth = true;
            setting.depthMode = 515;
            setting.src = 770;
            setting.dst = 771;
            return setting;
        };
        Context3D.prototype.configureBackBuffer = function (width, height, antiAlias, enableDepthAndStencil) {
            if (antiAlias === void 0) { antiAlias = 0; }
            if (enableDepthAndStencil === void 0) { enableDepthAndStencil = true; }
            console.log("configureBackBuffer:" + width + "  " + height);
            var g = rf.gl;
            g.canvas.width = width;
            g.canvas.height = height;
            if (!rf.weixin) {
                var c = g.canvas;
                c.style.width = rf.windowWidth + "px";
                c.style.height = rf.windowHeight + "px";
            }
            this.backBufferWidth = width;
            this.backBufferHeight = height;
            g.viewport(0, 0, width, height);
            this._clearBit = g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT;
            g.disable(g.DEPTH_TEST);
            g.disable(g.CULL_FACE);
            g.enable(g.BLEND);
            g.colorMask(true, true, true, true);
            this.setting = this.createEmptyContext3DSetting();
            this.render_setting = {};
            g.activeTexture(g.TEXTURE0);
            g.activeTexture(g.TEXTURE1);
        };
        Context3D.prototype.lossScissor = function (rect) {
            var current = rf.scissorRect;
            var g = rf.gl;
            if (current && !rect) {
                g.disable(g.SCISSOR_TEST);
            }
            rf.scissorRect = rect;
            if (rect) {
                var y = rect.y, h = rect.h;
                y = Math.max(this.backBufferHeight - y - h, 0);
                rf.gl.scissor(rect.x, y, rect.w, h);
            }
        };
        Context3D.prototype.setScissor = function (rect, sceneX, sceneY, camera) {
            var current = rf.scissorRect;
            var invLen = rf.TEMP_MATRIX3D;
            invLen.m3_append(invLen.m3_invert(rf.ROOT.cameraUI.len), false, camera.worldTranform);
            var temp_rect = rf.TEMP_RECT;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            var v = rf.TEMP_VECTOR3D;
            v.x = sceneX + x;
            v.y = sceneY + y;
            v.z = 0;
            v.w = 1;
            invLen.m3_transformVector(v, v);
            temp_rect.x = v.x;
            temp_rect.y = v.y;
            v.x = sceneX + x + w;
            v.y = sceneY + y + h;
            v.z = 0;
            v.w = 1;
            invLen.m3_transformVector(v, v);
            temp_rect.w = v.x - temp_rect.x;
            if (temp_rect.y > v.y) {
                temp_rect.h = temp_rect.y - v.y;
                temp_rect.y = v.y;
            }
            else {
                temp_rect.h = v.y - temp_rect.y;
            }
            if (!current) {
                var g = rf.gl;
                g.enable(3089);
                x = temp_rect.x;
                y = temp_rect.y;
                w = temp_rect.w;
                h = temp_rect.h;
            }
            else {
                rf.size_intersection(current, temp_rect, temp_rect);
                x = temp_rect.x;
                y = temp_rect.y;
                w = temp_rect.w;
                h = temp_rect.h;
            }
            rf.scissorRect = { x: x, y: y, w: w, h: h };
            y = Math.max(this.backBufferHeight - y - h, 0);
            rf.gl.scissor(x, y, w, h);
            if (current) {
                return { x: current.x, y: current.y, w: current.w, h: current.h };
            }
            else {
                return undefined;
            }
        };
        Context3D.prototype.clear = function (red, green, blue, alpha, depth, stencil, mask) {
            if (red === void 0) { red = 0.0; }
            if (green === void 0) { green = 0.0; }
            if (blue === void 0) { blue = 0.0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (depth === void 0) { depth = 1.0; }
            if (stencil === void 0) { stencil = 0; }
            if (mask === void 0) { mask = 0xffffffff; }
            var g = rf.gl;
            var _a = this, backBufferWidth = _a.backBufferWidth, backBufferHeight = _a.backBufferHeight, render_setting = _a.render_setting;
            g.viewport(0, 0, backBufferWidth, backBufferHeight);
            g.disable(2929);
            g.disable(2884);
            g.disable(2960);
            g.enable(3042);
            g.blendFunc(770, 771);
            g.depthMask(true);
            g.colorMask(true, true, true, true);
            g.clearColor(red, green, blue, alpha);
            g.clearDepth(depth);
            g.clearStencil(stencil);
            g.clear(16384 | 256 | 1024);
            g.activeTexture(g.TEXTURE0);
            g.activeTexture(g.TEXTURE1);
        };
        Context3D.prototype.updateSetting = function (render_setting) {
            var g = rf.gl;
            var _a = this.setting, cull = _a.cull, depth = _a.depth, depthMode = _a.depthMode, src = _a.src, dst = _a.dst;
            if (cull != render_setting.cull) {
                if (cull == 0) {
                    g.disable(g.CULL_FACE);
                }
                else {
                    g.enable(g.CULL_FACE);
                    g.cullFace(cull);
                }
                render_setting.cull = cull;
            }
            if (depth != render_setting.depth || depthMode != render_setting.depthMode) {
                render_setting.depth = depth;
                render_setting.depthMode = depthMode;
                if (depth == false && render_setting.depthMode == g.ALWAYS) {
                    g.disable(g.DEPTH_TEST);
                    g.depthMask(depth);
                    g.depthFunc(depthMode);
                }
                else {
                    g.enable(g.DEPTH_TEST);
                    g.depthMask(depth);
                    g.depthFunc(depthMode);
                }
            }
            if (src != render_setting.src || dst != render_setting.dst) {
                render_setting.src = src;
                render_setting.dst = dst;
                g.blendFunc(src, dst);
            }
        };
        Context3D.prototype.createVertexBuffer = function (data, data32PerVertex, startVertex, numVertices, CLS) {
            if (data32PerVertex === void 0) { data32PerVertex = -1; }
            if (startVertex === void 0) { startVertex = 0; }
            if (numVertices === void 0) { numVertices = -1; }
            if (!CLS) {
                CLS = rf.VertexBuffer3D;
            }
            var buffer = rf.recyclable(CLS);
            if (data instanceof rf.VertexInfo) {
                buffer.data32PerVertex = data.data32PerVertex;
            }
            else {
                if (data32PerVertex == -1) {
                    rf.ThrowError("mast set data32PerVertex");
                    return null;
                }
                buffer.data32PerVertex = data32PerVertex;
            }
            buffer.uploadFromVector(data, startVertex, numVertices);
            return buffer;
        };
        Context3D.prototype.getIndexByQuad = function (quadCount) {
            var count = 100000;
            if (quadCount > count) {
                rf.ThrowError("你要这么多四边形干嘛？");
                return null;
            }
            if (undefined == this.indexByte) {
                var byte = new Uint16Array(count * 6);
                count *= 4;
                var j = 0;
                for (var i = 0; i < count; i += 4) {
                    byte[j++] = i;
                    byte[j++] = i + 1;
                    byte[j++] = i + 3;
                    byte[j++] = i + 1;
                    byte[j++] = i + 2;
                    byte[j++] = i + 3;
                }
                this.indexByte = this.createIndexBuffer(byte);
            }
            return this.indexByte;
        };
        Context3D.prototype.createIndexBuffer = function (data) {
            var buffer = rf.recyclable(rf.IndexBuffer3D);
            if (data instanceof ArrayBuffer) {
                buffer.uploadFromVector(new Uint16Array(data));
            }
            else {
                buffer.uploadFromVector(data);
            }
            return buffer;
        };
        Context3D.prototype.getTextureData = function (url, mipmap, mag, mix, repeat, y) {
            var defauleMag = this.defauleMag;
            var data = {};
            data.url = url;
            data.mipmap = undefined != mipmap ? mipmap : false;
            data.mag = undefined != mag ? mag : defauleMag;
            data.mix = undefined != mix ? mix : defauleMag;
            data.repeat = undefined != repeat ? repeat : 33071;
            data.y = y;
            return data;
        };
        Context3D.prototype.createTexture = function (key, pixels) {
            var texture = rf.recyclable(rf.Texture);
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            texture.pixels = pixels;
            if (pixels) {
                texture.width = pixels.width;
                texture.height = pixels.height;
            }
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.createEmptyTexture = function (key, width, height) {
            var texture = rf.recyclable(rf.Texture);
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            texture.width = width;
            texture.height = height;
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.createRttTexture = function (key, width, height) {
            var texture = new rf.RTTexture();
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            texture.width = width;
            texture.height = height;
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.createCubeTexture = function (key) {
            var texture = new rf.CubeTexture();
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.setRenderToTexture = function (texture, enableDepthAndStencil, antiAlias, surfaceSelector, colorOutputIndex) {
            if (enableDepthAndStencil === void 0) { enableDepthAndStencil = true; }
            if (antiAlias === void 0) { antiAlias = 0; }
            if (surfaceSelector === void 0) { surfaceSelector = 0; }
            if (colorOutputIndex === void 0) { colorOutputIndex = 0; }
            var g = rf.gl;
            this.rttTextures.push(texture);
            if (!texture.readly) {
                if (false == texture.awaken()) {
                    return;
                }
            }
            var frameBuffer = texture.frameBuffer, renderBuffer = texture.renderBuffer, textureObj = texture.texture, width = texture.width, height = texture.height, cleanColor = texture.cleanColor;
            if (enableDepthAndStencil) {
                texture.cleanBit = g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT;
            }
            else {
                texture.cleanBit = g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT;
            }
            texture.setting.src = -1;
            if (cleanColor) {
                g.clearColor(cleanColor.x, cleanColor.y, cleanColor.z, cleanColor.w);
            }
            else {
                g.clearColor(0, 0, 0, 0);
            }
            g.bindFramebuffer(g.FRAMEBUFFER, frameBuffer);
            g.viewport(0, 0, width, height);
            g.clear(texture.cleanBit);
            texture.preusetime = rf.engineNow;
        };
        Context3D.prototype.setRenderToBackBuffer = function () {
            var g = rf.gl;
            var _a = this, rttTextures = _a.rttTextures, render_setting = _a.render_setting;
            rttTextures.pop();
            var texture = rttTextures[rttTextures.length - 1];
            if (texture) {
                var frameBuffer = texture.frameBuffer, width = texture.width, height = texture.height;
                g.bindFramebuffer(g.FRAMEBUFFER, frameBuffer);
                g.viewport(0, 0, width, height);
            }
            else {
                var _b = this, backBufferWidth = _b.backBufferWidth, backBufferHeight = _b.backBufferHeight;
                g.bindFramebuffer(g.FRAMEBUFFER, null);
                g.viewport(0, 0, backBufferWidth, backBufferHeight);
            }
            render_setting.cull = 0;
            render_setting.depth = false;
            render_setting.depthMode = 0;
            render_setting.src = 0;
            render_setting.dst = 0;
        };
        Context3D.prototype.createProgram = function (vertexCode, fragmentCode, key) {
            var program;
            if (undefined != key) {
                program = this.programs[key];
                if (undefined == program) {
                    this.programs[key] = program = rf.recyclable(rf.Program3D);
                }
            }
            else {
                program = rf.recyclable(rf.Program3D);
            }
            program.vertexCode = vertexCode;
            program.fragmentCode = fragmentCode;
            return program;
        };
        Context3D.prototype.setProgramConstantsFromVector = function (variable, data, format, array, numstr) {
            if (array === void 0) { array = true; }
            if (numstr === void 0) { numstr = "f"; }
            var p = this.cProgram;
            var uniforms = p.uniforms;
            var g = rf.gl;
            var index;
            if (true == (variable in uniforms)) {
                index = uniforms[variable];
            }
            else {
                index = g.getUniformLocation(p.program, variable);
                uniforms[variable] = index;
            }
            if (undefined != index) {
                if (array) {
                    g['uniform' + format + numstr + 'v'](index, data);
                }
                else {
                    g['uniform' + format + numstr](index, data);
                }
            }
        };
        Context3D.prototype.setProgramConstantsFromMatrix = function (variable, rawData) {
            var p = this.cProgram;
            var uniforms = p.uniforms;
            var g = rf.gl;
            var index;
            if (true == (variable in uniforms)) {
                index = uniforms[variable];
            }
            else {
                index = g.getUniformLocation(p.program, variable);
                uniforms[variable] = index;
            }
            if (undefined != index) {
                g.uniformMatrix4fv(index, false, rawData);
            }
        };
        Context3D.prototype.setProgram = function (program) {
            if (!program)
                return;
            program.preusetime = rf.engineNow;
            if (false == program.readly) {
                if (false == program.awaken()) {
                    rf.ThrowError("program create error!");
                    return -1;
                }
            }
            else {
                if (program == this.cProgram)
                    return 1;
            }
            this.cProgram = program;
            rf.gl.useProgram(program.program);
            return 0;
        };
        Context3D.prototype.drawTriangles = function (indexBuffer, numTriangles, setting, offset) {
            if (offset === void 0) { offset = 0; }
            var g = rf.gl;
            this.updateSetting(setting || this.render_setting);
            if (undefined != indexBuffer) {
                if (false == indexBuffer.readly) {
                    if (false == indexBuffer.awaken()) {
                        throw new Error("create indexBuffer error!");
                    }
                }
                indexBuffer.preusetime = rf.engineNow;
                g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                g.drawElements(g.TRIANGLES, numTriangles * 3, g.UNSIGNED_SHORT, offset * 6);
            }
            else {
                g.drawArrays(g.TRIANGLES, 0, numTriangles * 3);
            }
            this.triangles += numTriangles;
            this.dc++;
            this.texIndex = 0;
        };
        Context3D.prototype.uniform1f = function (loc, data) {
            rf.gl.uniform1f(loc, data);
        };
        Context3D.prototype.uniform2f = function (loc, data) {
            rf.gl.uniform2f(loc, data[0], data[1]);
        };
        Context3D.prototype.uniform3f = function (loc, data) {
            rf.gl.uniform3f(loc, data[0], data[1], data[2]);
        };
        Context3D.prototype.updateUniformData = function (info, data) {
            var module = info.module;
            var f = this[module];
            if (!f) {
                rf.gl[module](info.loc, data);
            }
            else {
                f(info.loc, data);
            }
        };
        Context3D.prototype.gc = function (now) {
            var link = this.bufferLink;
            var hasChange = false;
            link.forEach(function (vo) {
                var buffer = vo.data;
                if (now - buffer.preusetime > buffer.gctime) {
                    buffer.recycle();
                    vo.close = true;
                    hasChange = true;
                }
                return true;
            }, this);
            if (hasChange)
                link.clean();
        };
        Context3D.prototype.toString = function () {
            var link = this.bufferLink;
            var v = 0, t = 0, p = 0, i = 0;
            link.forEach(function (vo) {
                var buffer = vo.data;
                if (buffer instanceof rf.VertexBuffer3D) {
                    v++;
                }
                else if (buffer instanceof rf.IndexBuffer3D) {
                    i++;
                }
                else if (buffer instanceof rf.Texture) {
                    t++;
                }
                else if (buffer instanceof rf.Program3D) {
                    p++;
                }
                return true;
            }, this);
            return "p:" + p + " i:" + i + " v:" + v + " t:" + t;
        };
        return Context3D;
    }());
    rf.Context3D = Context3D;
    function webGLSimpleReport() {
        var g = rf.gl;
        g.getParameter(g.MAX_VERTEX_ATTRIBS);
        g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
        g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
        g.getParameter(g.MAX_VARYING_VECTORS);
        g.getParameter(g.MAX_TEXTURE_IMAGE_UNITS);
        return {};
    }
    rf.webGLSimpleReport = webGLSimpleReport;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Light = (function (_super) {
        __extends(Light, _super);
        function Light() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.color = 0xFFFFFF;
            _this.intensity = 1.0;
            _this.lookVector = rf.newVector3D(0, 0, 0);
            return _this;
        }
        Light.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (this.status | 1) {
                var _a = this, transform = _a.transform, lookVector = _a.lookVector, sceneTransform = _a.sceneTransform, len = _a.len;
                this.updateTransform();
                this.sceneTransform.m3_invert(transform);
                this.worldTranform.m3_append(len, false, sceneTransform);
            }
            this.status = 0;
            return 0;
        };
        return Light;
    }(rf.Camera));
    rf.Light = Light;
    var DirectionalLight = (function (_super) {
        __extends(DirectionalLight, _super);
        function DirectionalLight() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lightoffset = rf.newVector3D();
            _this.normalsize = rf.newVector3D();
            return _this;
        }
        DirectionalLight.prototype.setDirectional = function (x, y, z) {
            this.setPos(x, y, z);
            this.normalsize.v3_normalize(this.pos);
        };
        DirectionalLight.prototype.setSunOffset = function (x, y, z) {
            var _a = this.lightoffset, tx = _a[0], ty = _a[1], tz = _a[2];
            this.setPos(x + tx, y + ty, z + tz);
        };
        return DirectionalLight;
    }(Light));
    rf.DirectionalLight = DirectionalLight;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject(variables, mouseEnabled, source) {
            var _this = _super.call(this, source, variables) || this;
            _this.distance = Number.MAX_VALUE;
            if (mouseEnabled) {
                _this.minBoundingBox = new rf.OBB();
                _this.boundingSphere = new rf.Sphere();
                _this.distance = Number.MAX_VALUE;
            }
            return _this;
        }
        SceneObject.prototype.update = function (now, interval) {
        };
        SceneObject.prototype.addChild = function (child) {
            if (child instanceof SceneObject) {
                var scene_1 = this.scene;
                child.scene = scene_1;
                if (scene_1) {
                    scene_1.childChange = true;
                }
            }
            _super.prototype.addChild.call(this, child);
        };
        Object.defineProperty(SceneObject.prototype, "available", {
            get: function () {
                return undefined != this.geometry;
            },
            enumerable: true,
            configurable: true
        });
        SceneObject.prototype.addChildAt = function (child, index) {
            if (child instanceof SceneObject) {
                var scene_2 = this.scene;
                child.scene = scene_2;
                if (scene_2) {
                    scene_2.childChange = true;
                }
            }
            _super.prototype.addChildAt.call(this, child, index);
        };
        SceneObject.prototype.removeChild = function (child) {
            if (undefined == child) {
                return;
            }
            _super.prototype.removeChild.call(this, child);
            if (child instanceof SceneObject) {
                if (child.scene) {
                    child.removeFromStage();
                }
                child.scene = undefined;
                rf.scene.childChange = true;
            }
        };
        SceneObject.prototype.removeAllChild = function () {
            var childrens = this.childrens;
            childrens.forEach(function (vo) {
                var child = vo.data;
                vo.close = true;
                child.stage = undefined;
                child.parent = undefined;
                if (child instanceof SceneObject) {
                    child.scene = undefined;
                }
                child.removeFromStage();
                return true;
            }, this);
            childrens.clean();
        };
        SceneObject.prototype.removeFromStage = function () {
            var childrens = this.childrens;
            childrens.forEach(function (vo) {
                var child = vo.data;
                child.stage = undefined;
                if (child instanceof SceneObject) {
                    child.scene = undefined;
                }
                child.removeFromStage();
                return true;
            }, this);
        };
        SceneObject.prototype.addToStage = function () {
            var _a = this, childrens = _a.childrens, scene = _a.scene, stage = _a.stage;
            childrens.forEach(function (vo) {
                var child = vo.data;
                child.stage = stage;
                if (child instanceof SceneObject) {
                    child.scene = scene;
                }
                child.addToStage();
                return true;
            }, this);
        };
        SceneObject.prototype.renderShadow = function (sun, p, c, worldTranform, now, interval) {
            var _a = this, geometry = _a.geometry, sceneTransform = _a.sceneTransform;
            geometry.vertex.uploadContext(p);
            worldTranform.m3_append(sun.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
        };
        SceneObject.prototype.raycast = function (raycaster, intersects) {
            var geometry = this.geometry;
            if (!geometry)
                return intersects;
            if (this.minBoundingBox == undefined || this.minBoundingBox.change) {
                var obb = this.minBoundingBox = rf.OBB.updateOBBByGeometry(geometry, this.minBoundingBox);
                geometry.centerPoint.set([(obb.minx + obb.maxx) * 0.5, (obb.miny + obb.maxy) * 0.5, (obb.minz + obb.maxz) * 0.5, 1]);
            }
            if (this.boundingSphere == undefined || this.boundingSphere.change) {
                this.boundingSphere = geometry.calculateBoundingSphere(geometry.centerPoint, this.boundingSphere);
            }
            var sphere = SceneObject.sphere;
            sphere.copyFrom(this.boundingSphere);
            sphere.applyMatrix4(this.sceneTransform, sphere);
            if (raycaster.ray.intersectsSphere(sphere) == false) {
                return intersects;
            }
            var ray = SceneObject.ray;
            ray.copyFrom(raycaster.ray).applyMatrix4(this.invSceneTransform);
            var intersectPoint = ray.intersectBox(this.minBoundingBox);
            if (intersectPoint == null) {
                return intersects;
            }
            this.sceneTransform.m3_transformVector(intersectPoint, intersectPoint);
            rf.TEMP_VECTOR3D.set(raycaster.ray.origin);
            rf.TEMP_VECTOR3D.v3_sub(intersectPoint, rf.TEMP_VECTOR3D);
            var distance = rf.TEMP_VECTOR3D.v3_length;
            if (distance < raycaster.near || distance > raycaster.far) {
                return intersects;
            }
            intersects = intersects || [];
            intersects.push({ "obj": this, "distance": distance, "point": intersectPoint });
            return intersects;
        };
        SceneObject.sphere = new rf.Sphere();
        SceneObject.ray = new rf.Ray();
        return SceneObject;
    }(rf.Sprite));
    rf.SceneObject = SceneObject;
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(variables, mouseEnabled) {
            var _this = _super.call(this, variables) || this;
            _this.scene = _this;
            if (mouseEnabled) {
                _this.hitArea = new rf.HitArea();
                _this.hitArea.allWays = true;
                _this.rayCaster = new rf.Raycaster(50000);
            }
            else {
                _this.mouseChildren = false;
                _this.mouseEnabled = false;
            }
            _this.nativeRender = true;
            _this.name = "Scene";
            return _this;
        }
        Scene.prototype.render = function (camera, option) {
            var _a = this, _camera = _a.camera, childrens = _a.childrens;
            var c = rf.context3D;
            var g = rf.gl;
            if (undefined == _camera) {
                _camera = camera;
            }
            if (_camera.status) {
                _camera.updateSceneTransform();
            }
            if (childrens.__length) {
                _super.prototype.render.call(this, _camera, option);
            }
        };
        Scene.prototype.getObjectByPoint = function (dx, dy, scale) {
            if (!this.mouseEnabled) {
                return;
            }
            if (this.camera == undefined) {
                return;
            }
            var v = rf.TEMP_VECTOR3D;
            v.x = rf.originMouseX;
            v.y = rf.originMouseY;
            v.z = 0;
            v.w = 1;
            rf.ROOT.cameraUI.len.m3_transformVector(v, v);
            var mx = v[0];
            var my = v[1];
            this.rayCaster.setFromCamera(mx, my, this.camera);
            var intersects = this.rayCaster.intersectObjects(this.childrens.datas, true);
            if (intersects.length) {
                return intersects[0].obj;
            }
            else {
                return _super.prototype.getObjectByPoint.call(this, dx, dy, scale);
            }
        };
        return Scene;
    }(SceneObject));
    rf.Scene = Scene;
    var AllActiveSprite = (function (_super) {
        __extends(AllActiveSprite, _super);
        function AllActiveSprite(source, variables) {
            var _this = _super.call(this, source, variables) || this;
            _this.hitArea.allWays = true;
            _this.mouseEnabled = false;
            return _this;
        }
        return AllActiveSprite;
    }(rf.Sprite));
    rf.AllActiveSprite = AllActiveSprite;
    var NoActiveSprite = (function (_super) {
        __extends(NoActiveSprite, _super);
        function NoActiveSprite(source, variables) {
            var _this = _super.call(this, source, variables) || this;
            _this.mouseEnabled = false;
            _this.mouseChildren = false;
            return _this;
        }
        return NoActiveSprite;
    }(rf.Sprite));
    rf.NoActiveSprite = NoActiveSprite;
    var Stage3D = (function (_super) {
        __extends(Stage3D, _super);
        function Stage3D() {
            var _this = _super.call(this) || this;
            _this.names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            _this.renderOption = {};
            _this.renderer = new rf.SuperBatchRenderer(_this);
            _this.shadow = new ShadowEffect(2300, 3000);
            _this.renderLink = new rf.Link();
            _this.stage = _this;
            _this.name = "Stage3D";
            return _this;
        }
        Stage3D.prototype.requestContext3D = function (canvas) {
            this.canvas = canvas;
            var contextAttributes = {};
            if (rf.isMobile) {
                contextAttributes.antialias = false;
            }
            else {
                contextAttributes.antialias = true;
            }
            contextAttributes.stencil = false;
            contextAttributes.depth = true;
            var names = this.names;
            for (var i = 0; i < names.length; i++) {
                try {
                    rf.gl = this.canvas.getContext(names[i], contextAttributes);
                }
                catch (e) {
                }
                if (rf.gl) {
                    break;
                }
            }
            if (undefined == rf.gl) {
                rf.context3D = null;
                this.simpleDispatch(18, "webgl is not available");
                return false;
            }
            rf.context3D = rf.singleton(rf.Context3D);
            rf.singleton(rf.Mouse).init();
            this.simpleDispatch(9, rf.gl);
            return true;
        };
        Stage3D.prototype.update = function (now, interval) {
            if (this.status & 16) {
                _super.prototype.updateSceneTransform.call(this, 0);
            }
            var _a = this, renderLink = _a.renderLink, shadow = _a.shadow, renderOption = _a.renderOption, camera = _a.camera;
            var c = rf.context3D;
            c.dc = 0;
            c.triangles = 0;
            c.clear(0, 0, 0, 1);
            renderOption.now = now;
            renderOption.interval = interval;
            if (camera.status) {
                camera.updateSceneTransform();
            }
            this.render(this.camera, renderOption);
        };
        Stage3D.prototype.resize = function (width, height) {
            this.w = rf.stageWidth;
            this.h = rf.stageHeight;
            var _a = this, camera2D = _a.camera2D, cameraUI = _a.cameraUI, camera3D = _a.camera3D, cameraOrth = _a.cameraOrth, cameraPerspective = _a.cameraPerspective;
            if (cameraUI) {
                rf.CameraUIResize(width, height, cameraUI.len, cameraUI.far, cameraUI.originFar, cameraUI);
            }
            if (camera2D) {
                rf.CameraUIResize(width, height, camera2D.len, camera2D.far, camera2D.originFar, camera2D);
            }
            if (camera3D) {
                rf.Camera3DResize(width, height, camera3D.len, camera3D.far, camera3D.originFar, camera3D);
            }
            if (cameraOrth) {
                rf.CameraOrthResize(width, height, cameraOrth.len, cameraOrth.far, cameraOrth.originFar, cameraOrth);
            }
            if (cameraPerspective) {
                rf.PerspectiveResize(width, height, cameraPerspective.len, cameraPerspective.far, 40, cameraPerspective);
            }
        };
        Stage3D.prototype.filterRenderList = function (d, link) {
            var _this = this;
            var childrens = d.childrens;
            childrens.forData(function (m) {
                if (m.available && (m.shadowTarget || m.shadowCast)) {
                    link.add(m);
                }
                _this.filterRenderList(m, link);
                return true;
            }, this);
        };
        Stage3D.prototype.getObjectByPoint = function (dx, dy, scale) {
            return _super.prototype.getObjectByPoint.call(this, dx + this._x, dy + this._y, scale);
        };
        return Stage3D;
    }(AllActiveSprite));
    rf.Stage3D = Stage3D;
    var ShadowEffect = (function () {
        function ShadowEffect(w, h) {
            this.w = w;
            this.h = h;
            this.m = new rf.ShadowMaterial();
            this.m.setData(undefined);
            this.len = rf.newMatrix3D();
            rf.CameraOrthResize(w, h, this.len, 10000, 10000 / Math.PI2);
        }
        ShadowEffect.prototype.render = function (link, sun, now, interval) {
            var _a = this, m = _a.m, rtt = _a.rtt, len = _a.len, w = _a.w, h = _a.h;
            if (sun.status || sun.len != len) {
                sun.len = len;
                sun.updateSceneTransform();
            }
            var c = rf.context3D;
            if (!rtt) {
                this.rtt = rtt = c.createRttTexture(c.getTextureData("ShadowMaterial"), 2048, 2048);
                rtt.cleanColor = rf.toRGBA(0xFFFFFFFF);
                rtt.setting.src = 1;
            }
            var g = rf.gl;
            c.setRenderToTexture(rtt, false);
            var passCompareMode = m.passCompareMode, cull = m.cull, program = m.program;
            var worldTranform = rf.TEMP_MATRIX3D;
            g.disable(g.BLEND);
            link.forEach(function (vo) {
                var obj = vo.data;
                var shadowable = obj.shadowCast, shadowTarget = obj.shadowTarget, geometry = obj.geometry, shadowMatrix = obj.shadowMatrix, sceneTransform = obj.sceneTransform;
                if (shadowable) {
                    m.uploadContext(sun, obj, now, interval);
                    var p = m.program;
                    obj.renderShadow(sun, p, c, worldTranform, now, interval);
                    c.drawTriangles(geometry.index, geometry.numTriangles, rtt.setting);
                }
                if (shadowTarget) {
                    if (!shadowMatrix) {
                        obj.shadowMatrix = shadowMatrix = rf.newMatrix3D();
                    }
                    shadowMatrix.m3_append(sun.worldTranform, false, sceneTransform);
                }
                return true;
            }, this);
            c.setRenderToBackBuffer();
            g.enable(g.BLEND);
        };
        return ShadowEffect;
    }());
    rf.ShadowEffect = ShadowEffect;
    var PassContainer = (function (_super) {
        __extends(PassContainer, _super);
        function PassContainer(variables) {
            var _this = _super.call(this, variables) || this;
            _this.hitArea = new rf.HitArea();
            _this.hitArea.allWays = true;
            return _this;
        }
        PassContainer.prototype.render = function (camera, option) {
            var _camera = this.camera;
            var c = rf.context3D;
            var g = rf.gl;
            if (undefined == _camera) {
                _camera = camera;
            }
            if (_camera.status) {
                _camera.updateSceneTransform();
            }
            this.material.uploadContextSetting();
            _super.prototype.render.call(this, _camera, option);
        };
        return PassContainer;
    }(rf.RenderBase));
    rf.PassContainer = PassContainer;
    var UIContainer = (function (_super) {
        __extends(UIContainer, _super);
        function UIContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIContainer.prototype.render = function (camera, option) {
            var cameraUI = rf.ROOT.cameraUI;
            if (cameraUI.status) {
                cameraUI.updateSceneTransform();
            }
            this.material.uploadContextSetting();
            _super.prototype.render.call(this, cameraUI, option);
        };
        return UIContainer;
    }(AllActiveSprite));
    rf.UIContainer = UIContainer;
    function getChildrenCount(d, deep) {
        var _this = this;
        if (deep === void 0) { deep = 0; }
        var count = 0;
        deep++;
        if (deep > 50) {
            console.log("too depth  ");
            return 0;
        }
        d.childrens.forEach(function (vo) {
            var child = vo.data;
            count++;
            if (child instanceof rf.DisplayObjectContainer) {
                count += _this.getChildrenCount(child, deep);
            }
            return true;
        }, this);
        return count;
    }
    rf.getChildrenCount = getChildrenCount;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.logging = true;
    function __log(msg) {
        if (typeof rf.showLog != "undefined") {
            rf.showLog(true);
            rf.log(msg);
        }
    }
    rf.__log = __log;
    var AppBase = (function () {
        function AppBase(orientation) {
            var _this = this;
            if (orientation === void 0) { orientation = "portrait"; }
            this.gcDelay = 3000;
            this.softKeyBoardHandler = function (width, height) {
                var d = Math.floor((height / _this.appHeight) * rf.stageHeight);
                if (d < rf.editTF.stageY) {
                    rf.ROOT.y = (rf.stageHeight - rf.editTF.stageY - rf.editTF.textHeight) - (_this.appHeight - height) / _this.appHeight * rf.stageHeight - 10;
                }
            };
            this.appWidth = 0;
            this.appHeight = 0;
            rf.deviceOrientation = orientation;
            rf.onDeviceOrientationChange(this.onDeviceOrientationChange);
            rf.resizeStageSizeFunction = this.appResize.bind(this);
            rf.contextMatrix2D = rf.newMatrix3D();
            rf.contextMatrix3D = rf.newMatrix3D();
            rf.contextInvMatrix = rf.newMatrix3D();
            var info = rf.getSystemInfoSync();
            console.log(info);
            rf.systemInfo = info;
            rf.isMobile = info.platform != "pc";
            rf.platform = info.platform;
            rf.sceneWidth = info.screenWidth;
            rf.sceneHeight = info.screenHeight;
            rf.windowWidth = info.windowWidth;
            rf.windowHeight = info.windowHeight;
            rf.pixelRatio = info.pixelRatio;
            this.createSource();
            rf.ScriptTweenIns = {
                "pro": rf.STweenPro,
                "scale": rf.STweenBase,
                "alpha": rf.STweenBase,
                "liner": rf.STweenLiner
            };
            rf.ROOT = rf.singleton(rf.Stage3D);
            this.initROOT();
            rf.Engine.fpsHandler = function () {
                rf.ROOT.simpleDispatch(rf.EngineEvent.FPS_CHANGE);
            };
            if (!rf.weixin) {
                rf.ROOT.on(64, this.rolldownHandler, this);
                rf.ROOT.on(63, this.rollupHandler, this);
            }
        }
        AppBase.prototype.rolldownHandler = function (event) {
            var mouseDownY = event.data.mouseDownY;
            if (mouseDownY < 50) {
                if (typeof rf.showLog != "undefined") {
                    rf.showLog(true);
                }
            }
        };
        AppBase.prototype.rollupHandler = function (event) {
            var mouseDownY = event.data.mouseDownY;
            if (mouseDownY < 200) {
                if (typeof rf.showLog != "undefined") {
                    rf.showLog(false);
                }
            }
        };
        AppBase.prototype.init = function (canvas) {
            rf.no_maincanvas = canvas;
            var b = rf.ROOT.requestContext3D(canvas);
            if (false == b) {
                console.log("GL create fail");
                return;
            }
            this.initCanvas(canvas);
            this.initContainer(rf.ROOT.camera2D, true);
            rf.mainKey.init();
            rf.Engine.addResize(this.resize, this);
            rf.Engine.addTick(this.update, this);
            rf.pass_init_mesh();
            rf.ROOT.addEventListener(rf.EngineEvent.FPS_CHANGE, this.gcChangeHandler, this);
            this.nextGCTime = rf.engineNow + this.gcDelay;
            rf.Engine.start();
        };
        AppBase.prototype.onDeviceOrientationChange = function (value) {
            rf.currentOrientation = value.value;
        };
        AppBase.prototype.initCanvas = function (canvas) {
        };
        AppBase.prototype.createSource = function () {
            rf.componentSource = rf.createBitmapSource("component", 512, 512, true);
            rf.textSource = rf.createBitmapSource("textsource", 1024, 1024, true);
        };
        AppBase.prototype.initROOT = function () {
            var r = rf.ROOT;
            r.camera2D = new rf.Camera();
            r.camera = r.cameraUI = new rf.Camera();
        };
        AppBase.prototype.initContainer = function (sceneCamera, sceneMouse) {
            var g = rf.gl;
            var isFragDepthAvailable = g.getExtension("EXT_frag_depth");
            rf.context3D.use_logdepth_ext = isFragDepthAvailable ? true : false;
            var uiContainer = new rf.UIContainer(undefined, rf.vertex_ui_variable);
            uiContainer.name = "uiContainer";
            uiContainer.renderer = new rf.SuperBatchRenderer(uiContainer);
            var material = new rf.Material();
            material.depthMask = false;
            material.passCompareMode = 519;
            material.srcFactor = 770;
            material.dstFactor = 771;
            material.cull = 0;
            uiContainer.material = material;
            rf.floorContainer = new rf.NoActiveSprite();
            rf.floorContainer.name = "floorContainer";
            rf.popContainer = new rf.AllActiveSprite();
            rf.popContainer.name = "popContainer";
            rf.tipContainer = new rf.AllActiveSprite();
            rf.tipContainer.name = "tipContainer";
            rf.popContainer.mouseEnabled = false;
            rf.tipContainer.mouseEnabled = false;
            rf.ROOT.addChild(uiContainer);
            uiContainer.addChild(rf.floorContainer);
            uiContainer.addChild(rf.popContainer);
            uiContainer.addChild(rf.tipContainer);
        };
        AppBase.prototype.update = function (now, interval) {
            rf.tweenUpdate();
            rf.ROOT.update(now, interval);
        };
        AppBase.prototype.appResize = function (width, height) {
            if (rf.no_softKeyboard) {
                this.softKeyBoardHandler(width, height);
                return;
            }
            this.appWidth = width;
            this.appHeight = height;
            rf.windowWidth = width;
            rf.windowHeight = height;
            var tw = Math.floor(width * rf.pixelRatio);
            var th = Math.floor(height * rf.pixelRatio);
            if (tw == rf.innerWidth && th == rf.innerHeight) {
                rf.ROOT.y = 0;
                return;
            }
            rf.innerWidth = tw;
            rf.innerHeight = th;
            var dy = 0;
            if (!rf.lockStageArea) {
                if (rf.deviceOrientation == "landscape") {
                    if (rf.currentOrientation == "portrait") {
                        rf.stageWidth = rf.innerHeight;
                        rf.stageHeight = rf.innerWidth - dy;
                        rf.setContextMatrix(height, width, 0, dy);
                    }
                    else {
                        rf.stageWidth = rf.innerWidth;
                        rf.stageHeight = rf.innerHeight - dy;
                        rf.setContextMatrix(width, height, 0, dy);
                    }
                }
                else {
                    if (rf.currentOrientation == "portrait") {
                        rf.stageWidth = rf.innerWidth;
                        rf.stageHeight = rf.innerHeight - dy;
                        rf.setContextMatrix(width, height, 0, dy);
                    }
                    else {
                        rf.stageWidth = rf.innerHeight;
                        rf.stageHeight = rf.innerWidth - dy;
                        rf.setContextMatrix(height, width, 0, dy);
                    }
                }
            }
            else {
                if (rf.deviceOrientation == "landscape") {
                    if (rf.currentOrientation == "portrait") {
                        rf.setContextMatrix(height, width, 0, dy);
                    }
                    else {
                        rf.setContextMatrix(width, height, 0, dy);
                    }
                }
                else {
                    if (rf.currentOrientation == "portrait") {
                        rf.setContextMatrix(width, height, 0, dy);
                    }
                    else {
                        rf.setContextMatrix(height, width, 0, dy);
                    }
                }
            }
            var link = rf.Engine.resizeLink;
            width = rf.stageWidth;
            height = rf.stageHeight;
            link.forEach(function (vo) {
                var data = vo.data, thisObj = vo.thisObj;
                data.call(thisObj, width, height);
                return true;
            }, this);
        };
        AppBase.prototype.resize = function (width, height) {
            var c = rf.context3D;
            c.configureBackBuffer(rf.innerWidth, rf.innerHeight, 0);
            rf.ROOT.resize(rf.innerWidth, rf.innerHeight);
            rf.ROOT.camera.status = 1;
            rf.ROOT.cameraUI.status = 1;
        };
        AppBase.prototype.gcChangeHandler = function (event) {
            var _a = this, nextGCTime = _a.nextGCTime, gcDelay = _a.gcDelay;
            var now = rf.engineNow;
            if (now > nextGCTime) {
                rf.context3D.gc(now);
                rf.http_gc(now);
                this.nextGCTime += gcDelay;
            }
        };
        return AppBase;
    }());
    rf.AppBase = AppBase;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var StageDebug = (function (_super) {
        __extends(StageDebug, _super);
        function StageDebug() {
            var _this = _super.call(this) || this;
            _this._time = 0;
            return _this;
        }
        StageDebug.prototype.resize = function (w, h) {
            _super.prototype.resize.call(this, w, h);
        };
        StageDebug.prototype.createSource = function () {
            _super.prototype.createSource.call(this);
        };
        StageDebug.prototype.initROOT = function () {
            rf.deviceOrientation = "portrait";
            var r = rf.ROOT;
            r.camera2D = rf.singleton(rf.Arpg2DCamera);
            rf.ROOT.camera3D = new rf.Camera(10000, rf.contextMatrix3D);
            rf.ROOT.cameraPerspective = new rf.Camera(10000, rf.contextMatrix3D);
            rf.ROOT.cameraOrth = new rf.Camera();
            r.camera = r.cameraUI = new rf.Camera();
        };
        StageDebug.prototype.init = function (canvas) {
            _super.prototype.init.call(this, canvas);
            rf.defalue_format.family = "Arial";
            rf.defalue_format.size = 20;
            rf.defalue_format.stroke = { size: 2, color: 0 };
            rf.defalue_format.init();
            if (undefined == rf.gl) {
                return;
            }
            rf.context3D.defauleMag = 9729;
            rf.CONFIG_PERFIX = "https://localres.lingyunetwork.com/chuanshih5/web/config/zhcn/trunk/";
            var sp;
            var g;
            var t;
            sp = new rf.Sprite();
            g = sp.graphics;
            rf.ROOT.addChild(sp);
            g.clear();
            g.drawRect(0, 0, rf.stageWidth, rf.stageHeight, 0xFFFFFF);
            g.end();
            this.loadTest();
        };
        StageDebug.prototype.testmesh = function (e) {
        };
        StageDebug.prototype.moreItems = function (e) {
        };
        StageDebug.prototype.timerTest = function () {
        };
        StageDebug.prototype.randomtxt = function () {
        };
        StageDebug.prototype.map2dTest = function () {
        };
        StageDebug.prototype.mouseWheelHandler = function (event) {
        };
        StageDebug.prototype.attack = function (e) {
            switch (e.keyCode) {
                case 67:
                    break;
            }
        };
        StageDebug.prototype.moveTest = function (e) {
        };
        StageDebug.prototype.mouseWheel3dHandler = function (event) {
        };
        StageDebug.prototype.unit3dCamera2DTest = function () {
        };
        StageDebug.prototype.unit3dTest = function () {
        };
        StageDebug.prototype.initCamera3d = function () {
        };
        StageDebug.prototype.rayClickTest = function (e) {
        };
        StageDebug.prototype.filterTest = function () {
        };
        StageDebug.prototype.superBatchTest = function () {
            rf.ROOT.addChild(rf.singleton(rf.GUIProfile));
        };
        StageDebug.prototype.kfmtest = function () {
        };
        StageDebug.prototype.quaternionTest = function () {
        };
        StageDebug.prototype.circleTest = function () {
        };
        StageDebug.prototype.testtest = function () {
        };
        StageDebug.prototype.fontTest = function () {
            var option = {};
            option.complete = function (loadfont, style) {
                rf.defalue_format.family = loadfont.family;
                rf.defalue_format.size = 20;
                rf.defalue_format.stroke = { size: 2, color: 0 };
                rf.defalue_format.init();
                var t;
                var sp;
                var g;
                t = new rf.TextField();
                t.setSize(300, 20);
                t.setPos(0, 200);
                rf.ROOT.addChild(t);
                t.format = rf.defalue_format;
                t.format.align = 1;
                t.html = true;
                t.gap = 4;
                t.text = "\u5230<a href=''>\u5929\u4E0B\u9152\u697C</a>\u627E\u4F5F\u638C\u67DC";
                var textCanvas = rf.TextFormatCanvas;
                sp = new rf.Sprite();
                g = sp.graphics;
                g.clear();
                g.drawRect(0, 0, textCanvas.width, textCanvas.height, 0x666666);
                g.end();
                rf.ROOT.addChild(sp);
                var canvasSprite = new rf.BitmapSource().create("abc", rf.TextFormatCanvas).getSprite();
                rf.ROOT.addChild(canvasSprite);
            };
            rf.loadFont("http://127.0.0.1/xiakexing/res/font/font.ttf", "myfont", option);
        };
        StageDebug.prototype.loadTest = function () {
            return __awaiter(this, void 0, void 0, function () {
                var vo, vo2, sp, g;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, rf.loadImage("http://127.0.0.1/", "222.png")];
                        case 1:
                            vo = _a.sent();
                            return [4, rf.loadImage("http://127.0.0.1/", "111.png")];
                        case 2:
                            vo2 = _a.sent();
                            sp = new rf.Sprite();
                            sp.source = rf.componentSource;
                            g = sp.graphics;
                            g.clear();
                            g.drawBitmap(0, 0, vo);
                            g.drawBitmap(0, 0, vo2);
                            g.end();
                            rf.ROOT.addChild(sp);
                            console.log(vo);
                            sp = new rf.Sprite();
                            g = sp.graphics;
                            rf.ROOT.addChild(sp);
                            g.clear();
                            g.drawRect(0, 0, 100, 100, 0);
                            g.end();
                            return [2];
                    }
                });
            });
        };
        return StageDebug;
    }(rf.AppBase));
    rf.StageDebug = StageDebug;
    function qua2mat(qua, pos) {
        var xx = qua.x * qua.x;
        var yy = qua.y * qua.y;
        var zz = qua.z * qua.z;
        var ww = qua.w * qua.w;
        var xy2 = 2 * qua.x * qua.y;
        var xz2 = 2 * qua.x * qua.z;
        var xw2 = 2 * qua.x * qua.w;
        var yz2 = 2 * qua.y * qua.z;
        var yw2 = 2 * qua.y * qua.w;
        var zw2 = 2 * qua.z * qua.w;
        var rawData = rf.newMatrix3D();
        rawData[0] = xx - yy - zz + ww;
        rawData[4] = xy2 - zw2;
        rawData[8] = xz2 + yw2;
        rawData[12] = pos.x;
        rawData[1] = xy2 + zw2;
        rawData[5] = -xx + yy - zz + ww;
        rawData[9] = yz2 - xw2;
        rawData[13] = pos.y;
        rawData[2] = xz2 - yw2;
        rawData[6] = yz2 + xw2;
        rawData[10] = -xx - yy + zz + ww;
        rawData[14] = pos.z;
        rawData[3] = 0;
        rawData[7] = 0;
        rawData[11] = 0;
        rawData[15] = 1;
        return rawData;
    }
    rf.qua2mat = qua2mat;
})(rf || (rf = {}));
var skill;
(function (skill) {
    skill.testskill = {};
})(skill || (skill = {}));
var rf;
(function (rf) {
    var Anim2dSource = (function (_super) {
        __extends(Anim2dSource, _super);
        function Anim2dSource(url) {
            var _this = _super.call(this) || this;
            _this.name = url;
            _this.status = 0;
            _this.completeFuncs = [];
            return _this;
        }
        Anim2dSource.prototype.load = function () {
            this.status = 1;
            rf.loadRes(rf.RES_PERFIX, this.name, this.loadConfigComplete, this, 1);
        };
        Anim2dSource.prototype.loadConfigComplete = function (event) {
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var name = this.name;
            var _a = event.currentTarget, data = _a.data, url = _a.url;
            if (url != name)
                return;
            var i = name.lastIndexOf("/") + 1;
            data.p = name.slice(0, i);
            data.n = name.slice(i, name.lastIndexOf("."));
            this.loadByConfig(data);
        };
        Anim2dSource.prototype.loadByConfig = function (data) {
            this.config = data;
            var matrix2d = data.matrix2d;
            if (matrix2d instanceof ArrayBuffer) {
                data.matrix2d = new Float32Array(matrix2d);
            }
            var perfix = data.p + data.n + ".png";
            this.status = 1;
            rf.loadRes(rf.RES_PERFIX, perfix, this.loadImageComplete, this, 5);
        };
        Anim2dSource.prototype.loadImageComplete = function (event) {
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var bmd = this.bmd = event.data;
            this.width = bmd.width;
            this.height = bmd.height;
            var area = this.setArea(rf.BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            area.frames = this.config.fs;
            this.status = 2;
            this.simpleDispatch(4);
            var completeFuncs = this.completeFuncs;
            for (var i = 0; i < completeFuncs.length; i++) {
                var element = completeFuncs[i];
                element(this);
            }
            completeFuncs.length = 0;
        };
        return Anim2dSource;
    }(rf.BitmapSource));
    rf.Anim2dSource = Anim2dSource;
    var Ani = (function (_super) {
        __extends(Ani, _super);
        function Ani(source) {
            var _this = _super.call(this, source) || this;
            _this.cur = 0;
            _this.max = 0;
            _this.lock = -1;
            _this.tm = rf.defaultTimeMixer;
            _this.renderer = new rf.SingleRenderer(_this);
            _this.source = undefined;
            _this.extention = ".ha";
            return _this;
        }
        Ani.prototype.load = function (url) {
            this.removeTime = -1;
            this.nt = this.tm.now;
            var source = anim_getSource(url, this.extention);
            this.url = source.name;
            if (source.status == 2) {
                this.play(source);
            }
            else if (source.status == 1) {
                source.on(4, this.onSouceComplete, this);
            }
            return source;
        };
        Ani.prototype.onSouceComplete = function (e) {
            if (e.type != 4) {
                return;
            }
            var source = e.currentTarget;
            if (source.name == this.url) {
                source.off(e.type, this.onSouceComplete, this);
                this.play(source);
                this.simpleDispatch(4);
            }
        };
        Ani.prototype.play = function (source) {
            var config = source.config;
            this.source = source;
            this.config = config;
            this.t = ~~this.t == 0 ? config.t : this.t;
            this.max = config.m;
            this.nt = this.tm.now;
            this.cur = this.lock != -1 ? this.lock : 0;
            this.st == ~~this.st ? this.tm.now : this.st;
            this.renderFrame(this.cur);
        };
        Ani.prototype.render = function (camera, option) {
            var _a = this, source = _a.source, parentAni = _a.parentAni, _visible = _a._visible, config = _a.config, lock = _a.lock;
            if (!source)
                return;
            if (source.status != 2)
                return;
            if (!config)
                return;
            if (!_visible) {
                return;
            }
            _super.prototype.render.call(this, camera, option);
            if (lock != -1)
                return;
            if (parentAni)
                return;
            var _b = this, tm = _b.tm, nt = _b.nt, t = _b.t, once = _b.once, removeTime = _b.removeTime;
            if (removeTime > 0 && tm.now > removeTime) {
                this.onComplete();
                return;
            }
            var dt = tm.now - nt;
            if (dt > 0) {
                var _c = this, max = _c.max, cur = _c.cur, config_1 = _c.config;
                if (cur >= max - 1) {
                    cur = config_1.l;
                    if (once == 1) {
                        this.once = 0;
                        this.onceComplete(true);
                        return;
                    }
                    if (cur == -1 || once == -1) {
                        this.onComplete();
                        return;
                    }
                }
                else {
                    cur++;
                }
                this.cur = cur;
                if (dt > 200) {
                    nt = Math.floor(dt / t) * t + nt;
                }
                var d = this.renderFrame(cur);
                if (d > 0) {
                    this.nt = nt + d * t;
                }
                else {
                    this.nt = nt + 100;
                }
            }
        };
        Ani.prototype.renderFrame = function (frame) {
            var _a = this, source = _a.source, config = _a.config, bindAnis = _a.bindAnis;
            if (!source)
                return 0;
            var vo = source.getSourceVO(frame, 0);
            if (!vo)
                return 0;
            var g = this.graphics;
            g.clear();
            g.drawBitmap(0, 0, vo, config.matrix2d);
            g.end();
            if (bindAnis) {
                bindAnis.forData(function (ani) {
                    ani.renderFrame(frame);
                    return true;
                }, this);
            }
            return vo.duration;
        };
        Ani.prototype.lockFrame = function (frame) {
            this.lock = frame;
            this.renderFrame(frame);
        };
        Ani.prototype.addBindAni = function (ani) {
            var bindAnis = this.bindAnis;
            if (!bindAnis) {
                this.bindAnis = bindAnis = new rf.Link();
            }
            bindAnis.add(ani, this);
            ani.parentAni = this;
            this.addChild(ani);
        };
        Ani.prototype.removeBindAni = function (ani) {
            var parentAni = ani.parentAni;
            var bindAnis = this.bindAnis;
            if (bindAnis && parentAni == this) {
                ani.parentAni = undefined;
                bindAnis.remove(ani, this);
                ani.remove();
            }
        };
        Ani.prototype.onceComplete = function (finish) {
            this.simpleDispatch(102, finish);
        };
        Ani.prototype.onComplete = function (t) {
            this.remove();
            var pool = this.pool;
            if (pool) {
                pool.recycle(this);
            }
        };
        return Ani;
    }(rf.Sprite));
    rf.Ani = Ani;
    var Pak = (function (_super) {
        __extends(Pak, _super);
        function Pak() {
            var _this = _super.call(this) || this;
            _this.extention = ".hp";
            return _this;
        }
        Pak.prototype.load = function (url) {
            url = rf.getFullUrl(url, this.extention);
            this.name = url;
            rf.loadRes(rf.RES_PERFIX, url, this.pakLoadComplete, this, 1);
            return undefined;
        };
        Pak.prototype.pakLoadComplete = function (event) {
            if (event.type == 4) {
                var item = event.currentTarget;
                if (item.url == this.name) {
                    var info = void 0;
                    this.info = info = event.data;
                    this.simpleDispatch(Pak.INFO_COMPLETE, info);
                }
            }
        };
        Pak.prototype.anim = function (anim, faceto, tm, once, duration, refresh) {
            if (once === void 0) { once = 0; }
            if (refresh === void 0) { refresh = true; }
            this.action = anim;
            this.faceto = faceto;
            this.once = once;
            this.tm = tm;
            this.st = tm.now;
            this.t = ~~duration;
            var _a = this, info = _a.info, name = _a.name;
            if (!info) {
                return;
            }
            var action = info.actions[anim];
            if (!action) {
                return;
            }
            var conf = action[faceto];
            if (!conf) {
                return;
            }
            var source = conf.source;
            if (!source) {
                var i = name.lastIndexOf("/") + 1;
                conf.p = name.slice(0, i);
                conf.n = anim + "_" + faceto;
                conf.source = _super.prototype.load.call(this, conf);
            }
            else {
                this.play(source);
            }
        };
        Pak.prototype.onComplete = function () {
            var pool = this.pool;
            if (pool) {
                pool.recycle(this);
            }
        };
        Pak.INFO_COMPLETE = "INFO_COMPLETE";
        return Pak;
    }(Ani));
    rf.Pak = Pak;
    function anim_getSource(data, extendtion, complete) {
        var url;
        var config;
        if (typeof data === "string") {
            url = rf.getFullUrl(data, extendtion);
        }
        else {
            config = data;
            var p = config.p, n = config.n;
            url = p + n + ".hp";
        }
        var source = rf.bitmapSources[url];
        if (!source) {
            rf.bitmapSources[url] = source = new Anim2dSource(url);
            if (config) {
                source.loadByConfig(config);
            }
            else {
                source.load();
            }
        }
        else if (source.status == 0) {
            if (config) {
                source.loadByConfig(config);
            }
            else {
                source.load();
            }
        }
        else if (complete && source.status == 2) {
            complete(source);
            return source;
        }
        if (complete) {
            var completes = source.completeFuncs;
            if (completes.indexOf(complete) == -1) {
                completes.push(complete);
            }
        }
        return source;
    }
    rf.anim_getSource = anim_getSource;
    function getAglinPoint(aglin, w, h) {
        var ox, oy;
        var t1 = (aglin / 3) >> 0;
        switch (t1) {
            case 0:
                oy = 0;
                break;
            case 1:
                oy = (-h * 0.5);
                break;
            case 2:
                oy = -h;
                break;
        }
        t1 = aglin % 3;
        switch (t1) {
            case 0:
                ox = 0;
                break;
            case 1:
                ox = -w * 0.5;
                break;
            case 2:
                ox = -w;
                break;
        }
        return [ox, oy];
    }
    rf.getAglinPoint = getAglinPoint;
    function fontRender(g, vos, aglin, gap, rd) {
        if (gap === void 0) { gap = 0; }
        if (rd === void 0) { rd = 0; }
        var w = 0;
        var h = 0;
        vos.forEach(function (element) {
            w += element.w + gap;
            if (element.h > h) {
                h = element.h;
            }
        });
        var p = getAglinPoint(aglin, w, h);
        g.clear();
        w = 0;
        var n = vos.length;
        for (var i = 0; i < n; i++) {
            var vo = vos[i];
            var ox = w + p[0] + ~~vo.f_ox;
            g.drawBitmap(ox, p[1] + ~~vo.f_oy - rd * ox, vo);
            w += vo.w + gap;
        }
        g.end();
    }
    rf.fontRender = fontRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var KeyManagerV2 = (function (_super) {
        __extends(KeyManagerV2, _super);
        function KeyManagerV2(target) {
            var _this = _super.call(this) || this;
            _this.keylist = [];
            _this.keylimit = [];
            _this.isClosed = false;
            _this.keyDict = {};
            _this.keyObj = {};
            if (target) {
                target.addEventListener(50, _this.mouseDownHandler, _this);
            }
            _this.keyDict = {};
            return _this;
        }
        KeyManagerV2.prototype.mouseDownHandler = function (e) {
            KeyManagerV2.currentKey = this;
        };
        KeyManagerV2.resetDefaultMainKey = function (value) {
            KeyManagerV2._defaultMainKey = value == null ? rf.mainKey : value;
            this.setFocus(KeyManagerV2._defaultMainKey);
        };
        KeyManagerV2.setFocus = function (focus) {
            if (KeyManagerV2.currentKey && KeyManagerV2.currentKey.isClosed) {
                return;
            }
            if (!focus) {
                focus = KeyManagerV2._defaultMainKey;
            }
            KeyManagerV2.currentKey = focus;
        };
        KeyManagerV2.prototype.awaken = function () {
            KeyManagerV2.currentKey = this;
        };
        KeyManagerV2.prototype.sleep = function () {
            KeyManagerV2.setFocus(KeyManagerV2._defaultMainKey);
        };
        KeyManagerV2.prototype.init = function () {
            var $this = this;
            function m(e) {
                $this.onKeyHandle(e);
            }
            ;
            var canvas = rf.ROOT.canvas;
            if (typeof GameGlobal == "undefined") {
                window.onkeydown = m;
                window.onkeyup = m;
            }
            this.keylimit = [16, 17, 18];
            this.keylist = [];
        };
        KeyManagerV2.prototype.onKeyHandle = function (e) {
            e.stopImmediatePropagation();
            var keyList = this.keylist;
            var i;
            var code = e.keyCode;
            if (!this.check()) {
                i = keyList.indexOf(code);
                if (i != -1) {
                    keyList.splice(i, 1);
                }
                return;
            }
            if (this.keylimit.indexOf(code) != -1)
                return;
            if (e.type == "keydown") {
                if (keyList.indexOf(code) != -1) {
                    return;
                }
                keyList.push(code);
            }
            else {
                i = keyList.indexOf(code);
                if (i != -1) {
                    keyList.splice(i, 1);
                }
            }
            var type = (e.type == "keydown") ? 0 : 1;
            var shiftKey, ctrlKey, altKey;
            shiftKey = e.shiftKey ? 1 : 0;
            ctrlKey = e.ctrlKey ? 1 : 0;
            altKey = e.altKey ? 1 : 0;
            var keyvalue = type << 12 | shiftKey << 11 | ctrlKey << 10 | altKey << 9 | e.keyCode;
            if ((!KeyManagerV2.currentKey || !KeyManagerV2.currentKey.doKey(e, keyvalue)) && rf.mainKey) {
                rf.mainKey.doKey(e, keyvalue);
            }
        };
        KeyManagerV2.prototype.doKey = function (e, keyvalue) {
            var f = this.keyDict[keyvalue];
            this.currentKeyCode = keyvalue & 0xFF;
            if (f != null) {
                if (f.length == 1) {
                    f.call(this.keyObj[keyvalue], e);
                }
                else {
                    f.call(this.keyObj[keyvalue]);
                }
                return true;
            }
            return this.isClosed;
        };
        KeyManagerV2.prototype.check = function () {
            if (!KeyManagerV2.enabled) {
                return false;
            }
            return true;
        };
        KeyManagerV2.prototype.regKeyDown = function (key, func, thisobj, shift, ctrl, alt) {
            if (shift === void 0) { shift = false; }
            if (ctrl === void 0) { ctrl = false; }
            if (alt === void 0) { alt = false; }
            var shiftKey, ctrlKey, altKey;
            shiftKey = shift ? 1 : 0;
            ctrlKey = ctrl ? 1 : 0;
            altKey = alt ? 1 : 0;
            this.keyDict[shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key] = func;
            this.keyObj[shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key] = thisobj;
        };
        KeyManagerV2.prototype.regKeyUp = function (key, func, thisobj, shift, ctrl, alt) {
            if (shift === void 0) { shift = false; }
            if (ctrl === void 0) { ctrl = false; }
            if (alt === void 0) { alt = false; }
            var shiftKey, ctrlKey, altKey;
            shiftKey = shift ? 1 : 0;
            ctrlKey = ctrl ? 1 : 0;
            altKey = alt ? 1 : 0;
            this.keyDict[1 << 12 | shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key] = func;
            this.keyObj[1 << 12 | shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key] = thisobj;
        };
        KeyManagerV2.prototype.removeKeyDown = function (key, func, shift, ctrl, alt) {
            if (shift === void 0) { shift = false; }
            if (ctrl === void 0) { ctrl = false; }
            if (alt === void 0) { alt = false; }
            var shiftKey, ctrlKey, altKey;
            shiftKey = shift ? 1 : 0;
            ctrlKey = ctrl ? 1 : 0;
            altKey = alt ? 1 : 0;
            var d = shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key;
            if (this.keyDict[d] == func) {
                this.keyDict[d] = null;
                delete this.keyDict[d];
                this.keyObj[d] = null;
                delete this.keyObj[d];
            }
        };
        KeyManagerV2.enabled = true;
        return KeyManagerV2;
    }(rf.MiniDispatcher));
    rf.KeyManagerV2 = KeyManagerV2;
    rf.mainKey = new KeyManagerV2();
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MD5 = (function () {
        function MD5() {
            this.hexcase = 0;
            this.b64pad = "";
        }
        MD5.prototype.hex_md5 = function (s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); };
        MD5.prototype.b64_md5 = function (s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); };
        MD5.prototype.any_md5 = function (s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); };
        MD5.prototype.hex_hmac_md5 = function (k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
        MD5.prototype.b64_hmac_md5 = function (k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
        MD5.prototype.any_hmac_md5 = function (k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); };
        MD5.prototype.md5_vm_test = function () {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        };
        MD5.prototype.rstr_md5 = function (s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        };
        MD5.prototype.rstr_hmac_md5 = function (key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        };
        MD5.prototype.rstr2hex = function (input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        };
        MD5.prototype.rstr2b64 = function (input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        };
        MD5.prototype.rstr2any = function (input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        };
        MD5.prototype.str2rstr_utf8 = function (input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        };
        MD5.prototype.str2rstr_utf16le = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        };
        MD5.prototype.str2rstr_utf16be = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        };
        MD5.prototype.rstr2binl = function (input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        };
        MD5.prototype.binl2rstr = function (input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        };
        MD5.prototype.binl_md5 = function (x, len) {
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        };
        MD5.prototype.md5_cmn = function (q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        };
        MD5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };
        MD5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };
        MD5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        };
        MD5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        };
        MD5.prototype.safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
        MD5.prototype.bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        };
        return MD5;
    }());
    rf.MD5 = MD5;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var GUIProfile = (function (_super) {
        __extends(GUIProfile, _super);
        function GUIProfile() {
            var _this = _super.call(this) || this;
            _this.bindComponents();
            return _this;
        }
        GUIProfile.prototype.bindComponents = function () {
            this.timeTex = this.createText();
            this.fpsTxt = this.createText();
            this.bufferTex = this.createText();
            this.dcTxt = this.createText();
            this.systemTex = this.createText();
            rf.ROOT.addEventListener(rf.EngineEvent.FPS_CHANGE, this.fpsChangeHandler, this);
        };
        GUIProfile.prototype.createText = function () {
            var text = new rf.TextField();
            text.init();
            text.y = this.h;
            this.h += text.format.size;
            this.addChild(text);
            return text;
        };
        GUIProfile.prototype.fpsChangeHandler = function (event) {
            var con = rf.context3D;
            this.timeTex.text = "time:" + rf.getFormatTime(rf.engineNow, "HH:mm:ss", false);
            this.fpsTxt.text = "F:" + rf.Engine.fps + " C:" + (rf.Engine.code / rf.Engine.fps).toFixed(2);
            this.bufferTex.text = con.toString();
            this.dcTxt.text = "tri:" + con.triangles + " dc:" + con.dc;
            this.systemTex.text = "m:" + rf.Engine.memory.toFixed(2) + " sp:" + rf.getChildrenCount(rf.ROOT, 0);
        };
        return GUIProfile;
    }(rf.Sprite));
    rf.GUIProfile = GUIProfile;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.line_variable = {
        "posX": { size: 3, offset: 0 },
        "posY": { size: 3, offset: 3 },
        "len": { size: 1, offset: 6 },
        "color": { size: 4, offset: 7 },
        "data32PerVertex": { size: 11, offset: 0 }
    };
    var Line3DPoint = (function () {
        function Line3DPoint() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 1;
            this.g = 1;
            this.b = 1;
            this.a = 1;
            this.t = 1;
        }
        Line3DPoint.prototype.clear = function () {
            this.x = this.y = this.z = 0;
            this.r = this.g = this.b = this.a = this.t = 1;
        };
        Line3DPoint.prototype.clone = function () {
            var vo = new Line3DPoint();
            vo.x = this.x;
            vo.y = this.y;
            vo.z = this.z;
            vo.r = this.r;
            vo.g = this.g;
            vo.b = this.b;
            vo.a = this.a;
            vo.t = this.t;
            return vo;
        };
        Line3DPoint.prototype.toRGB = function (color) {
            this.r = ((color & 0x00ff0000) >>> 16) / 0xFF;
            this.g = ((color & 0x0000ff00) >>> 8) / 0xFF;
            this.b = (color & 0x000000ff) / 0xFF;
        };
        return Line3DPoint;
    }());
    rf.Line3DPoint = Line3DPoint;
    var Line3D = (function (_super) {
        __extends(Line3D, _super);
        function Line3D() {
            var _this = _super.call(this, rf.line_variable) || this;
            _this.points = [];
            _this.data32PerVertex = rf.line_variable["data32PerVertex"].size;
            _this.nativeRender = true;
            return _this;
        }
        Line3D.prototype.clear = function () {
            var tempVertex = this.tempVertex;
            if (undefined == tempVertex) {
                this.tempVertex = tempVertex = rf.recyclable(rf.Temp_Float32Byte);
            }
            tempVertex.data32PerVertex = this.data32PerVertex;
            tempVertex.numVertices = 0;
            var origin = this.origin;
            if (undefined == origin) {
                this.origin = origin = rf.recyclable(Line3DPoint);
            }
            this.points.length = 0;
            this.vertexBuffer = null;
        };
        Line3D.prototype.moveTo = function (x, y, z, thickness, color, alpha) {
            if (thickness === void 0) { thickness = 1; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            var _a = this, origin = _a.origin, points = _a.points;
            if (points.length) {
                this.build();
            }
            origin.x = x;
            origin.y = y;
            origin.z = z;
            origin.t = thickness;
            origin.toRGB(color);
            origin.a = alpha;
            points.push(origin.clone());
        };
        Line3D.prototype.lineTo = function (x, y, z, thickness, color, alpha) {
            if (thickness === void 0) { thickness = 1; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            var _a = this, vo = _a.origin, points = _a.points;
            vo.x = x;
            vo.y = y;
            vo.z = z;
            vo.a = alpha;
            vo.t = thickness;
            vo.toRGB(color);
            points.push(vo.clone());
        };
        Line3D.prototype.build = function () {
            var _a = this, points = _a.points, tempVertex = _a.tempVertex;
            var j = 0;
            var m = points.length - 1;
            for (j = 0; j < m; j++) {
                var p1 = points[j];
                var p2 = points[j + 1];
                tempVertex.set([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, -p1.t * 0.5, p1.r, p1.g, p1.b, p1.a]);
                tempVertex.set([p2.x, p2.y, p2.z, p1.x, p1.y, p1.z, p2.t * 0.5, p2.r, p2.g, p2.b, p2.a]);
                tempVertex.set([p2.x, p2.y, p2.z, p1.x, p1.y, p1.z, -p2.t * 0.5, p2.r, p2.g, p2.b, p2.a]);
                tempVertex.set([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p1.t * 0.5, p1.r, p1.g, p1.b, p1.a]);
                tempVertex.numVertices += 4;
            }
            points.length = 0;
        };
        Line3D.prototype.end = function () {
            var _a = this, origin = _a.origin, data32PerVertex = _a.data32PerVertex, points = _a.points, tempVertex = _a.tempVertex, variables = _a.variables;
            if (points.length) {
                this.build();
            }
            var arr = tempVertex.toArray();
            var info = new rf.VertexInfo(arr, data32PerVertex, variables);
            var v = this.vertexBuffer = rf.context3D.createVertexBuffer(info);
            this.triangles = v.numVertices / 2;
            this.quad = this.triangles / 2;
            tempVertex.recycle();
            origin.recycle();
            this.tempVertex = this.origin = undefined;
        };
        Line3D.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            return _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
        };
        Line3D.prototype.render = function (camera, option) {
            var c = rf.context3D;
            var _a = this, v = _a.vertexBuffer, quad = _a.quad, triangles = _a.triangles;
            if (undefined == v) {
                return;
            }
            var p = this.program;
            if (undefined == p) {
                p = c.programs["Line3D"];
                if (undefined == p) {
                    p = this.createProgram();
                }
                this.program = p;
            }
            var setting = c.setting;
            setting.depth = true;
            setting.depthMode = 515;
            setting.cull = 0;
            c.setProgram(p);
            var m = rf.TEMP_MATRIX3D.m3_append(camera.sceneTransform, false, this.sceneTransform);
            c.setProgramConstantsFromMatrix("mv", m);
            c.setProgramConstantsFromMatrix("p", camera.len);
            c.setProgramConstantsFromVector("originFar", 1 / camera.originFar, 1, false);
            if (rf.context3D.logarithmicDepthBuffer) {
                c.setProgramConstantsFromVector("logDepthFar", camera.logDepthFar, 1, false);
            }
            v.uploadContext(p);
            var i = c.getIndexByQuad(quad);
            c.drawTriangles(i, triangles);
        };
        Line3D.prototype.createProgram = function () {
            var v_def = "";
            var f_def = "";
            if (rf.context3D.logarithmicDepthBuffer) {
                v_def += "#define LOG_DEPTH_BUFFER\n";
                f_def += "#define LOG_DEPTH_BUFFER\n";
                if (rf.context3D.use_logdepth_ext) {
                    v_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                    f_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                }
            }
            var vertexCode = "\n                " + v_def + "\n                attribute vec3 posX;\n                attribute vec3 posY;\n                attribute float len;\n                attribute vec4 color;\n\n                #ifdef LOG_DEPTH_BUFFER\n                    #ifdef LOG_DEPTH_BUFFER_EXT\n                        varying float depth;\n                    #else\n                        uniform float logDepthFar;\n                    #endif\n                #endif\n\n                uniform mat4 mv;\n                uniform mat4 p;\n                varying vec4 vColor;\n                uniform float originFar;\n\n                void main(void){\n                    vec4 pos = mv * vec4(posX,1.0); \n                    vec4 t = pos - mv * vec4(posY,1.0);\n                    vec3 v = cross(t.xyz,vec3(0,0,1));\n                    v = normalize(v);\n                    float t2 = pos.z * originFar;\n                    if(t2 == 0.0){\n                       v.xyz *= len;\n                    }else{\n                        v.xyz *= len * t2;\n                    }\n                    // v.xyz *= len * t2;\n                    // pos.xyz += v.xyz;\n                    pos.xy += v.xy;\n                    pos = p * pos;\n                    \n                    gl_Position = pos;\n                    \n                    #ifdef LOG_DEPTH_BUFFER\n                        #ifdef LOG_DEPTH_BUFFER_EXT\n                            depth = gl_Position.w + 1.0;\n                        #else\n                            gl_Position.z = log2( max( 0.0000001, gl_Position.w + 1.0 ) ) * logDepthFar * 2.0 - 1.0;\n                            gl_Position.z *= gl_Position.w;\n                        #endif\n                    #endif\n\n                    vColor = color;\n                    // t2 = pos.z;\n                    // pos = vec4(t2,t2,t2,1.0);\n                    // vColor.xyzw = pos;\n                }\n            ";
            var fragmentCode = " \n                " + f_def + "\n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    #extension GL_EXT_frag_depth : enable\n                #endif\n                precision mediump float;\n                varying vec4 vColor;\n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    varying float depth;\n                    uniform float logDepthFar;\n                #endif\n                void main(void){\n                    gl_FragColor = vColor;\n                    #ifdef LOG_DEPTH_BUFFER_EXT\n\t                    gl_FragDepthEXT = log2( depth ) * logDepthFar;\n                    #endif\n                }\n            ";
            return rf.context3D.createProgram(vertexCode, fragmentCode, "Line3D");
        };
        return Line3D;
    }(rf.SceneObject));
    rf.Line3D = Line3D;
    var Trident = (function (_super) {
        __extends(Trident, _super);
        function Trident(len, think) {
            if (len === void 0) { len = 200; }
            if (think === void 0) { think = 2; }
            var _this = _super.call(this) || this;
            var line;
            if (len * 0.1 > 60) {
                line = len - 60;
            }
            else {
                line = len * 0.9;
            }
            _this.clear();
            var color = 0xFF0000;
            _this.moveTo(0, 0, 0, think, color);
            _this.lineTo(line, 0, 0, think, color);
            _this.moveTo(line, 0, 0, think * 5, color);
            _this.lineTo(len, 0, 0, 0, color);
            color = 0x00FF00;
            _this.moveTo(0, 0, 0, think, color);
            _this.lineTo(0, line, 0, think, color);
            _this.moveTo(0, line, 0, think * 5, color);
            _this.lineTo(0, len, 0, 0, color);
            color = 0x0000FF;
            _this.moveTo(0, 0, 0, think, color);
            _this.lineTo(0, 0, line, think, color);
            _this.moveTo(0, 0, line, think * 5, color);
            _this.lineTo(0, 0, len, 0, color);
            _this.end();
            return _this;
        }
        return Trident;
    }(Line3D));
    rf.Trident = Trident;
    var LinePlane = (function (_super) {
        __extends(LinePlane, _super);
        function LinePlane(len, think, scale) {
            if (len === void 0) { len = 2; }
            if (think === void 0) { think = 1; }
            if (scale === void 0) { scale = 1; }
            var _this = _super.call(this) || this;
            var c = Math.ceil(len / scale);
            var color = 0xFFFFFF;
            _this.clear();
            _this.moveTo(-len, 0, -len, think * 2, color);
            _this.lineTo(len, 0, -len, think * 2, color);
            _this.lineTo(len, 0, len, think * 2, color);
            _this.lineTo(-len, 0, len, think * 2, color);
            _this.lineTo(-len, 0, -len, think * 2, color);
            color = 0xCCCCCC;
            var s = 0;
            for (var i = -c; i < c; i++) {
                _this.moveTo(i * scale, 0, -len, think, color);
                _this.lineTo(i * scale, 0, len, think, color);
            }
            for (var i = -c; i < c; i++) {
                _this.moveTo(-len, 0, i * scale, think, color);
                _this.lineTo(len, 0, i * scale, think, color);
            }
            _this.end();
            return _this;
        }
        return LinePlane;
    }(Line3D));
    rf.LinePlane = LinePlane;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function skeleton_debug() {
    }
    rf.skeleton_debug = skeleton_debug;
    var SkeletonDebuger = (function (_super) {
        __extends(SkeletonDebuger, _super);
        function SkeletonDebuger(mesh) {
            var _this = _super.call(this) || this;
            _this.mesh = mesh;
            if (!mesh.kfm) {
                mesh.on(4, _this.meshReadlyHandler, _this);
            }
            else {
                _this.startFollow();
            }
            return _this;
        }
        SkeletonDebuger.prototype.meshReadlyHandler = function (event) {
            event.currentTarget.off(event.type, this.meshReadlyHandler, this);
            this.startFollow();
        };
        SkeletonDebuger.prototype.startFollow = function () {
            var skAnim = this.mesh.skAnim;
            if (skAnim) {
                skAnim.on(10, this.buildMesh, this);
                this.buildMesh();
            }
        };
        SkeletonDebuger.prototype.buildMesh = function (event) {
            var skAnim = this.mesh.skAnim;
            var boneTransform = skAnim.currentBoneTransfrom;
            var bone = skAnim.skeleton.rootBone;
        };
        return SkeletonDebuger;
    }(rf.SceneObject));
})(rf || (rf = {}));
var rf;
(function (rf) {
    var AStar = (function () {
        function AStar() {
            this.aSurOff = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
        }
        AStar.prototype.go = function (map, xfrom, yfrom, xto, yto, event) {
            this.map = map;
            this.xfrom = xfrom;
            this.yfrom = yfrom;
            this.xto = xto;
            this.yto = yto;
            this.event = event;
            this.minNode = undefined;
            this.minih = 99999999;
            this.openlist = [[xfrom, yfrom, 0, Math.abs(xfrom - xto) * 10 + Math.abs(yfrom - yto) * 10, null]];
            this.closelist = [];
            this.excute();
            if (!event) {
                return this.merge(map, this.getNearest());
            }
        };
        AStar.prototype.getPushIndex = function (wayList, f) {
            var length = wayList.length - 1;
            if (length < 0) {
                return 0;
            }
            var flag;
            var num = length + 1;
            var index = (num / 2) >> 0;
            while (num > 1) {
                flag = num & 1;
                num = (num + flag) >> 1;
                var node = wayList[index];
                if (f <= node[2] + node[3]) {
                    index -= num;
                    if (index < 0)
                        index = 0;
                }
                else {
                    index += num;
                    if (index >= length) {
                        index = length;
                    }
                }
            }
            if (f > wayList[index][2]) {
                return ++index;
            }
            return index;
        };
        AStar.prototype.excute = function () {
            var _a = this, openlist = _a.openlist, closelist = _a.closelist, event = _a.event, xto = _a.xto, yto = _a.yto, map = _a.map, aSurOff = _a.aSurOff;
            var w = map.w, h = map.h;
            while (openlist.length) {
                var node = openlist.shift();
                var x = node[0], y = node[1], g = node[2];
                var index = y * w + x;
                if (closelist[index]) {
                    continue;
                }
                closelist[index] = 1;
                if (x == xto && y == yto) {
                    this.minNode = node;
                    if (event) {
                        event.simpleDispatch(4);
                    }
                    return 0;
                }
                for (var i = 0; i < aSurOff.length; i++) {
                    var _b = aSurOff[i], dx = _b[0], dy = _b[1];
                    dx += x;
                    dy += y;
                    if (dx < 0 || dy < 0 || dx >= w || dy >= h) {
                        continue;
                    }
                    index = dy * w + dx;
                    var cg = map.getWalk(dx, dy);
                    if (cg < 1 || closelist[index]) {
                        continue;
                    }
                    var temp1 = dx - x + dy - y;
                    temp1 = temp1 < 0 ? -temp1 : temp1;
                    var temp2 = xto - dx;
                    temp2 = temp2 < 0 ? -temp2 : temp2;
                    var temp3 = yto - dy;
                    temp3 = temp3 < 0 ? -temp3 : temp3;
                    var newNode = [
                        dx,
                        dy,
                        (temp1 == 1 ? 10 + g : 14 + g),
                        (temp2 + temp3) * 10,
                        node
                    ];
                    var gh = newNode[2] + newNode[3];
                    index = this.getPushIndex(openlist, gh);
                    if (newNode[3] < this.minih) {
                        this.minih = newNode[3];
                        this.minNode = newNode;
                    }
                    openlist.splice(index, 0, newNode);
                }
            }
            if (event) {
                event.simpleDispatch(4);
            }
            return 0;
        };
        AStar.prototype.getNearest = function () {
            var minNode = this.minNode;
            return minNode && minNode.length ? this.format(minNode) : undefined;
        };
        AStar.prototype.format = function (node) {
            var arr = [];
            var i = 0;
            while (node) {
                arr.push([node[0], node[1]]);
                node = node[4];
                i++;
            }
            arr.reverse();
            return arr;
        };
        AStar.prototype.merge = function (ml, nearest) {
            var len = nearest.length;
            if (len < 2) {
                return nearest;
            }
            var path = [];
            var startIndex = 0;
            var endIndex = len - 1;
            var index;
            while (startIndex <= endIndex) {
                var current = nearest[startIndex++];
                path.push(current);
                var sx = current[0];
                var sy = current[1];
                index = endIndex;
                while (index > startIndex) {
                    var test = nearest[index];
                    var flag = true;
                    var ex = test[0];
                    var ey = test[1];
                    var checkD = 1;
                    var dx = ex - sx;
                    var dy = ey - sy;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    var px = dx / dist;
                    var py = dy / dist;
                    while (dist > checkD) {
                        dx = Math.round(ex - px * checkD);
                        dy = Math.round(ey - py * checkD);
                        if (!ml.getWalk(dx, dy)) {
                            flag = false;
                            break;
                        }
                        checkD++;
                    }
                    if (flag) {
                        startIndex = index;
                        break;
                    }
                    index--;
                }
            }
            return path;
        };
        return AStar;
    }());
    rf.AStar = AStar;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Arpg2DCamera = (function (_super) {
        __extends(Arpg2DCamera, _super);
        function Arpg2DCamera() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Arpg2DCamera.prototype.init = function () {
            var _a = this.map, sw = _a.sw, sh = _a.sh, data = _a.data;
            var w = data.w, h = data.h;
            var hw = sw >> 1;
            var hh = sh >> 1;
            this.top = hh;
            this.left = hw;
            this.right = w - hw;
            this.bottom = h - hh;
        };
        Arpg2DCamera.prototype.resize = function (width, height) {
            if (this.map) {
                this.init();
            }
        };
        Arpg2DCamera.prototype.update = function (now, interval) {
            var _a = this, watchTarget = _a.watchTarget, map = _a.map;
            if (!watchTarget || !map) {
                return;
            }
            var sceneTransform = watchTarget.sceneTransform;
            var _b = this, top = _b.top, left = _b.left, right = _b.right, bottom = _b.bottom;
            var _x = sceneTransform[12];
            var _y = sceneTransform[13] + Math.floor(top * 0.3);
            var _z = sceneTransform[14];
            var _w = 1000;
            _x = Math.max(left, Math.min(_x, right)) - left;
            _y = Math.max(top, Math.min(_y, bottom)) - top;
            _x = Math.round(_x);
            _y = Math.round(_y);
            rf.scene.sun.setSunOffset(_x + left, _y + top, _z);
            this.setPos(_x, _y, _z);
            map.setviewRect(_x, _y);
        };
        return Arpg2DCamera;
    }(rf.Camera));
    rf.Arpg2DCamera = Arpg2DCamera;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function map_create_data(id, pwc, phc) {
        var data = {};
        data.id = id;
        data.pw = 256;
        data.ph = 256;
        data.w = pwc * data.pw;
        data.h = phc * data.ph;
        data.gew = 60;
        data.geh = 30;
        data.hgew = data.gew * 0.5;
        data.hgeh = data.geh * 0.5;
        data.gw = Math.floor(data.w / data.gew);
        data.gh = Math.floor(data.h / data.geh);
        data.w = data.gew * data.gw;
        data.h = data.geh * data.gh;
        var len = data.gw * data.gh;
        var buffer = new ArrayBuffer(len);
        var byte = new rf.Byte(buffer);
        for (var i = 0; i < len; i++) {
            byte.position = i;
            byte.writeByte(1);
        }
        data.byte = buffer;
        return data;
    }
    rf.map_create_data = map_create_data;
    var MapGrap = (function (_super) {
        __extends(MapGrap, _super);
        function MapGrap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MapGrap.prototype, "available", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return MapGrap;
    }(rf.SceneObject));
    var SnakeMap = (function (_super) {
        __extends(SnakeMap, _super);
        function SnakeMap(variables) {
            var _this = _super.call(this, variables) || this;
            _this.gx = -1;
            _this.gy = -1;
            _this.sw = 0;
            _this.sh = 0;
            var batch;
            var mapGrap = new MapGrap();
            var sourceSize = SnakeMap.sourceSize;
            mapGrap.source = rf.createBitmapSource("map", sourceSize.x, sourceSize.y, false);
            mapGrap.source.textureData = rf.context3D.getTextureData("map", false, 9729, 9729);
            batch = new rf.SingleRenderer(mapGrap);
            if (rf.ROOT.shadow) {
                mapGrap.addFilter(new rf.ShadowFilter(mapGrap));
            }
            batch.depth = true;
            batch.depthMode = 515;
            mapGrap.renderer = batch;
            mapGrap.setSca(1, rf.SY, 1);
            mapGrap.z = -0.1;
            _this.setRot(rf.RX, 0, 0);
            _this.addChild(mapGrap);
            _this.mapGrap = mapGrap;
            var mapHalo = new rf.Sprite();
            mapHalo.setSca(1, rf.SY, 1);
            mapHalo.renderer = new rf.SuperBatchRenderer(mapHalo);
            _this.addChild(mapHalo);
            _this.mapHalo = mapHalo;
            return _this;
        }
        SnakeMap.prototype.getFull = function (s, len) {
            while (s.length < len) {
                s = "0" + s;
            }
            return s;
        };
        SnakeMap.prototype.init = function (data, sceneWidth, sceneHeight) {
            this.data = data;
            this.gx = -1;
            this.gy = -1;
            var p = "m/" + data.id + "/";
            this.perfix = p;
            this.setSize(sceneWidth, sceneHeight);
            if (!data.setting) {
                data.setting = new rf.Map2DSetting(data);
            }
        };
        SnakeMap.prototype.render = function (camera, option) {
            _super.prototype.render.call(this, camera, option);
        };
        SnakeMap.prototype.setSize = function (width, height) {
            _super.prototype.setSize.call(this, width, height);
            this.sw = width;
            this.sh = height;
            var _a = this.data, pw = _a.pw, ph = _a.ph;
            this.gw = Math.ceil(width / pw) + 1;
            this.gh = Math.ceil(height / ph) + 1;
        };
        SnakeMap.prototype.setviewRect = function (x, y) {
            var _a = this, data = _a.data, gx = _a.gx, gy = _a.gy;
            var pw = data.pw, ph = data.ph;
            var dx = Math.floor(x / pw);
            var dy = Math.floor(y / ph);
            if (gx == dx && gy == dy) {
                return;
            }
            this.gx = dx;
            this.gy = dy;
            var _b = this, perfix = _b.perfix, gw = _b.gw, gh = _b.gh, mapGrap = _b.mapGrap;
            var graphics = mapGrap.graphics, source = mapGrap.source;
            var w = data.w, h = data.h;
            var frames = source.areas[0].frames;
            graphics.clear();
            var needloads = [];
            for (var j = 0; j < gh; j++) {
                for (var i = 0; i < gw; i++) {
                    var x_1 = dx + i;
                    var y_1 = dy + j;
                    if (x_1 < 0 || y_1 < 0 || x_1 * pw >= w || y_1 * ph >= h) {
                        continue;
                    }
                    var url = perfix + ("" + this.getFull(y_1 + "", 3) + this.getFull(x_1 + "", 3) + ".jpg");
                    var vo = frames[url];
                    if (vo == undefined) {
                        needloads.push([url, x_1, y_1]);
                    }
                    else {
                        graphics.drawBitmap(x_1 * pw, y_1 * ph, vo);
                    }
                }
            }
            for (var i = 0; i < needloads.length; i++) {
                var _c = needloads[i], url = _c[0], x_2 = _c[1], y_2 = _c[2];
                var vo = source.setSourceVO(url + "", data.pw, data.ph);
                if (vo) {
                    rf.loadRes(rf.RES_PERFIX, url + "", this.maploadCompleteHandler, this, 5);
                    graphics.drawBitmap(x_2 * pw, y_2 * ph, vo);
                }
                else {
                    console.log(x_2, y_2, "no draw");
                }
            }
            graphics.end();
        };
        SnakeMap.prototype.maploadCompleteHandler = function (event) {
            var source = this.mapGrap.source;
            var vo = source.getSourceVO(event.currentTarget.url);
            if (vo) {
                source.drawimg(event.data, vo.x, vo.y, vo.w, vo.h);
            }
        };
        SnakeMap.sourceSize = { x: 2048, y: 2048 };
        return SnakeMap;
    }(rf.SceneObject));
    rf.SnakeMap = SnakeMap;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Map2DSetting = (function () {
        function Map2DSetting(data) {
            this.alphas = [1.0, 0.7, 0.5, 0.2];
            this.data = data;
            this.path = new Uint8Array(data.byte);
            this.w = data.gw;
            this.h = data.gh;
        }
        Map2DSetting.prototype.getValue = function (x, y) {
            var _a = this, w = _a.w, h = _a.h, path = _a.path;
            if (x < 0 || y < 0 || x >= w || y >= h) {
                return 0;
            }
            var d = y * w + x;
            if (d < 0 || d >= path.length) {
                return 0;
            }
            return path[d];
        };
        Map2DSetting.prototype.getWalk = function (x, y) {
            var d = this.getValue(x, y);
            return d & 1;
        };
        Map2DSetting.prototype.getsafe = function (x, y) {
            var d = this.getValue(x, y);
            return ((d << 6) >> 7) & 1;
        };
        Map2DSetting.prototype.getAlpha = function (x, y) {
            var d = this.getValue(x, y);
            return (d & 12) >> 2;
        };
        Map2DSetting.prototype.setWalk = function (x, y, val) {
            if (val > 1 || val < 0)
                rf.ThrowError("设置行走区域值超出0-1范围");
            var _a = this, w = _a.w, path = _a.path;
            var d = y * w + x;
            var old = path[d];
            var n = old & 584 | val;
            this.path[d] = n;
        };
        Map2DSetting.prototype.setAlpha = function (x, y, val) {
            if (val > 12 || val < 0)
                rf.ThrowError("设置透明区域值超出范围");
            var _a = this, w = _a.w, path = _a.path;
            var d = y * w + x;
            var old = path[d];
            var n = (val << 2) | (old & 9);
            this.path[d] = n;
        };
        Map2DSetting.prototype.setSafe = function (x, y, val) {
            if (val > 1 || val < 0)
                rf.ThrowError("设置安全区值超出范围");
            var _a = this, w = _a.w, path = _a.path;
            var d = y * w + x;
            var old = path[d];
            var n = (val << 1) | (old & 577);
            this.path[d] = n;
        };
        return Map2DSetting;
    }());
    rf.Map2DSetting = Map2DSetting;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MapRtt = (function (_super) {
        __extends(MapRtt, _super);
        function MapRtt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nativeRender = true;
            return _this;
        }
        MapRtt.prototype.render = function (camera, option) {
        };
        return MapRtt;
    }(rf.SceneObject));
    rf.MapRtt = MapRtt;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var StateModel = (function () {
        function StateModel() {
            this.running = {};
        }
        StateModel.prototype.runningList = function () {
            var arr = [];
            var running = this.running;
            for (var key in running) {
                var vo = running[key];
                if (vo && vo.active) {
                    arr.push(vo);
                }
            }
            return arr;
        };
        StateModel.prototype.isRunning = function (id) {
            var vo = this.running[id];
            return (vo && vo.active) ? true : false;
        };
        StateModel.prototype.check = function (id) {
            var running = this.running;
            for (var key in running) {
                var vo = running[key];
                if (vo && vo.active) {
                    var b = rf.stateRelation[vo.id][id];
                    if (b == 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        StateModel.prototype.startState = function (id, thisobj, stop, trystop) {
            var running = this.running;
            for (var key in running) {
                var vo_1 = running[key];
                if (vo_1) {
                    var b = rf.stateRelation[vo_1.id][id];
                    if (b == 1) {
                        this.stopState(vo_1.id, id);
                    }
                }
            }
            var vo = running[id];
            if (!vo) {
                vo = { id: id };
            }
            vo.thisobj = thisobj;
            vo.stop = stop;
            vo.trystop = trystop;
            vo.active = true;
            running[id] = vo;
            return vo;
        };
        StateModel.prototype.stopState = function (id, activeId) {
            var running = this.running;
            var vo = running[id];
            if (vo && vo.active) {
                vo.active = false;
                var stop_1 = vo.stop, thisobj = vo.thisobj;
                if (stop_1) {
                    stop_1.call(thisobj, activeId);
                }
            }
        };
        StateModel.prototype.stop = function (activeId) {
            var running = this.running;
            for (var key in running) {
                var vo = running[key];
                if (vo) {
                    this.stopState(vo.id, activeId);
                }
            }
        };
        return StateModel;
    }());
    rf.StateModel = StateModel;
})(rf || (rf = {}));
var rf;
(function (rf) {
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.RX = 55;
    rf.SY = 1 / Math.cos(rf.RX * rf.DEGREES_TO_RADIANS);
    rf.OBJECT2D_SCALE = 100;
    var MapObject = (function (_super) {
        __extends(MapObject, _super);
        function MapObject() {
            var _this = _super.call(this) || this;
            _this.createContainer();
            return _this;
        }
        MapObject.prototype.setSceneModel = function (value) {
            this.sceneModel = value;
            var container = this.container;
            switch (value) {
                case 0:
                    container.scale = rf.OBJECT2D_SCALE;
                    container.setRot(90, 0, 180);
                    break;
                case 2:
                    container.scale = rf.OBJECT2D_SCALE;
                    container.setRot(0, 0, 180);
                    break;
                case 1:
                    container.scale = 1;
                    container.setRot(90, 0, 180);
                    break;
                case 3:
                    container.scale = 1.0;
                    container.setRot(0, 0, 0);
                    break;
            }
        };
        MapObject.prototype.createContainer = function () {
            var container = new rf.SceneObject();
            this.addChild(container);
            this.container = container;
        };
        Object.defineProperty(MapObject.prototype, "rotation", {
            get: function () {
                return this.rotationZ + 90;
            },
            set: function (value) {
                this.rotationZ = value - 90;
            },
            enumerable: true,
            configurable: true
        });
        MapObject.prototype.updateTransform = function () {
            var _a = this, transform = _a.transform, pivotZero = _a.pivotZero, sceneModel = _a.sceneModel;
            var sy = sceneModel == 0 ? rf.SY : 1;
            if (pivotZero) {
                var pivotPonumber = this.pivotPonumber;
                var x = pivotPonumber[0], y = pivotPonumber[1], z = pivotPonumber[2];
                transform.m3_identity();
                transform.m3_translation(-x, -y, -z);
                transform.m3_scale(this._scaleX, this._scaleY, this._scaleZ);
                transform.m3_translation(this._x + x, this._y * sy + y, this._z + z);
            }
            else {
                var _b = this, pos = _b.pos, sceneModel_1 = _b.sceneModel, rot = _b.rot, sca = _b.sca;
                if (sceneModel_1 == 0) {
                    var temp = rf.TEMP_VECTOR3D;
                    temp[0] = pos[0];
                    temp[1] = pos[1] * sy;
                    temp[2] = pos[2];
                    temp[3] = pos[3];
                    transform.m3_recompose(temp, rot, sca);
                }
                else {
                    transform.m3_recompose(pos, rot, sca);
                }
            }
            this.status &= ~1;
        };
        MapObject.prototype.setTransform = function (matrix) {
            _super.prototype.setTransform.call(this, matrix);
            var _a = this, _y = _a._y, sceneModel = _a.sceneModel;
            if (sceneModel == 0) {
                this.pos.y = this._y = _y / rf.SY;
            }
        };
        return MapObject;
    }(rf.SceneObject));
    rf.MapObject = MapObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.mouseEnabled = true;
    var Mouse = (function () {
        function Mouse() {
            this.preMouseTime = 0;
            this.perMoveTime = 0;
            this.mouseElement = {};
            this.touchElement = {};
            this.eventData = {};
            this.wheelOption = { deltaY: 0, wheel: 0, x: 0, y: 0, startWheel: 0, preWheel: 0 };
        }
        Mouse.prototype.updateNativeMouse = function (x, y) {
            var v = rf.TEMP_VECTOR3D;
            v.x = x * rf.pixelRatio;
            v.y = y * rf.pixelRatio;
            v.z = 0;
            v.w = 1;
            rf.contextInvMatrix.m3_transformVector(v, v);
            rf.nativeMouseX = Math.round(v.x);
            rf.nativeMouseY = Math.round(v.y);
        };
        Mouse.prototype.init = function () {
            rf.onTouchStart(this.onTouchStart.bind(this));
            rf.onTouchMove(this.onTouchMove.bind(this));
            rf.onTouchEnd(this.onTouchEnd.bind(this));
            rf.onTouchCancel(this.onTouchEnd.bind(this));
            if (!rf.weixin) {
                window.onmousewheel = this.onMousewheel.bind(this);
            }
        };
        Mouse.prototype.onEvent = function (identifier, screenX, screenY, event, ctrlKey, shiftKey, altKey, deltaY) {
            if (!rf.mouseEnabled)
                return;
            rf.originMouseX = screenX * rf.pixelRatio;
            rf.originMouseY = screenY * rf.pixelRatio;
            this.updateNativeMouse(screenX, screenY);
            screenX = rf.nativeMouseX;
            screenY = rf.nativeMouseY;
            Mouse.currentType = event;
            var now = Date.now();
            var mouseElement = this.mouseElement;
            var element = mouseElement[identifier];
            if (!element) {
                mouseElement[identifier] = element = { identifier: identifier };
            }
            element.ctrl = ctrlKey;
            element.shift = shiftKey;
            element.alt = altKey;
            var d;
            if (this.preMouseTime < now) {
                this.preTarget = d = rf.ROOT.getObjectByPoint(screenX, screenY, 1);
                this.preMouseTime = now;
            }
            else {
                d = this.preTarget;
            }
            if (!d) {
                d = rf.ROOT;
            }
            rf.mouse_current = d;
            if (event != 62) {
                element.x = screenX;
                element.y = screenY;
                if (event == 50 || event == 52 || event == 51) {
                    element.mouseDownX = screenX;
                    element.mouseDownY = screenY;
                    element.time = now;
                    element.target = d;
                    d.simpleDispatch(event, element, true);
                }
                else {
                    element.ox = screenX - element.x;
                    element.oy = screenY - element.y;
                    element.wheel = deltaY;
                    d.simpleDispatch(event, element, true);
                    if (now - element.time < 500) {
                        var len = element.x - element.mouseDownX;
                        if (len > 100) {
                            d.simpleDispatch(66, element, true);
                        }
                        else if (len < -100) {
                            d.simpleDispatch(65, element, true);
                        }
                        else {
                            len = element.y - element.mouseDownY;
                            if (len > 100) {
                                d.simpleDispatch(64, element, true);
                            }
                            else if (len < -100) {
                                d.simpleDispatch(63, element, true);
                            }
                            else {
                                if (element.target == d) {
                                    if (event == 55) {
                                        d.simpleDispatch(57, element, true);
                                        element.target = undefined;
                                        element.time = 0;
                                    }
                                    else if (event == 53) {
                                        d.simpleDispatch(56, element, true);
                                        element.target = undefined;
                                        element.time = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (this.perMoveTime >= now) {
                    return;
                }
                this.perMoveTime = now;
                element.ox = screenX - element.x;
                element.oy = screenY - element.y;
                element.x = screenX;
                element.y = screenY;
                element.wheel = deltaY;
                d.simpleDispatch(event, element, true);
            }
        };
        Mouse.prototype.onTouchStart = function (data) {
            var event = data.event;
            if (event) {
                this.onEvent(event.button, event.clientX, event.clientY, 50 + event.button, event.ctrlKey, event.shiftKey, event.altKey);
            }
            else {
                var changedTouches = data.changedTouches, touches = data.touches;
                for (var i = 0; i < changedTouches.length; i++) {
                    var element = changedTouches[i];
                    this.onEvent(element.identifier, element.clientX, element.clientY, 50);
                }
                if (touches.length == 2) {
                    var one = touches[0];
                    var two = touches[1];
                    var wheelOption = this.wheelOption;
                    var identifier = one.identifier, clientX = one.clientX, clientY = one.clientY;
                    var clientXB = two.clientX, clientYB = two.clientY;
                    clientXB -= clientX;
                    clientYB -= clientY;
                    var detalY = Math.sqrt(clientXB * clientXB + clientYB * clientYB);
                    wheelOption.x = clientX;
                    wheelOption.y = clientY;
                    wheelOption.startWheel = wheelOption.preWheel = detalY;
                    wheelOption.deltaY = 0;
                    wheelOption.wheel = 0;
                    this.onEvent(identifier, clientX, clientY, 60, false, false, false, wheelOption);
                }
            }
        };
        Mouse.prototype.onTouchEnd = function (data) {
            var event = data.event;
            if (event) {
                this.onEvent(event.button, event.clientX, event.clientY, 53 + event.button, event.ctrlKey, event.shiftKey, event.altKey);
            }
            else {
                var changedTouches = data.changedTouches;
                for (var i = 0; i < changedTouches.length; i++) {
                    var element = changedTouches[i];
                    this.onEvent(element.identifier, element.clientX, element.clientY, 53);
                }
            }
        };
        Mouse.prototype.onTouchMove = function (data) {
            var event = data.event;
            if (event) {
                this.onEvent(event.button, event.clientX, event.clientY, 62, event.ctrlKey, event.shiftKey, event.altKey);
            }
            else {
                var changedTouches = data.changedTouches, touches = data.touches;
                if (touches.length == 2) {
                    var one = touches[0];
                    var two = touches[1];
                    var wheelOption = this.wheelOption;
                    var identifier = one.identifier, clientX = one.clientX, clientY = one.clientY;
                    var clientXB = two.clientX, clientYB = two.clientY;
                    wheelOption.x = clientX;
                    wheelOption.y = clientY;
                    clientXB -= clientX;
                    clientYB -= clientY;
                    var detalY = Math.sqrt(clientXB * clientXB + clientYB * clientYB);
                    wheelOption.deltaY = (wheelOption.preWheel - detalY) * 20;
                    wheelOption.wheel = (wheelOption.startWheel - detalY) * 20;
                    wheelOption.preWheel = detalY;
                    this.onEvent(identifier, clientX, clientY, 59, false, false, false, wheelOption);
                }
                for (var i = 0; i < changedTouches.length; i++) {
                    var element = changedTouches[i];
                    this.onEvent(element.identifier, element.clientX, element.clientY, 62);
                }
            }
        };
        Mouse.prototype.onMousewheel = function (event) {
            var wheelOption = this.wheelOption;
            var deltaY = event.deltaY, x = event.clientX, y = event.clientY;
            var ox = wheelOption.x, oy = wheelOption.y;
            if (ox != x || y != oy) {
                wheelOption.x = x;
                wheelOption.y = y;
                wheelOption.deltaY = deltaY;
                wheelOption.wheel = deltaY;
                this.onEvent(event.button, x, y, 60, event.ctrlKey, event.shiftKey, event.altKey, wheelOption);
            }
            else {
                wheelOption.deltaY = deltaY;
                wheelOption.wheel += deltaY;
                this.onEvent(event.button, event.x, event.y, 59, event.ctrlKey, event.shiftKey, event.altKey, wheelOption);
            }
        };
        Mouse.mouseDebug = false;
        return Mouse;
    }());
    rf.Mouse = Mouse;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TrackballControls = (function () {
        function TrackballControls(object, up_axis) {
            this.mouseSitivity = 0.3;
            this.lock = true;
            this.object = object;
            this.target = rf.newVector3D();
            this.up_axis = up_axis || rf.Y_AXIS;
            this.distance = this.object.pos.v3_sub(this.target).v3_length;
            rf.scene.on(50, this.mouseDownHandler, this);
            rf.scene.on(59, this.mouseWheelHandler, this);
            rf.scene.on(52, this.mouseRightDownHandler, this);
            this.updateSun();
        }
        TrackballControls.prototype.updateSun = function () {
        };
        Object.defineProperty(TrackballControls.prototype, "tdistance", {
            get: function () {
                return this.distance;
            },
            set: function (value) {
                this.distance = value;
                this.object.forwardPos(value, this.target);
            },
            enumerable: true,
            configurable: true
        });
        TrackballControls.prototype.mouseWheelHandler = function (event) {
            var distance = this.object.pos.v3_sub(this.target).v3_length;
            this.distance = distance;
            var wheel = event.data.wheel;
            var step = 1;
            if (Math.abs(wheel) < 5000 && distance < 5000) {
                step = distance / 5000;
            }
            wheel *= step;
            var tweener = this.tweener;
            if (tweener) {
                rf.tweenStop(tweener);
            }
            this.tweener = rf.tweenTo({ tdistance: distance + wheel * 2 }, Math.abs(wheel) * 2, rf.defaultTimeMixer, this);
        };
        TrackballControls.prototype.mouseDownHandler = function (event) {
            rf.ROOT.on(62, this.mouseMoveHandler, this);
            rf.ROOT.on(53, this.mouseUpHandler, this);
            this.distance = this.object.pos.v3_sub(this.target).v3_length;
        };
        TrackballControls.prototype.mouseUpHandler = function (e) {
            rf.ROOT.off(62, this.mouseMoveHandler, this);
            rf.ROOT.off(53, this.mouseUpHandler, this);
        };
        TrackballControls.prototype.mouseMoveHandler = function (e) {
            var _a = this, object = _a.object, target = _a.target, mouseSitivity = _a.mouseSitivity, distance = _a.distance;
            var _b = e.data, ox = _b.ox, oy = _b.oy;
            var speed = (distance > 1000) ? mouseSitivity : mouseSitivity * distance / 1000;
            speed = Math.max(speed, 0.1);
            var r0 = 0;
            var r1 = 0;
            if (this.lock) {
                var transform = rf.TEMP_MATRIX3D;
                transform.m3_identity();
                transform.m3_translation(0, 0, -distance);
                if (this.up_axis[1] == 1) {
                    r0 = object.rotationX + oy * speed;
                    r1 = object.rotationY + ox * speed;
                    transform.m3_rotation(r0 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
                    transform.m3_rotation(r1 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
                    transform.m3_rotation(-object._rotationZ, rf.Z_AXIS);
                }
                else if (this.up_axis[2] == 1) {
                    r0 = object.rotationX + oy * speed;
                    r1 = object.rotationZ + ox * speed;
                    transform.m3_rotation(r0 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
                    transform.m3_rotation(-object._rotationY, rf.Y_AXIS);
                    transform.m3_rotation(r1 * rf.DEGREES_TO_RADIANS, rf.Z_AXIS);
                }
                transform.m3_translation(target.x, target.y, target.z);
                object.setPos(transform[12], transform[13], transform[14]);
            }
            else {
                if (this.up_axis[1] == 1) {
                    r0 = object.rotationX + oy * speed;
                    r1 = object.rotationY + ox * speed;
                }
                else if (this.up_axis[2] == 1) {
                    r0 = object.rotationX + oy * speed;
                    r1 = object.rotationZ + ox * speed;
                }
            }
            if (this.up_axis[1] == 1) {
                object.rotationX = r0;
                object.rotationY = r1;
            }
            else if (this.up_axis[2] == 1) {
                object.rotationX = r0;
                object.rotationZ = r1;
            }
            this.updateSun();
        };
        TrackballControls.prototype.mouseRightDownHandler = function (event) {
            rf.ROOT.on(62, this.mouseRightMoveHandler, this);
            rf.ROOT.on(55, this.mouseRightUpHandler, this);
        };
        TrackballControls.prototype.mouseRightMoveHandler = function (event) {
            var _a = event.data, ox = _a.ox, oy = _a.oy;
            var _b = this, object = _b.object, target = _b.target;
            oy *= (this.distance / object.originFar);
            if (this.up_axis[1] == 1) {
                target.y += oy;
            }
            else if (this.up_axis[2] == 1) {
                target.z += oy;
            }
            object.lookat(target, this.up_axis);
            this.updateSun();
        };
        TrackballControls.prototype.mouseRightUpHandler = function (event) {
            rf.ROOT.off(62, this.mouseRightMoveHandler, this);
            rf.ROOT.off(55, this.mouseRightUpHandler, this);
        };
        return TrackballControls;
    }());
    rf.TrackballControls = TrackballControls;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Graphics = (function () {
        function Graphics(target) {
            this.numVertices = 0;
            this.$batchOffset = -1;
            this.preNumVertices = 0;
            this.target = target;
            this.numVertices = 0;
            this.hitArea = new rf.HitArea();
            this.grometrys = [];
        }
        Graphics.prototype.clear = function () {
            this.preNumVertices = this.numVertices;
            this.numVertices = 0;
            this.byte = undefined;
            this.hitArea.clean();
            var grometrys = this.grometrys;
            for (var i = 0; i < grometrys.length; i++) {
                var vo = grometrys[i].vo;
                if (vo) {
                    var used = vo.used - 1;
                    vo.used = used < 0 ? 0 : used;
                }
            }
            this.grometrys.length = 0;
        };
        Graphics.prototype.updateByte = function () {
            if (this.$batchOffset != -1) {
                this.target.$batchGeometry.update(this.$batchOffset, this.byte);
            }
        };
        Graphics.prototype.end = function () {
            var _a = this, target = _a.target, grometrys = _a.grometrys, numVertices = _a.numVertices, verticesUpdate = _a.verticesUpdate;
            var change = 0;
            if (numVertices > 0) {
                var data32PerVertex = target.variables["data32PerVertex"].size;
                var float = new Float32Array(numVertices * data32PerVertex);
                var offset = 0;
                for (var i = 0; i < grometrys.length; i++) {
                    var geo_1 = grometrys[i];
                    geo_1.offset = offset;
                    float.set(geo_1.base, offset);
                    offset += geo_1.base.length;
                }
                this.byte = float;
                if (verticesUpdate) {
                    verticesUpdate(float, target.variables);
                }
                var geo = target.$batchGeometry, __batch = target.__batch;
                if (false && this.$batchOffset != -1 && geo && this.preNumVertices == this.numVertices) {
                    geo.update(this.$batchOffset, float);
                }
                else {
                    this.$batchOffset = -1;
                    if (__batch) {
                        __batch.changeStatus |= 4;
                    }
                    else {
                        change |= 4;
                    }
                }
                if (target.hitArea.combine(this.hitArea, 0, 0)) {
                    change |= 32;
                }
            }
            else {
                this.$batchOffset = -1;
                var __batch = target.__batch;
                if (__batch) {
                    __batch.changeStatus |= 4;
                    change |= 32;
                }
                else {
                    change |= (4 | 32);
                }
            }
            if (change > 0) {
                target.setChange(change);
            }
        };
        Graphics.prototype.addPoint = function (geometry, pos, noraml, uv, color, locksize) {
            var variables = this.target.variables;
            var numVertices = geometry.numVertices;
            function set(variable, array, data) {
                if (undefined == data || undefined == variable) {
                    return;
                }
                var size = variable.size;
                var offset = numVertices * size;
                if (data.length <= size) {
                    array.set(data, offset);
                }
                else {
                    array.set(data.slice(0, size), offset);
                }
            }
            set(variables["pos"], rf.empty_float32_pos, pos);
            if (noraml) {
                set(variables["normal"], rf.empty_float32_normal, noraml);
            }
            set(variables["uv"], rf.empty_float32_uv, uv);
            set(variables["color"], rf.empty_float32_color, color);
            if (!locksize) {
                this.hitArea.updateArea(pos[0], pos[1], pos[2]);
            }
            geometry.numVertices++;
        };
        Graphics.prototype.drawLine = function (x, y, tx, ty, color, thinkness, alpha, z) {
            if (thinkness === void 0) { thinkness = 1.0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (z === void 0) { z = 0; }
            var _a = this.target, variables = _a.variables, source = _a.source, $vcIndex = _a.$vcIndex, $sourceIndex = _a.$sourceIndex, locksize = _a.locksize;
            var oy = thinkness >> 1;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, ~~$vcIndex, ~~$sourceIndex];
            var dx = tx - x;
            var dy = ty - y;
            var m = rf.TEMP_MATRIX2D;
            m.m2_identity();
            m.m2_rotate(Math.atan2(dy, dx));
            var width = Math.sqrt(dy * dy + dx * dx);
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var r = width;
            var b = thinkness;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [
                0, -oy,
                r, -oy,
                r, b,
                0, b
            ];
            for (var i = 0; i < 8; i += 2) {
                p[0] = points[i];
                p[1] = points[i + 1];
                p[2] = z;
                f(m, p, p);
                p[0] += x;
                p[1] += y;
                this.addPoint(geometry, p, undefined, uv, rgba, locksize);
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawRect = function (x, y, width, height, color, alpha, matrix, z) {
            if (alpha === void 0) { alpha = 1; }
            if (matrix === void 0) { matrix = undefined; }
            if (z === void 0) { z = 0; }
            var _a = this.target, variables = _a.variables, source = _a.source, $vcIndex = _a.$vcIndex, $sourceIndex = _a.$sourceIndex, locksize = _a.locksize;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, ~~$vcIndex, ~~$sourceIndex];
            var noraml = [0, 0, 1];
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var r = x + width;
            var b = y + height;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [x, y, r, y, r, b, x, b];
            for (var i = 0; i < 8; i += 2) {
                p[0] = points[i];
                p[1] = points[i + 1];
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                this.addPoint(geometry, p, noraml, uv, rgba, locksize);
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawQuad = function (ps, color, alpha) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            var _a = this.target, variables = _a.variables, source = _a.source, $vcIndex = _a.$vcIndex, $sourceIndex = _a.$sourceIndex, locksize = _a.locksize;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, ~~$vcIndex, ~~$sourceIndex];
            var noraml = [0, 0, 1];
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var len = ((ps.length / 4) >> 0) * 4;
            for (var i = 0; i < len; i++) {
                this.addPoint(geometry, ps[i], noraml, uv, rgba, locksize);
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawCircle = function (x, y, radius, vo, uiMatrix, color, alpha, z, len, sr) {
            if (vo === void 0) { vo = undefined; }
            if (uiMatrix === void 0) { uiMatrix = undefined; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            if (z === void 0) { z = 0; }
            if (len === void 0) { len = Math.PI2; }
            if (sr === void 0) { sr = 0; }
            var _a = this.target, variables = _a.variables, source = _a.source, index = _a.$vcIndex, locksize = _a.locksize, $sourceIndex = _a.$sourceIndex;
            var data32PerVertex = variables["data32PerVertex"].size;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, index, $sourceIndex];
            var noraml = [0, 0, 1];
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var f = rf.m2dTransform;
            var _numSegments;
            var nu;
            var nv;
            var p = [0, 0, z];
            var ou;
            var ov;
            var du;
            var dv;
            if (vo) {
                ou = vo.ul;
                ov = vo.vt;
                du = vo.ur - ou;
                dv = vo.vb - ov;
            }
            else {
                nu = originU;
                nv = originV;
            }
            _numSegments = Math.ceil(radius / 5) * 4;
            if (_numSegments < 16) {
                _numSegments = 16;
            }
            var cos;
            var sin;
            var rcos;
            var rsin;
            var t;
            var i;
            var j;
            for (i = 0; i < _numSegments; i += 2) {
                if (uiMatrix) {
                    p[0] = x;
                    p[1] = y;
                    f(uiMatrix, p, p);
                }
                else {
                    p[0] = x;
                    p[1] = y;
                }
                if (vo) {
                    nu = p[0] / vo.w;
                    if (nu < 0) {
                        nu = 0;
                    }
                    ;
                    if (nu > 1) {
                        nu = 1;
                    }
                    ;
                    nv = p[1] / vo.h;
                    if (nv < 0) {
                        nv = 0;
                    }
                    ;
                    if (nv > 1) {
                        nv = 1;
                    }
                    ;
                    nu = nu * du + ou;
                    nv = nv * dv + ov;
                    uv[0] = nu;
                    uv[1] = nv;
                }
                this.addPoint(geometry, p, noraml, uv, rgba, locksize);
                for (j = 0; j < 3; j++) {
                    t = (i + j) / _numSegments * len + sr;
                    cos = Math.cos(t);
                    sin = Math.sin(t);
                    rcos = cos * radius + x;
                    rsin = sin * radius + y;
                    if (uiMatrix) {
                        p[0] = rcos;
                        p[1] = rsin;
                        f(uiMatrix, p, p);
                    }
                    else {
                        p[0] = rcos;
                        p[1] = rsin;
                    }
                    if (vo) {
                        nu = p[0] / vo.w;
                        if (nu < 0) {
                            nu = 0;
                        }
                        ;
                        if (nu > 1) {
                            nu = 1;
                        }
                        ;
                        nv = p[1] / vo.h;
                        if (nv < 0) {
                            nv = 0;
                        }
                        ;
                        if (nv > 1) {
                            nv = 1;
                        }
                        ;
                        nu = nu * du + ou;
                        nv = nv * dv + ov;
                        uv[0] = nu;
                        uv[1] = nv;
                    }
                    this.addPoint(geometry, p, noraml, uv, rgba, locksize);
                }
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawTriangle = function (x, y, width, height, color, p2y, alpha, matrix, z) {
            if (p2y === void 0) { p2y = 0; }
            if (alpha === void 0) { alpha = 1; }
            if (matrix === void 0) { matrix = undefined; }
            if (z === void 0) { z = 0; }
            var _a = this.target, variables = _a.variables, source = _a.source, $vcIndex = _a.$vcIndex, locksize = _a.locksize, $sourceIndex = _a.$sourceIndex;
            var data32PerVertex = variables["data32PerVertex"].size;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, ~~$vcIndex, ~~$sourceIndex];
            var noraml = [0, 0, 1];
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var r = x + width;
            var b = y + height;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [x, y, r, y + p2y, x, b, x, b];
            for (var i = 0; i < 8; i += 2) {
                p[0] = points[i];
                p[1] = points[i + 1];
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                this.addPoint(geometry, p, noraml, uv, rgba, locksize);
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.setSize = function (width, height) {
            var _this = this;
            this.preNumVertices = this.numVertices;
            this.grometrys.forEach(function (geometry) {
                var x = geometry.x, y = geometry.y, matrix = geometry.matrix, w = geometry.w, h = geometry.h, vo = geometry.vo, rect = geometry.rect, offset = geometry.offset;
                if (width == 0)
                    width = 1;
                var sx = width / w, sy = height / h;
                if (matrix) {
                    matrix.m2_scale(sx, sy);
                }
                if (vo) {
                    if (rect) {
                        _this.drawScale9Bitmap(x, y, vo, rect, matrix, geometry);
                    }
                }
            });
            this.end();
        };
        Graphics.prototype.drawScale9Bitmap = function (x, y, vo, rect, matrix, geometry, color, alpha, z) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            if (z === void 0) { z = 0; }
            var w = vo.w, h = vo.h, ul = vo.ul, ur = vo.ur, vt = vo.vt, vb = vo.vb, ix = vo.ix, iy = vo.iy;
            x += ix;
            y += iy;
            var noraml = [0, 0, 1];
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var _a = this.target, variables = _a.variables, index = _a.$vcIndex, locksize = _a.locksize, $sourceIndex = _a.$sourceIndex;
            var sx = 1, sy = 1;
            if (matrix) {
                var d = matrix.m2_decompose();
                sx = d.scaleX;
                sy = d.scaleY;
                d.scaleX = 1;
                d.scaleY = 1;
                matrix = rf.newMatrix();
                matrix.m2_recompose(d);
            }
            if (!geometry) {
                geometry = rf.newGraphicsGeometry(matrix || rf.newMatrix());
                this.grometrys.push(geometry);
            }
            else {
                geometry.matrix = matrix;
                this.numVertices -= geometry.numVertices;
                geometry.numVertices = 0;
            }
            geometry.x = x;
            geometry.y = y;
            var dx = 0, dy = 0;
            var rx = rect.x, ry = rect.y, rw = rect.w, rh = rect.h;
            var rr = w - rw - rx, rb = h - rh - ry;
            var uw = ur - ul, vh = vb - vt;
            var x2 = dx + rx, y2 = dy + ry;
            var u2 = (rx / w) * uw + ul, u3 = ((rx + rw) / w) * uw + ul;
            var v2 = (ry / h) * vh + vt, v3 = ((ry + rh) / h) * vh + vt;
            geometry.w = w;
            geometry.h = h;
            w = w * sx;
            h = h * sy;
            var x3 = w - rr, y3 = h - rb;
            if (x3 < rx) {
                x3 = rx;
            }
            var r = dx + w, b = dy + h;
            var points = [
                dx, dy, ul, vt, x2, dy, u2, vt, x2, y2, u2, v2, dx, y2, ul, v2,
                x2, dy, u2, vt, x3, dy, u3, vt, x3, y2, u3, v2, x2, y2, u2, v2,
                x3, dy, u3, vt, r, dy, ur, vt, r, y2, ur, v2, x3, y2, u3, v2,
                dx, y2, ul, v2, x2, y2, u2, v2, x2, y3, u2, v3, dx, y3, ul, v3,
                x2, y2, u2, v2, x3, y2, u3, v2, x3, y3, u3, v3, x2, y3, u2, v3,
                x3, y2, u3, v2, r, y2, ur, v2, r, y3, ur, v3, x3, y3, u3, v3,
                dx, y3, ul, v3, x2, y3, u2, v3, x2, b, u2, vb, dx, b, ul, vb,
                x2, y3, u2, v3, x3, y3, u3, v3, x3, b, u3, vb, x2, b, u2, vb,
                x3, y3, u3, v3, r, y3, ur, v3, r, b, ur, vb, x3, b, u3, vb
            ];
            var f = rf.m2dTransform;
            var o = [0, 0];
            if (undefined != matrix) {
                f(matrix, o, o);
            }
            var p = [0, 0, 0];
            for (var i = 0; i < points.length; i += 4) {
                p[0] = points[i] + x - o[0];
                p[1] = points[i + 1] + y - o[1];
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                this.addPoint(geometry, p, noraml, [points[i + 2], points[i + 3], ~~index, ~~$sourceIndex], rgba, locksize);
            }
            geometry.vo = vo;
            geometry.rect = rect;
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawBitmap = function (x, y, vo, matrix, z, z2, geometry, color, alpha) {
            if (z === void 0) { z = 0; }
            if (z2 === void 0) { z2 = undefined; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            vo.time = rf.engineNow;
            vo.used++;
            var w = vo.w, h = vo.h, ul = vo.ul, ur = vo.ur, vt = vo.vt, vb = vo.vb, ix = vo.ix, iy = vo.iy, scale = vo.scale;
            if (scale) {
                w /= scale;
                h /= scale;
            }
            if (z2 == undefined) {
                z2 = z;
            }
            x += ix;
            y += iy;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var noraml = [0, 0, 1];
            var _a = this.target, variables = _a.variables, index = _a.$vcIndex, locksize = _a.locksize, $sourceIndex = _a.$sourceIndex;
            if (!geometry) {
                geometry = rf.newGraphicsGeometry(matrix || rf.newMatrix());
                this.grometrys.push(geometry);
            }
            else {
                this.numVertices -= geometry.numVertices;
                geometry.numVertices = 0;
            }
            var dx = 0, dy = 0;
            geometry.w = w;
            geometry.h = h;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [
                dx, dy, z, ul, vt,
                w, dy, z2, ur, vt,
                w, h, z2, ur, vb,
                dx, h, z, ul, vb
            ];
            for (var i = 0; i < 20; i += 5) {
                p[0] = points[i] + x;
                p[1] = points[i + 1] + y;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                p[2] = points[i + 2];
                this.addPoint(geometry, p, noraml, [points[i + 3], points[i + 4], ~~index, ~~$sourceIndex], rgba, locksize);
            }
            geometry.vo = vo;
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawRepeat = function (x, y, vo, matrix, geometry, color, alpha, z) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            if (z === void 0) { z = 0; }
            vo.time = rf.engineNow;
            vo.used++;
            var w = vo.w, h = vo.h, ul = vo.ul, ur = vo.ur, vt = vo.vt, vb = vo.vb, ix = vo.ix, iy = vo.iy, scale = vo.scale;
            if (scale) {
                w /= scale;
                h /= scale;
            }
            x += ix;
            y += iy;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var noraml = [0, 0, 1];
            var _a = this.target, variables = _a.variables, index = _a.$vcIndex, locksize = _a.locksize, $sourceIndex = _a.$sourceIndex;
            if (!geometry) {
                geometry = rf.newGraphicsGeometry(matrix || rf.newMatrix());
                this.grometrys.push(geometry);
            }
            else {
                this.numVertices -= geometry.numVertices;
                geometry.numVertices = 0;
            }
            var dx = 0, dy = 0;
            geometry.w = w;
            geometry.h = h;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [
                dx, dy, ul, vt,
                w, dy, ur, vt,
                w, h, ur, vb,
                dx, h, ul, vb
            ];
            for (var i = 0; i < 16; i += 4) {
                p[0] = points[i] + x;
                p[1] = points[i + 1] + y;
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                ul = p[0] / w;
                vt = p[1] / h;
                this.addPoint(geometry, p, noraml, [ul, vt, ~~index, ~~$sourceIndex], rgba, locksize);
            }
            geometry.vo = vo;
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        return Graphics;
    }());
    rf.Graphics = Graphics;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function createUIQuad(width, height) {
        var n = [
            0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1,
            width, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1,
            width, height, 0, 1, 0, 0, 0, 1, 1, 1, 1,
            0, height, 0, 0, 0, 0, 0, 1, 1, 1, 1
        ];
        return new rf.VertexInfo(new Float32Array(n), rf.vertex_ui_variable.data32PerVertex.size, rf.vertex_ui_variable);
    }
    rf.createUIQuad = createUIQuad;
    var RTTSprite = (function (_super) {
        __extends(RTTSprite, _super);
        function RTTSprite(singleName, source, variables) {
            var _this = _super.call(this, source, variables) || this;
            _this.rttTarget = { filters: {}, shader: false, program: rf.Program3D };
            _this.singleName = singleName;
            _this.initFileter(_this.rttTarget.filters);
            return _this;
        }
        RTTSprite.prototype.initFileter = function (filters) {
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["diff_"] = rf.singleton(rf.DiffFilter);
            filters["blur_"] = rf.singleton(rf.BlueFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
        };
        RTTSprite.prototype.render = function (camera, option) {
            if (undefined != this.renderer) {
                if (this.status & 19) {
                    this.updateSceneTransform();
                }
                var _a = this, rtt = _a.rtt, singleName = _a.singleName, rttTarget = _a.rttTarget;
                var c = rf.context3D;
                if (!rtt) {
                    this.rtt = rtt = c.createRttTexture(c.getTextureData(singleName), rf.stageWidth, rf.stageHeight);
                }
                c.setRenderToTexture(rtt, false);
                this.renderer.render(camera, option);
                c.setRenderToBackBuffer();
                var program = rf.singleton(rf.Shader).createProgram(rttTarget);
                c.setProgram(program);
                var filters = rttTarget.filters;
                for (var key in filters) {
                    var filter = filters[key];
                    if (filter && !filter.disable) {
                        filter.setProgramConstants(c, program);
                    }
                }
                rf.pass_dc(rtt, program);
            }
            else {
                _super.prototype.render.call(this, camera, option);
            }
        };
        return RTTSprite;
    }(rf.Sprite));
    rf.RTTSprite = RTTSprite;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.empty_number_object = {
        "pos": new Array(3),
        "normal": new Array(3),
        "uv": new Array(4),
        "color": new Array(4)
    };
    function createGeometryVertex(data, variables, numVertices, result) {
        var data32PerVertex = variables["data32PerVertex"].size;
        if (undefined == result) {
            result = new Float32Array(data32PerVertex * numVertices);
        }
        var offset = 0;
        var offsetIndex = 0;
        var offsetData = 0;
        var key = "";
        var index = 0;
        for (var i = 0; i < numVertices; i++) {
            offset = data32PerVertex * i;
            for (key in data) {
                var variable = variables[key];
                if (undefined == variable) {
                    continue;
                }
                var array = data[key];
                offsetData = i * variable.size;
                offsetIndex = offset + variable.offset;
                for (index = 0; index < variable.size; index++) {
                    result[offsetIndex + index] = array[offsetData + index];
                }
            }
        }
        return result;
    }
    rf.createGeometryVertex = createGeometryVertex;
    function geometry_getVariableValue(key) {
        var arr = rf.empty_number_object[key];
        if (!arr) {
            rf.empty_number_object[key] = new Array(4);
        }
        return arr;
    }
    rf.geometry_getVariableValue = geometry_getVariableValue;
    function geometry_addpoint(geometry, value) {
        var numVertices = geometry.numVertices, variables = geometry.variables;
        function set(variable, array, data) {
            if (undefined == data || undefined == variable) {
                return;
            }
            var size = variable.size;
            var offset = numVertices * size;
            if (data.length <= size) {
                array.set(data, offset);
            }
            else {
                array.set(data.slice(0, size), offset);
            }
        }
        for (var key in variables) {
            if (key == "data32PerVertex")
                continue;
            var data = value[key];
            var variable = variables[key];
            if (data && data.length >= variable.size) {
                var array = rf.empty_float32_object[key];
                if (!array) {
                    rf.empty_float32_object[key] = array = new Float32Array(variable.size * rf.EMPTY_MAX_NUMVERTICES);
                }
                set(variable, array, data);
            }
        }
        geometry.numVertices++;
    }
    rf.geometry_addpoint = geometry_addpoint;
    var TGeometry = (function (_super) {
        __extends(TGeometry, _super);
        function TGeometry() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.numTriangles = 0;
            return _this;
        }
        TGeometry.prototype.setData = function (data) {
            this.data = data;
            if (!data) {
                return;
            }
            var vertex = data.vertex, index = data.index, data32PerVertex = data.data32PerVertex, variables = data.variables, numTriangles = data.numTriangles;
            var c = rf.context3D;
            if (vertex) {
                this.vertex = c.createVertexBuffer(new rf.VertexInfo(vertex, data32PerVertex, variables));
            }
            if (index) {
                this.index = c.createIndexBuffer(index);
                this.numTriangles = numTriangles;
            }
            return this;
        };
        return TGeometry;
    }(rf.MiniDispatcher));
    rf.TGeometry = TGeometry;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TextFormat = (function () {
        function TextFormat(strokeSize, strokeColor) {
            this.family = "";
            this.size = 20;
            this.bold = "normal";
            this.italic = "normal";
            this.leading = 4;
            if (strokeSize) {
                this.stroke = { size: strokeSize, color: ~~strokeColor };
            }
        }
        TextFormat.prototype.init = function () {
            var stroke = this.stroke;
            var storkestr = stroke ? stroke.size + " " + stroke.color : "";
            this.__font = this.bold + " " + this.italic + " " + this.size + "px " + this.family + " " + storkestr;
            return this;
        };
        TextFormat.prototype.fillContext = function (context, character, scale, ox, oy) {
            if (ox === void 0) { ox = 0; }
            if (oy === void 0) { oy = 0; }
            context.textBaseline = "alphabetic";
            context.miterLimit = 4;
            context.textAlign = "left";
            context.imageSmoothingQuality = "high";
            context.lineCap = 'round';
            context.lineJoin = 'round';
            var _a = this, family = _a.family, size = _a.size, bold = _a.bold, italic = _a.italic, stroke = _a.stroke;
            size = Math.round(size * scale);
            var originX = ox;
            var originY = oy + size;
            context.font = bold + " " + italic + " " + size + "px " + family;
            if (stroke) {
                context.strokeStyle = this.getColorStr(stroke.color || 0);
                context.lineWidth = Math.round(stroke.size * scale * 2);
                originX += Math.ceil(stroke.size * scale * 1.2);
                originY += Math.ceil(stroke.size * scale * 1.2);
                context.strokeText(character, originX, originY);
            }
            context.fillStyle = rf.c_white;
            context.fillText(character, originX, originY);
        };
        TextFormat.prototype.measureText = function (context, text) {
            var m = context.measureText(text);
            function isSameColor(x, y, width, data) {
                var i = x + y * width << 2;
                return data[i + 3] < 1;
            }
            if (!m.actualBoundingBoxLeft) {
            }
            return m;
        };
        TextFormat.prototype.test = function (text, out, scale) {
            if (!rf.TextFormatCanvas) {
                rf.TextFormatCanvas = rf.createCanvas();
                rf.TextFormatCanvas.width = Math.ceil(100 * rf.pixelFont);
                rf.TextFormatCanvas.height = Math.ceil(100 * rf.pixelFont);
                rf.TextForamtContext = rf.TextFormatCanvas.getContext("2d");
                rf.TextForamtContext.textAlign = "left";
                rf.TextForamtContext.lineCap = 'round';
                rf.TextForamtContext.lineJoin = 'round';
            }
            var width = rf.TextFormatCanvas.width;
            var height = rf.TextFormatCanvas.height;
            rf.TextForamtContext.clearRect(0, 0, width, height);
            function isSameColor(x, y, width, data) {
                var i = x + y * width << 2;
                return data[i + 3] < 1;
            }
            var _a = this, family = _a.family, size = _a.size, bold = _a.bold, italic = _a.italic, stroke = _a.stroke;
            var xmin = 0;
            var ymin = 0;
            var xmax = 0;
            var ymax = 0;
            this.fillContext(rf.TextForamtContext, text, scale, 0, 0);
            var strokesize = stroke ? stroke.size * 2 : 0;
            var m = rf.TextForamtContext.measureText(text);
            var rw = Math.round(m.width);
            var rh = Math.round((size * 1.2 + strokesize + 2) * scale);
            width = Math.min(width, rw + 10);
            height = Math.min(height, rh + 10);
            var imageData = rf.TextForamtContext.getImageData(0, 0, width, height);
            var data = imageData.data;
            xmax = width;
            ymax = height;
            outer: while (xmin + 1 < xmax) {
                for (var y = 0; y < height; y++) {
                    if (!isSameColor(xmin, y, width, data)) {
                        break outer;
                    }
                }
                xmin++;
            }
            outer: while (ymin + 1 < ymax) {
                for (var x = 0; x < width; x++) {
                    if (!isSameColor(x, ymin, width, data)) {
                        break outer;
                    }
                }
                ymin++;
            }
            outer: while (xmax - 1 > xmin) {
                for (var y = 0; y < height; y++) {
                    if (!isSameColor(xmax - 1, y, width, data)) {
                        break outer;
                    }
                }
                xmax--;
            }
            outer: while (ymax - 1 > ymin) {
                for (var x = 0; x < width; x++) {
                    if (!isSameColor(x, ymax - 1, width, data)) {
                        break outer;
                    }
                }
                ymax--;
            }
            if (!out) {
                out = {};
            }
            var w = xmax - xmin;
            var h = ymax - ymin;
            if (w < 2) {
                xmin = rw - 1;
                ymin = rh - 1;
                w = 1;
                h = 1;
            }
            out.x = xmin;
            out.y = ymin;
            out.w = w;
            out.h = h;
            rh = ymin + h;
            out.rw = rw;
            out.rh = rh;
            return out;
        };
        TextFormat.prototype.draw = function (context, text, ox, oy) {
            var scale = rf.pixelFont;
            this.fillContext(context, text, scale, ox, oy);
        };
        TextFormat.prototype.getColorStr = function (color) {
            var s = color.toString(16);
            return "#000000".substr(0, 7 - s.length) + s;
        };
        TextFormat.prototype.clone = function (format) {
            if (undefined == format) {
                format = new TextFormat();
            }
            format.family = this.family;
            format.size = this.size;
            format.bold = this.bold;
            format.italic = this.italic;
            format.stroke = this.stroke;
            format.shadow = this.shadow;
            format.gradient = this.gradient;
            format.__font = this.__font;
            format.align = this.align;
            format.leading = this.leading;
            return format;
        };
        return TextFormat;
    }());
    rf.TextFormat = TextFormat;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function __showKeyboard(tf) {
        if (tf == rf.editTF) {
            return;
        }
        rf.editTF = tf;
        tf.visible = false;
        var sceneTransform = tf.sceneTransform, w = tf.w, h = tf.h, text = tf.text, maxChars = tf.maxChars, multiline = tf.multiline;
        var x = sceneTransform[12];
        var y = sceneTransform[13];
        var offset = tf.format.stroke ? tf.format.stroke.size : 0;
        x += offset;
        y += offset;
        var style;
        if (!rf.weixin) {
            var txt_input = {};
            var format = tf.format;
            txt_input.left = x + "px";
            txt_input.top = y + "px";
            txt_input.width = Math.max(w, 100) + "px";
            txt_input.visibility = "";
            txt_input.border = "none";
            txt_input.outline = "thin";
            txt_input.padding = "0px 0px 10px";
            txt_input["font-size"] = format.size + "px";
            txt_input.height = (format.size + 5) + "px";
            txt_input.color = "#" + tf.color.toString(16);
            txt_input["text-align"] = "left";
            txt_input["vertical-align"] = "top";
            style = { txt_input: txt_input };
            rf.oldWindowWidth = rf.windowWidth;
            rf.oldWindowHeight = rf.windowHeight;
        }
        rf.onKeyboardInput(__onKeyboardInput);
        rf.onKeyboardComplete(__onKeyboardComplete);
        var maxLength = maxChars ? maxChars : 9999;
        var defaultValue = text;
        var option = { defaultValue: defaultValue, style: style, maxLength: maxLength, x: x, y: y, w: w, h: h, multiple: multiline, confirmHold: false };
        rf.showKeyboard(option);
        rf.softKeyboard = true;
    }
    rf.__showKeyboard = __showKeyboard;
    function onResizeKeboard(width, height) {
        var stageY = rf.editTF.stageY;
        var v = rf.TEMP_VECTOR3D;
        v.x = 0;
        v.y = (stageY + rf.editTF.format.size);
        v.z = 0;
        rf.contextMatrix2D.m3_transformVector(v, v);
        v.y /= rf.pixelRatio;
        if (v.y > height) {
            var y = (height - rf.oldWindowHeight - (v.y - rf.oldWindowHeight)) * rf.pixelRatio;
            rf.setContextMatrix(rf.oldWindowWidth, rf.oldWindowHeight, 0, y);
        }
    }
    rf.onResizeKeboard = onResizeKeboard;
    function __onKeyboardInput(option) {
        if (rf.editTF) {
            rf.editTF.text = option.value;
        }
    }
    rf.__onKeyboardInput = __onKeyboardInput;
    function __onKeyboardComplete(option) {
        rf.softKeyboard = false;
        if (rf.editTF) {
            rf.editTF.visible = true;
            rf.editTF.text = option.value;
            rf.editTF.simpleDispatch(10);
            rf.editTF = undefined;
        }
    }
    rf.__onKeyboardComplete = __onKeyboardComplete;
    var emote_images = {};
    rf.EMPTY_FONTSIZE = { x: 0, y: 0, w: 0, h: 0, rw: 0, rh: 0 };
    rf.defalue_format = new rf.TextFormat().init();
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField(source) {
            if (source === void 0) { source = rf.textSource; }
            var _this = _super.call(this, source) || this;
            _this.html = false;
            _this.$text = "";
            _this.color = 0xFFFFFF;
            _this.gap = 0;
            _this.multiline = false;
            _this._edit = false;
            _this._type = "dynamic";
            _this.lines = [];
            _this.textLines = [];
            return _this;
        }
        TextField.prototype.init = function (source, format) {
            if (undefined != source) {
                this.source = source;
            }
            if (undefined == format) {
                format = rf.defalue_format;
            }
            this.format = format.clone();
        };
        Object.defineProperty(TextField.prototype, "text", {
            get: function () {
                return this.$text;
            },
            set: function (value) {
                if (this.$text == value) {
                    return;
                }
                this.$text = value;
                var element = this.element;
                if (undefined == element) {
                    this.element = element = new HtmlElement();
                }
                else {
                    element.clear();
                }
                var format = this.format;
                if (undefined == format) {
                    this.format = format = rf.defalue_format.clone();
                }
                element.format = format;
                element.color = this.color;
                if (this.html) {
                    formatHtml(value, element, this.source);
                }
                else {
                    element.str = value;
                }
                var prelens = this.textLines.length;
                var lines = this.tranfromHtmlElement2CharDefine(element, this.multiline ? this.w : Infinity);
                var len = lines.length;
                var oy = 0;
                var lw;
                for (var i = 0; i < len; i++) {
                    var line = lines[i];
                    var textLine = this.textLines[i];
                    if (undefined == textLine) {
                        this.textLines[i] = textLine = new TextLine();
                    }
                    textLine.y = oy;
                    textLine.source = this.source;
                    textLine.renderText(line);
                    textLine.updateHitArea();
                    oy += line.h + format.leading;
                    this.addChild(textLine);
                    if (!lw) {
                        lw = line.w;
                    }
                    else {
                        if (lw < line.w) {
                            lw = line.w;
                        }
                    }
                }
                this.textWidth = lw;
                this.textHeight = Math.floor(oy / 1.1);
                while (lines.length > len) {
                    var textLine = lines.pop();
                    textLine.recycle();
                }
                while (prelens > len) {
                    var tline = this.textLines[prelens - 1];
                    tline.cleanAll();
                    prelens--;
                }
                this.layout();
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.cleanAll = function () {
            _super.prototype.cleanAll.call(this);
        };
        TextField.prototype.removeChild = function (child) {
            _super.prototype.removeChild.call(this, child);
        };
        TextField.prototype.layout = function () {
            var _a = this, format = _a.format, w = _a.w, h = _a.h, textHeight = _a.textHeight, childrens = _a.childrens;
            this.updateHitArea();
            var align = format.align, leading = format.leading;
            var oy = 0;
            switch (align / 3 >> 0) {
                case 1:
                    oy = Math.max(h - textHeight >> 1, 0);
                    break;
                case 2:
                    oy = Math.max(h - textHeight, 0);
                    break;
            }
            align = align % 3;
            childrens.forData(function (display) {
                display.y += oy;
                if (align == 1) {
                    display.x = w - display.w >> 1;
                }
                else if (align == 2) {
                    display.x = w - display.w;
                }
                return true;
            }, this);
        };
        TextField.prototype.getCharSourceVO = function (char, format) {
            var source = this.source;
            var name = format.__font + "_" + char;
            var vo = source.getSourceVO(name, 1);
            if (undefined == vo) {
                var p = rf.EMPTY_FONTSIZE;
                var bmd = source.bmd;
                var context = bmd.context;
                format.test(char, p, rf.pixelFont);
                var pf = 1;
                vo = source.setSourceVO(name, p.w, p.h, 1, p.w + pf, p.h + pf);
                if (vo) {
                    vo.ix = p.x / rf.pixelFont;
                    vo.iy = p.y / rf.pixelFont;
                    vo.tw = p.rw / rf.pixelFont;
                    vo.th = (p.h + p.y) / rf.pixelFont;
                    format.draw(context, char, vo.x - p.x, vo.y - p.y);
                    vo.w = p.w / rf.pixelFont;
                    vo.h = p.h / rf.pixelFont;
                    var c = rf.context3D;
                    var textureData = source.textureData;
                    if (!textureData) {
                        source.textureData = textureData = c.getTextureData(source.name);
                    }
                    var texture = rf.context3D.textureObj[textureData.key];
                    if (undefined != texture) {
                        texture.readly = false;
                    }
                }
            }
            return vo;
        };
        TextField.prototype.tranfromHtmlElement2CharDefine = function (html, width) {
            if (width === void 0) { width = Infinity; }
            var char;
            var str;
            var i = 0;
            var oi = 0;
            var len;
            var ox = 0;
            var lineCount = 0;
            var lines = this.lines;
            var line = lines[lineCount];
            if (!line) {
                lines[lineCount] = line = rf.recyclable(Line);
            }
            var chars = line.chars;
            lineCount++;
            while (html) {
                if (!html.image && !html.str) {
                    html = html.next;
                    continue;
                }
                if (html.image) {
                    if (html.newline) {
                        while (chars.length > oi) {
                            char = chars.pop();
                            char.recycle();
                        }
                        line = lines[lineCount];
                        if (!line) {
                            lines[lineCount] = line = rf.recyclable(Line);
                        }
                        chars = line.chars;
                        ox = 0;
                        oi = 0;
                        lineCount++;
                    }
                    if (ox && ox + html.image.w > width) {
                        while (chars.length > oi) {
                            char = chars.pop();
                            char.recycle();
                        }
                        line = lines[lineCount];
                        if (!line) {
                            lines[lineCount] = line = rf.recyclable(Line);
                        }
                        chars = line.chars;
                        ox = 0;
                        oi = 0;
                        lineCount++;
                    }
                    char = chars[oi];
                    if (!char) {
                        chars[oi] = char = rf.recyclable(Char);
                    }
                    char.index = oi;
                    char.w = html.w;
                    char.h = html.h;
                    char.sx = ox;
                    char.ex = ox + char.w;
                    char.ox = ox + char.h * .5;
                    char.name = null;
                    char.display = html.image;
                    char.element = html;
                    line.w = ox + char.w;
                    if (line.h < char.h) {
                        line.h = char.h;
                    }
                    ox += (char.w + this.gap);
                    oi++;
                }
                else {
                    if (html.newline) {
                        while (chars.length > oi) {
                            char = chars.pop();
                            char.recycle();
                        }
                        line = lines[lineCount];
                        if (!line) {
                            lines[lineCount] = line = rf.recyclable(Line);
                        }
                        chars = line.chars;
                        ox = 0;
                        oi = 0;
                        lineCount++;
                    }
                    str = html.str;
                    len = str.length;
                    var codePointAt = str.codePointAt ? str.codePointAt : str.charCodeAt;
                    for (i = 0; i < len; i++) {
                        var p = codePointAt.call(str, i);
                        var c = void 0;
                        if (p > 0xFFFF) {
                            c = str.slice(i, i + 2);
                            i++;
                        }
                        else {
                            c = str.charAt(i);
                        }
                        var vo = this.getCharSourceVO(c, html.format);
                        if (!vo) {
                            continue;
                        }
                        if (ox + vo.w > width) {
                            while (chars.length > oi) {
                                char = chars.pop();
                                char.recycle();
                            }
                            line = lines[lineCount];
                            if (!line) {
                                lines[lineCount] = line = rf.recyclable(Line);
                            }
                            chars = line.chars;
                            ox = 0;
                            oi = 0;
                            lineCount++;
                        }
                        char = chars[oi];
                        if (!char) {
                            chars[oi] = char = rf.recyclable(Char);
                        }
                        char.index = oi;
                        char.w = vo.tw;
                        char.h = vo.th;
                        char.sx = ox;
                        char.ex = ox + char.w;
                        char.ox = ox + char.w * .5;
                        char.name = c;
                        char.element = html;
                        char.display = vo;
                        line.w = ox + vo.tw;
                        if (line.h < char.h) {
                            line.h = char.h;
                        }
                        ox += (char.w + this.gap);
                        oi++;
                    }
                }
                html = html.next;
            }
            while (chars.length > oi) {
                char = chars.pop();
                char.recycle();
            }
            while (lines.length > lineCount) {
                line = lines.pop();
                var chars_1 = line.chars;
                for (var i_1 = 0; i_1 < chars_1.length; i_1++) {
                    chars_1[i_1].recycle();
                }
                chars_1.length = 0;
            }
            return lines;
        };
        Object.defineProperty(TextField.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (val) {
                this._type = val;
                if (val == "input") {
                    this.on(53, this.mouseUpHandler, this);
                }
                else {
                    this.off(53, this.mouseUpHandler, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.mouseUpHandler = function (event) {
            this.simpleDispatch(30);
            __showKeyboard(this);
            if (rf.isMobile) {
                rf.callLater.add(this.looseEvt, this);
            }
        };
        TextField.prototype.looseEvt = function () {
            rf.ROOT.on(50, this.blurHandle, this);
        };
        TextField.prototype.blurHandle = function (e) {
            e.stopImmediatePropagation = true;
            if (e.currentTarget == this)
                return;
            rf.ROOT.off(50, this.blurHandle, this);
            rf.hideKeyboard();
        };
        TextField.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            if (this._edit) {
                rf.ROOT.off(50, this.blurHandle, this);
                rf.hideKeyboard();
            }
        };
        return TextField;
    }(rf.Sprite));
    rf.TextField = TextField;
    var ImageVO = (function () {
        function ImageVO() {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
        }
        ImageVO.prototype.clone = function (vo) {
            if (undefined == vo) {
                vo = new ImageVO();
            }
            vo.name = this.name;
            vo.tag = this.tag;
            vo.w = this.w;
            vo.h = this.h;
            return vo;
        };
        ImageVO.prototype.dispose = function () {
            this.display = undefined;
        };
        return ImageVO;
    }());
    rf.ImageVO = ImageVO;
    var HtmlElement = (function () {
        function HtmlElement() {
            this.newline = false;
            this.str = undefined;
            this.start = 0;
            this.color = 0;
        }
        HtmlElement.prototype.createAndCopyFormat = function (last, newline) {
            if (last === void 0) { last = null; }
            if (newline === void 0) { newline = false; }
            var ele = new HtmlElement();
            ele.format = this.format;
            ele.underline = this.underline;
            ele.color = this.color;
            ele.newline = newline;
            if (last) {
                last.next = ele;
                ele.pre = last;
            }
            return ele;
        };
        HtmlElement.prototype.clear = function () {
            var next;
            while (next) {
                if (next.image) {
                    var images = emote_images;
                    if (next.imageTag > -1) {
                        images[next.imageTag] = null;
                        next.imageTag = -1;
                    }
                    next.image.remove();
                    next.image = null;
                }
                next = next.next;
            }
            this.next = null;
            this.pre = null;
            this.str = undefined;
            this.color = 0;
            this.image = undefined;
            this.imageTag = undefined;
        };
        return HtmlElement;
    }());
    rf.HtmlElement = HtmlElement;
    var regPro = /(color|size|face|href|target|width|height)=(['|"])(.*?)(\2)/;
    var regTag = /<(font|u|a|image|b)([^\>]*?)\>/;
    var _imgtag = /({tag (.*?) (.*?)})/g;
    var _emotiontag = /\#[0-9]/g;
    var newLineChar = "∏々";
    function getTagStr(value) {
        var o = regTag.exec(value);
        if (undefined == o) {
            return undefined;
        }
        var tag = o[1];
        var flag = 1;
        var findTag = "<" + tag;
        var findTagLen = findTag.length;
        var endTag = "</" + tag;
        var endTagLen = endTag.length;
        var sindex;
        var findindex;
        var endindex;
        sindex = o[0].length + o.index;
        while (flag) {
            findindex = value.indexOf(findTag, sindex);
            endindex = value.indexOf(endTag, sindex);
            if (findindex != -1 && findindex < endindex) {
                flag++;
                sindex = findindex + findTagLen;
            }
            else {
                if (endindex == -1) {
                    console.log("htmltext format error at tag " + tag + "\nvalue:" + value);
                    return undefined;
                }
                flag--;
                sindex = endindex + endTagLen;
            }
        }
        endindex = value.indexOf(">", sindex);
        if (endindex == -1) {
            console.log("htmltext format error at tag " + tag + "\nvalue:" + value);
            return undefined;
        }
        var result = value.slice(o.index, endindex + 1);
        o[3] = value.slice(o.index + o[0].length, sindex - endTagLen);
        o[0] = result;
        return o;
    }
    function doFormatHtml(value, source, parent, last) {
        if (parent === void 0) { parent = null; }
        if (last === void 0) { last = null; }
        var html;
        var o;
        var str;
        var len;
        var i;
        if (parent) {
            if (parent.str || parent.image) {
                last = html = parent.createAndCopyFormat(last);
            }
            else {
                html = parent;
            }
        }
        var nextnew;
        o = getTagStr(value);
        if (o) {
            var index = o.index;
            if (index != 0) {
                str = value.slice(0, index);
                while ((i = str.indexOf(newLineChar)) != -1) {
                    if (html.str || parent.image) {
                        last = html = parent.createAndCopyFormat(last, nextnew);
                    }
                    html.str = str.slice(0, i);
                    nextnew = true;
                    str = str.slice(i + newLineChar.length);
                }
                if (html.str || parent.image) {
                    last = html = parent.createAndCopyFormat(last, nextnew);
                    if (str) {
                        nextnew = false;
                    }
                }
                if (nextnew) {
                    last = html = parent.createAndCopyFormat(last, nextnew);
                    html.str = str;
                }
                else {
                    html.str = str;
                }
                if (str) {
                    nextnew = false;
                }
            }
            value = value.slice(o.index + o[0].length);
            if (o[1] == "image") {
                var image = emote_images[o[3]];
                if (image) {
                    if (parent.str || parent.image) {
                        last = html = parent.createAndCopyFormat(last, html.newline);
                    }
                    html.imageTag = o[3];
                    html.image = image;
                    html.w = image.w;
                    html.h = image.h;
                    htmlProParser(o[1], o[2], html, html.image);
                }
            }
            else if (o[1] == "a") {
                if (parent.str || parent.image) {
                    last = html = parent.createAndCopyFormat(last, html.newline);
                }
                var text = rf.recyclable(TextALink);
                text.init(source, html.format);
                text.format.align = 0;
                text.color = html.color;
                html.image = text;
                html.imageTag = -1;
                htmlProParser(o[1], o[2], html, text);
                text.text = o[3];
                html.w = text.w;
                html.h = text.h;
            }
            else if (o[1] == "b") {
                last = html = parent.createAndCopyFormat(last, html.newline);
                var format = parent.format;
                if (format.bold != "bold") {
                    format = format.clone();
                    format.bold = "bold";
                    format.init();
                }
                html.format = format;
                htmlProParser(o[1], o[2], html);
                last = doFormatHtml(o[3], source, html, last);
            }
            else {
                last = html = parent.createAndCopyFormat(last, nextnew);
                htmlProParser(o[1], o[2], html);
                last = doFormatHtml(o[3], source, html, last);
            }
            if (value.length) {
                last = html = parent.createAndCopyFormat(last);
                last = doFormatHtml(value, source, html, last);
            }
        }
        else {
            str = value;
            nextnew = false;
            while ((i = str.indexOf(newLineChar)) != -1) {
                if (html.str || parent.image) {
                    last = html = parent.createAndCopyFormat(last, nextnew);
                }
                html.str = str.slice(0, i);
                nextnew = true;
                str = str.slice(i + newLineChar.length);
            }
            if (html.str || parent.image) {
                last = html = parent.createAndCopyFormat(last, html.newline);
            }
            html.str = str;
            if (nextnew) {
                html.newline = nextnew;
                nextnew = false;
            }
        }
        return last;
    }
    rf.imageCreateFunctions = {};
    var imageTag = 0;
    function checkImage() {
        for (var i = 0; i < imageTag; i++) {
            if (emote_images[i] == null) {
                return i;
            }
        }
        return imageTag++;
    }
    function createImage(tag, value, source) {
        var funcParms = rf.imageCreateFunctions[tag];
        if (!funcParms) {
            return "";
        }
        var func = funcParms.func, thisobj = funcParms.thisobj;
        var imagevo = func.call(thisobj, value, source);
        var index = checkImage();
        emote_images[index] = imagevo.display;
        imagevo.display = undefined;
        var str = "<image>" + index + "</image>";
        return str;
    }
    function imageStrFormat(value, source) {
        var _strs;
        var len;
        var index = 0;
        var arr;
        _strs = "";
        value = value.replace(/\'#/g, "'$");
        value = value.replace(/\"#/g, "\"$");
        len = value.length;
        index = _imgtag.lastIndex = 0;
        var temp1;
        var temp;
        while (index < len) {
            arr = _imgtag.exec(value);
            if (arr) {
                temp1 = arr[0];
                temp = value.substring(index, _imgtag.lastIndex - temp1.length);
                if (temp) {
                    _strs += temp;
                }
                index = _imgtag.lastIndex;
                _strs += createImage(arr[2], arr[3], source);
            }
            else {
                temp = value.substring(index);
                if (temp) {
                    _strs += temp;
                }
                break;
            }
        }
        value = _strs;
        var imageCheck = 0;
        var i;
        var imageVO;
        var tag;
        if (rf.emotion) {
            do {
                i = value.indexOf("#", index);
                if (i == -1) {
                    break;
                }
                index = i + 1;
                imageCheck = 5;
                while (imageCheck > 2) {
                    tag = value.slice(i, i + imageCheck);
                    imageVO = rf.emotion[tag];
                    if (!imageVO) {
                        imageCheck--;
                        continue;
                    }
                    var s = _emotiontag.exec(tag);
                    var image = createImage("em", tag, source);
                    value = value.replace(tag, image);
                    break;
                }
            } while (i != -1);
        }
        value = value.replace(/\'\$/g, "'#");
        value = value.replace(/\"\$/g, "\"#");
        value = value.replace(/\'\$/g, "'#");
        return value;
    }
    function formatHtml(value, html, source) {
        value = value.replace(/<br\/>/g, newLineChar);
        value = value.replace(/\\n/g, newLineChar);
        value = value.replace(/\&lt;/g, "<");
        value = value.replace(/\&gt;/g, ">");
        value = value.replace(/\&apos;/g, "'");
        value = value.replace(/\&quot;/g, '"');
        value = value.replace(/\&amp;/g, "&");
        value = imageStrFormat(value, source);
        doFormatHtml(value, source, html, html);
        var next;
        while (html) {
            if (html.pre && !html.str && !html.newline && !html.image) {
                html.pre.next = html.next;
                if (html.next) {
                    html.next.pre = html.pre;
                }
                html = html.next;
            }
            else {
                html = html.next;
            }
        }
    }
    rf.formatHtml = formatHtml;
    function htmlProParser(pro, value, html, sp) {
        regPro.lastIndex = 0;
        value = value.replace(/\s/g, "");
        var o = regPro.exec(value);
        var cloneFormat;
        while (o) {
            var p = o[1];
            var v = o[3];
            p = p.trim();
            if (p == "color") {
                html.color = v = Number(v.replace("#", "0x"));
            }
            else if (p == "href") {
            }
            else if (p == "size") {
                var size = Number(v);
                var format = html.format;
                if (format.size != size) {
                    format = format.clone();
                    format.size = size;
                    format.init();
                    html.format = format;
                }
            }
            if (undefined != sp) {
                sp[p] = v;
            }
            else {
                html[p] = v;
            }
            value = value.replace(o[0], "");
            o = regPro.exec(value);
        }
    }
    var Char = (function () {
        function Char() {
            this.ox = 0;
            this.sx = 0;
            this.ex = 0;
        }
        Char.prototype.onRecycle = function () {
            this.element = undefined;
            this.display = undefined;
        };
        return Char;
    }());
    rf.Char = Char;
    var Line = (function () {
        function Line() {
            this.w = 0;
            this.h = 0;
            this.chars = [];
        }
        return Line;
    }());
    rf.Line = Line;
    var TextLine = (function (_super) {
        __extends(TextLine, _super);
        function TextLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextLine.prototype.renderText = function (line) {
            this.removeAllChild();
            this.line = line;
            var h = line.h;
            var chars = line.chars;
            var len = chars.length;
            var g = this.graphics;
            g.clear();
            for (var i = 0; i < len; i++) {
                var char = chars[i];
                var ele = char.element;
                var display = char.display;
                if (display instanceof rf.Sprite) {
                    display.x = char.sx;
                    display.y = (h - display.h) >> 1;
                    this.addChild(display);
                }
                else {
                    var color = ele.color;
                    if (char.name.codePointAt(0) > 0xFFFF) {
                        color = 0xFFFFFF;
                    }
                    g.drawBitmap(char.sx, 0, display, undefined, 0, 0, undefined, color);
                }
            }
            g.end();
        };
        return TextLine;
    }(rf.Sprite));
    rf.TextLine = TextLine;
    var TextALink = (function (_super) {
        __extends(TextALink, _super);
        function TextALink() {
            var _this = _super.call(this) || this;
            _this.html = true;
            _this.mouseEnabled = true;
            _this.mouseChildren = false;
            _this.on(56, _this.textHandler, _this);
            return _this;
        }
        Object.defineProperty(TextALink.prototype, "href", {
            set: function (value) {
                if (value.indexOf("event:") == 0) {
                    this.event = value.replace("event:", "");
                }
                else {
                    this.http = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        TextALink.prototype.textHandler = function (e) {
            var _a = this, event = _a.event, http = _a.http;
            ;
            if (event) {
                this.simpleDispatch(41, event, true);
            }
        };
        TextALink.prototype.layout = function () {
            _super.prototype.layout.call(this);
            var _a = this, graphics = _a.graphics, h = _a.h, w = _a.w;
            this.buttonModel(w >> 1, h >> 1, 0);
            graphics.clear();
            graphics.drawLine(0, h, w, h, this.color, 1.5);
            graphics.end();
        };
        __decorate([
            rf.RecyclePro(undefined)
        ], TextALink.prototype, "http", void 0);
        __decorate([
            rf.RecyclePro(undefined)
        ], TextALink.prototype, "event", void 0);
        return TextALink;
    }(TextField));
    rf.TextALink = TextALink;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var NormalRender = (function () {
        function NormalRender(target) {
            this.target = target;
        }
        NormalRender.prototype.render = function (camera, option) {
            var target = this.target;
            var c = rf.context3D;
            var source = target.source, status = target.status, _x = target._x, _y = target._y, _scaleX = target._scaleX, scrollRect = target.scrollRect, sceneTransform = target.sceneTransform;
            if (!source || !source.bmd) {
                return;
            }
            var textureData = source.textureData;
            if (!textureData) {
                source.textureData = textureData = c.getTextureData(source.name, false);
            }
        };
        return NormalRender;
    }());
    rf.NormalRender = NormalRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SingleRenderer = (function () {
        function SingleRenderer(target) {
            this.depth = false;
            this.depthMode = 519;
            this.srcFactor = 770;
            this.dstFactor = 771;
            this.target = target;
            this.initFileter(target.filters);
        }
        SingleRenderer.prototype.initFileter = function (filters) {
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["color_"] = rf.singleton(rf.ColorFilter);
            filters["diff_"] = rf.singleton(rf.DiffFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
        };
        SingleRenderer.prototype.update = function (position, byte) {
            var _a = this, vertex = _a.vertex, vertexBuffer = _a.vertexBuffer;
            if (vertex) {
                vertex.vertex = byte;
                if (vertexBuffer) {
                    vertexBuffer.readly = false;
                }
            }
        };
        SingleRenderer.prototype.render = function (camera, option) {
            var target = this.target;
            var source = target.source, status = target.status, scrollRect = target.scrollRect, sceneTransform = target.sceneTransform, filters = target.filters;
            var c = rf.context3D;
            if (!source || !source.bmd) {
                return;
            }
            if (status & 4) {
                var g = target.$graphics;
                if (!g || g.numVertices <= 0) {
                    return;
                }
                var _a = this, vertex_1 = _a.vertex, vertexBuffer_1 = _a.vertexBuffer;
                var variables = target.variables;
                if (!vertex_1) {
                    this.vertex = vertex_1 = new rf.VertexInfo(g.byte, variables.data32PerVertex.size, variables);
                }
                else if (vertexBuffer_1) {
                    vertex_1.vertex = g.byte;
                    vertexBuffer_1.readly = false;
                }
                target.$batchGeometry = this;
                this.quadcount = g.numVertices / 4;
                target.status = 0;
            }
            var _b = this, vertex = _b.vertex, vertexBuffer = _b.vertexBuffer, program = _b.program, quadcount = _b.quadcount;
            if (!vertex) {
                return;
            }
            if (!vertexBuffer) {
                this.vertexBuffer = vertexBuffer = c.createVertexBuffer(vertex);
            }
            if (!program) {
                program = this.createProgram();
            }
            var parentRect;
            if (scrollRect) {
                parentRect = c.setScissor(scrollRect, sceneTransform[12], sceneTransform[13], camera);
            }
            var worldTransform = rf.TEMP_MATRIX3D;
            worldTransform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgram(program);
            source.uploadContext(program, "diff");
            vertexBuffer.uploadContext(program);
            c.setProgramConstantsFromMatrix("mvp", worldTransform);
            c.setting.depth = this.depth;
            c.setting.depthMode = this.depthMode;
            c.setting.src = this.srcFactor;
            c.setting.dst = this.dstFactor;
            this.otherParms(c, program);
            for (var key in filters) {
                var filter = filters[key];
                if (filter && !filter.disable) {
                    filter.setProgramConstants(c, program, target);
                }
            }
            c.drawTriangles(c.getIndexByQuad(quadcount), quadcount * 2);
            if (scrollRect) {
                c.lossScissor(parentRect);
            }
        };
        SingleRenderer.prototype.otherParms = function (c, p) {
        };
        SingleRenderer.prototype.createProgram = function () {
            var shader = rf.singleton(rf.Shader);
            var target = this.target;
            var program;
            this.program = program = shader.createProgram(target);
            return program;
        };
        return SingleRenderer;
    }());
    rf.SingleRenderer = SingleRenderer;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var IBatchSourceData = (function () {
        function IBatchSourceData() {
        }
        return IBatchSourceData;
    }());
    rf.IBatchSourceData = IBatchSourceData;
    var MatrixUIFilter = (function (_super) {
        __extends(MatrixUIFilter, _super);
        function MatrixUIFilter() {
            var _this = _super.call(this, "MatrixUI_") || this;
            _this.vertex = MatrixUIFilter.VERTEX;
            return _this;
        }
        MatrixUIFilter.VERTEX = {
            def: "uniform vec4 ui[" + rf.max_vc * 2 + "];\n",
            func: "\nvoid caclUIMat3(inout vec4 p , in vec4 t , in vec4 v){\n    mat3 m = mat3(\n        t.x,t.y,0.0,\n        t.z,t.w,0.0,\n        0.0,0.0,1.0\n    );\n    p.xyz = m * p.xyz + v.xyz;\n}\n",
            code: "\n \nvec4 tv = ui[int(uv.z * 2.0)];\nvec4 tvp = ui[int(uv.z * 2.0 + 1.0)];\n\ncaclUIMat3(p,tv,tvp);\n\nc.w *= tvp.w;\n"
        };
        return MatrixUIFilter;
    }(rf.FilterBase));
    rf.MatrixUIFilter = MatrixUIFilter;
    var SuperBatchRenderer = (function () {
        function SuperBatchRenderer(target) {
            this.changeStatus = 4;
            this.depth = false;
            this.depthMode = 519;
            this.srcFactor = 770;
            this.dstFactor = 771;
            this.cull = 0;
            this.target = target;
            var filters = target.filters;
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["color_"] = rf.singleton(rf.ColorFilter);
            filters["diff_"] = rf.singleton(rf.UIDiffFilter);
            filters["MatrixUI_"] = rf.singleton(MatrixUIFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
            this.worldTransform = rf.newMatrix3D();
            this.invSceneTransfrom = rf.newMatrix3D();
        }
        SuperBatchRenderer.prototype.render = function (camera, option) {
            var _a = this, change = _a.changeStatus, target = _a.target, renderData = _a.renderData, worldTransform = _a.worldTransform, invSceneTransfrom = _a.invSceneTransfrom;
            var scrollRect = target.scrollRect, sceneTransform = target.sceneTransform;
            if (change & 4) {
                this.cleanBatch();
                this.filterGeo(target);
                this.toBatch();
                renderData = this.renderData;
                this.changeStatus &= ~12;
            }
            var parentRect;
            if (scrollRect) {
                parentRect = rf.context3D.setScissor(scrollRect, sceneTransform[12], sceneTransform[13], camera);
            }
            worldTransform.m3_append(camera.worldTranform, false, sceneTransform);
            for (; renderData; renderData = renderData.__render_next) {
                if (renderData instanceof rf.Sprite) {
                    renderData.render(camera, option);
                }
                else {
                    this.dc(renderData, worldTransform);
                }
            }
            if (scrollRect) {
                rf.context3D.lossScissor(parentRect);
            }
        };
        SuperBatchRenderer.prototype.dc = function (renderData, worldTransform) {
            var c = rf.context3D;
            if (!this.length) {
                return;
            }
            var program = renderData.program, vcData = renderData.vcData, offset = renderData.offset, triangles = renderData.triangles, quad = renderData.quad;
            if (!program) {
                renderData.program = program = rf.singleton(rf.Shader).createProgram(renderData);
            }
            var target = this.target;
            var filters = target.filters;
            var setting = c.setting;
            setting.depth = this.depth;
            setting.depthMode = this.depthMode;
            setting.src = this.srcFactor;
            setting.dst = this.dstFactor;
            setting.cull = this.cull;
            c.setProgram(program);
            var _a = this, vertex = _a.vertexBuffer, sources = _a.sources;
            vertex.uploadContext(program);
            var variable = "diff";
            for (var i = 0; i < sources.length; i++) {
                sources[i].uploadContext(program, i == 0 ? variable : variable + i);
            }
            for (var key in filters) {
                var filter = filters[key];
                if (filter && !filter.disable) {
                    filter.setProgramConstants(c, program, target);
                }
            }
            c.setProgramConstantsFromVector("ui", vcData, 4);
            c.setProgramConstantsFromMatrix("mvp", worldTransform);
            var indexbuffer = c.getIndexByQuad(quad);
            c.drawTriangles(indexbuffer, triangles, undefined, offset);
        };
        SuperBatchRenderer.prototype.cleanBatch = function () {
            var _a = this, currentRenderData = _a.currentRenderData, target = _a.target;
            if (!currentRenderData) {
                currentRenderData = {};
            }
            currentRenderData.__render_next = undefined;
            currentRenderData.first = undefined;
            currentRenderData.current = undefined;
            this.i3DRender = undefined;
            var renderData = this.renderData;
            while (renderData) {
                var temp = renderData.__render_next;
                renderData.__render_next = undefined;
                renderData = temp;
            }
            this.renderData = undefined;
            this.length = 0;
            this.sources = [];
            this.currentRenderData = currentRenderData;
            currentRenderData.shaderKey = target.shaderKey;
            currentRenderData.factorKey = target.factorKey;
            var filters = target.filters;
            var f = {};
            for (var filterKey in filters) {
                f[filterKey] = filters[filterKey];
            }
            currentRenderData.filters = f;
            currentRenderData.count = 0;
            currentRenderData.quad = 0;
            currentRenderData.program = undefined;
        };
        SuperBatchRenderer.prototype.createNewRenderData = function (render, factorKey) {
            var currentRenderData = this.currentRenderData;
            var renderData = {};
            var filters = currentRenderData.filters;
            var f = {};
            var shaderKey = "";
            for (var filterKey in filters) {
                var filter = filters[filterKey];
                f[filterKey] = filter;
                shaderKey += filter.skey;
            }
            filters = render.filters;
            for (var filterKey in filters) {
                var filter = filters[filterKey];
                f[filterKey] = filter;
                shaderKey += filter.skey;
            }
            renderData.filters = f;
            renderData.shaderKey = shaderKey;
            renderData.factorKey = factorKey;
            renderData.count = 0;
            renderData.quad = 0;
            currentRenderData.__render_next = renderData;
            this.currentRenderData = renderData;
            return renderData;
        };
        SuperBatchRenderer.prototype.copyRenderData = function (data) {
            var renderData = {};
            renderData.filters = data.filters;
            renderData.shaderKey = data.shaderKey;
            renderData.factorKey = data.factorKey;
            renderData.count = 0;
            renderData.quad = 0;
            this.currentRenderData = renderData;
            return renderData;
        };
        SuperBatchRenderer.prototype.filterGeo = function (render) {
            var _this = this;
            var _visible = render._visible;
            if (!_visible) {
                return;
            }
            var nativeRender = render.nativeRender, renderer = render.renderer;
            var _a = this, currentRenderData = _a.currentRenderData, renderData = _a.renderData, i3DRender = _a.i3DRender;
            if (render != this.target && (nativeRender || renderer)) {
                if (!renderData) {
                    this.renderData = render;
                }
                if (i3DRender) {
                    i3DRender.__render_next = render;
                    if (currentRenderData.count > 0) {
                        currentRenderData = this.copyRenderData(currentRenderData);
                    }
                }
                this.i3DRender = render;
                this.i3DRender.__render_next = undefined;
                return;
            }
            render.__batch = this;
            var $graphics = render.$graphics;
            if ($graphics && $graphics.numVertices) {
                render.$batchGeometry = this;
                $graphics.$batchOffset = this.length;
                this.length += $graphics.byte.length;
                var shaderKey = render.shaderKey;
                var factorKey = render.factorKey;
                if (currentRenderData.factorKey.indexOf(factorKey) == -1 || currentRenderData.shaderKey.indexOf(shaderKey) == -1 || currentRenderData.count >= rf.max_vc) {
                    currentRenderData = this.createNewRenderData(render, factorKey);
                }
                if (!currentRenderData.first) {
                    currentRenderData.first = render;
                }
                if (currentRenderData.current) {
                    currentRenderData.current.__graphics_next = render;
                }
                currentRenderData.current = render;
                currentRenderData.current.__graphics_next = undefined;
                render.$vcIndex = currentRenderData.count;
                var sources = this.sources;
                var sourceIndex = sources.indexOf(render.source);
                if (sourceIndex == -1) {
                    sourceIndex = sources.length;
                    sources.push(render.source);
                }
                render.$sourceIndex = sourceIndex;
                render.__batch_render_data = currentRenderData;
                currentRenderData.count++;
                currentRenderData.quad += $graphics.numVertices / 4;
                if (!renderData) {
                    this.renderData = currentRenderData;
                }
                else {
                    if (i3DRender != currentRenderData && !i3DRender.__render_next) {
                        i3DRender.__render_next = currentRenderData;
                    }
                }
                this.i3DRender = currentRenderData;
            }
            var childrens = render.childrens;
            childrens.forData(function (element) {
                _this.filterGeo(element);
                return true;
            }, this);
        };
        SuperBatchRenderer.prototype.toBatch = function () {
            var _a = this, length = _a.length, vertex = _a.vertexBuffer, target = _a.target, renderData = _a.renderData;
            var variables = target.variables;
            var data32PerVertex = variables.data32PerVertex.size;
            var info;
            if (!vertex) {
                info = new rf.VertexInfo(length, data32PerVertex, variables);
                this.vertexBuffer = vertex = rf.context3D.createVertexBuffer(info);
            }
            else {
                info = vertex.data;
                if (info.vertex.length < length) {
                    info = new rf.VertexInfo(length, data32PerVertex, variables);
                    vertex.data = info;
                }
                vertex.numVertices = info.numVertices = length / data32PerVertex;
                vertex.readly = false;
            }
            var vcoffset = variables.uv.offset + 2;
            var vertexData = info.vertex;
            var offset = 0;
            for (; renderData; renderData = renderData.__render_next) {
                var count = renderData.count;
                if (!(renderData instanceof rf.Sprite) && count > 0) {
                    renderData.offset = offset;
                    renderData.triangles = renderData.quad * 2;
                    offset += renderData.triangles;
                    renderData.vcData = new Float32Array(count * 8);
                    var render = renderData.first;
                    for (; render; render = render.__graphics_next) {
                        var g = render.$graphics, v = render.$vcIndex, s = render.$sourceIndex;
                        var bytes = g.byte;
                        for (var i = 0; i < g.numVertices; i++) {
                            bytes[i * data32PerVertex + vcoffset] = v;
                            bytes[i * data32PerVertex + vcoffset + 1] = s;
                        }
                        vertexData.set(bytes, g.$batchOffset);
                        render.updateBatchVCData(false);
                    }
                }
            }
        };
        SuperBatchRenderer.prototype.update = function (position, byte) {
            var vertexBuffer = this.vertexBuffer;
            vertexBuffer.data.vertex.set(byte, position);
            vertexBuffer.readly = false;
        };
        return SuperBatchRenderer;
    }());
    rf.SuperBatchRenderer = SuperBatchRenderer;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PerspectiveMatrix3D = (function (_super) {
        __extends(PerspectiveMatrix3D, _super);
        function PerspectiveMatrix3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PerspectiveMatrix3D.prototype.lookAtLH = function (eye, at, up) {
            var sqrt = Math.sqrt;
            var eyex = eye.x, eyey = eye.y, eyez = eye.z;
            var upx = up.x, upy = up.y, upz = up.z;
            var zX = at.x - eyex;
            var zY = at.y - eyey;
            var zZ = at.z - eyez;
            var len = 1 / sqrt(zX * zX + zY * zY + zZ * zZ);
            zX *= len;
            zY *= len;
            zZ *= len;
            var xX = upy * zZ - upz * zY;
            var xY = upz * zX - upx * zZ;
            var xZ = upx * zY - upy * zX;
            len = 1 / sqrt(xX * xX + xY * xY + xZ * xZ);
            xX *= len;
            xY *= len;
            xZ *= len;
            var yX = zY * xZ - zZ * xY;
            var yY = zZ * xX - zX * xZ;
            var yZ = zX * xY - zY * xX;
            this.set([
                xX, xY, xZ, -(xX * eyex + xY * eyey + xZ * eyez),
                yX, yY, yZ, -(yX * eyex + yY * eyey + yZ * eyez),
                zX, zY, zZ, -(zX * eyex + zY * eyey + zZ * eyez),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.lookAtRH = function (eye, at, up) {
            var sqrt = Math.sqrt;
            var eyex = eye.x, eyey = eye.y, eyez = eye.z;
            var upx = up.x, upy = up.y, upz = up.z;
            var zX = eyex - at.x;
            var zY = eyey - at.y;
            var zZ = eyez - at.z;
            var len = 1 / sqrt(zX * zX + zY * zY + zZ * zZ);
            zX *= len;
            zY *= len;
            zZ *= len;
            var xX = upy * zZ - upz * zY;
            var xY = upz * zX - upx * zZ;
            var xZ = upx * zY - upy * zX;
            len = 1 / sqrt(xX * xX + xY * xY + xZ * xZ);
            xX *= len;
            xY *= len;
            xZ *= len;
            var yX = zY * xZ - zZ * xY;
            var yY = zZ * xX - zX * xZ;
            var yZ = zX * xY - zY * xX;
            this.set([
                xX, xY, xZ, -(xX * eyex + xY * eyey + xZ * eyez),
                yX, yY, yZ, -(yX * eyex + yY * eyey + yZ * eyez),
                zX, zY, zZ, -(zX * eyex + zY * eyey + zZ * eyez),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveOffCenterLH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 * zNear / (right - left), 0.0, (left + right) / (left - right), 0.0,
                0.0, 2.0 * zNear / (top - bottom), (bottom + top) / (bottom - top), 0.0,
                0.0, 0.0, (zFar + zNear) / (zFar - zNear), 2.0 * zFar * zNear / (zNear - zFar),
                0.0, 0.0, 1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveLH = function (width, height, zNear, zFar) {
            this.set([
                2.0 * zNear / width, 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / height, 0.0, 0.0,
                0.0, 0.0, (zFar + zNear) / (zFar - zNear), 2.0 * zFar * zNear / (zNear - zFar),
                0.0, 0.0, 1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveFieldOfViewLH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            this.set([
                xScale, 0.0, 0.0, 0.0,
                0.0, yScale, 0.0, 0.0,
                0.0, 0.0, (zFar + zNear) / (zFar - zNear), 1.0,
                0.0, 0.0, 2.0 * zFar * zNear / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoOffCenterLH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 / (right - left), 0.0, 0.0, (left + right) / (left - right),
                0.0, 2.0 / (top - bottom), 0.0, (bottom + top) / (bottom - top),
                0.0, 0.0, 2 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoLH = function (width, height, zNear, zFar) {
            this.set([
                2.0 / width, 0.0, 0.0, 0.0,
                0.0, 2.0 / height, 0.0, 0.0,
                0.0, 0.0, 2 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveOffCenterRH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 * zNear / (right - left), 0.0, (right + left) / (right - left), 0.0,
                0.0, 2.0 * zNear / (top - bottom), (top + bottom) / (top - bottom), 0.0,
                0.0, 0.0, (zNear + zFar) / (zNear - zFar), 2.0 * zNear * zFar / (zNear - zFar),
                0.0, 0.0, -1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveRH = function (width, height, zNear, zFar) {
            this.set([
                2.0 * zNear / width, 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / height, 0.0, 0.0,
                0.0, 0.0, (zNear + zFar) / (zNear - zFar), 2.0 * zNear * zFar / (zNear - zFar),
                0.0, 0.0, -1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveFieldOfViewRH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            this.set([
                xScale, 0.0, 0.0, 0.0,
                0.0, yScale, 0.0, 0.0,
                0.0, 0.0, (zFar + zNear) / (zNear - zFar), 2.0 * zNear * zFar / (zNear - zFar),
                0.0, 0.0, -1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoOffCenterRH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 / (right - left), 0.0, 0.0, (left + right) / (left - right),
                0.0, 2.0 / (top - bottom), 0.0, (bottom + top) / (bottom - top),
                0.0, 0.0, -2.0 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoRH = function (width, height, zNear, zFar) {
            this.set([
                2.0 / width, 0.0, 0.0, 0.0,
                0.0, 2.0 / height, 0.0, 0.0,
                0.0, 0.0, -2.0 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        return PerspectiveMatrix3D;
    }(Float32Array));
    rf.PerspectiveMatrix3D = PerspectiveMatrix3D;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PassRttTexture = (function (_super) {
        __extends(PassRttTexture, _super);
        function PassRttTexture() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PassRttTexture;
    }(rf.RTTexture));
    rf.PassRttTexture = PassRttTexture;
    rf.pass_temp_pos = { x: -1, y: 1, w: 1, h: -1 };
    rf.pass_temp_uv = { x: 0, y: 0, w: 1, h: 1 };
    rf.pass_temp_transform = rf.newMatrix3D();
    function pass_init_mesh() {
        rf.pass_vertexInfo = new rf.VertexInfo(new Float32Array([
            -1, 1, 0, 0, 1, 1, 1, 0,
            1, -1, 1, 1, -1, -1, 0, 1
        ]), 4, {
            "pos": { size: 2, offset: 0 },
            "uv": { size: 2, offset: 2 }
        });
        rf.pass_vertexBuffer = rf.context3D.createVertexBuffer(rf.pass_vertexInfo);
        rf.pass_temp_transform.m3_scale(1, -1, 1);
    }
    rf.pass_init_mesh = pass_init_mesh;
    function pass_update_mesh(pos, uv) {
        if (!pos) {
            pos = rf.pass_temp_pos;
        }
        if (!uv) {
            uv = rf.pass_temp_uv;
        }
        var vertex = rf.pass_vertexInfo.vertex, data32PerVertex = rf.pass_vertexInfo.data32PerVertex;
        vertex[0] = vertex[data32PerVertex * 3] = pos.x;
        vertex[1] = vertex[data32PerVertex + 1] = pos.y;
        vertex[data32PerVertex] = vertex[data32PerVertex * 2] = pos.w;
        vertex[data32PerVertex * 2 + 1] = vertex[data32PerVertex * 3 + 1] = pos.h;
        vertex[2] = vertex[data32PerVertex * 3 + 2] = uv.x;
        vertex[3] = vertex[data32PerVertex + 3] = uv.y;
        vertex[data32PerVertex + 2] = vertex[data32PerVertex * 2 + 2] = uv.w;
        vertex[data32PerVertex * 2 + 3] = vertex[data32PerVertex * 3 + 3] = uv.h;
        rf.pass_vertexBuffer.uploadFromVector(rf.pass_vertexInfo);
    }
    rf.pass_update_mesh = pass_update_mesh;
    rf.pass_vertex_code = "attribute vec2 pos;\nattribute vec2 uv;\nuniform mat4 mvp;\nvarying vec2 vUV;\nvarying vec2 vPos;\nvoid main(void){\ngl_Position= mvp * vec4(pos,0.0,1.0);\nvPos=pos;\nvUV=uv;\n}\n";
    rf.pass_fragment_code = "precision mediump float;\nuniform sampler2D diff;\nvarying vec2 vUV;\nvarying vec2 vPos;\n{1}\nvoid main(void){\nvec4 color = texture2D(diff, vUV);\n {0}\ngl_FragColor = color;\n}";
    function pass_dc(tex, program, vertex, transfrom, quadcount, index) {
        if (quadcount === void 0) { quadcount = 1; }
        if (!transfrom) {
            transfrom = rf.pass_temp_transform;
        }
        if (!vertex) {
            vertex = rf.pass_vertexBuffer;
        }
        var c = rf.context3D;
        c.setProgram(program);
        c.setProgramConstantsFromMatrix("mvp", transfrom);
        tex.uploadContext(program, "diff");
        vertex.uploadContext(program);
        if (!index) {
            index = c.getIndexByQuad(quadcount);
            c.drawTriangles(index, quadcount * 2);
        }
        else {
            c.drawTriangles(index, index.numIndices);
        }
    }
    rf.pass_dc = pass_dc;
    function pass_normal_render(tex, pos, uv, transfrom) {
        pass_update_mesh(pos, uv);
        var program = rf.context3D.programs["pass_normal"];
        if (!program) {
            var code = "";
            var def = "";
            program = rf.context3D.createProgram(rf.pass_vertex_code, rf.pass_fragment_code.substitute(code, def), "pass_normal");
        }
        rf.context3D.setProgram(program);
        pass_dc(tex, program, rf.pass_vertexBuffer, transfrom);
    }
    rf.pass_normal_render = pass_normal_render;
    function pass_blur_render2(tex, blurX, blurY, pos, uv, transfrom) {
        pass_update_mesh(pos, uv);
        var key = "pass_blur";
        var program = rf.context3D.programs[key];
        if (!program) {
            var code = "\n            color = vec4(0.0);\n            float f = 0.0;\n            float tot = 0.0;\n            for(float i=-10.0;i<10.0;i++){\n                if(texuv.z < abs(i)){\n                    continue;\n                }\n                for(float j = -10.0; j < 10.0; j++)\n                {\n                    if(texuv.w < abs(j)){\n                        continue;\n                    }\n                    f = (1.1 - sqrt(i*i + j*j)/8.0);\n                    f *= f;\n                    tot += f;\n                    color += texture2D( diff, vec2(vUV.x + j * texuv.x, vUV.y + i * texuv.y) ) * f;\n                }\n            }\n            color /= tot;\n        ";
            var def = "uniform vec4 texuv;\n";
            program = rf.context3D.createProgram(rf.pass_vertex_code, rf.pass_fragment_code.substitute(code, def), key);
        }
        rf.context3D.setProgram(program);
        var temp = rf.TEMP_VECTOR3D;
        temp[2] = blurX = 5;
        temp[3] = blurY = 5;
        rf.context3D.setProgramConstantsFromVector("texuv", temp, 4);
        pass_dc(tex, program, rf.pass_vertexBuffer, transfrom);
    }
    rf.pass_blur_render2 = pass_blur_render2;
    function pass_outline_render(tex, pos, uv, transfrom) {
        pass_update_mesh(pos, uv);
        var key = "pass_outline";
        var program = rf.context3D.programs[key];
        if (!program) {
            var code = "\n            vec4 curColor;\n            vec4 outlineColor = vec4(0.0,1.0,0.0,1.0);\n            const float PI2 = 6.283185307179586;\n            float maxAlpha = 0.0;\n            float thickness = 3.0;\n            vec2 displaced;\n            for (float angle = 0.; angle < PI2; angle += 0.5000000 ) {\n                displaced.x = vUV.x + thickness * texuv.x * cos(angle);\n                displaced.y = vUV.y + thickness * texuv.y * sin(angle);\n                curColor = texture2D(diff, displaced);\n                maxAlpha = max(maxAlpha, curColor.a);\n            }\n\n            float resultAlpha = max(maxAlpha, color.w);\n\n            color.xyz = (color.xyz + outlineColor.xyz * (1.0 - color.w)) * resultAlpha;\n            color.w = resultAlpha;\n        ";
            var def = "uniform vec4 texuv;\n";
            program = rf.context3D.createProgram(rf.pass_vertex_code, rf.pass_fragment_code.substitute(code, def), key);
        }
        rf.context3D.setProgram(program);
        var temp = rf.TEMP_VECTOR3D;
        rf.context3D.setProgramConstantsFromVector("texuv", temp, 4);
        pass_dc(tex, program, rf.pass_vertexBuffer, transfrom);
    }
    rf.pass_outline_render = pass_outline_render;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Skeleton = (function (_super) {
        __extends(Skeleton, _super);
        function Skeleton(config, id) {
            var _this = _super.call(this) || this;
            _this.animations = {};
            _this.mediumpCalcA = { pos: rf.newVector3D(), qua: rf.newVector3D(), mat: rf.newMatrix3D(), out: rf.newVector3D() };
            _this.mediumpCalcB = { pos: rf.newVector3D(), qua: rf.newVector3D(), mat: rf.newMatrix3D(), out: rf.newVector3D() };
            _this.tempScale = rf.newVector3D(1, 1, 1, 1);
            _this.preBonematrix = {};
            _this.id = id;
            var _a = _this, boneCount = _a.boneCount, defaultMatrices = _a.defaultMatrices, boneTransform = _a.boneTransform;
            _this.boneCount = boneCount = config.boneCount;
            var buffer = new ArrayBuffer(8 * 4 * boneCount);
            _this.defaultMatrices = defaultMatrices = new Float32Array(buffer);
            _this.boneTransform = boneTransform = {};
            function init(bone, boneTransform) {
                var inv = bone.inv, matrix = bone.matrix, parent = bone.parent, children = bone.children, name = bone.name, index = bone.index;
                if (undefined != inv) {
                    bone.inv = inv = new Float32Array(inv);
                }
                bone.matrix = matrix = new Float32Array(matrix);
                var sceneTransform = new Float32Array(matrix);
                if (parent) {
                    sceneTransform.m3_append(parent.sceneTransform);
                }
                if (index > -1) {
                    index *= 2;
                    var matrice = rf.newMatrix3D();
                    matrice.m3_append(sceneTransform, false, inv);
                    var qua = new Float32Array(buffer, index * 4 * 4, 4);
                    var pos = new Float32Array(buffer, (index + 1) * 4 * 4, 4);
                    matrice.m3_decompose(pos, qua, undefined, 2);
                }
                bone.sceneTransform = sceneTransform.clone();
                boneTransform[bone.name] = sceneTransform.m3_rotation(90, rf.X_AXIS, true);
                children.forEach(function (b) {
                    init(b, boneTransform);
                });
            }
            init(config.root, boneTransform);
            _this.rootBone = config.root;
            _this.vertex = rf.context3D.createVertexBuffer(new rf.VertexInfo(new Float32Array(config.vertex), config.data32PerVertex, rf.vertex_skeleton_variable));
            return _this;
        }
        Skeleton.prototype.initAnimationData = function (anim) {
            anim.skeleton = this;
            anim.matrices = [];
            anim.boneTransform = [];
            anim.boneMatrix3D = [];
            var frames = anim.frames;
            for (var key in frames) {
                frames[key] = new Float32Array(frames[key]);
            }
            this.animations[anim.name] = anim;
        };
        Skeleton.prototype.createAnimation = function () {
            var anim = rf.recyclable(SkeletonAnimation);
            anim.skeleton = this;
            anim.currentBoneTransfrom = this.boneTransform;
            return anim;
        };
        Skeleton.prototype.getMatricesData = function (anim, frame) {
            var result = anim.matrices[frame];
            if (undefined != result) {
                return result;
            }
            var _a = this, boneCount = _a.boneCount, rootBone = _a.rootBone;
            var frames = anim.frames;
            var map = {};
            var buffer = new ArrayBuffer(8 * 4 * boneCount);
            result = new Float32Array(buffer);
            anim.matrices[frame] = result;
            var boneTransform = {};
            anim.boneTransform[frame] = boneTransform;
            var matrice = rf.TEMP_MATRIX3D;
            function update(bone, boneTransform) {
                var inv = bone.inv, matrix = bone.matrix, sceneTransform = bone.sceneTransform, parent = bone.parent, children = bone.children, name = bone.name, index = bone.index;
                var frameData = frames[bone.name];
                if (frameData) {
                    matrix.set(frameData.subarray(frame * 16, (frame + 1) * 16));
                }
                if (parent) {
                    sceneTransform.m3_append(parent.sceneTransform, false, matrix);
                }
                else {
                    sceneTransform.set(matrix);
                }
                if (index > -1) {
                    index *= 2;
                    matrice.m3_append(sceneTransform, false, inv);
                    var qua = new Float32Array(buffer, index * 4 * 4, 4);
                    var pos = new Float32Array(buffer, (index + 1) * 4 * 4, 4);
                    matrice.m3_decompose(pos, qua, undefined, 2);
                }
                boneTransform[name] = sceneTransform.clone().m3_rotation(90, rf.X_AXIS, true);
                map[bone.name] = bone;
                for (var i = 0; i < children.length; i++) {
                    update(children[i], boneTransform);
                }
            }
            update(rootBone, boneTransform);
            return result;
        };
        Skeleton.prototype.loadAnimationComplete = function (e) {
            if (e.type == 4) {
                this.initAnimationData(e.data);
                this.simpleDispatch(e.type, e.data);
            }
        };
        Skeleton.prototype.getMediumpMatricesData = function (anim, frame, n, boneTransform, buffer, bonepq) {
            var animation = anim.animation, preAnimation = anim.preAnimation;
            var rootBone = this.rootBone;
            var frames;
            var nextFrames;
            var nextFrame;
            frames = animation.data.frames;
            var mixtime = 0;
            if (preAnimation.data) {
                mixtime = animation.data.totalFrame * animation.data.duration * 0.3;
                if (mixtime > 350) {
                    mixtime = 350;
                }
                else if (mixtime < 250) {
                    mixtime = Math.min(250, animation.data.totalFrame * animation.data.duration * 0.5);
                }
            }
            if (preAnimation.data && anim.tm.now - preAnimation.stoptime < mixtime) {
                nextFrames = preAnimation.data.frames;
                n = 1 - (anim.tm.now - preAnimation.stoptime) / mixtime;
            }
            else {
                var totalFrame = animation.data.totalFrame;
                if (frame >= totalFrame - 1) {
                    nextFrame = 0;
                }
                else {
                    nextFrame = frame + 1;
                }
                nextFrames = frames;
            }
            this.updateBone(rootBone, frames, frame, nextFrames, nextFrame, n, boneTransform, bonepq);
            this.updateMatrices(rootBone, buffer);
        };
        Skeleton.prototype.mixTransform = function (am, bm, n, bonepq, matrix) {
            var _a = this, tempScale = _a.tempScale, mediumpCalcA = _a.mediumpCalcA, mediumpCalcB = _a.mediumpCalcB;
            var aq = mediumpCalcA.qua, ap = mediumpCalcA.pos;
            var bq = mediumpCalcB.qua, bp = mediumpCalcB.pos;
            var q = bonepq.q, p = bonepq.p;
            am.m3_decompose(ap, aq, undefined, 2);
            bm.m3_decompose(bp, bq, undefined, 2);
            rf.qua_slerp(aq, bq, n, q);
            rf.pos_lerp(ap, bp, n, p);
            if (!matrix) {
                matrix = rf.newMatrix3D();
            }
            matrix.m3_recompose(p, q, tempScale, 2);
            bonepq.p = p;
            bonepq.q = q;
        };
        Skeleton.prototype.updateBone = function (bone, frames, frame, nextframes, nextFrame, n, boneTransform, bonepq) {
            var inv = bone.inv, matrix = bone.matrix, sceneTransform = bone.sceneTransform, parent = bone.parent, children = bone.children, name = bone.name, index = bone.index;
            var _a = this, tempScale = _a.tempScale, mediumpCalcA = _a.mediumpCalcA, mediumpCalcB = _a.mediumpCalcB, preBonematrix = _a.preBonematrix;
            var frameData = frames[bone.name];
            var nextFrameData = nextframes[bone.name];
            if (frameData) {
                if (n == 0) {
                    matrix.set(nextFrameData.subarray(frame * 16, (frame + 1) * 16));
                }
                else {
                    var am = mediumpCalcA.mat, aq = mediumpCalcA.qua, ap = mediumpCalcA.pos, p = mediumpCalcA.out;
                    var bm = mediumpCalcB.mat, bq = mediumpCalcB.qua, bp = mediumpCalcB.pos, q = mediumpCalcB.out;
                    var pq = bonepq[name];
                    if (!pq) {
                        bonepq[name] = pq = { p: rf.newVector3D(), q: rf.newVector3D() };
                    }
                    am.set(frameData.subarray(frame * 16, (frame + 1) * 16));
                    bm = preBonematrix[name];
                    this.mixTransform(am, bm, n, pq, matrix);
                }
                preBonematrix[name] = matrix;
            }
            if (parent) {
                sceneTransform.m3_append(parent.sceneTransform, false, matrix);
            }
            else {
                sceneTransform.set(matrix);
            }
            boneTransform[name] = sceneTransform.clone().m3_rotation(90, rf.X_AXIS, true);
            for (var i = 0; i < children.length; i++) {
                this.updateBone(children[i], frames, frame, nextframes, nextFrame, n, boneTransform, bonepq);
            }
        };
        Skeleton.prototype.updateMatrices = function (bone, buffer) {
            var inv = bone.inv, sceneTransform = bone.sceneTransform, children = bone.children, index = bone.index;
            var matrice = rf.TEMP_MATRIX3D;
            if (index > -1) {
                index *= 2;
                matrice.m3_append(sceneTransform, false, inv);
                var qua = new Float32Array(buffer, index * 4 * 4, 4);
                var pos = new Float32Array(buffer, (index + 1) * 4 * 4, 4);
                matrice.m3_decompose(pos, qua, undefined, 2);
            }
            for (var i = 0; i < children.length; i++) {
                this.updateMatrices(children[i], buffer);
            }
        };
        return Skeleton;
    }(rf.MiniDispatcher));
    rf.Skeleton = Skeleton;
    rf.skeleton_test_n = 0.1;
    var SkeletonAnimation = (function (_super) {
        __extends(SkeletonAnimation, _super);
        function SkeletonAnimation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.animation = { starttime: 0, frame: 0, data: undefined };
            _this.preAnimation = { starttime: 0, frame: 0, data: undefined, stoptime: 0 };
            _this.currentFrame = 0;
            _this.totalFrame = 0;
            _this.lockFrame = -1;
            return _this;
        }
        SkeletonAnimation.prototype.play = function (animationData, tm, mediump) {
            if (mediump === void 0) { mediump = false; }
            var currentFrame = 0;
            this.currentFrame = currentFrame;
            this.preFrame = 0;
            this.mediump = mediump;
            this.tm = tm;
            var animation = this.animation;
            this.totalFrame = animationData.totalFrame;
            if (mediump) {
                var _a = this, preAnimation = _a.preAnimation, currentBonePQ = _a.currentBonePQ;
                if (!currentBonePQ) {
                    this.currentBonePQ = currentBonePQ = {};
                }
                if (animationData != animation.data) {
                    preAnimation.starttime = animation.starttime;
                    preAnimation.data = animation.data;
                    preAnimation.stoptime = tm.now;
                }
                animation.data = animationData;
                animation.starttime = tm.now;
                this.currentBoneTransfrom = {};
                this.matrices = new Float32Array(new ArrayBuffer(8 * 4 * this.skeleton.boneCount));
                this.skeleton.getMediumpMatricesData(this, currentFrame, 0, this.currentBoneTransfrom, this.matrices.buffer, currentBonePQ);
            }
            else {
                this.matrices = this.skeleton.getMatricesData(animationData, currentFrame);
                this.currentBoneTransfrom = animationData.boneTransform[currentFrame];
                animation.data = animationData;
                animation.starttime = tm.now;
            }
            this.simpleDispatch(10, this.currentBoneTransfrom);
        };
        SkeletonAnimation.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            if (this.preUploadTime == now) {
                return;
            }
            this.preUploadTime = now;
            var _a = this, animation = _a.animation, skeleton = _a.skeleton, currentFrame = _a.currentFrame, tm = _a.tm;
            var matrices = this.matrices;
            var data = animation.data, starttime = animation.starttime;
            if (undefined == data) {
                this.matrices = matrices = skeleton.defaultMatrices;
                this.currentBoneTransfrom = skeleton.boneTransform;
            }
            else {
                var duration = (tm.now - starttime) % (data.duration * 1000);
                var eDuration = (data.eDuration * 1000);
                var frame = this.lockFrame;
                if (frame == -1) {
                    frame = Math.floor(duration / eDuration);
                }
                if (this.mediump == false) {
                    if (frame != currentFrame) {
                        currentFrame = frame;
                        this.currentFrame = currentFrame;
                        this.matrices = matrices = skeleton.getMatricesData(data, currentFrame);
                        this.currentBoneTransfrom = data.boneTransform[currentFrame];
                        this.simpleDispatch(10, this.currentBoneTransfrom);
                    }
                }
                else {
                    currentFrame = frame;
                    this.currentFrame = currentFrame;
                    var n = (duration % eDuration) / eDuration;
                    skeleton.getMediumpMatricesData(this, currentFrame, n, this.currentBoneTransfrom, matrices.buffer, this.currentBonePQ);
                    this.simpleDispatch(10, this.currentBoneTransfrom);
                }
                if (currentFrame < this.preFrame || currentFrame >= data.totalFrame - 1) {
                    this.simpleDispatch(5, data);
                }
                this.preFrame = currentFrame;
            }
        };
        return SkeletonAnimation;
    }(rf.MiniDispatcher));
    rf.SkeletonAnimation = SkeletonAnimation;
    var SkeletonFilter = (function (_super) {
        __extends(SkeletonFilter, _super);
        function SkeletonFilter() {
            var _this = _super.call(this, "skeleton_") || this;
            _this.useQua2mat = true;
            _this.vertex = SkeletonFilter.VERTEX;
            return _this;
        }
        SkeletonFilter.VERTEX = {
            def: "\nattribute vec4 index;\nattribute vec4 weight;\nuniform vec4 bones[ 100 ];\n",
            func: "\nmat4 getBoneMatrix( const in float i ) {\n    float d = i * 2.0;\n    vec4 qua = bones[ int(d) ];\n    vec4 pos = bones[ int(d + 1.0) ];\n    return qua2mat(qua, pos);\n}\n",
            code: "\nmat4 skinMatrix = mat4( 0.0 );\nskinMatrix += weight.x * getBoneMatrix( index.x );\nskinMatrix += weight.y * getBoneMatrix( index.y );\nskinMatrix += weight.z * getBoneMatrix( index.z );\nskinMatrix += weight.w * getBoneMatrix( index.w );\nn = vec4( skinMatrix * vec4( n, 0.0 ) ).xyz;\np = skinMatrix * p;\n"
        };
        SkeletonFilter.FRAGMENT = {
            def: "\n",
            code: "\n"
        };
        return SkeletonFilter;
    }(rf.FilterBase));
    rf.SkeletonFilter = SkeletonFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(variables) {
            var _this = _super.call(this, variables ? variables : rf.vertex_mesh_variable) || this;
            _this.invSceneTransform = rf.newMatrix3D();
            _this.nativeRender = true;
            _this.tm = rf.defaultTimeMixer;
            return _this;
        }
        Mesh.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            if (updateStatus & 1) {
                var _a = this, invSceneTransform = _a.invSceneTransform, sceneTransform = _a.sceneTransform;
                invSceneTransform.m3_invert(sceneTransform, true);
            }
            return updateStatus;
        };
        Mesh.prototype.renderShadow = function (sun, p, c, worldTranform, now, interval) {
            var _a = this, geometry = _a.geometry, sceneTransform = _a.sceneTransform, skAnim = _a.skAnim, skData = _a.skData;
            geometry.vertex.uploadContext(p);
            worldTranform.m3_append(sun.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            if (undefined != skAnim) {
                skAnim.uploadContext(sun, this, p, now, interval);
                skData = skAnim;
            }
            if (undefined != skData) {
                skData.skeleton.vertex.uploadContext(p);
                rf.context3D.setProgramConstantsFromVector("bones", skData.matrices, 4, true);
            }
        };
        Mesh.prototype.renderOutLine = function (camera, option) {
            var interval = option.interval, now = option.now;
            var _a = this, geometry = _a.geometry, skAnim = _a.skAnim, _visible = _a._visible, skData = _a.skData, outLineMaterial = _a.outLineMaterial;
            if (!geometry) {
                return;
            }
            var b = outLineMaterial.uploadContext(camera, this, now, interval);
            if (true == b) {
                var c = rf.context3D;
                var program = outLineMaterial.program;
                if (undefined != skAnim) {
                    if (skAnim.preUploadTime != now) {
                        skAnim.uploadContext(camera, this, program, now, interval);
                    }
                }
                if (undefined != skData) {
                    skData.skeleton.vertex.uploadContext(program);
                    rf.context3D.setProgramConstantsFromVector("bones", skData.matrices, 4, true);
                }
                geometry.uploadContext(camera, this, program, now, interval);
                c.drawTriangles(geometry.index, geometry.numTriangles);
            }
        };
        Mesh.prototype.render = function (camera, option) {
            if (!this.scene)
                return;
            if (this.outLineMaterial) {
                this.renderOutLine(camera, option);
            }
            var interval = option.interval, now = option.now;
            var _a = this, geometry = _a.geometry, material = _a.material, skAnim = _a.skAnim, _visible = _a._visible, skData = _a.skData;
            if (undefined != geometry && undefined != material && _visible) {
                var b = material.uploadContext(camera, this, now, interval);
                if (true == b) {
                    var c = rf.context3D;
                    var program = material.program;
                    if (undefined != skAnim) {
                        if (skAnim.preUploadTime != now) {
                            skAnim.uploadContext(camera, this, program, now, interval);
                        }
                    }
                    if (undefined != skData) {
                        skData.skeleton.vertex.uploadContext(program);
                        rf.context3D.setProgramConstantsFromVector("bones", skData.matrices, 4, true);
                    }
                    geometry.uploadContext(camera, this, program, now, interval);
                    var _b = this, shadowTarget = _b.shadowTarget, shadowMatrix = _b.shadowMatrix;
                    if (shadowTarget) {
                        c.setProgramConstantsFromMatrix("sunmvp", shadowMatrix);
                    }
                    c.drawTriangles(geometry.index, geometry.numTriangles);
                }
            }
            _super.prototype.render.call(this, camera, option);
        };
        Mesh.prototype.onRecycle = function () {
            var skAnim = this.skAnim;
            if (skAnim) {
                this.skAnim = null;
            }
            _super.prototype.onRecycle.call(this);
        };
        return Mesh;
    }(rf.SceneObject));
    rf.Mesh = Mesh;
    var KFMMesh = (function (_super) {
        __extends(KFMMesh, _super);
        function KFMMesh(material, variables) {
            var _this = _super.call(this, variables) || this;
            _this.mediump = false;
            _this.material = material;
            _this.defaultAnim = "stand.kf";
            return _this;
        }
        KFMMesh.prototype.load = function (url) {
            this.id = url;
            url += "mesh.km";
            rf.loadRes(rf.RES_PERFIX, url, this.loadCompelte, this, 2);
        };
        KFMMesh.prototype.loadCompelte = function (e) {
            if (e.type == 4) {
                var url = e.currentTarget.url;
                var id = this.id;
                var o = e.data;
                if (url.indexOf(id) != -1) {
                    this.setKFM(o);
                }
            }
        };
        KFMMesh.prototype.setKFM = function (kfm) {
            if (!this.tm) {
                this.tm = rf.defaultTimeMixer;
            }
            if (!kfm.inited) {
                kfm.inited = true;
                if (!kfm.skeletonData) {
                    if ((kfm.skeleton instanceof rf.Skeleton) == false) {
                        kfm.skeletonData = kfm.skeleton;
                        kfm.skeleton = undefined;
                    }
                }
                if (!kfm.skeleton && kfm.skeletonData) {
                    kfm.skeleton = new rf.Skeleton(kfm.skeletonData, this.id);
                }
            }
            var mesh = kfm.mesh, skeleton = kfm.skeleton, materialData = kfm.material, anims = kfm.anims, shadowCast = kfm.shadowCast, sun = kfm.sun;
            var _a = this, material = _a.material, geometry = _a.geometry, defaultAnim = _a.defaultAnim;
            var c = rf.context3D;
            this.kfm = kfm;
            if (!geometry) {
                this.geometry = geometry = new rf.GeometryBase(this.variables);
            }
            geometry.setData(mesh);
            if (!material) {
                this.material = material = materialData ? this.createMaterial() : new rf.ColorMaterial(0xcccccc);
            }
            if (materialData) {
                material.setData(materialData);
                material.diffTex.url = this.id + "diff.png";
            }
            if (skeleton) {
                var skAnim = this.skAnim = skeleton.createAnimation();
                this.skData = skAnim;
                skAnim.on(10, this.skinAnimChangeHandler, this);
                skeleton.on(4, this.animationLoadCompleteHandler, this);
                if (defaultAnim && anims && anims.indexOf(defaultAnim) != -1) {
                    this.playAnim(defaultAnim);
                }
            }
            this.playAnim(defaultAnim);
            if (this.shadowCast) {
                rf.scene.childChange = true;
            }
            this.calHitarea();
            this.simpleDispatch(4);
        };
        KFMMesh.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            var _a = this, skAnim = _a.skAnim, shadowCast = _a.shadowCast;
            if (shadowCast) {
                rf.scene.childChange = true;
            }
        };
        KFMMesh.prototype.calHitarea = function () {
            var _a = this.kfm.mesh, hitarea = _a.hitarea, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, nameLabelY = _a.nameLabelY;
            if (!hitarea) {
                var vd = new Float32Array(vertex);
                var l = Number.MAX_VALUE;
                var t = -Number.MAX_VALUE;
                var r = -Number.MAX_VALUE;
                var b = Number.MAX_VALUE;
                var front = -Number.MAX_VALUE;
                var back = Number.MAX_VALUE;
                var len = vd.length;
                for (var i = 0; i < len; i += data32PerVertex) {
                    var x = vd[i];
                    var y = vd[i + 1];
                    var z = vd[i + 2];
                    if (front < z) {
                        front = z;
                    }
                    else if (back > z) {
                        back = z;
                    }
                    if (l > x) {
                        l = x;
                    }
                    else if (r < x) {
                        r = x;
                    }
                    if (t < y) {
                        t = y;
                    }
                    else if (b > y) {
                        b = y;
                    }
                }
                this.hitArea.clean();
                rf.clone({ left: l, right: r, top: t, bottom: b, front: front, back: back }, this.hitArea);
            }
            else {
                this.hitArea.clean();
                rf.clone(hitarea, this.hitArea);
            }
            this.hitArea.scale(rf.OBJECT2D_SCALE);
            return this.hitArea;
        };
        Object.defineProperty(KFMMesh.prototype, "nameLabelY", {
            get: function () {
                var mesh = this.kfm.mesh;
                return mesh.nameLabelY == undefined ? 2 : mesh.nameLabelY;
            },
            enumerable: true,
            configurable: true
        });
        KFMMesh.prototype.createMaterial = function () {
            return new rf.Material();
        };
        KFMMesh.prototype.playAnim = function (name, refresh) {
            if (refresh === void 0) { refresh = false; }
            var _a = this, skAnim = _a.skAnim, tm = _a.tm, mediump = _a.mediump;
            if (!skAnim) {
                return;
            }
            if (!name) {
                return;
            }
            if (name.lastIndexOf(".kf") == -1) {
                name += ".kf";
            }
            if (this.currentAnim == name && !refresh) {
                return;
            }
            this.currentAnim = name;
            var skeleton = skAnim.skeleton;
            var anim = skeleton.animations[name];
            if (!anim) {
                rf.loadRes(rf.RES_PERFIX, this.id + name, skeleton.loadAnimationComplete, skeleton, 2);
                skeleton.on(4, this.skeletonAnimLoadComplete, this);
            }
            else {
                skAnim.play(anim, tm, mediump);
            }
        };
        KFMMesh.prototype.skeletonAnimLoadComplete = function (e) {
            var _a = this, skAnim = _a.skAnim, currentAnim = _a.currentAnim, mediump = _a.mediump, tm = _a.tm;
            if (!skAnim) {
                return;
            }
            var anim = e.data;
            if (anim.name == currentAnim || currentAnim.indexOf(anim.name) != -1) {
                e.currentTarget.off(e.type, this.skeletonAnimLoadComplete, this);
                skAnim.play(anim, tm, mediump);
            }
        };
        KFMMesh.prototype.animationLoadCompleteHandler = function (e) {
            e.currentTarget.off(e.type, this.animationLoadCompleteHandler, this);
            var anim = e.data;
            if (anim.name == this.currentAnim) {
                this.playAnim(this.currentAnim, true);
            }
        };
        KFMMesh.prototype.onRecycle = function () {
            var skAnim = this.skAnim;
            if (skAnim) {
                skAnim.skeleton.off(4, this.animationLoadCompleteHandler, this);
            }
            this.defaultAnim = undefined;
            this.currentAnim = undefined;
            this.id = undefined;
            this.kfm = undefined;
            _super.prototype.onRecycle.call(this);
        };
        KFMMesh.prototype.bindMesh = function (skeletonName, mesh) {
            var _a = this, boneContainer = _a.boneContainer, skAnim = _a.skAnim;
            if (!boneContainer) {
                this.boneContainer = boneContainer = {};
            }
            var display = boneContainer[skeletonName];
            if (!display) {
                boneContainer[skeletonName] = display = new rf.SceneObject();
                this.addChild(display);
            }
            display.addChild(mesh);
        };
        KFMMesh.prototype.skinAnimChangeHandler = function (event) {
            var boneTrasnform = event.data;
            var boneContainer = this.boneContainer;
            for (var key in boneContainer) {
                var bone = boneTrasnform[key];
                if (bone) {
                    boneContainer[key].setTransform(bone);
                }
            }
        };
        return KFMMesh;
    }(Mesh));
    rf.KFMMesh = KFMMesh;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.particle_Perfix = "particle/";
    rf.particle_Texture_Perfix = "tex/particle/";
    rf.particle_test_now = 0;
    var ParticleGeometry = (function (_super) {
        __extends(ParticleGeometry, _super);
        function ParticleGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleGeometry.prototype.initRuntime = function (data) {
            var nodes = data.nodes, mesh = data.mesh, runtime = data.runtime;
            this.setData(mesh);
            this.initData(runtime);
            if (nodes["p_follow"]) {
                this.followData = new Float32Array(runtime.props.length * 8);
            }
        };
        ParticleGeometry.prototype.updateFollow = function (particle) {
            var followData = this.followData;
            var data = particle.data, followQua = particle.followQua, followPos = particle.followPos, now = particle.now, followSca = particle.followSca;
            var runtime = data.runtime;
            var props = runtime.props;
            now = now * 1000;
            for (var i = 0; i < props.length; i++) {
                var vo = props[i];
                var f = (now - vo.startTime) / vo.totalTime;
                var k = (f - Math.floor(f)) * vo.totalTime;
                if (k < rf.frameInterval * 2) {
                    var temp = i * 8;
                    followData[temp] = followQua[0];
                    followData[temp + 1] = followQua[1];
                    followData[temp + 2] = followQua[2];
                    followData[temp + 3] = followQua[3];
                    followData[temp + 4] = followPos[0] / followSca[0];
                    followData[temp + 5] = followPos[1] / followSca[1];
                    followData[temp + 6] = followPos[2] / followSca[2];
                }
            }
        };
        ParticleGeometry.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var c = rf.context3D;
            var sceneTransform = mesh.sceneTransform, sk_st = mesh.sk_st, tm = mesh.tm, data = mesh.data, followMatrix3D = mesh.followMatrix3D;
            var setting = data.setting, nodes = data.nodes, runtime = data.runtime;
            var vertexBuffer = runtime.vertexBuffer;
            this.vertex.uploadContext(program);
            vertexBuffer.uploadContext(program);
            var worldTranform = rf.TEMP_MATRIX3D;
            var rot = rf.TEMP_VECTOR3D;
            worldTranform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            if (nodes["p_billboard"]) {
                var maxtrix = followMatrix3D ? followMatrix3D : sceneTransform;
                worldTranform.m3_append(camera.sceneTransform, false, maxtrix);
                if (nodes["p_rotation2head"]) {
                    c.setProgramConstantsFromMatrix("mv", worldTranform);
                }
                worldTranform.m3_decompose(undefined, rot, undefined, 1);
                worldTranform.m3_rotation(rot.w, rot, false, rf.rf_m3_identity);
                c.setProgramConstantsFromMatrix("invm", worldTranform);
            }
            var node = nodes["p_segment_color"];
            if (node) {
                var segmentData = node.data;
                if (segmentData instanceof ArrayBuffer) {
                    node.data = segmentData = new Float32Array(segmentData);
                }
                c.setProgramConstantsFromVector("p_segment_color", segmentData, 4);
            }
            node = nodes["p_sprite_sheet_anim"];
            if (node) {
                var data_1 = node.data;
                if (data_1 instanceof ArrayBuffer) {
                    node.data = data_1 = new Float32Array(data_1);
                }
                c.setProgramConstantsFromVector("p_sprite_sheet_anim", data_1, 4);
            }
            if (nodes["p_follow"]) {
                this.updateFollow(mesh);
                c.setProgramConstantsFromVector("followData", this.followData, 4);
            }
            var time = (tm.now - sk_st) / 1000 * setting.speed;
            mesh.now = time;
            c.setProgramConstantsFromVector("now", time, 1, false);
            return worldTranform;
        };
        return ParticleGeometry;
    }(rf.GeometryBase));
    rf.ParticleGeometry = ParticleGeometry;
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sk_st = 0;
            _this.now = 0;
            return _this;
        }
        Particle.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            var followMatrix3D = this.followMatrix3D;
            if (followMatrix3D) {
                if (this.status & 1) {
                    this.updateTransform();
                    updateStatus |= 1;
                }
                var _a = this, scene_3 = _a.scene, transform = _a.transform, sceneTransform = _a.sceneTransform, invSceneTransform = _a.invSceneTransform, followPos = _a.followPos, followQua = _a.followQua, followSca = _a.followSca;
                followMatrix3D.m3_append(parentSceneTransform, false, transform);
                followMatrix3D.m3_decompose(followPos, followQua, followSca, 2);
                sceneTransform.m3_scale(followSca[0], followSca[1], followSca[2], true, scene_3.sceneTransform);
                invSceneTransform.m3_invert(sceneTransform, false);
            }
            else {
                updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            }
            return updateStatus;
        };
        Particle.prototype.load = function (url) {
            if (url.lastIndexOf(".pa") == -1) {
                url += ".pa";
            }
            if (url.indexOf("://") == -1) {
                url = rf.particle_Perfix + url;
            }
            this.url = url;
            rf.loadRes(rf.RES_PERFIX, url, this.loadCompelte, this, 2);
        };
        Particle.prototype.loadCompelte = function (e) {
            if (e.type == 4) {
                this.play(e.data);
            }
            else {
                this.remove();
            }
        };
        Particle.prototype.play = function (data) {
            this.data = data;
            var settingData = data.setting, meshData = data.mesh, materialData = data.material, nodes = data.nodes;
            var _a = this, geometry = _a.geometry, material = _a.material;
            if (!geometry) {
                this.geometry = geometry = new ParticleGeometry();
            }
            geometry.initRuntime(data);
            if (!material) {
                this.material = material = new ParticleMaterial();
            }
            materialData.cull = 0;
            material.setData(materialData);
            var rot = settingData.rot;
            if (rot) {
                if (rot instanceof ArrayBuffer) {
                    settingData.rot = rot = new Float32Array(rot);
                }
                this.setRot(rot[0], rot[1], rot[2]);
            }
            if (nodes["p_follow"]) {
                this.followMatrix3D = rf.newMatrix3D();
                this.followPos = rf.newVector3D();
                this.followQua = rf.newVector3D();
                this.followSca = rf.newVector3D();
            }
            if (undefined == this.sk_st) {
                this.sk_st = rf.defaultTimeMixer.now;
            }
        };
        return Particle;
    }(rf.Mesh));
    rf.Particle = Particle;
    var ParticleMaterial = (function (_super) {
        __extends(ParticleMaterial, _super);
        function ParticleMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleMaterial.prototype.getTextUrl = function (data) {
            return rf.particle_Texture_Perfix + data.url;
        };
        ParticleMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var c = rf.context3D;
            var _a = this, program = _a.program, diffTex = _a.diffTex;
            if (!diffTex) {
                return false;
            }
            var b = this.checkTexs(diffTex);
            if (false == b) {
                return false;
            }
            if (!program) {
                this.program = program = this.createProgram(mesh);
            }
            c.setProgram(program);
            this.uploadContextSetting();
            var t;
            if (undefined != diffTex) {
                t = c.textureObj[diffTex.key];
                t.uploadContext(program, "diff");
            }
            return true;
        };
        ParticleMaterial.prototype.createProgram = function (mesh) {
            var nodes = mesh.data.nodes;
            var key = "";
            for (var k in nodes) {
                var node_1 = nodes[k];
                key += node_1.key + "_";
            }
            var c = rf.context3D;
            var p = c.programs[key];
            if (p) {
                return p;
            }
            var node = nodes["p_time"];
            var vertexDefine = "";
            var vertexFunctions = this.timeNode(node);
            var fragmentDefine = "";
            var fragmentFunctions = "";
            node = nodes["p_velocity"];
            if (node) {
                vertexDefine += "#define VELOCITY\n";
            }
            node = nodes["p_accelerition"];
            if (node) {
                vertexDefine += "#define ACCELERITION\n";
            }
            node = nodes["p_init_rotation"];
            if (node) {
                vertexDefine += "#define ROTATION\n";
            }
            node = nodes["p_vrotation"];
            if (node) {
                vertexDefine += "#define VROTATION\n";
            }
            node = nodes["p_rotation2head"];
            if (node) {
                vertexDefine += "#define ROTATION_HEAD\n";
            }
            node = nodes["p_scale"];
            if (node) {
                vertexFunctions += this.scaleNode(node);
                vertexDefine += "#define SCALE\n";
            }
            node = nodes["p_billboard"];
            if (node) {
                vertexDefine += "#define BILLBOARD\n";
            }
            node = nodes["p_position"];
            if (node) {
                vertexDefine += "#define POSITION\n";
            }
            node = nodes["p_segment_color"];
            if (node) {
                vertexFunctions += this.segmentColorNode(node);
                vertexDefine += "#define SegmentColor\n";
                fragmentDefine += "#define SegmentColor\n";
            }
            node = nodes["p_follow"];
            if (node) {
                vertexFunctions += this.followNode(node);
                vertexDefine += "#define FOLLOW\n";
            }
            node = nodes["p_sprite_sheet_anim"];
            if (node) {
                fragmentFunctions += this.spriteSheetNode(node);
                fragmentDefine += "#define SPRITE_SHEET\n";
            }
            var vertexCode = "\n                " + vertexDefine + "\n\n                precision mediump float;\n\n                attribute vec3 " + "pos" + ";\n                attribute vec2 " + "uv" + ";\n                attribute vec4 " + "p_time" + ";\n                attribute vec3 " + "p_velocity" + ";\n                attribute vec3 " + "p_accelerition" + ";\n                attribute vec4 " + "p_init_rotation" + ";\n                attribute vec4 " + "p_vrotation" + ";\n                attribute vec4 " + "p_scale" + ";\n                attribute vec3 " + "p_position" + ";\n\n                uniform mat4 " + "mvp" + ";\n                uniform mat4 " + "invm" + ";\n                uniform mat4 " + "mv" + ";\n\n                uniform float " + "now" + ";\n                \n\n                varying vec2 vUV;\n                varying vec2 vTime;\n                varying vec4 vSegMul;\n                varying vec4 vSegAdd;\n\n                void quaXpos(in vec4 qua,inout vec3 pos){\n                    vec4 temp = vec4(cross(qua.xyz,pos.xyz) + (qua.w * pos.xyz) , -dot(qua.xyz,pos.xyz));\n                    pos = cross(temp.xyz,-qua.xyz) + (qua.w * temp.xyz) - (temp.w * qua.xyz);\n                }\n\n                " + vertexFunctions + "\n\n                \n\n                void main(void) {\n                    vec3 b_pos = " + "pos" + ";\n                    vec3 p_pos = vec3(0.0);\n                    vec3 b_veo = vec3(0.0);\n                    vec4 temp = vec4(0.0);\n                    \n                    //\u5148\u5904\u7406\u65F6\u95F4  vec2 timeNode(float now,in vec3 pos,in vec4 time)\n                    vec2 time = timeNode(" + "now" + ",b_pos," + "p_time" + ");\n\n#ifdef VELOCITY\n                    //\u5904\u7406\u901F\u5EA6\n                    b_veo += " + "p_velocity" + ";\n                    p_pos += (time.xxx * b_veo);\n#endif\n                    \n                   \n#ifdef ACCELERITION \n                    //\u52A0\u901F\u5EA6\n                    temp = vec4(" + "p_accelerition" + " * time.x,0.0); //at;\n                    b_veo += temp.xyz;                              //vt = v0+a*t;\n                    p_pos += temp.xyz * time.x * 0.5;               //s = v0*t + a*t*t*0.5;\n#endif\n\n#ifdef ROTATION     \n                    //\u521D\u59CB\u5316\u65CB\u8F6C\u89D2\u5EA6\n                    quaXpos(" + "p_init_rotation" + ",b_pos);\n#endif\n\n#ifdef VROTATION    \n                        //\u65CB\u8F6C\u52A8\u753B\n                    temp = " + "p_vrotation" + ";\n                    temp.w *= time.x;\n                    temp.xyz *= sin(temp.w);\n                    temp.w = cos(temp.w);\n                    quaXpos(temp,b_pos);\n#endif\n\n#ifdef ROTATION_HEAD    \n                    // b_veo = vec3(-1.0,0.0,0.0);\n                    //if b_veo.yz is (0,0) ,change it to (0.00001,0);\n                    b_veo.y += step(b_veo.y+b_veo.z,0.0) * 0.00001;\n    #ifdef BILLBOARD\n                    temp = " + "mv" + " * vec4(b_veo,0.0);\n                    temp.xyz = normalize(vec3(temp.xy,0.0));\n                    b_pos =  b_pos * mat3(\n                        temp.x,-temp.y,0.0,\n                        temp.y,temp.x,0.0,\n                        0.0,0.0,1.0);\n    #else\n                    b_veo = normalize(b_veo);\n                    vec3 xAxis = vec3(1.0,0.0,0.0);\n                    temp.w = dot(b_veo,xAxis);\n                    temp.xyz = normalize(cross(xAxis,b_veo));\n\n                    //\u4E24\u500D\u89D2\u516C\u5F0F\u83B7\u5F97 cos sin\n                    //cos2a = cosa^2 - sina^2 = 2cosa^2 - 1 = 1 - 2sina^2;\n                    //cosa = sqt((1 + cos2a)/2);\n                    //sina = sqt((1 - cos2a)/2);\n\n                    temp.xyz *= sqrt( (1.0-temp.w) * 0.5);\n                    temp.w = sqrt((1.0 + temp.w) * 0.5);\n                    quaXpos(temp,b_pos);\n                   \n    #endif\n#endif\n\n#ifdef SCALE\n                    //\u7F29\u653E\n                    scaleNode(" + "p_scale" + ",time,b_pos);\n#endif\n\n#ifdef BILLBOARD\n                    b_pos = (vec4(b_pos,0.0) * " + "invm" + ").xyz;\n#endif\n\n#ifdef POSITION\n                    b_pos += " + "p_position" + ";\n#endif\n\n\n#ifdef FOLLOW\n                    follow(b_pos,p_pos);\n#endif\n\n\n#ifdef SegmentColor\n                    segmentColorNode(time);\n#endif\n\n                    vUV = " + "uv" + ";\n                    vTime = time;\n                    gl_Position = " + "mvp" + " * vec4(b_pos + p_pos,1.0);\n                }\n";
            var fragmentCode = "\n                precision mediump float;\n\n                " + fragmentDefine + "\n\n                " + fragmentFunctions + "\n\n                uniform sampler2D " + "diff" + ";\n\n                varying vec2 vUV;\n                varying vec2 vTime;\n                varying vec4 vSegMul;\n                varying vec4 vSegAdd;\n\n                void main(void){\n                    vec2 tUV = vUV;\n#ifdef SPRITE_SHEET\n                    // segmentColorNode(vTime,tUV);\n                    segmentColorNode(vTime,tUV);\n#endif\n                    vec4 c = texture2D(" + "diff" + ", tUV);\n                    // c = vec4(vTime.y);\n                    // c.w = 1.0;\n#ifdef SegmentColor\n                    c *= vSegMul;\n                    c += vSegAdd;\n#endif\n                    gl_FragColor = c;\n                    // gl_FragColor = vec4(vTime.yyy,1.0);\n                }\n\n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        ParticleMaterial.prototype.timeNode = function (info) {
            var vcode = "\n                vec2 timeNode(float now,inout vec3 pos,in vec4 time){\n                    //time: x:startTime, y:durtion,z:delay+durtion,w:1/durtion;\n                    //o: time, time * 1/durtion;\n\n                    now = now - time.x;\n                    pos *= step(0.0,now);\n                    \n                    vec2 o = vec2(0.0,0.0);\n            ";
            if (info.usesDuration) {
                if (info.usesLooping) {
                    if (info.usesDelay) {
                        vcode += "\n                    o.x = mod(now , time.z);\n                    pos *= step(o.x,time.y);\n                        ";
                    }
                    else {
                        vcode += "\n                    o.x = mod(now , time.y);  \n                        ";
                    }
                }
                else {
                    vcode += "\n                    o.x = now;\n                    pos *= step(now,time.y); \n                    ";
                }
            }
            else {
                vcode += "\n                    o.x = now;\n                    pos *= step(now,time.y); \n                ";
            }
            vcode += "\n                    o.y = o.x * time.w;\n                    return o;\n                }\n            ";
            return vcode;
        };
        ParticleMaterial.prototype.scaleNode = function (info) {
            var vcode = "\n                void scaleNode(in vec4 scale,in vec2 time,inout vec3 pos){\n                    float temp = 0.0;";
            if (info.usesCycle) {
                if (info.usesPhase) {
                    vcode += "\n                    temp += sin(scale.z * time.y + scale.w);";
                }
                else {
                    vcode += "\n                    temp = sin(scale.z * time.y);";
                }
            }
            else {
                vcode += "\n                    temp = time.y;";
            }
            vcode += "\n                    temp = (temp * scale.y) + scale.x;\n            ";
            switch (info.scaleType) {
                case 0:
                    vcode += "\n                    pos.xyz *= temp;";
                    break;
                case 1:
                    vcode += "\n                    pos.x *= temp;";
                    break;
                case 2:
                    vcode += "\n                    pos.y *= temp;";
                    break;
                case 3:
                    vcode += "\n                    pos.z *= temp;";
                    break;
            }
            vcode += "\n                }\n            ";
            return vcode;
        };
        ParticleMaterial.prototype.followNode = function (info) {
            var code = "\n    attribute vec2 " + "p_follow" + ";\n    uniform vec4 followData[60];\n    void follow(inout vec3 pos, in vec3 t_pos){\n        // #ifndef BILLBOARD\n            quaXpos(followData[int(" + "p_follow" + ".x * 2.0)],pos);\n        // #endif\n        pos += followData[int(" + "p_follow" + ".x * 2.0 + 1.0)].xyz;\n    }\n";
            return code;
        };
        ParticleMaterial.prototype.segmentColorNode = function (info) {
            var data = info.data, usesMul = info.usesMul, usesAdd = info.usesAdd, add = info.add, mul = info.mul, len = info.len;
            if (data instanceof ArrayBuffer) {
                info.data = data = new Float32Array(info.data);
            }
            var vcode = "\n                uniform vec4 " + "p_segment_color" + "[" + data.length / 4 + "];\n                void segmentColorNode(in vec2 time){\n                    vec4 life = " + "p_segment_color" + "[0];\n                    vec4 temp = vec4(0.0);";
            if (usesMul) {
                vcode += "\n                    vec4 mul = " + "p_segment_color" + "[" + mul + "];";
            }
            else {
                vcode += "\n                    vec4 mul = vec4(1.0);";
            }
            if (usesAdd) {
                vcode += "\n                    vec4 add = " + "p_segment_color" + "[" + add + "];";
            }
            else {
                vcode += "\n                    vec4 add = vec4(0.0);";
            }
            if (len > 0) {
                vcode += "\n                    temp.x = min(life.x , time.y);";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 2) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 2) + "];";
                }
            }
            if (len > 1) {
                vcode += "\n                    temp.x = min(life.y , max(0.0 , time.y - life.x));";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 3) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 3) + "];";
                }
            }
            if (len > 2) {
                vcode += "\n                    temp.x = min(life.z , max(0.0 , temp.x - life.y));";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 4) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 4) + "];";
                }
            }
            if (len > 3) {
                vcode += "\n                    temp.x = min(life.w , max(0.0 , temp.x - life.z));";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 5) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 5) + "];";
                }
            }
            if (len == 0) {
                vcode += "\n                    temp.y = time.y;";
            }
            else {
                switch (len) {
                    case 1:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.x);";
                        break;
                    case 2:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.y);";
                        break;
                    case 3:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.z);";
                        break;
                    case 4:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.w);";
                        break;
                }
            }
            if (usesMul) {
                vcode += "\n                    mul += temp.y * " + "p_segment_color" + "[" + (mul + 1) + "];";
            }
            if (usesAdd) {
                vcode += "\n                    add += temp.y * " + "p_segment_color" + "[" + (add + 1) + "];";
            }
            vcode += "\n                    vSegMul = mul;\n                    vSegAdd = add;";
            vcode += "\n                }";
            return vcode;
        };
        ParticleMaterial.prototype.spriteSheetNode = function (info) {
            var rows = info.rows, usesCycle = info.usesCycle, usesPhase = info.usesPhase;
            var code = "\n    uniform vec4 " + "p_sprite_sheet_anim" + "[2];\n    void segmentColorNode(in vec2 time,inout vec2 uv){\n        vec4 data = " + "p_sprite_sheet_anim" + "[0];\n        vec4 info = " + "p_sprite_sheet_anim" + "[1];\n        float index = floor(time.y * data.x);\n        uv.x = (uv.x + mod(index, data.y)) * data.z;\n        uv.y = (uv.y + floor(index / data.y)) * data.w;\n    }\n";
            return code;
        };
        return ParticleMaterial;
    }(rf.Material));
    rf.ParticleMaterial = ParticleMaterial;
    var TestPartilce = (function (_super) {
        __extends(TestPartilce, _super);
        function TestPartilce() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestPartilce.prototype.moveTest = function (tweener) {
            var z = this._z;
            if (z > 1) {
                z = -2;
            }
            else {
                z = 2;
            }
            rf.tweenTo({ z: z }, 2000, rf.defaultTimeMixer, this).complete = this.moveTest.bind(this);
        };
        return TestPartilce;
    }(Particle));
    rf.TestPartilce = TestPartilce;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Raycaster = (function () {
        function Raycaster(far, near) {
            if (far === void 0) { far = 10000; }
            if (near === void 0) { near = 0; }
            this.near = 0;
            this.far = 10000;
            this.ray = new rf.Ray();
            this.near = near;
            this.far = far;
        }
        Raycaster.prototype.setFromCamera = function (mousex, mousey, camera) {
            if ((camera && camera.isPerspectiveCamera)) {
                this.ray.origin.set([camera.pos[0], camera.pos[1], camera.pos[2], 1]);
                this.ray.direction.set([mousex, mousey, 0.9999, 1]);
                rf.TEMP_MATRIX3D.m3_invert(camera.len);
                rf.TEMP_MATRIX3D.m3_transformVector(this.ray.direction, this.ray.direction);
                if (this.ray.direction.w != 0) {
                    this.ray.direction.v4_scale(1 / this.ray.direction.w);
                }
                camera.transform.m3_transformVector(this.ray.direction, this.ray.direction);
                this.ray.direction.v3_sub(this.ray.origin, this.ray.direction);
                this.ray.direction.v3_normalize();
            }
            else if ((camera && camera.isOrthographicCamera)) {
                this.ray.origin.set([mousex, mousey, 0.0, 1]);
                camera.worldTranform.m3_transformVector(this.ray.origin, this.ray.origin);
                this.ray.direction.set([0, 0, 1, 1]);
                camera.transform.m3_transformVector(this.ray.direction, this.ray.direction);
            }
            else {
                console.error('Raycaster: Unsupported camera type.');
            }
        };
        Raycaster.prototype.intersectObject = function (object, intersects, recursive) {
            var _this = this;
            if (object.visible === false)
                return;
            if (object.mouseEnabled) {
                object.raycast(this, intersects);
            }
            if (object.mouseChildren && recursive) {
                var childrens = object.childrens;
                childrens.forData(function (child) {
                    if (child instanceof rf.SceneObject) {
                        _this.intersectObject(child, intersects, true);
                    }
                    return true;
                }, this);
            }
        };
        Raycaster.prototype.intersectObjects = function (arr, recursive, intersects) {
            var result = intersects || [];
            for (var i = 0, l = arr.length; i < l; i++) {
                var child = arr[i];
                if (child instanceof rf.SceneObject) {
                    this.intersectObject(child, result, recursive);
                }
            }
            result.sort(Raycaster.disSort);
            return result;
        };
        Raycaster.disSort = function (a, b) {
            return a.distance - b.distance;
        };
        return Raycaster;
    }());
    rf.Raycaster = Raycaster;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.skill_Perfix = "skill/";
    rf.skill_event_define = {};
    function skill_setup() {
        var define = rf.skill_event_define;
        define[4] = rf.PosFilter;
        define[3] = rf.ScaleFilter;
        define[2] = rf.RotFilter;
        define[31] = rf.ColorTransformFilter;
        define[5] = rf.UVAnimFilter;
        define[30] = rf.TexChannelFilter;
    }
    rf.skill_setup = skill_setup;
    var Skill = (function (_super) {
        __extends(Skill, _super);
        function Skill() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sk_st = 0;
            return _this;
        }
        Skill.prototype.load = function (url) {
            if (url.lastIndexOf(".sk") == -1) {
                url += ".sk";
            }
            if (url.indexOf("://") == -1) {
                url = rf.skill_Perfix + url;
            }
            rf.loadRes(rf.RES_PERFIX, url, this.loadCompelte, this, 1);
        };
        Skill.prototype.loadCompelte = function (e) {
            if (e.type == 4) {
                this.play(e.data);
            }
            else {
                this.remove();
            }
        };
        Skill.prototype.play = function (data) {
            if (!this.tm) {
                this.tm = rf.newTimeMixer(this);
            }
            this.data = data;
            this.lines = [];
            for (var i = 0; i < data.lines.length; i++) {
                var element = data.lines[i];
                var line = new SkillLine();
                line.play(element, this);
                this.lines.push(line);
            }
            this.reset();
        };
        Skill.prototype.reset = function () {
            var _a = this, lines = _a.lines, tm = _a.tm;
            if (lines) {
                for (var i = 0; i < lines.length; i++) {
                    lines[i].reset();
                }
                if (tm.target == this) {
                    rf.skillTick.addTick(this.update, this);
                    this.update(0, 0);
                }
            }
        };
        Skill.prototype.update = function (now, interval) {
            var _a = this, lines = _a.lines, tm = _a.tm, follow = _a.follow;
            if (!lines) {
                return;
            }
            if (follow) {
                var _x = follow._x, _y = follow._y, _z = follow._z;
                this.setPos(_x, _y, _z);
            }
            if (tm.target == this) {
                rf.tm_add(tm, interval);
                var close_1 = true;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.closed == false) {
                        line.update(now, interval);
                        close_1 = false;
                    }
                }
                if (close_1) {
                    rf.skillTick.removeTick(this.update, this);
                    this.remove();
                }
            }
            else {
                for (var i = 0; i < lines.length; i++) {
                    lines[i].update(now, interval);
                }
            }
        };
        return Skill;
    }(rf.MapObject));
    rf.Skill = Skill;
    var SkillLine = (function (_super) {
        __extends(SkillLine, _super);
        function SkillLine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loop = 0;
            return _this;
        }
        SkillLine.prototype.play = function (data, skill) {
            var _a = this, runtimes = _a.runtimes, tm = _a.tm;
            this.tm = tm = rf.newTimeMixer(this, -skill.sk_st, skill.tm);
            var creates = data.creates, events = data.events;
            this.skill = skill;
            this.data = data;
            this.loop = data.loop;
            if (!runtimes) {
                this.runtimes = runtimes = [];
            }
            for (var i = 0; i < creates.length; i++) {
                var mesh_1 = void 0;
                var element = creates[i];
                if (element.type == 256) {
                    mesh_1 = new SkillMesh();
                    mesh_1.load(element.url);
                }
                else if (element.type == 257) {
                    mesh_1 = new SkillParticle();
                    mesh_1.load(element.url);
                }
                else if (element.type == 259) {
                    mesh_1 = new SkillSkill();
                    mesh_1.setSceneModel(3);
                    mesh_1.setPos(element.x, element.y, element.z);
                    mesh_1.setRot(element.rx, element.ry, element.rz);
                    mesh_1.load(element.url);
                }
                mesh_1.tm = tm;
                mesh_1.visible = false;
                mesh_1.sk_st = element.time;
                runtimes.push(mesh_1);
                skill.container.addChild(mesh_1);
                this.addEvents(mesh_1, events);
            }
        };
        SkillLine.prototype.addEvents = function (target, events) {
            var filters = target.filters;
            for (var key in events) {
                var element = events[key];
                if (!element)
                    continue;
                var type = element.type;
                var filter = filters[type];
                if (filter) {
                    filter.reset();
                }
                else {
                    var CLS = rf.skill_event_define[type];
                    if (CLS) {
                        filters[type] = filter = new CLS();
                    }
                }
                if (filter) {
                    filter.target = target;
                    filter.setEvent(element);
                }
            }
        };
        SkillLine.prototype.update = function (now, interval) {
            var _a = this, data = _a.data, tm = _a.tm, runtimes = _a.runtimes, loop = _a.loop;
            var events = data.events, duration = data.duration;
            now = tm.now;
            if (now >= duration) {
                if (data.loop > 0 && loop <= 1) {
                    this.closed = true;
                    for (var i = 0; i < runtimes.length; i++) {
                        var target = runtimes[i];
                        target.visible = false;
                    }
                    return true;
                }
                else {
                    if (data.loop > 0) {
                        this.loop--;
                    }
                    tm.now = now = now % duration;
                    this.reset(now);
                }
            }
            for (var i = 0; i < runtimes.length; i++) {
                var target = runtimes[i];
                if (now > target.sk_st) {
                    if (!target._visible) {
                        target.visible = true;
                    }
                    target.update(now, interval);
                    var filters = target.filters;
                    for (var j in events) {
                        var filter = filters[j];
                        if (filter) {
                            filter.update(now, interval);
                        }
                    }
                }
                else {
                    if (target._visible) {
                        target.visible = false;
                    }
                }
            }
            return false;
        };
        SkillLine.prototype.reset = function (now) {
            if (now === void 0) { now = 0; }
            var _a = this, data = _a.data, runtimes = _a.runtimes, tm = _a.tm, skill = _a.skill;
            var events = data.events;
            tm.now = now - skill.sk_st;
            this.closed = false;
            for (var i = 0; i < runtimes.length; i++) {
                var target = runtimes[i];
                var filters = target.filters;
                for (var j in events) {
                    var filter = filters[j];
                    if (filter) {
                        filter.reset();
                    }
                }
            }
        };
        SkillLine.prototype.onRecycle = function () {
            var _a = this, data = _a.data, runtimes = _a.runtimes, tm = _a.tm, skill = _a.skill;
            for (var i = 0; i < runtimes.length; i++) {
                runtimes[i];
            }
        };
        return SkillLine;
    }(rf.MiniDispatcher));
    rf.SkillLine = SkillLine;
    var SkillMesh = (function (_super) {
        __extends(SkillMesh, _super);
        function SkillMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkillMesh;
    }(rf.KFMMesh));
    rf.SkillMesh = SkillMesh;
    var SkillParticle = (function (_super) {
        __extends(SkillParticle, _super);
        function SkillParticle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkillParticle;
    }(rf.Particle));
    rf.SkillParticle = SkillParticle;
    var SkillSkill = (function (_super) {
        __extends(SkillSkill, _super);
        function SkillSkill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkillSkill;
    }(Skill));
    rf.SkillSkill = SkillSkill;
    var TestSkill = (function (_super) {
        __extends(TestSkill, _super);
        function TestSkill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestSkill.prototype.play = function (data) {
        };
        TestSkill.prototype.update = function (now, interval) {
            var _a = this, lines = _a.lines, tm = _a.tm;
            if (!lines) {
                return;
            }
            var close = true;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line.update(now, interval);
            }
        };
        return TestSkill;
    }(Skill));
    rf.TestSkill = TestSkill;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function mesh_cut(mesh) {
        var cut = new CutMesh();
        var geometry = mesh.geometry, skData = mesh.skData, sceneTransform = mesh.sceneTransform, material = mesh.material;
        cut.geometry = geometry;
        if (skData) {
            cut.skData = {};
            cut.skData.skeleton = skData.skeleton;
            cut.skData.matrices = skData.matrices.clone();
        }
        var m = new rf.Material();
        m.setData(undefined);
        m.diffTex = mesh.material.diffTex;
        cut.material = m;
        cut.setTransform(sceneTransform);
        return cut;
    }
    rf.mesh_cut = mesh_cut;
    function mesh_fre_alpha_cut(mesh) {
        var cut = new CutMesh();
        var geometry = mesh.geometry, skData = mesh.skData, sceneTransform = mesh.sceneTransform, material = mesh.material;
        cut.geometry = geometry;
        if (skData) {
            cut.skData = {};
            cut.skData.skeleton = skData.skeleton;
            cut.skData.matrices = skData.matrices.clone();
        }
        var m = new rf.ColorMaterial(0xFFFFFF);
        m.setData(undefined);
        m.sun = false;
        cut.addFilter(new rf.FresnelAlphaFilter(1.0));
        cut.addFilter(new rf.ColorTransformFilter());
        m.diffTex = mesh.material.diffTex;
        cut.material = m;
        cut.setTransform(sceneTransform);
        return cut;
    }
    rf.mesh_fre_alpha_cut = mesh_fre_alpha_cut;
    var CutMesh = (function (_super) {
        __extends(CutMesh, _super);
        function CutMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CutMesh.prototype.render = function (camera, option) {
            _super.prototype.render.call(this, camera, option);
        };
        return CutMesh;
    }(rf.Mesh));
    rf.CutMesh = CutMesh;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SelectMesh = (function (_super) {
        __extends(SelectMesh, _super);
        function SelectMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SelectMesh.create = function (mesh) {
        };
        return SelectMesh;
    }(rf.Mesh));
    rf.SelectMesh = SelectMesh;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var EventFilter = (function (_super) {
        __extends(EventFilter, _super);
        function EventFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.starttime = 0;
            return _this;
        }
        EventFilter.prototype.setEvent = function (event, tick) {
            if (tick === void 0) { tick = false; }
            this.skillEvent = event;
            this.reset();
            this.updatepro(this.pro);
            if (tick) {
                this.starttime = rf.engineNow;
                rf.Engine.addTick(this.update, this);
            }
        };
        EventFilter.prototype.getCurrentEvent = function (now, skillEvent) {
            if (!skillEvent) {
                skillEvent = this.skillEvent;
            }
            if (!skillEvent) {
                return undefined;
            }
            if (now > skillEvent.time) {
                while (skillEvent.next) {
                    if (skillEvent.next.time < now) {
                        skillEvent = skillEvent.next;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                while (skillEvent.pre) {
                    skillEvent = skillEvent.pre;
                    if (skillEvent.time <= now) {
                        break;
                    }
                }
            }
            this.currentEvent = skillEvent;
            return skillEvent;
        };
        EventFilter.prototype.reset = function () {
            var _a = this, skillEvent = _a.skillEvent, pro = _a.pro;
            this.currentEvent = skillEvent;
            this.needUpdate = true;
            for (var key in pro) {
                var v = skillEvent[key];
                if (v != undefined) {
                    pro[key] = v;
                }
            }
        };
        EventFilter.prototype.update = function (now, interval) {
            var _a = this, currentEvent = _a.currentEvent, pro = _a.pro, starttime = _a.starttime;
            now -= starttime;
            currentEvent = this.getCurrentEvent(now, currentEvent);
            var next = currentEvent.next;
            if (next) {
                rf.tween_lerp_pro(currentEvent, currentEvent.next, (now - currentEvent.time) / (next.time - currentEvent.time), pro);
            }
            else {
                this.needUpdate = false;
                for (var key in pro) {
                    var v = currentEvent[key];
                    if (v != undefined) {
                        pro[key] = v;
                    }
                }
                this.end();
            }
            this.updatepro(pro);
        };
        EventFilter.prototype.updatepro = function (pro) { };
        ;
        EventFilter.prototype.end = function () {
            rf.Engine.removeTick(this.update, this);
        };
        ;
        return EventFilter;
    }(rf.FilterBase));
    rf.EventFilter = EventFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var BlueFilter = (function (_super) {
        __extends(BlueFilter, _super);
        function BlueFilter() {
            var _this = _super.call(this, "blur_") || this;
            _this.fragment = BlueFilter.FRAGMENT;
            _this.readly = true;
            _this.blue = rf.newVector3D(1, 1, 2 / 805, 2 / 1080);
            setTimeout(function () {
                rf.tweenTo({ x: 5, y: 5 }, 2000, rf.defaultTimeMixer, _this.blue);
            }, 1000);
            return _this;
        }
        BlueFilter.prototype.setProgramConstants = function (context, program, target) {
            var blue = this.blue;
            rf.context3D.setProgramConstantsFromVector("blue", blue, 4);
        };
        BlueFilter.FRAGMENT = {
            def: "\nuniform vec4 blue;\n",
            code: "\n\n\n\nfloat f = 0.0;\nfloat tot = 0.0;\nfor (float i = -5.0; i <= 5.0; i += 1.0)\n{\n    if(abs(i) > blue.x) continue;\n    for(float j = -5.0; j <= 5.0; j += 1.0)\n    {\n        if(abs(j) > blue.y) continue;\n        f = (1.1 - sqrt( i*i + j*j ) / 8.0);\n        f *= f;\n        tot += f;\n        color += texture2D( diff, vec2(vUV.x + j * blue.z, vUV.y + i * blue.w) ) * f;\n    }\n}\ncolor /= tot;\n"
        };
        return BlueFilter;
    }(rf.EventFilter));
    rf.BlueFilter = BlueFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ColorMatrixFilter = (function (_super) {
        __extends(ColorMatrixFilter, _super);
        function ColorMatrixFilter() {
            var _this = _super.call(this, "HCOLOR_MATRIX_") || this;
            _this.fragment = ColorMatrixFilter.FRAGMENT;
            _this.matrix = new Float32Array(ColorMatrixFilter.IDENTITY);
            _this.pro = { b: 0, c: 0, s: 0, h: 0 };
            _this.tmp = new Float32Array(20);
            _this.colorMatrix = new Float32Array(16);
            _this.colorOffset = new Float32Array(4);
            _this.updatepro(_this.pro);
            return _this;
        }
        ColorMatrixFilter.prototype.updatepro = function (pro) {
            var matrix = this.matrix;
            matrix.set(ColorMatrixFilter.IDENTITY);
            this.AdjustBrightness(pro.b);
            this.AdjustContrast(pro.c);
            this.AdjustSaturation(pro.s);
            this.AdjustHue(pro.h);
            this.UpdateMatrix();
        };
        ColorMatrixFilter.prototype.AdjustBrightness = function (value) {
            this._ConcatValues(0, 1, 0, 0, 0, value);
            this._ConcatValues(1, 0, 1, 0, 0, value);
            this._ConcatValues(2, 0, 0, 1, 0, value);
            this._ConcatValues(3, 0, 0, 0, 1, 0);
        };
        ColorMatrixFilter.prototype.AdjustContrast = function (value) {
            var s = value + 1;
            var o = 128 / 255 * (1 - s);
            this._ConcatValues(0, s, 0, 0, 0, o);
            this._ConcatValues(1, 0, s, 0, 0, o);
            this._ConcatValues(2, 0, 0, s, 0, o);
            this._ConcatValues(3, 0, 0, 0, 1, 0);
        };
        ColorMatrixFilter.prototype.AdjustSaturation = function (sat) {
            sat += 1;
            var LUMA_R = ColorMatrixFilter.LUMA_R, LUMA_G = ColorMatrixFilter.LUMA_G, LUMA_B = ColorMatrixFilter.LUMA_B;
            var invSat = 1 - sat;
            var invLumR = invSat * LUMA_R;
            var invLumG = invSat * LUMA_G;
            var invLumB = invSat * LUMA_B;
            this._ConcatValues(0, (invLumR + sat), invLumG, invLumB, 0, 0);
            this._ConcatValues(1, invLumR, (invLumG + sat), invLumB, 0, 0);
            this._ConcatValues(2, invLumR, invLumG, (invLumB + sat), 0, 0);
            this._ConcatValues(3, 0, 0, 0, 1, 0);
        };
        ColorMatrixFilter.prototype.AdjustHue = function (value) {
            value *= Math.PI;
            var LUMA_R = ColorMatrixFilter.LUMA_R, LUMA_G = ColorMatrixFilter.LUMA_G, LUMA_B = ColorMatrixFilter.LUMA_B;
            var cos = Math.cos(value);
            var sin = Math.sin(value);
            this._ConcatValues(0, ((LUMA_R + (cos * (1 - LUMA_R))) + (sin * -(LUMA_R))), ((LUMA_G + (cos * -(LUMA_G))) + (sin * -(LUMA_G))), ((LUMA_B + (cos * -(LUMA_B))) + (sin * (1 - LUMA_B))), 0, 0);
            this._ConcatValues(1, ((LUMA_R + (cos * -(LUMA_R))) + (sin * 0.143)), ((LUMA_G + (cos * (1 - LUMA_G))) + (sin * 0.14)), ((LUMA_B + (cos * -(LUMA_B))) + (sin * -0.283)), 0, 0);
            this._ConcatValues(2, ((LUMA_R + (cos * -(LUMA_R))) + (sin * -((1 - LUMA_R)))), ((LUMA_G + (cos * -(LUMA_G))) + (sin * LUMA_G)), ((LUMA_B + (cos * (1 - LUMA_B))) + (sin * LUMA_B)), 0, 0);
            this._ConcatValues(3, 0, 0, 0, 1, 0);
        };
        ColorMatrixFilter.prototype._ConcatValues = function (index, f0, f1, f2, f3, f4) {
            var _a = this, matrix = _a.matrix, tmp = _a.tmp;
            var i = index * 5;
            for (var x = 0; x < 5; ++x) {
                tmp[i + x] = f0 * matrix[x] + f1 * matrix[x + 5] + f2 * matrix[x + 10] + f3 * matrix[x + 15] + (x == 4 ? f4 : 0);
            }
            if (index == 3) {
                matrix.set(tmp, 0);
            }
        };
        ColorMatrixFilter.prototype.UpdateMatrix = function () {
            var _a = this, colorMatrix = _a.colorMatrix, colorOffset = _a.colorOffset, matrix = _a.matrix;
            for (var i = 0; i < 4; i++) {
                var oa = i * 4;
                var ob = i * 5;
                for (var j = 0; j < 4; j++) {
                    colorMatrix[oa + j] = matrix[ob + j];
                }
            }
            for (var i = 0; i < 4; i++) {
                colorOffset[i] = matrix[i * 5 + 4];
            }
        };
        ColorMatrixFilter.prototype.setProgramConstants = function (context, program, target) {
            var _a = this, colorMatrix = _a.colorMatrix, colorOffset = _a.colorOffset;
            context.setProgramConstantsFromMatrix("colorMatrix", colorMatrix);
            context.setProgramConstantsFromVector("colorOffset", colorOffset, 4);
        };
        ColorMatrixFilter.FRAGMENT = {
            def: "\nuniform mat4 colorMatrix;\nuniform vec4 colorOffset;\n",
            code: "\nvec4 col2 = color;\ncol2.r = dot(color, colorMatrix[0]) + colorOffset.x;\ncol2.g = dot(color, colorMatrix[1]) + colorOffset.y;\ncol2.b = dot(color, colorMatrix[2]) + colorOffset.z;\ncol2.a = dot(color, colorMatrix[3]) + colorOffset.w;\ncolor = col2;\n"
        };
        ColorMatrixFilter.IDENTITY = new Float32Array([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
        ColorMatrixFilter.LUMA_R = 0.299;
        ColorMatrixFilter.LUMA_G = 0.587;
        ColorMatrixFilter.LUMA_B = 0.114;
        return ColorMatrixFilter;
    }(rf.EventFilter));
    rf.ColorMatrixFilter = ColorMatrixFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ColorTransformFilter = (function (_super) {
        __extends(ColorTransformFilter, _super);
        function ColorTransformFilter() {
            var _this = _super.call(this, 31 + "") || this;
            _this.skey = 31 + "_";
            _this.mul = rf.newVector3D(1, 1, 1, 1);
            _this.add = rf.newVector3D(0, 0, 0, 0);
            _this.pro = { mr: 1, mg: 1, mb: 1, ma: 1, ar: 0, ag: 0, ab: 0, aa: 0 };
            _this.fragment = ColorTransformFilter.FRAGMENT;
            return _this;
        }
        ColorTransformFilter.prototype.updatepro = function (pro) {
            var _a = this, mul = _a.mul, add = _a.add;
            mul[0] = pro.mr;
            mul[1] = pro.mg;
            mul[2] = pro.mb;
            mul[3] = pro.ma;
            add[0] = pro.ar;
            add[1] = pro.ag;
            add[2] = pro.ab;
            add[3] = pro.aa;
        };
        ColorTransformFilter.prototype.setProgramConstants = function (context, program, target) {
            var _a = this, mul = _a.mul, add = _a.add;
            rf.context3D.setProgramConstantsFromVector("color_mul", mul, 4);
            rf.context3D.setProgramConstantsFromVector("color_add", add, 4);
        };
        ColorTransformFilter.prototype.alphaTo = function (from, to, durtion) {
            var event = { ma: 0, time: 0 };
            event.next = { ma: from, time: 100 };
            event.next.next = { ma: to, time: durtion + 100 };
            this.setEvent(event);
            this.starttime = rf.engineNow;
            rf.Engine.addTick(this.update, this);
        };
        ColorTransformFilter.prototype.end = function () {
            rf.Engine.removeTick(this.update, this);
        };
        ColorTransformFilter.FRAGMENT = {
            def: "\nuniform vec4 color_mul;\nuniform vec4 color_add;\n",
            code: "\ncolor  = color * color_mul + color_add;\n"
        };
        return ColorTransformFilter;
    }(rf.EventFilter));
    rf.ColorTransformFilter = ColorTransformFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TexFilter = (function (_super) {
        __extends(TexFilter, _super);
        function TexFilter(target, type) {
            var _this = _super.call(this, type) || this;
            _this.target = target;
            _this.readly = false;
            return _this;
        }
        TexFilter.prototype.setData = function (texData) {
            this.texData = texData;
            var tex = texData.tex, color = texData.color;
            if (tex) {
                this.source = rf.createUrlSource(rf.RES_PERFIX, tex, undefined, this.textureLoadComplete.bind(this));
            }
            else if (!this.color) {
                if (color === undefined) {
                    color = 0xCCCCCC;
                }
                this.color = rf.toRGB(color);
            }
        };
        TexFilter.prototype.textureLoadComplete = function (source) {
            this.readly = true;
            this.target.shader = true;
        };
        return TexFilter;
    }(rf.EventFilter));
    rf.TexFilter = TexFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var DiffFilter = (function (_super) {
        __extends(DiffFilter, _super);
        function DiffFilter() {
            var _this = _super.call(this, "diff_") || this;
            _this.vertex = DiffFilter.VERTEX;
            _this.fragment = DiffFilter.FRAGMENT;
            _this.readly = true;
            return _this;
        }
        DiffFilter.VERTEX = {
            def: "\nattribute vec2 uv;\nvarying vec2 vUV;\n",
            code: "\nvUV = uv;\n"
        };
        DiffFilter.FRAGMENT = {
            def: "\nuniform sampler2D diff;\nvarying vec2 vUV;\n",
            code: "\nvec4 color = texture2D(diff, vUV);\n"
        };
        return DiffFilter;
    }(rf.FilterBase));
    rf.DiffFilter = DiffFilter;
    var UIDiffFilter = (function (_super) {
        __extends(UIDiffFilter, _super);
        function UIDiffFilter() {
            var _this = _super.call(this, "uidiff_") || this;
            _this.vertex = UIDiffFilter.VERTEX;
            _this.fragment = UIDiffFilter.FRAGMENT;
            _this.readly = true;
            return _this;
        }
        UIDiffFilter.VERTEX = {
            def: "\nattribute vec4 uv;\n// attribute highp vec4 uv;\nvarying vec3 vUV;\n",
            code: "\nvUV = uv.xyw;\n"
        };
        UIDiffFilter.FRAGMENT = {
            def: "\n    uniform sampler2D diff;\n    uniform sampler2D diff1;\n    uniform sampler2D diff2;\n    uniform sampler2D diff3;\n    uniform sampler2D diff4;\n    uniform sampler2D diff5;\n    uniform sampler2D diff6;\n    uniform sampler2D diff7;\n    varying vec3 vUV;\n    ",
            code: "\n    vec4 color;\n    if(vUV.z < 0.5){\n        color = texture2D(diff, vUV.xy);\n    }else if(vUV.z < 1.5){\n        color = texture2D(diff1, vUV.xy);\n    }else if(vUV.z < 2.5){\n        color = texture2D(diff2, vUV.xy);\n    }else if(vUV.z < 3.5){\n        color = texture2D(diff3, vUV.xy);\n    }else if(vUV.z < 4.5){\n        color = texture2D(diff4, vUV.xy);\n    }else if(vUV.z < 5.5){\n        color = texture2D(diff5, vUV.xy);\n    }else if(vUV.z < 6.5){\n        color = texture2D(diff6, vUV.xy);\n    }else if(vUV.z < 7.5){\n        color = texture2D(diff7, vUV.xy);\n    }\n\n    if(color.w <= 0.1) {\n        discard;\n    }\n    color.w = (color.w - 0.1) / 0.9;\n    \n    "
        };
        return UIDiffFilter;
    }(rf.FilterBase));
    rf.UIDiffFilter = UIDiffFilter;
    var FillFilter = (function (_super) {
        __extends(FillFilter, _super);
        function FillFilter(color, alpha) {
            var _this = _super.call(this, "fill_") || this;
            _this.fragment = FillFilter.FRAGMENT;
            _this.setData(color, alpha);
            return _this;
        }
        FillFilter.prototype.setData = function (color, alpha) {
            this.color = rf.toRGBA(color, this.color);
            this.color[3] = alpha;
        };
        FillFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("diffcolor", this.color, 4);
        };
        FillFilter.FRAGMENT = {
            def: "\nuniform vec4 diffcolor;\n",
            code: "\nvec4 color = diffcolor;\n"
        };
        return FillFilter;
    }(rf.FilterBase));
    rf.FillFilter = FillFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FresnelFilter = (function (_super) {
        __extends(FresnelFilter, _super);
        function FresnelFilter(type) {
            var _this = _super.call(this, type ? type : "fresnel_") || this;
            _this.vertex = FresnelFilter.VERTEX;
            _this.fragment = FresnelFilter.FRAGMENT;
            _this.eye = rf.newVector3D(0, 0, 0, 0);
            _this.useInvm = true;
            _this.pro = { fre: 0 };
            return _this;
        }
        FresnelFilter.prototype.updatepro = function (pro) {
            this.eye[3] = pro.fre;
        };
        FresnelFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var eye = this.eye;
            var pos = camera.pos;
            eye.v3_normalize(pos);
            context.setProgramConstantsFromVector("fresnel", eye, 4);
        };
        FresnelFilter.prototype.tweenTo = function (from, to, durtion) {
            var event = { fre: from, time: 0 };
            event.next = { fre: to, time: durtion };
            this.setEvent(event);
            this.starttime = rf.engineNow;
            rf.Engine.addTick(this.update, this);
        };
        FresnelFilter.prototype.end = function () {
            rf.Engine.removeTick(this.update, this);
        };
        FresnelFilter.VERTEX = {
            def: "\nuniform vec4 fresnel;\nvarying vec2 vFresnel;\n",
            code: "\nvFresnel  =  vec2(pow(1.0 - dotValue(n,fresnel,invm),2.0),fresnel.w);\n",
        };
        FresnelFilter.FRAGMENT = {
            def: "\nvarying vec2 vFresnel;\n",
            code: "\ncolor.xyz *= (vFresnel.x * vFresnel.y +1.0) * color.w;\n// color.w = vFresnel;\n",
        };
        return FresnelFilter;
    }(rf.EventFilter));
    rf.FresnelFilter = FresnelFilter;
    var FresnelAlphaFilter = (function (_super) {
        __extends(FresnelAlphaFilter, _super);
        function FresnelAlphaFilter(value) {
            var _this = _super.call(this, "fresnelAlpha_") || this;
            _this.vertex = FresnelAlphaFilter.VERTEX;
            _this.fragment = FresnelAlphaFilter.FRAGMENT;
            _this.eye[3] = value;
            return _this;
        }
        FresnelAlphaFilter.VERTEX = {
            def: "\nuniform vec4 fresnel;\nvarying vec2 vFresnel;\n",
            code: "\nvFresnel  =  vec2(pow(1.0 - dotValue(n,fresnel,invm),fresnel.w),fresnel.w);\n",
        };
        FresnelAlphaFilter.FRAGMENT = {
            def: "\n// uniform vec4 fresnel_color;\nvarying vec2 vFresnel;\n",
            code: "\ncolor.xyz *= (vFresnel.x + 1.0);\n//  * fresnel_color.xyz;\ncolor.w *= vFresnel.x;\n",
        };
        return FresnelAlphaFilter;
    }(FresnelFilter));
    rf.FresnelAlphaFilter = FresnelAlphaFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var GlowFilter = (function (_super) {
        __extends(GlowFilter, _super);
        function GlowFilter() {
            var _this = _super.call(this, "glow_") || this;
            _this.fragment = GlowFilter.FRAGMENT;
            _this.readly = true;
            _this.blur = rf.newVector3D(6, 6, 2 / 805, 2 / 1080);
            _this.color = rf.newVector3D(0.0, 1.0, 0, 0.5);
            _this.strength = rf.newVector3D(3.0, 0.0, 1.0, 0.0);
            _this.dist = rf.newVector3D(0.0, 0.0, 0.0, 0.0);
            return _this;
        }
        GlowFilter.prototype.setPropety = function (color, alpha, blurX, blurY, strength, inner, knockout) {
            if (color === void 0) { color = 0xFF0000; }
            if (alpha === void 0) { alpha = 1.0; }
            if (blurX === void 0) { blurX = 6.0; }
            if (blurY === void 0) { blurY = 6.0; }
            if (strength === void 0) { strength = 2; }
            if (inner === void 0) { inner = false; }
            if (knockout === void 0) { knockout = false; }
            var _a = this, blur = _a.blur, c = _a.color, s = _a.strength, dist = _a.dist;
            rf.toRGB(color, c);
            c[3] = alpha;
            blur[0] = blurX;
            blur[1] = blurY;
            s[0] = strength;
            s[1] = inner ? 1 : 0;
            s[2] = knockout ? 0 : 1;
        };
        GlowFilter.prototype.setProgramConstants = function (context, program, target) {
            var _a = this, blur = _a.blur, color = _a.color, strength = _a.strength, dist = _a.dist;
            rf.context3D.setProgramConstantsFromVector("g_blur", blur, 4);
            rf.context3D.setProgramConstantsFromVector("g_color", color, 4);
            rf.context3D.setProgramConstantsFromVector("g_strength", strength, 4);
            rf.context3D.setProgramConstantsFromVector("g_dist", dist, 4);
        };
        GlowFilter.FRAGMENT = {
            def: "\nuniform vec4 g_blur;\nuniform vec4 g_color;\nuniform vec4 g_strength;\nuniform vec4 g_dist;\n",
            func: "\nfloat random(vec2 scale)\n{\n    return fract(sin(dot(gl_FragCoord.xy, scale)) * 43758.5453);\n}\n",
            code: "\nfloat dist = g_dist.x;\nfloat angle = g_dist.y;\nfloat alpha = g_color.w;\nfloat blurX = g_blur.x;\nfloat blurY = g_blur.y;\nfloat strength = g_strength.x;\nfloat inner = g_strength.y;\nfloat knockout = g_strength.z;\nfloat hideObject = g_strength.w;\nconst float linearSamplingTimes = 7.0;\nconst float circleSamplingTimes = 12.0;\nvec4 ownColor = color;\nvec4 curColor;\nfloat totalAlpha = 0.0;\nfloat maxTotalAlpha = 0.0;\nfloat curDistanceX = 0.0;\nfloat curDistanceY = 0.0;\nfloat offsetX = dist * cos(angle) * g_blur.z;\nfloat offsetY = dist * sin(angle) * g_blur.w;\n\n\n\n\nconst float PI = 3.14159265358979323846264;\nfloat cosAngle;\nfloat sinAngle;\nfloat offset = PI * 2.0 / circleSamplingTimes * random(vec2(12.9898, 78.233));\nfloat stepX = blurX * g_blur.z / linearSamplingTimes;\nfloat stepY = blurY * g_blur.w / linearSamplingTimes;\nfor (float a = 0.0; a <= PI * 2.0; a += PI * 2.0 / circleSamplingTimes) {\n    cosAngle = cos(a + offset);\n    sinAngle = sin(a + offset);\n    for (float i = 1.0; i <= linearSamplingTimes; i++) {\n        curDistanceX = i * stepX * cosAngle;\n        curDistanceY = i * stepY * sinAngle;\n        if (vUV.x + curDistanceX - offsetX >= 0.0 && vUV.y + curDistanceY + offsetY <= 1.0){\n            curColor = texture2D(diff, vec2(vUV.x + curDistanceX - offsetX, vUV.y + curDistanceY + offsetY));\n            totalAlpha += (linearSamplingTimes - i) * curColor.a;\n        }\n        maxTotalAlpha += (linearSamplingTimes - i);\n    }\n}\nownColor.a = max(ownColor.a, 0.0001);\nownColor.rgb = ownColor.rgb / ownColor.a;\n\nfloat outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * max(min(hideObject, knockout), 1. - ownColor.a);\nfloat innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * ownColor.a;\n\nownColor.a = max(ownColor.a * knockout * (1. - hideObject), 0.0001);\nvec3 mix1 = mix(ownColor.rgb, g_color.rgb, innerGlowAlpha / (innerGlowAlpha + ownColor.a));\nvec3 mix2 = mix(mix1, g_color.rgb, outerGlowAlpha / (innerGlowAlpha + ownColor.a + outerGlowAlpha));\nfloat resultAlpha = min(ownColor.a + outerGlowAlpha + innerGlowAlpha, 1.);\ncolor = vec4(mix2 * resultAlpha, resultAlpha);\n\n"
        };
        return GlowFilter;
    }(rf.EventFilter));
    rf.GlowFilter = GlowFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var LiuguangFilter = (function (_super) {
        __extends(LiuguangFilter, _super);
        function LiuguangFilter(target, data) {
            var _this = _super.call(this, target, "liuguang_") || this;
            _this.v = rf.newVector3D();
            _this.setData(data);
            return _this;
        }
        LiuguangFilter.prototype.setData = function (setting) {
            _super.prototype.setData.call(this, setting);
            var v = this.v;
            var speed = setting.speed, scale = setting.scale, alpha = setting.alpha;
            this.speed = speed === undefined ? 0 : speed;
            v[1] = scale === undefined ? 1 : scale;
            v[2] = alpha === undefined ? 0.95 : alpha;
            v[3] = 1 / (1 - v[2]);
        };
        LiuguangFilter.prototype.textureLoadComplete = function (source) {
            this.readly = true;
            this.target.shader = true;
            var g = rf.gl;
            this.source.textureData = rf.context3D.getTextureData(name, false, g.NEAREST, g.NEAREST, g.REPEAT);
        };
        LiuguangFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var _a = this, v = _a.v, source = _a.source, speed = _a.speed;
            source.uploadContext(program, "liuguangTex");
            v[0] = speed * rf.engineNow / 1000;
            context.setProgramConstantsFromVector("liuguang", v, 4);
        };
        return LiuguangFilter;
    }(rf.TexFilter));
    rf.LiuguangFilter = LiuguangFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PosFilter = (function (_super) {
        __extends(PosFilter, _super);
        function PosFilter() {
            var _this = _super.call(this, 4 + "") || this;
            _this.skey = "";
            _this.pro = { x: 0, y: 0, z: 0 };
            return _this;
        }
        PosFilter.prototype.updatepro = function (pro) {
            this.target.setPos(pro.x, pro.y, pro.z);
        };
        return PosFilter;
    }(rf.EventFilter));
    rf.PosFilter = PosFilter;
    var ScaleFilter = (function (_super) {
        __extends(ScaleFilter, _super);
        function ScaleFilter() {
            var _this = _super.call(this, 3 + "") || this;
            _this.skey = "";
            _this.pro = { x: 1, y: 1, z: 1 };
            return _this;
        }
        ScaleFilter.prototype.updatepro = function (pro) {
            this.target.setSca(pro.x, pro.y, pro.z);
        };
        return ScaleFilter;
    }(rf.EventFilter));
    rf.ScaleFilter = ScaleFilter;
    var RotFilter = (function (_super) {
        __extends(RotFilter, _super);
        function RotFilter() {
            var _this = _super.call(this, 2 + "") || this;
            _this.skey = "";
            _this.pro = { x: 0, y: 0, z: 0 };
            return _this;
        }
        RotFilter.prototype.updatepro = function (pro) {
            this.target.setRot(pro.x, pro.y, pro.z);
        };
        return RotFilter;
    }(rf.EventFilter));
    rf.RotFilter = RotFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ShadowFilter = (function (_super) {
        __extends(ShadowFilter, _super);
        function ShadowFilter(target) {
            var _this = this;
            target.shadowTarget = true;
            _this = _super.call(this, target, "shadow_") || this;
            _this.v = rf.newVector3D();
            var func = "";
            var def = "uniform mat4 sunmvp;\nvarying vec4 vShadowUV;\n";
            var code = "vShadowUV = sunmvp * p;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            _this.readly = true;
            func =
                "\nfloat unpackRGBAToDepth( const in vec4 v ) {\n    return dot( v, UnpackFactors );\n}\n            \nfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n    return step( unpackRGBAToDepth( texture2D( depths, uv ) ) , compare );\n}\n";
            def =
                "\nuniform sampler2D shadow;\nvarying vec4 vShadowUV;\nconst float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n";
            code =
                "\nvec3 sc = vShadowUV.xyz / vShadowUV.w;\nsc.xyz = sc.xyz * 0.5 + 0.5;\nfloat shadowValue = texture2DCompare(shadow, sc.xy,sc.z+0.001);\ncolor.xyz *= vec3(1.0 - shadowValue * 0.3);\n// color = texture2D( shadow , vShadowUV.xy );\n// color = vec4(vShadowUV.xyz,1.0);\n";
            _this.fragment = rf.newShaderCode(code, def, func);
            return _this;
        }
        ShadowFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            if (rf.ROOT.shadow.rtt) {
                rf.ROOT.shadow.rtt.uploadContext(program, "shadow");
                context.setProgramConstantsFromMatrix("sunmvp", this.target.shadowMatrix);
            }
        };
        return ShadowFilter;
    }(rf.TexFilter));
    rf.ShadowFilter = ShadowFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SunFilter = (function (_super) {
        __extends(SunFilter, _super);
        function SunFilter() {
            var _this = _super.call(this, "sun_") || this;
            _this.vertex = SunFilter.VERTEX;
            _this.fragment = SunFilter.FROGMENT;
            _this.useInvm = true;
            return _this;
        }
        SunFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var s;
            if (target) {
                s = target.scene;
            }
            else {
                s = rf.scene;
            }
            context.setProgramConstantsFromVector("lightDirection", s.sun.normalsize, 4);
        };
        SunFilter.VERTEX = {
            def: "\nuniform vec4 lightDirection;\nvarying float vDiffuse;\n",
            code: "\nvDiffuse =  clamp(dotValue(n,lightDirection,invm),0.1,1.0);\n",
        };
        SunFilter.FROGMENT = {
            def: "\nvarying float vDiffuse;\n",
            code: "\ncolor.xyz *= (vDiffuse * 0.6 + 1.0);\n",
        };
        return SunFilter;
    }(rf.FilterBase));
    rf.SunFilter = SunFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TexChannelFilter = (function (_super) {
        __extends(TexChannelFilter, _super);
        function TexChannelFilter() {
            var _this = _super.call(this, undefined, 30 + "") || this;
            _this.skey = 30 + "_";
            _this.pro = { ou: 0, ov: 0, su: 1, sv: 1 };
            _this.uv = rf.newVector3D();
            _this.vertex = TexChannelFilter.VERTEX;
            _this.fragment = TexChannelFilter.FRAGMENT;
            return _this;
        }
        TexChannelFilter.prototype.setEvent = function (event, tick) {
            if (tick === void 0) { tick = false; }
            _super.prototype.setEvent.call(this, event, tick);
            rf.createUrlSource(rf.RES_PERFIX, event.url, undefined, this.textureLoadComplete.bind(this));
        };
        TexChannelFilter.prototype.updatepro = function (pro) {
            var uv = this.uv;
            uv[0] = pro.ou;
            uv[1] = pro.ov;
            uv[2] = pro.su;
            uv[3] = pro.sv;
        };
        TexChannelFilter.prototype.textureLoadComplete = function (source) {
            _super.prototype.textureLoadComplete.call(this, source);
            this.source = source;
            source.textureData = rf.context3D.getTextureData(this.source.name, false, 9728, 9728, this.skillEvent.repart);
        };
        TexChannelFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("texChannelData", this.uv, 4);
            this.source.uploadContext(program, "texChannel");
        };
        TexChannelFilter.VERTEX = {
            def: "\nuniform vec4 texChannelData;\nvarying vec2 vTexUV;\n",
            code: "\nvTexUV = (uv.xy - 0.5) * texChannelData.zw + texChannelData.xy + 0.5;\n"
        };
        TexChannelFilter.FRAGMENT = {
            def: "\nuniform sampler2D texChannel;\nvarying vec2 vTexUV;\n",
            code: "\ncolor.w *= texture2D(texChannel, vTexUV).w;\n"
        };
        return TexChannelFilter;
    }(rf.TexFilter));
    rf.TexChannelFilter = TexChannelFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var UVAnimFilter = (function (_super) {
        __extends(UVAnimFilter, _super);
        function UVAnimFilter() {
            var _this = _super.call(this, 5 + "") || this;
            _this.skey = 5 + "_";
            _this.uv = rf.newVector3D();
            _this.pro = { ou: 0, ov: 0, su: 1, sv: 1 };
            _this.vertex = UVAnimFilter.VERTEX;
            return _this;
        }
        UVAnimFilter.prototype.updatepro = function (pro) {
            var uv = this.uv;
            uv[0] = pro.ou;
            uv[1] = pro.ov;
            uv[2] = pro.su;
            uv[3] = pro.sv;
        };
        UVAnimFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var uv = this.uv;
            context.setProgramConstantsFromVector("uvAnim", uv, 4);
        };
        UVAnimFilter.VERTEX = {
            def: "\nuniform vec4 uvAnim;\n",
            code: "\nvUV = (vUV.xy - vec2(0.5)) * uvAnim.zw + uvAnim.xy + vec2(0.5);\n"
        };
        return UVAnimFilter;
    }(rf.EventFilter));
    rf.UVAnimFilter = UVAnimFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var BaseMaterial = (function (_super) {
        __extends(BaseMaterial, _super);
        function BaseMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BaseMaterial;
    }(rf.Material));
    rf.BaseMaterial = BaseMaterial;
    var ColorMaterial = (function (_super) {
        __extends(ColorMaterial, _super);
        function ColorMaterial(color, alpha) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1.0; }
            var _this = _super.call(this) || this;
            _this.color = color;
            _this.alpha = alpha;
            _this.setData(undefined);
            return _this;
        }
        ColorMaterial.prototype.setColor = function (color, alpha) {
            this.color = color;
            this.alpha = alpha;
            this.change = true;
        };
        ColorMaterial.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
            this.cull = 1028;
        };
        ColorMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            return _super.prototype.uploadContext.call(this, camera, mesh, now, interval);
        };
        ColorMaterial.prototype.initFilters = function (mesh) {
            _super.prototype.initFilters.call(this, mesh);
            var filters = mesh.filters;
            var _a = this, color = _a.color, alpha = _a.alpha;
            delete filters["diff_"];
            delete filters["discard_"];
            var fileter = filters["fill_"];
            if (!fileter) {
                filters["fill_"] = new rf.FillFilter(color, alpha);
            }
            else {
                fileter.setData(color, alpha);
            }
        };
        return ColorMaterial;
    }(rf.Material));
    rf.ColorMaterial = ColorMaterial;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var OutLineFilter = (function (_super) {
        __extends(OutLineFilter, _super);
        function OutLineFilter() {
            var _this = _super.call(this, "outline_") || this;
            _this.vertex = OutLineFilter.VERTEX;
            return _this;
        }
        OutLineFilter.prototype.setData = function (v) {
            this.alpha = v;
        };
        OutLineFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("originFar", [1 / camera.originFar, this.alpha], 2, true);
        };
        OutLineFilter.VERTEX = {
            def: "\n    uniform vec2 originFar;\n",
            code: "\n    float t2 = p.z * originFar[0];\n    p.xyz += n.xyz * t2 * originFar[1];\n"
        };
        return OutLineFilter;
    }(rf.FilterBase));
    rf.OutLineFilter = OutLineFilter;
    var OutLineMaterial = (function (_super) {
        __extends(OutLineMaterial, _super);
        function OutLineMaterial(color, alpha, skeleton) {
            if (skeleton === void 0) { skeleton = true; }
            var _this = _super.call(this) || this;
            var filters = {};
            _this.filters = filters;
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["normal_"] = rf.singleton(rf.NormalFilter);
            if (skeleton) {
                filters["skeleton_"] = rf.singleton(rf.SkeletonFilter);
            }
            filters["mv_"] = rf.singleton(rf.MvFilter);
            filters["outline_"] = rf.singleton(OutLineFilter);
            filters["p_"] = rf.singleton(rf.MpFilter);
            filters["fill_"] = new rf.FillFilter(color, alpha);
            _this.setColor(color, alpha);
            _this.setData(undefined);
            _this.cull = 1029;
            return _this;
        }
        OutLineMaterial.prototype.setColor = function (color, alpha) {
            var filters = this.filters;
            var filter = filters["fill_"];
            filter.setData(color, alpha);
            var filter2 = filters["outline_"];
            filter2.setData(alpha);
        };
        OutLineMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var _a = this, program = _a.program, filters = _a.filters;
            if (!program) {
                this.program = program = rf.singleton(rf.Shader).createProgram(this);
            }
            var c = rf.context3D;
            c.setProgram(program);
            this.uploadContextSetting();
            for (var key in filters) {
                var filter = filters[key];
                filter.setProgramConstants(c, program, mesh, camera);
            }
            return true;
        };
        return OutLineMaterial;
    }(rf.BaseMaterial));
    rf.OutLineMaterial = OutLineMaterial;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var StandardMaterial = (function (_super) {
        __extends(StandardMaterial, _super);
        function StandardMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StandardMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            return false;
        };
        StandardMaterial.prototype.createProgram = function (mesh) {
            var p;
            var c = rf.context3D;
            var vertexCode;
            var fragmentCode;
            var key;
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return StandardMaterial;
    }(rf.Material));
    rf.StandardMaterial = StandardMaterial;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function loadImage(perfix, url) {
        return __awaiter(this, void 0, void 0, function () {
            var vo;
            var _this = this;
            return __generator(this, function (_a) {
                vo = rf.componentSource.getSourceVO(url, 1);
                return [2, new Promise(function (resolve, reject) {
                        function onComplete() {
                            resolve(vo);
                        }
                        function loadImageComplete(e) {
                            if (e.type == 4) {
                                var img = e.data;
                                vo = rf.componentSource.getSourceVO(url, 1);
                                if (!vo) {
                                    vo = rf.componentSource.setSourceVO(url, img.width, img.height, 1);
                                }
                                rf.componentSource.drawimg(img, vo.x, vo.y, img.width, img.height);
                            }
                            onComplete();
                        }
                        if (!vo) {
                            rf.loadRes(perfix, url, loadImageComplete, _this, 5);
                        }
                        else {
                            rf.callLater.add(onComplete, _this);
                        }
                    })];
            });
        });
    }
    rf.loadImage = loadImage;
})(rf || (rf = {}));
//# sourceMappingURL=stage3d.js.map
if (typeof global != "undefined") {
    global["rf"] = rf;
}
if (typeof GameGlobal != "undefined") {
    GameGlobal["rf"] = rf;
}
