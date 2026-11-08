import type { ExtensionSetting } from "../types";

export function isExtensionSetting(value: unknown): value is ExtensionSetting {
    return (
        value != null &&
        typeof value === "object" &&
        'isActive' in value &&
        typeof value.isActive == "boolean"
    );
}
