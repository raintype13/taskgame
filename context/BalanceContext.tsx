// context/BalanceContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'

type BalanceContextType = {
  balance: number
  claimed: Record<string, boolean>
  claimReward: (taskId: string, reward: number) => Promise<void>
  refresh: () => Promise<void>
}

const BalanceContext = createContext<BalanceContextType>({
  balance: 0,
  claimed: {},
  claimReward: async () => {},
  refresh: async () => {},
})

function getLocalTgHash(): string {
  try {
    if (typeof window === 'undefined') return 'TEST_HASH'
    const raw = window.localStorage.getItem('lean_user')
    if (!raw) return 'TEST_HASH'
    const user = JSON.parse(raw)
    return user?.telegramHash ?? 'TEST_HASH'
  } catch {
    return 'TEST_HASH'
  }
}

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0)
  const [claimed, setClaimed] = useState<Record<string, boolean>>({})

  async function load() {
    const tgId = getLocalTgHash()
    try {
      const res = await fetch(`/api/me?tgId=${encodeURIComponent(tgId)}`)
      if (res.ok) {
        const data = await res.json()
        setBalance(typeof data.points === 'number' ? data.points : Number(data.points) || 0)
      } else {
        // не критично — оставляем 0
        console.warn('api/me returned', res.status)
      }
    } catch (e) {
      console.error('Failed to load balance', e)
    }

    // загружаем локальные клеймы (если есть)
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('lean_claimed')
        if (raw) setClaimed(JSON.parse(raw))
      }
    } catch (e) {
      console.error('failed to load local claimed', e)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function claimReward(taskId: string, reward: number) {
    if (claimed[taskId]) return

    const tgId = getLocalTgHash()
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tgId, taskId, reward }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error ?? 'Claim failed')
      }

      // ожидаем, что бэкенд возвращает обновлённого user в json.user
      const newPoints = json?.user?.points ?? json?.points
      if (typeof newPoints === 'number') setBalance(newPoints)

      const updated = { ...claimed, [taskId]: true }
      setClaimed(updated)
      if (typeof window !== 'undefined') localStorage.setItem('lean_claimed', JSON.stringify(updated))
    } catch (e) {
      console.error('claimReward error', e)
      throw e
    }
  }

  const refresh = async () => {
    await load()
  }

  return (
    <BalanceContext.Provider value={{ balance, claimed, claimReward, refresh }}>
      {children}
    </BalanceContext.Provider>
  )
}

export const useBalance = () => useContext(BalanceContext)
