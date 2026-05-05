'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistSession = (nextUser: User) => {
    localStorage.setItem('userData', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const MOCK_ENABLED = process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true';
    if (MOCK_ENABLED) {
      const mockUser: User = { id: '0', name: email.split('@')[0], email };
      persistSession(mockUser);
      return;
    }

    const resp = await fetch('/api/web/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.message || 'Falha no login');
    }

    const loggedUser: User = {
      id: String(data.userId || ''),
      name: data.name || email.split('@')[0],
      email,
    };

    persistSession(loggedUser);
  };

  const signOut = async () => {
    localStorage.removeItem('userData');
    await fetch('/api/web/v1/auth/logout', {
      method: 'POST',
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
