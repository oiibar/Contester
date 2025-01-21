import React from "react";
import { NavLink } from "react-router";
import styles from "./Footer.module.scss";
import { SiLeetcode } from "react-icons/si";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.branding}>
                <NavLink to="/">
                    <SiLeetcode />
                </NavLink>
                <p className={styles.description}>
                    Contester - Elevate Your Coding Skills
                </p>
            </div>
            <nav className={styles.navbar}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contests">Contests</NavLink>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
            </nav>
        </footer>
    );
};

export default Footer;
