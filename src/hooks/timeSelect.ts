import { useCallback, useState } from 'react';

interface Time {
  time: string;
  isAvailable: boolean;
}

interface Court {
  id: string;
  times: Time[];
}

export function useTimeSelect() {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const handleTimeSelect = useCallback((time: string) => {
    setSelectedTimes((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time);
      }
      return [...prev, time];
    });
  }, []);

  const isTimeSelected = useCallback(
    (time: string) => {
      return selectedTimes.includes(time);
    },
    [selectedTimes]
  );

  return {
    selectedTimes,
    handleTimeSelect,
    isTimeSelected,
  };
}
