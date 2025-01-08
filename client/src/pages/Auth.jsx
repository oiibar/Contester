import React, { useState } from "react";
import google from "../assets/auth/google.svg";
import github from "../assets/auth/github.svg";
import emailIcon from "../assets/auth/email.svg";
import closed from "../assets/auth/closed.svg";
import open from "../assets/auth/open.svg";
import passwordIcon from "../assets/auth/password.svg";
import unlocked from "../assets/auth/unlocked.svg";
import "../styles/Auth.scss";

const Auth = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-heading">Welcome back</h2>
        <p className="auth-subheading">
          Access your speedcubing app and start practicing today
        </p>
        <form className="auth-form">
          <div className="input-container">
            <input
              placeholder="Email"
              type="email"
              className="auth-input"
              value={formFields.email}
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
            />
            <div className="input-icon">
              <img src={emailIcon} alt="email" className="icon" />
            </div>
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="auth-input"
              value={formFields.password}
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
            />
            <div className="input-icon">
              <img
                src={showPassword ? unlocked : passwordIcon}
                alt="password"
                className="icon"
              />
            </div>
            <div className="toggle-password" onClick={togglePasswordVisibility}>
              <img
                src={showPassword ? open : closed}
                alt="toggle"
                className="icon"
              />
            </div>
          </div>

          <button className="auth-button">Start Your Learning</button>
        </form>

        <p className="social-login-text">
          or continue with these social profiles
        </p>
        <div className="social-icons">
          <a href="">
            <img src={google} alt="google" className="social-icon" />
          </a>
          <a href="">
            <img src={github} alt="github" className="social-icon" />
          </a>
        </div>

        <p className="signup-text">
          Don't have an account?
          <span className="signup-link">Create one</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
