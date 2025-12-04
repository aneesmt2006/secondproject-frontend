import { useState } from 'react';
import { FileText, Baby, Pill, Activity } from 'lucide-react';
import FetusKnowledge from '../pages/adminFetusPage';
import AdminSymptomsPage from '../pages/AdminSymptomsPage';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('fetus');

  const tabs = [
    { id: 'fetus', label: 'Fetus Knowledge', icon: Baby },
    { id: 'nutrition', label: 'Nutrition Guide', icon: Pill },
    { id: 'exercises', label: 'Exercise Tips', icon: Activity },
    { id: 'symptoms', label: 'Symptoms', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'fetus':
        return <FetusKnowledge />;
      case 'nutrition':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-cocoa mb-4">Nutrition Guide</h2>
            <p className="text-cocoa/60">Content coming soon...</p>
          </div>
        );
      case 'exercises':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-cocoa mb-4">Exercise Tips</h2>
            <p className="text-cocoa/60">Content coming soon...</p>
          </div>
        );
      case 'symptoms':
        return <AdminSymptomsPage />;
      default:
        return <FetusKnowledge />;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cocoa mb-6">Content Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'bg-gradient-to-r from-rose to-lilac text-white font-semibold shadow-lg'
                  : 'bg-white text-cocoa/70 hover:bg-rose/10 border border-rose/20'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-rose/20">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentManagement;
