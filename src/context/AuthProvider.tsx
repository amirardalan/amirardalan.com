'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Session } from 'next-auth';

interface AuthContextType {
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
