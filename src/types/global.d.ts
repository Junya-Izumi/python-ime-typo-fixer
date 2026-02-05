export {}
declare global {
    interface extensionSetting {
        isActive: boolean
    }
    var python_ime_typo_fixer: {
        setting:extensionSetting | undefined
        functions:object| undefined
    };
}