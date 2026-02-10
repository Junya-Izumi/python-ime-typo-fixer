import { defineConfig } from 'vite'
import {crx} from '@crxjs/vite-plugin' 
import manifest from "./src/manifest.json";

export default defineConfig({
    plugins:[
        crx({manifest})
    ],
    root: process.cwd(),
    // publicDir: 'src/static',
    build: {
        sourcemap:true,
        // outDir: "dist",
        // emptyOutDir: true,
        rollupOptions: {
            // input: {
            //     popup: 'src/ts/popup.ts',
            //     content: 'src/ts/content.ts',
            //     background: 'src/ts/background.ts'
            // },
            // output: {
            //     format:"iife",
            //     // manualChunks:undefined,
            //     // entryFileNames: "[name].js",
            // }
        },
        minify: 'terser'
    }
})
