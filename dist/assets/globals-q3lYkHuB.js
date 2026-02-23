const e=!1,t=(e,t=document)=>t.querySelector(e),o=()=>new Promise(e=>chrome.storage.local.get(["setting"],t=>{e(t.setting)})),s=e=>{chrome.storage.local.set({setting:e})},a=e=>null!=e&&"object"==typeof e&&"isActive"in e&&"boolean"==typeof e.isActive;export{e as d,o as g,a as i,t as q,s as u};
//# sourceMappingURL=globals-q3lYkHuB.js.map
