import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
type User = {
  id: number
  telegramUsername: string
  firstName: string
  points: number
  referralCode: string
  tonWalletAddress?: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // пока tgId захардкожен, позже будем брать из Telegram WebApp initData
    fetch('/api/me?tgId=TEST_HASH')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error)
  }, [])

if (!user) return null

  return (
    <div className="container">
      <main className="main">
        <div className="profile-header">
          <Image src="/lean.png" alt="Profile avatar" width={60} height={60} className="profile-avatar" />
          <div>
            <div className="profile-username">{user.firstName}</div>
            <div className="profile-id">@{user.telegramUsername}</div>
          </div>
        </div>

        <div className="profile-actions">
          <Link href="/buypoints" passHref legacyBehavior>
            <button className="btn btn-primary">Buy Points</button>
          </Link>
          <button className="btn btn-secondary">Connect TON</button>
        </div>

        <div className="ref-link-block">
          <span className="ref-title">Referral Link</span>
          <div className="ref-content">
            <span className="ref-url">t.me/LEAN_Cups?start={user.referralCode}</span>
            <button className="copy-btn">
              <Image src="/copy.png" alt="Copy" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="friends-list-block">
          <span className="friends-title">Your Friends</span>
          <ul className="list-container">
            <li className="list-item">
              <span className="friend-name">example...</span>
              <span className="friend-points">+3000</span>
            </li>
          </ul>
        </div>
      </main>
      <Navbar />
    </div>
  )
}
