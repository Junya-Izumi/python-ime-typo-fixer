import { debug } from "../globals";

export const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (debug) console.log("pythonImeTypoFixer:getSetting",result["setting"])
        resolve(result["setting"])}
    )
});

