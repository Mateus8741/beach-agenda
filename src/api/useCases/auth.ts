import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../apiConfig';

import { tokenKey } from '@/store';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export const authUseCases = {
  async login({ email, password }: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/users/login', {
      email,
      password,
    });

    return data;
  },

  async register({ name, email, password }: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/users', {
      name,
      email,
      password,
    });

    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/users/profile');
    return data;
  },

  async logout() {
    await AsyncStorage.removeItem(tokenKey);
  },
};
