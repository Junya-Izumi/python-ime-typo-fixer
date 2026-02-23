import { ExtensionSetting } from "../types";
import {
    getSetting,
    updateSetting,
    debug,
    isExtensionSetting
} from "./globals"

console.log("pythonImeTypoFixer:debug", debug);
let currentSetting: ExtensionSetting
(async () => {
    currentSetting = await getSetting()
})()

//設定の変更を反映させる
chrome.storage.onChanged.addListener(async (changes, namespace: string) => {
    if (namespace === 'local' && changes['setting']) {
        const newValue = changes['setting'].newValue as Partial<ExtensionSetting>
        currentSetting = await getSetting()
        if (isExtensionSetting(currentSetting)) {
            const newSetting: ExtensionSetting = { ...currentSetting, ...newValue }
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
    if (!currentSetting?.isActive) return
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