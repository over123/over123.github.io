import React from 'react';

interface SpeakingCategoriesProps {
  activeSubTab: string;
}

export default function SpeakingCategories({ activeSubTab }: SpeakingCategoriesProps) {
  const ieltsTopics = ['自我介绍', '家乡描述', '工作学习', '兴趣爱好'];
  const toeflTopics = ['校园生活', '学术讨论', '文化差异', '环境保护'];

  const renderTopics = (topics: string[]) => (
    <ul className="space-y-2">
      {topics.map((topic, index) => (
        <li key={index} className="bg-gray-50 p-3 rounded-md">{topic}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">口语分类</h2>
      {activeSubTab === 'ielts' && (
        <div>
          <h3 className="text-xl font-semibold mb-2">雅思口语话题</h3>
          {renderTopics(ieltsTopics)}
        </div>
      )}
      {activeSubTab === 'toefl' && (
        <div>
          <h3 className="text-xl font-semibold mb-2">托福口语话题</h3>
          {renderTopics(toeflTopics)}
        </div>
      )}
      {!activeSubTab && <p>请选择一个口语分类</p>}
    </div>
  );
}