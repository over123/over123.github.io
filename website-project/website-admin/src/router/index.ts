/*
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 15:15:01
 * @Description: router
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
import { isLoggedIn } from '@/utils'
import { routeData } from '@/common/routeConfig'

const routes: RouteRecordRaw[] = routeData

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth && !await isLoggedIn() ) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        return {
            path: '/login',
            // 保存我们所在的位置，以便以后再来
            query: { redirect: to.fullPath },
        }
    }
})

export const initRouter = (app: App<Element>) => {
    app.use(router)
}
