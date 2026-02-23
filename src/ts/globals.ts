import type { ExtensionSetting } from "../types";

export const debug: boolean = false;

//短縮化
export const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);
export const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);

export const getSetting = () => new Promise<ExtensionSetting>((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (debug) console.log("pythonImeTypoFixer:getSetting", result["setting"])
        resolve(result["setting"] as ExtensionSetting)
    }
    )
});

export const updateSetting = (setting: ExtensionSetting) => {
    if (debug) console.log("pythonImeTypoFixer:updateSetting", setting)
    chrome.storage.local.set({
        "setting": setting
    })
}

export const isExtensionSetting = (value: unknown): value is ExtensionSetting => {
    return (
        value != null &&
        typeof value === "object" &&
        'isActive' in value &&
        typeof value.isActive == "boolean"
    )
}
