<!--
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-09-30 13:57:49
 * @Description: login
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
  <el-card style="max-width: 480px">
    <!-- login - 卡片头部 -->
    <template #header>
      <div class="card-header">
        <span>后台管理</span>
      </div>
    </template>
    <!-- login - 表单 -->
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="password" prop="pwd">
        <el-input
          v-model="ruleForm.pwd"
          type="password"
          autocomplete="off"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <!-- login - footer -->
    <template #footer>Footer content</template>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import { $message } from "@/utils/message";
import { login } from "@/http/api";
import Storage, { storageName } from "@/utils/storage";

const auth_store = useAuthStore();

/**
 * @description: login form rule 登录表单规则
 */
interface RuleForm {
  username: string;
  pwd: string;
}

/**  */
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: "",
  pwd: "",
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "Please enter your username", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  pwd: [
    {
      required: true,
      message: "Please enter your password",
      trigger: "blur",
    },
  ],
});

const router = useRouter();
const tokenStorage = new Storage(storageName.TOKEN);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const user = await login(ruleForm);
      if (user.res) {
        auth_store.update(user.res);
        tokenStorage.setToken(user.res);
        $message.success("Congratulations! Login successfully!");
        router.push("/");
        return;
      } else {
      }
      $message.error("Login failed, please try again!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>