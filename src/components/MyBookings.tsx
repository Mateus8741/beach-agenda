import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActionSheetIOS, Platform, Text, View } from 'react-native';

import { Modal } from './Modal';

interface Bookings {
  id: string;
  court: string;
  location: string;
  date: string;
  time: string;
}

interface MyBookingsProps {
  bookings: Bookings[];
}

export function MyBookings({ bookings }: MyBookingsProps) {
  const { navigate } = useRouter();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleSeeAllBookings() {
    navigate('/bookings');
  }

  function handleCancelBooking(id: string) {
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
    <View className="mt-8">
      <Text className="mb-4 text-lg font-semibold text-gray-800">Minhas Reservas</Text>
      {bookings.map((booking) => (
        <View key={booking.id} className="mb-4 rounded-lg border border-gray-200 p-4">
          <Text className="text-base font-medium text-gray-800">{booking.court}</Text>
          <Text className="mt-1 text-sm text-gray-600">{booking.location}</Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="ml-2 text-sm text-gray-600">{booking.date}</Text>
          </View>
          <View className="mt-1 flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text className="ml-2 text-sm text-gray-600">{booking.time}</Text>
          </View>
        </View>
      ))}

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteBooking={handleDeleteBooking}
      />
    </View>
  );
}
