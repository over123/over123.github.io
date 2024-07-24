/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-24 11:31:10
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { login, verify, updatePwd, updatePersonal, getSchedules } = require('../controller/users')

router.prefix('/user')

/**
 * @description: 添加用户
 * @return {*}
 */
router.post('/login', login)

/**
 * @description: 用户登录状态验证
 * @return {*}
 */
router.post('/verify', verify)

/**
 * @description: 用户密码修改
 * @return {*}
 */
router.post('/update/pwd', updatePwd)

/**
 * @description: 用户資料修改
 * @return {*}
 */
router.post('/update/personal', updatePersonal)


/**
 * @description: 用户日程表
 * @return {*}
 */
router.post('/schedules', getSchedules)



module.exports = router
