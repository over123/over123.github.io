/*
 * @Author: xudan
 * @Date: 2024-10-18 14:58:29
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 15:56:51
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;