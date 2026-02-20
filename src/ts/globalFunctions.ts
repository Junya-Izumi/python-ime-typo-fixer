const debug:boolean = false;

//短縮化
const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);
const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);

const init = async ()=>{
    if (!globalThis.pythonImeTypoFixer) {
    globalThis.pythonImeTypoFixer = {
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
    if (debug) console.log("pythonImeTypoFixer:init",globalThis.pythonImeTypoFixer)
}}
const getSetting = () => new Promise((resolve) => {
    return chrome.storage.local.get(["setting"], (result) => {
        if (debug) console.log("pythonImeTypoFixer:getSetting",result["setting"]) 
        resolve(result["setting"])}
    ) 
});
//設定をglobalThisに入れる
const updateSetting = (setting: ExtensionSetting) => {
    if (debug) console.log("pythonImeTypoFixer:updateSetting", setting)
    if (!globalThis.pythonImeTypoFixer) {
        init()
    }
    globalThis.pythonImeTypoFixer.setting = setting
}

export {
    init,
    qs,
    qsAll,
    getSetting,
    updateSetting,
    debug
}