// pages/profile.tsx
import { useState, useEffect } from 'react';

// Определите тип данных пользователя
type UserData = {
    telegramUsername: string | null;
    firstName: string | null;
    points: number;
    referralCode: string;
};

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // Получаем данные из localStorage при загрузке страницы
    const storedUser = window.localStorage.getItem('user_data');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Определяем отображаемое имя: сначала username, потом firstName, если username отсутствует
  const displayName = user?.telegramUsername || user?.firstName || 'User';
  const displayId = user?.telegramUsername ? `@${user.telegramUsername}` : '@unknown';
  const displayReferral = "t.me/LEAN_Cups"; // Пока используем статичное значение

  // Обработка загрузки: если user === null, значит, данные еще не загружены.
  // Это предотвратит ошибку, если данные в localStorage отсутствуют при первой загрузке
  if (!user) {
    // Вы можете вернуть любой заглушенный UI, чтобы не было "Loading..."
    return (
      <main className="px-4 pt-6 pb-20 space-y-6">
        <p>Loading...</p> 
        {/* Здесь можно разместить упрощенный скелетон UI, но для простоты оставим "Loading" */}
      </main>
    );
  }

  return (
    <main className="px-4 pt-6 pb-20 space-y-6">
      <div className="flex items-center space-x-4">
        <img src="/assets/cup.png" alt="avatar" className="w-12 h-12" />
        <div>
          {/* Используем реальное имя */}
          <p className="font-bold">{displayName}</p>
          {/* Используем юзернейм или заглушку */}
          <p className="text-gray-400">{displayId}</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button className="bg-purple-500 px-4 py-2 rounded-full text-black">Buy Points</button>
        <button className="bg-blue-500 px-4 py-2 rounded-full text-white">Connect TON</button>
      </div>

      <div>
        <p className="text-sm text-gray-400">Referral Link</p>
        <div className="bg-neutral-800 p-2 rounded-lg flex justify-between items-center">
          {/* Используем реальный реферальный код */}
          <p>{displayReferral}</p>
          <button className="text-purple-500">📋</button>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-2">Your Friends</p>
        {/* ... (Остальной статический код для списка друзей) ... */}
        <div className="space-y-2">
          <div className="bg-neutral-800 p-2 rounded-lg flex justify-between">
            <p>ANGRY</p>
            <span className="text-green-400">+3 000</span>
          </div>
          <div className="bg-neutral-800 p-2 rounded-lg flex justify-between">
            <p>Lean Dev</p>
            <span className="text-green-400">+3 000</span>
          </div>
          <div className="bg-neutral-800 p-2 rounded-lg flex justify-between">
            <p>raintype</p>
            <span className="text-green-400">+3 000</span>
          </div>
        </div>
      </div>
    </main>
  );
}