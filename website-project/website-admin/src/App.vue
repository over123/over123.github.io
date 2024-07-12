<!--
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-12 15:38:14
 * @Description: main page
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import VueTemplate from './components/interview/Vue.vue'
import axios from 'axios';
import { onMounted } from 'vue'

onMounted(()=>{
  axios.get('http://localhost:3000/user/find').then(res => {
    console.log(res.data);
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
