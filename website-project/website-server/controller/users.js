/*
 * @Author: xudan
 * @Date: 2024-07-12 11:31:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-14 17:50:18
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const bcrypt = require('bcryptjs');
const { logger } = require('../middlewares/logger');
/* The fast, flexible & elegant library for parsing and manipulating HTML and XML. */
const cheerio = require('cheerio');

const { sign, verify } = require('../middlewares/jwt')
const { saltRounds } = require('../config')


let Users = require('../model/users')
let http = require('../http');

const { add, find, findOne, update } = require('../utils/crud');

/**
 * @description: login for users
 * @return {*}
 */
const login = async (ctx) => {
    let { username, pwd } = ctx.request.body
    let user = null;
    try {
        user = await findOne(Users, { username }, ctx, {
            needHandle: true
        })
        if (!user) {
            // 若不存在此用户，则创建该用户
            // TODO 密码加密加盐处理
            // const pwdHash = bcrypt.hashSync(pwd, saltRounds);
            // ...
            ctx.body = {
                code: 200,
                msg: '未注册用户'
            }
            return;
            // user = await add(Users, { username, pwd: pwdHash }, ctx, true)

        } else {

            // 验证密码是否正确

            const pwdHash = bcrypt.hashSync(pwd, saltRounds);
            const correctAccount = bcrypt.compareSync(user.pwd, pwdHash); // true
            if (!correctAccount) {
                ctx.body = {
                    code: 200,
                    msg: '用户名或密码错误'
                }
                return;
            }

            let token = sign({
                username: user.username,
                _id: user._id
            })

            ctx.body = {
                code: 200,
                msg: 'Welcome',
                res: token.token
            }
        }

    } catch (error) {
        logger.error(error)
        ctx.body = {
            code: 401,
            msg: '登录失败'
        }
    }


}

/**
 * @description: update password for user - 修改密码
 * @param {*} ctx
 * @return {*}
 */
const updatePwd = async (ctx) => {
    try {
        const { username, pwd } = ctx.request.body;
        const result = verify(ctx);
        await update(Users, { username }, { pwd }, ctx)


    } catch (error) {


        ctx.body = {
            code: 500,
            msg: '用户认证失败'
        }
    }


}

const updatePersonal = async (ctx) => {
    let user = ctx.request.body
    await update(Users, { _id: user._id }, {
        avatar: user.avatar,
        sex: user.sex,
        desc: user.desc,
        phone: user.phone,
        email: user.email
    }, ctx)
}

const getSchedules = async (ctx) => {
    let user = ctx.request.body;
    logger.info('current user: ' + user);

    await http({
        path: 'http://www.speak8.com/plugin.php?id=strong_yyyuyue&mobile=2',
        method: 'get'
    }).then((res) => {
        logger.info(res.data);

        // format res.data
        const $ = cheerio.load(res.data);
        const yuyumenuContent = $('#yuyumenu').html();

        logger.info(yuyumenuContent)

        ctx.body = {
            code: 200,
            data: yuyumenuContent
        };
    })
}

module.exports = {
    login,
    updatePwd,
    updatePersonal,
    getSchedules
}