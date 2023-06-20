export interface TreeNode {
    char: string;
    weight: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

/** ENCODE TEXT */
export function encode(text: string, codes: Map<string, string>): Array<string> {
    const result: Array<string> = [];
    for (let i = 0; i < text.length; i++) {
        // @ts-ignore
        result.push(codes.get(text[i]));
    }

    return result;
}

/** DECODE TEXT */
export function decode(text: Array<string>, codes: Map<string, string>): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        codes.forEach((code, symbol) => {
            if (text[i] === code) {
                result += symbol;
            }
        });
    }
    return result;
}

/** GET ENTROPY */
export function getEntropyOfText(text: string): number {
    const relFreq: Array<any> = getRelativeFrequency(getCharsFrequency(text));
    let entropy = 0;

    for (let i = 0; i < relFreq.length; i++) {
        entropy += relFreq[i][1] * Math.log2(relFreq[i][1]);
    }
    return -entropy;
}

/** Create char-to-code Map */
export function getCharCodesFromSource(text: string): Map<string, string> {
    const freqArr = getCharsFrequency(text);
    const tree = getTree(freqArr);

    const codes: Map<string, string> = new Map(); // Array with symbols and codes

    getCodes(tree, (char, code) => {
        codes.set(char, code);
    });
    return codes;
}

const getCodes = (
    tree: TreeNode | null,
    cb: (char: string, code: string) => void,
    code = '',
): void => {
    if (!tree) {
        return;
    }

    if (!tree.left && !tree.right) {
        cb(tree.char, code);
        return;
    }

    getCodes(tree.left, cb, code + '0');
    getCodes(tree.right, cb, code + '1');
};

/** Relative frequency */
export function getRelativeFrequency(arr: Array<any>): Array<any> {
    let length = 0;
    const resArr: Array<any> = [];
    for (let i = 0; i < arr.length; i++) {
        length += arr[i][1];
    }
    for (let i = 0; i < arr.length; i++) {
        const relFreq = arr[i][1] / length;
        resArr.push([arr[i][0], relFreq]);
    }

    return resArr;
}

/** Calculate chars frequency */
export function getCharsFrequency(text: string): [string, number][] {
    const freq: Map<string, number> = new Map();

    for (const char of text) {
        const count = freq.get(char);
        freq.set(char, count ? count + 1 : 1);
    }

    return Array.from(freq).sort((a, b) => b[1] - a[1]); // descending
}

/** Generate Huffman tree */
export function getTree(freq: [string, number][]): TreeNode {
    const nodes: TreeNode[] = [];

    for (const [char, weight] of freq) {
        nodes.push({char, weight, left: null, right: null});
    }

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.weight - b.weight);

        const left = nodes.shift()!;
        const right = nodes.shift()!;

        const parent: TreeNode = {char: '', weight: left?.weight + right?.weight, left, right};

        nodes.push(parent);
    }

    return nodes[0];
}
