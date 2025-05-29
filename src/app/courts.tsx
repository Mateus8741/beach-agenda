import { BeautifyJsonLog } from '@codewaveds/beautify-json-log';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailableCourts, Calendar, Header, MyBookings, SportSelect } from '@/components';
import { useAgenda } from '@/hooks/useAgenda';
import { useBookingStore } from '@/store/store';

interface Booking {
  courtId: string;
  selectedTimes: { time: string; courtId: string }[];
}

export default function Courts() {
  const { selectedSport, selectedDate, resetBooking } = useBookingStore();
  const { agendas } = useAgenda();
  const { arenaName } = useLocalSearchParams<{ arenaName: string }>();

  function handleConfirmBooking(booking: Booking) {
    const selectedCourt = agendas?.find((agenda) => agenda.id === booking.courtId);
    const currentDate = selectedDate || new Date();

    // Format the selected times for better readability
    const formattedTimes = booking.selectedTimes.map((t) => t.time).join(', ');

    BeautifyJsonLog('Reserva confirmada com sucesso!', {
      booking,
      selectedSport: selectedSport?.name,
      selectedCourt: selectedCourt?.title,
      selectedLocation: selectedCourt?.description,
      selectedDate: currentDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      selectedTimes: formattedTimes,
    });

    resetBooking();
  }

  const formattedBookings =
    agendas?.map((agenda) => ({
      id: agenda.id,
      court: agenda.title || '',
      location: agenda.description || '',
      date: agenda.date
        ? new Date(agenda.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
      time:
        agenda.timeSlots
          ?.filter((slot) => !slot.isAvailable)
          .map((slot) => slot.time)
          .join(', ') || '',
    })) ?? [];

  const courts =
    agendas?.map((agenda) => ({
      id: agenda.id,
      name: agenda.title || '',
      location: agenda.description || '',
      times:
        agenda.timeSlots?.map((slot) => ({
          time: slot.time || '',
          isAvailable: slot.isAvailable ?? true,
        })) || [],
    })) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mb-4 px-4">
        <Header title={arenaName} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-20">
          <Calendar />

          <SportSelect />

          <AvailableCourts
            courts={courts}
            onConfirmBooking={(courtId, selectedTimes) =>
              handleConfirmBooking({ courtId, selectedTimes })
            }
          />

          <MyBookings bookings={formattedBookings} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
