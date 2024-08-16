/*
 * @Author: xudan
 * @Date: 2024-07-23 16:09:47
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-12 13:45:11
 * @Description: routes data
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */


const routes = [
    {
        menu: 'member',
        title: 'Member Center',
        children: [
            {
                menu: 'personal',
                name: 'UserPersonal',
                path: '/users/personal',
                component: () => import('@/views/User/personal.vue'),
                meta: {
                    title: '个人资料'
                }
            },
            {
                menu: 'password',
                name: 'UserPassword',
                path: '/users/password',
                component: () => import('@/views/User/password.vue'),
                meta: {
                    title: '修改密码'
                }
            }
        ]
    },
    {
        menu: 'experience',
        title: 'Project & Experience',
        children: [
            {
                menu: 'experience',
                name: 'UserExperience',
                path: '/users/experience',
                component: () => import('@/views/Experience/index.vue'),
                meta: {
                    title: '工作经历'
                }
            },
            {
                menu: 'project',
                name: 'UserProject',
                path: '/users/project',
                component: () => import('@/views/Project/index.vue'),
                meta: {
                    title: '项目经验'
                }
            }
        ]
    },
    {
        menu: 'schedule',
        title: 'Daily Schedule',
        children: [
            {
                menu: 'schedules',
                name: 'UserSchedules',
                path: '/users/schedules',
                component: () => import('@/views/Schedule/index.vue'),
                meta: {
                    title: '日程安排'
                }
            }
        ]
    },
]


const routeData = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('@/views/Home/index.vue'),
        children: [...routes.flatMap(route => route.children)],
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

export { routes, routeData };