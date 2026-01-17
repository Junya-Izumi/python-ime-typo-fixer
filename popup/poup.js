//短縮化
const qs = (selector, parent = document) => parent.querySelector(selector);
const qsAll = (selector, parent = document) => parent.querySelectorAll(selector);

const getStorage = (key) => new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => resolve(result[key]))
})

window.addEventListener('DOMContentLoaded', async () => {
    //設定をglobalThisに入れる
    const storage = await getStorage('setting')
    globalThis.python_ime_typo_fixer_setting = storage
    //ボタンに反映
    qs(".setting-isActive").checked = storage.isActive
})

//設定を反映
qs(".setting-isActive").addEventListener('input', (e) => {
    console.log(e.target.checked);
    const isActive = e.target.checked
    chrome.storage.local.set({
        'setting': {
            'isActive': isActive
        }
    })
})
