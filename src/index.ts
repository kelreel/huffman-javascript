export interface TreeNode {
    symbols: Array<string>;
    weight: number;
    leafs: Array<TreeNode>;
}

/** ENCODE TEXT */
export function encode(text: string, codes: Map<string, string>): Array<string> {
    let result: Array<string> = [];
    for (let i = 0; i < text.length; i++) {
        result.push(codes.get(text[i]));
    }
    return result;
}

/** DECODE TEXT */
export function decode(text: Array<string>, codes: Map<string, string>): string {
    let result: string = '';
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
    let relFreq: Array<any> = getRelativeFrequency(getFrequency(text));
    let entropy: number = 0;
    for (let i = 0; i < relFreq.length; i++) {
        entropy += relFreq[i][1] * Math.log2(relFreq[i][1]);
    }
    return -entropy;
}

/** GET SYMBOLS CODES FROM TEXT */
export function getCodesFromText(text: string): Map<string, string> {
    const frequencyArr = getFrequency(text);
    const symbols = frequencyArr.map((item) => item[0]);

    let tree = getTree(frequencyArr);

    let codes: Map<string, string> = new Map(); // Array with symbols and codes
    symbols.forEach((element) => {
        codes.set(element, getSymbolCode(tree, element));
    });

    return codes;
}

//** GET RELATIVE FREQUENCY */
export function getRelativeFrequency(arr: Array<any>): Array<any> {
    let length: number = 0;
    let resArr: Array<any> = [];
    for (let i = 0; i < arr.length; i++) {
        length += arr[i][1];
    }
    for (let i = 0; i < arr.length; i++) {
        let relFreq = arr[i][1] / length;
        resArr.push([arr[i][0], relFreq]);
    }

    return resArr;
}

/** GET CODE FOR SYMBOL */
function getSymbolCode(tree: TreeNode, symbol: string, code: string = ''): string {
    let arr = [];
    if (typeof tree.leafs === undefined) {
        return code;
    } else {
        arr = tree.leafs;
    }

    if (arr[0].symbols.length === 1 && arr[0].symbols[0] === symbol) return code + 0;
    if (arr[0].symbols.length === 1 && arr[0].symbols[0] !== symbol) {
        if (arr[1].symbols.length === 1 && arr[1].symbols[0] === symbol) return code + 1;
        if (arr[1].symbols.includes(symbol) === true)
            return getSymbolCode(arr[1], symbol, code + 1);
    }

    if (arr[1].symbols.length === 1 && arr[1].symbols[0] === symbol) return code + 1;
    if (arr[1].symbols.length === 1 && arr[1].symbols[0] !== symbol) {
        if (arr[0].symbols.length === 1 && arr[0].symbols[0] === symbol) return code + 0;
        if (arr[0].symbols.includes(symbol) === true)
            return getSymbolCode(arr[0], symbol, code + 0);
    }

    if (arr[0].symbols.length >= 2 && arr[0].symbols.includes(symbol))
        return getSymbolCode(arr[0], symbol, code + 0);
    if (arr[1].symbols.length >= 2 && arr[1].symbols.includes(symbol))
        return getSymbolCode(arr[1], symbol, code + 1);
}

/** GET SYMBOLS FREQUENCY FROM TEXT */
export function getFrequency(text: string): [string, number][] {
    let freq: Map<string, number> = new Map();

    for (let i = 0; i < text.length; i++) {
        let counter: number = 0;
        for (let j = 0; j < text.length; j++) {
            if (!freq.has(text[i])) {
                if (text[i] === text[j] && i !== j) {
                    counter++;
                }
            }
        }
        if (!freq.has(text[i])) {
            freq.set(text[i], counter + 1);
        }
    }

    return Array.from(freq).sort((a, b) => b[1] - a[1]); //Descending sort
}

/** GENERATE HUFFMAN TREE */
export function getTree(arr: Array<any>) {
    let tree: TreeNode;

    arr = arr.map((elem) => {
        return {
            symbols: [elem[0]],
            weight: elem[1],
            leafs: [],
        };
    });

    let min1, min2, node: TreeNode;

    while (arr.length > 2) {
        min1 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min1), 1);
        min2 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min2), 1);

        node = createNode(min1, min2);
        arr.push(node);
    }

    tree = createNode(arr[0], arr[1]);
    return tree;
}

/** CREATE TREE NODE FROM TWO NODES */
function createNode(node1: TreeNode, node2: TreeNode): any {
    let node: TreeNode;
    let weight: number = node1.weight + node2.weight;
    let symbols: Array<string> = node1.symbols.concat(node2.symbols);
    let leafs: Array<TreeNode> = [node1, node2];
    node = {
        symbols: symbols,
        weight: weight,
        leafs: leafs,
    };
    return node;
}

/** SEARCH NODE WITH MINIMAL WEIGHT IN TREE */
function searchMinWeightNode(arr: Array<any>, minNumber: number = -1): TreeNode {
    let min = 9999;
    let result: TreeNode;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].weight <= min && arr[i].weight >= minNumber) {
            min = arr[i].weight;
            result = arr[i];
        }
    }
    return result;
}
