/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 11:33:00
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { projectFind, projectFindOne, projectUpdate, projectAdd, projectDelete } = require('../controller/projects')

// router.prefix('/user')

/**
 * @description: project
 * @return {*}
 */
router.post('/projects', projectFind)
router.post('/projects/one', projectFindOne)
router.post('/projects/update', projectUpdate)
router.post('/projects/add', projectAdd)
router.post('/projects/del', projectDelete)

module.exports = router
