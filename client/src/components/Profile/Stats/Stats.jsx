import React, { useEffect, useState } from 'react';
import './Stats.scss';

const Stats = ({ user, users }) => {
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => b.rating - a.rating);
    const rank = sortedUsers.findIndex((u) => u.id === user.id) + 1;
    setUserRank(rank);
  }, [users, user.id]);

  return (
    <div className="profile-stats">
      <h2>Statistics</h2>
      <p>
        <strong>Problems Solved:</strong> {user.problemsSolved}
      </p>
      <p>
        <strong>Contest Rating:</strong> {user.rating}
      </p>
      <p>
        <strong>Global Rank:</strong> {userRank ? `#${userRank}` : '---'}
      </p>
    </div>
  );
};

export default Stats;
