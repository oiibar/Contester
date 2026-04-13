import React from 'react';
import './ProblemCard.scss';
import MyButton from 'shared/ui/MyButton/MyButton';

const difficultyLetterMap = {
  EASY: 'A',
  MEDIUM: 'B',
  HARD: 'C',
};

const ProblemCard = React.memo(
  ({ isRegistered, problem, onStartClick, contestData, user }) => {
    const difficultyClass = problem.difficulty.toLowerCase();
    const solved = user?.problems?.some((p) => p.id === problem.id);
    const successRateRaw =
      (problem.users.length / contestData.participants.length) * 100 || 0;
    const successRateRounded =
      contestData.participants.length != 0
        ? Math.round(successRateRaw * 10) / 10
        : 0;

    let status = 'UPCOMING';

    const now = Date.now();
    const start = new Date(contestData.startDate).getTime();
    const end = new Date(contestData.endDate).getTime();
    if (start > now) {
      status = 'UPCOMING';
    } else if (start <= now && end >= now) {
      status = 'ONGOING';
    } else {
      status = 'PAST';
    }

    return (
      <div className="problem-card">
        <div className="problem-info">
          <span className={`problem-tag ${difficultyClass}`}>
            {difficultyLetterMap[problem.difficulty.toUpperCase()] || '?'}
          </span>
          <div className="problem-details">
            <h3>{problem.title}</h3>
            <div className="problem-detailed">
              <p>Difficulty: {problem.difficulty}</p>
              <p>Success Rate: {successRateRounded}%</p>
              <p>Points: {problem.points}</p>
            </div>
          </div>
        </div>
        {isRegistered && (
          <div className="problem-details">
            <span className={`problem-status ${difficultyClass}`}>
              {solved ? 'Solved' : 'Unsolved'}
            </span>
            {status === 'ONGOING' && (
              <MyButton onClick={() => onStartClick(problem)}>
                {solved ? 'Review' : 'Attempt'}
              </MyButton>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default ProblemCard;
