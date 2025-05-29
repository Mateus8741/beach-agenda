import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface PopularLocationsProps {
  locations: string[];
  selectedLocation: string;
  handleLocationPress: (location: string) => void;
}

export function PopularLocations({
  locations,
  selectedLocation,
  handleLocationPress,
}: Readonly<PopularLocationsProps>) {
  return (
    <>
      <Text className="mb-2 text-base font-semibold">Popular Locations</Text>
      <View className="mb-4 flex-row gap-2">
        {locations.map((loc) => (
          <TouchableOpacity
            key={loc}
            className={`flex-row items-center rounded-full border px-4 py-2 ${
              selectedLocation === loc
                ? 'border-orange-500 bg-orange-500'
                : 'border-gray-100 bg-gray-100'
            }`}
            onPress={() => handleLocationPress(loc)}>
            <Ionicons
              name="location-outline"
              size={16}
              color={selectedLocation === loc ? 'white' : '#666'}
            />
            <Text
              className={`ml-1 text-sm ${
                selectedLocation === loc ? 'text-white' : 'text-gray-600'
              }`}>
              {loc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
