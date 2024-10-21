/*
 * @Author: xudan
 * @Date: 2024-08-06 11:54:56
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-16 17:21:37
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
/** 埋点服务器地址 */
// export const statisticsUrl = "/statistics/"

/** API服务器地址（测试） */
// const developApiServer = "http://www.localhost:3000/"
const developApiServer = "http://65.49.193.148:8080/"
/** API服务器地址（正式） */
const releaseApiServer = "http://65.49.193.148:8080/"

/** 资源服务器地址（测试） */
const developSrcServer = "http://localhost:5173/"
/** 资源服务器地址（正式） */
const releaseSrcServer = ""

/** API服务器地址 */
export let apiServer = ""
/** 资源服务器地址 */
export let srcServer = ""
/** debug模式 */
export let debugMode = import.meta.env.MODE === "development"



/**
 * 重置服务器配置
 * @param {boolean} debugMode debug模式
 */
function resetEnv(debugMode = false) {
  apiServer = ( import.meta.env.MODE === "development" || debugMode ) ? developApiServer : releaseApiServer
  srcServer = ( import.meta.env.MODE === "development" || debugMode ) ? developSrcServer : releaseSrcServer
}

resetEnv()

