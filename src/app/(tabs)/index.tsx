import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailableCourts, Calendar, Header, SportSelect } from '@/components';
import { useBookingStore } from '@/store/store';

const sports = [
  {
    id: 1,
    name: 'Beach Tennis',
    iconName: 'tennisball-outline',
  },
  {
    id: 2,
    name: 'Volleyball',
    iconName: 'basketball-outline',
  },
  {
    id: 3,
    name: 'Footvolley',
    iconName: 'football-outline',
  },
];

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

export default function Home() {
  const { selectedSport, selectedDate, setSport, setDate, selectedTimes } = useBookingStore();

  function handleConfirmBooking(courtId: number) {
    const selectedCourt = courts.find((court) => court.id === courtId);
    console.log('Informações da Reserva:');
    console.log('Esporte selecionado:', selectedSport?.name || 'Nenhum esporte selecionado');
    console.log('Quadra:', selectedCourt?.name);
    console.log('Localização:', selectedCourt?.location);
    console.log('Horários selecionados:', selectedTimes);
    console.log(
      'Data selecionada:',
      selectedDate?.toLocaleDateString() || 'Nenhuma data selecionada'
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-20">
          <Header />

          <SportSelect
            selectedSport={selectedSport?.id}
            onSelectSport={(sportId) => {
              const sport = sports.find((s) => s.id.toString() === sportId);
              if (sport) {
                setSport({ id: sportId, name: sport.name });
              }
            }}
          />

          <Calendar
            onSelectDay={(day) => {
              const date = new Date(day.date);
              setDate(date);
            }}
          />

          <AvailableCourts courts={courts} onConfirmBooking={handleConfirmBooking} />

          {/* My Bookings */}
          <View className="py-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Minhas Reservas</Text>
              <TouchableOpacity>
                <Text className="text-orange-500">Ver Todas</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-4 space-y-4">
              {bookings.map((booking) => (
                <View key={booking.id} className="rounded-lg bg-gray-50 p-4">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
