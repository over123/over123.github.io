<!--
 * @Author: xudan
 * @Date: 2024-08-08 18:32:16
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-16 15:42:34
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <div>
    <!-- 编辑表单 -->
    <el-form :model="experienceOne" label-width="auto" style="max-width: 600px">
      <el-form-item label="Activity name">
        <el-input
          v-model="experienceOne.company"
          placeholder="please input your company"
        />
      </el-form-item>
      <el-form-item label="Activity time">
        <div class="experience-form__content">
          <div>
            <el-date-picker
              v-model="experienceOne.startTime"
              format="YYYY/MM"
              value-format="YYYY/MM"
              type="month"
              placeholder="Pick a month"
            />
          </div>

          <div class="text-gray-500">|</div>

          <div>
            <el-date-picker
              v-model="experienceOne.endTime"
              format="YYYY/MM"
              value-format="YYYY/MM"
              type="month"
              placeholder="Pick a month"
            />
          </div>
        </div>
      </el-form-item>

      <!-- <el-form-item label="Activity zone">
                <el-select v-model="experienceOne.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item> -->
      <!-- <el-form-item label="Instant delivery">
                <el-switch v-model="experienceOne.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
                <el-checkbox-group v-model="experienceOne.type">
                    <el-checkbox value="Online activities" name="type">
                        Online activities
                    </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type">
                        Promotion activities
                    </el-checkbox>
                    <el-checkbox value="Offline activities" name="type">
                        Offline activities
                    </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type">
                        Simple brand exposure
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item> -->
      <!-- <el-form-item label="Resources">
                <el-radio-group v-model="experienceOne.resource">
                    <el-radio value="Sponsor">Sponsor</el-radio>
                    <el-radio value="Venue">Venue</el-radio>
                </el-radio-group>
            </el-form-item> -->
      <el-form-item label="Activity form">
        <el-input v-model="experienceOne.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveExperience">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { updateExperience, addExperience } from "@/http/api";
import { defineEmits } from "vue";

const props = defineProps(["experience"]);
const experienceOne = ref({ ...props.experience });
const emits = defineEmits(["closeDrawer"]);

// watch(props.experience, (newValue, oldValue) => {
//   // 在嵌套的属性变更时触发
//   // 注意：`newValue` 此处和 `oldValue` 是相等的
//   // 因为它们是同一个对象！
// })

watchEffect(() => {
  experienceOne.value = { ...props.experience };
});

/**
 * @description: 保存经历信息(新增/编辑)
 * @param {*} e
 * @return {*} undefined
 */
const saveExperience = async (e: any) => {
  console.log(e);
  if (experienceOne.value._id) await updateExperience(experienceOne.value);
  else await addExperience(experienceOne.value);

  // close drawer
  emits("closeDrawer");
};

onMounted(() => {});
</script>

<style scoped lang="less">
.experience-form__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>