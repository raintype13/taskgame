const prices = [
  { amount: "25 000", ton: "1 TON" },
  { amount: "50 000", ton: "2 TON" },
  { amount: "100 000", ton: "4 TON" },
  { amount: "150 000", ton: "6 TON" },
];

export default function Buy() {
  return (
    <main className="px-4 pt-6 pb-20">
      <h1 className="text-2xl font-bold">Buy Points</h1>
      <p className="text-gray-500 mb-4">BUY $LEAN POINTS FOR TON</p>
      <div className="space-y-4">
        {prices.map((p, i) => (
          <div key={i} className="bg-neutral-900 p-4 rounded-xl flex justify-between items-center">
            <p>{p.amount}</p>
            <div className="bg-purple-500 text-black px-4 py-2 rounded-xl font-bold">{p.ton}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
