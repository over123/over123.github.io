/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-27 11:51:28
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { users } = require('../controller')

router.prefix('/user')

/**
 * @description: 用户登录
 * @return {*}
 */
router.post('/login', users.login)


/**
 * @description: 用户登录状态验证
 * @return {*}
 */
// router.post('/verify', verify)

/**
 * @description: 用户密码修改
 * @return {*}
 */
router.post('/update/pwd', users.updatePwd)

/**
 * @description: 用户資料修改
 * @return {*}
 */
router.post('/update/personal', users.updatePersonal)


/**
 * @description: 用户日程表
 * @return {*}
 */
router.post('/schedules', users.getSchedules)

module.exports = router
