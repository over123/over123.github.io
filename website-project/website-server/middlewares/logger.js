/*
 * @Author: xudan
 * @Date: 2024-09-24 18:59:48
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-25 13:46:38
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const config = require("../config")
const fs = require('fs')
const path = require('path')
const log4js = require('log4js')


const logsDir = path.parse(config.logPath).dir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    dateFile: {
      type: 'dateFile',
      filename: config.logPath,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    },
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'info',
    },
  },
})

const logger = log4js.getLogger()

const loggerMiddleware = async (ctx, next) => {
  const start = new Date()
  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips ||
    (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))

  await next()

  const ms = new Date() - start
  const logText = `${remoteAddress} - ${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(
    ctx.request.body
  )}  响应参数： ${JSON.stringify(ctx.body)} - ${ms}ms`
  logger.info(logText)
}

// 创建一个新的日志函数，它会在每条日志前添加 IP 地址
const logWithIp = (ip) => {
  return {
    info: (message) => logger.info(`${ip} - ${message}`),
    error: (message) => logger.error(`${ip} - ${message}`),
    warn: (message) => logger.warn(`${ip} - ${message}`),
    debug: (message) => logger.debug(`${ip} - ${message}`),
  }
}

// 导出方法不变
module.exports = {
  logger,
  loggerMiddleware,
  logWithIp,
}