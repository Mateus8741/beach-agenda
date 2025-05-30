import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { BookingButton } from './BookingButton';

import { useTimeSelect } from '@/hooks';
import { useBookingStore } from '@/store/store';

interface Court {
  id: string;
  name: string;
  location: string;
  times: {
    id: string;
    time: string;
    isAvailable: boolean;
  }[];
}

interface AvailableCourtsProps {
  courts: Court[];
  onConfirmBooking?: (
    courtId: string,
    selectedTimes: { id: string; time: string; courtId: string }[]
  ) => void;
}

function getTimeSlotStyle(isSelected: boolean, isAvailable: boolean) {
  if (isSelected) return 'bg-orange-500';
  return isAvailable ? 'bg-orange-100 active:bg-orange-200' : 'bg-gray-200 opacity-50';
}

function getTimeSlotTextStyle(isSelected: boolean, isAvailable: boolean) {
  if (isSelected) return 'text-white';
  return isAvailable ? 'text-orange-500' : 'text-gray-500';
}

export function AvailableCourts({ courts, onConfirmBooking }: Readonly<AvailableCourtsProps>) {
  const { handleTimeSelect, isTimeSelected, selectedTimes } = useTimeSelect();
  const { selectedSport } = useBookingStore();

  const times = courts.map((court) => court.times.filter((t) => t.isAvailable));

  return (
    <View className="py-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">Quadras Disponíveis</Text>
      </View>

      {!selectedSport && (
        <View className="mt-2 rounded-lg bg-yellow-100 p-3">
          <Text className="text-center text-sm text-yellow-800">
            Selecione um esporte para fazer a reserva
          </Text>
        </View>
      )}

      <View className="mt-4 space-y-4">
        {courts.map((court, index) => (
          <View key={court.id} className="mb-4 rounded-lg bg-gray-50 p-4">
            <View className="mb-2 flex-row items-center justify-between">
              <View>
                <Text className="font-semibold">{court.name}</Text>
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={14} color="#666" />
                  <Text className="ml-1 text-sm text-gray-600">{court.location}</Text>
                </View>
              </View>
              <View
                className={`rounded px-2 py-1 ${
                  times[index].length > 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                <Text
                  className={`text-xs ${
                    times[index].length > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {times[index].length > 0 ? 'Disponível' : 'Indisponível'}
                </Text>
              </View>
            </View>

            <View className="mt-3">
              <Text className="mb-2 text-sm font-medium text-gray-600">Horários Disponíveis</Text>
              <View className="flex">
                <View className="flex-row flex-wrap gap-2">
                  {court.times.map((time, timeIndex) => {
                    const isSelected = isTimeSelected(time.time, court.id);

                    return (
                      <TouchableOpacity
                        key={`${court.id}-${timeIndex}`}
                        disabled={!time.isAvailable || !selectedSport}
                        onPress={() => {
                          handleTimeSelect(time.time, court.id, time.id);
                        }}
                        className={`h-8 w-14 items-center justify-center rounded-lg ${getTimeSlotStyle(
                          isSelected,
                          time.isAvailable && !!selectedSport
                        )}`}>
                        <Text
                          className={`text-sm font-medium ${getTimeSlotTextStyle(
                            isSelected,
                            time.isAvailable && !!selectedSport
                          )}`}>
                          {time.time}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {selectedTimes?.some((t) => t.courtId === court.id) && selectedSport && (
                <BookingButton
                  selectedTimes={selectedTimes
                    .filter((t) => t.courtId === court.id)
                    .map((t) => t.time)}
                  onPress={() => {
                    onConfirmBooking?.(
                      court.id,
                      selectedTimes
                        .filter((t) => t.courtId === court.id)
                        .map((t) => ({
                          id: t.timeSlotId,
                          time: t.time,
                          courtId: t.courtId,
                        }))
                    );
                  }}
                />
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
