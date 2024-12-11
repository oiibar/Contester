import React from "react";
import "../styles/Home.css";
import { NavLink } from "react-router";
import MyButton from "./../components/UI/MyButton/MyButton";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Contester</h1>
        <p>
          Join the ultimate coding contest platform where coders compete, learn,
          and rise to the top!
        </p>
        <NavLink to="/contests">
          <MyButton>View Contest</MyButton>
        </NavLink>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Contester?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Compete in Contests</h3>
            <p>
              Participate in exciting challenges designed for all skill levels.
            </p>
          </div>
          <div className="feature-card">
            <h3>Track Your Progress</h3>
            <p>View detailed stats and climb the leaderboard as you improve.</p>
          </div>
          <div className="feature-card">
            <h3>Learn and Improve</h3>
            <p>
              Solve problems, discuss solutions, and sharpen your coding skills.
            </p>
          </div>
        </div>
      </section>

      {/* Current Contests Section */}
      <section className="current-contests">
        <h2>Current Contests</h2>
        <div className="contest-card">
          <h3>Beginner Challenge</h3>
          <p>Start Date: Nov 30, 2024</p>
          <p>Difficulty: Easy</p>
          <NavLink to="/contest/1">
            <MyButton>View Contest</MyButton>
          </NavLink>
        </div>
        <div className="contest-card">
          <h3>Advanced Algorithms</h3>
          <p>Start Date: Dec 5, 2024</p>
          <p>Difficulty: Hard</p>
          <NavLink to="/contest/2">
            <MyButton>View Contest</MyButton>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
