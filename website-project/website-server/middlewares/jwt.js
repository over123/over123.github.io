/*
 * @Author: xudan
 * @Date: 2024-09-24 18:59:48
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 10:57:22
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
const { UnauthorizedError } = require('../libs/error')
const jwt = require('jsonwebtoken');
const { jwtOpt: { conf } } = require("../config")


const sign = (data) => {
  return {
    token_type: 'Bearer',
    /**
      使用：
          加密保存的数据, 要加密的私钥, option(token的有效期等)
          jwt.sign(object, keys, option)

          another way ⬇
    */
    token: jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + conf.expired,
      },
      conf.secret
    ),
  }
}
const verify = (ctx) => {

  try {
    let token = ctx.header.authorization;
    token = token.replace('Bearer ', '');
    if (token.length < 24) {
      const currentDate = new Date().toISOString().split('T')[0];
      return (currentDate + ' website-h5') == token;
    }
    const result = jwt.verify(token, conf.secret);
    return result;
  } catch (err) {
    throw new UnauthorizedError()
  }
}

module.exports = {
  sign,
  verify,
}