import { useState, useEffect } from 'react';
import { fetchUser, fetchUsers } from 'api/api';
import { useAuth } from 'auth/AuthContext';

export const useUserProfile = (userId) => {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setUsers([]);
      setProfileUser(currentUser);
      return;
    }

    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [allUsers, profile] = await Promise.all([
          fetchUsers(token, { signal: controller.signal }),
          userId
            ? fetchUser(userId, token, { signal: controller.signal })
            : Promise.resolve(currentUser),
        ]);

        setUsers(allUsers);
        setProfileUser(profile);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [userId, token, currentUser]);

  return { profileUser, setProfileUser, users, isLoading, error };
};
