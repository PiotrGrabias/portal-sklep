import './assets/main.css';
// Plugins
import { registerPlugins } from '@/plugins'
// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'

import { createPinia } from 'pinia'


const app = createApp(App)

const pinia = createPinia()

registerPlugins(app)

app.use(pinia)

app.mount('#app')
