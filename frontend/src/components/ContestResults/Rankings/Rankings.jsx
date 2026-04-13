import React from 'react';
import './Rankings.scss';
import { FaDownload } from 'react-icons/fa6';
import { FaCrown } from 'react-icons/fa6';
import { FaMedal } from 'react-icons/fa';

const Rankings = ({ contest }) => {
  const participants = contest.participants || [];
  const problems = contest.problems || [];
  const userScores = contest.userScores || {};

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

  const participantsWithStats = participants.map((participant) => {
    const solvedCount = getUserSolvedProblems(participant.id);
    let totalPoints = 0;
    for (const problem of problems) {
      const isSolved = problem.users.some((user) => user.id === participant.id);
      if (isSolved) {
        totalPoints += problem.points;
      }
    }

    return {
      ...participant,
      problemsSolved: solvedCount,
      totalPoints: totalPoints,
      scoreFromBackend: userScores[participant.id] || 0,
    };
  });

  const sortedParticipants = [...participantsWithStats].sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    return b.problemsSolved - a.problemsSolved;
  });

  const getRankDisplay = (index) => {
    if (index === 0) {
      return (
        <div className="rank">
          <FaCrown />
          <p>1st</p>
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="rank rank-secondary">
          <div className="rank-icon">
            <FaMedal />
          </div>
          <p>2nd</p>
        </div>
      );
    } else if (index === 2) {
      return (
        <div className="rank rank-secondary">
          <div className="rank-icon">
            <FaMedal />
          </div>
          <p>3rd</p>
        </div>
      );
    } else {
      return (
        <div className="rank rank-normal">
          <p>{index + 1}th</p>
        </div>
      );
    }
  };

  const getRowClassName = (index) => {
    return index < 3 ? 'gray-background' : '';
  };

  return (
    <div className="section-rankings">
      <div className="rankings-header">
        <h3>Final Rankings</h3>
        <div className="action-button">
          <FaDownload />
          Export
        </div>
      </div>

      <table className="rankings-table">
        <tbody>
          <tr className="gray-background">
            <th>RANK</th>
            <th>PARTICIPANT</th>
            <th>SCORE</th>
            <th>PROBLEMS SOLVED</th>
            <th>TIME</th>
          </tr>

          {sortedParticipants.map((participant, index) => (
            <tr key={index} className={getRowClassName(index)}>
              <td>{getRankDisplay(index)}</td>
              <td>
                <div className="participant">
                  <div className="user-profile"></div>
                  <div>
                    <p>
                      {participant.firstName} {participant.lastName}
                    </p>
                    <p className="nickname">@{participant.firstName}</p>
                  </div>
                </div>
              </td>
              <td>{participant.totalPoints}</td>
              <td>
                {getUserSolvedProblems(participant.id)}/{problems.length}
              </td>
              <td>{participant.time || '--2h 34m--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rankings;
