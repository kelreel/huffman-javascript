import {getCodesFromText} from "../../src/index";

export const App = (): JSX.Element => {
    const x = getCodesFromText("abcccc")
    console.log(x)
    return <div>App</div>
}
