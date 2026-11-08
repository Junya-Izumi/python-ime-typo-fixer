import { defineConfig } from 'wxt';

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
    srcDir: "src",
    outDir: "dist",
    outDirTemplate: '',//サブディレクトリを作らず、dist/直下に出力する
    dev: {
        // reloadCommand: false
    },
    manifest: {
        name: "pyてょん to python",
        short_name: "pyてょん to python",
        description: "「pyてょん」と誤変換したものを変換確定後に「python」と自動で変換します",
        version: "2.1.0",
        permissions: ["storage"],
        action: {
            default_popup: "popup.html"
        },
        content_scripts: [
            {
                matches: ["https://*/*", "http://*/*"],
                js: ["content-scripts/content.js"],
                run_at: "document_idle"
            }
        ],
        web_accessible_resources: [
            {
                matches: ["http://*/*", "https://*/*"],
                resources: ["**/*.js"]
            }
        ]
    }
});
