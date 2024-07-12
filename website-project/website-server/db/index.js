/*
 * @Author: xudan
 * @Date: 2024-07-11 11:00:10
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-11 17:49:15
 * @Description: connect to the website's database (mongodb)
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

const mongoose = require('mongoose'); 

module.exports = () => {
    /* mongoose.connect('mongodb地址', {
        useNewUrlParser: true, // 创建一个新的集合时，若不存在则自动创建
    }) */
    mongoose.connect('mongodb://127.0.0.1:27017/website').then(() => {
        console.log('数据库连接成功')
    }).catch(err => {
        console.error('数据库连接失败:' + err)
    })
} 