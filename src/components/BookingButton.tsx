import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

interface BookingButtonProps {
  selectedTimes: string[];
  onConfirm: () => void;
}

export function BookingButton({ selectedTimes, onConfirm }: BookingButtonProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      exiting={FadeOutDown.duration(200)}
      className="mt-4">
      <TouchableOpacity
        onPress={onConfirm}
        className="flex-row items-center justify-center rounded-lg bg-orange-500 px-4 py-3">
        <Ionicons name="calendar-outline" size={20} color="white" />
        <Text className="ml-2 font-medium text-white">
          Reservar {selectedTimes.length} horário
          {selectedTimes.length > 1 ? 's' : ''}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
