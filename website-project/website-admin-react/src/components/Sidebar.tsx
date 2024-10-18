/*
 * @Author: xudan
 * @Date: 2024-10-18 17:28:43
 * @LastEditors: xudan
 * @LastEditTime: 2024-10-18 18:15:25
 * @Description: 
 * Contact Information: E-mail: xudan@gmail.com
 * Copyright (c) 2024 by xudan@gmail.com, All Rights Reserved. 
 */
import { useState } from 'react';
interface NavProps {
  currentNav: (nav: string) => void;
}

export default function Sidebar({ currentNav }: NavProps) {
  const [activeTab, setActiveTab] = useState('projectExperience');
  const [activeSpeakingSubTab, setActiveSpeakingSubTab] = useState('');



  const setCurrentNav = (nav: string) => {
    setActiveTab(nav);
    currentNav(nav);
  }

  return (
    <nav className="w-64 bg-gray-800 text-white">
      <div className="p-4 space-y-2">
        <a
          href="#"
          onClick={() => setCurrentNav('projectExperience')}
          className={`block py-2 px-4 rounded-md ${
            activeTab === 'projectExperience' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          项目经验
        </a>
        <a
          href="#"
          onClick={() => setCurrentNav('workExperience')}
          className={`block py-2 px-4 rounded-md ${
            activeTab === 'workExperience' ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          工作经验
        </a>
        <div>
          <a
            href="#"
            onClick={() => setCurrentNav('speaking')}
            className={`block py-2 px-4 rounded-md ${
              activeTab === 'speaking' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            口语
          </a>
          {activeTab === 'speaking' && (
            <div className="ml-4 mt-2 space-y-2">
              <a
                href="#"
                onClick={() => setActiveSpeakingSubTab('ielts')}
                className={`block py-1 px-4 rounded-md ${
                  activeSpeakingSubTab === 'ielts' ? 'bg-gray-600' : 'hover:bg-gray-600'
                }`}
              >
                雅思
              </a>
              <a
                href="#"
                onClick={() => setActiveSpeakingSubTab('toefl')}
                className={`block py-1 px-4 rounded-md ${
                  activeSpeakingSubTab === 'toefl' ? 'bg-gray-600' : 'hover:bg-gray-600'
                }`}
              >
                托福
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}