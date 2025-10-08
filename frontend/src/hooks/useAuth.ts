'use client'

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    if (data.token) {
      authService.saveToken(data.token);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  const logout = () => {
    authService.removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
}
