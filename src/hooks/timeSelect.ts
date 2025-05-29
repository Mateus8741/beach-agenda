import { useCallback, useState } from 'react';

interface TimeSelect {
  time: string;
  courtId: string;
}

export function useTimeSelect() {
  const [selectedTimes, setSelectedTimes] = useState<TimeSelect[]>([]);

  const handleTimeSelect = useCallback((time: string, courtId: string) => {
    setSelectedTimes((prev) => {
      if (prev.some((t) => t.time === time && t.courtId === courtId)) {
        return prev.filter((t) => t.time !== time || t.courtId !== courtId);
      }
      return [...prev, { time, courtId }];
    });
  }, []);

  const isTimeSelected = useCallback(
    (time: string, courtId: string) => {
      return selectedTimes.some((t) => t.time === time && t.courtId === courtId);
    },
    [selectedTimes]
  );

  return {
    selectedTimes,
    handleTimeSelect,
    isTimeSelected,
  };
}
