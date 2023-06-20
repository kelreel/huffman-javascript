export interface TreeNode {
    char: string;
    weight: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
/** ENCODE TEXT */
export declare function encode(text: string, codes: Map<string, string>): Array<string>;
/** DECODE TEXT */
export declare function decode(text: Array<string>, codes: Map<string, string>): string;
/** GET ENTROPY */
export declare function getEntropyOfText(text: string): number;
/** Create char-to-code Map */
export declare function getCharCodesFromSource(text: string): Map<string, string>;
/** Relative frequency */
export declare function getRelativeFrequency(arr: Array<any>): Array<any>;
/** Calculate chars frequency */
export declare function getCharsFrequency(text: string): [string, number][];
/** Generate Huffman tree */
export declare function getTree(freq: [string, number][]): TreeNode;
