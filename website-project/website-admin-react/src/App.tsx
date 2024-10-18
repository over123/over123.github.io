/*
 * @Author: xudan
 * @Date: 2024-10-17 13:58:28
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 17:10:50
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { useState } from 'react'
import Login from './pages/Login';
import router from '@/router/index'
import {
  RouterProvider,
} from "react-router-dom";
import { login as userLogin } from "@/http/api";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/authSlice';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const [adminName, setAdminName] = useState('');
  
  const handleLogin = async (username: string, password: string) => {
    // 这里应该有实际的身份验证逻辑
    console.log(username, password)
    if (username && password) {
      const userInfo = await userLogin({username, pwd: password})
      if(userInfo.code == 200) {
        dispatch(login(userInfo.res)); // token
      } else {
        alert(userInfo.msg);
      }
    } else {
      alert('请输入用户名和密码');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isLoggedIn ? (
        // <Main onLogout={handleLogout} adminName={adminName} />
        // children
        <RouterProvider router={router} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
