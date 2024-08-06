/*
 * @Author: xudan
 * @Date: 2024-07-23 16:27:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 14:14:59
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { App} from 'vue'
import { ElMessage } from 'element-plus'

// const increment = (params: number) => {
//     console.log('increment')
//     return ++params;
// }

export const registerCommon = (app: App<Element>) => {
    // app.config.globalProperties['$increment'] = increment 
    // app.config.globalProperties.$http = http; // 全局挂载http请求方法
    // app.provide('$increment', increment); // 全局挂载increment方法
    app.provide('$message', ElMessage); // 全局挂载message方法       
}

