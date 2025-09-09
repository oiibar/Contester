import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import './Problems.scss';
import Header from 'components/Problems/Header/Header';
import ProblemsList from 'components/Problems/ProblemsList/ProblemsList';
import Details from 'components/Problems/Details/Details';
import { fetchContest, updateContest } from 'api/api';
import { useAuth } from 'hooks/auth/AuthProvider';

const Problems = () => {
  const { contestId } = useParams();
  const { user, token } = useAuth();

  const [contestData, setContestData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isRegistered = useMemo(() => {
    if (!user || !Array.isArray(contestData?.participants)) return false;
    return contestData.participants.some((p) => p.id === user.id);
  }, [user, contestData]);

  useEffect(() => {
    const loadContest = async () => {
      if (!contestData && contestId && token) {
        try {
          setIsLoading(true);
          const data = await fetchContest(contestId, token);
          setContestData(data);
        } catch (err) {
          setError('Failed to fetch contest.');
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadContest();
  }, [contestData, contestId, token]);

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
