import { ExtensionSetting } from "./types/"

export let pythonImeTypoFixer: {
    setting: ExtensionSetting | undefined,
    functions: {
        isExtensionSetting(value: unknown): value is ExtensionSetting
    }
} = {
    setting: undefined,
    functions: {
        isExtensionSetting: function (value: unknown): value is ExtensionSetting {
            return (
                value != null &&
                typeof value === "object" &&
                'isActive' in value &&
                typeof value.isActive == "boolean"
            );
        }
    }
}
