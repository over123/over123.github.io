/*
 * @Author: xudan
 * @Date: 2024-10-21 10:38:39
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 17:49:24
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preventDebugging } from './utils/debugPrevention'

// 调用防调试函数
// console.log(preventDebugging)
preventDebugging();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)