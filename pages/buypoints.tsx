import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function BuyPoints() {
  const router = useRouter();

  return (
    <div className="container" style={{ position: 'relative' }}>
      <main className="main">
        {/* Кнопка "Назад" */}
        <button
          onClick={() => router.push('/profile')}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: '#101010', // лёгкий серый круг
            borderRadius: '50%',
            padding: '4px',
            border: 'none',
            cursor: 'pointer',
            width: '40px', // одинаковая ширина и высота
           height: '40px',
          }}
        >
          <Image
            src="/back.png"
            alt="Back"
            width={28}
            height={28}
            style={{
              position: 'relative',
              top: '1px', // смещаем только иконку вниз
              }}
          />
        </button>

        <div className="page-header" style={{ marginTop: '40px' }}>
          <div className="page-title">Buy Points</div>
          <div className="page-subtitle">BUY $LEAN POINTS FOR TON</div>
        </div>

        <ul className="buy-list">
          <li>
           <button className="buy-item-btn-b">
            <div className="button-content">
             <span className="buy-amount-b">Buy Mystery Points</span>
             <span className="buy-description-b">Win up to 1,000,000 Points!</span>
           </div>
           <span className="buy-ton-b">3</span>
         </button>
        </li>
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
