// pages/tasks.tsx
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import TaskTabs from '../components/TaskTabs'
import { useBalance } from '../context/BalanceContext'

export default function Tasks() {
  const { claimed, claimReward } = useBalance()
  const [activeTab, setActiveTab] = useState<'tasks' | 'achievements'>('tasks')
  const [pending, setPending] = useState<Record<string, boolean>>({})

  const tasks = [
    { id: 'join-community', name: 'Join Community', reward: 10000 },
    { id: 'invite-friends', name: 'Invite Friends', reward: 5000 },
  ]

  const achievements = [
    { id: '10-friends', name: '10 Friends Joined', reward: 10000 },
    { id: '20-friends', name: '20 Friends Joined', reward: 20000 },
    { id: 'joined-squad', name: 'Joined a Squad', reward: 5000 },
    { id: '50-friends', name: 'Invite 50 Friends', reward: 100000 },
  ]

  const onClaim = async (taskId: string, reward: number) => {
    if (claimed[taskId] || pending[taskId]) return
    setPending(prev => ({ ...prev, [taskId]: true }))
    try {
      await claimReward(taskId, reward)
    } catch (e) {
      // показываем простую ошибку — позже можно заменить на UI-уведомление
      alert('Не удалось получить награду: ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setPending(prev => ({ ...prev, [taskId]: false }))
    }
  }

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
            {tasks.map(task => (
              <li className="list-item" key={task.id}>
                <div className="task-info">
                  <div className="task-name">{task.name}</div>
                  <div className="task-reward">{task.reward.toLocaleString()} $LEAN</div>
                </div>
                <button
                  className={`task-btn ${claimed[task.id] ? 'done' : 'complete'}`}
                  onClick={() => onClaim(task.id, task.reward)}
                  disabled={claimed[task.id] || pending[task.id]}
                >
                  {pending[task.id] ? 'Processing...' : (claimed[task.id] ? 'Claimed' : 'Claim')}
                </button>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'achievements' && (
          <ul className="list-container">
            {achievements.map(ach => (
              <li className="list-item" key={ach.id}>
                <div className="task-info">
                  <div className="task-name">{ach.name}</div>
                  <div className="task-reward">Reward: {ach.reward.toLocaleString()} $LEAN</div>
                </div>
                <button
                  className={`task-btn ${claimed[ach.id] ? 'done' : 'complete'}`}
                  onClick={() => onClaim(ach.id, ach.reward)}
                  disabled={claimed[ach.id] || pending[ach.id]}
                >
                  {pending[ach.id] ? 'Processing...' : (claimed[ach.id] ? 'Claimed' : 'Claim')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Navbar />
    </div>
  )
}
