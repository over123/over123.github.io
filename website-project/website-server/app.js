/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 19:38:03
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
/** body请求体解析 */
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const cors = require('koa2-cors');

const MongoConnection = require('./db');
const koajwt = require('koa-jwt')
// 连接数据库
MongoConnection();

const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const experiences = require('./routes/experiences')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})




// !!在koa-jwt 和 router前配置跨域
app.use(cors())

app.use(koajwt({
  secret: 'jwt-website-server'
}).unless({
  // 配置路由，不需要经过jwt认证的路由
  path: [/^\/user\/login/,/^\/string/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(experiences.routes(), experiences.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
