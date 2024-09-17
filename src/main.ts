import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-bootstrap.css';

import router from './routes'

const app = createApp(App)
app.use(ToastPlugin);
app.use(router)
app.mount('#app')
