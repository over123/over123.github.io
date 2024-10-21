<!--
 * @Author: xudan
 * @Date: 2024-08-07 16:13:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-16 17:01:50
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <div class="experienct-title_container">
    Title
    <el-button type="primary" @click.stop="openDrawer">Add</el-button>
  </div>
  <el-collapse v-model="activeIndex" accordion class="collapse_container">
    <el-collapse-item
      :title="experience.company"
      :name="index"
      v-for="(experience, index) in experienceList"
      :key="experience._id"
    >
      <template #title class="collapse-title_container">
        {{ experience.company }}
        <el-button type="primary" @click.stop="openDrawer(experience)"
          >Edit</el-button
        >
        <el-button
          type="danger"
          @click.stop="deleteExperience(experience._id || '')"
          >Delete</el-button
        >
      </template>
      <el-descriptions class="experience-card_container">
        <el-descriptions-item
          >{{ experience.startTime }} -
          {{ experience.endTime }}</el-descriptions-item
        >
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </el-collapse-item>
  </el-collapse>

  <el-drawer
    v-model="drawer"
    title="Edit the experience"
    :direction="direction"
    :before-close="handleClose"
    size="40%"
  >
    <Edit v-model:experience="experience" @closeDrawer="closeDrawer"></Edit>
  </el-drawer>
</template>

<script lang="ts" setup>
import { getExperienceList, delExperience } from "@/http/api";
import { onMounted, ref } from "vue";
import { $message } from "@/utils/message";
import type { DrawerProps } from "element-plus";

import Edit from "@/components/experience/edit.vue";

interface Experience {
  _id?: string;
  startTime?: string;
  endTime?: string;
  company?: string;
  description?: string;
  job?: string;
  limits?: number;
}

const drawer = ref(false);
const direction = ref<DrawerProps["direction"]>("rtl");
const experienceDefault: Experience = {
  _id: "",
  startTime: "",
  endTime: "",
  company: "",
  description: "",
  job: "",
  limits: 1,
};
const experience = ref(experienceDefault);

const experienceList = ref<Experience[]>([]);
const activeIndex = ref("1");

onMounted(async () => {
  getExperiences();
});

/**
 * @description: 获取经历列表
 * @return {*}
 */
const getExperiences = async () => {
  const { res } = await getExperienceList();
  experienceList.value = res;
};

/**
 * @description: 删除经历
 * @param {*} id
 * @return {*}
 */
const deleteExperience = (id: string) => {
  $message
    .confirm("Are you sure you want to delete this?")
    .then(async () => {
      // delete
      const res = await delExperience(id);
      if (res.code == 200) {
        $message.success("Delete successfully");
        getExperiences();
      }
    })
    .catch(() => {
      // catch error
    });
};

/**
 * @description: 打开抽屉
 * @param {*} experienceItem
 * @return {*}
 */
const openDrawer = (experienceItem: Experience) => {
  if (experienceItem && experienceItem._id) {
    experience.value = experienceItem;
    debugger;
  } else {
    experience.value = experienceDefault;
  }
  drawer.value = true;
};
/**
 * @description: 关闭抽屉(用于提交成功后)
 * @param {*} _id
 * @return {*}
 */
const closeDrawer = () => {
  drawer.value = false;
  getExperiences();
};

/**
 * @description: 用于关闭抽屉前进行确认
 * @param {*} done
 * @return {*}
 */
const handleClose = (done: () => void) => {
  $message
    .confirm("Are you sure you want to close this?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="less">
.experienct-title_container {
  margin-bottom: 16px;
}

.collapse_container {
  .el-collapse-item__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;

    .el-button:first-child {
      margin-left: auto;
      margin-right: 6px;
    }

    .el-collapse-item__arrow {
      margin-left: 12px;
    }
  }

  .el-collapse-item__wrap {
    padding: 0 24px;
  }
}

.experience-card_container {
  background: #eee;
  margin-top: 28px;

  .el-descriptions__header {
    margin-bottom: 0;
    padding: 8px 14px;
  }
}
</style>