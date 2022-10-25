export interface TreeNode {
    symbols: Array<string>;
    weight: number;
    leafs: Array<TreeNode>;
}
/** ENCODE TEXT */
export declare function encode(text: string, codes: Map<string, string>): Array<string>;
/** DECODE TEXT */
export declare function decode(text: Array<string>, codes: Map<string, string>): string;
/** GET ENTROPY */
export declare function getEntropyOfText(text: string): number;
/** GET SYMBOLS CODES FROM TEXT */
export declare function getCodesFromText(text: string): Map<string, string>;
export declare function getRelativeFrequency(arr: Array<any>): Array<any>;
/** GET SYMBOLS FREQUENCY FROM TEXT */
export declare function getFrequency(text: string): [string, number][];
/** GENERATE HUFFMAN TREE */
export declare function getTree(arr: Array<any>): TreeNode;
