import type { ExtensionSetting } from "../types"
export default defineBackground(() => {
    chrome.runtime.onInstalled.addListener((details) => {
        if (details.reason == "install") {
            const defaultExtensionSetting: ExtensionSetting = {
                isActive: true
            }
            chrome.storage.local.set({
                "setting": defaultExtensionSetting
            })
        }
    })
})
