/*
 * @Author: xudan
 * @Date: 2024-07-15 12:06:27
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 13:40:50
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import axios from 'axios'
import { apiServer, debugMode } from '@/common/config'

// console.log(apiServer)
let instance = axios.create({
    baseURL: apiServer,
    timeout: 5000, // 超时时长
})

/**
 * @description: 请求拦截
 * @param {*} param1
 * @param {*} param2
 * @return {*}
 */
instance.interceptors.request.use((config) => {
    // 请求拦截需处理的内容
    // ...
    return config
}, (error) => {
    debugMode && console.log('请求失败，' + error)
    return Promise.reject(error)
})

/**
 * @description: 响应拦截
 * @param {*} param1
 * @param {*} param2
 * @return {*}
 */
instance.interceptors.response.use((response) => {
    // 响应拦截需处理的内容
    // ...
    return response
}, (error) => {
    debugMode && console.log('响应失败，' + error)
    return Promise.reject(error)
})

/**
 * @description: 封装http请求
 * @param {*} option 配置对象，属性包括:
 * path: 请求地址,
 * method: 请求方法,
 * params: 请求数据,
 * @return {*}
 */
async function http(option: { method?: string, path?: string, params?: any } = {}) {
    let result = null;
    
    if(option.method == 'get'  || option.method == 'delete') {
        await instance[option.method](
            option.path || '', // Provide a default value for option.path
            {
                params: option.params
            }
        ).then(res=> {
            debugMode && console.log(res);
            result = res
        }).catch(err => {
            debugMode && console.log(err);
            result = err
        })
        // return instance.get(option.path || '', {params: option.params}) // Provide a default value for option.path
    }else if(option.method == 'post'  || option.method == 'put') {
        await instance[option.method](
            option.path || '',
            option.params
        ).then(res=> {
            debugMode && console.log(res.data);
            result = res
        }).catch(err => {
            debugMode && console.log(err);
            result = err
        })
    }

    return result
}

export default http