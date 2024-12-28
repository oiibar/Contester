import React from "react";
import { NavLink } from "react-router";
import styles from "./Header.module.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../hooks/AuthProvider";

const Header = () => {
  const auth = useAuth();

  return (
      <header className={styles.header}>
        <NavLink to="/">
          <img
              src="https://placehold.co/50x50"
              className={styles.logo}
              alt="Contester"
          />
        </NavLink>
        <nav className={styles.navbar}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          {auth.user ? (

              <div className={styles.user_menu}>
                <NavLink to="/contests">Contests</NavLink>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
                <NavLink to="/code">Code</NavLink>
                <NavLink to="/profile" className={styles.user_profile}>
                  {auth.user.username[0].toUpperCase()}
                </NavLink>
                <button
                    className={styles.logout_button}
                    onClick={() => auth.logOut()}
                >
                  <FaSignOutAlt />
                </button>
              </div>
          ) : (
              <NavLink to="/login">Login/Signup</NavLink>
          )}
        </nav>
      </header>
  );
};

export default Header;
