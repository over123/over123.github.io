<!--
 * @Author: xudan
 * @Date: 2024-08-07 16:13:53
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-16 18:23:17
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <div class="topic-title_container">
    <el-tabs
      type="border-card"
      class="topic-list"
      v-model="activeIdx"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(topic, index) in topicList"
        :label="topic.title"
        :name="index"
        :key="index"
      >
        <!-- tab页内容 -->
        <el-table
          :data="currentContent"
          style="width: 100%; height: 100%"
          class="topic-table"
          @row-click="handleRowClick"
        >
          <el-table-column prop="text" label="Topic" style="width: 100%" />
        </el-table>
        <!-- 页码 -->
        <!-- <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="pageSizes"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="jumper,  prev, pager, next,sizes, total"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import { getTopicTabs, getTopicList } from "@/http/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import type { TabsPaneContext } from "element-plus";

// const topicIdx = ref(0);

interface Topic {
  title: string;
  index: string | number;
}

const topicList = ref<Topic[]>([]);
// const currentPage = ref(1);
// const pageSize = ref(10); // 每页显示数量
// const background = ref(false);
// const pageSizes = ref([10, 20, 30, 40]); //可选择每页显示数量
// const size = ref("default"); //分页大小
// const disabled = ref(false); //是否可用
// const total = ref(0);
const activeIdx = ref<string | number>(0);

const currentContent = ref(null);

onMounted(() => {
  getTopicTab();
});

/**
 * 监听每页数量显示变化
 */
// const handleSizeChange = () => {};

/**
 * 监听当前页码变化
 */
// const handleCurrentChange = () => {};

/** topic tab分类切换 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.name, event);
  console.log(activeIdx.value);
  if (tab.props.name === activeIdx.value) return;
  console.log(event);
  activeIdx.value = tab.props.name as string;
  getTopic({ id: activeIdx.value as string });
};

/**
 * 获取topics tab
 */
const getTopicTab = async () => {
  const topics = await getTopicTabs();
  topicList.value = topics.res;
  getTopic({ id: topics.res[0].index });
};

/**
 * 获取topics
 */
const getTopic = async ({ id }: { id: string }) => {
  const topics = await getTopicList({ id });
  currentContent.value = topics.res.topicList;
};

/** 获取topic详细内容 - 详情 */
const handleRowClick = (row: any, column: any, event: Event) => {
  console.log(row.summaryIndex, event);
  console.log(column, event);
  router.push({
    path: "/daily/topic/content",
    query: {
      id: row.summaryIndex,
      subId: row.id,
    },
  });
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