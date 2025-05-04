import React from "react";
import "./Leaderboard.scss";
import { useAuth } from "../../hooks/auth/AuthProvider";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import Table from "../../components/Leaderboard/Table/Table";
import {useLeaderboard} from "../../hooks/leaderboard/useLeaderboard";

const Leaderboard = () => {
  const { token } = useAuth();
  const { users, isLoading, error } = useLeaderboard(token);

  return (
      <>
        <PageHeader>Global Leaderboard</PageHeader>
        <div className="leaderboard">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading users.</p>}
          {!isLoading && !error && <Table users={users} />}
        </div>
      </>
  );
};

export default Leaderboard;
