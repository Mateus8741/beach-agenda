import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import type { Booking } from '@/api/useCases/booking';

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
}

export function BookingCard({ booking, onCancel }: Readonly<BookingCardProps>) {
  return (
    <View key={booking.id} className="mx-1 mb-4 rounded-xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 rounded-lg bg-orange-100 p-2">
            <Ionicons name="tennisball-outline" size={24} color="#f97316" />
          </View>
          <View>
            <Text className="text-lg font-semibold">{booking.Agenda.title}</Text>
            <Text className="text-gray-600">{booking.Agenda.arena.name}</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-2">
          {/* <TouchableOpacity className="rounded-lg bg-gray-100 px-3 py-1">
            <Text className="text-sm text-gray-600">Detalhes</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => onCancel(booking.id.toString())} className="p-1">
            <Ionicons name="ellipsis-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4 space-y-2">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text className="ml-2 text-gray-600">{booking.Agenda.arena.location}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text className="ml-2 text-gray-600">
            {new Date(booking.Agenda.date).toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text className="ml-2 text-gray-600">
            {booking.timeSlots.map((time) => time.time).join(', ')}
          </Text>
        </View>
      </View>
    </View>
  );
}
