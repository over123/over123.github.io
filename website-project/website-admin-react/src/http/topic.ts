/*
 * @Author: xudan
 * @Date: 2024-08-06 12:21:02
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 15:35:21
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import http from "./index";
// import { useAuthStore } from '@/store';
// const auth_store = useAuthStore()

/**
 * @description: get business project
 * @param {*} params
 * @return {*}
 */

const getTopicTabs = (): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/topic/list',
            method: 'post',
            headers: {
                // authorization: 'Bearer ' + auth_store.user_token,
            }
        }).then((res: any) => {
            if(res.status == 200) {
                resolve(res.data);
            }
        }).catch((err: any) => {
            console.log(err);
            reject();
        })
    })
}
const getTopicList = (params: Object): any => {
    console.log(params)
    return new Promise((resolve, reject) => {
        http({
            path: '/topic/list',
            method: 'post',
            headers: {
                authorization: 'Bearer ' + auth_store.user_token,
            },
            params
        }).then((res: any) => {
            if(res.status == 200) {
                resolve(res.data);
            }
        }).catch((err: any) => {
            console.log(err);
            reject();
        })
    })
}


export {
    getTopicTabs,
    getTopicList
}
