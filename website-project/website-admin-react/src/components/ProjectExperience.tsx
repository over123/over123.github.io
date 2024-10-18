import React from 'react';

export default function ProjectExperience() {
  const projects = [
    { id: 1, name: '电子商务平台', duration: '6个月', description: '开发了一个全功能的电子商务网站' },
    { id: 2, name: '企业资源管理系统', duration: '1年', description: '为大型制造企业设计并实现了ERP系统' },
    { id: 3, name: '移动应用开发', duration: '3个月', description: '开发了iOS和Android平台的健康追踪应用' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">项目经验</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-sm text-gray-600">持续时间: {project.duration}</p>
            <p className="mt-2">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}