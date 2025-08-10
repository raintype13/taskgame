import React from 'react';

interface TaskTabsProps {
  onTabChange: (tab: 'tasks' | 'achievements') => void;
  activeTab: 'tasks' | 'achievements';
}

const TaskTabs: React.FC<TaskTabsProps> = ({ onTabChange, activeTab }) => {
  const tabs = [
    { id: 'tasks', label: 'Tasks' },
    { id: 'achievements', label: 'Achievements' },
  ];

  return (
    <div className="task-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id as 'tasks' | 'achievements')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TaskTabs;