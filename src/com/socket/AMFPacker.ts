module rf {



    export class AMFPacker implements ISocketPacker {

        amf3Decode = singleton(AMF3Decode);
        amf3Encode = singleton(AMF3Encode);

        decode(data: ArrayBuffer) {
            let input = this.amf3Decode;
            input.clear();
            input.setArrayBuffer(data);
            let code = input.readUint16(true);
            let stream = recyclable(StreamX);
            let len = data.byteLength;
            stream.type = code;
            stream.len = len;
            stream.data = input.readObject();
            return stream;
        }


        encode(option: ISocketSendOption) {
            let output = this.amf3Encode;
            output.clear();
            output.position = 0;
            let { code, value } = option;
            output.writeUint16(code, true);
            if (value !==undefined) {
                output.writeObject(value);
            }
            return output.toArrayBuffer(output.position);
        }

    }
}