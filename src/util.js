export const convertToSrc = (data) => {
    const base64 = btoa(
        new Uint8Array(data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
    );
    return ('data:;base64,' + base64);
};
