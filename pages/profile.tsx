// pages/profile.tsx
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <main className="main">
        <div className="profile-header">
          <Image src="/lean.png" alt="Profile avatar" width={60} height={60} className="profile-avatar" />
          <div>
            <div className="profile-username">{user.telegramUsername}</div>
            <div className="profile-id">@{user.telegramUsername}</div>
          </div>
        </div>
        
        <div className="profile-actions">
          <Link href="/buypoints" passHref legacyBehavior>
            <button className="btn btn-primary">Buy Points</button>
          </Link>
          <button className="btn btn-secondary">Connect TON</button>
        </div>
      </main>
      <Navbar />
    </div>
  );
}