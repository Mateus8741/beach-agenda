import { api } from '../apiConfig';

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  agendaId: string;
  createdAt: string;
  updatedAt: string;
  Agenda: {
    title: string;
    description: string;
    date: string;
    arena: {
      name: string;
      location: string;
    };
  };
  timeSlots: TimeSlot[];
}

export interface CreateBookingData {
  agendaId: string;
  timeSlotId: string;
}

export const bookingUseCases = {
  async listBookings(): Promise<Booking[]> {
    const { data } = await api.get<Booking[]>('/booking');
    return data;
  },

  async createBooking(bookingData: CreateBookingData): Promise<Booking> {
    const { data } = await api.post<Booking>('/booking', bookingData);
    return data;
  },

  async deleteBooking(id: string): Promise<void> {
    await api.delete(`/booking/${id}`);
  },
};
