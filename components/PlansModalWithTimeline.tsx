import React, { useState, useEffect } from 'react';

// Объявляем интерфейсы для item и plansData
interface PlanItem {
  title: string;
  items: string[];
}

interface PlansModalProps {
  onClose: () => void;
}

const plansData: PlanItem[] = [
  {
    title: 'Community-Centric Growth & Engagement',
    items: [
      'Airdrop & Referral Program',
      'Strategic Partnerships',
    ],
  },
  {
    title: 'Token Utility & Ecosystem Expansion',
    items: [
      'Staking & Governance',
      'In-App Marketplace',
    ],
  },
  {
    title: 'The LEAN NFT Marketplace',
    items: [
      'Platform Development',
      'Exclusive Collections',
    ],
  },
  {
    title: 'Continuous Development & Transparency',
    items: [
      'Regular Updates',
      'Security & Audits',
    ],
  },
];

const PlansModalWithTimeline: React.FC<PlansModalProps> = ({ onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => prev + 1);
    }, 50);

    if (progress >= 100) {
      clearInterval(timer);
      onClose();
    }

    return () => clearInterval(timer);
  }, [progress, onClose]);

  return (
    <div className="plans-modal-overlay">
      <div className="plans-modal-content">
        <div className="plans-modal-header">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="plans-modal-body">
          <h2 className="modal-title">LEAN&apos;s Future Plans</h2>
          {plansData.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: '16px' }}>
              <h3 className="plan-section-title">{section.title}</h3>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="list-item-custom">
                  <div className="item-circle"></div>
                  <div className="item-text">{item}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="plans-modal-footer">
          <button className="ok-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default PlansModalWithTimeline;