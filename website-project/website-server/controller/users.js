/*
 * @Author: xudan
 * @Date: 2024-07-12 11:31:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-18 17:03:52
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const jwt = require('jsonwebtoken');

let Users = require('../model/users')

/**
 * @description: login for users
 * @return {*}
 */
const login = async (ctx) => {
    let { username, pwd } = ctx.request.body
    let user = null;
    try {
        user = await Users.findOne({username, pwd})
        // if(!user) {
        //     user = await Users.create({ username: username, password: pwd})
        // }else {
            
        // }

        let token = jwt.sign({
            username: user.username,
            _id: user._id
        }, 'jwt-website-server', {
            expiresIn: 3600 * 24 * 7
        }) 

        ctx.body = {
            code: 200,
            msg: 'Welcome',
            token
        }
    } catch (error) {
        ctx.body = {
            code: 401,
            msg: '登录失败'
        }
    }
    
    
}

/**
 * @description: verify status of the user - 验证登录状态
 * @param {*} ctx
 * @return {*}
 */
const verify = async (ctx) => {
    let token = ctx.header.authorization
    token = token.replace('Bearer ','')
    try {
        const result = jwt.verify(token, 'jwt-website-server');
        const user = await Users.findOne({_id: result._id})
        ctx.body = {
            code: 200,
            msg: '用户认证成功',
            user: user
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: '用户认证失败'
        }
    }
}
/**
 * @description: update password for user - 修改密码
 * @param {*} ctx
 * @return {*}
 */
const updatePwd = async (ctx) => {
    const { username, pwd } = ctx.request.body;

    const result = await Users.updateOne({ username }, { pwd });

    console.log(result)
    if(result.modifiedCount > 0) {
        ctx.body = {
            code: 200,
            msg: '修改成功',
        }
    }
}

module.exports = {
    login,
    verify,
    updatePwd
}