import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification'

import App from './App.vue'
import router from './router'

// Import CSS files
import './assets/main.css'
import "vue-toastification/dist/index.css"

const app = createApp(App)

// Configure Pinia (state management)
app.use(createPinia())

// Configure Vue Router
app.use(router)

// Configure Toast notifications
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false
})

// Initialize auth state
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')