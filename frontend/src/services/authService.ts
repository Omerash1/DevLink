// src/services/authService.ts
import api from './api';
import type { AuthUser } from '@/types';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  token: string;
  message?: string;
}

const authService = {
  async login(loginData: LoginData): Promise<AuthResponse> {
    console.log('Auth service login:', loginData);
    const response = await api.post('/auth/login', loginData);
    return response.data;
  },

  async register(registerData: RegisterData): Promise<AuthResponse> {
    console.log('Auth service register:', registerData);
    const response = await api.post('/auth/register', registerData);
    return response.data;
  },

  async getProfile(): Promise<AuthUser> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
};

export default authService;