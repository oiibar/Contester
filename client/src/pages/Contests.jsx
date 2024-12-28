import React, { useEffect, useState } from "react";
import "../styles/Contests.css";
import MyButton from "../components/UI/MyButton/MyButton";
import { useNavigate } from "react-router";
import { useFetching } from "../hooks/useFetching";
import { fetchContests } from "../api/api";
import { useAuth } from "../hooks/AuthProvider";
import { formatDate } from "../utils/dateUtils"; // Importing the utility function

const Contests = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [contests, setContests] = useState([]);

  const { fetching, isLoading, error } = useFetching(async () => {
    if (token) {
      const data = await fetchContests(token);
      setContests(data);
    } else {
      setContests([]);
    }
  });

  useEffect(() => {
    fetching();
  }, [token]);

  const navigateToProblems = (tasks) => {
    navigate("/problems", { state: { tasks } });
  };

  return (
      <div className="contests-container">
        <h1 className="contests-title">Contests</h1>
        {isLoading ? (
            <p>Loading contests...</p>
        ) : error ? (
            <div className="error-message">
              <h2>Failed to load contests</h2>
              <p>{error}</p>
              <MyButton onClick={() => fetching()}>Retry</MyButton>
            </div>
        ) : contests.length > 0 ? (
            <div className="contests-grid">
              {contests.map((contest) => (
                  <div key={contest.id} className="contest-card">
                    <div className="contest-header">
                      <h2>{contest.title}</h2>
                      <span className={`contest-status ${contest.status?.toLowerCase()}`}>
                  {contest.status || "Unknown"}
                </span>
                    </div>
                    <p className="contest-description">{contest.description}</p>
                    <div className="contest-dates">
                      <span>Start: {contest.startDate ? formatDate(contest.startDate) : "N/A"}</span>
                      <span>End: {contest.endDate ? formatDate(contest.endDate) : "N/A"}</span>
                    </div>
                    <MyButton onClick={() => navigateToProblems(contest.problems)}>
                      View Problems
                    </MyButton>
                  </div>
              ))}
            </div>
        ) : (
            <div className="no-contests">
              <img
                  src="https://placehold.co/300x200"
                  alt="No contests"
                  className="no-contests-image"
              />
              <h2 className="no-contests-message">No contests are currently available.</h2>
              <p className="no-contests-description">
                Check back later or explore other sections of the platform!
              </p>
              <MyButton onClick={() => navigate("/")}>Go Back to Home</MyButton>
            </div>
        )}
      </div>
  );
};

export default Contests;
