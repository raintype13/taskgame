import { useEffect } from 'react'

export default function RegisterOnLoad() {
  useEffect(() => {
    async function register() {
      try {
        // Telegram WebApp: initDataUnsafe.user — объект user
        // если вы тестируете локально, можно поставить флаг в .env NEXT_PUBLIC_DISABLE_TELEGRAM=1
        // и использовать тестовые данные
        const useMock = !!process.env.NEXT_PUBLIC_DISABLE_TELEGRAM
        let payload: any

        if (useMock) {
          payload = {
            tgId: 'local-test-1',
            username: 'local_user',
            firstName: 'Local',
            ref: (new URLSearchParams(window.location.search)).get('ref') ?? undefined,
          }
        } else {
          // @ts-ignore
          const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user
          if (!user) {
            console.warn('Telegram user not found in WebApp initDataUnsafe')
            return
          }
          payload = {
            tgId: user.id,
            username: user.username ?? undefined,
            firstName: user.first_name ?? undefined,
            ref: (new URLSearchParams(window.location.search)).get('ref') ?? undefined,
          }
        }

        const r = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const json = await r.json()
        if (!r.ok) {
          console.error('Register error', json)
        } else {
          // сохраняем пользователя в localStorage / context
          window.localStorage.setItem('lean_user', JSON.stringify(json.user))
          console.log('Registered', json)
        }
      } catch (e) {
        console.error(e)
      }
    }

    register()
  }, [])

  return null
}
