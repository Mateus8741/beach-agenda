import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

interface Day {
  id: number;
  day: string;
  date: string;
  selected: boolean;
}

const days: Day[] = [
  { id: 1, day: 'MON', date: '28', selected: true },
  { id: 2, day: 'TUE', date: '29', selected: false },
  { id: 3, day: 'WED', date: '30', selected: false },
  { id: 4, day: 'THU', date: '1', selected: false },
  { id: 5, day: 'FRI', date: '2', selected: false },
  { id: 6, day: 'SAT', date: '3', selected: false },
];

export function Calendar({
  month,
  year,
  onPreviousMonth,
  onNextMonth,
  onSelectDay,
}: Readonly<CalendarProps>) {
  return (
    <View>
      <View className="flex-row items-center justify-between py-4">
        <Text className="text-lg font-semibold">{`${month} ${year}`}</Text>
        <View className="flex-row space-x-2">
          <TouchableOpacity onPress={onPreviousMonth}>
            <Ionicons name="chevron-back-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextMonth}>
            <Ionicons name="chevron-forward-outline" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
        {days.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onSelectDay(item)}
            className={`h-16 w-12 items-center justify-center rounded-lg ${
              item.selected ? 'bg-orange-500' : 'bg-gray-100'
            }`}>
            <Text className={`text-xs ${item.selected ? 'text-white' : 'text-gray-600'}`}>
              {item.day}
            </Text>
            <Text
              className={`text-lg font-semibold ${item.selected ? 'text-white' : 'text-gray-900'}`}>
              {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
