const { User } = require('../models');
const crud = require('./crudUtil/index');
/**
 * @description: 添加用户
 * @return {*}
 */
const userAdd = async (ctx) => {
    let { username, pwd } = ctx.request.body
    await crud.add(User, { username, pwd }, ctx)
 
}
/**
 * @description: 更新用户/修改用户
 * @return {*}
 */
const userUpdate = async (ctx) => {
    let {_id, username, pwd } = ctx.request.body
    await crud.update(User, {_id: _id}, { username, pwd }, ctx)

}
/**
 * @description: 删除用户
 * @return {*}
 */
const userDelete = async (ctx) => { 
// 其余同理
  await crud.del({_id:ctx.params._id});

  // 返回的删除对象存入到回收站集合表内，以防用户需要恢复
}
/**
 * @description: 查找所有用户
 * @return {*}
 */
const userFind = async (ctx) => { 
    const res = await crud.find(User, null, ctx)
}
/**
 * @description: 查找用户
 * @return {*}
 */
const userFindOne = async (ctx) => { 
    const res = await crud.findOne(User, {_id: ctx.params.id}, ctx)
}
module.exports = {
    userAdd,
    userUpdate,
    userDelete,
    userFind,
    userFindOne
}