import React from 'react';
import './LeaderboardSkeleton.scss';

const LeaderboardSkeleton = () => {
  const rows = Array.from({ length: 10 });

  return (
    <div className="leaderboard">
      <div className="leaderboard-filters">
        <div
          className="skeleton"
          style={{ width: '200px', height: '36px', borderRadius: '6px' }}
        />
        <div
          className="skeleton"
          style={{ width: '200px', height: '36px', borderRadius: '6px' }}
        />
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>RANK</th>
            <th>USER</th>
            <th>RATING</th>
            <th>PROBLEMS SOLVED</th>
            <th>CONTEST RATING</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr key={i}>
              <td>
                <div
                  className="skeleton"
                  style={{ width: '30px', height: '16px' }}
                />
              </td>
              <td className="user-info">
                <div
                  className="skeleton"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <div className="user-details">
                  <div
                    className="skeleton"
                    style={{ width: '100px', height: '14px' }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: '60px', height: '12px' }}
                  />
                </div>
              </td>
              <td>
                <div
                  className="skeleton"
                  style={{ width: '50px', height: '14px' }}
                />
              </td>
              <td>
                <div
                  className="skeleton"
                  style={{ width: '70px', height: '14px' }}
                />
              </td>
              <td>
                <div
                  className="skeleton"
                  style={{ width: '80px', height: '14px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(LeaderboardSkeleton);
