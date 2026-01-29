chrome.runtime.onInstalled.addListener((details)=>{
    if (details.reason == "install") {
        const defaultExtensionSetting:extensionSetting = {
            isActive:true
        }
        chrome.storage.local.set({
            "setting":defaultExtensionSetting
        })
    }
})