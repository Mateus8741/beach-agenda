import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Arena {
  id: number;
  name: string;
  address: string;
  image: string;
  rating: number;
}

interface ArenasListProps {
  onSelectArena: (arenaId: number) => void;
}

export function ArenasList({ onSelectArena }: ArenasListProps) {
  const arenas: Arena[] = [
    {
      id: 1,
      name: 'Beach Arena São Paulo',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Beach Tennis Rio',
      address: 'Av. Atlântica, 2000 - Rio de Janeiro, RJ',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
      rating: 4.9,
    },
    {
      id: 3,
      name: 'Beach Club Santos',
      address: 'Av. da Praia, 300 - Santos, SP',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3',
      rating: 4.7,
    },
  ];

  return (
    <View className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold">Arenas de Beach Tennis</Text>

      <View className="space-y-4">
        {arenas.map((arena) => (
          <TouchableOpacity
            key={arena.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
            onPress={() => onSelectArena(arena.id)}>
            <Image source={{ uri: arena.image }} className="h-40 w-full" />
            <View className="p-4">
              <Text className="text-xl font-semibold">{arena.name}</Text>
              <Text className="mt-1 text-gray-600">{arena.address}</Text>
              <View className="mt-2 flex-row items-center">
                <Text className="text-yellow-500">★</Text>
                <Text className="ml-1 text-gray-600">{arena.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
