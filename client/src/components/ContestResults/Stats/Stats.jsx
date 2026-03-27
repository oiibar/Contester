import React from 'react';
import './Stats.scss';

const Stats = ({ contest }) => {
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
          <p>--1842--</p>
        </div>
        <div className="stat-item">
          <p className="stat-item-title">Problems Solved</p>
          <p>--8--</p>
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
