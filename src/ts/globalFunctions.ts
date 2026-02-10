const debug:boolean = true;

//短縮化
const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);
const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);

const init = async ()=>{
    if (!globalThis.python_ime_typo_fixer) {
    globalThis.python_ime_typo_fixer = {
        // setting:await getSetting() as ExtensionSetting,
        setting:undefined,
        functions:{
            isExtensionSetting:function(value:unknown):value is ExtensionSetting{
                return (
                    value != null &&
                    typeof value === "object" &&
                    'isActive' in value &&
                    typeof value.isActive == "boolean"
                );
            }
        }
    }
    if (debug) console.log("pythone_ime_typo_fixer:init",globalThis.python_ime_typo_fixer)
}}
const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (debug) console.log("python_ime_typo_fixer:getSetting",result["setting"]) 
        resolve(result["setting"])}
    ) 
});
//設定をglobalThisに入れる
const updateSetting = (setting: ExtensionSetting) => {
    if (debug) console.log("python_ime_typo_fixer:updateSetting", setting)
    if (!globalThis.python_ime_typo_fixer) {
        init()
    }
    globalThis.python_ime_typo_fixer.setting = setting
}

export {
    init,
    qs,
    qsAll,
    getSetting,
    updateSetting,
    debug
}