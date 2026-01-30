chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    const defaultExtensionSetting = {
      isActive: true
    };
    chrome.storage.local.set({
      "setting": defaultExtensionSetting
    });
  }
});
