import React, { useEffect, useState } from 'react';
import './Header.scss';
import { formatDate } from 'shared/lib/dateUtils';

const Header = ({ user, users }) => {
  const [userRank, setUserRank] = useState(null);
  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => b.rating - a.rating);
    const rank = sortedUsers.findIndex((u) => u.id === user.id) + 1;
    setUserRank(rank);
  }, [users, user.id]);
  if (!user) {
    return <div>Loading header...</div>;
  }
  return (
    <div className="profile-header">
      <div className="profile-photo">{user.username[0].toUpperCase()}</div>
      <div className="profile-details">
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>@{user.username}</p>
        <div className="profile-meta">
          <span>📅 Here since: {formatDate(user.createdAt)}</span>
          <span>
            💻 {user.problems.length} Problem{user.problems.length !== 1 && 's'}{' '}
            Solved
          </span>
          <span>🏆 Rank: {userRank ? `#${userRank}` : '---'}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
