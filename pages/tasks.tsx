import Navbar from '../components/Navbar';
import TaskTabs from '../components/TaskTabs';
import { useState } from 'react';

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'achievements'>('tasks');

  const handleTabChange = (tab: 'tasks' | 'achievements') => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <main className="main">
        <div className="page-header">
          <div className="page-title">Tasks</div>
          <div className="page-subtitle">COMPLETE TASKS AND EARN $LEAN POINTS</div>
        </div>

        <TaskTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === 'tasks' && (
          <ul className="list-container">
            {/* Ваши задачи */}
            <li className="list-item">
              <div className="task-info">
                <div className="task-name">Join Community</div>
                <div className="task-reward">10 000 $LEAN</div>
              </div>
              <button className="task-btn complete">Complete</button>
            </li>
            {/* ... другие задачи ... */}
          </ul>
        )}

        {activeTab === 'achievements' && (
          <ul className="list-container"> {/* Используем тот же класс для списка */}
            {/* Достижение 1 */}
            <li className="list-item">
              <div className="task-info">
                <div className="task-name">10 Friends Joined</div>
                <div className="task-reward">Reward: 10 000 $LEAN</div>
              </div>
              <button className="task-btn complete">Claim</button>
            </li>
            {/* Достижение 2 */}
            <li className="list-item">
              <div className="task-info">
                <div className="task-name">20 Friends Joined</div>
                <div className="task-reward">Reward: 20 000 $LEAN</div>
              </div>
              <button className="task-btn done">Claimed</button>
            </li>
            {/* Достижение 3 */}
            <li className="list-item">
              <div className="task-info">
                <div className="task-name">Joined a Squad</div>
                <div className="task-reward">Reward: 5 000 $LEAN</div>
              </div>
              <button className="task-btn complete">Claim</button>
            </li>
            {/* Достижение 4 */}
            <li className="list-item">
              <div className="task-info">
                <div className="task-name">Invite 50 Friends</div>
                <div className="task-reward">Reward: 100 000 $LEAN</div>
              </div>
              <button className="task-btn done">Claimed</button>
            </li>
          </ul>
        )}
      </main>
      <Navbar />
    </div>
  );
}