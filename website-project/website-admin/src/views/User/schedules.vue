<!--
 * @Author: xudan
 * @Date: 2024-07-24 11:08:52
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-26 19:00:58
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <el-table :data="scheduleList" style="width: 100%;height: 100%;">
    <el-table-column fixed width="120">
      <template #header>
        <div>Time / Date</div>
      </template>
      <template #default="scope">
        <span>{{ renderTime(scope) }}</span>
      </template>
    </el-table-column>
    <el-table-column width="180" height="100%" type="index" :index="index" v-for="(day, index) in dateList">
      <template #header>
        <div style="text-align: center;">
          <div>{{ day.date }}</div>
          <div>{{ day.dayOfWeek }}</div>
        </div>
      </template>
      <template #default="scope">
        <div class="content" v-if="renderData(scope)?.professor">
          <div>{{ renderData(scope)?.professor }}</div>
          <div>{{ renderData(scope)?.meetingPlatform + ': ' + renderData(scope)?.meetingId }}</div>
        </div>
        <div class="cell-status open " v-else-if="renderData(scope)?.available"   style="background-color: aqua;">OPEN</div>
        <div class="cell-status closed" v-else> - </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { dateList, timeList, scheduleList } from "@/utils/datetime";
import { scheduleData } from "@/common/scheduleConfig";

/**
 * @description: 渲染早8点到晚12点的时间列,表格首列数据
 * @param {*} data
 * @return {*}
 */
const renderTime = (data: any) => {
  return timeList[data.$index];
}

const renderData = (data: any) => {

  // $index 行索引 从-1开始
  // cellIndex 列索引 从1开始

  const { date } = dateList[data.cellIndex - 1];
  const time = timeList[data.$index];

  const existData = scheduleData.find(item => item.time === time && item.date === date);
  if (existData) return existData

}


</script>


<style scoped lang="less">
.cell-status {
  text-align: center;
  color: #fff;

  &.closed {
    color: #666;
  }
}
</style>