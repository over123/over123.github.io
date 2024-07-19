/*
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-17 16:26:11
 * @Description: router
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'
const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/Home/index.vue'),
        children: [
            {
                path: '/users/personal',
                name: 'UserPersonal',
                component: () => import('../views/User/personal.vue'),
                meta: {
                    title: '个人资料'
                }
            },
            {
                path: '/users/password',
                name: 'UserPassword',
                component: () => import('../views/User/password.vue'),
                meta: {
                    title: '修改密码'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export const initRouter = (app: App<Element>) => {
    app.use(router)
}

// export default router