import React from 'react';
import './ContestResult.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from 'shared/ui/PageHeader/PageHeader';
import DetailsHeader from 'components/ContestResults/DetailsHeader/DetailsHeader';
import Rankings from 'components/ContestResults/Rankings/Rankings';
import Stats from 'components/ContestResults/Stats/Stats';
import ProblemBreakdown from 'components/ContestResults/ProblemBreakdown/ProblemBreakdown';
import QuickActions from '../../components/ContestResults/QuickActions/QuickActions';

const ContestResult = () => {
  const { user, token } = useAuth();

  return (
    <>
      <PageHeader>Contest Result</PageHeader>
      <div className="contests-container">
        <DetailsHeader />
        <Rankings />
        <Stats />
        <ProblemBreakdown />
        <QuickActions />
      </div>
    </>
  );
};

export default ContestResult;
