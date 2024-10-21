import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getTopics, Topic } from '../api/topicsApi';

const Topics: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setActiveCategory(fetchedCategories[0]);
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
    const { topics: fetchedTopics, total } = await getTopics(activeCategory, page, ITEMS_PER_PAGE);
    setTopics(fetchedTopics);
    setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
  };

  const handleTopicClick = (topicId: string) => {
    navigate(`/topics/${topicId}`);
  };

  return (
    <div>
      <div className="tab-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="topic-list">
        {topics.map((topic) => (
          <li key={topic.id} className="topic-item" onClick={() => handleTopicClick(topic.id)}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
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