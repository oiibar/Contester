import { useState, useEffect } from 'react';
import { useFetching } from '../fetching/useFetching';
import { fetchContests } from 'api/api';

export const useContests = (token) => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [ongoing, setOngoing] = useState([]);

  const { fetching, isLoading, error } = useFetching(async () => {
    if (token) {
      const data = await fetchContests(token);
      const now = Date.now();
      setUpcoming(data.filter((c) => new Date(c.startDate) > now));
      setOngoing(
        data.filter(
          (c) => new Date(c.startDate) <= now && new Date(c.endDate) >= now
        )
      );
      setPast(data.filter((c) => new Date(c.endDate) < now));
    } else {
      setUpcoming([]);
      setOngoing([]);
      setPast([]);
    }
  });

  useEffect(() => {
    fetching();
  }, [token]);

  return { upcoming, ongoing, past, isLoading, error };
};
