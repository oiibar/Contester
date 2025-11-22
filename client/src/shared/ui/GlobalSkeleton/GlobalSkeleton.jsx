import React from 'react';
import './GlobalSkeleton.scss';

const GlobalSkeleton = () => {
  return (
    <div className="layout">
      <main className="main-content">
        <div
          className="skeleton"
          style={{ width: '200px', height: '32px', marginBottom: '16px' }}
        />
        <div
          className="skeleton"
          style={{ width: '100%', height: '200px', borderRadius: '8px' }}
        />
        <div
          className="skeleton"
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '8px',
            marginTop: '16px',
          }}
        />
      </main>
    </div>
  );
};

export default GlobalSkeleton;
