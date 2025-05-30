import { useState } from 'react';
import { ActionSheetIOS, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Modal } from '@/components';
import { BookingCard } from '@/components/BookingCard';
import { useBooking } from '@/hooks';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { bookings, deleteBooking } = useBooking();

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
      deleteBooking(selectedBooking);
      setShowModal(false);
      setSelectedBooking(null);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4">
        <Text className="mb-4 text-2xl font-bold">Minhas Reservas</Text>

        <View className="mb-4 flex-row rounded-lg bg-gray-100 p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 rounded-md py-2 ${activeTab === 'upcoming' ? 'bg-white' : ''}`}>
            <Text
              className={`text-center ${
                activeTab === 'upcoming' ? 'font-semibold text-black' : 'text-gray-600'
              }`}>
              Próximas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('past')}
            className={`flex-1 rounded-md py-2 ${activeTab === 'past' ? 'bg-white' : ''}`}>
            <Text
              className={`text-center ${
                activeTab === 'past' ? 'font-semibold text-black' : 'text-gray-600'
              }`}>
              Anteriores
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'upcoming'
            ? bookings
                ?.filter((booking) => new Date(booking.Agenda.date) > new Date())
                .map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                ))
            : bookings
                ?.filter((booking) => new Date(booking.Agenda.date) < new Date())
                .map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                ))}
        </ScrollView>
      </View>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteBooking={handleDeleteBooking}
      />
    </SafeAreaView>
  );
}
