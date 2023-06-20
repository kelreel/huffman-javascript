import {
    getCharCodesFromSource,
    getCharsFrequency,
    getTree,
    encode,
    decode,
} from 'huffman-javascript';

export const App = (): JSX.Element => {
    const text = 'aaaabbbccd';
    const codes = getCharCodesFromSource(text);
    // return <pre>{JSON.stringify(Array.from(codes.entries()), null, 2)}</pre>;

    const freq = getCharsFrequency(text);
    const tree = getTree(freq);

    console.log(tree);
    console.log(codes);

    const encoded = encode(text, codes);
    const decoded = decode(encoded, codes);

    console.log(`encoded`, encoded);
    console.log(`decoded`, decoded);

    return (
        <div>
            <pre>{JSON.stringify(tree, null, 2)}</pre>
            <br />
            <pre>Encoded: {encoded}</pre>
            <br />
            <pre>Decoded: {decoded}</pre>
        </div>
    );
};
