<h1 align="center"><img height="150" src="./docs/logo.png" /><br>Huffman coding JS (TypeScript)</h1>
<h2 align="center">
  <a href="https://kanitelk.github.io/huffman-javascript/">DEMO</a>
</h2>

Huffman code is a particular type of optimal prefix code that is commonly used for lossless data compression. This is the implementation of the algorithm on TypeScript.
  
## Installation

Clone this repository and install modules:

```bash
git clone https://github.com/kanitelk/huffman-javascript.git
cd huffman-javascript
npm install
npm run dev(or build)
```

![](./docs/split.png)

## Usage

<b>The algorithm implementation is in the file /src/huffman.ts</b>

Let's encode and decode plain text!

```typescript
import { getCodesFromText, encode, decode } from './huffman';

/** ENCODING */
let text: string = 'abracadabra'; 
let encodedText: string = '';

let codes: Map<string, string> = getCodesFromText(text); // Symbols codes
let encodedArray: Array<any> = encode(text, codes); // Get array of encoded symbols

encodedText = encodedArray.join(''); // Encoded array to string. Equals 0101100...

/** DECODING */
text = decode(encodedArray, codes); // Equals 'abracadabra'

```

![](./docs/split.png)

## APIs

#### Encode text
```typescript
encode(text: string, codes: Map<string, string>): Array<string>
```

#### Decode text
```typescript
decode(text: Array<string>, codes: Map<string, string>):string
```

#### Get symbols codes from text
```typescript
getCodesFromText(text: string): Map<string, string>
```

#### Get symbols frequency
```typescript
getFrequency(text: string): Array<any>
```

#### Get Huffman Tree from frequency array
```typescript
getTree(arr: Array<any>)
```

#### Get relative frequency array
```typescript
getRelativeFrequency(arr: Array<any>): Array<any>
```

#### Get text entropy
```typescript
getEntropyOfText(text: string): number
```

