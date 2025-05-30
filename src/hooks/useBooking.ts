import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { type CreateBookingData, bookingUseCases } from '@/api/useCases/booking';

export function useBooking() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: bookingUseCases.listBookings,
  });

  const createBookingMutation = useMutation({
    mutationFn: (data: CreateBookingData) => bookingUseCases.createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  const deleteBookingMutation = useMutation({
    mutationFn: bookingUseCases.deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  return {
    bookings,
    isLoadingBookings,
    createBooking: createBookingMutation.mutate,

    deleteBooking: deleteBookingMutation.mutate,
    isCreating: createBookingMutation.isPending,
    isDeleting: deleteBookingMutation.isPending,
  };
}
