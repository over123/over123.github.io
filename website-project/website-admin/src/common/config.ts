/*
 * @Author: xudan
 * @Date: 2024-07-23 16:27:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-23 19:01:24
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { App} from 'vue'
import http from '@/http'

// const instance = await getCurrentInstance();
// const $http = instance?.appContext.config.globalProperties.$http;

const increment = (params: number) => {
    console.log('increment')

    return ++params;
}

export const registerCommon = (app: App<Element>) => {
    // app.config.globalProperties['$increment'] = increment 
    app.config.globalProperties.$http = http; // 全局挂载http请求方法

    app.provide('$increment', increment)
}
