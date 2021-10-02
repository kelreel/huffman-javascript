'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** ENCODE TEXT */
function encode(text, codes) {
    var result = [];
    for (var i = 0; i < text.length; i++) {
        result.push(codes.get(text[i]));
    }
    return result;
}
/** DECODE TEXT */
function decode(text, codes) {
    var result = '';
    var _loop_1 = function (i) {
        // eslint-disable-next-line no-loop-func
        codes.forEach(function (code, symbol) {
            if (text[i] === code) {
                result += symbol;
            }
        });
    };
    for (var i = 0; i < text.length; i++) {
        _loop_1(i);
    }
    return result;
}
/** GET ENTROPY */
function getEntropyOfText(text) {
    var relFreq = getRelativeFrequency(getFrequency(text));
    var entropy = 0;
    for (var i = 0; i < relFreq.length; i++) {
        entropy += relFreq[i][1] * Math.log2(relFreq[i][1]);
    }
    return -entropy;
}
/** GET SYMBOLS CODES FROM TEXT */
function getCodesFromText(text) {
    var frequencyArr = getFrequency(text);
    var symbols = frequencyArr.map(function (item) { return item[0]; });
    var tree = getTree(frequencyArr);
    var codes = new Map(); // Array with symbols and codes
    symbols.forEach(function (element) {
        codes.set(element, getSymbolCode(tree, element));
    });
    return codes;
}
//** GET RELATIVE FREQUENCY */
function getRelativeFrequency(arr) {
    var length = 0;
    var resArr = [];
    for (var i = 0; i < arr.length; i++) {
        length += arr[i][1];
    }
    for (var i = 0; i < arr.length; i++) {
        var relFreq = arr[i][1] / length;
        resArr.push([arr[i][0], relFreq]);
    }
    return resArr;
}
/** GET CODE FOR SYMBOL */
function getSymbolCode(tree, symbol, code) {
    if (code === void 0) { code = ''; }
    var arr = [];
    if (typeof tree.leafs === undefined) {
        return code;
    }
    arr = tree.leafs;
    if (arr[0].symbols.length === 1 && arr[0].symbols[0] === symbol)
        return code + 0;
    if (arr[0].symbols.length === 1 && arr[0].symbols[0] !== symbol) {
        if (arr[1].symbols.length === 1 && arr[1].symbols[0] === symbol)
            return code + 1;
        if (arr[1].symbols.includes(symbol) === true)
            return getSymbolCode(arr[1], symbol, code + 1);
    }
    if (arr[1].symbols.length === 1 && arr[1].symbols[0] === symbol)
        return code + 1;
    if (arr[1].symbols.length === 1 && arr[1].symbols[0] !== symbol) {
        if (arr[0].symbols.length === 1 && arr[0].symbols[0] === symbol)
            return code + 0;
        if (arr[0].symbols.includes(symbol) === true)
            return getSymbolCode(arr[0], symbol, code + 0);
    }
    if (arr[0].symbols.length >= 2 && arr[0].symbols.includes(symbol))
        return getSymbolCode(arr[0], symbol, code + 0);
    if (arr[1].symbols.length >= 2 && arr[1].symbols.includes(symbol))
        return getSymbolCode(arr[1], symbol, code + 1);
}
/** GET SYMBOLS FREQUENCY FROM TEXT */
function getFrequency(text) {
    var freq = new Map();
    for (var i = 0; i < text.length; i++) {
        var counter = 0;
        for (var j = 0; j < text.length; j++) {
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
    return Array.from(freq).sort(function (a, b) { return b[1] - a[1]; }); //Descending sort
}
/** GENERATE HUFFMAN TREE */
function getTree(arr) {
    arr = arr.map(function (elem) { return ({
        symbols: [elem[0]],
        weight: elem[1],
        leafs: [],
    }); });
    var min1;
    var min2;
    var node;
    while (arr.length > 2) {
        min1 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min1), 1);
        min2 = searchMinWeightNode(arr);
        arr.splice(arr.indexOf(min2), 1);
        node = createNode(min1, min2);
        arr.push(node);
    }
    return createNode(arr[0], arr[1]);
}
/** CREATE TREE NODE FROM TWO NODES */
function createNode(node1, node2) {
    var weight = node1.weight + node2.weight;
    var symbols = node1.symbols.concat(node2.symbols);
    var leafs = [node1, node2];
    return {
        symbols: symbols,
        weight: weight,
        leafs: leafs,
    };
}
/** SEARCH NODE WITH MINIMAL WEIGHT IN TREE */
function searchMinWeightNode(arr, minNumber) {
    if (minNumber === void 0) { minNumber = -1; }
    var min = 9999;
    var result;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].weight <= min && arr[i].weight >= minNumber) {
            min = arr[i].weight;
            result = arr[i];
        }
    }
    return result;
}

exports.decode = decode;
exports.encode = encode;
exports.getCodesFromText = getCodesFromText;
exports.getEntropyOfText = getEntropyOfText;
exports.getFrequency = getFrequency;
exports.getRelativeFrequency = getRelativeFrequency;
exports.getTree = getTree;
//# sourceMappingURL=index.js.map
