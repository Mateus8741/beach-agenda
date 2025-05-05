import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

export function SearchBar({ search, setSearch }: Readonly<SearchBarProps>) {
  return (
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
  );
}
