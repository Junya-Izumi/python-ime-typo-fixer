/**
 * compositionendで変換確定後に変換する
 */
window.addEventListener('compositionend', (e) => {
    const targetReg = /((p|ｐ|P|Ｐ)(y|ｙ|Y|Ｙ)(て|手)ょん)/;
    if (targetReg.test(e.data)) {
        let newText = e.data.replace(targetReg, "python")
        while (targetReg.test(newText)) {
            newText = newText.replace(targetReg, "python")
        }
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        try {
            //pythonに変換する前のテキストを新しいテキストで上書きする
            e.target.setRangeText(newText, start - e.data.length, end, 'end')
        } catch (error) {
            const watch = {
                "e.target":e.target,
                "e.data":e.data,
                "newText":newText,
                "start":start,
                "end":end
            }
            console.log("extension error","extension name:'pyてょん to python'",error,watch)
        }
    }
})