import type { AppProps } from 'next/app';
import { BalanceProvider } from '../context/BalanceContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BalanceProvider>
      <Component {...pageProps} />
    </BalanceProvider>
  );
}
