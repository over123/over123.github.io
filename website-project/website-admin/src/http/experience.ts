/*
 * @Author: xudan
 * @Date: 2024-08-06 12:21:02
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 17:46:11
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import http from "./index";
import { useAuthStore } from '@/stores';
const auth_store = useAuthStore()

/**
 * @description: get business experience
 * @param {*} params
 * @return {*}
 */
const getExperienceList = (): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/experiences',
            method: 'post',
            headers: {
                authorization: 'Bearer ' + auth_store.user_token,
            },
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
    getExperienceList,
}
