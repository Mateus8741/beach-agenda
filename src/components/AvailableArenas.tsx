import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Arena {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  tags: string[];
  openNow: boolean;
}

interface AvailableArenasProps {
  filteredArenas: Arena[];
  handleArenaPress: (arenaId: number) => void;
}

export function AvailableArenas({
  filteredArenas,
  handleArenaPress,
}: Readonly<AvailableArenasProps>) {
  return (
    <>
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
                  <Text className="ml-1 text-base font-semibold text-gray-700">{arena.rating}</Text>
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
    </>
  );
}
