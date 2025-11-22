import React, { Suspense } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from 'shared/ui/PageHeader/PageHeader';
import Upcoming from 'components/Contests/Upcoming/Upcoming';
import Past from 'components/Contests/Past/Past';
import Ongoing from 'components/Contests/Ongoing/Ongoing';
import { preloadContests, resetContests } from 'resources/contestsResource';
import './Contests.scss';
import { useAuth } from 'auth/AuthContext';
import ContestsSkeleton from 'components/Contests/Skeleton/ContestsSkeleton';
import ErrorBoundary from 'shared/ui/ErrorBoundary/ErrorBoundary';
import RetryFallback from 'shared/ui/Retry/RetryFallback';
import { resetLeaderboard } from '../../resources/leaderboardResource';
import LeaderboardSkeleton from '../../components/Leaderboard/Skeleton/LeaderboardSkeleton';

function ContestsContent({ token }) {
  const contests = preloadContests(token).read();
  const navigate = useNavigate();
  const now = Date.now();
  const upcoming = [];
  const ongoing = [];
  const past = [];

  for (const c of contests) {
    const start = new Date(c.startDate).getTime();
    const end = new Date(c.endDate).getTime();
    if (start > now) {
      upcoming.push(c);
    } else if (start <= now && end >= now) {
      ongoing.push(c);
    } else {
      past.push(c);
    }
  }

  const navigateToProblems = (contest) => {
    navigate(`/problems/${contest.id}`, { state: { contest } });
  };

  return (
    <div className="contests-container">
      <Ongoing contests={ongoing} navigateToProblems={navigateToProblems} />
      <Upcoming contests={upcoming} navigateToProblems={navigateToProblems} />
      <Past contests={past} />
    </div>
  );
}

export default function Contests() {
  const { token } = useAuth();
  return (
    <>
      <PageHeader>Coding Contests</PageHeader>
      <ErrorBoundary
        fallback={({ onRetry }) => <RetryFallback onRetry={onRetry} />}
        onReset={resetContests}
      >
        <Suspense fallback={<ContestsSkeleton />}>
          <ContestsContent token={token} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
