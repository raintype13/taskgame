import Navbar from '../components/Navbar';
import TaskTabs from '../components/TaskTabs';
import { useState } from 'react';
import { useBalance } from '../context/BalanceContext';

export default function Tasks() {
  const { claimed, addPoints } = useBalance();
  const [activeTab, setActiveTab] = useState<'tasks' | 'achievements'>('tasks');

  const tasks = [
    { id: 'join-community', name: 'Join Community', reward: 10000 },
    { id: 'invite-friends', name: 'Invite Friends', reward: 5000 },
  ];

  const achievements = [
    { id: '10-friends', name: '10 Friends Joined', reward: 10000 },
    { id: '20-friends', name: '20 Friends Joined', reward: 20000 },
    { id: 'joined-squad', name: 'Joined a Squad', reward: 5000 },
    { id: '50-friends', name: 'Invite 50 Friends', reward: 100000 },
  ];

  return (
    <div className="container">
      <main className="main">
        <div className="page-header">
          <div className="page-title">Tasks</div>
          <div className="page-subtitle">COMPLETE TASKS AND EARN $LEAN POINTS</div>
        </div>

        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'tasks' && (
          <ul className="list-container">
            {tasks.map((task) => (
              <li className="list-item" key={task.id}>
                <div className="task-info">
                  <div className="task-name">{task.name}</div>
                  <div className="task-reward">{task.reward.toLocaleString()} $LEAN</div>
                </div>
                <button
                  className={`task-btn ${claimed[task.id] ? 'done' : 'complete'}`}
                  onClick={() => addPoints(task.reward, task.id)}
                  disabled={claimed[task.id]}
                >
                  {claimed[task.id] ? 'Claimed' : 'Claim'}
                </button>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'achievements' && (
          <ul className="list-container">
            {achievements.map((ach) => (
              <li className="list-item" key={ach.id}>
                <div className="task-info">
                  <div className="task-name">{ach.name}</div>
                  <div className="task-reward">Reward: {ach.reward.toLocaleString()} $LEAN</div>
                </div>
                <button
                  className={`task-btn ${claimed[ach.id] ? 'done' : 'complete'}`}
                  onClick={() => addPoints(ach.reward, ach.id)}
                  disabled={claimed[ach.id]}
                >
                  {claimed[ach.id] ? 'Claimed' : 'Claim'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Navbar />
    </div>
  );
}
