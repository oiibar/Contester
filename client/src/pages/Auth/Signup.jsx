import React, { useState } from "react";
import emailIcon from "../../assets/auth/email.svg";
import closed from "../../assets/auth/closed.svg";
import open from "../../assets/auth/open.svg";
import passwordIcon from "../../assets/auth/password.svg";
import unlocked from "../../assets/auth/unlocked.svg";
import user from "../../assets/auth/user.svg";
import "../../styles/Auth.scss";
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
        points: 0,
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        showPassword: false,
        showConfirmPassword: false,
    });

    const passwordMismatch = formFields.password !== formFields.confirmPassword;

    const { fetching: handleRegister, isLoading, error } = useFetching(
        async () => {
            const { email, username, password } = formFields;
            await registerUser({ email, username, password });
            navigate("/login"); // Redirect to login page on successful registration
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMismatch) {
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
                            type={passwordVisibility.showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="auth-input"
                            value={formFields.password}
                            onChange={(e) =>
                                setFormFields({ ...formFields, password: e.target.value })
                            }
                        />
                        <div className="input-icon">
                            <img
                                src={passwordVisibility.showPassword ? unlocked : passwordIcon}
                                alt="password"
                                className="icon"
                            />
                        </div>
                        <div
                            className="toggle-password"
                            onClick={() =>
                                setPasswordVisibility((prev) => ({
                                    ...prev,
                                    showPassword: !prev.showPassword,
                                }))
                            }
                        >
                            <img
                                src={passwordVisibility.showPassword ? open : closed}
                                alt="toggle password"
                                className="icon"
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <input
                            type={passwordVisibility.showConfirmPassword ? "text" : "password"}
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
                                src={
                                    passwordVisibility.showConfirmPassword
                                        ? unlocked
                                        : passwordIcon
                                }
                                alt="confirm password"
                                className="icon"
                            />
                        </div>
                        <div
                            className="toggle-password"
                            onClick={() =>
                                setPasswordVisibility((prev) => ({
                                    ...prev,
                                    showConfirmPassword: !prev.showConfirmPassword,
                                }))
                            }
                        >
                            <img
                                src={passwordVisibility.showConfirmPassword ? open : closed}
                                alt="toggle confirm password"
                                className="icon"
                            />
                        </div>
                    </div>

                    {passwordMismatch && (
                        <p className="mismatch">Passwords do not match</p>
                    )}
                    {error && <p className="error">{error}</p>}

                    <button className="auth-button" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

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
