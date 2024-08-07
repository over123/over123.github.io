/*
 * @Author: xudan
 * @Date: 2024-08-01 18:31:08
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 11:27:48
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
let Projects = require('../model/projects')
// Import the necessary modules
const crud = require('../utils/crud');

// Create a Koa middleware function to handle the request
const projectFind = async (ctx) => {
    let token = ctx.header.authorization; 
    token = token.replace('Bearer ','');
    try {
        // Set the response body with the user's work project
        const projects = await crul.find(Projects, null ,ctx);
        ctx.body = {
            msg: 'Projects',
            data: projects
        };
    } catch (error) {
        // Handle any errors that occur during the process
        ctx.status = 500;
        ctx.body = 'Error retrieving work project';
    }
};

const projectFindOne = async (ctx) => { 
    const res = await crud.findOne(Projects, {_id: ctx.params.id}, ctx);
    console.log(res)
}

const projectUpdate = async (ctx) => {
    let {_id, ...rest } = ctx.request.body
    await crud.update(Projects, {_id: _id}, { ...rest }, ctx)
}

const projectAdd = async (ctx) => {
    let project = ctx.request.body
    await crud.add(Projects, { ...project }, ctx)
}

const projectDelete = async (ctx) => {
    let { _id } = ctx.request.body
    await crud.del(Projects, { _id }, ctx)
}

// Export the middleware function
module.exports = {
    projectFind,
    projectFindOne,
    projectUpdate,
    projectAdd,
    projectDelete
};