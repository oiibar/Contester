import React from 'react';
import './Activities.scss';

const Activities = ({ user }) => {
  console.log(user);
  return (
    <div className="profile-activity">
      <h2>Recent Activity</h2>
      <ul>
        {user.problems.slice(0, 3).map((problem, index) => (
          <li key={index}>
            <span className="activity-line green"></span>
            <div className="activity-content">
              <p className="activity-title">Solved "{problem.title}"</p>
              <p className="activity-time">{`${index + 2} days ago`}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
