import React, { useEffect, useState } from "react";
import google from "../../assets/auth/google.svg";
import github from "../../assets/auth/github.svg";
import emailIcon from "../../assets/auth/email.svg";
import closed from "../../assets/auth/closed.svg";
import open from "../../assets/auth/open.svg";
import passwordIcon from "../../assets/auth/password.svg";
import unlocked from "../../assets/auth/unlocked.svg";
import user from "../../assets/auth/user.svg";
import "../../styles/Auth.css";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordCheck, setPasswordCheck] = useState({
    showPassword: false,
    showConfirmPassword: false,
    passwordMismatch: false,
  });
  const togglePasswordVisibility = () => {
    setPasswordCheck({
      ...passwordCheck,
      showPassword: !passwordCheck.showPassword,
    });
  };
  const toggleConfirmPasswordVisibility = () => {
    setPasswordCheck({
      ...passwordCheck,
      showConfirmPassword: !passwordCheck.showConfirmPassword,
    });
  };
  useEffect(() => {
    setPasswordCheck({
      ...passwordCheck,
      passwordMismatch: formFields.password !== formFields.confirmPassword,
    });
  }, [formFields.password, formFields.confirmPassword]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-heading">Join Contester</h2>
        <p className="auth-subheading">
          Create an account and start learning today
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
              placeholder="Username"
              type="text"
              className="auth-input"
              value={formFields.username}
              onChange={(e) =>
                setFormFields({ ...formFields, username: e.target.value })
              }
            />
            <div className="input-icon">
              <img src={user} alt="username" className="icon" />
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
            <div
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? open : closed}
                alt="toggle password"
                className="icon"
              />
            </div>
          </div>

          <div className="input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="auth-input"
              value={formFields.confirmPassword}
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  confirmPassword: e.target.value,
                })
              }
            />
            <div className="input-icon">
              <img
                src={showConfirmPassword ? unlocked : passwordIcon}
                alt="confirm password"
                className="icon"
              />
            </div>
            <div
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img
                src={showConfirmPassword ? open : closed}
                alt="toggle confirm password"
                className="icon"
              />
            </div>
          </div>
          {passwordCheck.passwordMismatch && (
            <p className="mismatch">Passwords do not match</p>
          )}
          <button className="auth-button">Create Account</button>
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
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="signup-link">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
