import { VITE_isDEVMODE } from "../globals";

export const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (VITE_isDEVMODE) console.log("pythonImeTypoFixer:getSetting",result["setting"])
        resolve(result["setting"])}
    )
});

