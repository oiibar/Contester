import { useState, useEffect } from 'react';
import { useFetching } from '../fetching/useFetching';
import { fetchUsers } from '../../api/api';

export const useLeaderboard = (token) => {
  const [users, setUsers] = useState([]);

  const { fetching, isLoading, error } = useFetching(async () => {
    if (token) {
      const data = await fetchUsers(token);
      setUsers(data);
    } else {
      setUsers([]);
    }
  });

  useEffect(() => {
    let isMounted = true;
    fetching().catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [token]);

  return { users, isLoading, error };
};
