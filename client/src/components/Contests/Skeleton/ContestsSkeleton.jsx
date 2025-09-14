import React from 'react';
import './ContestsSkeleton.scss';

const ContestsSkeleton = () => {
  return (
    <div className="contests-container">
      <div className="section">
        <h2 className="section-title">Ongoing Contests</h2>
        <div className="contest-row">
          <div className="contest-col">
            <h3
              className="contest-name skeleton"
              style={{ width: '180px', height: '20px' }}
            />
            <p
              className="contest-dates skeleton"
              style={{ width: '140px', height: '16px' }}
            />
            <p
              className="contest-dates skeleton"
              style={{ width: '200px', height: '16px' }}
            />
          </div>
          <div
            className="skeleton"
            style={{ width: '90px', height: '36px', borderRadius: '8px' }}
          />
        </div>
      </div>
      <div className="section">
        <h2 className="section-title">Upcoming Contests</h2>
        <div className="contest-row">
          <div className="contest-col">
            <h3
              className="contest-name skeleton"
              style={{ width: '180px', height: '20px' }}
            />
            <p
              className="contest-dates skeleton"
              style={{ width: '140px', height: '16px' }}
            />
            <p
              className="contest-dates skeleton"
              style={{ width: '200px', height: '16px' }}
            />
          </div>
          <div
            className="skeleton"
            style={{ width: '90px', height: '36px', borderRadius: '8px' }}
          />
        </div>
      </div>
      <div className="section">
        <h2 className="section-title">Past Contests</h2>
        <div className="contest-row">
          <div className="contest-col">
            <h3
              className="contest-name skeleton"
              style={{ width: '180px', height: '20px' }}
            />
            <p
              className="contest-dates skeleton"
              style={{ width: '140px', height: '16px' }}
            />
            <p
              className="contest-dates skeleton"
              style={{ width: '200px', height: '16px' }}
            />
          </div>
          <div
            className="skeleton"
            style={{ width: '90px', height: '36px', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContestsSkeleton);
