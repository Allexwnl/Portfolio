import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/main.css'
import './assets/css/projects.css'
import './assets/css/dashboard.css'
import './assets/css/projectShow.css'
import router from './router';

createApp(App).use(router).mount('#app');