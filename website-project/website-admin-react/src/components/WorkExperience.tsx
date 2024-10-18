import React from 'react';

export default function WorkExperience() {
  const experiences = [
    { id: 1, company: 'Tech Solutions Inc.', position: '高级开发工程师', duration: '2018 - 现在' },
    { id: 2, company: 'Innovative Systems', position: '开发工程师', duration: '2015 - 2018' },
    { id: 3, company: 'StartUp Co.', position: '初级开发人员', duration: '2013 - 2015' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">工作经验</h2>
      <ul className="space-y-4">
        {experiences.map((exp) => (
          <li key={exp.id} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">{exp.company}</h3>
            <p className="text-sm text-gray-600">{exp.position}</p>
            <p className="mt-2">{exp.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}