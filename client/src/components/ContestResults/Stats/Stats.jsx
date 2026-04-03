import React from 'react';
import './Stats.scss';
import { useAuth } from '../../../auth/AuthContext';

const Stats = ({ contest }) => {
  const { user } = useAuth();
  const problems = contest.problems;
  const userId = user.id;
  const userScores = contest.userScores || {};
  const participants = contest.participants || [];

  const getUserSolvedProblems = (userId) => {
    let solvedCount = 0;
    for (const problem of problems) {
      const isSolved = problem.users.some((user) => user.id === userId);
      if (isSolved) {
        solvedCount++;
      }
    }
    return solvedCount;
  };

  return (
    <div className="stats-section">
      <h3>Contest Statistics</h3>
      <div className="stat-items">
        <div className="stat-item">
          <p className="stat-item-title">Total Participants</p>
          <p>{contest.participants.length}</p>
        </div>
        <div className="stat-item">
          <p className="stat-item-title">Average Score</p>
          <p>--1500--</p>
        </div>
        <div className="stat-item">
          <p className="stat-item-title">Problems Solved</p>
          <p>{getUserSolvedProblems(userId)}</p>
        </div>
        <div className="stat-item">
          <p className="stat-item-title">Completion Rate</p>
          <p>--73%--</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
