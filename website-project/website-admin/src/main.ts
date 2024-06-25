import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initRouter } from './router'

const app = createApp(App)
// app.use(router)
initRouter(app); // 初始化路由
app.mount('#app')
