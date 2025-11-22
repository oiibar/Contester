import React from 'react';
import MyButton from 'shared/ui/MyButton/MyButton';
import './RetryFallback.scss';

const RetryFallback = ({ onRetry }) => {
  return (
    <div className="retry-fallback">
      <h2>⚠️ Failed to load contests</h2>
      <p>Something went wrong while loading contests. Please try again.</p>
      <MyButton onClick={onRetry}>Retry</MyButton>
    </div>
  );
};

export default RetryFallback;
