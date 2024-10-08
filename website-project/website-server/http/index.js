/*
 * @Author: xudan
 * @Date: 2024-07-15 12:06:27
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-25 10:45:23
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
let axios = require('axios')
const { logger } = require('../middlewares/logger');

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
    logger.info('请求失败，' + error)
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
    logger.info('响应失败，' + error)
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
async function http(option = {}) {
    let result = null;

    if (option.method == 'get' || option.method == 'delete') {
        await instance[option.method](
            option.path || '', // Provide a default value for option.path
            {
                params: option.params
            }
        ).then(res => {
            logger.info(res);
            result = res
        }).catch(err => {
            logger.info(err);
            result = err
        })
        // return instance.get(option.path || '', {params: option.params}) // Provide a default value for option.path
    } else if (option.method == 'post' || option.method == 'put') {
        await instance[option.method](
            option.path || '',
            option.params
        ).then(res => {
            logger.info(res);
            result = res
        }).catch(err => {
            logger.info(err);
            result = err
        })
    }

    return result
}

module.exports = http