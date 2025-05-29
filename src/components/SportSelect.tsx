import type { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Icon } from './icons/Icons';

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

export function SportSelect() {
  const { selectedSport, setSport } = useBookingStore();

  const SPORT_OPTIONS = useMemo(() => {
    return sports;
  }, []);

  return (
    <View className="mt-4 flex-col py-4">
      <Text className="mb-4 text-lg font-bold capitalize">Esporte</Text>

      <View className="flex-row gap-3">
        {SPORT_OPTIONS.map((sport) => {
          const isSelected = sport.id.toString() === selectedSport?.id.toString();

          return (
            <TouchableOpacity
              key={sport.id}
              className={
                isSelected
                  ? 'flex-1 items-center rounded-lg bg-orange-500 px-3 py-2'
                  : 'flex-1 items-center rounded-lg border border-gray-200 bg-white px-3 py-2'
              }
              onPress={() => setSport({ id: sport.id.toString(), name: sport.name })}>
              <View className="mb-1">
                <Icon
                  color={isSelected ? 'white' : '#6B7280'}
                  iconName={sport.iconName as keyof typeof Ionicons.glyphMap}
                />
              </View>
              <Text
                className={
                  isSelected
                    ? 'text-center text-xs text-white'
                    : 'text-center text-xs text-gray-600'
                }>
                {sport.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
