import React from 'react';
import './Results.scss';
import { useAuth } from 'auth/AuthContext';
import PageHeader from '../../shared/ui/PageHeader/PageHeader';

const Results = () => {
  const { user, token } = useAuth();

  return (
    <>
      <PageHeader>Results</PageHeader>
    </>
  );
};

export default Results;
