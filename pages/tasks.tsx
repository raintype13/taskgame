const tasks = [
  { title: "Join Community", reward: "10 000 $LEAN", status: "Complete" },
  { title: "Subscribe YouTube", reward: "8 000 $LEAN", status: "Complete" },
  { title: "Watch YouTube Video", reward: "8 000 $LEAN", status: "Done" },
  { title: "Follow Instagram", reward: "4 000 $LEAN", status: "Complete" },
  { title: "Invite 10 Friends", reward: "50 000 $LEAN", status: "Complete" },
];

export default function Tasks() {
  return (
    <main className="px-4 pt-6 pb-20">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <p className="text-gray-500 mb-4">COMPLETE TASKS AND EARN $LEAN POINTS</p>
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div key={i} className="bg-neutral-900 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p>{task.title}</p>
              <span className="text-sm text-gray-400">{task.reward}</span>
            </div>
            <button className="bg-purple-500 text-black text-sm px-4 py-1 rounded-full">
              {task.status}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
