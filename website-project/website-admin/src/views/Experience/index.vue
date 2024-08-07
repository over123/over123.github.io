<!--
 * @Author: xudan
 * @Date: 2024-08-07 16:13:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 17:21:02
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <el-descriptions title="User Info">
    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { getExperienceList } from '@/http/api';

const experience  = await getExperienceList();
console.log(experience)

</script>