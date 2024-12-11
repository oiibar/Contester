import React from "react";
import "../styles/About.css";
import MyButton from "../components/UI/MyButton/MyButton";

const About = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <h1>Welcome to Contester</h1>
        <p>
          Join a community of coders ready to take on challenges, improve their
          skills, and climb the leaderboard. Start your coding journey today!
        </p>
      </section>
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Coding Contests</h3>
            <p>
              Participate in timed coding challenges and showcase your skills.
            </p>
          </div>
          <div className="feature-card">
            <h3>Leaderboard</h3>
            <p>Track your progress and see where you rank among top coders.</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>
              Analyze your performance and growth over time with detailed stats.
            </p>
          </div>
          <div className="feature-card">
            <h3>Global Competitions</h3>
            <p>
              Compete with coders worldwide and earn recognition for your
              skills.
            </p>
          </div>
        </div>
      </section>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Contester, we aim to make coding accessible, engaging, and
          rewarding. We foster a community where developers of all levels can
          learn, grow, and tackle real-world challenges through programming.
        </p>
      </section>
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Sign up today, participate in your first contest, and begin your
          journey toward coding excellence!
        </p>
        <MyButton>Join Now</MyButton>
      </section>
    </div>
  );
};

export default About;
