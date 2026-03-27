import React, { Suspense } from 'react';
import './ContestsResults.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from 'shared/ui/PageHeader/PageHeader';
import Navigation from 'components/ContestsResults/Navigation/Navigation';
import Filters from 'components/ContestsResults/Filters/Filters';
import Contests from 'components/ContestsResults/Contests/Contests';
import { preloadContests, resetContests } from 'resources/contestsResource';
import { useNavigate } from 'react-router';
import RetryFallback from 'shared/ui/Retry/RetryFallback';
import ContestsSkeleton from 'components/Contests/Skeleton/ContestsSkeleton';
import ErrorBoundary from 'shared/ui/ErrorBoundary/ErrorBoundary';

const ContestResult = () => {
  const { user, token } = useAuth();
  const contests = preloadContests(token).read();
  const navigate = useNavigate();
  const now = Date.now();
  const past = [];

  if (!contests || contests.length === 0) {
    return <p>No past contests</p>;
  }

  for (const c of contests) {
    // const start = new Date(c.startDate).getTime();
    const end = new Date(c.endDate).getTime();
    if (end <= now) {
      past.push(c);
    }
  }

  const navigateToContestResults = (contest) => {
    navigate(`/results/${contest.id}`, { state: { contest } });
  };

  return (
    <>
      <PageHeader>Contests Results</PageHeader>
      <div className="contests-container">
        <Filters />
        <ErrorBoundary
          fallback={({ onRetry }) => <RetryFallback onRetry={onRetry} />}
          onReset={resetContests}
        >
          <Suspense fallback={<ContestsSkeleton />}>
            <Contests
              contests={past}
              navigateToContestResults={navigateToContestResults}
              token={token}
            />
          </Suspense>
        </ErrorBoundary>
        <Navigation />
      </div>
    </>
  );
};

export default ContestResult;
