// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../lib/axios';

export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface UseAuthOptions {
  middleware?: 'auth' | 'guest';
  redirectIfAuthenticated?: string;
}

export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated = '/',
}: UseAuthOptions = {}): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Retrieve the current user from the backend
  const getUser = async () => {
    try {
      const response = await axiosInstance.get<User>('/api/v1/user');
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login method: First, obtain the Sanctum CSRF cookie then attempt login
  const login = async (credentials: { email: string; password: string }) => {
    await axiosInstance.get('/sanctum/csrf-cookie'); // CSRF initialization
    const response = await axiosInstance.post('/login', credentials);
    await getUser();
    return response;
  };

  // Logout method: Ends the session and redirects to login page
  const logout = async () => {
    await axiosInstance.post('/logout');
    setUser(null);
    router.push('/login');
  };

  // Fetch user on mount
  useEffect(() => {
    getUser();
  }, []);

  // Enforce middleware rules once loading is complete
  useEffect(() => {
    if (!loading) {
      // If route requires authentication but no user is found, redirect to login
      if (middleware === 'auth' && !user) {
        router.push('/login');
      }
      // If route is for guests only and the user is authenticated, redirect away
      if (middleware === 'guest' && user) {
        router.push(redirectIfAuthenticated);
      }
    }
  }, [user, loading, middleware, redirectIfAuthenticated, router]);

  return { user, loading, login, logout };
};
