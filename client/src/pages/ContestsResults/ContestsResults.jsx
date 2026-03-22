import React from 'react';
import './ContestsResults.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from 'shared/ui/PageHeader/PageHeader';
import Navigation from 'components/ContestsResults/Navigation/Navigation';
import Filters from 'components/ContestsResults/Filters/Filters';
import Contests from 'components/ContestsResults/Contests/Contests';

const ContestResult = () => {
  const { user, token } = useAuth();

  return (
    <>
      <PageHeader>Contests Results</PageHeader>
      <div className="contests-container">
        <Filters />
        <Contests />
        <Navigation />
      </div>
    </>
  );
};

export default ContestResult;
