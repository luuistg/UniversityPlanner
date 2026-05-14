import { api } from '../../../api/axios'

export const UserApi = {
  logIn: async (email: string, password: string) => {
    const response = await api.post('/User/log-in', { email, password });
    return response.data;
  }
};