import React from 'react';
import './ContestResult.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from 'shared/ui/PageHeader/PageHeader';
import DetailsHeader from 'components/ContestResults/DetailsHeader/DetailsHeader';
import Rankings from 'components/ContestResults/Rankings/Rankings';
import Stats from 'components/ContestResults/Stats/Stats';
import ProblemBreakdown from 'components/ContestResults/ProblemBreakdown/ProblemBreakdown';
import QuickActions from '../../components/ContestResults/QuickActions/QuickActions';
import { useLocation } from 'react-router';

const ContestResult = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const contest = location.state.contest;

  return (
    <>
      <PageHeader>Contest Result</PageHeader>
      <div className="contests-container">
        <div className="header-section">
          <DetailsHeader contest={contest} />
        </div>
        <div className="wrapper">
          <div className="content">
            <Rankings contest={contest} />
          </div>
          <div className="sidebar">
            <Stats contest={contest} />
            <ProblemBreakdown contest={contest} />
            <QuickActions contest={contest} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestResult;
