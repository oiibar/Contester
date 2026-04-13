import React from 'react';
import './QuickActions.scss';
import { FaDownload } from 'react-icons/fa6';
import { FaShare } from 'react-icons/fa6';
import { MdOutlineAnalytics } from 'react-icons/md';

const QuickActions = () => {
  return (
    <div className="actions-section">
      <h3>Quick Actions</h3>
      <div className="buttons">
        <div className="action-button">
          <FaDownload />
          Download Results
        </div>
        <div className="action-button">
          <FaShare />
          Share Contest
        </div>
        <div className="action-button">
          <MdOutlineAnalytics />
          View Analytics
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
