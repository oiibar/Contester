import React from "react";
import "./NotFound.scss";
import {NavLink, useNavigate} from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
  <div className="not-found-page">
    <h1>404</h1>
    <h2>Page not found</h2>
    <p>
      Sorry, we couldn't find the page you're looking for. The page might have
      been removed or the link might be broken.
    </p>
    <div className="buttons">
      <button onClick={() => navigate(-1)} className="go-back">
        <span>←</span> Go back
      </button>
      <NavLink to="/">
        <button className="homepage">
          Homepage
        </button>
      </NavLink>
    </div>
  </div>
)
  ;
};

export default NotFound;
