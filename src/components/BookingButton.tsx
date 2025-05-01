import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

interface BookingButtonProps extends TouchableOpacityProps {
  selectedTimes: string[];
}

export function BookingButton({ selectedTimes, ...props }: Readonly<BookingButtonProps>) {
  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutDown.duration(200).springify()}
      className="mt-4">
      <TouchableOpacity
        className="flex-row items-center justify-center rounded-lg bg-orange-500 px-4 py-3"
        {...props}>
        <Ionicons name="calendar-outline" size={20} color="white" />
        <Text className="ml-2 font-medium text-white">
          Reservar {selectedTimes.length} horário
          {selectedTimes.length > 1 ? 's' : ''}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
