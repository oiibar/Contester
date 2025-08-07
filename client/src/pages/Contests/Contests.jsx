import React from "react";
import "./Contests.scss";
import { useNavigate } from "react-router";
import { useAuth } from "hooks/auth/AuthProvider";
import PageHeader from "components/UI/PageHeader/PageHeader";
import Upcoming from "components/Contests/Upcoming/Upcoming";
import Past from "components/Contests/Past/Past";
import { useContests } from "hooks/contests/useContests";
import Ongoing from "components/Contests/Ongoing/Ongoing";

const Contests = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { upcoming, ongoing, past, isLoading, error } = useContests(token);
  const navigateToProblems = (contest) => {
      navigate(`/problems/${contest.id}`, { state: { contest } });
  };

  return (
      <>
        <PageHeader>Coding Contests</PageHeader>
        <div className="contests-container">
          <Ongoing
              contests={ongoing}
              navigateToProblems={navigateToProblems}
              isLoading={isLoading}
              error={error}
          />
          <Upcoming
              contests={upcoming}
              navigateToProblems={navigateToProblems}
              isLoading={isLoading}
              error={error}
          />
          <Past
              contests={past}
              isLoading={isLoading}
              error={error}
          />
        </div>
      </>
  );
};

export default Contests;
