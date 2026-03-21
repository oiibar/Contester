import React from 'react';
import './Contest.scss';
import { IoPeopleSharp } from 'react-icons/io5';
import MyButton from 'shared/ui/MyButton/MyButton';

const Contest = () => {
  return (
    <div className="section">
      <div className="subsection-1">
        <p className="completed-icon">Completed</p>
        <p>Ended March 21, 2026</p>
      </div>

      <div className="info">
        <h3>ICPC Final Round</h3>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>

      <div className="participants">
        <IoPeopleSharp />
        <p>105 Participants</p>
      </div>

      <div className="details">
        <div className="winner">
          <div className="user-profile"></div>
          <div>
            <p>Winner</p>
            <p className="winner-name">John Doe</p>
          </div>
        </div>
        <MyButton>View Details</MyButton>
      </div>
    </div>
  );
};

export default Contest;
