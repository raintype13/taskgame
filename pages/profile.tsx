import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="container">
      <main className="main">
        <div className="profile-header">
          <Image src="/lean.png" alt="Profile avatar" width={60} height={60} className="profile-avatar" />
          <div>
            <div className="profile-username">raintype</div>
            <div className="profile-id">@ILAXXXD</div>
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
            <span className="ref-url">t.me/LEAN_Cups</span>
            <button className="copy-btn">
              <Image src="/copy.png" alt="Copy" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="friends-list-block">
          <span className="friends-title">Your Friends</span>
          <ul className="list-container">
            <li className="list-item">
              <span className="friend-name">ANGRY</span>
              <span className="friend-points">+3 000</span>
            </li>
            <li className="list-item">
              <span className="friend-name">Lean Dev</span>
              <span className="friend-points">+3 000</span>
            </li>
            <li className="list-item">
              <span className="friend-name">raintype</span>
              <span className="friend-points">+3 000</span>
            </li>
          </ul>
        </div>
      </main>
      <Navbar />
    </div>
  );
}