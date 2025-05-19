import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { authUseCases } from '@/api/useCases/auth';
import { useUserStorage } from '@/store/userStore';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { setUser, setToken } = useUserStorage();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: authUseCases.getProfile,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authUseCases.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => authUseCases.register(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logout = useCallback(async () => {
    await authUseCases.logout();
    queryClient.clear();
  }, [queryClient]);

  return {
    user,
    isLoadingUser,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
  };
}
