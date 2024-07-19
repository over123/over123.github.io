/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-18 16:02:02
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { login, verify, updatePwd } = require('../controller/users')

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

module.exports = router
