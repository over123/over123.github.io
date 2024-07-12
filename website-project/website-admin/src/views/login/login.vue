<!--
 * @Author: xudan
 * @Date: 2024-07-04 19:49:37
 * @LastEditors: xudan
 * @LastEditTime: 2024-07-12 14:57:05
 * @Description: login page
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
-->
<template>
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
        <el-input v-model="ruleForm.pwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
  
  interface RuleForm {
    username: string
    pwd: string
  }
  
  const formSize = ref<ComponentSize>('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<RuleForm>({
    username: '',
    pwd: ''
  })
  
  const rules = reactive<FormRules<RuleForm>>({
    username: [
      { required: true, message: 'Please enter your username', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    pwd: [
      {
        required: true,
        message: 'Please enter your password',
        trigger: 'blur',
      },
    ]
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  </script>
  