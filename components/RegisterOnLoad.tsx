// components/RegisterOnLoad.tsx
import { useEffect } from 'react';

// Декларация для Telegram.WebApp
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
        async function registerAndCache() {
            // 1. Проверяем, есть ли данные в localStorage
            const cachedUser = window.localStorage.getItem('user_data');
            if (cachedUser) {
                console.log('User data loaded from cache.');
                // Если данные есть, прекращаем работу, чтобы не делать лишний API-запрос
                return; 
            }
            
            // 2. Если данных нет, продолжаем регистрацию через API
            try {
                // ... (Код для мокирования и получения данных Telegram) ...
                const useMock = !!process.env.NEXT_PUBLIC_DISABLE_TELEGRAM;
                let payload: {
                    telegramId: string;
                    telegramUsername: string | null;
                    firstName: string | null;
                };

                if (useMock) {
                    payload = {
                        telegramId: 'local-test-1',
                        telegramUsername: 'local_user',
                        firstName: 'Local',
                    };
                } else {
                    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
                    if (!user) {
                        console.warn('Telegram user not found in WebApp initDataUnsafe');
                        return;
                    }
                    payload = {
                        telegramId: user.id,
                        telegramUsername: user.username ?? null,
                        firstName: user.first_name ?? null,
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
                    console.log('User registered/logged in. Caching data.');
                    // 3. Сохраняем данные в localStorage
                    window.localStorage.setItem('user_data', JSON.stringify(json));
                }
            } catch (e) {
                console.error('Error during registration', e);
            }
        }
        
        registerAndCache();
    }, []);

    return null;
}