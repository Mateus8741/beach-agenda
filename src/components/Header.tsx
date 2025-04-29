import { Ionicons } from '@expo/vector-icons';
import { forwardRef } from 'react';
import { Pressable, Text, View } from 'react-native';

interface HeaderProps {
  onProfilePress?: () => void;
  profileImage?: string;
  title?: string;
}

export const Header = forwardRef<View, HeaderProps>(
  ({ onProfilePress, profileImage, title = 'Beach Agenda' }, ref) => {
    return (
      <View
        ref={ref}
        className="flex-row items-center justify-between border-b border-gray-200 bg-white py-3">
        <View className="flex-row items-center gap-3">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
            <Ionicons name="tennisball-outline" size={20} color="white" />
          </View>
          <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        </View>

        <Pressable
          onPress={onProfilePress}
          className="h-8 w-8 overflow-hidden rounded-full active:opacity-70">
          {profileImage ? (
            <View
              className="h-full w-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profileImage})` }}
            />
          ) : (
            <View className="h-full w-full items-center justify-center rounded-full bg-gray-200">
              <Ionicons name="person-outline" size={16} color="#666" />
            </View>
          )}
        </Pressable>
      </View>
    );
  }
);
