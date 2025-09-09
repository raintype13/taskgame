// components/RegisterOnLoad.tsx
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';

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
    const { setUser } = useUser();

    useEffect(() => {
        async function register() {
            try {
                // ... (Остальная часть кода для получения payload остается без изменений) ...
                const useMock = !!process.env.NEXT_PUBLIC_DISABLE_TELEGRAM;
                let payload: {
                    telegramId?: string;
                    telegramUsername?: string;
                    firstName?: string;
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
                    // Сохраняем данные в контекст
                    setUser(json);
                }
            } catch (e) {
                console.error('Error during registration', e);
            }
        }
        
        register();
    }, [setUser]);

    return null;
}