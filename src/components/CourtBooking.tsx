import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Court {
  id: number;
  name: string;
  status: 'available' | 'booked';
  timeSlots: string[];
}

interface CourtBookingProps {
  arenaId: number;
  onBack: () => void;
}

export function CourtBooking({ arenaId, onBack }: CourtBookingProps) {
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // This would come from an API in a real app
  const arenaCourts: Record<number, Court[]> = {
    1: [
      {
        id: 1,
        name: 'Quadra 1',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
      {
        id: 2,
        name: 'Quadra 2',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
      {
        id: 3,
        name: 'Quadra 3',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
    ],
    2: [
      {
        id: 1,
        name: 'Quadra A',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
      {
        id: 2,
        name: 'Quadra B',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
    ],
    3: [
      {
        id: 1,
        name: 'Quadra Principal',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
      {
        id: 2,
        name: 'Quadra VIP',
        status: 'available',
        timeSlots: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
        ],
      },
    ],
  };

  const courts = arenaCourts[arenaId] || [];

  const handleBooking = () => {
    if (selectedCourt && selectedTime) {
      // TODO: Implement booking logic
      console.log(`Booking court ${selectedCourt} at ${selectedTime} in arena ${arenaId}`);
    }
  };

  return (
    <View className="flex-1 p-4">
      <TouchableOpacity onPress={onBack} className="mb-4">
        <Text className="text-blue-500">← Voltar para arenas</Text>
      </TouchableOpacity>

      <Text className="mb-4 text-2xl font-bold">Quadras Disponíveis</Text>

      <ScrollView className="flex-1">
        {courts.map((court) => (
          <View key={court.id} className="mb-6">
            <Text className="mb-2 text-xl font-semibold">{court.name}</Text>
            <View className="flex-row flex-wrap gap-2">
              {court.timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  className={`rounded-lg px-4 py-2 ${
                    selectedCourt === court.id && selectedTime === time
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                  onPress={() => {
                    setSelectedCourt(court.id);
                    setSelectedTime(time);
                  }}>
                  <Text
                    className={`${
                      selectedCourt === court.id && selectedTime === time
                        ? 'text-white'
                        : 'text-gray-800'
                    }`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        className={`mt-4 rounded-lg p-4 ${
          selectedCourt && selectedTime ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        onPress={handleBooking}
        disabled={!selectedCourt || !selectedTime}>
        <Text className="text-center font-bold text-white">
          {selectedCourt && selectedTime
            ? `Reservar Quadra ${selectedCourt} às ${selectedTime}`
            : 'Selecione uma quadra e horário'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
