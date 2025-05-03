import { addDays, format, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRef } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useBookingStore } from '@/store';

const daysToRender = 14;

export function Calendar() {
  const { selectedDate, setDate } = useBookingStore();

  const startDate = startOfWeek(new Date(), { weekStartsOn: 1, locale: ptBR });
  const dates = Array.from({ length: daysToRender }, (_, i) => addDays(startDate, i));

  const calendarRef = useRef<FlatList<Date>>(null);

  const handleDateSelect = (date: Date) => {
    setDate(date);
    const index = dates.findIndex((d) => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    if (index !== -1) {
      calendarRef.current?.scrollToItem({
        item: dates[index],
        animated: true,
        viewPosition: 0.5,
      });
    }
  };

  return (
    <View className="mt-4">
      <Text className="mb-4 text-lg font-bold capitalize">
        {format(selectedDate ?? new Date(), 'MMMM yyyy', { locale: ptBR })}
      </Text>

      <FlatList
        data={dates}
        ref={calendarRef}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        renderItem={({ item }) => {
          const isSelected =
            format(item, 'yyyy-MM-dd') === format(selectedDate ?? new Date(), 'yyyy-MM-dd');

          return (
            <Pressable
              onPress={() => handleDateSelect(item)}
              className={`mx-1 items-center justify-center rounded-xl px-3 py-2 ${
                isSelected ? 'bg-orange-500' : 'bg-gray-100'
              }`}>
              <Text
                className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                {format(item, 'EEEEEE', { locale: ptBR }).toUpperCase()}
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
