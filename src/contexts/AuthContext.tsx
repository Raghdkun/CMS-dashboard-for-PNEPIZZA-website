// src/contexts/AuthContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, UseAuthReturn, UseAuthOptions } from '../hooks/useAuth';

interface AuthProviderProps extends UseAuthOptions {
  children: ReactNode;
}

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

export const AuthProvider = ({
  children,
  middleware,
  redirectIfAuthenticated,
}: AuthProviderProps) => {
  const auth = useAuth({ middleware, redirectIfAuthenticated });

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the auth context
export const useAuthContext = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
