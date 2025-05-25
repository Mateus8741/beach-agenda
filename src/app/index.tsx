import { Redirect } from 'expo-router';

import { useUserStorage } from '@/store';

export default function Index() {
  const { token, user } = useUserStorage();

  if (token && user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
