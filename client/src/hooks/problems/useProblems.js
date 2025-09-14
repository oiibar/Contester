import { useState, useEffect, useMemo } from 'react';
import { fetchContest } from 'api/api';

export const useProblems = (contestId, token, user) => {
  const [contestData, setContestData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isRegistered = useMemo(() => {
    if (!user || !Array.isArray(contestData?.participants)) return false;
    return contestData.participants.some((p) => p.id === user.id);
  }, [user, contestData]);

  useEffect(() => {
    if (!contestId || !token) return;

    const controller = new AbortController();

    const loadContest = async () => {
      try {
        setIsLoading(true);
        const data = await fetchContest(contestId, token, {
          signal: controller.signal,
        });
        setContestData(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch contest.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadContest();

    return () => controller.abort();
  }, [contestId, token]);

  return { contestData, setContestData, isRegistered, isLoading, error };
};
