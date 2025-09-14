import React from 'react';
import { useParams } from 'react-router';
import './Problems.scss';
import Header from 'components/Problems/Header/Header';
import ProblemsList from 'components/Problems/ProblemsList/ProblemsList';
import Details from 'components/Problems/Details/Details';
import { updateContest } from 'api/api';
import { useAuth } from 'auth/AuthContext';
import { useProblems } from 'hooks/problems/useProblems';

const Problems = () => {
  const { contestId } = useParams();
  const { user, token } = useAuth();

  const { contestData, setContestData, isRegistered, isLoading, error } =
    useProblems(contestId, token, user);

  if (isLoading) return <p>Loading contest...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!contestData) return <p>No contest found.</p>;

  return (
    <>
      <div className="contest-container">
        <Header
          isRegistered={isRegistered}
          contestData={contestData}
          setContestData={setContestData}
          updateContest={updateContest}
        />
      </div>
      <div className="contest-container">
        <ProblemsList
          isRegistered={isRegistered}
          contestData={contestData}
          updateContest={updateContest}
        />
      </div>
      <div className="contest-container">
        <Details contestData={contestData} updateContest={updateContest} />
      </div>
    </>
  );
};

export default Problems;
