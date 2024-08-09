<!--
 * @Author: xudan
 * @Date: 2024-08-07 16:13:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-08-09 19:12:53
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <div class="experienct-title_container"> Title
    <el-button type="primary" @click.stop="openDrawer">Add</el-button>
  </div>
  <el-collapse v-model="activeIndex" accordion class="collapse_container">
    <el-collapse-item :title="project.title" :name="index" v-for="(project, index) in projectList"
      :key="project._id">
      <template #title class="collapse-title_container">
        {{ project.company }}
        <el-button type="primary" @click.stop="openDrawer(project)">Edit</el-button>
        <el-button type="danger" @click.stop="deleteProject(project._id)">Delete</el-button>
      </template>
      <el-descriptions class="project-card_container">
        <el-descriptions-item>{{ project.startTime }} - {{ project.endTime }}</el-descriptions-item>
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


  <el-drawer v-model="drawer" title="Edit the project" :direction="direction" :before-close="handleClose" size='40%'>
    <Edit v-model:project="project" @closeDrawer="closeDrawer"></Edit>
  </el-drawer>

</template>

<script lang="ts" setup>
import { getProjectList, delProject } from '@/http/api';
import { onMounted, ref, reactive } from 'vue';
import { $message } from '@/utils/message';
import type { DrawerProps } from 'element-plus'

import Edit from '@/components/project/edit.vue'

interface Project {
  _id?: string;
  brief?: string; // project brief 
  type?: string; // 'miniprogram' or 'website' or 'h5' 
  background?: string; // project background
  description?: string; // project description
  limits?: number;
}

const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('rtl')
const projectDefault:Project = {
  "_id": '',
  "brief": '',
  "type": '',
  "background": '',
  "description": '',
  "limits": 1
}
const project = ref(projectDefault)


const projectList = ref([]);
const activeIndex = ref('1')

onMounted(async () => {
  getProjects();
})


/**
 * @description: 获取经历列表
 * @return {*}
 */
const getProjects = async () => {
  const { res } = await getProjectList();
  projectList.value = res;
}

/**
 * @description: 删除经历
 * @param {*} id
 * @return {*}
 */
const deleteProject = (id: string) => {
  $message.confirm('Are you sure you want to delete this?')
    .then(async () => {
      // delete
      const res = await delProject(id);
      if (res.code == 200) {
        $message.success('Delete successfully');
        getProjects();
      }
    })
    .catch(() => {
      // catch error
    })
}


/**
 * @description: 打开抽屉
 * @param {*} projectItem
 * @return {*}
 */
const openDrawer = (projectItem: Project) => {
  if (projectItem && projectItem._id) {
    project.value = projectItem
    debugger
  } else {
    project.value = projectDefault;
  }
  drawer.value = true
}
/**
 * @description: 关闭抽屉(用于提交成功后)
 * @param {*} _id
 * @return {*}
 */
const closeDrawer = () => {
  drawer.value = false;
  getProjects();
}

/**
 * @description: 用于关闭抽屉前进行确认
 * @param {*} done
 * @return {*}
 */
const handleClose = (done: () => void) => {
  $message.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

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

.project-card_container {
  background: #eee;
  margin-top: 28px;

  .el-descriptions__header {
    margin-bottom: 0;
    padding: 8px 14px;
  }


}
</style>