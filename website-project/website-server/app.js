/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-27 12:21:03
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
// const logger = require('koa-logger')
const { logger, loggerMiddleware, logWithIp } = require('./middlewares/logger')
const { jwtOpt, ipAddress } = require('./config')
const cors = require('koa2-cors');

// Logger middleware
app.use(loggerMiddleware)

const MongoConnection = require('./db');
const koajwt = require('koa-jwt')
// 连接数据库
MongoConnection();

// error handler
onerror(app)

// middlewares
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// !! cors跨域需在koa-jwt 和 router前配置跨域
app.use(cors())

/** 路由 */
const routing = require("./routes");
/**先挂载参数解析中间件，再配置路由 */
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// !! koa-jwt 的权限逻辑需放在 koajwt 配置前
// app.use(async (ctx, next) => {
//   if (ctx.path === '/user/login') { // 假设登录路由为 '/login'
//     await next(); // 如果是登录路由，直接放行
//   } else {
//     if (ctx.state.user) {
//       await next(); // 如果有用户信息，放行
//     } else {
//       console.log(ctx.status)
//       // if (ctx.status = 401) {
//       //   ctx.body = {
//       //     code: 401,
//       //     msg: 'Authentication Error: Invalid or expired token' // 返回未授权信息
//       //   };
//       // }

//     }
//   }
// });

// !! koajwt 配置需放在router前
// app.use(koajwt({
//   ...jwtOpt.conf
// }).unless({
//   ...jwtOpt.unless
// }))

routing(app);

// error-handling
// app.on('error', (err, ctx) => {
//   logger.error('server error', err, ctx)
//   if (err.name === 'UnauthorizedError') {
//     ctx.status = 401;
//     ctx.body = {
//       code: 401,
//       msg: 'Authentication Error: Invalid or expired token'
//     };
//   }
// });

// 将 logWithIp 挂载到全局，而不是直接挂载 logger
// global.logger = logWithIp('Global')  // 'Global' 是一个默认值，表示这是全局日志

// 现在可以这样使用全局 logger
// global.logger.info('应用启动')

module.exports = app
