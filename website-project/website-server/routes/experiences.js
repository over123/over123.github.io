/*
 * @Author: xudan
 * @Date: 2024-07-04 19:57:46
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-01 19:11:09
 * @Description: Routes for User
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')()
const { getExperiences } = require('../controller/experiences')

router.prefix('/user')

/**
 * @description: experience
 * @return {*}
 */
router.post('/experiences', getExperiences)

module.exports = router
