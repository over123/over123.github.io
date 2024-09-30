/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-27 11:28:48
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const fs = require("fs");
const Router = require('koa-router');
const router = new Router();
router.prefix('');

console.log(`processing routes ...`)

module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === "index.js") {
      return;
    }
    const router = require(`./${file}`)
    router[`${file.replace(/\.js/, '')}`] = router

    app.use(router.routes()).use(router.allowedMethods());
  });
};