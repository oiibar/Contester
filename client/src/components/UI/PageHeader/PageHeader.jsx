import React from 'react';
import './PageHeader.scss';

const PageHeader = ({ children }) => {
  return (
    <div className="header">
      <h2>{children}</h2>
    </div>
  );
};

export default PageHeader;
