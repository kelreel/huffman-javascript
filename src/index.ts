import "./css/style.scss";
const $ = require("jquery");

import { getCodesFromText, encode, decode, getFrequency, getRelativeFrequency, getEntropyOfText, getTree } from './huffman';

let codes: Map<string, string>;
let result: Array<string>;
let text, frequency: any[], method;
let relFreq;

$('#btn1').click(() => {
  console.clear();
  formEncode();
})

$('#btn2').click(() => {
  formDecode();
})


function formEncode () {
  text = $("#text").val(); // Text for encode
  codes = getCodesFromText(text); // Get symbols codes
  result = encode(text, codes); // Get array of encoded symbols (result)
  frequency = getFrequency(text);
  relFreq = getRelativeFrequency(frequency);

  console.log('Text length: ', result.length);
  console.log('Text Entropy: ', getEntropyOfText(text));
  console.log('Frequency: \n', frequency);
  console.log('Rel. Frequency \n', relFreq);
  console.log('Huffman Tree: \n', getTree(frequency));
  console.log('Codes Alphabet: \n', codes);

  $("#text").val(result.join('')); // Put result array of encoded symbols into form
}

function formDecode () {
  text = $("#text").val(); // Text for decode
  $("#text").val(decode(result, codes)); // Decode text with existing codes

  /** CONSOLE INFO */
  let avgLength = (Math.log2(codes.size));
  let avgHuffmanLength: number = 0;

  for (let i = 0; i < frequency.length; i++) {
    codes.forEach((code, symbol) => {
      if (frequency[i][0] === symbol) {
        avgHuffmanLength += (frequency[i][1] * code.toString().length);
      }
    })
  }
  avgHuffmanLength = avgHuffmanLength / result.length;

  console.log('Avg. word length before coding: ', avgLength);
  console.log('Avg. Haffmun word length (after coding): ', avgHuffmanLength);

  let zipRate: number = Math.round(((avgLength - avgHuffmanLength) / avgLength) * 10000) / 100;
  console.log('Compression result: ', zipRate + '%');
}