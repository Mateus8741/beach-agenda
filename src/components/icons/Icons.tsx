import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

interface IconProps {
  color?: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export function Icon({ color = 'white', iconName }: Readonly<IconProps>) {
  return (
    <View className="h-8 w-8 items-center justify-center">
      <Ionicons name={iconName} size={24} color={color} />
    </View>
  );
}
