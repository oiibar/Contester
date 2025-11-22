import React from 'react';
import './Past.scss';
import { formatDate } from 'shared/lib/dateUtils';
import useContestDurations from 'hooks/contests/useContestDurations';
import { useAuth } from 'auth/AuthContext';

const Past = ({ contests, isLoading, error }) => {
  const durations = useContestDurations(contests);
  const { user } = useAuth();

  if (error) return <p>Error loading contests</p>;
  if (contests.length === 0) return null;

  return (
    <div className="section">
      <h2 className="section-title">Past Contests</h2>
      <table className="contests-table">
        <thead>
          <tr>
            <th>Contest Name</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Participants</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest) => {
            const isRegistered = contest.participants?.some(
              (p) => p.id === user?.id
            );
            return (
              <tr key={contest.id}>
                <td>{contest.title}</td>
                <td>{formatDate(contest.endDate)}</td>
                <td>{durations[contest.id] || '---'}</td>
                <td>{contest.participants?.length || 0}</td>
                <td>
                  <a className="view-results-btn">
                    {isRegistered ? 'View My Results' : 'View Results'}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Past);
