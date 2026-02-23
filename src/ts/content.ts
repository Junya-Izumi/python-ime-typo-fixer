import { ExtensionSetting } from "../types";
import {
    init,
    getSetting,
    updateSetting,
    debug,
    pythonImeTypoFixer
} from "./globals"

// const debug:boolean = false;

init()
console.log("pythonImeTypoFixer:debug", debug);
(async () => {
    const setting = await getSetting()
    updateSetting(setting)
})()

//設定の変更を反映させる
chrome.storage.onChanged.addListener((chnages, namespace: string) => {
    if (namespace === 'local' && chnages['setting']) {
        const newValue = chnages['setting'].newValue as Partial<ExtensionSetting>
        let oldSetting = pythonImeTypoFixer.setting
        if (pythonImeTypoFixer.functions?.isExtensionSetting(oldSetting)) {
            const newSetting: ExtensionSetting = { ...oldSetting, ...newValue }
            if (debug) console.log("pythonImeTypoFixer:newSetting", newSetting)
            updateSetting(newSetting)
        }
    }
})

/**
 * compositionendで変換確定後に変換する
 */
window.addEventListener('compositionend', (e) => {
    const target = e.target;
    if (!pythonImeTypoFixer.setting) return
    if (!pythonImeTypoFixer.setting.isActive) return
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return console.info("pyてょん to python: This field is not supported")
    const targetReg: RegExp = /((p|ｐ|P|Ｐ)(y|ｙ|Y|Ｙ)(て|手)ょん)/g;
    if (targetReg.test(e.data)) {
        const newText = e.data.replace(targetReg, "python")
        const start = target.selectionStart ?? 0;
        const end = target.selectionEnd ?? 0;
        if (debug) {
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