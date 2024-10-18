/*
 * @Author: xudan
 * @Date: 2024-08-06 12:21:02
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 15:35:30
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
const getProjectList = (): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/projects',
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
const getProjectOne = (_id:string): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/projects/one',
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

const delProject = (_id:string): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/projects/del',
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

const updateProject = (params:any): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/projects/update',
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

const addProject = (params:any): any => {
    return new Promise((resolve, reject) => {
        http({
            path: '/projects/add',
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
    getProjectList,
    getProjectOne,
    addProject,
    delProject,
    updateProject
}
