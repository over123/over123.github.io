/*
 * @Author: xudan
 * @Date: 2024-07-15 12:06:27
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-16 14:51:56
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import axios from 'axios'

let instance = axios.create({
    baseURL: 'http://localhost:3000',
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
    console.log('请求失败，' + error)
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
    console.log('响应失败，' + error)
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
            console.log(res);
            result = res
        }).catch(err => {
            console.log(err);
            result = err
        })
        // return instance.get(option.path || '', {params: option.params}) // Provide a default value for option.path
    }else if(option.method == 'post'  || option.method == 'put') {
        await instance[option.method](
            option.path || '',
            option.params
        ).then(res=> {
            console.log(res);
            result = res
        }).catch(err => {
            console.log(err);
            result = err
        })
    }

    return result
}

export default http