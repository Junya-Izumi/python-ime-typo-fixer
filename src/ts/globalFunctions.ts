import { ExtensionSetting } from "./types";
import { pythonImeTypoFixer } from "./PythonImeTypoFixer";

const debug:boolean = false;


//短縮化
const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);
const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);

const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (debug) console.log("pythonImeTypoFixer:getSetting",result["setting"]) 
        resolve(result["setting"])}
    ) 
});
//設定をglobalThisに入れる
const updateSetting = (setting: ExtensionSetting) => {
    if (debug) console.log("pythonImeTypoFixer:updateSetting", setting)
    pythonImeTypoFixer.setting = setting
}

export {
    qs,
    qsAll,
    getSetting,
    updateSetting,
    debug
}
