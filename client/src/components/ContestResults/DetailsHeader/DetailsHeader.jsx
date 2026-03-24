import React from 'react';
import './DetailsHeader.scss';
import { FaClock } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';

const DetailsHeader = () => {
  return (
    <div className="details-section">
      <div className="title-header">
        <div>
          <h1>Algorithm Challenges 2026</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores,
            sunt!
          </p>
        </div>
        <div className="completed-icon">Completed</div>
      </div>
      <div className="info">
        <p className="info-item">
          <FaCalendar />
          <span>March 26, 2026</span>
        </p>
        <p className="info-item">
          <FaClock />
          <span>Duration: 3 hours</span>
        </p>
        <p className="info-item">
          <IoPeopleSharp />
          <span>105 Participants</span>
        </p>
      </div>
    </div>
  );
};

export default DetailsHeader;
