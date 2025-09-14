import React, { Suspense } from 'react';
import './Leaderboard.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from 'components/UI/PageHeader/PageHeader';
import Table from 'components/Leaderboard/Table/Table';
import {
  preloadLeaderboard,
  resetLeaderboard,
} from 'resources/leaderboardResource';
import LeaderboardSkeleton from 'components/Leaderboard/Skeleton/LeaderboardSkeleton';
import ErrorBoundary from 'components/UI/ErrorBoundary/ErrorBoundary';
import RetryFallback from 'components/UI/Retry/RetryFallback';

function LeaderboardContent({ token }) {
  const users = preloadLeaderboard(token).read();
  return (
    <div className="leaderboard">
      <Table users={users} />
    </div>
  );
}

export default function Leaderboard() {
  const { token } = useAuth();

  return (
    <>
      <PageHeader>Global Leaderboard</PageHeader>
      <ErrorBoundary
        fallback={({ onRetry }) => <RetryFallback onRetry={onRetry} />}
        onReset={resetLeaderboard}
      >
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent token={token} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
