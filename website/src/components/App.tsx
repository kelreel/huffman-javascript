import {getCodesFromText} from 'huffman-javascript';

export const App = (): JSX.Element => {
    const codes = getCodesFromText('abcde aabc');
    return <pre>{JSON.stringify(Array.from(codes.entries()), null, 2)}</pre>;
};
