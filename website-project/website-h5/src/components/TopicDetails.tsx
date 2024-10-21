import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const TopicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activePart, setActivePart] = useState<number | null>(null);

  const parts = [
    {
      title: 'Part 1: 介绍',
      content: [
        '这是话题的介绍部分。',
        '在这里可以概述话题的主要内容。',
        '可以包含一些背景信息或者关键点。'
      ]
    },
    {
      title: 'Part 2: 主要内容',
      content: [
        '这是话题的主要内容部分。',
        '在这里可以详细展开话题的核心内容。',
        '可以包含一些例子、数据或者论点。'
      ]
    },
    {
      title: 'Part 3: 总结',
      content: [
        '这是话题的总结部分。',
        '在这里可以回顾主要观点。',
        '可以提供一些结论或者建议。'
      ]
    }
  ];

  const togglePart = (index: number) => {
    setActivePart(activePart === index ? null : index);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>话题详情: {id}</h1>
      <div className="accordion">
        {parts.map((part, index) => (
          <div key={index} className="accordion-item">
            <div className="accordion-header" onClick={() => togglePart(index)}>
              {part.title}
            </div>
            <div className={`accordion-content ${activePart === index ? 'active' : ''}`}>
              <ul>
                {part.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicDetails;