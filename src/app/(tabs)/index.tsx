import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ArenasList } from '@/components/ArenasList';
import { CourtBooking } from '@/components/CourtBooking';

export default function Home() {
  const [selectedArena, setSelectedArena] = useState<number | null>(null);

  return (
    <>
      <Stack.Screen options={{ title: 'Beach Tennis' }} />
      <View style={styles.container}>
        {selectedArena ? (
          <CourtBooking arenaId={selectedArena} onBack={() => setSelectedArena(null)} />
        ) : (
          <ArenasList onSelectArena={setSelectedArena} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
