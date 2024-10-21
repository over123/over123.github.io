/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 15:28:37
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const fs = require("fs");
const Router = require('koa-router');
const { version } = require("../config")
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

    router.get('/', async (ctx) => {
      await ctx.render('index', {
        title: 'title  ' + version + " - " + new Date().toISOString().split('T')[0],
      });
    });

    app.use(router.routes()).use(router.allowedMethods());
  });
};