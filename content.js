const getStorage = (key) => new Promise((resolve) => {
    return chrome.storage.local.get([key], (result) => resolve(result[key]))
});

//設定をglobalThisに入れる
window.addEventListener('load', async () => {
    const storage = await getStorage('setting')
    console.log("python_ime_typo_fixer setting load", storage)
    globalThis.python_ime_typo_fixer_setting = storage
})

/**
 * compositionendで変換確定後に変換する
 */
window.addEventListener('compositionend', (e) => {
    // console.log(globalThis.python_ime_typo_fixer_setting)
    if (!globalThis.python_ime_typo_fixer_setting.isActive) return
    const targetReg = /((p|ｐ|P|Ｐ)(y|ｙ|Y|Ｙ)(て|手)ょん)/g;
    if (targetReg.test(e.data)) {
        const newText = e.data.replace(targetReg, "python")
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        try {
            //pythonに変換する前のテキストを新しいテキストで上書きする
            e.target.setRangeText(newText, start - e.data.length, end, 'end')
        } catch (error) {
            const watch = {
                "e.target": e.target,
                "e.data": e.data,
                "newText": newText,
                "start": start,
                "end": end
            }
            console.error("extension error", "extension name:'pyてょん to python'", error, watch)
        }
    }
})