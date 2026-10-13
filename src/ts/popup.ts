// export {}
// const debug:boolean = false;
import { pythonImeTypoFixer } from "./PythonImeTypoFixer";
import { ExtensionSetting } from "./types";
import { qs } from "./utils/dom"
import { getSetting } from "./utils/storage";

const input_itActive = qs(".setting-isActive") as HTMLInputElement;
window.addEventListener('DOMContentLoaded', async () => {
    // if (!globalThis.pythonImeTypoFixer) {
    //     globalThis.pythonImeTypoFixer = {
    //         setting:undefined,
    //         functions:{
    //             isExtensionSetting:function(value:unknown):value is ExtensionSetting{
    //                 return (
    //                     value != null &&
    //                     typeof value === "object" &&
    //                     'isActive' in value &&
    //                     typeof value.isActive == "boolean"
    //                 );
    //             }
    //         }
    //     }
    // }
    //設定をglobalThisに入れる
    const setting =  await getSetting();
    if (pythonImeTypoFixer.functions.isExtensionSetting(setting)) {
        //ボタンに反映
        input_itActive.checked = setting.isActive
    }
})

//設定を反映
input_itActive.addEventListener('input', (e) => {
    if (e.currentTarget instanceof HTMLInputElement) {
        console.log(e.currentTarget.checked);
        const isActive = e.currentTarget.checked;
        const new_setting:ExtensionSetting = {
            'isActive':isActive
        }
        chrome.storage.local.set({
            'setting': new_setting
        })
    }
})
