import Navbar from '../components/Navbar';
import Image from 'next/image';
import PlansModal from '../components/PlansModal';
import PlansModalWithTimeline from '../components/PlansModalWithTimeline';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showInitialPlans, setShowInitialPlans] = useState(false);
  const [showPlansFromButton, setShowPlansFromButton] = useState(false);

  // При загрузке страницы проверяем, показывали ли уже модалку
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal');
    if (!hasSeenModal) {
      setShowInitialPlans(true);
      localStorage.setItem('hasSeenModal', 'true');
    }
  }, []);

  const handleCloseInitialPlans = () => {
    setShowInitialPlans(false);
  };

  const handleOpenPlansFromButton = () => {
    setShowPlansFromButton(true);
  };

  const handleClosePlansFromButton = () => {
    setShowPlansFromButton(false);
  };

  return (
    <div className="container">
      {showInitialPlans && <PlansModalWithTimeline onClose={handleCloseInitialPlans} />}
      {showPlansFromButton && <PlansModal onClose={handleClosePlansFromButton} />}

      <main className="main home-main">
        <div className="home-top">
          <button className="plans-btn" onClick={handleOpenPlansFromButton}>ⓘ</button>
          <div className="connect-ton-wrapper">
            <button className="connect-ton-btn">Connect TON</button>
          </div>
        </div>

        <div className="beta-notice">
          This app is currently in beta. Your feedback is valuable for future improvements. @LEANcup_Supportbot
        </div>

        <div className="cup-container">
          <Image src="/lean.png" alt="Lean" width={160} height={160} />
          <div className="balance-container">
            <div className="balance-home">2 000</div>
            <div className="balance-currency">$LEAN</div>
          </div>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
}
