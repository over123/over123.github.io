/*
 * @Author: xudan
 * @Date: 2024-08-06 12:21:02
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 13:44:51
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import http from "./index";

/**
 * @description: 获取用户信息
 * @param {*} params
 * @return {*}
 */
const login = ({ username, pwd }: any): any => {
    // return new Promise((resolve, reject) => {
        http({
            path: '/user/login',
            method: 'post',
            params: {
                username,
                pwd
            }
        }).then((res: any) => {
            if(res.status == 200) {
                return res.data;
                // resolve(res.data);
            }
        }).catch((err: any) => {
            console.log(err);
            // reject();
        })
    // })
}

export {
    login,
}
