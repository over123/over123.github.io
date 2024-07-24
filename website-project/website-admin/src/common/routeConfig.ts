/*
 * @Author: xudan
 * @Date: 2024-07-23 16:09:47
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-24 17:56:40
 * @Description: routes data
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const routeData = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('@/views/Home/index.vue'),
        children: [
            {
                path: '/users/personal',
                name: 'UserPersonal',
                component: () => import('@/views/User/personal.vue'),
                meta: {
                    title: '个人资料'
                }
            },
            {
                path: '/users/password',
                name: 'UserPassword',
                component: () => import('@/views/User/password.vue'),
                meta: {
                    title: '修改密码'
                }
            },
            {
                path: '/users/schedules',
                name: 'UserSchedules',
                component: () => import('@/views/User/schedules.vue'),
                meta: {
                    title: '日程安排'
                }
            }
        ],
        meta: {
            requiresAuth: true,
            title: '个人中心'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
            requiresAuth: false
        }
    },
]

export default routeData;