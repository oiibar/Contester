import React from "react";
import { NavLink } from "react-router";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.branding}>
        <NavLink to="/">
          <img
            src="https://placehold.co/50x50"
            className={styles.logo}
            alt="Contester"
          />
        </NavLink>
        <p className={styles.description}>
          Contester - Elevate Your Coding Skills
        </p>
      </div>
      <nav className={styles.navbar}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contests">Contests</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/code">Code</NavLink>
        <NavLink to="/problems">Problems</NavLink>
      </nav>
      <div className={styles.socials}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
