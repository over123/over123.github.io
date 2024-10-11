/*
 * @Author: xudan
 * @Date: 2024-09-25 10:29:49
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-11 14:54:59
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const path = require('path')

const PROJECT_NAME = 'website-server'

/** 第三方API开发接口 */
// const serverDevelop = 'https://www.website.com/api/';
/** 第三方API生产接口 */
// const serverRelease = 'https://www.website.com/api/';

module.exports = {
    name: PROJECT_NAME,
    //   port: '8881',
    jwtOpt: {
        conf: {
            secret: 'jwt-website-server',
            expired: 60 * 60 * 0.5, //0.5h
            refresh: 60 * 60 * 1, // 1h
        },
        unless: {
            // 配置路由，不需要经过jwt认证的路由
            path: [/^\/user\/login/, /^\/string/]
        }
    },
    encrypt: { // 登录密码处理
        saltRounds: 10
    }, // 是否使用加密算法处理密码，默认不处理
    publicDir: path.resolve(__dirname, '../public'), // 资源文件路径
    //   viewsDir: path.resolve(__dirname, './views'), // 静态页面文件路径
    logPath: path.resolve(__dirname, `../logs/${PROJECT_NAME}`), // 日志文件路径
    mongoDB: {
        // host: '127.0.0.1',
        host: '65.49.193.148',
        port: 27017,
        db: 'website',
        authSource: 'admin',
        user: '',  // 添加用户名
        pass: '',  // 添加密码
    },
    ipAddress: (ctx) => {
        return ctx.request.ip
    },
    version: 'v1',
    enableDebug: false,
    server: {
        /** 第三方API服务器 */
        // httpServer: process.env.NODE_ENV == 'development' ? serverDevelop : serverRelease,
        /** 资源服务器 */
        // srcServer: isRelease ? srcRelease : srcDevelop,
    }
}