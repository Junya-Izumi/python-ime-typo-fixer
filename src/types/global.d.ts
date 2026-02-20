export {}
declare global {
    interface ExtensionSetting {
        isActive: boolean
    }
    var pythonImeTypoFixer: {
        setting:ExtensionSetting | undefined
        functions:{
            isExtensionSetting(value:unknown):value is ExtensionSetting;
        }| undefined
    };
}