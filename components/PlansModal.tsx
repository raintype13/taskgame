import React from 'react';

interface PlansModalProps {
  onClose: () => void;
}

const plansData = [
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

const PlansModal: React.FC<PlansModalProps> = ({ onClose }) => {
  return (
    <div className="plans-modal-overlay">
      <div className="plans-modal-content">
        <div className="plans-modal-header">
          <button className="close-btn" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="plans-modal-body">
          <h2 className="modal-title">LEAN's Future Plans</h2>
          {plansData.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: '16px' }}>
              <h3 className="plan-section-title">{section.title}</h3>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="list-item-custom">
                  <div className="item-circle"></div> {/* Номер убран */}
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

export default PlansModal;