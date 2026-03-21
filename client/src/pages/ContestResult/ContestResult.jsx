import React from 'react';
import './ContestResult.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from 'shared/ui/PageHeader/PageHeader';

const ContestResult = () => {
  const { user, token } = useAuth();

  return (
    <>
      <PageHeader>Contest Result</PageHeader>
      <div className="contests-container">Contest Result</div>
    </>
  );
};

export default ContestResult;
