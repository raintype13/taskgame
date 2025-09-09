// context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Определите тип данных пользователя. Добавьте сюда все поля, которые вам нужны.
type UserData = {
    telegramUsername: string;
    firstName: string;
    points: number;
    referralCode: string;
};

// Определите тип для контекста
type UserContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
};

// Создайте контекст
const UserContext = createContext<UserContextType | undefined>(undefined);

// Создайте провайдер
export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// Создайте хук для удобного использования
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}