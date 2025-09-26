const leaders = [
  { name: "MrLonely", points: "14 356 080" },
  { name: "raintype", points: "14 050 300" },
  { name: "ANGRY 301", points: "12 450 000" },
  { name: "Loan Graves", points: "12 140 345" },
  { name: "LEAN DEV", points: "10 439 540" },
];

export default function Leaders() {
  return (
    <main className="px-4 pt-6 pb-20">
      <h1 className="text-2xl font-bold">Leaders</h1>
      <p className="text-gray-500 mb-4">TOP LEAN PLAYERS WORLDWIDE</p>
      <div className="space-y-3">
        {leaders.map((l, i) => (
          <div key={i} className="bg-neutral-900 p-4 rounded-xl">
            <span className="text-sm text-gray-400">#{i + 1}</span>
            <div className="flex justify-between">
              <p>{l.name}</p>
              <p>{l.points} $LEAN</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
