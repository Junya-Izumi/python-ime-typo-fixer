export {}
//短縮化
const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);
const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);
const debug = false
const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => resolve(result["setting"]))
});

//設定をglobalThisに入れる
const updateSetting = (setting: extensionSetting) => {
    if (debug) console.log("python_ime_typo_fixer:updateSetting", setting)
    if (!globalThis.python_ime_typo_fixer) {
        globalThis.python_ime_typo_fixer = {
            setting:undefined,
            functions:undefined
        }
    }
    globalThis.python_ime_typo_fixer.setting = setting
}

const input_itActive = qs(".setting-isActive") as HTMLInputElement;
window.addEventListener('DOMContentLoaded', async () => {
    //設定をglobalThisに入れる
    const setting =  await getSetting() as extensionSetting;
    updateSetting(setting)
    //ボタンに反映
    input_itActive.checked = setting.isActive
})

//設定を反映
input_itActive.addEventListener('input', (e) => {
    if (e.currentTarget instanceof HTMLInputElement) {
        console.log(e.currentTarget.checked);
        const isActive = e.currentTarget.checked;
        const new_setting = {
            'isActive':isActive
        } as extensionSetting
        chrome.storage.local.set({
            'setting': new_setting
        })
    }
})