declare module rf {
    class Inflate {
        constructor(byte: Uint8Array);
        decompress(): Uint8Array;
    }

    class Deflate {
        static compress(unit8: Uint8Array | ArrayBuffer): Uint8Array
    }
}