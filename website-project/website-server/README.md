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
        console.log('数据库连接成功')
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
