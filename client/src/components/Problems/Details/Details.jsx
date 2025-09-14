import React, { useEffect, useState } from 'react';
import './Details.scss';
import { calculateDuration, formatDate } from 'utils/dateUtils';

const Details = ({ contestData }) => {
  const [isError, setIsError] = useState(false);
  const duration = calculateDuration(
    new Date(contestData.startDate),
    new Date(contestData.endDate)
  );
  const { startDate, endDate } = contestData;

  useEffect(() => {
    if (!contestData || !contestData.endDate || !contestData.startDate) {
      setIsError(true);
    }
  }, [contestData]);

  if (isError) return <div>Error: Invalid contest data</div>;

  return (
    <div className="contest-info">
      <div className="info-box">
        <h3>Contest Details</h3>
        <p>Duration: {duration || '---'}</p>
        <p>Start Time: {startDate ? formatDate(startDate) : '---'}</p>
        <p>End Time: {endDate ? formatDate(endDate) : '---'}</p>
      </div>
      <div className="info-box">
        <h3>Participants</h3>
        <p>Registered: {contestData.participants.length || 0}</p>
        <p>Max Rating: ---</p>
        <p>Min Rating: ---</p>
      </div>
      <div className="info-box">
        <h3>Rules</h3>
        <ul>
          <li>You must solve problems independently</li>
          <li>Multiple submissions are allowed</li>
          <li>Penalties apply for wrong submissions</li>
          <li>Internet access is allowed for documentation</li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
