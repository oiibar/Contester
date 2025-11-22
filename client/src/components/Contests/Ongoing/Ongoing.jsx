import React from 'react';
import MyButton from 'shared/ui/MyButton/MyButton';
import './Ongoing.scss';
import { formatDate } from 'shared/lib/dateUtils';
import useContestDurations from 'hooks/contests/useContestDurations';
import { useAuth } from 'auth/AuthContext';

const Ongoing = ({ contests, navigateToProblems, isLoading, error }) => {
  const durations = useContestDurations(contests);
  const { user } = useAuth();

  if (error) return <p>Error loading contests</p>;
  if (contests.length === 0) return null;

  return (
    <div className="section">
      <h2 className="section-title">Ongoing Contests</h2>
      {contests.map((contest) => {
        const isRegistered = contest.participants?.some(
          (p) => p.id === user?.id
        );
        const buttonStyle = !isRegistered ? 'register' : '';

        return (
          <div key={contest.id} className="contest-row">
            <div className="contest-col">
              <h3 className="contest-name">{contest.title}</h3>
              <p className="contest-dates">{formatDate(contest.endDate)}</p>
              <p className="contest-dates">
                Duration: {durations[contest.id] || '---'}
              </p>
            </div>
            <MyButton
              className={buttonStyle}
              onClick={() => navigateToProblems(contest)}
            >
              {isRegistered ? 'Continue' : 'Register'}
            </MyButton>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Ongoing);
