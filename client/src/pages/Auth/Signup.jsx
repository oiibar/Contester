import React, { useEffect, useState } from "react";
import emailIcon from "../../assets/auth/email.svg";
import closed from "../../assets/auth/closed.svg";
import open from "../../assets/auth/open.svg";
import passwordIcon from "../../assets/auth/password.svg";
import unlocked from "../../assets/auth/unlocked.svg";
import user from "../../assets/auth/user.svg";
import "../../styles/Auth.css";
import { useNavigate } from "react-router";
import { registerUser } from "../../api/api";
import { useFetching } from "../../hooks/useFetching";

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

  const { fetching: handleRegister, isLoading, error } = useFetching(
      async () => {
        const { email, username, password } = formFields;
        await registerUser({ email, username, password });
        navigate("/login"); // Redirect to login page on successful registration
      }
  );

  useEffect(() => {
    setPasswordCheck({
      ...passwordCheck,
      passwordMismatch: formFields.password !== formFields.confirmPassword,
    });
  }, [formFields.password, formFields.confirmPassword, passwordCheck]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordCheck.passwordMismatch) {
      return;
    }
    await handleRegister();
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-heading">Join Contester</h2>
          <p className="auth-subheading">
            Create an account and start learning today
          </p>
          <form className="auth-form" onSubmit={handleSubmit}>
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
                  type={passwordCheck.showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="auth-input"
                  value={formFields.password}
                  onChange={(e) =>
                      setFormFields({ ...formFields, password: e.target.value })
                  }
              />
              <div className="input-icon">
                <img
                    src={passwordCheck.showPassword ? unlocked : passwordIcon}
                    alt="password"
                    className="icon"
                />
              </div>
              <div
                  className="toggle-password"
                  onClick={() =>
                      setPasswordCheck({
                        ...passwordCheck,
                        showPassword: !passwordCheck.showPassword,
                      })
                  }
              >
                <img
                    src={passwordCheck.showPassword ? open : closed}
                    alt="toggle password"
                    className="icon"
                />
              </div>
            </div>

            <div className="input-container">
              <input
                  type={passwordCheck.showConfirmPassword ? "text" : "password"}
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
                    src={passwordCheck.showConfirmPassword ? unlocked : passwordIcon}
                    alt="confirm password"
                    className="icon"
                />
              </div>
              <div
                  className="toggle-password"
                  onClick={() =>
                      setPasswordCheck({
                        ...passwordCheck,
                        showConfirmPassword: !passwordCheck.showConfirmPassword,
                      })
                  }
              >
                <img
                    src={passwordCheck.showConfirmPassword ? open : closed}
                    alt="toggle confirm password"
                    className="icon"
                />
              </div>
            </div>

            {passwordCheck.passwordMismatch && (
                <p className="mismatch">Passwords do not match</p>
            )}
            {error && <p className="error">{error}</p>}

            <button className="auth-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
            {error && <p style={{color: "red"}}>{error}</p>}
          </form>

          <p className="social-login-text">
            or continue with these social profiles
          </p>
          {/*<div className="social-icons">*/}
          {/*  <a href="#">*/}
          {/*    <img src={google} alt="google" className="social-icon" />*/}
          {/*  </a>*/}
          {/*  <a href="#">*/}
          {/*    <img src={github} alt="github" className="social-icon" />*/}
          {/*  </a>*/}
          {/*</div>*/}

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
