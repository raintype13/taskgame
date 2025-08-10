import Navbar from '../components/Navbar';
import Image from 'next/image';
import PlansModal from '../components/PlansModal';
import PlansModalWithTimeline from '../components/PlansModalWithTimeline';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showInitialPlans, setShowInitialPlans] = useState(true);
  const [showPlansFromButton, setShowPlansFromButton] = useState(false);

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
  <button className="plans-btn" onClick={handleOpenPlansFromButton}>
    ⓘ
  </button>
  <div className="connect-ton-wrapper">
    <button className="connect-ton-btn">Connect TON</button>
  </div>
</div>

        <div className="beta-notice">
          This application is currently in beta. Your feedback is valuable for future improvements.
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