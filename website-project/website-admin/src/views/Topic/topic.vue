<!--
 * @Author: xudan
 * @Date: 2024-08-07 16:13:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-30 18:27:06
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <div class="topic-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        :title="topicItem.singleItemTitle"
        :name="topicItem.singleItemTitle"
        v-for="(topicItem, index) in topicContent.panelItemsList"
        :key="index"
      >
        <div v-for="(item, idx) in topicItem.singleItemContent" :key="idx">
          {{ item }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>


<script lang="ts" setup>
import { getTopicTabs, getTopicList } from "@/http/api";
import { ref, onMounted } from "vue";

const activeName = ref("1");
import { useRoute } from "vue-router";

const route = useRoute();
const { id, subId } = route.query; // 获取查询参数

const topicTitle = ref("");
const topicContent = ref({});

onMounted(() => {
  getTopic();
});

/**
 * 获取topics
 */
const getTopic = async () => {
  const topics = await getTopicList({ id, subId });
  console.log(topics);
  topicTitle.value = topics.res.text;
  topicContent.value = topics.res.content;
};
</script>

<style lang="less">
.topic-title_container {
  height: 100%;

  .topic-list {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>