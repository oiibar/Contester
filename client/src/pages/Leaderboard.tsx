import React, { useEffect, useState } from "react";
import "../styles/Leaderboard.scss";
import { useFetching } from "../hooks/useFetching";
import { fetchUsers } from "../api/api";
import { useAuth } from "../hooks/AuthProvider";
import MyButton from "../components/UI/MyButton/MyButton";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  password: string;
  avatar: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const Leaderboard: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const { fetching, isLoading, error } = useFetching(async () => {
    if (token) {
      const response = await fetchUsers(token);
      setUsers(response.data || []);
    } else {
      setUsers([]);
    }
  });

  useEffect(() => {
    fetching();
  }, [token]);

  return (
      <div className="leaderboard">
        <div className="leaderboard-header">
          <h1>Leaderboard</h1>
          <p>
            Celebrate the top coding talent on Contester. Are you ready to claim
            the top spot?
          </p>
        </div>
        {isLoading ? (
            <p>Loading leaderboard...</p>
        ) : error ? (
            <div className="error-message">
              <h2>Failed to load leaderboard</h2>
              <p>{error}</p>
              <MyButton onClick={() => fetching()}>Retry</MyButton>
            </div>
        ) : users.length > 0 ? (
            <div className="leaderboard-content">
              {users.map((user, index) => (
                  <div key={user.id} className="leaderboard-card">
                    <div className="rank-badge">#{index + 1}</div>
                    <div className="user-info">
                      {user?.avatar ? (
                          <img
                              src={user.avatar}
                              alt="Avatar"
                              className="avatar"
                          />
                      ) : (
                          <div className="user-avatar-placeholder">
                            {user.username[0].toUpperCase()}
                          </div>
                      )}
                      <div>
                        <h3>{user.username}</h3>
                        <p>{user.points} points</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        ) : (
            <div className="no-leaderboard">
              <h2>No users found for the leaderboard.</h2>
              <p>Check back later or participate to climb the ranks!</p>
            </div>
        )}
      </div>
  );
};

export default Leaderboard;