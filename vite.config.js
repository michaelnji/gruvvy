import { fileURLToPath, URL } from 'node:url'
// import webfontDownload from 'vite-plugin-webfont-dl';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    //  webfontDownload(["https://api.fontshare.com/v2/css?f[]=pally@400,500,700&display=swap"])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$': fileURLToPath(new URL('./src/lib', import.meta.url)),
    }
  }
})
