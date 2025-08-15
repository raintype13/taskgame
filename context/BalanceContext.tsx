import { createContext, useContext, useState, useEffect } from 'react';

type BalanceContextType = {
  balance: number;
  claimed: { [key: string]: boolean };
  addPoints: (amount: number, id: string) => void;
};

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(2000);
  const [claimed, setClaimed] = useState<{ [key: string]: boolean }>({});

  // Загружаем из localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem('balance');
    const savedClaimed = localStorage.getItem('claimed');
    if (savedBalance) setBalance(Number(savedBalance));
    if (savedClaimed) setClaimed(JSON.parse(savedClaimed));
  }, []);

  // Сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
    localStorage.setItem('claimed', JSON.stringify(claimed));
  }, [balance, claimed]);

  const addPoints = (amount: number, id: string) => {
    if (!claimed[id]) {
      setBalance((prev) => prev + amount);
      setClaimed((prev) => ({ ...prev, [id]: true }));
    }
  };

  return (
    <BalanceContext.Provider value={{ balance, claimed, addPoints }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error('useBalance must be used within BalanceProvider');
  return ctx;
}
