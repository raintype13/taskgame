import React, { useState, useEffect } from 'react';

interface PlansModalProps {
  onClose: () => void;
}

const plansData = [
  {
    title: 'Phase I — Strategic Launch & Ecosystem Foundation (Q3 2025)',
    items: [
      { subtitle: 'Community Infrastructure', description: '▸ Establishing a strong and engaged global community across social media and messaging platforms.\n▸ Hosting interactive events, contests, and early-access programs for early adopters.' },
      { subtitle: 'Tokenomics Architecture', description: '▸ Finalizing a sustainable and utility-driven tokenomics model.\n▸ Preparing large-scale token distribution to reward early supporters.' },
      { subtitle: 'Global Airdrop Campaign', description: '▸ Executing a massive airdrop to accelerate adoption and liquidity.\n▸ Official global launch of the LEAN ecosystem.' },
    ],
  },
  {
    title: 'Phase II — LEAN NFT Marketplace Deployment (Q4 2025)',
    items: [
      { subtitle: 'Platform Core Development', description: '▸ Launching a fully scalable NFT marketplace with advanced search, filters, and trading tools.\n▸ Delivering a seamless UI/UX for collectors and traders.' },
      { subtitle: 'Seamless TON Blockchain Integration', description: '▸ Enabling instant, low-fee transactions via TON blockchain.\n▸ Supporting direct peer-to-peer trades with escrow mechanisms.' },
      { subtitle: 'Exclusive High-Value Collections', description: '▸ Partnering with top-tier artists, brands, and creators for limited-edition NFT drops.\n▸ Expanding token utility through collaborations with gaming and metaverse projects.' },
      { subtitle: 'Targeted Global Marketing', description: '▸ Running high-impact marketing campaigns in global crypto hubs.\n▸ Onboarding professional traders and NFT investors.' },
    ],
  },
  {
    title: 'Phase III — Expansion, Utility & Interoperability (Q1–Q2 2026)',
    items: [
      { subtitle: 'AI-Powered NFT Experience', description: '▸ Integrating AI tools for personalized NFT recommendations and valuation analytics.\n▸ Introducing dynamic NFT royalties and adaptive metadata.' },
      { subtitle: 'DeFi Integration', description: '▸ Launching LEAN Staking Pools for passive income generation.\n▸ Enabling NFT-backed lending and borrowing.' },
      { subtitle: 'Cross-Chain Functionality', description: '▸ Expanding interoperability to Ethereum, Polygon, and BNB Chain.\n▸ Allowing cross-chain NFT transfers and swaps.' },
      { subtitle: 'Marketplace 2.0', description: '▸ Adding auction systems, fractionalized NFTs, and premium creator accounts.' },
    ],
  },
  {
    title: 'Phase IV — Metaverse & Global Ecosystem Scaling (Q3–Q4 2026 & Beyond)',
    items: [
      { subtitle: 'Metaverse Integration', description: '▸ Building immersive experiences where users can showcase, trade, and interact with NFTs in 3D worlds.\n▸ Partnering with leading metaverse platforms to create LEAN virtual districts.' },
      { subtitle: 'Brand & IP Collaborations', description: '▸ Securing licensing deals with global brands, entertainment studios, and sports franchises.\n▸ Launching co-branded NFT collections tied to real-world events.' },
      { subtitle: 'Global Presence & Web3 Leadership', description: '▸ Expanding LEAN into new regions with localized support.\n▸ Establishing LEAN as a top-tier NFT & Web3 brand recognized worldwide.' },
    ],
  },
];

const PlansModal: React.FC<PlansModalProps> = ({ onClose }) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const totalTime = 120000;
    const intervalTime = 50;
    const steps = totalTime / intervalTime;
    const stepSize = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          onClose();
          return 100;
        }
        return prev + stepSize;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onClose]);

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
          <h2 className="modal-title">LEAN Strategic Roadmap: 2025–2027</h2>
          {plansData.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: '16px' }}>
              <h3 className="plan-section-title">{section.title}</h3>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="list-item-custom">
                  <strong className="roadmap-subtitle">{item.subtitle}</strong>
                  <p className="roadmap-description">
                    {item.description.split('\n').map((line, lineIndex) => (
                      <React.Fragment key={lineIndex}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          ))}
          
          <div className="modal-contacts">
            <p className="contact-item">Support: <a href="https://t.me/LEANcup_Supportbot">@LEANcup_Supportbot</a></p>
            <p className="contact-item">Partnerships: <a href="mailto:a78057477@gmail.com">a78057477@gmail.com</a></p>
          </div>
        </div>

        <div className="plans-modal-footer">
          <button className="ok-btn" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default PlansModal;