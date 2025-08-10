import Navbar from '../components/Navbar';
import Image from 'next/image';

export default function Leaders() {
  return (
    // Это новый, внешний контейнер для градиентного фона
    <div style={{
      backgroundImage: 'linear-gradient(to top, #a100ff 10%, #000 80%)',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1,
      overflowX: 'hidden'
    }}>

      {/* Это ваш существующий контейнер с ограниченной шириной для контента */}
      <div className="container">
        <main className="main">
          <div className="page-header">
            <div className="page-title">Leaders</div>
            <div className="page-subtitle">TOP LEAN PLAYERS WORLDWIDE</div>
          </div>
          <ul className="list-container">
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">1</div>
                <div className="leader-info">
                  <div className="leader-name">MrLonely</div>
                  <div className="leader-points">4 356 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">2</div>
                <div className="leader-info">
                  <div className="leader-name">raintype</div>
                  <div className="leader-points">4 050 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">3</div>
                <div className="leader-info">
                  <div className="leader-name">ANGRY 301</div>
                  <div className="leader-points">2 450 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">4</div>
                <div className="leader-info">
                  <div className="leader-name">Loan Graves</div>
                  <div className="leader-points">2 140 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">5</div>
                <div className="leader-info">
                  <div className="leader-name">LEAN DEV</div>
                  <div className="leader-points">1 839 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">6</div>
                <div className="leader-info">
                  <div className="leader-name">LEAN DEV</div>
                  <div className="leader-points">1 439 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">7</div>
                <div className="leader-info">
                  <div className="leader-name">LEAN DEV</div>
                  <div className="leader-points">949 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">8</div>
                <div className="leader-info">
                  <div className="leader-name">LEAN DEV</div>
                  <div className="leader-points">820 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">9</div>
                <div className="leader-info">
                  <div className="leader-name">LEAN DEV</div>
                  <div className="leader-points">811 000 $LEAN</div>
                </div>
              </div>
            </li>
            <li className="list-item">
              <div className="leader-item">
                <div className="leader-rank">10</div>
                <div className="leader-info">
                  <div className="leader-name">LEAN DEV</div>
                  <div className="leader-points">72 000 $LEAN</div>
                </div>
              </div>
            </li>
          </ul>
        </main>
        <Navbar />
      </div>
    </div>
  );
}