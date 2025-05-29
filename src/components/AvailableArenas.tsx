import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import type { Arena } from '@/api/useCases/arena';

interface AvailableArenasProps {
  filteredArenas: Arena[];
  handleArenaPress: (arenaId: string) => void;
  isLoading?: boolean;
}

export function AvailableArenas({
  filteredArenas,
  handleArenaPress,
  isLoading,
}: Readonly<AvailableArenasProps>) {
  if (isLoading) {
    return (
      <View className="mt-4">
        <Text className="mb-2 text-base font-semibold">Arenas Disponíveis</Text>
        <View className="space-y-6">
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
              <View className="h-36 w-full animate-pulse bg-gray-200" />
              <View className="p-4">
                <View className="mb-1 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                <View className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                <View className="mb-3 flex-row gap-2">
                  {[1, 2].map((j) => (
                    <View key={j} className="h-6 w-20 animate-pulse rounded bg-gray-200" />
                  ))}
                </View>
                <View className="mt-1 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <>
      <Text className="mb-2 text-base font-semibold">Arenas Disponíveis</Text>
      <View className="space-y-6">
        {filteredArenas.map((arena) => (
          <View
            key={arena.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
            <View>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
                }}
                className="h-36 w-full"
                resizeMode="cover"
              />
            </View>
            <View className="p-4">
              <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-base font-bold">{arena.name}</Text>
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
                <Text className="text-center font-semibold text-white">Escolher Arena</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}
