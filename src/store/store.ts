import { create } from 'zustand';

interface Sport {
  id: string;
  name: string;
}

interface Court {
  id: number;
  name: string;
  location: string;
}

interface BookingState {
  selectedSport: Sport | null;
  selectedDate: Date | null;
  selectedCourt: Court | null;
  selectedTimes: string[];

  setSport: (sport: Sport) => void;
  setDate: (date: Date) => void;
  setCourt: (court: Court) => void;
  setTimes: (times: string[]) => void;
  resetBooking: () => void;
}

const initialState = {
  selectedSport: null,
  selectedDate: null,
  selectedCourt: null,
  selectedTimes: [],
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setSport: (sport) => set({ selectedSport: sport }),

  setDate: (date) => set({ selectedDate: date }),

  setCourt: (court) => set({ selectedCourt: court }),

  setTimes: (times) => set({ selectedTimes: times }),

  resetBooking: () => set(initialState),
}));

export const canConfirmBooking = (state: BookingState) => {
  return (
    state.selectedSport !== null &&
    state.selectedDate !== null &&
    state.selectedCourt !== null &&
    state.selectedTimes.length > 0
  );
};
