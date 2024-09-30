<!--
 * @Author: xudan
 * @Date: 2024-07-04 19:58:05
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-25 10:43:04
 * @Description: readme.md
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
# 服务端

## 安装koa脚手架

- npm install -g koa-generator

## 创建koa2项目

- koa2 项目名称

## 安装数据库mongo

- npm i mongoose --save

- 导入mongoose模块
- 导出函数
- 使用mongoose.connect连接数据库

```javascript
// db/index.js
// 引入mongoose
const mongoose = require('mongoose');

module.exports = () => {
    /* mongoose.connect('mongodb地址', {
        useNewUrlParser: true, // 创建一个新的集合时，若不存在则自动创建
    }) */
    mongoose.connect('mongodb://127.0.0.1:27017/website').then(() => {
        console.info('数据库连接成功')
    }).catch(err => {
        console.error('数据库连接失败:' + err)
    })
}
```

- app中启动连接数据库
```javascript
// app.js

const MongoConnection = require('./db');
// 连接数据库
MongoConnection();
```


## JWT

- json web token 是开发标准
- 定义了一个紧凑的方式，将各方信息作为JSON对象进行安全传输
- 该信息经过数字签名，可验证和信任

```javascript
// npm install jsonwebtoken --save
```

## koa-multer
- 文件上传模块
```javascript
// npm install koa-multer --save
```

## server端解决跨域问题
```javascript
// app.js
const cors = require('koa2-cors');
// router前配置跨域
app.use(cors())
```