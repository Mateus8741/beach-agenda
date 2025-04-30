import { addDays, format, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

interface Day {
  id: number;
  day: string;
  date: string;
  selected: boolean;
}

interface CalendarProps {
  month: string;
  year: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: Day) => void;
}

const daysToRender = 14;

export function Calendar({
  month,
  year,
  onPreviousMonth,
  onNextMonth,
  onSelectDay,
}: Readonly<CalendarProps>) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1, locale: ptBR });
  const dates = Array.from({ length: daysToRender }, (_, i) => addDays(startDate, i));

  return (
    <View className="mt-6">
      <Text className="mb-4 text-lg font-bold">April 2025</Text>

      <FlatList
        data={dates}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = format(item, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

          return (
            <Pressable
              onPress={() => setSelectedDate(item)}
              className={`mx-1 items-center justify-center rounded-xl px-3 py-2 ${
                isSelected ? 'bg-orange-500' : 'bg-gray-100'
              }`}>
              <Text
                className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                {format(item, 'EEE').toUpperCase()}
              </Text>
              <Text className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-black'}`}>
                {format(item, 'd')}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
