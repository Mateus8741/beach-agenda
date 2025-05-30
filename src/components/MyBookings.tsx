import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { useBooking } from '@/hooks';

export function MyBookings() {
  const { navigate } = useRouter();

  const { bookings } = useBooking();

  function handleSeeAllBookings() {
    navigate('/bookings');
  }

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View className="mt-8">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-800">Minhas Reservas</Text>

        <Pressable
          onPress={() => handleSeeAllBookings()}
          className="flex-row items-center rounded-md border border-orange-500 px-2 py-1">
          <Text className="text-sm font-bold text-orange-500">Ver todas</Text>
          <Ionicons name="arrow-forward-outline" size={16} color="#FF7F50" className="ml-1" />
        </Pressable>
      </View>

      {bookings?.map((booking) => (
        <View key={booking.id} className="mb-4 rounded-lg border border-gray-200 p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-800">{booking.Agenda.title}</Text>
              <Text className="mt-1 text-sm text-gray-600">{booking.Agenda.description}</Text>
              <View className="mt-2 flex-row items-center">
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                <Text className="ml-2 text-sm text-gray-600">
                  {formattedDate(booking.Agenda.date)}
                </Text>
              </View>
              <View className="mt-1 flex-row items-center">
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text className="ml-2 text-sm text-gray-600">
                  {booking.timeSlots.map((time) => time.time).join(', ')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
