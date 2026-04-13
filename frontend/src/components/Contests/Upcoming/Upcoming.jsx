import React from 'react';
import MyButton from 'shared/ui/MyButton/MyButton';
import './Upcoming.scss';
import { formatDate } from 'shared/lib/dateUtils';
import useContestDurations from 'hooks/contests/useContestDurations';
import { useAuth } from 'auth/AuthContext';
import { FaCalendar } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';

const Upcoming = ({ contests, navigateToProblems, isLoading, error }) => {
  const durations = useContestDurations(contests);
  const { user } = useAuth();

  if (error) return <p>Error loading contests</p>;
  if (contests.length === 0) return null;

  return (
    <div className="section">
      <h2 className="section-title">Upcoming Contests</h2>
      {contests.map((contest) => {
        const isRegistered = contest.participants?.some(
          (p) => p.id === user?.id
        );
        const buttonStyle = !isRegistered ? 'register' : '';

        return (
          <div key={contest.id} className="contest-row">
            <div className="contest-col">
              <h3 className="contest-name">{contest.title}</h3>
              <p className="contest-dates">
                <FaCalendar />
                {formatDate(contest.endDate)}
              </p>
              <p className="contest-dates">
                <FaClock />
                Duration: {durations[contest.id] || '---'}
              </p>
            </div>
            <MyButton
              className={buttonStyle}
              onClick={() => navigateToProblems(contest)}
            >
              {isRegistered ? 'Details' : 'Register'}
            </MyButton>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Upcoming);
