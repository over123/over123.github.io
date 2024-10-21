import axios from 'axios';

const API_BASE_URL = 'http://65.49.193.148:8080'; // 替换为实际的 API 地址

export interface Topic {
  id: string;
  title: string;
  description: string;
}

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/topic/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getTopics = async (category: string, page: number, limit: number): Promise<{ topics: Topic[], total: number }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topics`, {
      params: { category, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return { topics: [], total: 0 };
  }
};