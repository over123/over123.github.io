/*
 * @Author: xudan
 * @Date: 2024-10-21 10:38:39
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 17:46:27
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 设置为相对路径
})
