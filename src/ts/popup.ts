// const debug:boolean = false;

import { ExtensionSetting } from "../types";
import { getSetting, isExtensionSetting, qs, updateSetting } from "./globals";

const input_itActive = qs(".setting-isActive") as HTMLInputElement;
window.addEventListener('DOMContentLoaded', async () => {
    const setting = await getSetting();
    if (isExtensionSetting(setting)) {
        //ボタンに反映
        input_itActive.checked = setting.isActive
    }
})

//設定を反映
input_itActive.addEventListener('input', (e) => {
    if (e.currentTarget instanceof HTMLInputElement) {
        console.log(e.currentTarget.checked);
        const isActive = e.currentTarget.checked;
        const newSetting: ExtensionSetting = {
            'isActive': isActive
        }
        updateSetting(newSetting)
    }
})