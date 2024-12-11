import React from "react";
import { NavLink } from "react-router";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";

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
        <NavLink to="/contests">Contests</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/code">Code</NavLink>
        <NavLink to="/problems">Problems</NavLink>
        <NavLink to="/login">Login/Signup</NavLink>
        <NavLink to="/" onClick={() => auth.logOut()}>
          Logout
        </NavLink>
        <div className={styles.user_menu}>
          <NavLink to="profile" className={styles.user_profile}>
            A
          </NavLink>
          <button className={styles.logout_button}>
            <FaSignOutAlt />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
