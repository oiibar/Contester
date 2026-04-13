import React from 'react';
import './ProblemBreakdown.scss';

const ProblemBreakdown = () => {
  return (
    <div className="problems-section">
      <h3>Problem Breakdown</h3>
      <div className="problems-items">
        <div className="problems-item">
          <p className="problems-item-title">Two Sum</p>
          <div className="progress-section">
            <div className="progress-bar">
              <div></div>
            </div>
            <p>--95%--</p>
          </div>
        </div>
        <div className="problems-item">
          <p className="problems-item-title">Binary Search</p>
          <div className="progress-section">
            <div className="progress-bar">
              <div></div>
            </div>
            <p>--87%--</p>
          </div>
        </div>
        <div className="problems-item">
          <p className="problems-item-title">Graph Traversal</p>
          <div className="progress-section">
            <div className="progress-bar">
              <div></div>
            </div>
            <p>--62%--</p>
          </div>
        </div>
        <div className="problems-item">
          <p className="problems-item-title">Dynamic Programming</p>
          <div className="progress-section">
            <div className="progress-bar">
              <div></div>
            </div>
            <p>--34%--</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemBreakdown;
