import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailableArenas, PopularLocations, SearchBar } from '@/components';

const locations = [
  { id: 1, name: 'Copacabana' },
  { id: 2, name: 'Ipanema' },
  { id: 3, name: 'Leblon' },
];

const arenas = [
  {
    id: 1,
    name: 'Copacabana Arena Complex',
    location: 'Copacabana Beach',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
    rating: 4.8,
    tags: ['Beach Tennis', 'Volleyball'],
    openNow: true,
  },
  {
    id: 2,
    name: 'Ipanema Sports Center',
    location: 'Ipanema Beach',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3',
    rating: 4.6,
    tags: ['Footvolley', 'Volleyball'],
    openNow: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);

  const filteredArenas = arenas.filter(
    (arena) =>
      arena.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedLocation === undefined || arena.location.includes(selectedLocation))
  );

  function handleLocationPress(locName: string) {
    setSelectedLocation((prev) => (prev === locName ? undefined : locName));
  }

  function handleArenaPress(arenaId: number) {
    router.push({
      pathname: '/courts',
      params: { arenaId, arenaName: arenas[arenaId - 1].name },
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center bg-white px-4 pb-2 pt-2">
        <View style={{ width: 24 }} />
        <Text className="flex-1 text-center text-xl font-bold">Select Arena</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-8">
          <SearchBar search={search} setSearch={setSearch} />

          <PopularLocations
            locations={locations}
            selectedLocation={selectedLocation ?? ''}
            handleLocationPress={handleLocationPress}
          />

          <AvailableArenas
            filteredArenas={filteredArenas}
            handleArenaPress={(arenaId) => handleArenaPress(arenaId)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
