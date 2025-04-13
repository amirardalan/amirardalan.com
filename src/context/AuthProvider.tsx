'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Session } from 'next-auth';

// Create a context for authentication
interface AuthContextType {
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({ session: null });

// Provider component that wraps parts of the app that need auth data
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

// Custom hook to access the auth context
export function useAuth() {
  return useContext(AuthContext);
}
