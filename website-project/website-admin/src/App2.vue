<!--
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-29 17:49:44
 * @Description: app
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->

<script setup lang="ts">
import { onMounted, getCurrentInstance, inject } from 'vue'
const currentInstance = getCurrentInstance();
const $http = currentInstance?.appContext.config.globalProperties.$http;

onMounted(()=>{
  // get请求测试
  $http({
    path: '/string',
    method: 'get'
  }).then((res: any)=>{
    console.log(res);
  })
  // post请求测试
  $http({
    path: '/user/login',
    method: 'post',
    params: {
      username: 'aaa',
      pwd: '123456'
    }
  }).then((res: any)=>{
    console.log(res);
  })

  const incrment_num: any = inject('$increment')
  const num = incrment_num(5);
  console.log(num)
}) 


</script>

<template>
    <router-view></router-view>
</template>

<style scoped lang="less" >
html, body {
  height: 100%;
}
</style>
