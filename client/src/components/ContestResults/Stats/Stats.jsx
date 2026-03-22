import React from 'react';
import './Stats.scss';

const Stats = () => {
  return (
    <div className="section">
      <h3>Contest Statistics</h3>
      <div>
        <div>
          <p>Total Participants</p>
          <p>247</p>
        </div>
        <div>
          <p>Average Score</p>
          <p>1842</p>
        </div>
        <div>
          <p>Problems Solved</p>
          <p>8</p>
        </div>
        <div>
          <p>Completion Rate</p>
          <p>73%</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
