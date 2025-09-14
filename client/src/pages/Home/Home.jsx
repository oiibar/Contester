import React from 'react';
import './Home.scss';
import { NavLink } from 'react-router';
import MyButton from 'components/UI/MyButton/MyButton';

const Home = () => {
  return (
    <div className="home-container">
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
    </div>
  );
};

export default Home;
