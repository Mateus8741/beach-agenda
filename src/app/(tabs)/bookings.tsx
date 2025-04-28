import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Booking = {
  id: number;
  sport: string;
  court: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  players: number;
};

const upcomingBookings: Booking[] = [
  {
    id: 1,
    sport: 'Beach Tennis',
    court: 'Court 1',
    location: 'Copacabana Beach',
    date: 'Today',
    time: '10:00 AM',
    duration: '1 hour',
    players: 4,
  },
  {
    id: 2,
    sport: 'Volleyball',
    court: 'Court 3',
    location: 'Ipanema Beach',
    date: 'Tomorrow',
    time: '2:00 PM',
    duration: '2 hours',
    players: 6,
  },
];

const pastBookings: Booking[] = [
  {
    id: 3,
    sport: 'Footvolley',
    court: 'Court 2',
    location: 'Copacabana Beach',
    date: 'Yesterday',
    time: '4:00 PM',
    duration: '1 hour',
    players: 4,
  },
];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const renderBookingCard = (booking: Booking) => (
    <TouchableOpacity key={booking.id} className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="mr-3 rounded-lg bg-orange-100 p-2">
            <Ionicons name="tennisball-outline" size={24} color="#f97316" />
          </View>
          <View>
            <Text className="text-lg font-semibold">{booking.sport}</Text>
            <Text className="text-gray-600">{booking.court}</Text>
          </View>
        </View>
        <TouchableOpacity className="rounded-lg bg-gray-100 px-3 py-1">
          <Text className="text-sm text-gray-600">Details</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 space-y-2">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text className="ml-2 text-gray-600">{booking.location}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text className="ml-2 text-gray-600">
            {booking.date} at {booking.time} • {booking.duration}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text className="ml-2 text-gray-600">{booking.players} players</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4">
        {/* Header */}
        <Text className="mb-4 text-2xl font-bold">My Bookings</Text>

        {/* Tabs */}
        <View className="mb-4 flex-row rounded-lg bg-gray-100 p-1">
          <TouchableOpacity
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 rounded-md py-2 ${activeTab === 'upcoming' ? 'bg-white' : ''}`}>
            <Text
              className={`text-center ${
                activeTab === 'upcoming' ? 'font-semibold text-black' : 'text-gray-600'
              }`}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('past')}
            className={`flex-1 rounded-md py-2 ${activeTab === 'past' ? 'bg-white' : ''}`}>
            <Text
              className={`text-center ${
                activeTab === 'past' ? 'font-semibold text-black' : 'text-gray-600'
              }`}>
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'upcoming'
            ? upcomingBookings.map(renderBookingCard)
            : pastBookings.map(renderBookingCard)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
