import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import webfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf,eot,woff}']
      },
      includeAssets: ['**/*.{js,css,html,ico,png,svg,woff2,ttf,eot,woff}'],
      manifest: {
        name: 'Paytrack',
        short_name: 'Paytrack',
        icons: [
          {
            src: '/android-chrome-36x36.png',
            sizes: '36x36',
            type: 'image/png'
          },
          {
            src: '/android-chrome-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/android-chrome-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/android-chrome-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/android-chrome-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone'
      }
    }),
    webfontDownload([
      'https://api.fontshare.com/v2/css?f[]=pally@400,500,700&display=swap',
      'https://api.fontshare.com/v2/css?f[]=manrope@200,300,400,500,600,700,800&display=swap'
    ])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      $: fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  }
})
