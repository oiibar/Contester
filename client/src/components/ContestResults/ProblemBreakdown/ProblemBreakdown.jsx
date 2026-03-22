import React from 'react';
import './ProblemBreakdown.scss';

const ProblemBreakdown = () => {
  return (
    <div className="section">
      <h3>Problem Breakdown</h3>
      <div>
        <div>
          <p>Two Sum</p>
          <div>
            <div>Progress Bar</div>
            <p>95%</p>
          </div>
        </div>
        <div>
          <p>Binary Search</p>
          <div>
            <div>Progress Bar</div>
            <p>87%</p>
          </div>
        </div>
        <div>
          <p>Graph Traversal</p>
          <div>
            <div>Progress Bar</div>
            <p>62%</p>
          </div>
        </div>
        <div>
          <p>Dynamic Programming</p>
          <div>
            <div>Progress Bar</div>
            <p>34%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemBreakdown;
