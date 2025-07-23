import { useState, useEffect } from "react";
import { fetchUser, fetchUsers } from "api/api";
import { useAuth } from "hooks/auth/AuthProvider";
import { useFetching } from "hooks/useFetching";

export const useUserProfile = (userId) => {
    const { user: currentUser, token } = useAuth();
    const [users, setUsers] = useState([]);
    const [profileUser, setProfileUser] = useState(null);

    const { fetching, isLoading, error } = useFetching(async () => {
        if (token) {
            const data = await fetchUsers(token);
            setUsers(data);
        } else {
            setUsers([]);
        }
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (userId && token) {
                const fetchedUser = await fetchUser(userId, token);
                setProfileUser(fetchedUser);
            } else {
                setProfileUser(currentUser);
            }
        };
        fetchUserProfile();
        fetching();
    }, [userId, token, currentUser]);

    return {
        profileUser,
        setProfileUser,
        users,
        isLoading,
        error,
    };
};