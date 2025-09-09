// pages/_app.tsx
import type { AppProps } from 'next/app';
import { UserProvider } from '@/context/UserContext';
import { BalanceProvider } from '@/context/BalanceContext'; // Предположим, что ваш контекст называется так

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <BalanceProvider>
        <Component {...pageProps} />
      </BalanceProvider>
    </UserProvider>
  );
}

export default MyApp;