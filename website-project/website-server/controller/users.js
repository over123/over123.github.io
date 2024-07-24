/*
 * @Author: xudan
 * @Date: 2024-07-12 11:31:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-24 11:42:30
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const jwt = require('jsonwebtoken');
/* The fast, flexible & elegant library for parsing and manipulating HTML and XML. */
const cheerio = require('cheerio');

let Users = require('../model/users')
let http = require('../http');

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

const updatePersonal = async (ctx) => {
    let user = ctx.request.body

    const result = await Users.updateOne({_id: user._id}, {
        avatar: user.avatar,
        sex: user.sex,
        desc: user.desc,
        phone: user.phone,
        email: user.email
    })

    if(result.modifiedCount > 0) {
        ctx.body = {
            code: 200,
            msg: '資料修改成功',
        }
    }else {
        ctx.body = {
            code: 300,
            msg: '資料修改失敗',
        }
    }
}

const getSchedules = async (ctx) => {
    let user = ctx.request.body;
    console.log('current user: ' + user);

    await http({
        path: 'http://www.speak8.com/plugin.php?id=strong_yyyuyue&mobile=2',
        method: 'get'
    }).then((res)=>{
        console.log(res.data);

        // format res.data
        const $ = cheerio.load(res.data);
        const yuyumenuContent = $('#yuyumenu').html();

        console.log(yuyumenuContent)

        ctx.body = {
            code: 200,
            data: yuyumenuContent
        };
    })
}

module.exports = {
    login,
    verify,
    updatePwd,
    updatePersonal,
    getSchedules
}