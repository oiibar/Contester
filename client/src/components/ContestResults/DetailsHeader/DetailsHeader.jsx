import React from 'react';
import './DetailsHeader.scss';
import { FaClock } from 'react-icons/fa6';
import { FaCalendar } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';

const DetailsHeader = () => {
  return (
    <div className="section">
      <div>
        <h1>Algorithm Challenges 2026</h1>
        <div>Completed</div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, sunt!
      </p>
      <div>
        <p>
          <FaCalendar />
          <span>March 26, 2026</span>
        </p>
        <p>
          <FaClock />
          <span>Duration: 3 hours</span>
        </p>
        <p>
          <IoPeopleSharp />
          <span>105 Participants</span>
        </p>
      </div>
    </div>
  );
};

export default DetailsHeader;
