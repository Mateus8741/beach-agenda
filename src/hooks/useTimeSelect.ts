import { useState } from 'react';

interface TimeSelect {
  timeSlotId: string;
  time: string;
  courtId: string;
}

export function useTimeSelect() {
  const [selectedTimes, setSelectedTimes] = useState<TimeSelect[]>([]);

  const handleTimeSelect = (time: string, courtId: string, timeSlotId: string) => {
    setSelectedTimes((prev) => {
      const isSelected = prev.some((t) => t.time === time && t.courtId === courtId);

      if (isSelected) {
        return prev.filter((t) => !(t.time === time && t.courtId === courtId));
      }

      return [...prev, { timeSlotId, time, courtId }];
    });
  };

  const isTimeSelected = (time: string, courtId: string) => {
    return selectedTimes.some((t) => t.time === time && t.courtId === courtId);
  };

  return {
    selectedTimes,
    handleTimeSelect,
    isTimeSelected,
  };
}
