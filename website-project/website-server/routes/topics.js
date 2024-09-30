/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-30 11:32:08
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { topics } = require('../controller')
router.prefix('/topic')

/**
 * @description: 查看topics
 * @return {*}
 */
router.post('/list', topics.getTopic)

/**
 * @description: 更新topics
 * @return {*}
 */
router.post('/update', topics.updateTopic)

// 主题相关路由
router.get('/topics', async (ctx) => {
    ctx.body = 'Topics list';
});

module.exports = router
