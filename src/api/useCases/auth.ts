import { api } from '../apiConfig';

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

    localStorage.setItem('@beach-agenda:token', data.token);
    return data;
  },

  async register({ name, email, password }: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/users', {
      name,
      email,
      password,
    });

    localStorage.setItem('@beach-agenda:token', data.token);
    return data;
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/users/profile');
    return data;
  },

  logout() {
    localStorage.removeItem('@beach-agenda:token');
  },
};
