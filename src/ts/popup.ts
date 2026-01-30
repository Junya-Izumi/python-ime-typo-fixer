export {}
//短縮化
const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);
const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);

const getStorage = (key: string) => new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => resolve(result[key]))
})

const input_itActive = qs(".setting-isActive") as HTMLInputElement;
window.addEventListener('DOMContentLoaded', async () => {
    //設定をglobalThisに入れる
    const setting =  await getStorage('setting') as extensionSetting;
    globalThis.python_ime_typo_fixer_setting = setting;
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