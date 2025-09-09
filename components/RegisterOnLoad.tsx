// components/RegisterOnLoad.tsx
import { useEffect } from 'react';

// Эта декларация позволяет TypeScript знать о глобальном объекте Telegram.WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: string;
            username?: string;
            first_name?: string;
          };
        };
      };
    };
  }
}

export default function RegisterOnLoad() {
  useEffect(() => {
    async function register() {
      try {
        const useMock = !!process.env.NEXT_PUBLIC_DISABLE_TELEGRAM;
        let payload: {
          telegramId?: string;
          telegramUsername?: string;
          firstName?: string;
        };

        if (useMock) {
          // Данные для локального тестирования
          payload = {
            telegramId: 'local-test-1',
            telegramUsername: 'local_user',
            firstName: 'Local',
          };
        } else {
          // Получаем данные из Telegram WebApp
          const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
          if (!user) {
            console.warn('Telegram user not found in WebApp initDataUnsafe');
            return;
          }
          payload = {
            telegramId: user.id,
            telegramUsername: user.username ?? undefined,
            firstName: user.first_name ?? undefined,
          };
        }

        const r = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const json = await r.json();

        if (!r.ok) {
          console.error('Registration error', json);
        } else {
          console.log('User registered/logged in', json);
        }
      } catch (e) {
        console.error('Error during registration', e);
      }
    }
    
    // Запускаем регистрацию один раз при загрузке
    register();
  }, []);

  return null; // Компонент ничего не отображает
}