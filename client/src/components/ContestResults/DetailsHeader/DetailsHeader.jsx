import React from 'react';
import './DetailsHeader.scss';
import { FaClock } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';
import { calculateDuration, formatDate } from 'shared/lib/dateUtils';

const DetailsHeader = ({ contest }) => {
  const duration = calculateDuration(contest.startDate, contest.endDate);
  const endDate = formatDate(contest.endDate);

  return (
    <div className="details-section">
      <div className="title-header">
        <div>
          <h1>{contest.title}</h1>
          <p className="description">{contest.description}</p>
        </div>
        <div className="completed-icon">Completed</div>
      </div>
      <div className="info">
        <p className="info-item">
          <FaCalendar />
          <span>{endDate}</span>
        </p>
        <p className="info-item">
          <FaClock />
          <span>Duration: {duration}</span>
        </p>
        <p className="info-item">
          <IoPeopleSharp />
          <span>{contest.participants.length} Participants</span>
        </p>
      </div>
    </div>
  );
};

export default DetailsHeader;
