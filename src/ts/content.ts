import { INSPECT_MAX_BYTES } from "node:buffer";
import { settings } from "node:cluster";
import * as globalFunctions from "./globalFunctions"
// const debug:boolean = false;

globalFunctions.init()
console.log("python_ime_typo_fixer:debug",globalFunctions.debug);
(async () => {
    const setting = (await globalFunctions.getSetting()) as ExtensionSetting
    globalFunctions.updateSetting(setting)
})()

//設定の変更を反映させる
chrome.storage.onChanged.addListener((chnages, namespace: string) => {
    if (namespace === 'local' && chnages['setting']) {
        const newValue = chnages['setting'].newValue as Partial<ExtensionSetting>
        let oldSetting = globalThis.python_ime_typo_fixer.setting
        if (globalThis.python_ime_typo_fixer.functions?.isExtensionSetting(oldSetting)) {
            const newSetting:ExtensionSetting = {...oldSetting,...newValue}
            if (globalFunctions.debug) console.log("python_ime_typo_fixer:newSetting", newSetting)
            globalFunctions.updateSetting(newSetting)
        }
    }
})

/**
 * compositionendで変換確定後に変換する
 */
window.addEventListener('compositionend', (e) => {
    const target = e.target;
    if (!globalThis.python_ime_typo_fixer.setting) return
    if (!globalThis.python_ime_typo_fixer.setting.isActive) return
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return console.info("pyてょん to python: This field is not supported")
    const targetReg: RegExp = /((p|ｐ|P|Ｐ)(y|ｙ|Y|Ｙ)(て|手)ょん)/g;
    if (targetReg.test(e.data)) {
        const newText = e.data.replace(targetReg, "python")
        const start = target.selectionStart ?? 0;
        const end = target.selectionEnd ?? 0;
        if (globalFunctions.debug) {
            console.log({
                "e.target": e.target,
                "e.data": e.data,
                "newText": newText,
                "start": start,
                "end": end
            })
        }
        target.setRangeText(newText, start - e.data.length, end, 'end')
    }
})