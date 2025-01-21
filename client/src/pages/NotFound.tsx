import React from "react";
import { NavLink } from "react-router";
import "../styles/NotFound.scss";

const NotFound: React.FC = () => {
  return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404 - Page Not Found</h1>
          <p className="not-found-description">
            Sorry, the page you're looking for doesn't exist. Please go back to
            the homepage.
          </p>
          <NavLink to="/" className="back-home-button">
            Go to Home
          </NavLink>
        </div>
      </div>
  );
};

export default NotFound;