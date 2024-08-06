/*
 * @Author: xudan
 * @Date: 2024-07-23 16:31:39
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-06 14:04:47
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */

// import { getCurrentInstance } from "vue";

// const currentInstance = getCurrentInstance();
// const $message = currentInstance?.appContext.config.globalProperties['$message'];

import { inject } from 'vue'
const $message = inject('$message')

// const $message = $global.$message

export {
    $message
}