import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BeachTennisIcon } from '../../components/icons/BeachTennisIcon';
import { FootvolleyIcon } from '../../components/icons/FootvolleyIcon';
import { VolleyballIcon } from '../../components/icons/VolleyballIcon';

import { Header } from '@/components';

const sports = [
  {
    id: 1,
    name: 'Beach Tennis',
    Icon: BeachTennisIcon,
  },
  {
    id: 2,
    name: 'Volleyball',
    Icon: VolleyballIcon,
  },
  {
    id: 3,
    name: 'Footvolley',
    Icon: FootvolleyIcon,
  },
];

const days = [
  { id: 1, day: 'MON', date: '28', selected: true },
  { id: 2, day: 'TUE', date: '29' },
  { id: 3, day: 'WED', date: '30' },
  { id: 4, day: 'THU', date: '1' },
  { id: 5, day: 'FRI', date: '2' },
  { id: 6, day: 'SAT', date: '3' },
];

const courts = [
  {
    id: 1,
    name: 'Beach Tennis Court 1',
    location: 'Copacabana Beach',
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    id: 2,
    name: 'Beach Tennis Court 2',
    location: 'Ipanema Beach',
    times: ['8:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
  },
];

const bookings = [
  {
    id: 1,
    court: 'Beach Tennis Court 1',
    location: 'Copacabana Beach',
    date: 'Apr 28, 2025',
    time: '2:00 PM - 3:00 PM',
  },
  {
    id: 2,
    court: 'Volleyball Court 3',
    location: 'Leblon Beach',
    date: 'May 2, 2025',
    time: '4:00 PM - 5:00 PM',
  },
];

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-20">
          <Header />

          {/* Sports Selection */}
          <View className="flex-row space-x-4 py-4">
            {sports.map((sport) => (
              <TouchableOpacity key={sport.id} className="items-center">
                <View className="mb-1 h-16 w-16 items-center justify-center rounded-lg bg-orange-500">
                  <sport.Icon />
                </View>
                <Text className="text-center text-xs">{sport.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Calendar */}
          <View className="flex-row items-center justify-between py-4">
            <Text className="text-lg font-semibold">April 2025</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity>
                <Ionicons name="chevron-back-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chevron-forward-outline" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Days */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
            {days.map((item) => (
              <TouchableOpacity
                key={item.id}
                className={`h-16 w-12 items-center justify-center rounded-lg ${
                  item.selected ? 'bg-orange-500' : 'bg-gray-100'
                }`}>
                <Text className={`text-xs ${item.selected ? 'text-white' : 'text-gray-600'}`}>
                  {item.day}
                </Text>
                <Text
                  className={`text-lg font-semibold ${
                    item.selected ? 'text-white' : 'text-gray-900'
                  }`}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Available Courts */}
          <View className="py-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Available Courts</Text>
              <TouchableOpacity>
                <Text className="text-orange-500">View All</Text>
              </TouchableOpacity>
            </View>

            {/* Court Cards */}
            <View className="mt-4 space-y-4">
              {courts.map((court) => (
                <View key={court.id} className="rounded-lg bg-gray-50 p-4">
                  <View className="mb-2 flex-row items-center justify-between">
                    <View>
                      <Text className="font-semibold">{court.name}</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={14} color="#666" />
                        <Text className="ml-1 text-sm text-gray-600">{court.location}</Text>
                      </View>
                    </View>
                    <View className="rounded bg-green-100 px-2 py-1">
                      <Text className="text-xs text-green-600">Available</Text>
                    </View>
                  </View>

                  <View className="flex-row flex-wrap gap-2">
                    {court.times.map((time, timeIndex) => (
                      <TouchableOpacity
                        key={`${court.id}-${timeIndex}`}
                        className="rounded bg-orange-100 px-3 py-1">
                        <Text className="text-orange-500">{time}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* My Bookings */}
          <View className="py-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">My Bookings</Text>
              <TouchableOpacity>
                <Text className="text-orange-500">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-4 space-y-4">
              {bookings.map((booking) => (
                <View key={booking.id} className="rounded-lg bg-gray-50 p-4">
                  <View className="flex-row justify-between">
                    <View>
                      <Text className="font-semibold">{booking.court}</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="location-outline" size={14} color="#666" />
                        <Text className="ml-1 text-sm text-gray-600">{booking.location}</Text>
                      </View>
                      <View className="mt-2 flex-row items-center">
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text className="ml-1 text-sm text-gray-600">{booking.date}</Text>
                        <Text className="ml-4 text-sm text-gray-600">{booking.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
