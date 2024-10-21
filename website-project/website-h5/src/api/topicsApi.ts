/*
 * @Author: xudan
 * @Date: 2024-10-21 10:38:39
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 15:24:28
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import axios from 'axios';

const API_BASE_URL = 'http://65.49.193.148:8080'; // 替换为实际的 API 地址
// const API_BASE_URL = 'http://localhost:3000'; // 替换为实际的 API 地址

export interface Topic {
  id: string;
  title: string;
  topicList: any;
  _id: string;
  total: number;
  text?: string;
}

const getAuthToken = () => {
  // 从本地存储或状态管理中获取token
  const currentDate = new Date().toISOString().split('T')[0];
  return currentDate + ' website-h5';
  // return localStorage.getItem('authToken');
};

export const getCategories = async (): Promise<any[]> => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/topic/list`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data.res;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getTopics = async (category: string, page?: number, limit?: number): Promise<{ topics: [], total: number }> => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/topic/list`, 
      { id: category, page, limit },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return {topics: response.data.res.topicList, total: response.data.res.topicList.length};
  } catch (error) {
    console.error('Error fetching topics:', error);
    return { topics: [], total: 0 };
  }
};

export const getTopic = async (data:any) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/topic/list`, 
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data.res.content;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return { };
  }
};