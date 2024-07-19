/*
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-15 16:49:04
 * @Description: main
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initRouter } from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import http from './http'

const app = createApp(App)

app.use(ElementPlus)

app.config.globalProperties.$http = http; // 全局挂载http请求方法

// app.use(router)
initRouter(app); // 初始化路由
app.mount('#app')
