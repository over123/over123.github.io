/*
 * @Author: xudan
 * @Date: 2024-07-15 12:06:27
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-30 16:03:09
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import axios, { InternalAxiosRequestConfig } from 'axios'
import { apiServer, debugMode } from '@/common/config'
import { useAuthStore } from '@/stores';
const auth_store = useAuthStore()
import Storage, { storageName } from "@/utils/storage";
const tokenStorage = new Storage(storageName.TOKEN);

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
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 请求拦截需处理的内容
    config.headers['Authorization'] = 'Bearer ' + auth_store.user_token
    return config;
}, (error) => {
    debugMode && console.log('请求失败，' + error);
    return Promise.reject(error);
});

/**
 * @description: 响应拦截
 * @param {*} param1
 * @param {*} param2
 * @return {*}
 */
instance.interceptors.response.use((response) => {
    // 响应拦截需处理的内容
    // ...
    if(response.status == 200 && response.data.code == 200) {
        return response
    }  else {
        tokenStorage.deleteToken();
        auth_store.update('');
    }

    
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
        ).then(res=> {
            debugMode && console.log(res);
            result = res
        }).catch(err => {
            debugMode && console.log(err);
            result = err
        })
    }else if(option.method == 'post'  || option.method == 'put') {
        await instance[option.method](
            option.path || '',
            option.params
        ).then(res=> {
            debugMode && console.log(res);
            result = res
        }).catch(err => {
            debugMode && console.log(err);
            result = err
        })
    }

    return result
}

export default http