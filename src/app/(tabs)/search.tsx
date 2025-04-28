import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const filters = [
  { id: 1, name: 'Beach Tennis', selected: true },
  { id: 2, name: 'Volleyball', selected: false },
  { id: 3, name: 'Footvolley', selected: false },
  { id: 4, name: 'Morning', selected: true },
  { id: 5, name: 'Afternoon', selected: false },
  { id: 6, name: 'Evening', selected: false },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-20">
          {/* Search Bar */}
          <View className="my-4">
            <View className="flex-row items-center rounded-lg bg-gray-100 px-4 py-2">
              <Ionicons name="search-outline" size={20} color="#666" />
              <TextInput
                className="ml-2 flex-1"
                placeholder="Search courts, locations..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Filters */}
          <View className="mb-4">
            <Text className="mb-2 text-lg font-semibold">Filters</Text>
            <View className="flex-row flex-wrap gap-2">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  className={`rounded-full px-4 py-2 ${
                    filter.selected ? 'bg-orange-500' : 'bg-gray-100'
                  }`}>
                  <Text className={`text-sm ${filter.selected ? 'text-white' : 'text-gray-600'}`}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Searches */}
          <View>
            <Text className="mb-2 text-lg font-semibold">Recent Searches</Text>
            <View className="space-y-4">
              {[1, 2, 3].map((item) => (
                <TouchableOpacity
                  key={item}
                  className="flex-row items-center justify-between border-b border-gray-100 pb-4">
                  <View className="flex-row items-center">
                    <View className="mr-3 rounded-lg bg-gray-100 p-2">
                      <Ionicons name="time-outline" size={20} color="#666" />
                    </View>
                    <View>
                      <Text className="font-medium">Beach Tennis Court {item}</Text>
                      <Text className="text-sm text-gray-600">Copacabana Beach</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="close" size={20} color="#666" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
