// components/RegisterOnLoad.tsx
import { useEffect } from 'react';
 
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

        window.localStorage.setItem('user_data', JSON.stringify(json));
      } catch (e) {
        console.error('Error during registration', e);
      }
    }
    
    
    register();
  }, []);

  return null; 
}