/*
 * @Author: xudan
 * @Date: 2024-08-06 12:21:02
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 15:38:14
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import http from "./index";

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
                // authorization: 'Bearer ' + auth_store.user_token,
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
const getExperienceOne = (_id:string): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/experiences/one',
            method: 'post',
            headers: {
                authorization: 'Bearer ' + auth_store.user_token,
            },
            params: {
                _id
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

const delExperience = (_id:string): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/experiences/del',
            method: 'post',
            headers: {
                authorization: 'Bearer ' + auth_store.user_token,
            },
            params: {
                _id
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

const updateExperience = (params:any): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/experiences/update',
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

const addExperience = (params:any): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/experiences/add',
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
    getExperienceList,
    getExperienceOne,
    addExperience,
    delExperience,
    updateExperience
}
