import { ExtensionSetting } from "../types";
import { pythonImeTypoFixer } from "../PythonImeTypoFixer";
import { debug } from "../globals";

export const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (debug) console.log("pythonImeTypoFixer:getSetting",result["setting"])
        resolve(result["setting"])}
    )
});

export const updateSetting = (setting: ExtensionSetting) => {
    if (debug) console.log("pythonImeTypoFixer:updateSetting", setting)
    pythonImeTypoFixer.setting = setting
}
