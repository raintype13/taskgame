// pages/profile.tsx
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Определите тип данных пользователя
type UserData = {
    telegramUsername: string;
    firstName: string;
    // Добавьте другие поля, если нужно
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

  // Пока данные загружаются, можно показать загрузочный экран
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <main className="main">
        <div className="profile-header">
          <Image src="/lean.png" alt="Profile avatar" width={60} height={60} className="profile-avatar" />
          <div>
            {/* Используем данные из состояния: */}
            <div className="profile-username">{user.telegramUsername}</div>
            <div className="profile-id">@{user.telegramUsername}</div>
          </div>
        </div>
        
        {/* Остальная часть вашего кода: */}
        <div className="profile-actions">
          <Link href="/buypoints" passHref legacyBehavior>
            <button className="btn btn-primary">Buy Points</button>
          </Link>
          <button className="btn btn-secondary">Connect TON</button>
        </div>
        {/* ... (остальные блоки) ... */}
      </main>
      <Navbar />
    </div>
  );
}