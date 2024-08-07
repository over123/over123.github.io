/*
 * @Author: xudan
 * @Date: 2024-07-11 16:03:41
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 11:31:11
 * @Description: model for project
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    limits: { // 访问权限
        type: String,
        default: ''
    }
})

/**
 * mongoose.model 参数含义
 * 'projects'：这是模型的名称，它将用于在数据库中创建一个名为projects的集合（Collection）。集合是MongoDB中存储文档（Documents）的地方，而文档则是数据库中的记录。
 * projectSchema：这是一个包含模型的结构和验证规则的模式（Schema）。模式定义了模型中的字段、字段类型以及其他约束条件。在这里，projectSchema是一个已经定义好的模式对象，它描述了User模型的结构。
 * 第三个参数：这是可选的参数，它指定了在数据库中创建的集合的名称。如果不提供这个参数，Mongoose会根据模型的名称自动创建一个集合。
 */
const Projects = mongoose.model('projects', projectSchema)

module.exports = Projects;