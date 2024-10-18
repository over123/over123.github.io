/*
 * @Author: xudan
 * @Date: 2024-10-18 14:58:29
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 17:13:23
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: localStorage.getItem('@website_auth-token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('@website_auth-token', action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('@website_auth-token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
