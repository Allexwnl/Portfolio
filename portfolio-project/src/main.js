import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/main.css'
import './assets/css/projects.css'
import './assets/css/dashboard.css'
import './assets/css/projectShow.css'
import './assets/css/mobileCss.css'
import './assets/css/techStack.css'
import './assets/css/blogs.css'
import router from './router';

createApp(App).use(router).mount('#app');