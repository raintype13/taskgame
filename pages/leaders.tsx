import Navbar from '../components/Navbar';

export default function Leaders() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000', // полностью чёрный фон
      }}
    >
      <div className="container" style={{ flex: 1, overflowY: 'auto' }}>
        <main className="main">
          <div className="page-header">
            <div className="page-title">Leaders</div>
            <div className="page-subtitle">TOP LEAN PLAYERS WORLDWIDE</div>
          </div>

          <ul className="list-container">
            {[
              { rank: 1, name: 'MrLonely', points: '4 356 000 $LEAN' },
              { rank: 2, name: 'raintype', points: '4 050 000 $LEAN' },
              { rank: 3, name: 'ANGRY 301', points: '2 450 000 $LEAN' },
              { rank: 4, name: 'Loan Graves', points: '2 140 000 $LEAN' },
              { rank: 5, name: 'LEAN DEV', points: '1 839 000 $LEAN' },
              { rank: 6, name: 'Fuckyou', points: '1 439 000 $LEAN' },
              { rank: 7, name: 'IHATELIFE', points: '949 000 $LEAN' },
              { rank: 8, name: 'BITches', points: '820 000 $LEAN' },
              { rank: 9, name: 'Wanna kill', points: '811 000 $LEAN' },
              { rank: 10, name: 'Every one', points: '72 000 $LEAN' },
            ].map((leader, index) => (
              <li key={index} className="list-item">
                <div className="leader-item">
                  <div className="leader-rank">{leader.rank}</div>
                  <div className="leader-info">
                    <div className="leader-name">{leader.name}</div>
                    <div className="leader-points">{leader.points}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <Navbar />
    </div>
  );
}
