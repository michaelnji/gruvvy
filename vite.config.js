import { fileURLToPath, URL } from 'node:url'
import webfontDownload from 'vite-plugin-webfont-dl';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
     webfontDownload(["https://api.fontshare.com/v2/css?f[]=excon@400,900,700,500,300,100,1&f[]=ranade@700,300,2,701,401,101,100,400,1,500,501,301&display=swap"])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$': fileURLToPath(new URL('./src/lib', import.meta.url)),
    }
  }
})
