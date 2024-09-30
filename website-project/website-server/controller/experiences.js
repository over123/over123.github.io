/*
 * @Author: xudan
 * @Date: 2024-08-01 18:31:08
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-25 10:44:08
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
let Experiences = require('../model/experiences')
const { logger } = require('../middlewares/logger');
// Import the necessary modules
const crud = require('../utils/crud');

// Create a Koa middleware function to handle the request
const experienceFind = async (ctx) => {
    let token = ctx.header.authorization;
    token = token.replace('Bearer ', '');
    try {
        // Set the response body with the user's work experience
        const experiences = await crud.find(Experiences, null, ctx);
        // logger.info(experiences)
        // ctx.body = {
        //     msg: 'Experiences',
        //     data: experiences
        // };
    } catch (error) {
        // Handle any errors that occur during the process
        ctx.status = 500;
        ctx.body = 'Error retrieving work experience';
    }
};

const experienceFindOne = async (ctx) => {
    const res = await crud.findOne(Experiences, { _id: ctx.params.id }, ctx);
    logger.info(res)
}

const experienceUpdate = async (ctx) => {
    let { _id, ...rest } = ctx.request.body
    await crud.update(Experiences, { _id: _id }, { ...rest }, ctx)
}

const experienceAdd = async (ctx) => {
    let experience = ctx.request.body
    await crud.add(Experiences, { ...experience }, ctx)
}

const experienceDelete = async (ctx) => {
    let { _id } = ctx.request.body
    await crud.del(Experiences, { _id }, ctx)
}

// Export the middleware function
module.exports = {
    experienceFind,
    experienceFindOne,
    experienceUpdate,
    experienceAdd,
    experienceDelete
};