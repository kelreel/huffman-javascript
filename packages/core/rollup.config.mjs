/**
 * @type {import('rollup').RollupOptions}
 */
import {defineConfig} from 'rollup';
import typescript from '@rollup/plugin-typescript';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const plugins = [
    typescript({})
];

const input = 'src/index.ts';

export default [
    defineConfig({
        input,
        output: {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
        },
        plugins,
    }),
    defineConfig({
        input,
        output: {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        },
        plugins,
    }),
];
