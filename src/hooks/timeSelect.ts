import { useCallback, useState } from 'react';

interface Time {
  time: string;
  isAvailable: boolean;
}

interface Court {
  id: number;
  times: Time[];
}

export function useTimeSelect() {
  const [selectedTimes, setSelectedTimes] = useState<{ [key: number]: string[] }>({});

  const handleTimeSelect = useCallback(
    (courtId: number, selectedTime: string, timeIndex: number, court: Court) => {
      if (!court.times[timeIndex].isAvailable) return;

      setSelectedTimes((prev) => {
        const courtSelectedTimes = prev[courtId] || [];

        if (courtSelectedTimes.includes(selectedTime)) {
          const index = courtSelectedTimes.indexOf(selectedTime);
          return {
            ...prev,
            [courtId]: courtSelectedTimes.slice(0, index),
          };
        }

        if (courtSelectedTimes.length > 0) {
          const lastSelectedIndex = court.times.findIndex(
            (t) => t.time === courtSelectedTimes[courtSelectedTimes.length - 1]
          );
          if (timeIndex !== lastSelectedIndex + 1) {
            return {
              ...prev,
              [courtId]: [selectedTime],
            };
          }
        }

        const newSelectedTimes = [...courtSelectedTimes, selectedTime];

        return {
          ...prev,
          [courtId]: newSelectedTimes,
        };
      });
    },
    []
  );

  const isTimeSelected = useCallback(
    (courtId: number, time: string) => {
      return selectedTimes[courtId]?.includes(time) ?? false;
    },
    [selectedTimes]
  );

  return {
    selectedTimes,
    handleTimeSelect,
    isTimeSelected,
  };
}
