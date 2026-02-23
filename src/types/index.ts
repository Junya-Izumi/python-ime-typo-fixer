export interface ExtensionSetting {
    isActive: boolean
}

export interface PythonImeTypoFixer {
    setting: ExtensionSetting | undefined
    functions: {
        isExtensionSetting(value: unknown): value is ExtensionSetting;
    } | undefined
};
