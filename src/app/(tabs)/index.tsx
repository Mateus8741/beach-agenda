import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    router.push({ pathname: '/courts', params: { arenaId } });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center bg-white px-4 pb-2 pt-2">
        <View style={{ width: 24 }} />
        <Text className="flex-1 text-center text-xl font-bold">Select Arena</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-8">
          {/* Search Bar */}
          <View className="my-4">
            <View className="flex-row items-center rounded-lg bg-gray-100 px-4 py-2">
              <Ionicons name="search-outline" size={20} color="#666" />
              <TextInput
                className="ml-2 flex-1"
                placeholder="Search arenas..."
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Popular Locations */}
          <Text className="mb-2 text-base font-semibold">Popular Locations</Text>
          <View className="mb-4 flex-row gap-2">
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc.id}
                className={`flex-row items-center rounded-full border px-4 py-2 ${
                  selectedLocation === loc.name
                    ? 'border-orange-500 bg-orange-500'
                    : 'border-gray-100 bg-gray-100'
                }`}
                onPress={() => handleLocationPress(loc.name)}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={selectedLocation === loc.name ? 'white' : '#666'}
                />
                <Text
                  className={`ml-1 text-sm ${
                    selectedLocation === loc.name ? 'text-white' : 'text-gray-600'
                  }`}>
                  {loc.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Available Arenas */}
          <Text className="mb-2 text-base font-semibold">Available Arenas</Text>
          <View className="space-y-6">
            {filteredArenas.map((arena) => (
              <View
                key={arena.id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                <View>
                  <Image source={{ uri: arena.image }} className="h-36 w-full" resizeMode="cover" />
                  {arena.openNow && (
                    <View className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1">
                      <Text className="text-xs font-semibold text-white">Open Now</Text>
                    </View>
                  )}
                </View>
                <View className="p-4">
                  <View className="mb-1 flex-row items-center justify-between">
                    <Text className="text-base font-bold">{arena.name}</Text>
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={16} color="#fbbf24" />
                      <Text className="ml-1 text-base font-semibold text-gray-700">
                        {arena.rating}
                      </Text>
                    </View>
                  </View>
                  <View className="mb-2 flex-row items-center">
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text className="ml-1 text-sm text-gray-600">{arena.location}</Text>
                  </View>
                  <View className="mb-3 flex-row gap-2">
                    {arena.tags.map((tag) => (
                      <View key={tag} className="mr-2 rounded bg-orange-100 px-2 py-1">
                        <Text className="text-xs font-medium text-orange-500">{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <TouchableOpacity
                    className="mt-1 rounded-lg bg-orange-500 py-2"
                    onPress={() => handleArenaPress(arena.id)}>
                    <Text className="text-center font-semibold text-white">Select Arena</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
