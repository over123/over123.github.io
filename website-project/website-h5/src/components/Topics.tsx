/*
 * @Author: xudan
 * @Date: 2024-10-21 10:38:39
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-21 12:06:19
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getTopics, Topic } from '../api/topicsApi';

const Topics: React.FC = () => {
  
  interface Category {
    title: string;
    _id: string;
    index: string;
  }
  
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [page, setPage] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;


  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        const category = fetchedCategories.filter((category) => category.title === '日常');
        setActiveCategory(category[0]._id);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchTopics();
    }
  }, [activeCategory, page]);

  const fetchTopics = async () => {
    const selectedCategory = categories.find(category => category._id === activeCategory);
    if (selectedCategory) {
      const response = await getTopics(selectedCategory.index, page, ITEMS_PER_PAGE);
      setTopics(response.topics);
      setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE));
      
    } else {
      console.log('No matching category found');
    }
    setIsRequesting(false);
    
  };

  const handleCategoryChange = (categoryId: string) => {
    if(isRequesting) return;
    setIsRequesting(true);
    setActiveCategory(categoryId);
    setPage(1);
  };

  const handleTopicClick = (topic: any) => {
    navigate(`/topics/${topic.id}`, { state: { id: topic.summaryIndex, subId:topic.id } });
  };

  return (
    <div>
      <div className="tab-bar">
        {categories.map((category) => (
          <button
            key={category._id}
            className={category._id === activeCategory ? 'active' : ''}
            onClick={() => handleCategoryChange(category._id)}
          >
            {category.title}
          </button>
        ))}
      </div>
      <ul className="topic-list">
        {topics.map((topic) => (
          <li key={topic.id} className="topic-item" onClick={() => handleTopicClick(topic)}>
            {/* <h3>{topic.text}</h3>
            <p>{topic.description}</p> */}
            <p>{topic.text}</p>
          </li>
        ))}
      </ul>
      {
        topics.length <= 0 && <div className='no-data' > 当前分类下无数据 ......</div>
      }
      
      <div className="pagination" style={{display: 'none'}}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          上一页
        </button>
        <span>{`${page} / ${totalPages}`}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          下一页
        </button>
      </div>
    </div>
  );
};

export default Topics;