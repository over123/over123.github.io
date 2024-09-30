/*
 * @Author: xudan
 * @Date: 2024-07-11 11:00:10
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-25 14:05:23
 * @Description: connect to the website's database (mongodb)
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

const mongoose = require('mongoose');
const { logger } = require('../middlewares/logger');
const { mongoDB } = require('../config');

const MongoConnection = () => {
    const { host, port, db, user, pass, authSource } = mongoDB;
    let uri;

    if (user && pass) {
        // 如果提供了用户名和密码，使用认证连接字符串
        uri = `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}`;
    } else {
        // 如果没有提供用户名和密码，使用无认证连接字符串
        uri = `mongodb://${host}:${port}/${db}`;
    }

    // 如果提供了 authSource，添加到连接字符串
    if (authSource) {
        uri += `?authSource=${authSource}`;
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        logger.info('数据库连接成功');
    }).catch(err => {
        logger.error('数据库连接失败: ' + err);
    });
}

module.exports = MongoConnection;