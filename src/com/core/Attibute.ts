module rf {
    export function GM_CMD(name?: string) {
        return function (
            classPrototype: any,
            propertyKey: string,
            descriptor: PropertyDescriptor
        ) {
            if (typeof globalThis != "undefined") {
                name = name || propertyKey;
                globalThis[name] = descriptor.value;
            }

        };
    }
}
