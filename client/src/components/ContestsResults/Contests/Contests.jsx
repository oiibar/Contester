import React, { useEffect } from 'react';
import Contest from 'components/ContestsResults/Contest/Contest';
import './Contests.scss';

const Contests = ({ contests, navigateToContestResults, token }) => {
  return (
    <div className="contests-section">
      {contests.map((contest, index) => (
        <Contest
          contest={contest}
          navigateToContestResults={navigateToContestResults}
          token={token}
          key={index}
        />
      ))}
    </div>
  );
};

export default Contests;
