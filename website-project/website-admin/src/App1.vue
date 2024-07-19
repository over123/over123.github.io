<!--
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-16 14:53:26
 * @Description: main page
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import VueTemplate from './components/interview/Vue.vue'
// import axios from 'axios';
import { onMounted, getCurrentInstance} from 'vue'
const currentInstance = getCurrentInstance();
const $http = currentInstance?.appContext.config.globalProperties.$http;

onMounted(()=>{

  /**
   * @description: 局部axios调用demo
   * @return {*}
   */ 
  /**
   axios.get('http://localhost:3000/user/find').then(res => {
     console.log(res.data);
   })
   */ 

  /**
   * @description: 全局axios调用demo
   * @return {*}
   */
  $http({
    path: 'http://localhost:3000/user/find',
    method: 'get'
  }).then((res: any)=>{
    console.log(res);
  })
}) 

</script>

<template>
  <div>
    <router-view></router-view>
    <!-- <HelloWorld msg="Vite + Vue" />
    <VueTemplate /> -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
