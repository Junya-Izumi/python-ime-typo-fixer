const getSetting = () => new Promise((resolve) => {
  return chrome.storage.local.get(["setting"], (result) => resolve(result["setting"]));
});
const updateSetting = (setting) => {
  globalThis.python_ime_typo_fixer_setting = setting;
};
window.addEventListener("load", async () => {
  const setting = await getSetting();
  updateSetting(setting);
});
chrome.storage.onChanged.addListener((chnages, namespace) => {
  if (namespace === "local" && chnages["setting"]) {
    const newValue = chnages["setting"].newValue;
    let oldSetting = globalThis.python_ime_typo_fixer_setting;
    const newSetting = { ...oldSetting, ...newValue };
    updateSetting(newSetting);
  }
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
    target.setRangeText(newText, start - e.data.length, end, "end");
  }
});
