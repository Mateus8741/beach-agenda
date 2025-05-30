import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailableCourts, Calendar, Header, MyBookings, SportSelect } from '@/components';
import { useBooking } from '@/hooks';
import { useAgenda } from '@/hooks/useAgenda';

export default function Courts() {
  const { agendas } = useAgenda();
  const { arenaName } = useLocalSearchParams<{ arenaName: string }>();

  const { createBooking } = useBooking();

  function handleConfirmBooking(
    agendaId: string,
    selectedTimes: { id: string; time: string; courtId: string }[]
  ) {
    if (!selectedTimes.length) return;

    try {
      console.log(agendaId, selectedTimes);

      // createBooking({
      //   agendaId,
      //   timeSlotId: selectedTimes[0].id,
      // });

      Alert.alert('Sucesso', 'Reserva realizada com sucesso!');
      router.push('/bookings');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar a reserva. Tente novamente.');
    }
  }

  const courts =
    agendas?.map((agenda) => ({
      id: agenda.id,
      name: agenda.title || '',
      location: agenda.description || '',
      times:
        agenda.timeSlots?.map((slot) => ({
          id: slot.id,
          time: slot.time || '',
          isAvailable: slot.isAvailable ?? true,
        })) || [],
    })) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mb-4 px-4">
        <Header title={arenaName} />
      </View>

      <View className="mb-4 px-4">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
          <Ionicons name="arrow-back" size={24} color="#FF7A00" />
          <Text className="text-sm font-bold">Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-20">
          <Calendar />

          <SportSelect />

          <AvailableCourts
            courts={courts}
            onConfirmBooking={(agendaId, timeSlots) =>
              handleConfirmBooking(
                agendaId,
                timeSlots.map((t) => ({
                  id: t.id,
                  time: t.time,
                  courtId: t.courtId,
                }))
              )
            }
          />

          <MyBookings />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
