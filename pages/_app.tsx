// pages/_app.tsx
import type { AppProps } from 'next/app';
import { UserProvider } from '@/context/UserContext';
import { BalanceProvider } from '@/context/BalanceContext'; // Assuming this is your balance context file

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