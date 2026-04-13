import React from 'react';
import './Header.scss';
import { formatDate } from 'shared/lib/dateUtils';
import RegisterButton from './RegisterButton';
import { FaCalendar } from 'react-icons/fa';
import { IoPeopleSharp } from 'react-icons/io5';

const Header = ({ isRegistered, contestData, setContestData }) => {
  return (
    <div className="contest-header">
      <div>
        <h1 className="contest-title">
          {contestData.title || 'Contest Title'}
        </h1>
        <p className="contest-time">
          <FaCalendar />
          {formatDate(contestData.endDate)
            ? `Ends: ${formatDate(contestData.endDate)}`
            : 'No end date'}
        </p>
      </div>

      <RegisterButton
        isRegistered={isRegistered}
        contestData={contestData}
        setContestData={setContestData}
      />
    </div>
  );
};

export default Header;
