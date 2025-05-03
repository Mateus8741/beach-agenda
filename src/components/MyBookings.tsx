import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface Bookings {
  id: number;
  court: string;
  location: string;
  date: string;
  time: string;
}

interface MyBookingsProps {
  bookings: Bookings[];
}

export function MyBookings({ bookings }: Readonly<MyBookingsProps>) {
  return (
    <View className="py-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">Minhas Reservas</Text>
        <TouchableOpacity>
          <Text className="text-orange-500">Ver Todas</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 space-y-4">
        {bookings.map((booking) => (
          <View key={booking.id} className="mb-4 rounded-lg bg-gray-50 p-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="font-semibold">{booking.court}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text className="ml-1 text-sm text-gray-600">{booking.location}</Text>
                </View>
                <View className="mt-2 flex-row items-center">
                  <Ionicons name="calendar-outline" size={14} color="#666" />
                  <Text className="ml-1 text-sm text-gray-600">{booking.date}</Text>
                  <Text className="ml-4 text-sm text-gray-600">{booking.time}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
