/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-12 19:47:19
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()

const UserController = require('../controller/user')

router.prefix('/user')

/**
 * @description: 添加用户
 * @return {*}
 */
router.post('/add', UserController.userAdd)

/**
 * @description: 更新用户/修改用户
 * @return {*}
 */
router.post('/update', UserController.userUpdate)

/**
 * @description: 删除用户
 * @return {*}
 */
router.post('/del', UserController.userDelete)

/**
 * @description: 查找所有用户
 * @return {*}
 */
router.get('/find', UserController.userFind)


/**
 * @description: 查找用户
 * @return {*}
 */
router.get('/find/:id', UserController.userFindOne)


module.exports = router
