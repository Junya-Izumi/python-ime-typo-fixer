const qs = (selector, parent = document) => parent.querySelector(selector);
const getSetting = () => new Promise((resolve) => {
  const setting = chrome.storage.local.get(["setting"], (result) => resolve(result["setting"]));
  return setting;
});
const updateSetting = (setting) => {
  if (!globalThis.python_ime_typo_fixer) {
    globalThis.python_ime_typo_fixer = {
      setting: void 0,
      functions: void 0
    };
  }
  globalThis.python_ime_typo_fixer.setting = setting;
};
const input_itActive = qs(".setting-isActive");
window.addEventListener("DOMContentLoaded", async () => {
  const setting = await getSetting();
  updateSetting(setting);
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
