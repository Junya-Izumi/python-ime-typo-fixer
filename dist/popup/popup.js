const qs = (selector, parent = document) => parent.querySelector(selector);
const getStorage = (key) => new Promise((resolve, reject) => {
  chrome.storage.local.get(key, (result) => resolve(result[key]));
});
const input_itActive = qs(".setting-isActive");
window.addEventListener("DOMContentLoaded", async () => {
  const setting = await getStorage("setting");
  globalThis.python_ime_typo_fixer_setting = setting;
  input_itActive.checked = setting.isActive;
});
input_itActive.addEventListener("input", (e) => {
  if (e.currentTarget instanceof HTMLInputElement) {
    console.log(e.currentTarget.checked);
    const isActive = e.currentTarget.checked;
    const new_setting = {
      "isActive": isActive
    };
    chrome.storage.local.set({
      "setting": new_setting
    });
  }
});
