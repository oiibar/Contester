import { useEffect, useState } from 'react';
import { calculateDuration } from 'shared/lib/dateUtils';

const useContestDurations = (contests, intervalMs = 60000) => {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    const computeDurations = () => {
      setDurations(
        contests.reduce((acc, contest) => {
          acc[contest.id] = calculateDuration(
            new Date(contest.startDate),
            new Date(contest.endDate)
          );
          return acc;
        }, {})
      );
    };

    computeDurations(); // initial run
    const id = setInterval(computeDurations, intervalMs);

    return () => clearInterval(id);
  }, [contests, intervalMs]);

  return durations;
};

export default useContestDurations;
