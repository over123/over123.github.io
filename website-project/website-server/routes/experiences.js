/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 17:40:38
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { experienceFind, experienceFindOne, experienceUpdate, experienceAdd, experienceDelete } = require('../controller/experiences')

// router.prefix('/user')

/**
 * @description: experience
 * @return {*}
 */
router.post('/experiences', experienceFind)
router.post('/experiences/one', experienceFindOne)
router.post('/experiences/update', experienceUpdate)
router.post('/experiences/add', experienceAdd)
router.post('/experiences/del', experienceDelete)

module.exports = router
