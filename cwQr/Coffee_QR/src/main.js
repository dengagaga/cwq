import './style/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

const api = axios.create({
  baseURL: 'https://localhost:5173'
})

export default api
