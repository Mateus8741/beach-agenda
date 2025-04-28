import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text className={`text-xs ${focused ? 'text-orange-500' : 'text-gray-600'}`}>Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#f97316' : '#666'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text className={`text-xs ${focused ? 'text-orange-500' : 'text-gray-600'}`}>
              Search
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={24}
              color={focused ? '#f97316' : '#666'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text className={`text-xs ${focused ? 'text-orange-500' : 'text-gray-600'}`}>
              Bookings
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={24}
              color={focused ? '#f97316' : '#666'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text className={`text-xs ${focused ? 'text-orange-500' : 'text-gray-600'}`}>
              Calendar
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={24}
              color={focused ? '#f97316' : '#666'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text className={`text-xs ${focused ? 'text-orange-500' : 'text-gray-600'}`}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? '#f97316' : '#666'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
