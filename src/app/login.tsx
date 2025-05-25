import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Container } from '@/components/Container';
import { useAuth } from '@/hooks/useAuth';
import { useUserStorage } from '@/store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const { token, user } = useUserStorage();
  console.log(token, user);

  function handleLogin() {
    login(
      { email, password },
      {
        onSuccess: () => {
          router.replace('/(tabs)');
          console.log('success');
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        <View className="mb-8 items-center">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-orange-500">
            <Ionicons name="tennisball-outline" size={32} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-800">Beach Agenda</Text>
          <Text className="mt-2 text-center text-gray-600">Entre para agendar suas quadras</Text>
        </View>

        <View className="w-full space-y-4">
          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Email</Text>
            <TextInput
              className="rounded-lg border border-gray-200 bg-white px-4 py-3"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">Senha</Text>
            <TextInput
              className="rounded-lg border border-gray-200 bg-white px-4 py-3"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <Pressable
            onPress={handleLogin}
            className="mt-6 rounded-lg bg-orange-500 py-3 active:opacity-90">
            <Text className="text-center text-lg font-semibold text-white">Entrar</Text>
          </Pressable>

          <View className="mt-4 flex-row justify-center">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <Link href="/(tabs)" className="text-orange-500">
              Cadastre-se
            </Link>
          </View>
        </View>
      </View>
    </Container>
  );
}
