import React from 'react';
import Contest from 'components/ContestsResults/Contest/Contest';
import './Contests.scss';

const Contests = () => {
  return (
    <div className="contests-section">
      <Contest />
      <Contest />
      <Contest />
    </div>
  );
};

export default Contests;
