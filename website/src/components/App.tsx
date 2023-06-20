import {
    getCharCodesFromSource,
    getCharsFrequency,
    getTree,
    encode,
    decode,
} from 'huffman-javascript';

export const App = (): JSX.Element => {
    const text = 'abracadabra';

    console.time('1');
    const codes = getCharCodesFromSource(text);

    const freq = getCharsFrequency(text);
    const tree = getTree(freq);

    console.log(tree);
    console.log(codes);

    const encoded = encode(text, codes);
    const decoded = decode(encoded, codes);

    console.log(`encoded`, encoded);
    console.log(`decoded`, decoded);

    console.timeEnd('1');

    return (
        <div>
            <pre>{JSON.stringify(tree, null, 2)}</pre>
            <br />
            <pre>Encoded: {encoded}</pre>
            <pre>Decoded: {decoded}</pre>
        </div>
    );
};
