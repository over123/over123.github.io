/*
 * @Author: xudan
 * @Date: 2024-10-17 14:03:26
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 18:01:07
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { useState } from 'react';
import ProjectExperience from '../components/ProjectExperience';
import WorkExperience from '../components/WorkExperience';
import SpeakingCategories from '../components/SpeakingCategories';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface MainPageProps {
  onLogout: () => void;
  adminName: string;
}

export default function MainPage({ onLogout, adminName }: MainPageProps) {
  const [activeTab, setActiveTab] = useState('projectExperience');
  const [activeSpeakingSubTab, setActiveSpeakingSubTab] = useState('');

  const currentNav = (current) => {
    console.log(current)
    setActiveTab(current)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'projectExperience':
        return <ProjectExperience />;
      case 'workExperience':
        return <WorkExperience />;
      case 'speaking':
        return <SpeakingCategories activeSubTab={activeSpeakingSubTab} />;
      default:
        return <div>选择一个选项查看内容</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar currentNav={ currentNav } />

        {/* Content area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            { renderContent() }
          </div>
        </main>
      </div>
    </div>
  );
}