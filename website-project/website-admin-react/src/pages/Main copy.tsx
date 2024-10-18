import { useState } from 'react';
import ProjectExperience from '../components/ProjectExperience';
import WorkExperience from '../components/WorkExperience';
import SpeakingCategories from '../components/SpeakingCategories';

interface MainPageProps {
  onLogout: () => void;
  adminName: string;
}

export default function MainPage({ onLogout, adminName }: MainPageProps) {
  const [activeTab, setActiveTab] = useState('projectExperience');
  const [activeSpeakingSubTab, setActiveSpeakingSubTab] = useState('');

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
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">管理平台</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">欢迎, {adminName}</span>
            <button
              onClick={onLogout}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white">
          <div className="p-4 space-y-2">
            <a
              href="#"
              onClick={() => setActiveTab('projectExperience')}
              className={`block py-2 px-4 rounded-md ${
                activeTab === 'projectExperience' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              项目经验
            </a>
            <a
              href="#"
              onClick={() => setActiveTab('workExperience')}
              className={`block py-2 px-4 rounded-md ${
                activeTab === 'workExperience' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              工作经验
            </a>
            <div>
              <a
                href="#"
                onClick={() => setActiveTab('speaking')}
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

        {/* Content area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}