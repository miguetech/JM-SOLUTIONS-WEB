import { api } from '@/lib/api';
import { authService } from './auth.service';

export const companiesService = {
  async getAll() {
    const token = authService.getToken();
    return api.get('/companies', token || undefined);
  },

  async getById(id: string) {
    const token = authService.getToken();
    return api.get(`/companies/${id}`, token || undefined);
  },
};
