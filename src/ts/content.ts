import { INSPECT_MAX_BYTES } from "node:buffer";
import { settings } from "node:cluster";
const debug = false;
const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => resolve(result["setting"]))
});

//設定をglobalThisに入れる
const updateSetting = (setting: extensionSetting) => {
    if (debug) console.log("python_ime_typo_fixer:updateSetting", setting)
    globalThis.python_ime_typo_fixer_setting = setting
}

window.addEventListener('load', async () => {
    const setting = await getSetting() as extensionSetting
    updateSetting(setting)
})

//設定の変更を反映させる
chrome.storage.onChanged.addListener((chnages, namespace: string) => {
    if (namespace === 'local' && chnages['setting']) {
        const newValue = chnages['setting'].newValue as Partial<extensionSetting>
        let oldSetting = globalThis.python_ime_typo_fixer_setting as extensionSetting
        const newSetting:extensionSetting = {...oldSetting,...newValue}
        if (debug) console.log("python_ime_typo_fixer:newSetting", newSetting)
        updateSetting(newSetting)
    }
})

/**
 * compositionendで変換確定後に変換する
 */
window.addEventListener('compositionend', (e) => {
    const target = e.target;
    if (!globalThis.python_ime_typo_fixer_setting) return
    if (!globalThis.python_ime_typo_fixer_setting.isActive) return
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