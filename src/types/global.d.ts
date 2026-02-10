export {}
declare global {
    interface ExtensionSetting {
        isActive: boolean
    }
    var python_ime_typo_fixer: {
        setting:ExtensionSetting | undefined
        functions:{
            isExtensionSetting(value:unknown):value is ExtensionSetting;
        }| undefined
    };
}