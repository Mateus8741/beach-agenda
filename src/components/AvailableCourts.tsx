import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface Court {
  id: number;
  name: string;
  location: string;
  times: { time: string; isAvailable: boolean }[];
}

interface AvailableCourtsProps {
  courts: Court[];
  onSelectTime?: (courtId: number, time: string) => void;
}

export function AvailableCourts({ courts, onSelectTime }: Readonly<AvailableCourtsProps>) {
  return (
    <View className="py-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">Quadras Disponíveis</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text className="text-orange-500">Ver Todas</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 space-y-4">
        {courts.map((court) => (
          <View key={court.id} className="rounded-lg bg-gray-50 p-4">
            <View className="mb-2 flex-row items-center justify-between">
              <View>
                <Text className="font-semibold">{court.name}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text className="ml-1 text-sm text-gray-600">{court.location}</Text>
                </View>
              </View>
              <View className="rounded bg-green-100 px-2 py-1">
                <Text className="text-xs text-green-600">Disponível</Text>
              </View>
            </View>

            <View className="mt-3">
              <Text className="mb-2 text-sm font-medium text-gray-600">Horários Disponíveis</Text>
              <View className="flex items-center">
                <View className="flex-row flex-wrap gap-2">
                  {court.times.map((time, timeIndex) => (
                    <TouchableOpacity
                      key={`${court.id}-${timeIndex}`}
                      disabled={!time.isAvailable}
                      onPress={() => time.isAvailable && onSelectTime?.(court.id, time.time)}
                      className={`h-8 w-14 items-center justify-center rounded-lg ${
                        time.isAvailable
                          ? 'bg-orange-100 active:bg-orange-200'
                          : 'bg-gray-200 opacity-50'
                      }`}>
                      <Text
                        className={`text-sm font-medium ${
                          time.isAvailable ? 'text-orange-500' : 'text-gray-500'
                        }`}>
                        {time.time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
