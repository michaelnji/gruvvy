import './assets/main.css'
import 'primeicons/primeicons.css'
import 'boxicons/css/boxicons.css'
import 'boxicons/css/animations.css'
import 'boxicons/css/transformations.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const intervalMS = 60 * 60 * 1000

const updateServiceWorker = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
      }, intervalMS)
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
