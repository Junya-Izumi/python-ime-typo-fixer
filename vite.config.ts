import { defineConfig } from 'vite'

export default defineConfig({
    root: process.cwd(),
    publicDir:'src/static',
    build:{
        outDir:"dist",
        emptyOutDir:true,
        rollupOptions:{
            input:{
                popup:'src/ts/popup.ts',
                content:'src/ts/content.ts',
                background:'src/ts/background.ts'
            },
            output:{
                entryFileNames:"[name]/[name].js"
            }
        },
        minify:false
    }
})
