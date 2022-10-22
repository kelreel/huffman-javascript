import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";


const plugins = [
    typescript({
        typescript: require("typescript"),
    }),
];

const input = "src/index.ts";

export default [
    {
        input,
        output: {
            file: pkg.module,
            format: "esm",
            sourcemap: true,
        },
        plugins,
    },
    {
        input,
        output: {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        plugins,
    },
];
