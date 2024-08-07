<!--
 * @Author: xudan
 * @Date: 2024-07-24 11:08:52
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-07 16:14:28
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
        <span>{{ renderTime(scope).time }}</span>
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
        <div :class="(renderData(scope) as ScheduleData)?.isDisabled ? 'disabled': ''">
            <div class="content" v-if="(renderData(scope) as ScheduleData)?.professor">
              <div>{{ (renderData(scope) as ScheduleData)?.professor }}</div>
              <div>{{ (renderData(scope) as ScheduleData)?.meetingPlatform + ': ' + (renderData(scope) as ScheduleData)?.meetingId }}</div>
            </div>
            <div class="cell-status open " v-else-if="(renderData(scope) as ScheduleData)?.available"  style="background-color: aqua;" @click="bookSchedule(scope)">OPEN</div>
            <div class="cell-status closed" v-else> - </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="Schedule book" width="500">
    <el-form :model="scheduleForm">
      <!-- 当前日期 -->
      <el-form-item label="date" :label-width="formLabelWidth">
        <el-input v-model="scheduleForm.date" autocomplete="off" disabled />
      </el-form-item>
      <!-- 当前时间 -->
      <el-form-item label="time" :label-width="formLabelWidth">
        <el-input v-model="scheduleForm.time" autocomplete="off" disabled />
      </el-form-item>
      <!-- professor -->
      <el-form-item label="professor name" :label-width="formLabelWidth">
        <el-input v-model="scheduleForm.professor" autocomplete="off" />
      </el-form-item>
      <!-- 平台 -->
      <el-form-item label="platform" :label-width="formLabelWidth">
        <el-select v-model="scheduleForm.platform" placeholder="Please select a platform">
          <el-option label="SunSun" value="SunSun" />
          <el-option label="Speak8" value="Speak8" />
        </el-select>
      </el-form-item>
      <!-- 会议平台 -->
      <el-form-item label="meetingPlatform" :label-width="formLabelWidth">
        <el-select v-model="scheduleForm.meetingPlatform" placeholder="Please select a zone">
          <el-option label="Tencent Meeting" value="Tencent Meeting" />
          <el-option label="ClassIn" value="ClassIn" />
        </el-select>
      </el-form-item>
      <!-- 会议Id -->
      <el-form-item label="meetingId" :label-width="formLabelWidth">
        <el-input v-model="scheduleForm.meetingId" autocomplete="off" />
      </el-form-item>
      <!-- 分类 -->
      <el-form-item label="category" :label-width="formLabelWidth">
        <el-select v-model="scheduleForm.category" placeholder="Please select a category">
          <el-option label="category No.1" value="beijing" />
          <el-option label="category No.2" value="business" />
        </el-select>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="remarks" :label-width="formLabelWidth">
        <el-input v-model="scheduleForm.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelSchedule">Cancel</el-button>
        <el-button type="primary" @click="confirmSchedule">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { dateList, timeList, scheduleList } from "@/utils/datetime";
import { ScheduleData, scheduleData } from "@/common/scheduleConfig";
import { ref, reactive } from "vue";

const dialogFormVisible = ref(false)
const scheduleForm = reactive({
  date: '',
  time: '',
  professor: '',
  professorId: '',
  platform: '',
  meetingPlatform: '',
  meetingId: '',
  category: '',
  name: '',
  address: '',
  available: false,
  remarks: '',
});

const formLabelWidth = '140px'

/**
 * @description: 渲染早8点到晚12点的时间列,表格首列数据
 * @param {*} data
 * @return {*}
 */
const renderTime = (data: any) => {
  return timeList[data.$index];
}

/**
 * @description: 渲染当日前后三天的日期,共计一周,表格首行数据
 * @param {*} data
 * @return {*}
 */
const renderData = (data: any) => {
  // $index 行索引 从-1开始
  // cellIndex 列索引 从1开始
  const { date, isDisabled: dateIsDisabled } = dateList[data.cellIndex - 1];
  const { time, isDisabled: timeIsDisabled } = timeList[data.$index];
  const today = new Date().toISOString().split('T')[0]
  const _isDisabled = dateIsDisabled || (today == date && timeIsDisabled);

  const existData = scheduleData.find(item => item.time === time && item.date === date);
  return (existData ? {
    isDisabled: _isDisabled,
    existData
  }: { 
    isDisabled: _isDisabled 
  });
}

/**
 * @description: 弹出预约框
 * @param {*} data - 当前单元格数据
 * @return {*}
 */
const bookSchedule = (data: any) => {
  const { date } = dateList[data.cellIndex - 1];
  const { time } = timeList[data.$index];
  scheduleForm.date = date;
  scheduleForm.time = time;
  dialogFormVisible.value = true;
}

/**
 * @description: 提交预约信息
 * @return {*}
 */
const confirmSchedule = () => {
  // 保存预约信息
  const scheduleForm_temp: ScheduleData = {
    date: scheduleForm.date,
    time: scheduleForm.time,
    professor: 'belle',
    professorId: '',
    platform: '',
    meetingPlatform: 'classin',
    meetingId: '123456',
    category: '',
    available: false,
    remarks: ""
  }
  // 提交至服务器
  console.log('scheduleForm_temp', scheduleForm_temp);    
  dialogFormVisible.value = false;
}

/**
 * @description: 取消预约
 * @return {*}
 */
const cancelSchedule = () => {
  dialogFormVisible.value = false;
}
</script>


<style scoped lang="less">
.disabled {
  background-color: #999;
}
.cell-status {
  text-align: center;
  color: #fff;

  &.closed {
    color: #666;
  }
}
</style>