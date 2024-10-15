/*
 * @Author: xudan
 * @Date: 2024-07-12 11:31:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-12 12:11:24
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const { fetchTopics } = require('../utils/fetchTopics')
const { logger } = require('../middlewares/logger');
const { verify } = require('../middlewares/jwt')

const { add, find, findOne } = require('../utils/crud');
const { Topics, TopicsBackup } = require('../model/topics');


/**
 * @description: 查看topic
 * @param {*} ctx
 * @return {*}
 */
const getTopic = async (ctx) => {
    try {
        const result = verify(ctx);
        let params = ctx.request.body
        console.log(params)
        if (!params.id && params.id != 0) {
            // 获取所有topic数据
            const topics = await find(Topics, null, ctx, {
                needHandle: false,
                exclusion: ['url', 'topicList']
            })
            return
        }

        let { id, subId } = params
        // 获取单个topic分类数据
        const topics = await findOne(
            Topics, { index: id }, ctx, {
            needHandle: params.subId ? true : false,
            exclusion: ['url', 'href', 'content']
        }
        )
        if (params.subId) {
            // 获取单个topic分类下的单个topic
            const topic = topics?.topicList.find(topic => topic.id == subId); // 查找 topicList 中 id 为 subId 的内容
            ctx.body = {
                code: 200,
                msg: '获取topic', // 获取某个分类下个某个topic
                res: topic
            }
        }

    } catch (error) {
        console.log(error)
        ctx.body = {
            code: 500,
            msg: '用户认证失败'
        }
    }
}
/**
 * @description: 爬虫最新topic
 * @param {*} ctx
 * @return {*}
 */
const updateTopic = async (ctx) => {
    try {
        const result = verify(ctx);
        const topics = await fetchTopics(ctx);
        console.log(topics)
        // active collection
        add(Topics, topics, ctx);

        // backup collection
        add(TopicsBackup, topics, ctx);

        ctx.body = {
            code: 200,
            msg: '数据已提取完毕',
        }
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: '用户认证失败'
        }
    }
}
module.exports = {
    getTopic,
    updateTopic
}