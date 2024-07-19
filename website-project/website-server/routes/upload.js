/*
 * @Author: xudan
 * @Date: 2024-07-19 10:32:20
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-19 15:26:53
 * @Description: upload files
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const router = require('koa-router')();
const multer = require('koa-multer')
const fs = require('fs')
const path = require('path')


router.prefix('/upload')
let storage = multer.diskStorage({
    // 设置文件的存储位置
    destination: function(req, file, cb){
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        let day = date.getDate();
        let dir = "./public/uploads/" + year + month + day;

        // 判断目录是否存在
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true,
            })
        }
        cb(null, dir)
    },
    filename: function(req, file, cb){
        // 设置上传文件的名称
        let fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
});


let upload = multer({
    storage
})

// 上传图片的接口
router.post('/img', upload.single('myfile'), async(ctx)=>{
    let path = ctx.req.file.path;
        path = ctx.origin + '' + path.replace('public','')
    ctx.body = {
        data: path
    }
})

module.exports = router