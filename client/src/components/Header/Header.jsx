import React from "react";
import { NavLink } from "react-router";
import styles from "./Header.module.scss";
import { useAuth } from "hooks/auth/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const auth = useAuth();

    const handleLogOut = async () => {
        auth.logOut();
    }

    return (
        <header className={styles.header}>
            <NavLink to="/" className={({ isActive }) => isActive ? `${styles.logo} ${styles.active}` : styles.logo}>
                <span className={styles.brand}>Contester</span>
            </NavLink>
            <nav className={styles.navbar}>
                <NavLink to="/" className={({ isActive }) => isActive ? `${styles.active}` : undefined}>
                    Home
                </NavLink>
                <NavLink to="/contests" className={({ isActive }) => isActive ? `${styles.active}` : undefined}>
                    Contests
                </NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => isActive ? `${styles.active}` : undefined}>
                    Leaderboard
                </NavLink>
            </nav>
            {auth.token ? (
                <div className={styles.user_menu}>
                    <span className={styles.notifications}></span>
                    <NavLink to="/profile" className={styles.user_profile}>
                        {auth.user.username[0].toUpperCase()}
                    </NavLink>
                    <button className={styles.logout_button} onClick={handleLogOut}>
                        <FaSignOutAlt />
                    </button>
                </div>
            ) : (
                <NavLink to="/login" className={styles.login}>
                    Login/Signup
                </NavLink>
            )}
        </header>
    );
};

export default Header;
