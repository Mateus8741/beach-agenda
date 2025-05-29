import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailableArenas, PopularLocations, SearchBar } from '@/components';
import { useArena } from '@/hooks';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const { arenas, isLoadingArenas } = useArena();

  const filteredArenas =
    arenas?.filter(
      (arena) =>
        arena.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedLocation === undefined || arena.location.includes(selectedLocation))
    ) ?? [];

  function handleLocationPress(locName: string) {
    setSelectedLocation((prev) => (prev === locName ? undefined : locName));
  }

  function handleArenaPress(arenaId: string) {
    const arena = arenas?.find((a) => a.id === arenaId);
    if (!arena) return;

    router.push({
      pathname: '/courts',
      params: { arenaId, arenaName: arena.name },
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center bg-white px-4 pb-2 pt-2">
        <View style={{ width: 24 }} />
        <Text className="flex-1 text-center text-xl font-bold">Escolha uma Arena</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-8">
          <SearchBar search={search} setSearch={setSearch} />

          <PopularLocations
            locations={arenas?.map((arena) => arena.location) ?? []}
            selectedLocation={selectedLocation ?? ''}
            handleLocationPress={handleLocationPress}
          />

          <AvailableArenas
            filteredArenas={filteredArenas}
            handleArenaPress={handleArenaPress}
            isLoading={isLoadingArenas}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
