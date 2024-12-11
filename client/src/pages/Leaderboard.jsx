import React from "react";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const leaderboardData = [
    {
      rank: 1,
      username: "Coder123",
      points: 1500,
      avatar: "https://placekitten.com/100/100",
    },
    {
      rank: 2,
      username: "DevMaster",
      points: 1450,
      avatar: "https://placekitten.com/101/101",
    },
    {
      rank: 3,
      username: "AlgoKing",
      points: 1400,
      avatar: "https://placekitten.com/102/102",
    },
    {
      rank: 4,
      username: "CodeWizard",
      points: 1350,
      avatar: "https://placekitten.com/103/103",
    },
    {
      rank: 5,
      username: "PixelGenius",
      points: 1300,
      avatar: "https://placekitten.com/104/104",
    },
    {
      rank: 6,
      username: "JSGuru",
      points: 1200,
      avatar: "https://placekitten.com/105/105",
    },
    {
      rank: 7,
      username: "PythonMaster",
      points: 1150,
      avatar: "https://placekitten.com/106/106",
    },
    {
      rank: 8,
      username: "RubyKing",
      points: 1100,
      avatar: "https://placekitten.com/107/107",
    },
  ];

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>
          Celebrate the top coding talent on Contester. Are you ready to claim
          the top spot?
        </p>
      </div>
      <div className="leaderboard-content">
        {leaderboardData.map((entry) => (
          <div key={entry.rank} className="leaderboard-card">
            <div className="rank-badge">#{entry.rank}</div>
            <div className="user-info">
              <img src={entry.avatar} alt="Avatar" className="avatar" />
              <div>
                <h3>{entry.username}</h3>
                <p>{entry.points} points</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
