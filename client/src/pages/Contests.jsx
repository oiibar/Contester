import React from "react";
import "../styles/Contests.css";
import MyButton from "../components/UI/MyButton/MyButton";
import { useNavigate } from "react-router";

const contestsData = [
  {
    id: 1,
    name: "Week 4",
    description: "Solve the classic Two Sum problem. Great for beginners!",
    startDate: "2024-12-01",
    endDate: "2024-12-07",
    status: "Ongoing",
    tasks: [
      {
        id: 1,
        name: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
        status: "Upcoming",
      },
      {
        id: 2,
        name: "Climbing Stairs",
        description:
          "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "Medium",
        status: "Ongoing",
      },
    ],
  },
  {
    id: 2,
    name: "Week 5",
    description:
      "Test your dynamic programming skills with some tricky problems.",
    startDate: "2024-12-08",
    endDate: "2024-12-14",
    status: "Upcoming",
    tasks: [
      {
        id: 1,
        name: "Longest Substring Without Repeating Characters",
        description:
          "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Hard",
        status: "Completed",
      },
    ],
  },
  {
    id: 2,
    name: "Week 6",
    description:
      "Test your dynamic programming skills with some tricky problems.",
    startDate: "2024-12-08",
    endDate: "2024-12-14",
    status: "Upcoming",
    tasks: [
      {
        id: 1,
        name: "Longest Substring Without Repeating Characters",
        description:
          "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "Hard",
        status: "Completed",
      },
    ],
  },
];

const Contests = () => {
  const navigate = useNavigate();

  const navigateToProblems = (tasks) => {
    navigate("/problems", { state: { tasks } });
  };

  return (
    <div className="contests-container">
      <h1 className="contests-title">Upcoming Contests</h1>
      {contestsData.length > 0 ? (
        <div className="contests-grid">
          {contestsData.map((contest) => (
            <div key={contest.id} className="contest-card">
              <div className="contest-header">
                <h2>{contest.name}</h2>
                <span
                  className={`contest-status ${contest.status.toLowerCase()}`}
                >
                  {contest.status}
                </span>
              </div>
              <p className="contest-description">{contest.description}</p>
              <div className="contest-dates">
                <span>Start: {contest.startDate}</span>
                <span>End: {contest.endDate}</span>
              </div>
              <MyButton onClick={() => navigateToProblems(contest.tasks)}>
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
          <h2 className="no-contests-message">
            No contests are currently available.
          </h2>
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
