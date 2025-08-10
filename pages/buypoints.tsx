import Navbar from '../components/Navbar';

export default function BuyPoints() {
  return (
    <div className="container">
      <main className="main">
        <div className="page-header">
          <div className="page-title">Buy Points</div>
          <div className="page-subtitle">BUY $LEAN POINTS FOR TON</div>
        </div>
        <ul className="buy-list">
          <li>
            <button className="buy-item-btn">
              <span className="buy-amount">25 000</span>
              <span className="buy-ton">1</span>
            </button>
          </li>
          <li>
            <button className="buy-item-btn">
              <span className="buy-amount">50 000</span>
              <span className="buy-ton">2</span>
            </button>
          </li>
          <li>
            <button className="buy-item-btn">
              <span className="buy-amount">100 000</span>
              <span className="buy-ton">4</span>
            </button>
          </li>
          <li>
            <button className="buy-item-btn">
              <span className="buy-amount">150 000</span>
              <span className="buy-ton">6</span>
            </button>
          </li>
        </ul>
      </main>
      <Navbar />
    </div>
  );
}