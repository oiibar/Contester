import React from 'react';
import './Contest.scss';
import { IoPeopleSharp } from 'react-icons/io5';
import MyButton from 'shared/ui/MyButton/MyButton';
import { formatDate } from 'shared/lib/dateUtils';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/AuthContext';

const Contest = ({ contest, navigateToContestResults, token }) => {
  return (
    <div className="contest-result-section">
      <div className="subsection-1">
        <p className="completed-icon">Completed</p>
        <p>Ended {formatDate(contest.endDate)}</p>
      </div>

      <div className="info">
        <h3>{contest.title}</h3>
        <p className="description">{contest.description}</p>
      </div>

      <div className="participants">
        <IoPeopleSharp />
        <p>{contest.participants.length} Participants</p>
      </div>

      <div className="details">
        <div className="winner">
          <div className="user-profile"></div>
          <div>
            <p>Winner</p>
            <p className="winner-name">John Doe</p>
          </div>
        </div>
        <MyButton onClick={() => navigateToContestResults(contest)}>
          View Details
        </MyButton>
      </div>
    </div>
  );
};

export default Contest;
