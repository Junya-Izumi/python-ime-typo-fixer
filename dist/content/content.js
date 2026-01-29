const getStorage = (key) => new Promise((resolve) => {
  return chrome.storage.local.get([key], (result) => resolve(result[key]));
});
window.addEventListener("load", async () => {
  const storage = await getStorage("setting");
  console.log("python_ime_typo_fixer setting load", storage);
  globalThis.python_ime_typo_fixer_setting = storage;
});
window.addEventListener("compositionend", (e) => {
  const target = e.target;
  if (!globalThis.python_ime_typo_fixer_setting) return;
  if (!globalThis.python_ime_typo_fixer_setting.isActive) return;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return console.info("pyてょん to python: This field is not supported");
  const targetReg = /((p|ｐ|P|Ｐ)(y|ｙ|Y|Ｙ)(て|手)ょん)/g;
  if (targetReg.test(e.data)) {
    const newText = e.data.replace(targetReg, "python");
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? 0;
    {
      console.log({
        "e.target": e.target,
        "e.data": e.data,
        "newText": newText,
        "start": start,
        "end": end
      });
      target.setRangeText(newText, start - e.data.length, end, "end");
    }
  }
});
