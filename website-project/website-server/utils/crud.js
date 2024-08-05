/*
 * @Author: xudan
 * @Date: 2024-07-12 11:51:54
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-12 12:19:31
 * @Description: crud module
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

/**
 * 用于查找的公共方法
 * @description: find module
 * @return {*}
 */
const find = (model, where, ctx) => {
    return model.find(where).then((res)=>{
        ctx.body = {
            code: 200,
            msg: '查找成功',
            res
        }
    }).catch (error => {
        ctx.body = {
            code: 400,
            msg: '查找异常',
        } 
    })
}

/**
* @description: 用于查询单个的公共模块
* @param {*} model
* @param {*} where
* @param {*} ctx - 上下文对象
* @return {*}
*/
const findOne = (model, where, ctx) => {
return model.findOne(where).then((res)=>{
    ctx.body = {
        code: 200,
        msg: '查找成功',
        res
    }
}).catch (error => {
    ctx.body = {
        code: 400,
        msg: '查找异常',
    } 
})
}

/**
* @description: 用户添加的公共方法 add module
* @param {*} model - 数据模型
* @param {*} where - 条件
* @param {*} ctx
* @param {*} msg
* @param {*} res
* @return {*}
*/
const add = async (model, where, ctx) => {
return model.create(where).then((res)=>{
    ctx.body = {
        code: 200,
        msg: '添加成功',
        res
    }
}).catch (error => {
    ctx.body = {
        code: 400,
        msg: '添加异常',
    } 
})
}

/**
* @description: 用于修改的公共模块
* @param {*} model
* @param {*} where
* @param {*} params
* @param {*} ctx
* @return {*}
*/
const update =  (model, where, params, ctx) => {
return model.updateOne(where,params).then((res)=>{
    ctx.body = {
        code: 200,
        msg: '修改成功',
        res
    }
}).catch (error => {
    ctx.body = {
        code: 400,
        msg: '修改异常',
    } 
})
}

/**
* @description: 用于删除的公共模块
* @param {*} model
* @param {*} where
* @param {*} ctx
* @return {*}
*/
const del =  (model, where, ctx) => {
return model.findOneAndDelete(where).then((res)=>{
    ctx.body = {
        code: 200,
        msg: '删除成功',
        res
    }
}).catch (error => {
    ctx.body = {
        code: 400,
        msg: '删除异常',
    } 
})

}

module.exports = {
    find,
    findOne,
    add,
    update,
    del
}