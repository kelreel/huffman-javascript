import {getCodesFromText, encode, decode, getFrequency} from './index';

const text = 'abra-cadabra';
console.log(`Text: ${text}`)

console.log(getFrequency('abcc'))

// const codes = getCodesFromText(text); // Get symbols codes
// console.log(codes)
//
// const result = encode(text, codes); // Get array of encoded symbols (result)
// console.log(result)
//
// console.log(decode(result, codes))
