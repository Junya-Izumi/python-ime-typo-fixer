
export const qs = (selector: string, parent = document): Element | null => parent.querySelector(selector);

export const qsAll = (selector: string, parent = document): NodeListOf<Element> | null => parent.querySelectorAll(selector);

