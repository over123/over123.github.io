/*
 * @Author: xudan
 * @Date: 2024-10-16 11:15:50
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-16 11:40:52
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Main from '@/pages/Main';
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  }
]);

export default router;
