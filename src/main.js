import 'boxicons/css/animations.css'
import 'boxicons/css/boxicons.css'
import 'boxicons/css/transformations.css'
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import { plugin as vueTransitionsPlugin } from '@morev/vue-transitions'
import '@morev/vue-transitions/styles'

const intervalMS = 60 * 60 * 1000

const updateServiceWorker = useRegisterSW({
  onRegistered(serviceWorker) {
    serviceWorker &&
      setInterval(() => {
        serviceWorker.update()
      }, intervalMS)
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  vueTransitionsPlugin({
    // Plugin options (optional, described below)
  })
)
app.mount('#app')
