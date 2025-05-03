import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActionSheetIOS, Platform, Text, TouchableOpacity, View } from 'react-native';

import { Modal } from './Modal';

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
  const { navigate } = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleSeeAllBookings() {
    navigate('/bookings');
  }

  function handleCancelBooking(id: number) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Voltar', 'Cancelar Reserva'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            console.log('delete booking', id);
          }
        }
      );
    } else {
      setSelectedBooking(id);
      setShowModal(true);
    }
  }

  function handleDeleteBooking() {
    if (selectedBooking) {
      console.log('delete booking', selectedBooking);
      setShowModal(false);
      setSelectedBooking(null);
    }
  }

  return (
    <View className="py-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">Minhas Reservas</Text>
        <TouchableOpacity onPress={handleSeeAllBookings}>
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
              <TouchableOpacity onPress={() => handleCancelBooking(booking.id)}>
                <Ionicons name="ellipsis-vertical" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteBooking={handleDeleteBooking}
      />
    </View>
  );
}
