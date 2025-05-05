import { BeautifyJsonLog } from '@codewaveds/beautify-json-log';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailableCourts, Calendar, Header, MyBookings, SportSelect } from '@/components';
import { useBookingStore } from '@/store/store';

const courts = [
  {
    id: 1,
    name: 'Quadra de Tênis 1',
    location: 'Praia de Copacabana',
    times: [
      { time: '9:00', isAvailable: true },
      { time: '10:00', isAvailable: true },
      { time: '11:00', isAvailable: true },
      { time: '12:00', isAvailable: true },
      { time: '13:00', isAvailable: true },
      { time: '14:00', isAvailable: false },
      { time: '15:00', isAvailable: true },
      { time: '16:00', isAvailable: false },
      { time: '17:00', isAvailable: true },
      { time: '18:00', isAvailable: false },
      { time: '19:00', isAvailable: false },
      { time: '20:00', isAvailable: false },
      { time: '21:00', isAvailable: true },
      { time: '22:00', isAvailable: true },
    ],
  },
  {
    id: 2,
    name: 'Quadra de Tênis 2',
    location: 'Praia de Ipanema',
    times: [
      { time: '8:00', isAvailable: true },
      { time: '9:00', isAvailable: true },
      { time: '10:00', isAvailable: true },
      { time: '11:00', isAvailable: true },
      { time: '12:00', isAvailable: true },
      { time: '13:00', isAvailable: false },
      { time: '14:00', isAvailable: false },
      { time: '15:00', isAvailable: true },
      { time: '16:00', isAvailable: false },
      { time: '17:00', isAvailable: true },
      { time: '18:00', isAvailable: false },
      { time: '19:00', isAvailable: false },
      { time: '20:00', isAvailable: false },
      { time: '21:00', isAvailable: true },
      { time: '22:00', isAvailable: true },
    ],
  },
];

const bookings = [
  {
    id: 1,
    court: 'Beach Tennis Court 1',
    location: 'Copacabana Beach',
    date: 'Apr 28, 2025',
    time: '2:00 PM - 3:00 PM',
  },
  {
    id: 2,
    court: 'Volleyball Court 3',
    location: 'Leblon Beach',
    date: 'May 2, 2025',
    time: '4:00 PM - 5:00 PM',
  },
];

interface Booking {
  courtId: number;
  selectedTimes: string[];
}

export default function Courts() {
  const { selectedSport, selectedDate, resetBooking } = useBookingStore();

  function handleConfirmBooking(booking: Booking) {
    const selectedCourt = courts.find((court) => court.id === booking.courtId);
    const currentDate = selectedDate || new Date();

    BeautifyJsonLog('Reserva confirmada com sucesso!', {
      booking,
      selectedSport: selectedSport?.name,
      selectedCourt: selectedCourt?.name,
      currentDate: currentDate.toLocaleDateString(),
    });

    resetBooking();
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mb-4 px-4">
        <Header />
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

          <MyBookings bookings={bookings} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
