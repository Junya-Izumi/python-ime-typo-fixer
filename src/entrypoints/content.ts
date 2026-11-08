import type { ExtensionSetting } from "../types";
import { isExtensionSetting } from "../utils/typeGuards";
import { VITE_isDEVMODE } from "../globals";
import { getSetting } from "../utils/storage";

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: "document_idle",
    async main() {
        console.log("pythonImeTypoFixer:debug", VITE_isDEVMODE);

        let currentSetting: ExtensionSetting;
        (async () => {
            currentSetting = (await getSetting()) as ExtensionSetting
        })()

        //設定の変更を反映させる
        chrome.storage.onChanged.addListener((chnages, namespace: string) => {
            if (namespace === 'local' && chnages['setting']) {
                getSetting().then(
                    (result) => {
                        if (isExtensionSetting(result)) {
                            currentSetting = result
                            if (VITE_isDEVMODE) console.log("pythonImeTypoFixer:newSetting", currentSetting)
                        }
                    }
                )
            }
        })

        /**
         * compositionendで変換確定後に変換する
         */
        window.addEventListener('compositionend', (e) => {
            const target = e.target;
            if (!currentSetting) return
            if (!currentSetting.isActive) return
            if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return console.info("pyてょん to python: This field is not supported")
            const targetReg: RegExp = /((p|ｐ|P|Ｐ)(y|ｙ|Y|Ｙ)(て|手)ょん)/g;
            if (targetReg.test(e.data)) {
                const newText = e.data.replace(targetReg, "python")
                const selectionStart = target.selectionStart ?? 0;
                const selectionEnd = target.selectionEnd ?? 0;
                if (VITE_isDEVMODE) {
                    console.log({
                        "e.target": e.target,
                        "e.data": e.data,
                        "newText": newText,
                        "selectionStart": selectionStart,
                        "selectionEnd": selectionEnd,
                        "setRangeText:start": selectionStart - e.data.length,
                        "setRangeText:end": selectionEnd,
                    })
                }
                target.setRangeText(newText, selectionStart - e.data.length, selectionEnd, 'end')
            }
        })
    }
})
