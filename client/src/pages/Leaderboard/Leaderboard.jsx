import React from "react";
import "./Leaderboard.scss";
import { useAuth } from "../../hooks/auth/AuthProvider";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import Table from "../../components/Leaderboard/Table/Table";
import {useLeaderboard} from "../../hooks/leaderboard/useLeaderboard";

const Leaderboard = () => {
  const { token } = useAuth();
  const { users, isLoading, error } = useLeaderboard(token);

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Error loading users.</p>

  return (
      <>
        <PageHeader>Global Leaderboard</PageHeader>
        <div className="leaderboard">
            <Table users={users} />
        </div>
      </>
  );
};

export default Leaderboard;
