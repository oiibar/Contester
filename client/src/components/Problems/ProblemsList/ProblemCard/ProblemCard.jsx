import React from 'react';
import './ProblemCard.scss';
import MyButton from 'shared/ui/MyButton/MyButton';

const difficultyLetterMap = {
  EASY: 'A',
  MEDIUM: 'B',
  HARD: 'C',
};

const ProblemCard = React.memo(
  ({ isRegistered, problem, onStartClick, contestData }) => {
    const difficultyClass = problem.difficulty.toLowerCase();

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
              <p>Success Rate: {problem.successRate}%</p>
              <p>Points: {problem.points}</p>
            </div>
          </div>
        </div>
        {isRegistered && (
          <div className="problem-details">
            <span className={`problem-status ${difficultyClass}`}>
              Unsolved
            </span>
            {/*{isRegistered && (*/}
            {/*    <MyButton onClick={() => onStartClick(problem)}>Attempt</MyButton>*/}
            {/*)}*/}
            {contestData.status !== 'UPCOMING' && (
              <MyButton onClick={() => onStartClick(problem)}>Attempt</MyButton>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default ProblemCard;
