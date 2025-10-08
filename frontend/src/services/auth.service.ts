import { api } from '@/lib/api';

export const authService = {
  async login(email: string, password: string) {
    return api.post('/auth/login', { email, password });
  },

  async register(name: string, email: string, password: string) {
    return api.post('/auth/register', { name, email, password });
  },

  saveToken(token: string) {
    localStorage.setItem('token', token);
  },

  getToken() {
    return localStorage.getItem('token');
  },

  removeToken() {
    localStorage.removeItem('token');
  },
};
